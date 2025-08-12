import { NextResponse } from 'next/server'
import db from '@/lib/db'

// GET /api/allset/calendar?service_id=1&month=YYYY-MM
// Returns: { dates: string[] } where each string is YYYY-MM-DD available (rules minus holidays)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const service_id = Number(searchParams.get('service_id'))
    const month = searchParams.get('month') // YYYY-MM
    if (!service_id || !month || !/^\d{4}-\d{2}$/.test(month)) {
      return NextResponse.json(
        { error: 'service_id and month (YYYY-MM) are required' },
        { status: 400 }
      )
    }

    // Build month range
    const [y, m] = month.split('-').map(Number)
    const start = new Date(Date.UTC(y, m - 1, 1))
    const end = new Date(Date.UTC(y, m, 0)) // last day of month

    const rules = await db.getAvailabilityRulesByService(service_id)
    const holidays = await db.getHolidaysByService(service_id)
    const holidaySet = new Set(holidays.map((h) => h.holiday_date))

    const availableDates: string[] = []
    for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      const iso = d.toISOString().slice(0, 10) // YYYY-MM-DD
      if (holidaySet.has(iso)) continue
      const weekday = d.getUTCDay() // 0..6
      const hasRule = rules.some((r) => r.weekday === weekday)
      if (hasRule) availableDates.push(iso)
    }

    return NextResponse.json({ dates: availableDates })
  } catch (error) {
    console.error('GET /api/allset/calendar error:', error)
    return NextResponse.json({ error: 'Failed to compute calendar' }, { status: 500 })
  }
}

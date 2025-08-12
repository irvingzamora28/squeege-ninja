import { NextResponse } from 'next/server'
import db from '@/lib/db'

// GET /api/allset/slots?service_id=1&date=YYYY-MM-DD
// Optionally &tz=America/Denver to filter rules by timezone (basic handling)
// Returns: { slots: { start: string; end: string; remaining: number }[] }
// Note: Basic timezone handling; for production-grade TZ conversion, use a timezone library.
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const service_id = Number(searchParams.get('service_id'))
    const date = searchParams.get('date') // YYYY-MM-DD
    const tz = searchParams.get('tz') || undefined

    if (!service_id || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: 'service_id and date (YYYY-MM-DD) are required' },
        { status: 400 }
      )
    }

    // Holidays block entire day
    const holidays = await db.getHolidaysByService(service_id)
    if (holidays.some((h) => h.holiday_date === date)) {
      return NextResponse.json({ slots: [] })
    }

    const service = await db.getServiceById(service_id)
    if (!service) return NextResponse.json({ error: 'service not found' }, { status: 404 })

    const rules = await db.getAvailabilityRulesByService(service_id)
    // Determine weekday of provided date (UTC-based; for true TZ accuracy, compute in rule.timezone)
    const weekday = new Date(date + 'T00:00:00Z').getUTCDay()
    const dayRules = rules.filter((r) => r.weekday === weekday && (!tz || r.timezone === tz))

    // Gather bookings for the day
    const bookings = await db.getBookingsByService(service_id)
    const dayBookings = bookings.filter((b) => b.start_time.slice(0, 10) === date)

    const duration = service.duration_minutes
    const slots: { start: string; end: string; remaining: number }[] = []

    for (const r of dayRules) {
      // Build local times as plain strings; emit slot times as local ISO-like without timezone
      // e.g., 'YYYY-MM-DDTHH:MM:00'
      const [sh, sm] = r.start_time_local.split(':').map(Number)
      const [eh, em] = r.end_time_local.split(':').map(Number)

      // Iterate slots in minutes within the window
      const windowStartMin = sh * 60 + sm
      const windowEndMin = eh * 60 + em
      for (
        let startMin = windowStartMin;
        startMin + duration <= windowEndMin;
        startMin += duration
      ) {
        const endMin = startMin + duration
        const startHH = String(Math.floor(startMin / 60)).padStart(2, '0')
        const startMM = String(startMin % 60).padStart(2, '0')
        const endHH = String(Math.floor(endMin / 60)).padStart(2, '0')
        const endMM = String(endMin % 60).padStart(2, '0')

        const startLocal = `${date}T${startHH}:${startMM}:00`
        const endLocal = `${date}T${endHH}:${endMM}:00`

        // Count overlapping bookings (simple check: booking overlaps if start_time < endLocal and end_time > startLocal)
        const overlaps = dayBookings.filter(
          (b) => b.start_time < endLocal && b.end_time > startLocal
        ).length
        const remaining = Math.max(0, r.capacity - overlaps)
        if (remaining > 0) {
          slots.push({ start: startLocal, end: endLocal, remaining })
        }
      }
    }

    return NextResponse.json({ slots })
  } catch (error) {
    console.error('GET /api/allset/slots error:', error)
    return NextResponse.json({ error: 'Failed to compute slots' }, { status: 500 })
  }
}

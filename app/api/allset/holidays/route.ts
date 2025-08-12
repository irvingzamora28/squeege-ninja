import { NextResponse } from 'next/server'
import db from '@/lib/db'

// Query: ?service_id=1
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const service_id = Number(searchParams.get('service_id'))
    if (!service_id) return NextResponse.json({ error: 'service_id is required' }, { status: 400 })
    const holidays = await db.getHolidaysByService(service_id)
    return NextResponse.json({ holidays })
  } catch (error) {
    console.error('GET /api/allset/holidays error:', error)
    return NextResponse.json({ error: 'Failed to fetch holidays' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { service_id, holiday_date, note = null } = body
    if (!service_id || !holiday_date) {
      return NextResponse.json(
        { error: 'service_id and holiday_date are required' },
        { status: 400 }
      )
    }
    const id = await db.insertHoliday({ service_id, holiday_date, note })
    return NextResponse.json({ id })
  } catch (error) {
    console.error('POST /api/allset/holidays error:', error)
    return NextResponse.json({ error: 'Failed to create holiday' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await db.updateHoliday(Number(id), updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT /api/allset/holidays error:', error)
    return NextResponse.json({ error: 'Failed to update holiday' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await db.deleteHoliday(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/allset/holidays error:', error)
    return NextResponse.json({ error: 'Failed to delete holiday' }, { status: 500 })
  }
}

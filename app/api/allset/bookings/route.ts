import { NextResponse } from 'next/server'
import db from '@/lib/db'

// Optional query: ?service_id=1
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const service_id = searchParams.get('service_id')
    if (service_id) {
      const bookings = await db.getBookingsByService(Number(service_id))
      return NextResponse.json({ bookings })
    }
    const bookings = await db.getAllBookings()
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('GET /api/allset/bookings error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      service_id,
      customer_name,
      customer_email,
      start_time,
      end_time,
      status = 'pending',
      notes = null,
    } = body
    if (!service_id || !customer_name || !customer_email || !start_time || !end_time) {
      return NextResponse.json(
        { error: 'service_id, customer_name, customer_email, start_time, end_time are required' },
        { status: 400 }
      )
    }
    const id = await db.insertBooking({
      service_id,
      customer_name,
      customer_email,
      start_time,
      end_time,
      status,
      notes,
    })
    const booking = await db.getBookingById(id)
    return NextResponse.json({ id, booking })
  } catch (error) {
    console.error('POST /api/allset/bookings error:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await db.updateBooking(Number(id), updates)
    const booking = await db.getBookingById(Number(id))
    return NextResponse.json({ booking })
  } catch (error) {
    console.error('PUT /api/allset/bookings error:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await db.deleteBooking(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/allset/bookings error:', error)
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
  }
}

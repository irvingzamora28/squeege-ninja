import { NextResponse } from 'next/server'
import db from '@/lib/db'

// Query: ?service_id=1
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const service_id = Number(searchParams.get('service_id'))
    if (!service_id) return NextResponse.json({ error: 'service_id is required' }, { status: 400 })
    const rules = await db.getAvailabilityRulesByService(service_id)
    return NextResponse.json({ rules })
  } catch (error) {
    console.error('GET /api/allset/availability-rules error:', error)
    return NextResponse.json({ error: 'Failed to fetch availability rules' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { service_id, weekday, start_time_local, end_time_local, timezone, capacity = 1 } = body
    if (
      typeof service_id !== 'number' ||
      typeof weekday !== 'number' ||
      !start_time_local ||
      !end_time_local ||
      !timezone
    ) {
      return NextResponse.json(
        { error: 'service_id, weekday, start_time_local, end_time_local, timezone are required' },
        { status: 400 }
      )
    }
    const id = await db.insertAvailabilityRule({
      service_id,
      weekday,
      start_time_local,
      end_time_local,
      timezone,
      capacity,
    })
    return NextResponse.json({ id })
  } catch (error) {
    console.error('POST /api/allset/availability-rules error:', error)
    return NextResponse.json({ error: 'Failed to create availability rule' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await db.updateAvailabilityRule(Number(id), updates)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT /api/allset/availability-rules error:', error)
    return NextResponse.json({ error: 'Failed to update availability rule' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await db.deleteAvailabilityRule(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/allset/availability-rules error:', error)
    return NextResponse.json({ error: 'Failed to delete availability rule' }, { status: 500 })
  }
}

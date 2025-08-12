import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const services = await db.getAllServices()
    return NextResponse.json({ services })
  } catch (error) {
    console.error('GET /api/allset/services error:', error)
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, description = null, image_url = null, duration_minutes, price, active = 1 } = body
    if (!name || typeof duration_minutes !== 'number' || typeof price !== 'number') {
      return NextResponse.json(
        { error: 'name, duration_minutes, and price are required' },
        { status: 400 }
      )
    }
    const id = await db.insertService({
      name,
      description,
      image_url,
      duration_minutes,
      price,
      active,
    })
    const service = await db.getServiceById(id)
    return NextResponse.json({ id, service })
  } catch (error) {
    console.error('POST /api/allset/services error:', error)
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await db.updateService(Number(id), updates)
    const service = await db.getServiceById(Number(id))
    return NextResponse.json({ service })
  } catch (error) {
    console.error('PUT /api/allset/services error:', error)
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await db.deleteService(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/allset/services error:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 })
  }
}

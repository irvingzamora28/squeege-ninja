import { NextRequest, NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET() {
  try {
    const settings = await db.getSiteSettings()
    return NextResponse.json({ success: true, settings })
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Only accept known fields
    const patch: Partial<{
      whatsapp_enabled: boolean
      whatsapp_phone: string
      whatsapp_message: string
      whatsapp_position: 'bottom-right' | 'bottom-left'
      assistant_enabled: boolean
      booking_widget_enabled: boolean
      site_language: string
    }> = {}

    if (typeof body.whatsapp_enabled === 'boolean') patch.whatsapp_enabled = body.whatsapp_enabled
    if (typeof body.whatsapp_phone === 'string') patch.whatsapp_phone = body.whatsapp_phone
    if (typeof body.whatsapp_message === 'string') patch.whatsapp_message = body.whatsapp_message
    if (body.whatsapp_position === 'bottom-left' || body.whatsapp_position === 'bottom-right')
      patch.whatsapp_position = body.whatsapp_position
    if (typeof body.assistant_enabled === 'boolean')
      patch.assistant_enabled = body.assistant_enabled
    if (typeof body.booking_widget_enabled === 'boolean')
      patch.booking_widget_enabled = body.booking_widget_enabled
    if (typeof body.site_language === 'string') patch.site_language = body.site_language

    const updated = await db.updateSiteSettings(patch)
    return NextResponse.json({ success: true, settings: updated })
  } catch (e) {
    return NextResponse.json({ success: false, error: String(e) }, { status: 500 })
  }
}

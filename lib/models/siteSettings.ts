// General site settings model and interfaces
// Backed by table name from SITE_SETTINGS_TABLE constant

export type SiteSettings = {
  id: 1
  // WhatsApp
  whatsapp_enabled: boolean
  whatsapp_phone: string
  whatsapp_message: string
  whatsapp_position: 'bottom-right' | 'bottom-left'
  // Assistant
  assistant_enabled: boolean
  // Booking widget visibility
  booking_widget_enabled: boolean
  // i18n
  site_language: string
  // timestamps as ISO strings
  created_at?: string
  updated_at?: string
}

export interface ISiteSettingsModel {
  get(): Promise<SiteSettings>
  update(
    patch: Partial<Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<SiteSettings>
}

// Provider-agnostic DB row shape for site settings
// Booleans are stored as 0/1 in DB backends; id is numeric in DB
export type SiteSettingsDBRow = {
  id: number
  whatsapp_enabled: number
  whatsapp_phone: string
  whatsapp_message: string
  whatsapp_position: 'bottom-right' | 'bottom-left' | null
  assistant_enabled: number
  booking_widget_enabled: number
  site_language: string
  created_at?: string
  updated_at?: string
}

// Shared mapper to convert DB rows into the domain model
export function mapSiteSettingsRow(row: SiteSettingsDBRow): SiteSettings {
  return {
    id: 1,
    whatsapp_enabled: !!row.whatsapp_enabled,
    whatsapp_phone: row.whatsapp_phone || '',
    whatsapp_message: row.whatsapp_message || '',
    whatsapp_position: (row.whatsapp_position as 'bottom-right' | 'bottom-left') || 'bottom-right',
    assistant_enabled: !!row.assistant_enabled,
    booking_widget_enabled: !!row.booking_widget_enabled,
    site_language: row.site_language || 'en-us',
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export { SQLiteSiteSettingsModel } from '../providers/sqlite/siteSettingsModel'
export { SupabaseSiteSettingsModel } from '../providers/supabase/siteSettingsModel'

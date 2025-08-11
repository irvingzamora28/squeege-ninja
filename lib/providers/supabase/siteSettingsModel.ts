import type { SupabaseClient } from '@supabase/supabase-js'
import { SITE_SETTINGS_TABLE } from '../../constants'
import type { ISiteSettingsModel, SiteSettings, SiteSettingsDBRow } from '../../models/siteSettings'
import { mapSiteSettingsRow } from '../../models/siteSettings'

export class SupabaseSiteSettingsModel implements ISiteSettingsModel {
  constructor(private supabase: SupabaseClient) {}

  async get(): Promise<SiteSettings> {
    // Ensure the single row exists; if not, try to insert defaults
    const { data, error } = await this.supabase
      .from(SITE_SETTINGS_TABLE)
      .select(
        'id, whatsapp_enabled, whatsapp_phone, whatsapp_message, whatsapp_position, assistant_enabled, site_language, created_at, updated_at'
      )
      .eq('id', 1)
      .limit(1)
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      // ignore "Results contain 0 rows"; we'll insert below
      console.error('SupabaseSiteSettingsModel.get error:', error)
    }

    if (!data) {
      const insert = await this.supabase
        .from(SITE_SETTINGS_TABLE)
        .insert([
          {
            id: 1,
            whatsapp_enabled: 0,
            whatsapp_phone: '',
            whatsapp_message: '',
            whatsapp_position: 'bottom-right',
            assistant_enabled: 0,
            site_language: 'en-us',
          },
        ])
        .select()
        .single()

      if (insert.error) {
        throw insert.error
      }
      return mapSiteSettingsRow(insert.data as SiteSettingsDBRow)
    }

    return mapSiteSettingsRow(data as SiteSettingsDBRow)
  }

  async update(
    patch: Partial<Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<SiteSettings> {
    type UpdatePayload = Partial<{
      whatsapp_enabled: number
      whatsapp_phone: string
      whatsapp_message: string
      whatsapp_position: 'bottom-right' | 'bottom-left'
      assistant_enabled: number
      site_language: string
    }>
    const updatePayload: UpdatePayload = {}
    if (typeof patch.whatsapp_enabled !== 'undefined')
      updatePayload.whatsapp_enabled = patch.whatsapp_enabled ? 1 : 0
    if (typeof patch.whatsapp_phone !== 'undefined')
      updatePayload.whatsapp_phone = patch.whatsapp_phone
    if (typeof patch.whatsapp_message !== 'undefined')
      updatePayload.whatsapp_message = patch.whatsapp_message
    if (typeof patch.whatsapp_position !== 'undefined')
      updatePayload.whatsapp_position = patch.whatsapp_position
    if (typeof patch.assistant_enabled !== 'undefined')
      updatePayload.assistant_enabled = patch.assistant_enabled ? 1 : 0
    if (typeof patch.site_language !== 'undefined')
      updatePayload.site_language = patch.site_language

    if (Object.keys(updatePayload).length === 0) {
      return this.get()
    }

    const { data, error } = await this.supabase
      .from(SITE_SETTINGS_TABLE)
      .update(updatePayload)
      .eq('id', 1)
      .select()
      .single()

    if (error) {
      console.error('SupabaseSiteSettingsModel.update error:', error)
      throw error
    }

    return mapSiteSettingsRow(data as SiteSettingsDBRow)
  }
}

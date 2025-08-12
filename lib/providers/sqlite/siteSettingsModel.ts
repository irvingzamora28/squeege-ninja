import type Database from 'better-sqlite3'
import { SITE_SETTINGS_TABLE } from '../../constants'
import type { ISiteSettingsModel, SiteSettings, SiteSettingsDBRow } from '../../models/siteSettings'
import { mapSiteSettingsRow } from '../../models/siteSettings'

const SELECT_COLUMNS = `
  id,
  whatsapp_enabled,
  whatsapp_phone,
  whatsapp_message,
  whatsapp_position,
  assistant_enabled,
  booking_widget_enabled,
  site_language,
  created_at,
  updated_at
`

export class SQLiteSiteSettingsModel implements ISiteSettingsModel {
  constructor(private db: Database) {}

  async get(): Promise<SiteSettings> {
    const row = this.db
      .prepare(`SELECT ${SELECT_COLUMNS} FROM ${SITE_SETTINGS_TABLE} WHERE id = 1`)
      .get() as SiteSettingsDBRow | undefined

    if (row) {
      return mapSiteSettingsRow(row)
    }

    // Ensure a single row exists if schema seed didn't run
    this.db
      .prepare(
        `INSERT OR IGNORE INTO ${SITE_SETTINGS_TABLE} (id, whatsapp_enabled, whatsapp_phone, whatsapp_message, whatsapp_position, assistant_enabled, booking_widget_enabled, site_language)
         VALUES (1, 0, '', '', 'bottom-right', 0, 1, 'en-us')`
      )
      .run()

    const created = this.db
      .prepare(`SELECT ${SELECT_COLUMNS} FROM ${SITE_SETTINGS_TABLE} WHERE id = 1`)
      .get() as SiteSettingsDBRow

    return mapSiteSettingsRow(created)
  }

  async update(
    patch: Partial<Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<SiteSettings> {
    const fields: string[] = []
    const values: unknown[] = []

    if (typeof patch.whatsapp_enabled !== 'undefined') {
      fields.push('whatsapp_enabled = ?')
      values.push(patch.whatsapp_enabled ? 1 : 0)
    }
    if (typeof patch.whatsapp_phone !== 'undefined') {
      fields.push('whatsapp_phone = ?')
      values.push(patch.whatsapp_phone)
    }
    if (typeof patch.whatsapp_message !== 'undefined') {
      fields.push('whatsapp_message = ?')
      values.push(patch.whatsapp_message)
    }
    if (typeof patch.whatsapp_position !== 'undefined') {
      fields.push('whatsapp_position = ?')
      values.push(patch.whatsapp_position)
    }
    if (typeof patch.assistant_enabled !== 'undefined') {
      fields.push('assistant_enabled = ?')
      values.push(patch.assistant_enabled ? 1 : 0)
    }
    if (typeof patch.booking_widget_enabled !== 'undefined') {
      fields.push('booking_widget_enabled = ?')
      values.push(patch.booking_widget_enabled ? 1 : 0)
    }
    if (typeof patch.site_language !== 'undefined') {
      fields.push('site_language = ?')
      values.push(patch.site_language)
    }

    if (fields.length > 0) {
      this.db
        .prepare(
          `UPDATE ${SITE_SETTINGS_TABLE} SET ${fields.join(
            ', '
          )}, updated_at = CURRENT_TIMESTAMP WHERE id = 1`
        )
        .run(...values)
    }

    return this.get()
  }
}

import type Database from 'better-sqlite3'
import type { Holiday, IHolidayModel } from '../../models/holiday'
import { HOLIDAYS_TABLE } from '../../constants'

export class SQLiteHolidayModel implements IHolidayModel {
  constructor(private db: Database) {}

  async getByService(service_id: number): Promise<Holiday[]> {
    return this.db
      .prepare(
        `SELECT id, service_id, holiday_date, note, created_at FROM ${HOLIDAYS_TABLE} WHERE service_id = ? ORDER BY holiday_date`
      )
      .all(service_id)
  }

  async insert(data: Omit<Holiday, 'id' | 'created_at'>): Promise<number> {
    const info = this.db
      .prepare(
        `INSERT INTO ${HOLIDAYS_TABLE} (service_id, holiday_date, note, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`
      )
      .run(data.service_id, data.holiday_date, data.note ?? null)
    return info.lastInsertRowid as number
  }

  async update(id: number, updates: Partial<Omit<Holiday, 'id' | 'created_at'>>): Promise<void> {
    const fields: string[] = []
    const values: unknown[] = []
    if (typeof updates.holiday_date !== 'undefined') {
      fields.push('holiday_date = ?')
      values.push(updates.holiday_date)
    }
    if (typeof updates.note !== 'undefined') {
      fields.push('note = ?')
      values.push(updates.note)
    }
    if (fields.length === 0) return
    values.push(id)
    this.db.prepare(`UPDATE ${HOLIDAYS_TABLE} SET ${fields.join(', ')} WHERE id = ?`).run(...values)
  }

  async delete(id: number): Promise<void> {
    this.db.prepare(`DELETE FROM ${HOLIDAYS_TABLE} WHERE id = ?`).run(id)
  }
}

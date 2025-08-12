import type Database from 'better-sqlite3'
import type { AvailabilityRule, IAvailabilityRuleModel } from '../../models/availabilityRule'
import { SERVICE_AVAILABILITY_RULES_TABLE } from '../../constants'

export class SQLiteAvailabilityRuleModel implements IAvailabilityRuleModel {
  constructor(private db: Database) {}

  async getByService(service_id: number): Promise<AvailabilityRule[]> {
    return this.db
      .prepare(
        `SELECT id, service_id, weekday, start_time_local, end_time_local, timezone, capacity, created_at FROM ${SERVICE_AVAILABILITY_RULES_TABLE} WHERE service_id = ? ORDER BY weekday, start_time_local`
      )
      .all(service_id)
  }

  async insert(data: Omit<AvailabilityRule, 'id' | 'created_at'>): Promise<number> {
    const info = this.db
      .prepare(
        `INSERT INTO ${SERVICE_AVAILABILITY_RULES_TABLE} (service_id, weekday, start_time_local, end_time_local, timezone, capacity, created_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
      )
      .run(
        data.service_id,
        data.weekday,
        data.start_time_local,
        data.end_time_local,
        data.timezone,
        data.capacity
      )
    return info.lastInsertRowid as number
  }

  async update(
    id: number,
    updates: Partial<Omit<AvailabilityRule, 'id' | 'created_at'>>
  ): Promise<void> {
    const fields: string[] = []
    const values: unknown[] = []
    if (typeof updates.weekday !== 'undefined') {
      fields.push('weekday = ?')
      values.push(updates.weekday)
    }
    if (typeof updates.start_time_local !== 'undefined') {
      fields.push('start_time_local = ?')
      values.push(updates.start_time_local)
    }
    if (typeof updates.end_time_local !== 'undefined') {
      fields.push('end_time_local = ?')
      values.push(updates.end_time_local)
    }
    if (typeof updates.timezone !== 'undefined') {
      fields.push('timezone = ?')
      values.push(updates.timezone)
    }
    if (typeof updates.capacity !== 'undefined') {
      fields.push('capacity = ?')
      values.push(updates.capacity)
    }
    if (fields.length === 0) return
    values.push(id)
    this.db
      .prepare(`UPDATE ${SERVICE_AVAILABILITY_RULES_TABLE} SET ${fields.join(', ')} WHERE id = ?`)
      .run(...values)
  }

  async delete(id: number): Promise<void> {
    this.db.prepare(`DELETE FROM ${SERVICE_AVAILABILITY_RULES_TABLE} WHERE id = ?`).run(id)
  }
}

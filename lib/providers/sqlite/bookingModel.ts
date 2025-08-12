import type Database from 'better-sqlite3'
import type { Booking, IBookingModel } from '../../models/booking'
import { BOOKINGS_TABLE } from '../../constants'

export class SQLiteBookingModel implements IBookingModel {
  constructor(private db: Database) {}

  async getAll(): Promise<Booking[]> {
    return this.db
      .prepare(
        `SELECT id, service_id, customer_name, customer_email, start_time, end_time, status, notes, created_at, updated_at FROM ${BOOKINGS_TABLE} ORDER BY start_time DESC`
      )
      .all()
  }

  async getByService(service_id: number): Promise<Booking[]> {
    return this.db
      .prepare(
        `SELECT id, service_id, customer_name, customer_email, start_time, end_time, status, notes, created_at, updated_at FROM ${BOOKINGS_TABLE} WHERE service_id = ? ORDER BY start_time DESC`
      )
      .all(service_id)
  }

  async getById(id: number): Promise<Booking | null> {
    const row = this.db
      .prepare(
        `SELECT id, service_id, customer_name, customer_email, start_time, end_time, status, notes, created_at, updated_at FROM ${BOOKINGS_TABLE} WHERE id = ?`
      )
      .get(id)
    return row || null
  }

  async insert(data: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const info = this.db
      .prepare(
        `INSERT INTO ${BOOKINGS_TABLE} (service_id, customer_name, customer_email, start_time, end_time, status, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
      )
      .run(
        data.service_id,
        data.customer_name,
        data.customer_email,
        data.start_time,
        data.end_time,
        data.status,
        data.notes ?? null
      )
    return info.lastInsertRowid as number
  }

  async update(
    id: number,
    updates: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<void> {
    const fields: string[] = []
    const values: unknown[] = []
    if (typeof updates.service_id !== 'undefined') {
      fields.push('service_id = ?')
      values.push(updates.service_id)
    }
    if (typeof updates.customer_name !== 'undefined') {
      fields.push('customer_name = ?')
      values.push(updates.customer_name)
    }
    if (typeof updates.customer_email !== 'undefined') {
      fields.push('customer_email = ?')
      values.push(updates.customer_email)
    }
    if (typeof updates.start_time !== 'undefined') {
      fields.push('start_time = ?')
      values.push(updates.start_time)
    }
    if (typeof updates.end_time !== 'undefined') {
      fields.push('end_time = ?')
      values.push(updates.end_time)
    }
    if (typeof updates.status !== 'undefined') {
      fields.push('status = ?')
      values.push(updates.status)
    }
    if (typeof updates.notes !== 'undefined') {
      fields.push('notes = ?')
      values.push(updates.notes)
    }
    if (fields.length === 0) return
    values.push(id)
    this.db
      .prepare(
        `UPDATE ${BOOKINGS_TABLE} SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      )
      .run(...values)
  }

  async delete(id: number): Promise<void> {
    this.db.prepare(`DELETE FROM ${BOOKINGS_TABLE} WHERE id = ?`).run(id)
  }
}

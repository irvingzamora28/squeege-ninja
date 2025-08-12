import type Database from 'better-sqlite3'
import type { IServiceModel, Service } from '../../models/service'
import { SERVICES_TABLE } from '../../constants'

export class SQLiteServiceModel implements IServiceModel {
  constructor(private db: Database) {}

  async getAll(): Promise<Service[]> {
    return this.db
      .prepare(
        `SELECT id, name, description, image_url, duration_minutes, price AS price, active, created_at FROM ${SERVICES_TABLE} ORDER BY id DESC`
      )
      .all()
  }

  async getById(id: number): Promise<Service | null> {
    const row = this.db
      .prepare(
        `SELECT id, name, description, image_url, duration_minutes, price AS price, active, created_at FROM ${SERVICES_TABLE} WHERE id = ?`
      )
      .get(id)
    return row || null
  }

  async insert(data: Omit<Service, 'id' | 'created_at'>): Promise<number> {
    const info = this.db
      .prepare(
        `INSERT INTO ${SERVICES_TABLE} (name, description, image_url, duration_minutes, price, active, created_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
      )
      .run(
        data.name,
        data.description ?? null,
        data.image_url ?? null,
        data.duration_minutes,
        data.price,
        data.active
      )
    return info.lastInsertRowid as number
  }

  async update(id: number, updates: Partial<Omit<Service, 'id' | 'created_at'>>): Promise<void> {
    const fields: string[] = []
    const values: unknown[] = []
    if (typeof updates.name !== 'undefined') {
      fields.push('name = ?')
      values.push(updates.name)
    }
    if (typeof updates.description !== 'undefined') {
      fields.push('description = ?')
      values.push(updates.description)
    }
    if (typeof updates.image_url !== 'undefined') {
      fields.push('image_url = ?')
      values.push(updates.image_url)
    }
    if (typeof updates.duration_minutes !== 'undefined') {
      fields.push('duration_minutes = ?')
      values.push(updates.duration_minutes)
    }
    if (typeof updates.price !== 'undefined') {
      fields.push('price = ?')
      values.push(updates.price)
    }
    if (typeof updates.active !== 'undefined') {
      fields.push('active = ?')
      values.push(updates.active)
    }
    if (fields.length === 0) return
    values.push(id)
    this.db.prepare(`UPDATE ${SERVICES_TABLE} SET ${fields.join(', ')} WHERE id = ?`).run(...values)
  }

  async delete(id: number): Promise<void> {
    this.db.prepare(`DELETE FROM ${SERVICES_TABLE} WHERE id = ?`).run(id)
  }
}

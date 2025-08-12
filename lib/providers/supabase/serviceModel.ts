import type { SupabaseClient } from '@supabase/supabase-js'
import type { IServiceModel, Service } from '../../models/service'
import { SERVICES_TABLE } from '../../constants'

export class SupabaseServiceModel implements IServiceModel {
  constructor(private supabase: SupabaseClient) {}

  async getAll(): Promise<Service[]> {
    const { data, error } = await this.supabase
      .from(SERVICES_TABLE)
      .select('id, name, description, image_url, duration_minutes, price, active, created_at')
      .order('id', { ascending: false })
    if (error) throw error
    return data || []
  }

  async getById(id: number): Promise<Service | null> {
    const { data, error } = await this.supabase
      .from(SERVICES_TABLE)
      .select('id, name, description, image_url, duration_minutes, price, active, created_at')
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return data || null
  }

  async insert(data: Omit<Service, 'id' | 'created_at'>): Promise<number> {
    const { data: rows, error } = await this.supabase
      .from(SERVICES_TABLE)
      .insert([
        {
          name: data.name,
          description: data.description ?? null,
          image_url: data.image_url ?? null,
          duration_minutes: data.duration_minutes,
          price: data.price,
          active: data.active,
        },
      ])
      .select('id')
      .single()
    if (error) throw error
    return rows!.id
  }

  async update(id: number, updates: Partial<Omit<Service, 'id' | 'created_at'>>): Promise<void> {
    const { error } = await this.supabase.from(SERVICES_TABLE).update(updates).eq('id', id)
    if (error) throw error
  }

  async delete(id: number): Promise<void> {
    const { error } = await this.supabase.from(SERVICES_TABLE).delete().eq('id', id)
    if (error) throw error
  }
}

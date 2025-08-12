import type { SupabaseClient } from '@supabase/supabase-js'
import type { Booking, IBookingModel } from '../../models/booking'
import { BOOKINGS_TABLE } from '../../constants'

export class SupabaseBookingModel implements IBookingModel {
  constructor(private supabase: SupabaseClient) {}

  async getAll(): Promise<Booking[]> {
    const { data, error } = await this.supabase
      .from(BOOKINGS_TABLE)
      .select(
        'id, service_id, customer_name, customer_email, start_time, end_time, status, notes, created_at, updated_at'
      )
      .order('start_time', { ascending: false })
    if (error) throw error
    return data || []
  }

  async getByService(service_id: number): Promise<Booking[]> {
    const { data, error } = await this.supabase
      .from(BOOKINGS_TABLE)
      .select(
        'id, service_id, customer_name, customer_email, start_time, end_time, status, notes, created_at, updated_at'
      )
      .eq('service_id', service_id)
      .order('start_time', { ascending: false })
    if (error) throw error
    return data || []
  }

  async getById(id: number): Promise<Booking | null> {
    const { data, error } = await this.supabase
      .from(BOOKINGS_TABLE)
      .select(
        'id, service_id, customer_name, customer_email, start_time, end_time, status, notes, created_at, updated_at'
      )
      .eq('id', id)
      .maybeSingle()
    if (error) throw error
    return data || null
  }

  async insert(data: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    const { data: rows, error } = await this.supabase
      .from(BOOKINGS_TABLE)
      .insert([
        {
          service_id: data.service_id,
          customer_name: data.customer_name,
          customer_email: data.customer_email,
          start_time: data.start_time,
          end_time: data.end_time,
          status: data.status,
          notes: data.notes ?? null,
        },
      ])
      .select('id')
      .single()
    if (error) throw error
    return rows!.id
  }

  async update(
    id: number,
    updates: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<void> {
    const { error } = await this.supabase.from(BOOKINGS_TABLE).update(updates).eq('id', id)
    if (error) throw error
  }

  async delete(id: number): Promise<void> {
    const { error } = await this.supabase.from(BOOKINGS_TABLE).delete().eq('id', id)
    if (error) throw error
  }
}

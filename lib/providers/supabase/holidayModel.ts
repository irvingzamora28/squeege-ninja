import type { SupabaseClient } from '@supabase/supabase-js'
import type { Holiday, IHolidayModel } from '../../models/holiday'
import { HOLIDAYS_TABLE } from '../../constants'

export class SupabaseHolidayModel implements IHolidayModel {
  constructor(private supabase: SupabaseClient) {}

  async getByService(service_id: number): Promise<Holiday[]> {
    const { data, error } = await this.supabase
      .from(HOLIDAYS_TABLE)
      .select('id, service_id, holiday_date, note, created_at')
      .eq('service_id', service_id)
      .order('holiday_date', { ascending: true })
    if (error) throw error
    return data || []
  }

  async insert(data: Omit<Holiday, 'id' | 'created_at'>): Promise<number> {
    const { data: rows, error } = await this.supabase
      .from(HOLIDAYS_TABLE)
      .insert([
        { service_id: data.service_id, holiday_date: data.holiday_date, note: data.note ?? null },
      ])
      .select('id')
      .single()
    if (error) throw error
    return rows!.id
  }

  async update(id: number, updates: Partial<Omit<Holiday, 'id' | 'created_at'>>): Promise<void> {
    const { error } = await this.supabase.from(HOLIDAYS_TABLE).update(updates).eq('id', id)
    if (error) throw error
  }

  async delete(id: number): Promise<void> {
    const { error } = await this.supabase.from(HOLIDAYS_TABLE).delete().eq('id', id)
    if (error) throw error
  }
}

import type { SupabaseClient } from '@supabase/supabase-js'
import type { AvailabilityRule, IAvailabilityRuleModel } from '../../models/availabilityRule'
import { SERVICE_AVAILABILITY_RULES_TABLE } from '../../constants'

export class SupabaseAvailabilityRuleModel implements IAvailabilityRuleModel {
  constructor(private supabase: SupabaseClient) {}

  async getByService(service_id: number): Promise<AvailabilityRule[]> {
    const { data, error } = await this.supabase
      .from(SERVICE_AVAILABILITY_RULES_TABLE)
      .select(
        'id, service_id, weekday, start_time_local, end_time_local, timezone, capacity, created_at'
      )
      .eq('service_id', service_id)
      .order('weekday', { ascending: true })
      .order('start_time_local', { ascending: true })
    if (error) throw error
    return data || []
  }

  async insert(data: Omit<AvailabilityRule, 'id' | 'created_at'>): Promise<number> {
    const { data: rows, error } = await this.supabase
      .from(SERVICE_AVAILABILITY_RULES_TABLE)
      .insert([
        {
          service_id: data.service_id,
          weekday: data.weekday,
          start_time_local: data.start_time_local,
          end_time_local: data.end_time_local,
          timezone: data.timezone,
          capacity: data.capacity,
        },
      ])
      .select('id')
      .single()
    if (error) throw error
    return rows!.id
  }

  async update(
    id: number,
    updates: Partial<Omit<AvailabilityRule, 'id' | 'created_at'>>
  ): Promise<void> {
    const { error } = await this.supabase
      .from(SERVICE_AVAILABILITY_RULES_TABLE)
      .update(updates)
      .eq('id', id)
    if (error) throw error
  }

  async delete(id: number): Promise<void> {
    const { error } = await this.supabase
      .from(SERVICE_AVAILABILITY_RULES_TABLE)
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}

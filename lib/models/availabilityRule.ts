// Recurring weekly availability rule model

export interface AvailabilityRule {
  id: number
  service_id: number
  weekday: number // 0=Sun .. 6=Sat
  start_time_local: string // 'HH:MM'
  end_time_local: string // 'HH:MM'
  timezone: string // IANA timezone, e.g., 'America/Denver'
  capacity: number
  created_at: string
}

export interface IAvailabilityRuleModel {
  getByService(service_id: number): Promise<AvailabilityRule[]>
  insert(data: Omit<AvailabilityRule, 'id' | 'created_at'>): Promise<number>
  update(id: number, updates: Partial<Omit<AvailabilityRule, 'id' | 'created_at'>>): Promise<void>
  delete(id: number): Promise<void>
}

export { SQLiteAvailabilityRuleModel } from '../providers/sqlite/availabilityRuleModel'
export { SupabaseAvailabilityRuleModel } from '../providers/supabase/availabilityRuleModel'

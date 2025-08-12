// Holiday (date exception) model

export interface Holiday {
  id: number
  service_id: number
  holiday_date: string // 'YYYY-MM-DD'
  note?: string | null
  created_at: string
}

export interface IHolidayModel {
  getByService(service_id: number): Promise<Holiday[]>
  insert(data: Omit<Holiday, 'id' | 'created_at'>): Promise<number>
  update(id: number, updates: Partial<Omit<Holiday, 'id' | 'created_at'>>): Promise<void>
  delete(id: number): Promise<void>
}

export { SQLiteHolidayModel } from '../providers/sqlite/holidayModel'
export { SupabaseHolidayModel } from '../providers/supabase/holidayModel'

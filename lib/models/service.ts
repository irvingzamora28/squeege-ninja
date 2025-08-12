// Service model interface and exports for provider use only

export interface Service {
  id: number
  name: string
  description?: string | null
  image_url?: string | null
  duration_minutes: number
  price: number
  active: number // 1 or 0
  created_at: string
}

export interface IServiceModel {
  getAll(): Promise<Service[]>
  getById(id: number): Promise<Service | null>
  insert(data: Omit<Service, 'id' | 'created_at'>): Promise<number>
  update(id: number, updates: Partial<Omit<Service, 'id' | 'created_at'>>): Promise<void>
  delete(id: number): Promise<void>
}

export { SQLiteServiceModel } from '../providers/sqlite/serviceModel'
export { SupabaseServiceModel } from '../providers/supabase/serviceModel'

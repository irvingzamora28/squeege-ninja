// Booking model interface and exports for provider use only

export type BookingStatus = 'pending' | 'confirmed' | 'canceled'

export interface Booking {
  id: number
  service_id: number
  customer_name: string
  customer_email: string
  start_time: string
  end_time: string
  status: BookingStatus
  notes?: string | null
  created_at: string
  updated_at: string
}

export interface IBookingModel {
  getAll(): Promise<Booking[]>
  getByService(service_id: number): Promise<Booking[]>
  getById(id: number): Promise<Booking | null>
  insert(data: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<number>
  update(
    id: number,
    updates: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<void>
  delete(id: number): Promise<void>
}

export { SQLiteBookingModel } from '../providers/sqlite/bookingModel'
export { SupabaseBookingModel } from '../providers/supabase/bookingModel'

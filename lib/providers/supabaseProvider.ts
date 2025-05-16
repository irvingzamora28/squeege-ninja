import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { IDatabaseProvider } from '../dbProvider'

export class SupabaseProvider implements IDatabaseProvider {
  private supabase: SupabaseClient

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || ''
    const supabaseKey = process.env.SUPABASE_KEY || ''
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key must be set for SupabaseProvider')
    }
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  async getAllEmails(): Promise<{ id: number; email: string; created_at: string }[]> {
    const { data, error } = await this.supabase
      .from('emails')
      .select('id, email, created_at')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  }

  async insertEmail(email: string): Promise<void> {
    const { error } = await this.supabase.from('emails').insert([{ email }])
    if (error) throw error
  }

  async getSubscriptionCount(): Promise<number> {
    const { count, error } = await this.supabase
      .from('emails')
      .select('*', { count: 'exact', head: true })
    if (error) throw error
    return count || 0
  }
}

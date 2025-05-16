import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { IEmailModel } from '../../models/email'
import { ALLSET_EMAILS_TABLE } from '../../constants'
import type { Email } from '../../models/email'

export class SupabaseEmailModel implements IEmailModel {
  private supabase: SupabaseClient

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || ''
    const supabaseKey = process.env.SUPABASE_KEY || ''
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key must be set for SupabaseEmailModel')
    }
    this.supabase = createClient(supabaseUrl, supabaseKey)
  }

  async getAll(): Promise<Email[]> {
    const { data, error } = await this.supabase
      .from(ALLSET_EMAILS_TABLE)
      .select('id, email, created_at')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  }

  async insert(email: string): Promise<void> {
    const { error } = await this.supabase.from(ALLSET_EMAILS_TABLE).insert([{ email }])
    if (error) throw error
  }

  async getCount(): Promise<number> {
    const { count, error } = await this.supabase
      .from(ALLSET_EMAILS_TABLE)
      .select('*', { count: 'exact', head: true })
    if (error) throw error
    return count || 0
  }
}

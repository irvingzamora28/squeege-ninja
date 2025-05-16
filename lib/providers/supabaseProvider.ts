import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { SupabaseEmailModel } from './supabase/emailModel'
import { IDatabaseProvider } from '../dbProvider'

export class SupabaseProvider implements IDatabaseProvider {
  private supabase: SupabaseClient
  private emailModel: SupabaseEmailModel

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || ''
    const supabaseKey = process.env.SUPABASE_KEY || ''
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key must be set for SupabaseProvider')
    }
    this.supabase = createClient(supabaseUrl, supabaseKey)
    this.emailModel = new SupabaseEmailModel(this.supabase)
  }

  async getAllEmails(): Promise<{ id: number; email: string; created_at: string }[]> {
    return this.emailModel.getAll()
  }

  async insertEmail(email: string): Promise<void> {
    return this.emailModel.insert(email)
  }

  async getSubscriptionCount(): Promise<number> {
    return this.emailModel.getCount()
  }
}

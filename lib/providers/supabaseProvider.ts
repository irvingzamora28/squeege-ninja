import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { SupabaseEmailModel } from './supabase/emailModel'
import { SupabaseEmailTemplateDataProvider } from './supabase/emailTemplateDataModel'
import { IDatabaseProvider } from '../dbProvider'
import { ContactSubmission, SupabaseContactModel } from '../models/contact'
import type { EmailTemplateDataInstance } from '../models/emailTemplateData'

export class SupabaseProvider implements IDatabaseProvider {
  private supabase: SupabaseClient
  private emailModel: SupabaseEmailModel
  private contactModel: SupabaseContactModel
  private emailTemplateDataModel: SupabaseEmailTemplateDataProvider

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || ''
    const supabaseKey = process.env.SUPABASE_KEY || ''
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key must be set for SupabaseProvider')
    }
    this.supabase = createClient(supabaseUrl, supabaseKey)
    this.emailModel = new SupabaseEmailModel(this.supabase)
    this.contactModel = new SupabaseContactModel(this.supabase)
    this.emailTemplateDataModel = new SupabaseEmailTemplateDataProvider(this.supabase)
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

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return this.contactModel.getAll()
  }

  async insertContactSubmission(data: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<void> {
    this.contactModel.insert(data)
  }

  // Email Template Methods

  async getTemplateDataByTemplate(template: string): Promise<EmailTemplateDataInstance[]> {
    return this.emailTemplateDataModel.getByTemplate(template)
  }

  async getAllTemplateData(): Promise<EmailTemplateDataInstance[]> {
    return this.emailTemplateDataModel.getAll()
  }

  async insertTemplateData(
    instance: Omit<EmailTemplateDataInstance, 'id' | 'created_at' | 'updated_at'>
  ): Promise<number> {
    return this.emailTemplateDataModel.insert(instance)
  }

  async updateTemplateData(
    id: number,
    updates: Partial<Omit<EmailTemplateDataInstance, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<void> {
    return this.emailTemplateDataModel.update(id, updates)
  }

  async deleteTemplateData(id: number): Promise<void> {
    return this.emailTemplateDataModel.delete(id)
  }
}

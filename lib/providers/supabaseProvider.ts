import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { SupabaseEmailModel } from './supabase/emailModel'
import { SupabaseEmailTemplateDataProvider } from './supabase/emailTemplateDataModel'
import { IDatabaseProvider } from '../dbProvider'
import { ContactSubmission, SupabaseContactModel } from '../models/contact'
import { EmailTemplateDataInstance } from '../models/emailTemplateData'
import { CTAConfigInstance } from '../models/ctaConfig'
import { SupabaseCTAConfigProvider } from './supabase/ctaConfigModel'
import { SupabaseSiteSettingsModel } from './supabase/siteSettingsModel'
import type { SiteSettings } from '../models/siteSettings'
import { SupabaseServiceModel } from './supabase/serviceModel'
import { SupabaseBookingModel } from './supabase/bookingModel'
import type { Service } from '../models/service'
import type { Booking } from '../models/booking'
import { SupabaseAvailabilityRuleModel } from './supabase/availabilityRuleModel'
import { SupabaseHolidayModel } from './supabase/holidayModel'
import type { AvailabilityRule } from '../models/availabilityRule'
import type { Holiday } from '../models/holiday'

export class SupabaseProvider implements IDatabaseProvider {
  private supabase: SupabaseClient
  private emailModel: SupabaseEmailModel
  private contactModel: SupabaseContactModel
  private emailTemplateDataModel: SupabaseEmailTemplateDataProvider
  private ctaConfigModel: SupabaseCTAConfigProvider
  private siteSettingsModel: SupabaseSiteSettingsModel
  private serviceModel: SupabaseServiceModel
  private bookingModel: SupabaseBookingModel
  private availabilityRuleModel: SupabaseAvailabilityRuleModel
  private holidayModel: SupabaseHolidayModel

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
    this.ctaConfigModel = new SupabaseCTAConfigProvider(this.supabase)
    this.siteSettingsModel = new SupabaseSiteSettingsModel(this.supabase)
    this.serviceModel = new SupabaseServiceModel(this.supabase)
    this.bookingModel = new SupabaseBookingModel(this.supabase)
    this.availabilityRuleModel = new SupabaseAvailabilityRuleModel(this.supabase)
    this.holidayModel = new SupabaseHolidayModel(this.supabase)
  }

  async getAllEmails(): Promise<{ id: number; email: string; created_at: string }[]> {
    return this.emailModel.getAll()
  }

  async insertEmail(email: string): Promise<void> {
    return this.emailModel.insert(email)
  }

  async deleteEmail(id: number): Promise<void> {
    return this.emailModel.deleteEmail(id)
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

  // CTA Config Methods
  async getAllCTAConfig(): Promise<CTAConfigInstance[]> {
    return this.ctaConfigModel.getAll()
  }
  async getCTAConfigById(id: number): Promise<CTAConfigInstance | null> {
    return this.ctaConfigModel.getById(id)
  }
  async getCTAConfigByType(cta_type: string): Promise<CTAConfigInstance | null> {
    return this.ctaConfigModel.getByType(cta_type)
  }
  async insertCTAConfig(instance: Omit<CTAConfigInstance, 'id' | 'updated_at'>): Promise<number> {
    return this.ctaConfigModel.insert(instance)
  }
  async updateCTAConfig(
    id: number,
    updates: Partial<Omit<CTAConfigInstance, 'id' | 'updated_at'>>
  ): Promise<void> {
    return this.ctaConfigModel.update(id, updates)
  }
  async deleteCTAConfig(id: number): Promise<void> {
    return this.ctaConfigModel.delete(id)
  }

  // Site Settings Methods
  async getSiteSettings(): Promise<SiteSettings> {
    return this.siteSettingsModel.get()
  }
  async updateSiteSettings(
    patch: Partial<Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<SiteSettings> {
    return this.siteSettingsModel.update(patch)
  }

  // Services (single-business)
  async getAllServices(): Promise<Service[]> {
    return this.serviceModel.getAll()
  }
  async getServiceById(id: number): Promise<Service | null> {
    return this.serviceModel.getById(id)
  }
  async insertService(data: Omit<Service, 'id' | 'created_at'>): Promise<number> {
    return this.serviceModel.insert(data)
  }
  async updateService(
    id: number,
    updates: Partial<Omit<Service, 'id' | 'created_at'>>
  ): Promise<void> {
    return this.serviceModel.update(id, updates)
  }
  async deleteService(id: number): Promise<void> {
    return this.serviceModel.delete(id)
  }

  // Explicit availability removed; compute via rules+holidays

  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return this.bookingModel.getAll()
  }
  async getBookingsByService(service_id: number): Promise<Booking[]> {
    return this.bookingModel.getByService(service_id)
  }
  async getBookingById(id: number): Promise<Booking | null> {
    return this.bookingModel.getById(id)
  }
  async insertBooking(data: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    return this.bookingModel.insert(data)
  }
  async updateBooking(
    id: number,
    updates: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<void> {
    return this.bookingModel.update(id, updates)
  }
  async deleteBooking(id: number): Promise<void> {
    return this.bookingModel.delete(id)
  }

  // Availability Rules (recurring weekly)
  async getAvailabilityRulesByService(service_id: number): Promise<AvailabilityRule[]> {
    return this.availabilityRuleModel.getByService(service_id)
  }
  async insertAvailabilityRule(data: Omit<AvailabilityRule, 'id' | 'created_at'>): Promise<number> {
    return this.availabilityRuleModel.insert(data)
  }
  async updateAvailabilityRule(
    id: number,
    updates: Partial<Omit<AvailabilityRule, 'id' | 'created_at'>>
  ): Promise<void> {
    return this.availabilityRuleModel.update(id, updates)
  }
  async deleteAvailabilityRule(id: number): Promise<void> {
    return this.availabilityRuleModel.delete(id)
  }

  // Holidays (date exceptions)
  async getHolidaysByService(service_id: number): Promise<Holiday[]> {
    return this.holidayModel.getByService(service_id)
  }
  async insertHoliday(data: Omit<Holiday, 'id' | 'created_at'>): Promise<number> {
    return this.holidayModel.insert(data)
  }
  async updateHoliday(
    id: number,
    updates: Partial<Omit<Holiday, 'id' | 'created_at'>>
  ): Promise<void> {
    return this.holidayModel.update(id, updates)
  }
  async deleteHoliday(id: number): Promise<void> {
    return this.holidayModel.delete(id)
  }
}

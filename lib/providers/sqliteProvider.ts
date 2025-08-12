import Database from 'better-sqlite3'
import fs from 'fs'
import { IDatabaseProvider } from '../dbProvider'
import { SQLiteEmailModel } from './sqlite/emailModel'
import { SQLiteEmailTemplateDataProvider } from './sqlite/emailTemplateDataModel'
import { SQLITE_DB_PATH, SQLITE_SCHEMA_FILE } from '../constants'
import { ContactSubmission, SQLiteContactModel } from '../models/contact'
import type { EmailTemplateDataInstance } from '../models/emailTemplateData'
import { CTAConfigInstance, SQLiteCTAConfigProvider } from '../models/ctaConfig'
import { SQLiteSiteSettingsModel } from './sqlite/siteSettingsModel'
import type { SiteSettings } from '../models/siteSettings'
import { SQLiteServiceModel } from './sqlite/serviceModel'
import { SQLiteBookingModel } from './sqlite/bookingModel'
import type { Service } from '../models/service'
import type { Booking } from '../models/booking'
import { SQLiteAvailabilityRuleModel } from './sqlite/availabilityRuleModel'
import { SQLiteHolidayModel } from './sqlite/holidayModel'
import type { AvailabilityRule } from '../models/availabilityRule'
import type { Holiday } from '../models/holiday'

type Email = { id: number; email: string; created_at: string }

export class SQLiteProvider implements IDatabaseProvider {
  private db: Database.Database
  private emailModel: SQLiteEmailModel
  private contactModel: SQLiteContactModel
  private emailTemplateDataModel: SQLiteEmailTemplateDataProvider
  private ctaConfigModel: SQLiteCTAConfigProvider
  private siteSettingsModel: SQLiteSiteSettingsModel
  private serviceModel: SQLiteServiceModel
  private bookingModel: SQLiteBookingModel
  private availabilityRuleModel: SQLiteAvailabilityRuleModel
  private holidayModel: SQLiteHolidayModel

  constructor(dbPath: string = SQLITE_DB_PATH, schemaPath: string = SQLITE_SCHEMA_FILE) {
    this.db = new Database(dbPath)
    const schema = fs.readFileSync(schemaPath, 'utf-8')
    this.db.exec(schema)
    this.emailModel = new SQLiteEmailModel(this.db)
    this.contactModel = new SQLiteContactModel(this.db)
    this.emailTemplateDataModel = new SQLiteEmailTemplateDataProvider(this.db)
    this.ctaConfigModel = new SQLiteCTAConfigProvider(this.db)
    this.siteSettingsModel = new SQLiteSiteSettingsModel(this.db)
    this.serviceModel = new SQLiteServiceModel(this.db)
    this.bookingModel = new SQLiteBookingModel(this.db)
    this.availabilityRuleModel = new SQLiteAvailabilityRuleModel(this.db)
    this.holidayModel = new SQLiteHolidayModel(this.db)
  }

  async getAllEmails(): Promise<Email[]> {
    return this.emailModel.getAll()
  }
  async insertEmail(email: string): Promise<void> {
    this.emailModel.insert(email)
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

  // Email Template Data Methods
  async getAllTemplateData(): Promise<EmailTemplateDataInstance[]> {
    return this.emailTemplateDataModel.getAll()
  }

  async getTemplateDataById(id: number): Promise<EmailTemplateDataInstance | null> {
    return this.emailTemplateDataModel.getById(id)
  }

  async getTemplateDataByTemplate(template: string): Promise<EmailTemplateDataInstance[]> {
    return this.emailTemplateDataModel.getByTemplate(template)
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

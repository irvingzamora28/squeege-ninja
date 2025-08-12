// Database provider interface for scalable, swappable DB backends
import type { EmailTemplateDataInstance } from './models/emailTemplateData'
import type { CTAConfigInstance } from './models/ctaConfig'
import type { SiteSettings } from './models/siteSettings'
import type { Service } from './models/service'
import type { Booking } from './models/booking'
import type { AvailabilityRule } from './models/availabilityRule'
import type { Holiday } from './models/holiday'

export interface IDatabaseProvider {
  getAllEmails(): Promise<{ id: number; email: string; created_at: string }[]>
  insertEmail(email: string): Promise<void>
  deleteEmail(id: number): Promise<void>
  getSubscriptionCount(): Promise<number>

  getAllContactSubmissions(): Promise<
    { id: number; name: string; email: string; message: string; created_at: string }[]
  >
  insertContactSubmission(
    data: Omit<{ name: string; email: string; message: string }, 'id' | 'created_at'>
  ): Promise<void>

  // Template Data Methods
  insertTemplateData(
    instance: Omit<EmailTemplateDataInstance, 'id' | 'created_at' | 'updated_at'>
  ): Promise<number>
  getTemplateDataByTemplate(template: string): Promise<EmailTemplateDataInstance[]>
  getAllTemplateData(): Promise<EmailTemplateDataInstance[]>

  updateTemplateData(
    id: number,
    updates: Partial<Omit<EmailTemplateDataInstance, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<void>
  deleteTemplateData(id: number): Promise<void>

  // CTA Config Methods
  getAllCTAConfig(): Promise<CTAConfigInstance[]>
  getCTAConfigById(id: number): Promise<CTAConfigInstance | null>
  getCTAConfigByType(cta_type: string): Promise<CTAConfigInstance | null>
  insertCTAConfig(instance: Omit<CTAConfigInstance, 'id' | 'updated_at'>): Promise<number>
  updateCTAConfig(
    id: number,
    updates: Partial<Omit<CTAConfigInstance, 'id' | 'updated_at'>>
  ): Promise<void>
  deleteCTAConfig(id: number): Promise<void>

  // Site Settings Methods
  getSiteSettings(): Promise<SiteSettings>
  updateSiteSettings(
    patch: Partial<Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<SiteSettings>

  // Services (single-business)
  getAllServices(): Promise<Service[]>
  getServiceById(id: number): Promise<Service | null>
  insertService(data: Omit<Service, 'id' | 'created_at'>): Promise<number>
  updateService(id: number, updates: Partial<Omit<Service, 'id' | 'created_at'>>): Promise<void>
  deleteService(id: number): Promise<void>

  // Explicit availability removed in normalized design (use rules + holidays + bookings)

  // Bookings
  getAllBookings(): Promise<Booking[]>
  getBookingsByService(service_id: number): Promise<Booking[]>
  getBookingById(id: number): Promise<Booking | null>
  insertBooking(data: Omit<Booking, 'id' | 'created_at' | 'updated_at'>): Promise<number>
  updateBooking(
    id: number,
    updates: Partial<Omit<Booking, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<void>
  deleteBooking(id: number): Promise<void>

  // Availability Rules (recurring weekly)
  getAvailabilityRulesByService(service_id: number): Promise<AvailabilityRule[]>
  insertAvailabilityRule(data: Omit<AvailabilityRule, 'id' | 'created_at'>): Promise<number>
  updateAvailabilityRule(
    id: number,
    updates: Partial<Omit<AvailabilityRule, 'id' | 'created_at'>>
  ): Promise<void>
  deleteAvailabilityRule(id: number): Promise<void>

  // Holidays (date exceptions)
  getHolidaysByService(service_id: number): Promise<Holiday[]>
  insertHoliday(data: Omit<Holiday, 'id' | 'created_at'>): Promise<number>
  updateHoliday(id: number, updates: Partial<Omit<Holiday, 'id' | 'created_at'>>): Promise<void>
  deleteHoliday(id: number): Promise<void>
}

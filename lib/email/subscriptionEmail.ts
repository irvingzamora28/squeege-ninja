import { getAllCTAConfig } from '@/lib/ctaConfig'
import { getAllTemplateData } from '@/lib/templateData'
import { sendEmail } from '@/lib/email/sendEmail'
import type { EmailTemplateDataInstance } from '@/lib/models/emailTemplateData'
import type { EmailTemplateData } from '@/types/email'
import type { EmailTemplate } from './config'

/**
 * Handles sending the appropriate email (newsletter, ebook, or welcome) to a new subscriber,
 * based on the current CTA configuration.
 */
export async function sendSubscriptionEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  // Fetch the singleton CTA config
  const ctaConfigs = await getAllCTAConfig()
  if (!ctaConfigs || ctaConfigs.length === 0) {
    return { success: false, error: 'CTA configuration not found' }
  }
  const ctaConfig = ctaConfigs[0]

  // Fetch the template data instance for this config
  const allTemplateData = await getAllTemplateData()
  const templateDataInstance: EmailTemplateDataInstance | undefined = allTemplateData.find(
    (t) => t.id === ctaConfig.template_data_id
  )
  if (!templateDataInstance) {
    return { success: false, error: 'Email template data not found' }
  }

  // Prepare template data for sending
  let templateData: EmailTemplateData = {} as EmailTemplateData
  try {
    templateData = JSON.parse(templateDataInstance.data || '{}') as EmailTemplateData
  } catch {
    templateData = {} as EmailTemplateData
  }

  // Send the email using the correct template
  const subject =
    templateData.subject ||
    (ctaConfig.cta_type === 'newsletter'
      ? 'Welcome to our Newsletter!'
      : ctaConfig.cta_type === 'ebook-delivery'
        ? 'Your Ebook is Here!'
        : 'Welcome!')

  return await sendEmail({
    to: email,
    subject,
    template: ctaConfig.cta_type as EmailTemplate,
    data: templateData,
  })
}

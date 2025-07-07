import { Metadata } from 'next'
import ServicesListLayout from '@/layouts/ServicesListLayout'
import servicesData from '@/data/servicesData.json'
import siteMetadata from '@/data/siteMetadata'
import siteConfig from '@/data/config/site.json'
import ServicesListLayoutServices from '@/layouts/ServicesListLayoutServices'

export const metadata: Metadata = {
  title: 'Services - ' + siteMetadata.title,
  description: 'Explore our range of professional services tailored to meet your business needs.',
}

export default function ServicesPage() {
  const services = servicesData.services

  // Use static titles and descriptions
  const pageTitle = 'Our Services'
  const pageDescription =
    'Explore our range of professional services designed to help your business grow and succeed.'

  // Get the active template from site config
  const activeTemplate = siteConfig.activeTemplate

  // Determine which templates should use the service layout
  const saasTemplates = ['Main', 'Main2', 'Main3', 'Main5'] // SaaS product templates
  const serviceBusinessTemplates = ['Main4'] // Service business templates (dental, barbershop, etc)
  const templateWithoutServiceLayout = ['Main6'] // YouTube template doesn't need services

  // Check if the current template supports services
  if (templateWithoutServiceLayout.includes(activeTemplate)) {
    // For templates that don't support services, show a message or redirect
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-6 text-3xl font-bold">Services Not Available</h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          Services are not available with the current template. Please switch to a business template
          to view services.
        </p>
      </div>
    )
  }

  // For service business templates (Main4), use the specialized layout
  if (serviceBusinessTemplates.includes(activeTemplate)) {
    return (
      <ServicesListLayoutServices
        title={pageTitle}
        description={pageDescription}
        services={services}
      />
    )
  }

  // For SaaS product templates, use the standard layout
  return <ServicesListLayout title={pageTitle} description={pageDescription} services={services} />
}

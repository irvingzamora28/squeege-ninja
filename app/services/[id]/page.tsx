import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceLayout from '@/layouts/ServiceLayout'
import servicesData from '@/data/servicesData.json'
import siteMetadata from '@/data/siteMetadata'
import siteConfig from '@/data/config/site.json'
import { ServiceData } from 'app/allset/landing-content/types'
import ServiceLayoutServices from '@/layouts/ServiceLayoutServices'

type ServicePageProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This disables the lint error for 'any' on the next line
  params: any
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData.services.find((s) => s.id === (params.id as string))

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} - ${siteMetadata.title}`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [service.image],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  }
}

export async function generateStaticParams() {
  return servicesData.services.map((service) => ({
    id: service.id,
  }))
}

export default async function Page({ params }: ServicePageProps) {
  const service = servicesData.services.find((s) => s.id === (params.id as string))

  if (!service) {
    notFound()
  }

  // Find related services if any
  const relatedServices = service.relatedServices
    ? (service.relatedServices
        .map((relatedService) => {
          // Find the full service data for each related service
          const fullServiceData = servicesData.services.find((s) => s.id === relatedService.id)
          return fullServiceData
            ? {
                id: fullServiceData.id,
                title: fullServiceData.title,
                description: fullServiceData.description,
                image: fullServiceData.image,
              }
            : null
        })
        .filter(Boolean) as {
        id: string
        title: string
        description: string
        image: string
      }[])
    : []

  // Type assertion to ensure service data matches the ServiceData interface
  const typedService: ServiceData = {
    ...service,
    content: {
      sections: service.content.sections.map((section) => ({
        ...section,
        imagePosition: section.imagePosition as 'left' | 'right' | 'full',
      })),
    },
    // Include related services in the service object
    relatedServices: relatedServices,
  }

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
    return <ServiceLayoutServices service={typedService} />
  }

  // For SaaS product templates, use the standard layout
  return <ServiceLayout service={typedService} />
}

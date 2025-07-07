import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ServiceLayout, { ServiceData } from '@/layouts/ServiceLayout'
import servicesData from '@/data/servicesData.json'
import siteMetadata from '@/data/siteMetadata'

interface ServicePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData.services.find((s) => s.id === params.id)

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

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesData.services.find((s) => s.id === params.id)

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

  return <ServiceLayout service={typedService} />
}

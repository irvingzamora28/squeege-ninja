import { Metadata } from 'next'
import ServicesListLayout from '@/layouts/ServicesListLayout'
import servicesData from '@/data/servicesData.json'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Services - ' + siteMetadata.title,
  description: 'Explore our range of professional services tailored to meet your business needs.',
}

export default async function ServicesPage() {
  // Map the services data to the format expected by ServicesListLayout
  const services = servicesData.services.map((service) => ({
    id: service.id,
    title: service.title,
    description: service.description,
    image: service.image,
    icon: service.icon,
  }))

  // Use static titles and descriptions
  const pageTitle = 'Our Services'
  const pageDescription =
    'Explore our range of professional services designed to help your business grow and succeed.'

  return <ServicesListLayout title={pageTitle} description={pageDescription} services={services} />
}

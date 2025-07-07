import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import servicesData from '@/data/servicesData.json'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  // Add services routes
  const servicesListRoute = {
    url: `${siteUrl}/services`,
    lastModified: new Date().toISOString().split('T')[0],
  }

  // Add individual service routes
  const serviceRoutes = servicesData.services.map((service) => ({
    url: `${siteUrl}/services/${service.id}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes, servicesListRoute, ...serviceRoutes]
}

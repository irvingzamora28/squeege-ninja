// Types for the landing content data structure

export interface CtaButton {
  text: string
  link: string
}

export interface MainFeaturesSection {
  title?: string
  description?: string
  items: MainFeature[]
}

export interface MainFeature {
  id: number
  icon: string
  title: string
  description: string
  image: string
  imagePrompt?: string
}

export interface FeaturesSection {
  title: string
  description: string
  items: Feature[]
}

export interface Feature {
  title: string
  description: string
  icon: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PricingPlan {
  name: string
  price: string
  description: string
  features: PricingFeature[]
  cta: CtaButton
  highlighted?: boolean
}

export interface PricingFeature {
  text: string
}

export interface HeroSection {
  title: string
  description: string
  primaryCta: CtaButton
  secondaryCta: CtaButton
  image?: string
  imagePrompt?: string
}

export interface CtaSection {
  title: string
  description: string
  button: CtaButton
  collectEmail?: boolean
}

export interface FaqsSection {
  title: string
  description: string
  questions: FaqItem[]
}

export interface PricingSection {
  title: string
  description: string
  plans: PricingPlan[]
}

export interface TestimonialSection {
  title?: string
  description?: string
  image?: string
  imagePrompt?: string
  testimonials: Testimonial[]
}

export interface Testimonial {
  name: string
  quote: string
  image: string
  title?: string
  imagePrompt?: string
}

export interface GalleryImage {
  src: string
  alt: string
  caption: string
  imagePrompt?: string
}

export interface GallerySection {
  title: string
  description: string
  images: GalleryImage[]
}

export interface ServiceSection {
  title: string
  description: string
  items: Service[]
}

export interface Service {
  title: string
  description: string
  icon: string
  image: string
  imagePrompt?: string
}

// Extended service data for service detail pages
export interface ServiceData {
  id: string
  title: string
  description: string
  content: {
    sections: Array<{
      title: string
      text: string
      image?: string
      imageAlt?: string
      imagePosition?: 'left' | 'right' | 'full'
    }>
  }
  icon?: string
  image: string
  features?: Array<{
    title: string
    description: string
    icon?: string
  }>
  cta?: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
  }
  relatedServices?: Array<{
    id: string
    title: string
    description: string
    image: string
  }>
  category?: string
  testimonials?: Array<{
    name: string
    role: string
    quote: string
    image?: string
  }>
  businessHours?: Array<{
    day: string
    hours: string
  }>
  contactInfo?: {
    phone?: string
    email?: string
    address?: string[]
  }
  pricing?: Array<{
    name: string
    price: string
    description: string
    features: string[]
    title?: string
    duration?: string
  }>
  // Additional fields for service business templates
  availability?: {
    days: string
    hours: string
  }
  location?: {
    address: string
    mapUrl?: string
  }
}

export interface ServiceLayoutProps {
  service: ServiceData
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  image?: string
  icon?: string
  category?: string
}

export interface ServicesListLayoutProps {
  title: string
  description?: string
  services: ServiceItem[]
}

export interface Project {
  title: string
  description: string
  image: string
  imagePrompt?: string
  category: string
  completionDate: string
}

export interface ProjectsSection {
  title: string
  description: string
  items: Project[]
}

export interface ContactField {
  name: string
  label: string
  type: string
  required: boolean
}

export interface ContactInfo {
  title: string
  phone?: {
    label: string
    number: string
    hours?: string
  }
  email?: {
    label: string
    address: string
    responseTime?: string
  }
  location?: {
    label: string
    address: string[]
  }
}

export interface EmergencyService {
  title: string
  description: string
  hotlineLabel: string
  hotlineNumber: string
}

export interface ContactSection {
  title: string
  description: string
  fields: ContactField[]
  submitLabel: string
  successMessage: string
  contactInfo?: ContactInfo
  emergencyService?: EmergencyService
}

export interface StatsSection {
  title: string
  description: string
  items: StatItem[]
}

export interface StatItem {
  value: string
  label: string
}

export interface BaseLandingContent {
  pageType: string
  seo?: {
    title: string
    description: string
    keywords?: string[]
  }
  theme?: {
    primaryColor?: string
  }
}

export interface ServicesLandingContent extends BaseLandingContent {
  pageType: 'services'
  hero: HeroSection
  mainFeatures: MainFeaturesSection
  features: FeaturesSection
  cta: CtaSection
  gallery?: GallerySection
  faqs: FaqsSection
  pricing?: PricingSection
  testimonials?: TestimonialSection
  contact?: ContactSection
  services?: ServiceSection
  projects?: ProjectsSection
  stats?: StatsSection
}

export interface ProductSaaSLandingContent extends BaseLandingContent {
  pageType: 'product' | 'saas'
  hero: HeroSection
  mainFeatures: MainFeaturesSection
  features: FeaturesSection
  cta: CtaSection
  faqs: FaqsSection
  pricing?: PricingSection
  testimonials?: TestimonialSection
  contact?: ContactSection
  projects?: ProjectsSection
  stats?: StatsSection
}

export interface YouTubeLandingContent extends BaseLandingContent {
  pageType: 'youtube'
  channelInfo: {
    name: string
    description: string
    subscriberCount: string
    profileImage: string
    bannerImage: string
    joinDate: string
    totalViews: string
    links: Array<{
      platform: string
      url: string
      icon: string
    }>
  }
  featuredVideos: Array<{
    id: string
    title: string
    description: string
    thumbnail: string
    viewCount: string
    duration: string
    publishedAt: string
    url: string
  }>
  playlists?: Array<{
    id: string
    title: string
    description: string
    videoCount: number
    thumbnail: string
    lastUpdated: string
  }>
  cta: {
    subscribeText: string
    subscribeLink: string
    joinText: string
    joinLink: string
    socialLinks: Array<{
      platform: string
      url: string
      icon: string
    }>
  }
  about?: {
    title: string
    content: string
    stats: Array<{
      label: string
      value: string
    }>
  }
  contact?: ContactSection
}

export type LandingContent = ProductSaaSLandingContent | YouTubeLandingContent

export const PAGE_TYPES = {
  product: {
    id: 'product',
    name: 'Product/SaaS',
    description: 'For digital products and software services',
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube Channel',
    description: 'For content creators and YouTube channels',
  },
  services: {
    id: 'services',
    name: 'Services',
    description: 'For service-based businesses',
  },
} as const

export type PageType = keyof typeof PAGE_TYPES

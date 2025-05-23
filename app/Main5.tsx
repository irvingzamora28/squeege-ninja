'use client'

import React from 'react'
import {
  HeroSection,
  StatsSection,
  MainFeaturesSection,
  AppShowcaseSection,
  FeaturesSection,
  TestimonialsSection,
  PricingSection,
  CtaSection,
  FaqSection,
} from '@/components/Main5'
import dataLandingContent from '@/data/landingContent.json'
import { LandingContent } from './allset/landing-content/types'

const landingContent = dataLandingContent as LandingContent

const Main5 = () => {
  // Stats for new section
  const stats = [
    { value: '98%', label: 'User Satisfaction' },
    { value: '24/7', label: 'Customer Support' },
    { value: '50K+', label: 'Active Users' },
    { value: '5M+', label: 'Notes Created' },
  ]

  const { hero, mainFeatures, features, cta, pricing, contact, faqs, testimonials } = landingContent
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white text-gray-900 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
      <HeroSection hero={hero} mainFeatures={mainFeatures.items} />
      <StatsSection stats={stats} />
      <MainFeaturesSection mainFeatures={mainFeatures.items} />
      <AppShowcaseSection />
      <FeaturesSection features={features} />
      {testimonials && <TestimonialsSection testimonials={testimonials} />}
      {pricing && <PricingSection pricing={pricing} />}
      <CtaSection cta={cta} />
      <FaqSection faqs={faqs} />
    </div>
  )
}

export default Main5

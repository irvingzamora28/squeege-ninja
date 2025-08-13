'use client'

import React from 'react'
import dataLandingContent from '@/data/landingContent.json'
import { ServicesLandingContent } from './allset/landing-content/types'

// Main8 components (new)
import {
  HeroSection,
  ServicesSection,
  TestimonialsSection,
  PricingSection,
  GallerySection,
  FaqSection,
  BookingCtaSection,
} from '@/components/Main8'

// Reuse existing polished sections
import {
  MainFeaturesSection,
  FeaturesSection,
  ContactSection,
  StatsSection,
} from '@/components/Main5'
import { ProjectsSection } from '@/components/Main7'

const landingContent = dataLandingContent as unknown as ServicesLandingContent

const Main8 = () => {
  const {
    hero,
    mainFeatures,
    features,
    cta,
    gallery,
    faqs,
    pricing,
    testimonials,
    contact,
    services,
    projects,
    stats,
  } = landingContent

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Full-bleed hero image */}
      <HeroSection hero={hero} />

      {/* Main features/benefits section */}
      {mainFeatures && mainFeatures.items?.length ? (
        <MainFeaturesSection mainFeatures={mainFeatures} />
      ) : null}

      {/* Services grid */}
      {services && services.items?.length ? <ServicesSection services={services} /> : null}

      {/* Feature list */}
      {features && features.items?.length ? <FeaturesSection features={features} /> : null}

      {/* Optional gallery */}
      {gallery && gallery.images?.length ? <GallerySection gallery={gallery} /> : null}

      {/* Stats */}
      {stats?.items?.length ? <StatsSection stats={stats.items} /> : null}

      {/* Projects / case studies */}
      {projects?.items?.length ? <ProjectsSection projects={projects} /> : null}

      {/* Testimonials */}
      {testimonials?.testimonials?.length ? (
        <TestimonialsSection testimonials={testimonials} />
      ) : null}

      {/* Pricing */}
      {pricing?.plans?.length ? <PricingSection pricing={pricing} /> : null}

      {/* FAQs */}
      <FaqSection faqs={faqs} />

      {/* Booking CTA (Main8-specific) */}
      <BookingCtaSection cta={cta} />

      {/* Contact */}
      {contact ? <ContactSection contact={contact} /> : null}
    </div>
  )
}

export default Main8

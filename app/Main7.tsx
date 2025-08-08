'use client'

import React from 'react'
import dataLandingContent from '@/data/landingContent.json'
import { ServicesLandingContent } from './allset/landing-content/types'
import { motion } from 'framer-motion'

// Main7 specific sections only
import {
  HeroSection,
  FeaturesSection,
  ServicesSection,
  GallerySection,
  PricingSection,
  TestimonialsSection,
  ProjectsSection,
  ContactSection,
} from '@/components/Main7'

const landingContent = dataLandingContent as unknown as ServicesLandingContent

const Main7: React.FC = () => {
  const { hero, features, services, gallery, pricing, testimonials, contact, projects } =
    landingContent

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
      {/* Subtle animated background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="bg-primary-500/20 absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl"
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Hero */}
      {hero && <HeroSection hero={hero} />}

      {/* Features Grid */}
      {features?.items?.length > 0 && <FeaturesSection features={features} />}

      {/* Services */}
      {services && <ServicesSection services={services} />}

      {/* Gallery */}
      {gallery && <GallerySection gallery={gallery} />}

      {/* Pricing */}
      {pricing?.plans?.length ? <PricingSection pricing={pricing} /> : null}

      {/* Testimonials */}
      {testimonials?.testimonials?.length ? (
        <TestimonialsSection testimonials={testimonials} />
      ) : null}

      {/* Projects */}
      {projects?.items?.length ? <ProjectsSection projects={projects} /> : null}

      {/* Contact */}
      {contact && <ContactSection contact={contact} />}
    </div>
  )
}

export default Main7

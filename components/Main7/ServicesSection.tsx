'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ServiceSection as ServiceSectionType } from '../../app/allset/landing-content/types'
import { containerVariants, fadeInUpVariants } from '@/components/Main5/AnimationVariants'
import FeatureIcon from '@/components/FeatureIcon'

interface Props {
  services: ServiceSectionType
}

const ServicesSection: React.FC<Props> = ({ services }) => {
  return (
    <section id="services" className="relative bg-white py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={containerVariants}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            {services.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">{services.description}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((svc, i) => (
            <motion.div
              key={i}
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-300 mb-4 inline-flex items-center justify-center rounded-xl p-3 shadow-sm">
                  <FeatureIcon icon={svc.icon} />
                </div>
                <h3 className="mb-2 text-xl font-bold">{svc.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{svc.description}</p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                    Learn more
                  </span>
                  <svg
                    className="text-primary-600 dark:text-primary-400 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

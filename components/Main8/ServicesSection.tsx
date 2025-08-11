'use client'

import React from 'react'
import Image from 'next/image'
import FeatureIcon from '@/components/FeatureIcon'
import { ServiceSection as ServiceSectionType } from 'app/allset/landing-content/types'
import { Space_Grotesk } from 'next/font/google'

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] })

interface Props {
  services: ServiceSectionType
}

const ServicesSection: React.FC<Props> = ({ services }) => {
  const { title, description, items } = services

  return (
    <section id="services" className="relative py-20 sm:py-24">
      {/* background split */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-white dark:from-gray-950 dark:to-gray-950" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 bg-gradient-to-b from-white/0 via-white/40 to-white dark:from-gray-900/0 dark:via-gray-900/30 dark:to-gray-900" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`${display.className} text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white`}
          >
            {title}
          </h2>
          <div className="from-primary-500 mx-auto mt-3 h-1 w-24 rounded-full bg-gradient-to-r to-purple-500" />
          <p className="mt-5 text-gray-600 dark:text-gray-300">{description}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((svc, i) => (
            <div key={i} className="group relative">
              {/* gradient ring on hover */}
              <div
                className="pointer-events-none absolute -inset-[1px] -z-10 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(168,85,247,0.5))',
                }}
              />

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="relative h-48 w-full overflow-hidden">
                  {svc.image ? (
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
                  )}
                  <div className="absolute top-4 left-4 rounded-full bg-black/55 p-2 text-white backdrop-blur">
                    <FeatureIcon icon={svc.icon} size="5" />
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className={`${display.className} text-lg font-semibold text-gray-900 dark:text-white`}
                  >
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{svc.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection

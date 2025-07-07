'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  image: string
  icon?: string
}

interface ServicesListLayoutProps {
  title: string
  description?: string
  services: ServiceItem[]
}

export default function ServicesListLayout({
  title,
  description,
  services,
}: ServicesListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')

  const filteredServices = services.filter((service) => {
    const searchContent = service.title + service.description
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <motion.div className="space-y-2 pt-6 pb-8 md:space-y-5" variants={fadeInUp}>
            <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-slate-800 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
              {title}
            </h1>
            {description && (
              <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{description}</p>
            )}
            <div className="relative max-w-lg">
              <label>
                <span className="sr-only">Search services</span>
                <input
                  aria-label="Search services"
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search services"
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border border-gray-300 bg-slate-100 px-4 py-2 text-slate-800 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                />
              </label>
              <svg
                className="absolute top-3 right-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </motion.div>

          <div className="py-12">
            {!filteredServices.length && (
              <p className="text-center text-lg text-gray-500 dark:text-gray-400">
                No services found.
              </p>
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="relative h-48">
                    <Image
                      src={service.image || '/static/images/placeholder.jpg'}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
                      {service.description}
                    </p>
                    <Link
                      href={`/services/${service.id}`}
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center font-medium"
                    >
                      Learn more
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ServiceItem, ServicesListLayoutProps } from '../app/allset/landing-content/types'
import { FaArrowRight, FaSearch, FaTools, FaWrench, FaUserMd, FaCut } from 'react-icons/fa'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
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

// Service business specific category icons
const categoryIcons = {
  repair: FaWrench,
  medical: FaUserMd,
  beauty: FaCut,
  general: FaTools,
}

// Interface definitions moved to app/allset/landing-content/types.ts

export default function ServicesListLayoutServices({
  title,
  description,
  services,
}: ServicesListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  // Get unique categories from services
  const categories = ['all', ...new Set(services.map((service) => service.category || 'general'))]

  // Filter services by search and category
  const filteredServices = services.filter((service) => {
    const searchContent = service.title + service.description
    const matchesSearch = searchContent.toLowerCase().includes(searchValue.toLowerCase())
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="bg-gray-50 dark:bg-gray-900"
    >
      {/* Hero Section */}
      <section className="bg-blue-700 py-16 text-white md:py-24 dark:bg-blue-900">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">{title}</h1>
            {description && <p className="text-xl opacity-90 md:text-2xl">{description}</p>}
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* Search */}
              <div className="relative w-full md:max-w-md">
                <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400" />
                <input
                  aria-label="Search services"
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search for a service..."
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-12 text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-400"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const CategoryIcon = categoryIcons[category] || FaTools
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      <CategoryIcon className="mr-2" />
                      <span className="capitalize">{category}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          {filteredServices.length === 0 ? (
            <motion.div variants={fadeIn} className="mx-auto max-w-2xl text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-gray-500 dark:bg-gray-700">
                <FaSearch className="text-4xl" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                No services found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service, index) => {
                const CategoryIcon = service.category ? categoryIcons[service.category] : FaTools

                return (
                  <motion.div
                    key={service.id}
                    variants={fadeInUp}
                    className="group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800"
                  >
                    <div className="relative h-48">
                      <Image
                        src={service.image || '/static/images/service-placeholder.jpg'}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
                        <CategoryIcon className="mr-1" />
                        <span className="capitalize">{service.category || 'General'}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                        {service.title}
                      </h2>
                      <p className="mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
                        {service.description}
                      </p>
                      <Link
                        href={`/services/${service.id}`}
                        className="group inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Service Details
                        <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  )
}

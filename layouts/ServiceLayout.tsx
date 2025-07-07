'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FaArrowLeft,
  FaRocket,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaPlay,
  FaGlobe,
  FaShieldAlt,
  FaCog,
  FaLightbulb,
  FaChartLine,
  FaUsers,
} from 'react-icons/fa'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const scaleOnHover = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// Modern geometric shapes components
const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute opacity-20 ${className}`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay: delay,
    }}
  />
)

const GradientOrb = ({ className, size = 'w-32 h-32' }) => (
  <div
    className={`${size} ${className} absolute rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-30 blur-xl`}
  />
)

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
}

interface ServiceLayoutProps {
  service: ServiceData
}

// Sample data for demo
const sampleService: ServiceData = {
  id: 'web-development',
  title: 'Web Development Excellence',
  description:
    'Transform your digital presence with cutting-edge web solutions that drive results and engage your audience.',
  image: '/api/placeholder/800/600',
  content: {
    sections: [
      {
        title: 'Custom Solutions Tailored for You',
        text: 'We create bespoke web applications that perfectly align with your business objectives. Our team combines technical expertise with creative vision to deliver exceptional digital experiences.',
        image: '/api/placeholder/600/400',
        imagePosition: 'right',
      },
      {
        title: 'Performance & Scalability',
        text: 'Built for growth, our web solutions are optimized for speed, security, and scalability. We ensure your platform can handle increasing traffic and evolving business needs.',
        image: '/api/placeholder/600/400',
        imagePosition: 'left',
      },
    ],
  },
  features: [
    {
      title: 'Lightning Fast Performance',
      description:
        'Optimized code and modern architecture ensure your website loads in milliseconds.',
      icon: 'FaRocket',
    },
    {
      title: 'Mobile-First Design',
      description: 'Responsive layouts that look perfect on every device and screen size.',
      icon: 'FaGlobe',
    },
    {
      title: 'Enterprise Security',
      description: 'Bank-level security protocols to protect your data and user information.',
      icon: 'FaShieldAlt',
    },
    {
      title: 'Smart Automation',
      description: 'Intelligent workflows that streamline your business processes.',
      icon: 'FaCog',
    },
    {
      title: 'Data Analytics',
      description: 'Comprehensive insights to track performance and user behavior.',
      icon: 'FaChartLine',
    },
    {
      title: 'Team Collaboration',
      description: 'Built-in tools for seamless team communication and project management.',
      icon: 'FaUsers',
    },
  ],
  cta: {
    title: 'Ready to Transform Your Digital Presence?',
    description:
      'Join hundreds of satisfied clients who have revolutionized their business with our cutting-edge solutions.',
    buttonText: 'Start Your Project',
    buttonLink: '/contact',
  },
  relatedServices: [
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications.',
      image: '/api/placeholder/400/300',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'User-centered design that converts visitors into customers.',
      image: '/api/placeholder/400/300',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Comprehensive marketing strategies to grow your online presence.',
      image: '/api/placeholder/400/300',
    },
  ],
}

const iconMap = {
  FaRocket: FaRocket,
  FaGlobe: FaGlobe,
  FaShieldAlt: FaShieldAlt,
  FaCog: FaCog,
  FaChartLine: FaChartLine,
  FaUsers: FaUsers,
  FaLightbulb: FaLightbulb,
}

export default function ServiceLayout({ service = sampleService }: ServiceLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!service) {
    return <div className="py-20 text-center">Service not found</div>
  }

  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <GradientOrb className="top-20 left-10" size="w-64 h-64" />
          <GradientOrb className="right-10 bottom-20" size="w-80 h-80" />
          <FloatingShape
            className="top-32 right-1/4 h-16 w-16 rotate-45 transform rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600"
            delay={0}
          />
          <FloatingShape
            className="bottom-40 left-1/4 h-12 w-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600"
            delay={2}
          />
          <FloatingShape
            className="top-1/2 left-10 h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"
            delay={4}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div variants={fadeInUp} className="mb-8">
            <button className="group inline-flex items-center rounded-full bg-white/80 px-6 py-3 text-indigo-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:text-indigo-700 hover:shadow-xl dark:bg-gray-800/80 dark:text-indigo-400 dark:hover:text-indigo-300">
              <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to all services</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                <FaStar className="mr-2" />
                Premium Service
              </div>

              <h1 className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-5xl leading-tight font-black text-transparent md:text-6xl lg:text-7xl dark:from-white dark:via-blue-100 dark:to-purple-100">
                {service.title}
              </h1>

              <p className="text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">
                {service.description}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                {service.cta && (
                  <motion.button
                    whileHover="hover"
                    variants={scaleOnHover}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-blue-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <span className="relative flex items-center">
                      <FaRocket className="mr-2" />
                      {service.cta.buttonText}
                    </span>
                  </motion.button>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeInRight} className="relative">
              <div className="relative z-10 overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-100 p-8 shadow-2xl dark:from-gray-800 dark:to-gray-900">
                <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                  <div className="text-center text-white">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                      <FaPlay className="ml-1 text-2xl" />
                    </div>
                    <p className="text-lg font-medium">Service Preview</p>
                  </div>
                </div>
              </div>

              {/* Floating elements around the preview */}
              <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"></div>
              <div className="absolute -bottom-6 -left-6 h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      {service.content &&
        service.content.sections &&
        service.content.sections.map((section, index) => {
          const isEven = index % 2 === 0
          const imagePosition = section.imagePosition || (isEven ? 'right' : 'left')

          return (
            <motion.section
              key={index}
              className={`relative overflow-hidden py-20 ${
                index % 2 === 0
                  ? 'bg-white dark:bg-gray-900'
                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900'
              }`}
              variants={fadeInUp}
            >
              <div className="absolute inset-0 overflow-hidden">
                <GradientOrb
                  className={`${index % 2 === 0 ? 'top-20 right-10' : 'bottom-20 left-10'}`}
                  size="w-48 h-48"
                />
              </div>

              <div className="relative z-10 container mx-auto px-4">
                <div
                  className={`grid grid-cols-1 items-center gap-16 lg:grid-cols-2 ${
                    imagePosition === 'left' ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <motion.div
                    variants={imagePosition === 'left' ? fadeInLeft : fadeInRight}
                    className="space-y-6"
                  >
                    <div className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                      <FaCheckCircle className="mr-2" />
                      Key Feature
                    </div>

                    <h2 className="text-4xl leading-tight font-black text-gray-900 md:text-5xl dark:text-white">
                      {section.title}
                    </h2>

                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                      {section.text}
                    </p>

                    <motion.button
                      whileHover="hover"
                      variants={scaleOnHover}
                      className="group inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      <span>Learn More</span>
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </motion.div>

                  <motion.div
                    variants={imagePosition === 'left' ? fadeInRight : fadeInLeft}
                    className="relative"
                  >
                    <div className="relative z-10 overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-100 p-6 shadow-2xl dark:from-gray-800 dark:to-gray-900">
                      <div className="flex aspect-video items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
                        <div className="text-center text-white">
                          <FaLightbulb className="mx-auto mb-4 text-4xl" />
                          <p className="text-lg font-medium">Innovation at Work</p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 to-red-500 shadow-lg"></div>
                    <div className="absolute -bottom-4 -left-4 h-6 w-6 rounded-full bg-gradient-to-br from-green-400 to-teal-500 shadow-lg"></div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          )
        })}

      {/* Features Section */}
      {service.features && service.features.length > 0 && (
        <motion.section
          className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-indigo-900 py-20 dark:from-black dark:to-indigo-900"
          variants={fadeInUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            <GradientOrb className="top-20 left-1/4" size="w-64 h-64" />
            <GradientOrb className="right-1/4 bottom-20" size="w-80 h-80" />
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <motion.div variants={fadeInUp} className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                <FaStar className="mr-2" />
                Premium Features
              </div>

              <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
                Everything You Need to Succeed
              </h2>

              <p className="mx-auto max-w-3xl text-xl text-gray-300">
                Discover the powerful features that set our services apart from the competition
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {service.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || FaRocket

                return (
                  <motion.div
                    key={index}
                    className="group relative"
                    variants={fadeInUp}
                    whileHover="hover"
                  >
                    <motion.div
                      variants={scaleOnHover}
                      className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-white/20 dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:bg-gray-800/70"
                    >
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
                        <IconComponent className="text-2xl text-white" />
                      </div>

                      <h3 className="mb-4 text-2xl font-bold text-white">{feature.title}</h3>

                      <p className="leading-relaxed text-gray-300">{feature.description}</p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      {service.cta && (
        <motion.section
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20"
          variants={fadeInUp}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 overflow-hidden">
            <FloatingShape
              className="top-20 left-20 h-32 w-32 rounded-full bg-white/10"
              delay={0}
            />
            <FloatingShape
              className="right-20 bottom-20 h-24 w-24 rotate-45 transform rounded-2xl bg-white/10"
              delay={2}
            />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div variants={fadeInUp} className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
                {service.cta.title}
              </h2>

              <p className="mb-10 text-xl leading-relaxed text-white/90 md:text-2xl">
                {service.cta.description}
              </p>

              <motion.button
                whileHover="hover"
                variants={scaleOnHover}
                className="group relative overflow-hidden rounded-2xl bg-white px-10 py-5 text-lg font-black text-purple-600 shadow-2xl transition-all duration-300 hover:text-purple-700 hover:shadow-white/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative flex items-center">
                  <FaRocket className="mr-3" />
                  {service.cta.buttonText}
                  <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Related Services */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <motion.section
          className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 py-20 dark:from-gray-900 dark:to-indigo-900"
          variants={fadeInUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            <GradientOrb className="top-20 right-20" size="w-48 h-48" />
            <GradientOrb className="bottom-20 left-20" size="w-64 h-64" />
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <motion.div variants={fadeInUp} className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                <FaGlobe className="mr-2" />
                Explore More
              </div>

              <h2 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl dark:text-white">
                Related Services
              </h2>

              <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                Discover our complete suite of services designed to accelerate your success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {service.relatedServices.map((relatedService, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  variants={fadeInUp}
                  whileHover="hover"
                >
                  <motion.div
                    variants={scaleOnHover}
                    className="relative z-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
                      <div className="text-center text-white">
                        <FaLightbulb className="mx-auto mb-2 text-3xl" />
                        <p className="font-medium">Service Preview</p>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                        {relatedService.title}
                      </h3>

                      <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                        {relatedService.description}
                      </p>

                      <button className="group inline-flex items-center font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        <span>Learn more</span>
                        <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>

                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </motion.div>
  )
}

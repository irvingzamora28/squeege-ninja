'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ServiceData, ServiceLayoutProps } from '../app/allset/landing-content/types'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaTools,
  FaUserMd,
  FaWrench,
  FaShieldAlt,
  FaThumbsUp,
  FaAward,
  FaHandshake,
  FaCertificate,
  FaHeart,
  FaCar,
  FaCut,
  FaHome,
  FaBolt,
  FaWater,
  FaPlay,
  FaQuoteLeft,
  FaStarHalfAlt,
} from 'react-icons/fa'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
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

const slideInFromBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Modern background elements
const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
  <motion.div
    className={`absolute opacity-10 ${className}`}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 3, -3, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay: delay,
    }}
  >
    <Icon className="text-6xl" />
  </motion.div>
)

const GradientBlur = ({ className, color }) => (
  <div className={`absolute ${className} ${color} rounded-full opacity-20 blur-3xl`} />
)

// Service business specific components
const ServiceHighlight = ({ icon: Icon, title, description, accent = 'blue' }) => {
  const accentColors = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
    teal: 'from-teal-500 to-blue-500',
  }

  return (
    <motion.div variants={fadeInUp} whileHover="hover" className="group relative overflow-hidden">
      <motion.div
        variants={scaleOnHover}
        className="hover:shadow-3xl relative z-10 flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-2xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
      >
        <div
          className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${accentColors[accent]} shadow-lg`}
        >
          <Icon className="text-3xl text-white" />
        </div>
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
      <div className="absolute -bottom-2 -left-2 h-3 w-3 rounded-full bg-gradient-to-br from-green-400 to-blue-500"></div>
    </motion.div>
  )
}

const TestimonialCard = ({ name, role, content, rating = 5 }) => (
  <motion.div variants={fadeInUp} whileHover="hover" className="group relative">
    <motion.div
      variants={scaleOnHover}
      className="relative z-10 rounded-3xl border border-gray-100 bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-6">
        <FaQuoteLeft className="text-3xl text-blue-500 opacity-50" />
      </div>

      <p className="mb-6 leading-relaxed text-gray-700 italic dark:text-gray-300">"{content}"</p>

      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>

        <div className="flex items-center">
          {[...Array(Math.floor(rating))].map((_, i) => (
            <FaStar key={i} className="text-sm text-yellow-400" />
          ))}
          {rating % 1 !== 0 && <FaStarHalfAlt className="text-sm text-yellow-400" />}
        </div>
      </div>
    </motion.div>
  </motion.div>
)

// Sample service data for demonstration
const sampleService = {
  id: 'dental-clinic',
  title: 'Premium Dental Care',
  description:
    'Experience world-class dental care with our state-of-the-art facility and expert team of professionals.',
  image: '/api/placeholder/800/500',
  contactInfo: {
    phone: '+1 (555) 123-4567',
    email: 'info@dentalcare.com',
  },
  businessHours: [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  location: {
    address: '123 Main Street, Downtown, City 12345',
  },
  content: {
    sections: [
      {
        title: 'State-of-the-Art Facilities',
        text: 'Our clinic features the latest dental technology and equipment to provide you with the best possible care in a comfortable environment.',
        image: '/api/placeholder/600/400',
        imagePosition: 'right' as const,
      },
      {
        title: 'Experienced Professionals',
        text: 'Our team of dentists and hygienists have years of experience and stay up-to-date with the latest techniques and procedures.',
        image: '/api/placeholder/600/400',
        imagePosition: 'left' as const,
      },
      {
        title: 'Comprehensive Treatment Plans',
        text: 'Every patient receives a personalized treatment plan designed specifically for their needs. We take the time to understand your concerns and goals, creating a roadmap to optimal oral health.',
        image: '/api/placeholder/600/400',
        imagePosition: 'left' as const,
      },
    ],
  },
  features: [
    {
      title: 'Expert Team',
      description:
        'Board-certified professionals with years of experience in advanced dental care.',
    },
    {
      title: 'Modern Equipment',
      description: 'State-of-the-art technology for precise diagnosis and comfortable treatment.',
    },
    {
      title: 'Flexible Scheduling',
      description: 'Convenient appointment times that work with your busy schedule.',
    },
    {
      title: 'Insurance Accepted',
      description:
        'We work with most major insurance providers and offer flexible payment options.',
    },
    {
      title: '24/7 Emergency Care',
      description: 'Round-the-clock emergency services for urgent dental needs.',
    },
    {
      title: 'Patient Comfort',
      description:
        'Relaxing environment with amenities designed for your comfort and peace of mind.',
    },
  ],
  pricing: [
    {
      name: 'Basic Cleaning',
      title: 'Basic Cleaning',
      price: '$99',
      duration: '45 minutes',
      description: 'Professional teeth cleaning and oral examination.',
      features: ['Plaque removal', 'Teeth polishing', 'Oral health assessment'],
    },
    {
      name: 'Comprehensive Exam',
      title: 'Comprehensive Exam',
      price: '$199',
      duration: '90 minutes',
      description: 'Complete dental examination with x-rays and consultation.',
      features: ['Digital x-rays', 'Oral cancer screening', 'Treatment planning'],
    },
    {
      name: 'Whitening Treatment',
      title: 'Whitening Treatment',
      price: '$299',
      duration: '60 minutes',
      description: 'Professional teeth whitening for a brighter smile.',
      features: ['Custom whitening trays', 'Professional-grade gel', 'Shade assessment'],
    },
  ],
  cta: {
    title: 'Ready to Transform Your Smile?',
    description:
      'Book your appointment today and experience the difference of premium dental care.',
    buttonText: 'Schedule Appointment',
    buttonLink: '/book-appointment',
  },
  relatedServices: [
    {
      id: 'orthodontics',
      title: 'Orthodontic Care',
      description: 'Straighten your teeth with modern braces and clear aligners.',
      image: '/api/placeholder/400/300',
    },
    {
      id: 'cosmetic',
      title: 'Cosmetic Dentistry',
      description: 'Enhance your smile with veneers, crowns, and aesthetic treatments.',
      image: '/api/placeholder/400/300',
    },
    {
      id: 'surgery',
      title: 'Oral Surgery',
      description: 'Expert surgical procedures including extractions and implants.',
      image: '/api/placeholder/400/300',
    },
  ],
}

function ServiceLayoutServices({ service = sampleService }: ServiceLayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!service) {
    return <div className="py-20 text-center">Service not found</div>
  }

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Happy Customer',
      content:
        "Absolutely amazing service! The team was professional, friendly, and exceeded all my expectations. I couldn't be happier with the results.",
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Regular Client',
      content:
        "I've been coming here for years and they never disappoint. Quality work, fair prices, and excellent customer service every time.",
      rating: 5,
    },
    {
      name: 'Emma Rodriguez',
      role: 'First-time Visitor',
      content:
        'From the moment I walked in, I felt welcomed and cared for. The attention to detail and professionalism is outstanding.',
      rating: 5,
    },
  ]

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
          <GradientBlur
            className="top-20 left-20 h-80 w-80"
            color="bg-gradient-to-br from-blue-400 to-cyan-400"
          />
          <GradientBlur
            className="right-20 bottom-20 h-96 w-96"
            color="bg-gradient-to-br from-purple-400 to-pink-400"
          />

          <FloatingIcon icon={FaUserMd} className="top-32 right-1/4 text-blue-500" delay={0} />
          <FloatingIcon icon={FaTools} className="bottom-40 left-1/4 text-purple-500" delay={2} />
          <FloatingIcon icon={FaShieldAlt} className="top-1/2 left-20 text-green-500" delay={4} />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div variants={fadeInUp} className="mb-8">
            <button className="group inline-flex items-center rounded-full bg-white/80 px-6 py-3 text-blue-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:text-blue-700 hover:shadow-xl dark:bg-gray-800/80 dark:text-blue-400 dark:hover:text-blue-300">
              <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to all services</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div variants={fadeInLeft} className="space-y-8">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                <FaAward className="mr-2" />
                Professional Service
              </div>

              <h1 className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-5xl leading-tight font-black text-transparent md:text-6xl dark:from-white dark:via-blue-100 dark:to-purple-100">
                {service.title}
              </h1>

              <p className="text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">
                {service.description}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                {service.contactInfo && (
                  <motion.a
                    href={`tel:${service.contactInfo.phone}`}
                    whileHover="hover"
                    variants={scaleOnHover}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-green-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <span className="relative flex items-center justify-center">
                      <FaPhoneAlt className="mr-2" />
                      Call Now
                    </span>
                  </motion.a>
                )}

                {service.cta && (
                  <motion.button
                    whileHover="hover"
                    variants={scaleOnHover}
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-blue-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <span className="relative flex items-center justify-center">
                      <FaCalendarAlt className="mr-2" />
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
                    <p className="text-lg font-medium">Service Showcase</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"></div>
              <div className="absolute -bottom-6 -left-6 h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Information Cards */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
              <FaClock className="mr-2" />
              Service Information
            </div>
            <h2 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl dark:text-white">
              Everything You Need to Know
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <ServiceHighlight
              icon={FaClock}
              title="Business Hours"
              description={
                service.businessHours
                  ? service.businessHours.map((hour) => `${hour.day}: ${hour.hours}`).join(', ')
                  : 'Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 10:00 AM - 4:00 PM, Sunday: Closed'
              }
              accent="blue"
            />

            <ServiceHighlight
              icon={FaMapMarkerAlt}
              title="Location"
              description={service.location?.address || '123 Main Street, Downtown, City 12345'}
              accent="green"
            />

            <ServiceHighlight
              icon={FaPhoneAlt}
              title="Contact Us"
              description={`Call us at ${service.contactInfo?.phone || '+1 (555) 123-4567'} for immediate assistance`}
              accent="purple"
            />
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
                <GradientBlur
                  className={`${index % 2 === 0 ? 'top-20 right-20' : 'bottom-20 left-20'} h-64 w-64`}
                  color="bg-gradient-to-br from-blue-400 to-purple-400"
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
                          <FaThumbsUp className="mx-auto mb-4 text-4xl" />
                          <p className="text-lg font-medium">Quality Service</p>
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

      {/* Service Features */}
      {service.features && service.features.length > 0 && (
        <motion.section
          className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-indigo-900 py-20 dark:from-black dark:to-indigo-900"
          variants={fadeInUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            <GradientBlur
              className="top-20 left-1/4 h-80 w-80"
              color="bg-gradient-to-br from-blue-400 to-purple-400"
            />
            <GradientBlur
              className="right-1/4 bottom-20 h-96 w-96"
              color="bg-gradient-to-br from-purple-400 to-pink-400"
            />
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <motion.div variants={fadeInUp} className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                <FaStar className="mr-2" />
                Our Features
              </div>

              <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
                Why Choose Our Services
              </h2>

              <p className="mx-auto max-w-3xl text-xl text-gray-300">
                We deliver exceptional quality and service that exceeds expectations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {service.features.map((feature, index) => (
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
                      <FaCheckCircle className="text-2xl text-white" />
                    </div>

                    <h3 className="mb-4 text-2xl font-bold text-white">{feature.title}</h3>

                    <p className="leading-relaxed text-gray-300">{feature.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Testimonials Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 py-20 dark:from-gray-800 dark:to-indigo-900"
        variants={fadeInUp}
      >
        <div className="absolute inset-0 overflow-hidden">
          <GradientBlur
            className="top-20 left-20 h-64 w-64"
            color="bg-gradient-to-br from-blue-400 to-cyan-400"
          />
          <GradientBlur
            className="right-20 bottom-20 h-80 w-80"
            color="bg-gradient-to-br from-purple-400 to-pink-400"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div variants={fadeInUp} className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
              <FaHeart className="mr-2" />
              Client Testimonials
            </div>

            <h2 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl dark:text-white">
              What Our Clients Say
            </h2>

            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Real feedback from satisfied customers who trust our services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      {service.pricing && service.pricing.length > 0 && (
        <motion.section
          className="relative overflow-hidden bg-white py-20 dark:bg-gray-900"
          variants={fadeInUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            <GradientBlur
              className="top-20 right-20 h-64 w-64"
              color="bg-gradient-to-br from-green-400 to-blue-400"
            />
            <GradientBlur
              className="bottom-20 left-20 h-80 w-80"
              color="bg-gradient-to-br from-purple-400 to-pink-400"
            />
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <motion.div variants={fadeInUp} className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                <FaCertificate className="mr-2" />
                Service Pricing
              </div>

              <h2 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl dark:text-white">
                Transparent Pricing Options
              </h2>

              <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                Choose the service package that best fits your needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {service.pricing.map((pricing, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
                  variants={fadeInUp}
                >
                  <div className="bg-primary-600 dark:bg-primary-800 p-4 text-center text-white">
                    <h3 className="text-xl font-bold">{pricing.title}</h3>
                  </div>
                  <div className="p-6 text-center">
                    <div className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                      {pricing.price}
                    </div>
                    {pricing.duration && (
                      <div className="mb-4 flex items-center justify-center text-gray-600 dark:text-gray-300">
                        <FaClock className="mr-2" />
                        <span>{pricing.duration}</span>
                      </div>
                    )}
                    <p className="mb-6 text-gray-600 dark:text-gray-300">{pricing.description}</p>
                    <Link
                      href={service.cta?.buttonLink || '/contact'}
                      className="bg-primary-600 hover:bg-primary-700 inline-block rounded-lg px-6 py-3 font-medium text-white transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Related Services Section */}
      {service.relatedServices && service.relatedServices.length > 0 && (
        <motion.section
          className="relative overflow-hidden bg-gray-50 py-20 dark:bg-gray-800"
          variants={fadeInUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            <GradientBlur
              className="top-20 left-20 h-64 w-64"
              color="bg-gradient-to-br from-blue-400 to-cyan-400"
            />
            <GradientBlur
              className="right-20 bottom-20 h-80 w-80"
              color="bg-gradient-to-br from-purple-400 to-pink-400"
            />
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <motion.div variants={fadeInUp} className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                <FaHandshake className="mr-2" />
                More Services
              </div>

              <h2 className="mb-6 text-4xl font-black text-gray-900 md:text-5xl dark:text-white">
                Explore Related Services
              </h2>

              <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                Discover our other professional services that might interest you
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
                  <Link href={`/services/${relatedService.id}`}>
                    <motion.div
                      variants={scaleOnHover}
                      className="relative z-10 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div className="relative h-60 overflow-hidden">
                        <Image
                          src={relatedService.image || '/api/placeholder/800/500'}
                          alt={relatedService.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      <div className="p-6">
                        <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                          {relatedService.title}
                        </h3>

                        <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                          {relatedService.description}
                        </p>

                        <div className="text-primary-600 dark:text-primary-400 flex items-center font-medium">
                          <span>Learn more</span>
                          <FaArrowRight className="ml-2 text-sm transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* CTA Section */}
      {service.cta && (
        <motion.section
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 py-20 dark:from-blue-800 dark:to-indigo-900"
          variants={fadeInUp}
        >
          <div className="absolute inset-0 overflow-hidden">
            <GradientBlur className="top-20 right-20 h-64 w-64" color="bg-white" />
            <GradientBlur className="bottom-20 left-20 h-80 w-80" color="bg-white" />
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
                {service.cta.title}
              </h2>

              <p className="mb-10 text-xl text-blue-100">{service.cta.description}</p>

              <Link
                href={service.cta.buttonLink}
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-blue-600 shadow-xl transition-colors duration-300 hover:bg-blue-50"
              >
                {service.cta.buttonText}
                <FaArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}
    </motion.div>
  )
}

export default ServiceLayoutServices

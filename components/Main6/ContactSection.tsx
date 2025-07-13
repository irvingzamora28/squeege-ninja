'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { YouTubeLandingContent } from 'app/allset/landing-content/types'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa'

interface ContactSectionProps {
  contact: YouTubeLandingContent['contact']
}

const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  if (!contact) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20"
      id="contact"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 h-72 w-72 animate-pulse rounded-full bg-purple-500 mix-blend-multiply blur-xl filter"></div>
        <div className="absolute top-0 right-0 h-72 w-72 animate-pulse rounded-full bg-pink-500 mix-blend-multiply blur-xl filter delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 h-72 w-72 animate-pulse rounded-full bg-blue-500 mix-blend-multiply blur-xl filter delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div className="mb-16 text-center" variants={itemVariants}>
            <motion.h2
              className="mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-5xl font-bold text-transparent"
              variants={itemVariants}
            >
              {contact.title}
            </motion.h2>
            <motion.p
              className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300"
              variants={itemVariants}
            >
              {contact.description}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Form */}
            <motion.div className="lg:col-span-2" variants={cardVariants}>
              <div className="group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-25 blur transition duration-1000 group-hover:opacity-75"></div>
                <div className="relative rounded-2xl border border-slate-700/50 bg-slate-800/90 p-8 backdrop-blur-sm">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex h-full flex-col items-center justify-center py-12"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                          className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg"
                        >
                          <FaCheckCircle className="h-10 w-10 text-white" />
                        </motion.div>
                        <motion.h3
                          className="mb-4 text-3xl font-bold text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {contact.successMessage}
                        </motion.h3>
                        <motion.p
                          className="mb-8 text-center text-gray-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          We'll get back to you as soon as possible.
                        </motion.p>
                        <motion.button
                          onClick={() => setIsSubmitted(false)}
                          className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <span className="relative z-10">Send another message</span>
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                          {contact.fields.map((field, index) => (
                            <motion.div
                              key={index}
                              className="flex flex-col"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <label
                                htmlFor={field.name}
                                className="mb-2 font-medium text-gray-300"
                              >
                                {field.label}{' '}
                                {field.required && <span className="text-red-400">*</span>}
                              </label>
                              <input
                                type={field.type}
                                id={field.name}
                                name={field.name}
                                value={formData[field.name as keyof typeof formData] || ''}
                                onChange={handleChange}
                                required={field.required}
                                className="group relative rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder={field.label}
                              />
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          className="mb-8"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <label htmlFor="message" className="mb-2 font-medium text-gray-300">
                            Message <span className="text-red-400">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full resize-none rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            placeholder="Your message"
                          />
                        </motion.div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className={`group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
                          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  className="mr-3 h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                />
                                Sending...
                              </>
                            ) : (
                              <>
                                <FaPaperPlane className="mr-2 h-5 w-5" />
                                {contact.submitLabel}
                              </>
                            )}
                          </span>
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="space-y-6" variants={cardVariants}>
              <div className="group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-25 blur transition duration-1000 group-hover:opacity-75"></div>
                <div className="relative rounded-2xl border border-slate-700/50 bg-slate-800/90 p-8 backdrop-blur-sm">
                  <h3 className="mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent text-white">
                    {contact?.contactInfo?.title}
                  </h3>

                  <div className="space-y-6">
                    {contact?.contactInfo?.email && (
                      <motion.div
                        className="group flex items-center gap-4"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                          <FaEnvelope className="h-5 w-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="mb-2 font-semibold text-gray-200">
                            {contact.contactInfo.email.label}
                          </h4>
                          <a
                            href={`mailto:${contact.contactInfo.email.address}`}
                            className="break-all text-purple-400 transition-colors duration-200 hover:text-purple-300"
                          >
                            {contact.contactInfo.email.address}
                          </a>
                          {contact.contactInfo.email.responseTime && (
                            <p className="mt-2 text-sm text-gray-400">
                              Response time: {contact.contactInfo.email.responseTime}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {contact?.contactInfo?.phone && (
                      <motion.div
                        className="group flex items-start"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                          <FaPhone className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-semibold text-gray-200">
                            {contact.contactInfo.phone.label}
                          </h4>
                          <a
                            href={`tel:${contact.contactInfo.phone.number}`}
                            className="text-purple-400 transition-colors duration-200 hover:text-purple-300"
                          >
                            {contact.contactInfo.phone.number}
                          </a>
                          {contact.contactInfo.phone.hours && (
                            <p className="mt-2 text-sm text-gray-400">
                              Hours: {contact.contactInfo.phone.hours}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {contact?.contactInfo?.location && (
                      <motion.div
                        className="group flex items-start"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                          <FaMapMarkerAlt className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-semibold text-gray-200">
                            {contact.contactInfo.location.label}
                          </h4>
                          {contact.contactInfo.location.address.map((line, index) => (
                            <p key={index} className="text-gray-300">
                              {line}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection

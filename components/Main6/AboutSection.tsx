'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { YouTubeLandingContent } from 'app/allset/landing-content/types'
import { FaUsers, FaEye, FaVideo, FaCalendarAlt, FaTrophy, FaHeart } from 'react-icons/fa'

interface AboutSectionProps {
  about: NonNullable<YouTubeLandingContent['about']>
}

const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  // Icon mapping for different stat types
  const getStatIcon = (index: number) => {
    const icons = [FaUsers, FaEye, FaVideo, FaCalendarAlt, FaTrophy, FaHeart]
    const Icon = icons[index % icons.length]
    return <Icon className="h-8 w-8 text-purple-400" />
  }

  return (
    <section className="relative overflow-hidden py-20">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,119,198,0.1)_0%,_transparent_70%)]"></div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-pink-500/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-5xl font-bold text-transparent">
            {about.title}
          </h2>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          {/* Enhanced Stats Grid */}
          <motion.div
            className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {about.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Icon */}
                <motion.div
                  className="mb-4 flex justify-center"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {getStatIcon(index)}
                </motion.div>

                {/* Value */}
                <motion.div
                  className="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: 'spring' }}
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="font-medium text-gray-400 transition-colors group-hover:text-gray-300">
                  {stat.label}
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border border-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced About Content */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-8 shadow-2xl backdrop-blur-sm md:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.3)_2px,_transparent_0)] bg-[length:40px_40px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="prose prose-invert max-w-none">
                {about.content.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="mb-6 text-lg leading-relaxed text-gray-300 first:text-xl first:text-gray-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl"></div>
              <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl"></div>
            </div>

            {/* Border Glow */}
            <div className="absolute inset-0 rounded-3xl border border-purple-500/20 opacity-50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { YouTubeLandingContent } from 'app/allset/landing-content/types'
import { FaYoutube, FaPatreon, FaTwitch, FaDiscord, FaPlay, FaUsers, FaBell } from 'react-icons/fa'

// Map platform names to icons with colors
const platformConfig: Record<string, { icon: React.ReactNode; color: string; hoverColor: string }> =
  {
    Patreon: {
      icon: <FaPatreon className="h-5 w-5" />,
      color: 'from-orange-500 to-red-500',
      hoverColor: 'from-orange-400 to-red-400',
    },
    Discord: {
      icon: <FaDiscord className="h-5 w-5" />,
      color: 'from-indigo-500 to-purple-500',
      hoverColor: 'from-indigo-400 to-purple-400',
    },
    Twitch: {
      icon: <FaTwitch className="h-5 w-5" />,
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'from-purple-400 to-pink-400',
    },
  }

interface ChannelCtaProps {
  cta: YouTubeLandingContent['cta']
}

const ChannelCta: React.FC<ChannelCtaProps> = ({ cta }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-900 to-purple-700 py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 h-32 w-32 animate-pulse rounded-full bg-white"></div>
        <div className="absolute top-20 right-20 h-16 w-16 animate-bounce rounded-full bg-yellow-300"></div>
        <div className="absolute bottom-20 left-20 h-24 w-24 animate-pulse rounded-full bg-white delay-1000"></div>
        <div className="absolute right-10 bottom-10 h-20 w-20 animate-bounce rounded-full bg-red-300 delay-500"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 h-8 w-8 rounded-full bg-white/10"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 h-6 w-6 rounded-full bg-white/10"
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-4 w-4 rounded-full bg-white/10"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div className="mb-12 flex flex-col items-center" variants={itemVariants}>
            <motion.div
              className="relative mb-8"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className="absolute -inset-2 rounded-full bg-white/20 blur-lg"></div>
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl">
                <FaYoutube className="h-14 w-14 text-red-600" />
              </div>
              <motion.div
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 300 }}
              >
                <FaBell className="h-3 w-3 text-white" />
              </motion.div>
            </motion.div>

            <motion.h2
              className="mb-6 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
              variants={itemVariants}
            >
              Join Our Community
            </motion.h2>
            <motion.p
              className="max-w-3xl text-xl leading-relaxed text-white/90"
              variants={itemVariants}
            >
              Subscribe to get notified about new videos and exclusive content. Be part of something
              amazing!
            </motion.p>
          </motion.div>

          <motion.div
            className="mb-16 flex flex-col justify-center gap-6 md:flex-row"
            variants={itemVariants}
          >
            {/* Subscribe Button */}
            <motion.a
              href={cta.subscribeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:shadow-3xl relative overflow-hidden rounded-2xl bg-white px-10 py-5 text-xl font-bold text-red-600 shadow-2xl transition-all duration-300"
              variants={buttonVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <FaYoutube className="h-7 w-7" />
                {cta.subscribeText}
                <motion.div className="h-0.5 w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
              </span>
            </motion.a>

            {/* Join Button */}
            <motion.a
              href={cta.joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border-2 border-white/30 bg-white/10 px-10 py-5 text-xl font-bold text-white shadow-2xl backdrop-blur-lg transition-all duration-300 hover:border-white/50 hover:bg-white/20"
              variants={buttonVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <FaUsers className="h-7 w-7" />
                {cta.joinText}
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          {cta.socialLinks && cta.socialLinks.length > 0 && (
            <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
              {cta.socialLinks.map((link, index) => {
                const config = platformConfig[link.platform] || {
                  icon: link.platform,
                  color: 'from-gray-500 to-gray-600',
                  hoverColor: 'from-gray-400 to-gray-500',
                }

                return (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-full bg-white/10 px-6 py-3 text-white shadow-lg backdrop-blur-lg transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
                    variants={buttonVariants}
                    custom={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                    ></div>
                    <span className="relative z-10 flex items-center gap-3 font-semibold">
                      {config.icon}
                      Join on {link.platform}
                    </span>
                  </motion.a>
                )
              })}
            </motion.div>
          )}

          {/* Stats or Additional Info */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-8 text-white/80"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <FaUsers className="h-5 w-5" />
              <span className="text-sm font-medium">Growing Community</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPlay className="h-5 w-5" />
              <span className="text-sm font-medium">New Content Weekly</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBell className="h-5 w-5" />
              <span className="text-sm font-medium">Exclusive Updates</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ChannelCta

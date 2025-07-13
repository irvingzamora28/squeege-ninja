'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebook,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import { YouTubeLandingContent } from 'app/allset/landing-content/types'

// Map platform names to icons
const platformIcons: Record<string, React.ReactNode> = {
  Twitter: <FaTwitter className="h-5 w-5" />,
  Instagram: <FaInstagram className="h-5 w-5" />,
  YouTube: <FaYoutube className="h-5 w-5" />,
  TikTok: <FaTiktok className="h-5 w-5" />,
  Facebook: <FaFacebook className="h-5 w-5" />,
}

interface ChannelHeroProps {
  channelInfo: YouTubeLandingContent['channelInfo']
}

const ChannelHero: React.FC<ChannelHeroProps> = ({ channelInfo }) => {
  return (
    <section className="relative">
      {/* Enhanced Banner Image with Parallax Effect */}
      <motion.div
        className="relative h-80 w-full overflow-hidden sm:h-96 lg:h-[500px]"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>
        <div className="absolute inset-0 z-5 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        <Image
          src={channelInfo.image}
          alt={`${channelInfo.name} banner`}
          fill
          className="object-cover"
          priority
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 rounded-full bg-white opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * 500,
                scale: 0,
              }}
              animate={{
                y: [null, -100],
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Channel Info */}
      <div className="relative z-20 container mx-auto -mt-32 px-4 pb-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end">
          {/* Animated Profile Image */}
          <motion.div
            className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Image
              src={channelInfo.profileImage}
              alt={channelInfo.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20"></div>
          </motion.div>

          {/* Channel Details */}
          <div className="flex-1">
            <motion.h1
              className="mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-4xl font-bold text-white lg:text-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {channelInfo.name}
            </motion.h1>

            <motion.div
              className="mb-6 flex flex-wrap items-center gap-6 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2">
                <FaYoutube className="h-4 w-4" />
                <span className="font-semibold text-white">
                  {channelInfo.subscriberCount} subscribers
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-gray-800/50 px-4 py-2 backdrop-blur-sm">
                <span>{channelInfo.totalViews} views</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-gray-800/50 px-4 py-2 backdrop-blur-sm">
                <span>Joined {channelInfo.joinDate}</span>
              </div>
            </motion.div>

            <motion.p
              className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {channelInfo.description}
            </motion.p>

            {/* Enhanced Social Links */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {channelInfo.links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full bg-gray-800/80 px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                >
                  {platformIcons[link.platform] || <FaExternalLinkAlt className="h-4 w-4" />}
                  <span className="group-hover:text-white">{link.platform}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChannelHero

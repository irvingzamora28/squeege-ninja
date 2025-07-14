'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { YouTubeLandingContent } from 'app/allset/landing-content/types'
import { FaListUl, FaArrowRight, FaPlay, FaClock } from 'react-icons/fa'

interface PlaylistsSectionProps {
  playlists: YouTubeLandingContent['playlists']
}

const PlaylistsSection: React.FC<PlaylistsSectionProps> = ({ playlists }) => {
  const [mounted, setMounted] = React.useState(false)
  useEffect(() => setMounted(true), [])

  // Generate random durations for each playlist item only once on mount
  const [durations] = React.useState(() =>
    playlists
      ? playlists.items.map(() => ({
          hours: Math.floor(Math.random() * 5 + 1),
          minutes: Math.floor(Math.random() * 60),
        }))
      : []
  )

  if (!playlists) return null

  return (
    <section className="relative overflow-hidden py-20">
      {/* Dynamic Background with Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-purple-900/90 via-gray-900/95 to-black/90"></div>
        {playlists.image && (
          <Image
            src={playlists.image}
            alt="Playlists background"
            fill
            className="object-cover opacity-30"
          />
        )}
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl"></div>
        </div>
      </div>

      <div className="relative z-20 container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-5xl font-bold text-transparent">
            {playlists.title}
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
            {playlists.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {playlists.items.map((playlist, index) => (
            <motion.a
              key={playlist.id}
              href={playlist.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25">
                {/* Enhanced Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={playlist.thumbnail}
                    alt={playlist.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  {/* Enhanced Video Count Badge */}
                  <motion.div
                    className="absolute top-4 right-4 flex items-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-sm"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <FaListUl className="mr-2 h-4 w-4" />
                    {playlist.videoCount} videos
                  </motion.div>

                  {/* Play All Button */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg backdrop-blur-sm">
                      <FaPlay className="ml-1 h-6 w-6 text-white" />
                    </div>
                  </motion.div>

                  {/* Duration Indicator */}
                  <div className="absolute bottom-4 left-4 flex items-center rounded-full bg-black/80 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                    <FaClock className="mr-1 h-3 w-3" />
                    {mounted && durations[index]
                      ? `Total: ${durations[index].hours}h ${durations[index].minutes}m`
                      : 'Total: --h --m'}
                  </div>
                </div>

                {/* Enhanced Playlist Info */}
                <div className="p-6">
                  <h3 className="mb-3 text-xl leading-tight font-bold transition-colors group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent">
                    {playlist.title}
                  </h3>
                  <p className="mb-6 line-clamp-2 leading-relaxed text-gray-400">
                    {playlist.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>Updated {playlist.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>

                {/* Border Glow */}
                <div className="absolute inset-0 rounded-2xl border border-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PlaylistsSection

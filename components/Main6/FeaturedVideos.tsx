'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { YouTubeLandingContent } from 'app/allset/landing-content/types'
import { FaPlay, FaEye, FaClock, FaHeart, FaShare } from 'react-icons/fa'
import { useShare } from '@/lib/hooks/useShare'
import Toast from './Toast'

interface FeaturedVideosProps {
  videos: YouTubeLandingContent['featuredVideos']
}

const FeaturedVideos: React.FC<FeaturedVideosProps> = ({ videos }) => {
  const { share } = useShare()
  const [toast, setToast] = React.useState(false)

  const handleLike = (videoUrl: string) => {
    setToast(true)
    setTimeout(() => {
      window.open(videoUrl, '_blank', 'noopener,noreferrer')
    }, 2000)
  }

  return (
    <section className="relative bg-gradient-to-b from-gray-900/50 to-black/50 py-20 backdrop-blur-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-5xl font-bold text-transparent">
            {videos.title}
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300">
            {videos.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videos.items.map((video, index) => (
            <motion.div
              key={video.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="block">
                  {/* Enhanced Thumbnail with Gradient Overlay */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    {/* Enhanced Play Button */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:from-red-400 group-hover:to-pink-400 group-hover:shadow-xl">
                        <FaPlay className="ml-1 h-6 w-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Enhanced Duration Badge */}
                    <div className="absolute right-3 bottom-3 flex items-center rounded-full bg-black/80 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                      <FaClock className="mr-1 h-3 w-3" />
                      {video.duration}
                    </div>
                  </div>
                </a>

                {/* Enhanced Video Info */}
                <div className="p-6">
                  <h3 className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent">
                    {video.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 leading-relaxed text-gray-400">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaEye className="mr-2 h-4 w-4" />
                      <span>{video.viewCount} views</span>
                      <span className="mx-2">•</span>
                      <span>{video.publishedAt}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <motion.button
                        className="rounded-full bg-gray-700 p-2 transition-colors hover:bg-red-500"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleLike(video.url)}
                        aria-label={`Like ${video.title}`}
                      >
                        <FaHeart className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        className="rounded-full bg-gray-700 p-2 transition-colors hover:bg-blue-500"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          share({
                            title: video.title,
                            text: video.description,
                            url: video.url,
                          })
                        }
                        aria-label={`Share ${video.title}`}
                      >
                        <FaShare className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Toast
        message="To support the channel, please like the video on YouTube!"
        show={toast}
        onClose={() => setToast(false)}
      />
    </section>
  )
}

export default FeaturedVideos

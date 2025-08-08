'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { HeroSection as HeroSectionType } from '../../app/allset/landing-content/types'
import { containerVariants, itemVariants } from '@/components/Main5/AnimationVariants'

interface Props {
  hero: HeroSectionType
}

const HeroSection: React.FC<Props> = ({ hero }) => {
  const fallback = '/static/images/hero.jpg'
  const imgSrc = hero.image || fallback

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="bg-primary-500/20 absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 to-transparent dark:from-slate-900/70" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative"
          >
            <motion.span
              variants={itemVariants}
              className="from-primary-50 dark:from-primary-900/20 text-primary-700 dark:text-primary-300 mb-4 inline-flex items-center rounded-full bg-gradient-to-r to-sky-50 px-4 py-1.5 text-sm dark:to-slate-800/40"
            >
              {hero.title.split(' ')[0]}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="mb-5 text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl md:text-6xl"
            >
              <span className="via-primary-700 dark:via-primary-300 bg-gradient-to-r from-slate-900 to-purple-700 bg-clip-text text-transparent dark:from-white dark:to-purple-300">
                {hero.title}
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-xl text-lg text-slate-600 dark:text-slate-300"
            >
              {hero.description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={hero.primaryCta.link}
                  className="from-primary-600 hover:from-primary-700 shadow-primary-600/20 inline-flex items-center justify-center rounded-lg bg-gradient-to-r to-purple-600 px-7 py-3 font-medium text-white shadow-lg hover:to-purple-700"
                >
                  {hero.primaryCta.text}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={hero.secondaryCta.link}
                  className="text-primary-700 dark:text-primary-300 hover:bg-primary-50/60 dark:hover:bg-primary-900/20 border-primary-200 inline-flex items-center justify-center rounded-lg border px-7 py-3 font-medium"
                >
                  {hero.secondaryCta.text}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/80 to-white/20 p-2 shadow-2xl ring-1 ring-slate-200/60 backdrop-blur-md dark:from-slate-800/80 dark:to-slate-800/20 dark:ring-slate-700/60">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={imgSrc}
                  alt={hero.title}
                  fill
                  priority
                  className="rounded-xl object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/40 ring-inset dark:ring-white/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

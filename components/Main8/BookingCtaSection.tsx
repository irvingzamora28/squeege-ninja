'use client'

import React from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CtaSection as CtaSectionType } from 'app/allset/landing-content/types'

interface Props {
  cta: CtaSectionType
}

export default function BookingCtaSection({ cta }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      scale: [1, 1.02, 1],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatDelay: 3,
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  }

  const particleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.section
      ref={ref}
      id="book"
      className="relative py-20 sm:py-24"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Animated background particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="bg-primary-200/20 absolute top-1/4 left-1/4 h-32 w-32 rounded-full blur-xl"
            variants={particleVariants}
            animate="animate"
          />
          <motion.div
            className="bg-primary-300/20 absolute right-1/4 bottom-1/3 h-24 w-24 rounded-full blur-xl"
            variants={particleVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div
            className="bg-primary-400/20 absolute top-1/2 right-1/3 h-16 w-16 rounded-full blur-xl"
            variants={particleVariants}
            animate="animate"
            transition={{ delay: 2 }}
          />
        </div>

        <motion.div
          className="relative mx-auto mt-16 w-full max-w-7xl overflow-hidden rounded-3xl"
          variants={floatingVariants}
          animate="animate"
        >
          {/* Enhanced gradient border with animated shimmer */}
          <div className="from-primary-400 via-primary-500 to-primary-600 shadow-primary-500/25 relative overflow-hidden rounded-3xl bg-gradient-to-r p-[2px] shadow-2xl">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />

            {/* Glass morphism container */}
            <motion.div
              className="group relative isolate overflow-hidden rounded-3xl bg-white/80 px-5 py-12 backdrop-blur-xl sm:px-8 sm:py-16 lg:flex lg:items-center lg:gap-10 dark:bg-slate-900/80"
              whileHover={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                transition: { duration: 0.3 },
              }}
            >
              {/* Enhanced decorative gradients */}
              <motion.div
                className="from-primary-300/40 to-primary-500/20 pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />
              <motion.div
                className="from-primary-400/40 to-primary-600/20 pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-gradient-to-tl blur-3xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              />

              {/* Moving gradient overlay */}
              <motion.div
                className="via-primary-50/10 absolute inset-0 bg-gradient-to-r from-transparent to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10 mx-auto max-w-2xl text-center">
                {/* Animated title */}
                <motion.h2
                  variants={itemVariants}
                  className="to-primary-700 dark:to-primary-300 bg-gradient-to-b from-slate-900 via-slate-800 bg-clip-text text-3xl leading-tight font-extrabold text-transparent sm:text-4xl lg:text-5xl dark:from-white dark:via-slate-200"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                >
                  {cta.title}
                </motion.h2>

                {/* Animated description */}
                <motion.p
                  variants={itemVariants}
                  className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300"
                  whileHover={{
                    color: 'rgb(51 65 85)',
                    transition: { duration: 0.3 },
                  }}
                >
                  {cta.description}
                </motion.p>

                {/* Enhanced animated button */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row"
                >
                  <Link href={cta.button?.link || '/'}>
                    <motion.div
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="group/btn from-primary-600 via-primary-500 to-primary-600 shadow-primary-600/30 ring-primary-400/20 dark:from-primary-500 dark:via-primary-400 dark:to-primary-500 relative inline-flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r px-8 py-4 text-base font-semibold text-white shadow-xl ring-2 sm:w-auto"
                    >
                      {/* Button shimmer effect */}
                      <motion.span
                        className="from-primary-300 to-primary-300 absolute inset-0 bg-gradient-to-r via-white opacity-0 blur"
                        whileHover={{ opacity: 0.3 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Button glow */}
                      <motion.span
                        className="from-primary-400 to-primary-600 absolute inset-0 rounded-full bg-gradient-to-r opacity-0"
                        whileHover={{ opacity: 0.2 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Ripple effect */}
                      <motion.span
                        className="absolute inset-0 scale-0 rounded-full bg-white/20"
                        whileTap={{
                          scale: [0, 1.5],
                          opacity: [0.3, 0],
                          transition: { duration: 0.4 },
                        }}
                      />

                      {/* Button content */}
                      <motion.span
                        className="relative z-10 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {cta.button?.text || 'Book now'}
                        <motion.svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </motion.svg>
                      </motion.span>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

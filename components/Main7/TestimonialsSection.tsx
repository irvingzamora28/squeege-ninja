'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TestimonialSection as TestimonialSectionType } from '../../app/allset/landing-content/types'
import { containerVariants, fadeInUpVariants } from '@/components/Main5/AnimationVariants'

interface Props {
  testimonials: TestimonialSectionType
}

const TestimonialsSection: React.FC<Props> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="relative bg-white py-24 dark:bg-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(59,130,246,0.08),transparent_45%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          {testimonials.title && (
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
              {testimonials.title}
            </h2>
          )}
          {testimonials.description && (
            <p className="text-lg text-slate-600 dark:text-slate-300">{testimonials.description}</p>
          )}
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.testimonials.map((t, idx) => (
            <motion.figure
              key={`${t.name}-${idx}`}
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="mb-4 flex items-center gap-3">
                {t.image && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <figcaption className="font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </figcaption>
                  {t.title && (
                    <div className="text-sm text-slate-500 dark:text-slate-400">{t.title}</div>
                  )}
                </div>
              </div>
              <blockquote className="text-slate-700 dark:text-slate-200">“{t.quote}”</blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

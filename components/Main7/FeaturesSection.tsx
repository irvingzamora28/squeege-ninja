'use client'

import React from 'react'
import { motion } from 'framer-motion'
import FeatureIcon from '@/components/FeatureIcon'
import { FeaturesSection as FeaturesSectionType } from '../../app/allset/landing-content/types'
import { containerVariants, fadeInUpVariants } from '@/components/Main5/AnimationVariants'

interface Props {
  features: FeaturesSectionType
}

const FeaturesSection: React.FC<Props> = ({ features }) => {
  return (
    <section id="features" className="relative bg-white py-20 dark:bg-slate-900">
      {/* subtle background texture */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.08),transparent_35%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            {features.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">{features.description}</p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item, idx) => (
            <motion.div
              key={`${item.title}-${idx}`}
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="bg-primary-50 text-primary-600 group-hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 mb-4 inline-flex items-center justify-center rounded-xl p-3 transition">
                <FeatureIcon icon={item.icon} size="7" />
              </div>
              <h3 className="mb-2 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

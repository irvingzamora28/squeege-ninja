'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PricingSection as PricingSectionType } from '../../app/allset/landing-content/types'
import { containerVariants, fadeInUpVariants } from '@/components/Main5/AnimationVariants'

interface Props {
  pricing: PricingSectionType
}

const PricingSection: React.FC<Props> = ({ pricing }) => {
  return (
    <section id="pricing" className="relative bg-slate-50 py-24 dark:bg-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_rgba(59,130,246,0.08),transparent_50%)]" />

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
            {pricing.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">{pricing.description}</p>
        </motion.div>

        {/* Plans */}
        <div className="grid gap-6 md:grid-cols-3">
          {pricing.plans.map((plan, idx) => (
            <motion.div
              key={`${plan.name}-${idx}`}
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className={`relative rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-800 ${
                plan.highlighted
                  ? 'border-primary-500 dark:border-primary-400 bg-white'
                  : 'border-slate-200 bg-white dark:border-slate-700'
              }`}
            >
              {plan.highlighted && (
                <span className="bg-primary-600 absolute -top-3 right-4 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  Popular
                </span>
              )}
              <h3 className="mb-2 text-xl font-semibold">{plan.name}</h3>
              <p className="mb-4 text-slate-600 dark:text-slate-300">{plan.description}</p>
              <div className="mb-6 text-4xl font-extrabold">{plan.price}</div>
              <ul className="mb-6 space-y-2 text-slate-600 dark:text-slate-300">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      className="text-primary-600 dark:text-primary-400 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-7.364 7.364a1 1 0 01-1.414 0L3.293 9.536a1 1 0 011.414-1.414l3.222 3.221 6.657-6.657a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {f.text}
                  </li>
                ))}
              </ul>
              <a
                href={plan.cta.link}
                className={`block w-full rounded-lg px-4 py-3 text-center font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600'
                }`}
              >
                {plan.cta.text}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection

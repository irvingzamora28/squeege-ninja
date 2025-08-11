'use client'

import React, { useState } from 'react'
import { Space_Grotesk, Inter } from 'next/font/google'
import { FaqsSection as FaqsSectionType } from 'app/allset/landing-content/types'

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] })
const body = Inter({ subsets: ['latin'] })

interface Props {
  faqs: FaqsSectionType
}

const FaqItem: React.FC<{ q: { question: string; answer: string } }> = ({ q }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 dark:border-gray-800 dark:bg-gray-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 text-left"
        aria-expanded={open}
        aria-controls={`faq-${q.question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span
          className={`${display.className} text-base font-semibold text-gray-900 dark:text-white`}
        >
          {q.question}
        </span>
        <span
          className="inline-flex aspect-square h-7 w-7 flex-none items-center justify-center rounded-full border border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-300"
          aria-hidden
        >
          {open ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.41L10.59 13.41 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.3l6.3 6.3 6.29-6.3z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
            </svg>
          )}
        </span>
      </button>
      <div
        id={`faq-${q.question.replace(/\s+/g, '-').toLowerCase()}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className={`${body.className} mt-3 text-sm text-gray-700 dark:text-gray-300`}>
            {q.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

const FaqSection: React.FC<Props> = ({ faqs }) => {
  const { title, description, questions } = faqs

  if (!questions || !questions.length) return null

  return (
    <section id="faqs" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-white dark:from-gray-950 dark:to-gray-950" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          {title ? (
            <h2
              className={`${display.className} text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white`}
            >
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className={`${body.className} mt-4 text-gray-600 dark:text-gray-300`}>
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
          {questions.map((q, idx) => (
            <FaqItem key={idx} q={q} />
          ))}
        </div>

        {/* contact hint */}
        <div className="mt-12 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-4 py-2 text-xs text-gray-700 backdrop-blur dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-200">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ¿Tienes otra pregunta? Contáctanos por WhatsApp o Email
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaqSection

'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ProjectsSection as ProjectsSectionType } from '../../app/allset/landing-content/types'
import { containerVariants, fadeInUpVariants } from '@/components/Main5/AnimationVariants'

interface Props {
  projects: ProjectsSectionType
}

const ProjectsSection: React.FC<Props> = ({ projects }) => {
  const categories = useMemo(() => {
    const set = new Set<string>()
    projects.items.forEach((p) => set.add(p.category))
    return ['All', ...Array.from(set)]
  }, [projects.items])

  const [active, setActive] = useState<string>('All')

  const filtered = useMemo(() => {
    return active === 'All' ? projects.items : projects.items.filter((p) => p.category === active)
  }, [active, projects.items])

  return (
    <section id="projects" className="relative bg-gray-50 py-24 dark:bg-slate-900">
      {/* subtle gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent dark:from-slate-800" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={containerVariants}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            {projects.title}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">{projects.description}</p>
        </motion.div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary-600 shadow-primary-600/20 text-white shadow-md'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((proj, i) => (
            <motion.article
              key={`${proj.title}-${i}`}
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={proj.image}
                  alt={proj.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur-sm dark:bg-slate-900/70">
                  {proj.category}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{proj.title}</h3>
                <p className="mb-4 line-clamp-3 text-slate-600 dark:text-slate-300">
                  {proj.description}
                </p>
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3M5 11h14M5 19h14M5 11a2 2 0 012-2h10a2 2 0 012 2M5 19a2 2 0 002 2h10a2 2 0 002-2"
                      />
                    </svg>
                    {new Date(proj.completionDate).toLocaleDateString()}
                  </span>
                  <span className="text-primary-600 dark:text-primary-400">View details</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection

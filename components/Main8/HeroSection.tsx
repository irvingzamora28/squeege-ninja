'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HeroSection as HeroSectionType } from 'app/allset/landing-content/types'
import { Space_Grotesk, Inter } from 'next/font/google'

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] })
const body = Inter({ subsets: ['latin'] })

interface Props {
  hero: HeroSectionType
}

// Full-bleed hero with edge-to-edge image and overlay content
const HeroSection: React.FC<Props> = ({ hero }) => {
  return (
    <section className="relative h-[72vh] w-full overflow-hidden rounded-none">
      {/* Full-width/height background image */}
      {hero.image ? (
        <div className="absolute inset-0">
          <Image src={hero.image} alt={hero.title} fill priority className="object-cover" />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/10" />
          {/* Soft spotlight accents */}
          <div className="bg-primary-500/30 pointer-events-none absolute top-1/3 -left-24 h-72 w-72 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute top-10 -right-24 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 text-white">
        {/* Top chip */}
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-md">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Trusted by modern service businesses
        </div>

        <div className="max-w-4xl">
          <h1
            className={`${display.className} text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl`}
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(255,255,255,0.35)]">
                {hero.title}
              </span>
              <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 -z-10 rounded-[14px] bg-white/5 blur-xl" />
            </span>
          </h1>

          <p className={`${body.className} mt-5 max-w-2xl text-lg text-gray-200/95 md:text-xl`}>
            {hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={hero.primaryCta.link}
              className="group from-primary-600 relative inline-flex items-center justify-center rounded-md bg-gradient-to-r to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(147,51,234,0.6)] transition-all hover:shadow-[0_12px_36px_-12px_rgba(147,51,234,0.8)]"
            >
              <span className="absolute inset-0 -z-10 rounded-md bg-white/10 opacity-0 blur transition-opacity group-hover:opacity-20" />
              {hero.primaryCta.text}
            </Link>
            <Link
              href={hero.secondaryCta.link}
              className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {hero.secondaryCta.text}
            </Link>
          </div>
        </div>
      </div>

      {/* Curved bottom separator */}
      <svg
        className="absolute right-0 bottom-[-1px] left-0 h-12 w-full text-white dark:text-gray-950"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,32 C240,80 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z"
        />
      </svg>
    </section>
  )
}

export default HeroSection

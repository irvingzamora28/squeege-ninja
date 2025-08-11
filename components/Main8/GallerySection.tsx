'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Space_Grotesk, Inter } from 'next/font/google'
import { GallerySection as GallerySectionType } from 'app/allset/landing-content/types'

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] })
const body = Inter({ subsets: ['latin'] })

interface Props {
  gallery: GallerySectionType
}

const GallerySection: React.FC<Props> = ({ gallery }) => {
  const { title, description, images = [] } = gallery || {}
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!images.length) return null

  return (
    <section id="gallery" className="relative py-20 sm:py-24">
      {/* sublte bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-white dark:from-gray-950 dark:to-gray-950" />

      <div className="mx-auto max-w-7xl px-6">
        {(title || description) && (
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
        )}

        {/* Responsive mosaic grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setOpenIndex(idx)}
              className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              <div
                className="pointer-events-none absolute -inset-[1px] -z-10 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(99,102,241,0.45), rgba(168,85,247,0.45))',
                }}
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt || 'Gallery image'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {img.caption ? (
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 text-left text-xs text-white">
                  {img.caption}
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {openIndex !== null && images[openIndex] ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
          role="button"
          aria-label="Close gallery modal"
          tabIndex={0}
          onClick={(e) => {
            if (e.currentTarget === e.target) setOpenIndex(null)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') setOpenIndex(null)
          }}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-5xl"
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <button
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute top-2 right-2 z-10 rounded-full bg-white/90 p-2 text-gray-900 shadow hover:bg-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.3 5.71 12 12l6.3 6.29-1.41 1.41L10.59 13.41 4.29 19.71 2.88 18.3 9.17 12 2.88 5.71 4.29 4.3l6.3 6.3 6.29-6.3z"
                />
              </svg>
            </button>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src={images[openIndex].src}
                alt={images[openIndex].alt || 'Gallery image'}
                fill
                className="object-contain"
                priority
              />
            </div>
            {images[openIndex].caption ? (
              <div className="mt-3 text-center text-sm text-white/90">
                {images[openIndex].caption}
              </div>
            ) : null}
            {/* controls */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setOpenIndex((prev) => (prev! - 1 + images.length) % images.length)}
                className="rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-900 shadow hover:bg-white"
              >
                Anterior
              </button>
              <button
                onClick={() => setOpenIndex((prev) => (prev! + 1) % images.length)}
                className="rounded-md bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-900 shadow hover:bg-white"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default GallerySection

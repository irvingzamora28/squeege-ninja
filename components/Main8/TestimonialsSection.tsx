'use client'

import React from 'react'
import Image from 'next/image'
import { Space_Grotesk, Inter } from 'next/font/google'
import { TestimonialSection as TestimonialSectionType } from 'app/allset/landing-content/types'

const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] })
const body = Inter({ subsets: ['latin'] })

interface Props {
  testimonials: TestimonialSectionType
}

// Shadcn-like primitives (lightweight, style-compatible)
const Card = ({ className = '', children }: React.PropsWithChildren<{ className?: string }>) => (
  <div
    className={`rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}
  >
    {children}
  </div>
)
const CardContent = ({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const Avatar = ({ src, alt }: { src?: string; alt: string }) => (
  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
    {src ? (
      <Image src={src} alt={alt} fill className="object-cover" />
    ) : (
      <div className="h-full w-full" />
    )}
  </div>
)

const StarRow = ({ count = 5 }: { count?: number }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
)

const TestimonialsSection: React.FC<Props> = ({ testimonials }) => {
  const { title, description, image, testimonials: items } = testimonials

  return (
    <section id="testimonials" className="relative py-20 sm:py-24">
      {/* background decorative image if provided */}
      {image && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src={image}
            alt={title || 'Testimonials'}
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white dark:from-gray-950 dark:via-gray-950/85 dark:to-gray-950" />
        </div>
      )}

      {/* subtle gradient backdrop even without image */}
      {!image && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-white dark:from-gray-950 dark:to-gray-950" />
      )}

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          {title && (
            <h2
              className={`${display.className} text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white`}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className={`${body.className} mt-4 text-gray-600 dark:text-gray-300`}>
              {description}
            </p>
          )}
        </div>

        {/* responsive grid with shadcn-like Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, idx) => (
            <Card
              key={idx}
              className="group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* gradient frame */}
              <div
                className="pointer-events-none absolute -inset-[1px] -z-10 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(99,102,241,0.45), rgba(168,85,247,0.45))',
                }}
              />

              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar src={t.image} alt={t.name} />
                  <div>
                    <div
                      className={`${display.className} text-base font-semibold text-gray-900 dark:text-white`}
                    >
                      {t.name}
                    </div>
                    {t.title && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t.title}</div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <StarRow />
                </div>

                <blockquote className={`${body.className} mt-4 text-gray-700 dark:text-gray-300`}>
                  “{t.quote}”
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA ribbon */}
        <div className="mt-14 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm text-gray-700 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70 dark:text-gray-200">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            98% customer satisfaction — join happy clients today
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

'use client'

import React, { useEffect, useMemo, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { FaWhatsapp } from 'react-icons/fa'

type WhatsAppConfig = {
  enabled: boolean
  phone: string
  message: string
  position: 'bottom-right' | 'bottom-left'
}

function normalizePhone(raw: string) {
  // Keep digits only
  return (raw || '').replace(/\D+/g, '')
}

function buildWhatsAppUrl(phone: string, message: string) {
  const digits = normalizePhone(phone)
  if (!digits) return null
  const base = `https://wa.me/${digits}`
  const params = message ? `?text=${encodeURIComponent(message)}` : ''
  return base + params
}

export default function WhatsAppButton() {
  const [config, setConfig] = useState<WhatsAppConfig>(() => ({
    enabled: Boolean(siteMetadata.whatsapp?.enabled),
    phone: siteMetadata.whatsapp?.phone || '',
    message: siteMetadata.whatsapp?.message || '',
    position: (siteMetadata.whatsapp?.position as WhatsAppConfig['position']) || 'bottom-right',
  }))

  // Load config from API (persistent) with fallback to siteMetadata defaults
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const resp = await fetch('/api/settings', { cache: 'no-store' })
        if (resp.ok) {
          const data = await resp.json()
          if (!cancelled && data?.success && data?.settings) {
            const s = data.settings as {
              whatsapp_enabled: boolean
              whatsapp_phone: string
              whatsapp_message: string
              whatsapp_position: 'bottom-right' | 'bottom-left'
            }
            setConfig({
              enabled: !!s.whatsapp_enabled,
              phone: s.whatsapp_phone || '',
              message: s.whatsapp_message || '',
              position: (s.whatsapp_position as WhatsAppConfig['position']) || 'bottom-right',
            })
          }
        }
      } catch {
        // ignore; fallback to siteMetadata
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const href = useMemo(
    () => buildWhatsAppUrl(config.phone, config.message),
    [config.phone, config.message]
  )

  if (!config.enabled || !href) return null

  const isRight = config.position !== 'bottom-left'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed z-40 ${isRight ? 'right-4 md:right-6' : 'left-4 md:left-6'} bottom-4 md:bottom-6`}
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <div className="transition-transform duration-200 hover:scale-105">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 md:h-12 md:w-12">
          <FaWhatsapp className="h-8 w-8 md:h-6 md:w-6" aria-hidden="true" />
        </div>
      </div>
    </a>
  )
}

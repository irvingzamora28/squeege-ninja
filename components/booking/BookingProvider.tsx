'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface BookingContextValue {
  isOpen: boolean
  open: (opts?: { serviceId?: number }) => void
  close: () => void
  defaultServiceId?: number
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined)

export function useBookingUI() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBookingUI must be used within BookingProvider')
  return ctx
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultServiceId, setDefaultServiceId] = useState<number | undefined>(undefined)
  const [enabled, setEnabled] = useState<boolean | undefined>(undefined)

  // Fetch backend setting to determine if widget should be operable
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/settings', { cache: 'no-store' })
        if (!res.ok) throw new Error('settings fetch failed')
        const data = await res.json()
        if (!cancelled) setEnabled(Boolean(data?.settings?.booking_widget_enabled))
      } catch {
        if (!cancelled) setEnabled(true) // fail-open to preserve current behavior
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const open = useCallback(
    (opts?: { serviceId?: number }) => {
      if (enabled === false) return
      if (opts?.serviceId) setDefaultServiceId(opts.serviceId)
      setIsOpen(true)
    },
    [enabled]
  )

  const close = useCallback(() => setIsOpen(false), [])

  // Open only when user clicks an anchor with href="#book"
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (enabled === false) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      // @ts-ignore Optional chaining for closest in older TS libs
      const anchor: HTMLAnchorElement | null = target?.closest?.('a[href="#book"]') ?? null
      if (anchor) {
        e.preventDefault()
        e.stopPropagation()
        open()
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [open, enabled])

  const value = useMemo(
    () => ({ isOpen, open, close, defaultServiceId }),
    [isOpen, open, close, defaultServiceId]
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

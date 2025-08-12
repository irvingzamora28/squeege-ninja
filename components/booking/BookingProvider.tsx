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

  const open = useCallback((opts?: { serviceId?: number }) => {
    if (opts?.serviceId) setDefaultServiceId(opts.serviceId)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  // Open only when user clicks an anchor with href="#book"
  useEffect(() => {
    if (typeof document === 'undefined') return
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
  }, [open])

  const value = useMemo(
    () => ({ isOpen, open, close, defaultServiceId }),
    [isOpen, open, close, defaultServiceId]
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

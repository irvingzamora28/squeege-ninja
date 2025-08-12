'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useBookingUI } from './BookingProvider'
import siteMetadata from '@/data/siteMetadata'

interface Service {
  id: number
  name: string
  description?: string | null
  duration_minutes: number
  price: number
  active: number | boolean
}

interface Slot {
  start: string
  end: string
  remaining: number
}

const STRINGS: Record<string, Record<string, string>> = {
  'en-us': {
    title: 'Book a Service',
    service: 'Service',
    date: 'Date',
    time: 'Time',
    yourDetails: 'Your details',
    name: 'Name',
    email: 'Email',
    notes: 'Notes (optional)',
    cancel: 'Cancel',
    confirm: 'Confirm Booking',
    pickService: 'Pick a service',
    pickDate: 'Pick a date',
    pickTime: 'Pick a time',
    noSlots: 'No slots for this date',
    success: 'Booking confirmed!',
    close: 'Close',
  },
  'es-mx': {
    title: 'Reservar servicio',
    service: 'Servicio',
    date: 'Fecha',
    time: 'Hora',
    yourDetails: 'Tus datos',
    name: 'Nombre',
    email: 'Correo',
    notes: 'Notas (opcional)',
    cancel: 'Cancelar',
    confirm: 'Confirmar reserva',
    pickService: 'Elige un servicio',
    pickDate: 'Elige una fecha',
    pickTime: 'Elige una hora',
    noSlots: 'No hay horarios para esta fecha',
    success: '¡Reserva confirmada!',
    close: 'Cerrar',
  },
}

function useI18n() {
  const lang = (siteMetadata.language || 'en-us').toLowerCase()
  return STRINGS[lang] || STRINGS['en-us']
}

export default function BookingWidget() {
  const { isOpen, close, defaultServiceId } = useBookingUI()
  const t = useI18n()

  // Respect backend toggle: do not render if disabled
  const [enabled, setEnabled] = useState<boolean | undefined>(undefined)
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

  const [services, setServices] = useState<Service[]>([])
  const [loadingServices, setLoadingServices] = useState(false)
  const [serviceId, setServiceId] = useState<number | ''>('')

  const [date, setDate] = useState('') // YYYY-MM-DD
  const [slots, setSlots] = useState<Slot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Load services when opened
  useEffect(() => {
    if (!isOpen) return
    setLoadingServices(true)
    fetch('/api/allset/services')
      .then((r) => r.json())
      .then((data) => {
        const list: Service[] = (data.services || []).filter((s: Service) => Boolean(s.active))
        setServices(list)
      })
      .catch(() => {})
      .finally(() => setLoadingServices(false))
  }, [isOpen])

  // Set default or only service automatically when available
  useEffect(() => {
    if (!isOpen) return
    if (defaultServiceId) {
      setServiceId(defaultServiceId)
      return
    }
    if (services.length === 1) {
      setServiceId(services[0].id)
    }
  }, [isOpen, defaultServiceId, services])

  // Load slots
  useEffect(() => {
    const run = async () => {
      setSelectedSlot(null)
      if (!serviceId || !date) {
        setSlots([])
        return
      }
      setLoadingSlots(true)
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
        const res = await fetch(
          `/api/allset/slots?service_id=${serviceId}&date=${date}&tz=${encodeURIComponent(tz)}`
        )
        const data = await res.json()
        if (res.ok) setSlots(data.slots || [])
        else setSlots([])
      } catch {
        setSlots([])
      } finally {
        setLoadingSlots(false)
      }
    }
    run()
  }, [serviceId, date])

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId),
    [services, serviceId]
  )

  const onConfirm = async () => {
    if (!serviceId || !selectedSlot || !name || !email) return
    setSubmitting(true)
    try {
      const payload = {
        service_id: serviceId,
        customer_name: name,
        customer_email: email,
        start_time: selectedSlot.start,
        end_time: selectedSlot.end,
        status: 'pending',
        notes: notes || null,
      }
      const res = await fetch('/api/allset/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSuccess(true)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!submitting) onConfirm()
  }

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const todayStr = useMemo(() => {
    const d = new Date()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}-${mm}-${dd}`
  }, [])

  // Do not render UI when disabled by settings
  if (enabled === false) {
    return null
  }

  if (typeof document === 'undefined') return null
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={close} aria-hidden="true" />

      {/* Modal */}
      <div className="relative z-[61] w-full rounded-t-2xl bg-white shadow-xl sm:max-w-lg sm:rounded-2xl dark:bg-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3 sm:px-5 dark:border-slate-700">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-900 dark:text-slate-100">
              {t.title}
            </h3>
            {selectedService && (
              <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                {selectedService.name} · {selectedService.duration_minutes}m · ${'{'}
                selectedService.price.toFixed(2){'}'}
              </p>
            )}
          </div>
          <button
            onClick={close}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            aria-label={t.close}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form className="grid gap-4 p-4 sm:p-5" onSubmit={onSubmit} autoComplete="on">
          {/* Service */}
          <div>
            <label
              htmlFor="bw-service"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {t.service}
            </label>
            <select
              id="bw-service"
              name="service"
              className="w-full rounded-md border px-3 py-2 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value ? Number(e.target.value) : '')}
              disabled={loadingServices}
            >
              <option value="">{t.pickService}</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="bw-date"
              className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {t.date}
            </label>
            <input
              id="bw-date"
              type="date"
              name="date"
              className="w-full rounded-md border px-3 py-2 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={todayStr}
            />
          </div>

          {/* Time slots */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.time}
            </label>
            {loadingSlots ? (
              <div className="text-sm text-slate-500">Loading...</div>
            ) : date && slots.length === 0 ? (
              <div className="text-sm text-slate-500">{t.noSlots}</div>
            ) : (
              <div className="flex max-h-44 flex-wrap gap-2 overflow-auto pr-1">
                {slots.map((slot) => (
                  <button
                    key={`${slot.start}-${slot.end}`}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-md border px-2 py-1 text-sm transition-colors ${selectedSlot?.start === slot.start ? 'bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900' : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'}`}
                  >
                    {slot.start.slice(11, 16)}
                    {slot.remaining < 99 ? ` (${slot.remaining})` : ''}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="bw-name"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {t.name}
              </label>
              <input
                id="bw-name"
                name="name"
                autoComplete="name"
                required
                className="w-full rounded-md border px-3 py-2 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="bw-email"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {t.email}
              </label>
              <input
                id="bw-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className="w-full rounded-md border px-3 py-2 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="bw-notes"
                className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {t.notes}
              </label>
              <textarea
                id="bw-notes"
                name="notes"
                rows={3}
                autoComplete="off"
                className="w-full rounded-md border px-3 py-2 text-slate-900 dark:bg-slate-900 dark:text-slate-100"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-between gap-3 border-t px-4 py-3 sm:px-5 dark:border-slate-700">
            <button
              type="button"
              onClick={close}
              className="rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              disabled={!serviceId || !date || !selectedSlot || !name || !email || submitting}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            >
              {t.confirm}
            </button>
          </div>
        </form>

        {/* Success overlay */}
        {success && (
          <div className="absolute inset-0 z-[62] flex items-center justify-center rounded-t-2xl bg-white/80 sm:rounded-2xl dark:bg-slate-900/80">
            <div className="rounded-xl border bg-white p-6 text-center shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-2 text-2xl">✅</div>
              <div className="mb-4 text-base font-medium text-slate-900 dark:text-slate-100">
                {t.success}
              </div>
              <button
                onClick={close}
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

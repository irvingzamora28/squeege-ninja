'use client'
import { FiTrash2, FiPlus, FiCalendar, FiClock } from 'react-icons/fi'

import { useEffect, useMemo, useState } from 'react'

// Types used locally
type Service = {
  id: number
  name: string
  duration_minutes: number
}

type AvailabilityRule = {
  id: number
  service_id: number
  weekday: number
  start_time_local: string
  end_time_local: string
  timezone: string
  capacity: number
}

type Holiday = {
  id: number
  service_id: number
  holiday_date: string
  note?: string | null
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function SchedulePage() {
  const [services, setServices] = useState<Service[]>([])
  const [serviceId, setServiceId] = useState<number | null>(null)
  const [applyToAll, setApplyToAll] = useState(false)

  // Rules state
  const [rules, setRules] = useState<AvailabilityRule[]>([])
  const [rulesLoading, setRulesLoading] = useState(false)
  const [ruleForm, setRuleForm] = useState({
    weekday: 1,
    start_time_local: '09:00',
    end_time_local: '17:00',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    capacity: 1,
  })
  const [multiDays, setMultiDays] = useState<number[]>([])

  // Holidays state
  const [holidays, setHolidays] = useState<Holiday[]>([])
  const [holidaysLoading, setHolidaysLoading] = useState(false)
  const [holidayForm, setHolidayForm] = useState({
    holiday_date: new Date().toISOString().slice(0, 10),
    note: '',
  })
  const [holidayRange, setHolidayRange] = useState<{ start: string; end: string }>({
    start: new Date().toISOString().slice(0, 10),
    end: new Date().toISOString().slice(0, 10),
  })

  // Load services
  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/allset/services')
      const data = await res.json()
      setServices(data.services || [])
    }
    load()
  }, [])

  // Set default service when services load and none selected
  useEffect(() => {
    if (services.length && !serviceId) {
      setServiceId(services[0].id)
    }
  }, [services, serviceId])

  // Load rules + holidays when service changes
  useEffect(() => {
    if (!serviceId) return
    loadRules(serviceId)
    loadHolidays(serviceId)
  }, [serviceId])

  // Data loaders
  const loadRules = async (sid: number) => {
    setRulesLoading(true)
    try {
      const res = await fetch(`/api/allset/availability-rules?service_id=${sid}`)
      const data = await res.json()
      setRules(data.rules || [])
    } finally {
      setRulesLoading(false)
    }
  }

  const loadHolidays = async (sid: number) => {
    setHolidaysLoading(true)
    try {
      const res = await fetch(`/api/allset/holidays?service_id=${sid}`)
      const data = await res.json()
      setHolidays(data.holidays || [])
    } finally {
      setHolidaysLoading(false)
    }
  }

  // Rule handlers
  const addRule = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!serviceId && !applyToAll) return
    // multiple days only: create a rule per selected weekday
    const days = multiDays.slice()
    if (!days.length) return
    const targetServiceIds = applyToAll ? services.map((s) => s.id) : [serviceId as number]
    for (const sid of targetServiceIds) {
      await Promise.all(
        days.map((d) =>
          fetch('/api/allset/availability-rules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: sid,
              weekday: d,
              start_time_local: ruleForm.start_time_local,
              end_time_local: ruleForm.end_time_local,
              timezone: ruleForm.timezone,
              capacity: Number(ruleForm.capacity),
            }),
          })
        )
      )
    }
    if (serviceId) await loadRules(serviceId)
  }

  const deleteRule = async (id: number) => {
    if (!serviceId) return
    const res = await fetch('/api/allset/availability-rules', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) await loadRules(serviceId)
  }

  // Holiday handlers
  const addHoliday = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!serviceId && !applyToAll) return
    // range only: add a holiday per day in [start, end]
    const start = new Date(holidayRange.start)
    const end = new Date(holidayRange.end)
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return
    const dates: string[] = []
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const iso = new Date(d).toISOString().slice(0, 10)
      dates.push(iso)
    }
    const targetServiceIds = applyToAll ? services.map((s) => s.id) : [serviceId as number]
    for (const sid of targetServiceIds) {
      await Promise.all(
        dates.map((day) =>
          fetch('/api/allset/holidays', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: sid,
              holiday_date: day,
              note: holidayForm.note || null,
            }),
          })
        )
      )
    }
    if (serviceId) await loadHolidays(serviceId)
  }

  const deleteHoliday = async (id: number) => {
    if (!serviceId) return
    const res = await fetch('/api/allset/holidays', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (res.ok) await loadHolidays(serviceId)
  }

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceId),
    [services, serviceId]
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold">Schedule</h2>
        <div className="ml-auto flex items-center gap-3">
          <label htmlFor="serviceSelect" className="text-sm font-medium">
            Service
          </label>
          <select
            id="serviceSelect"
            className="rounded-md border px-3 py-2"
            value={serviceId ?? ''}
            onChange={(e) => setServiceId(Number(e.target.value))}
          >
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} {typeof s.duration_minutes === 'number' ? `(${s.duration_minutes}m)` : ''}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={applyToAll}
              onChange={(e) => setApplyToAll(e.target.checked)}
            />
            <span>Apply to all services</span>
          </label>
        </div>
      </div>

      {/* Availability Rules Section */}
      <section className="space-y-4">
        <h3 className="flex items-center gap-2 text-xl font-semibold">
          <FiClock /> Weekly Availability Rules
        </h3>

        <form
          onSubmit={addRule}
          className="grid grid-cols-1 gap-3 rounded-md border p-4 sm:gap-4 md:grid-cols-6"
        >
          <div className="md:col-span-2">
            <span className="mb-1 block text-sm font-medium">Select weekdays</span>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {weekdays.map((w, i) => {
                const active = multiDays.includes(i)
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() =>
                      setMultiDays((prev) =>
                        prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
                      )
                    }
                    className={`min-w-0 rounded-md border px-2 py-1 text-xs sm:text-sm ${active ? 'bg-primary-600 text-white' : 'bg-white'}`}
                  >
                    {w}
                  </button>
                )
              })}
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] sm:text-xs">
              <button
                type="button"
                onClick={() => setMultiDays([1, 2, 3, 4, 5])}
                className="rounded-md border px-2 py-1"
              >
                Mon–Fri
              </button>
              <button
                type="button"
                onClick={() => setMultiDays([1, 2, 3, 4, 5, 6])}
                className="rounded-md border px-2 py-1"
              >
                Mon–Sat
              </button>
              <button
                type="button"
                onClick={() => setMultiDays([0, 6])}
                className="rounded-md border px-2 py-1"
              >
                Weekends
              </button>
              <button
                type="button"
                onClick={() => setMultiDays([0, 1, 2, 3, 4, 5, 6])}
                className="rounded-md border px-2 py-1"
              >
                All days
              </button>
              <button
                type="button"
                onClick={() => setMultiDays([])}
                className="rounded-md border px-2 py-1"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor="startTime" className="mb-1 block text-sm font-medium">
              Start
            </label>
            <input
              id="startTime"
              type="time"
              className="w-full min-w-0 rounded-md border px-3 py-2"
              value={ruleForm.start_time_local}
              onChange={(e) => setRuleForm({ ...ruleForm, start_time_local: e.target.value })}
            />
            <div className="mt-1 flex flex-wrap gap-2 text-[11px] sm:text-xs">
              <span className="text-gray-500">Presets:</span>
              <button
                type="button"
                className="rounded border px-2 py-1"
                onClick={() => setRuleForm((f) => ({ ...f, start_time_local: '09:00' }))}
              >
                9:00
              </button>
              <button
                type="button"
                className="rounded border px-2 py-1"
                onClick={() => setRuleForm((f) => ({ ...f, start_time_local: '13:00' }))}
              >
                13:00
              </button>
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor="endTime" className="mb-1 block text-sm font-medium">
              End
            </label>
            <input
              id="endTime"
              type="time"
              className="w-full min-w-0 rounded-md border px-3 py-2"
              value={ruleForm.end_time_local}
              onChange={(e) => setRuleForm({ ...ruleForm, end_time_local: e.target.value })}
            />
            <div className="mt-1 flex flex-wrap gap-2 text-[11px] sm:text-xs">
              <span className="text-gray-500">Presets:</span>
              <button
                type="button"
                className="rounded border px-2 py-1"
                onClick={() => setRuleForm((f) => ({ ...f, end_time_local: '12:00' }))}
              >
                12:00
              </button>
              <button
                type="button"
                className="rounded border px-2 py-1"
                onClick={() => setRuleForm((f) => ({ ...f, end_time_local: '17:00' }))}
              >
                17:00
              </button>
            </div>
          </div>
          <div className="min-w-0 md:col-span-1">
            <label htmlFor="timezone" className="mb-1 block text-sm font-medium">
              Timezone
            </label>
            <input
              id="timezone"
              type="text"
              className="w-full min-w-0 rounded-md border px-3 py-2"
              value={ruleForm.timezone}
              onChange={(e) => setRuleForm({ ...ruleForm, timezone: e.target.value })}
              placeholder="America/Denver"
            />
            <div className="mt-1 flex flex-wrap gap-2 text-[11px] sm:text-xs">
              <button
                type="button"
                className="rounded border px-2 py-1"
                onClick={() =>
                  setRuleForm((f) => ({
                    ...f,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
                  }))
                }
              >
                Use browser TZ
              </button>
            </div>
          </div>
          <div className="min-w-0">
            <label htmlFor="capacity" className="mb-1 block text-sm font-medium">
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              min={1}
              className="w-full min-w-0 rounded-md border px-3 py-2"
              value={ruleForm.capacity}
              onChange={(e) => setRuleForm({ ...ruleForm, capacity: Number(e.target.value) })}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:col-span-6">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-slate-600 px-3 py-2 text-sm text-white hover:bg-slate-700 sm:px-4 sm:text-base"
              disabled={(!applyToAll && !serviceId) || multiDays.length === 0}
            >
              <FiPlus className="shrink-0" />
              <span className="hidden sm:inline">Add Rules</span>
            </button>
            <button
              type="button"
              onClick={async () => {
                if (applyToAll) {
                  // fetch and delete rules for all services
                  for (const sid of services.map((s) => s.id)) {
                    const res = await fetch(`/api/allset/availability-rules?service_id=${sid}`)
                    if (res.ok) {
                      const data: AvailabilityRule[] = await res.json()
                      await Promise.all(
                        data.map((r) =>
                          fetch('/api/allset/availability-rules', {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: r.id }),
                          })
                        )
                      )
                    }
                  }
                  if (serviceId) await loadRules(serviceId)
                } else {
                  if (!serviceId) return
                  // delete all rules for the selected service (client-side iteration)
                  await Promise.all(
                    rules.map((r) =>
                      fetch('/api/allset/availability-rules', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: r.id }),
                      })
                    )
                  )
                  await loadRules(serviceId)
                }
              }}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-red-700 hover:bg-red-50 sm:px-4 sm:text-base"
            >
              <FiTrash2 className="shrink-0" />
              <span className="hidden sm:inline">Clear all</span>
            </button>
            <div className="ml-0 w-full sm:ml-auto sm:w-auto">
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] sm:mt-0 sm:text-xs">
                <span className="text-gray-500">Quick presets:</span>
                <button
                  type="button"
                  className="rounded border px-2 py-1"
                  onClick={() => {
                    setMultiDays([1, 2, 3, 4, 5])
                    setRuleForm((f) => ({
                      ...f,
                      start_time_local: '09:00',
                      end_time_local: '17:00',
                    }))
                  }}
                >
                  Mon–Fri 9–17
                </button>
                <button
                  type="button"
                  className="rounded border px-2 py-1"
                  onClick={() => {
                    setMultiDays([1, 2, 3, 4, 5, 6])
                    setRuleForm((f) => ({
                      ...f,
                      start_time_local: '10:00',
                      end_time_local: '18:00',
                    }))
                  }}
                >
                  Mon–Sat 10–18
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] table-auto border text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border px-2 py-1 text-left">Weekday</th>
                <th className="border px-2 py-1 text-left">Start</th>
                <th className="border px-2 py-1 text-left">End</th>
                <th className="border px-2 py-1 text-left">Timezone</th>
                <th className="border px-2 py-1 text-left">Capacity</th>
                <th className="border px-2 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {rulesLoading ? (
                <tr>
                  <td className="px-3 py-4" colSpan={6}>
                    Loading...
                  </td>
                </tr>
              ) : rules.length === 0 ? (
                <tr>
                  <td className="px-3 py-4" colSpan={6}>
                    No rules
                  </td>
                </tr>
              ) : (
                rules.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-3 py-2">
                      {r.weekday} - {weekdays[r.weekday]}
                    </td>
                    <td className="px-3 py-2">{r.start_time_local}</td>
                    <td className="px-3 py-2">{r.end_time_local}</td>
                    <td className="px-3 py-2">{r.timezone}</td>
                    <td className="px-3 py-2">{r.capacity}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => deleteRule(r.id)}
                        className="rounded-md p-2 text-red-600 hover:bg-red-50"
                        title="Delete rule"
                        aria-label="Delete rule"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Holidays Section */}
      <section className="space-y-4">
        <h3 className="flex items-center gap-2 text-xl font-semibold">
          <FiCalendar /> Holidays
        </h3>

        <form
          onSubmit={addHoliday}
          className="grid grid-cols-1 gap-3 rounded-md border p-4 sm:gap-4 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <span className="mb-1 block text-sm font-medium">Date range</span>
            <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
              <input
                type="date"
                className="rounded-md border px-3 py-2"
                value={holidayRange.start}
                onChange={(e) => setHolidayRange((r) => ({ ...r, start: e.target.value }))}
              />
              <span className="hidden text-sm text-gray-600 sm:inline">to</span>
              <span className="inline text-sm text-gray-600 sm:hidden">→</span>
              <input
                type="date"
                className="rounded-md border px-3 py-2"
                value={holidayRange.end}
                onChange={(e) => setHolidayRange((r) => ({ ...r, end: e.target.value }))}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Tip: set the same start and end to add a single-day holiday.
            </p>
          </div>
          <div className="md:col-span-7">
            <label htmlFor="holidayNote" className="mb-1 block text-sm font-medium">
              Note (optional)
            </label>
            <input
              id="holidayNote"
              type="text"
              className="w-full rounded-md border px-3 py-2"
              value={holidayForm.note}
              onChange={(e) => setHolidayForm({ ...holidayForm, note: e.target.value })}
              placeholder="e.g. Independence Day"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:col-span-12">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-slate-600 px-3 py-2 text-sm text-white hover:bg-slate-700 sm:px-4 sm:text-base"
              disabled={!applyToAll && !serviceId}
            >
              <FiPlus className="shrink-0" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] table-auto border text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="border px-2 py-1 text-left">Date</th>
                <th className="border px-2 py-1 text-left">Note</th>
                <th className="border px-2 py-1"></th>
              </tr>
            </thead>
            <tbody>
              {holidaysLoading ? (
                <tr>
                  <td className="px-3 py-4" colSpan={3}>
                    Loading...
                  </td>
                </tr>
              ) : holidays.length === 0 ? (
                <tr>
                  <td className="px-3 py-4" colSpan={3}>
                    No holidays
                  </td>
                </tr>
              ) : (
                holidays.map((h) => (
                  <tr key={h.id} className="border-t">
                    <td className="px-3 py-2">{h.holiday_date}</td>
                    <td className="px-3 py-2">{h.note || '-'}</td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => deleteHoliday(h.id)}
                        className="rounded-md p-2 text-red-600 hover:bg-red-50"
                        title="Delete holiday"
                        aria-label="Delete holiday"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedService && (
        <p className="text-xs text-gray-500">
          Managing schedule for: {selectedService.name} · Slot duration:{' '}
          {selectedService.duration_minutes} minutes
        </p>
      )}
    </div>
  )
}

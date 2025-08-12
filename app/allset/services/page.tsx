'use client'

import { useEffect, useState } from 'react'

type Service = {
  id: number
  name: string
  description?: string | null
  image_url?: string | null
  duration_minutes: number
  price: number
  active: number
  created_at: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    name: '',
    description: '',
    image_url: '',
    duration_minutes: 60,
    price: 100,
    active: 1 as 1 | 0,
  })
  const [submitting, setSubmitting] = useState(false)

  async function load() {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/allset/services', { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to load services')
      setServices(data.services || [])
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error loading services'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function createService(e: React.FormEvent) {
    e.preventDefault()
    try {
      setSubmitting(true)
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        image_url: form.image_url.trim() || null,
        duration_minutes: Number(form.duration_minutes),
        price: Number(form.price),
        active: Number(form.active),
      }
      const res = await fetch('/api/allset/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create service')
      setForm({
        name: '',
        description: '',
        image_url: '',
        duration_minutes: 60,
        price: 100,
        active: 1,
      })
      await load()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to create service'
      alert(msg)
    } finally {
      setSubmitting(false)
    }
  }

  async function toggleActive(svc: Service) {
    try {
      const res = await fetch('/api/allset/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: svc.id, active: svc.active ? 0 : 1 }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update service')
      await load()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to update service'
      alert(msg)
    }
  }

  async function deleteService(id: number) {
    if (!confirm('Delete this service?')) return
    try {
      const res = await fetch('/api/allset/services', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to delete service')
      await load()
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to delete service'
      alert(msg)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Services</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage the services offered by your business.
        </p>
      </div>

      {/* Create Service */}
      <form
        onSubmit={createService}
        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          Create Service
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="svc-name"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="svc-name"
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label
              htmlFor="svc-image"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Image URL
            </label>
            <input
              id="svc-image"
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              placeholder="https://..."
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            />
          </div>
          <div>
            <label
              htmlFor="svc-duration"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Duration (minutes)
            </label>
            <input
              id="svc-duration"
              type="number"
              min={1}
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              value={form.duration_minutes}
              onChange={(e) => setForm({ ...form, duration_minutes: Number(e.target.value) })}
              required
            />
          </div>
          <div>
            <label
              htmlFor="svc-price"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Price
            </label>
            <input
              id="svc-price"
              type="number"
              step="0.01"
              min={0}
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              required
            />
          </div>
          <div>
            <label
              htmlFor="svc-active"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Active
            </label>
            <select
              id="svc-active"
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              value={form.active}
              onChange={(e) => setForm({ ...form, active: Number(e.target.value) as 1 | 0 })}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="svc-desc"
              className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="svc-desc"
              className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-slate-600 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-60"
          >
            {submitting ? 'Creating...' : 'Create Service'}
          </button>
        </div>
      </form>

      {/* Services List */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">
          Existing Services
        </h2>
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-600 dark:text-red-400">{error}</p>
        ) : services.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No services yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Image
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                    Active
                  </th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {services.map((s) => (
                  <tr key={s.id}>
                    <td className="px-4 py-2">
                      {s.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.image_url}
                          alt={s.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700" />
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      <div className="font-medium">{s.name}</div>
                      {s.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {s.description}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      {s.duration_minutes} min
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      ${'{'}s.price.toFixed(2){'}'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">
                      {s.active ? 'Yes' : 'No'}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleActive(s)}
                          className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          {s.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => deleteService(s.id)}
                          className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-700 hover:bg-red-50 dark:border-red-600 dark:text-red-300 dark:hover:bg-red-900/30"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

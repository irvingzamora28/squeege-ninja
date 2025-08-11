'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// site settings now come from DB via /api/settings

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'AllSet Template',
    siteDescription: 'A modern template for Next.js applications',
    adminEmail: 'admin@example.com',
  })

  // Logo state
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [logoFileName, setLogoFileName] = useState<string>('')
  const [logoFile, setLogoFile] = useState<File | null>(null)

  // WhatsApp settings state
  const [whatsappEnabled, setWhatsappEnabled] = useState<boolean>(false)
  const [whatsappPhone, setWhatsappPhone] = useState<string>('')
  const [whatsappMessage, setWhatsappMessage] = useState<string>('')
  const [whatsappPosition, setWhatsappPosition] = useState<'bottom-right' | 'bottom-left'>(
    'bottom-right'
  )

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setLogoPreview(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Load WhatsApp config from API (DB-backed)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const resp = await fetch('/api/settings', { cache: 'no-store' })
        if (resp.ok) {
          const data = await resp.json()
          const s = data?.settings
          if (!cancelled && data?.success && s) {
            setWhatsappEnabled(!!s.whatsapp_enabled)
            setWhatsappPhone(s.whatsapp_phone || '')
            setWhatsappMessage(s.whatsapp_message || '')
            setWhatsappPosition(
              (s.whatsapp_position as 'bottom-right' | 'bottom-left') || 'bottom-right'
            )
            return
          }
        }
      } catch {
        // ignore
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage('')

    const formData = new FormData()
    if (logoFile) {
      formData.append('logo', logoFile)
    }

    // POST to /api/logo
    const resp = await fetch('/api/logo', {
      method: 'POST',
      body: formData,
    })
    const data = await resp.json()
    if (data.success) {
      setSaveMessage('Logo updated!')
      setLogoPreview(data.logoUrl)
      setLogoFileName('')
      setLogoFile(null)
    } else {
      setSaveMessage('Error updating logo: ' + (data.error || 'Unknown error'))
    }

    // Persist WhatsApp settings via API (DB-backed)
    try {
      const resp2 = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp_enabled: whatsappEnabled,
          whatsapp_phone: whatsappPhone,
          whatsapp_message: whatsappMessage,
          whatsapp_position: whatsappPosition,
        }),
      })
      const resJson = await resp2.json()
      if (resp2.ok && resJson?.success) {
        setSaveMessage((prev) =>
          prev ? prev + ' WhatsApp settings saved!' : 'WhatsApp settings saved!'
        )
      } else {
        setSaveMessage((prev) =>
          prev ? prev + ' (WhatsApp settings not saved)' : 'WhatsApp settings not saved'
        )
      }
    } catch {
      setSaveMessage((prev) =>
        prev ? prev + ' (WhatsApp settings not saved)' : 'WhatsApp settings not saved'
      )
    }
    setIsSaving(false)
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      <div className="rounded-lg bg-slate-100 p-6 shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">General Settings</h2>

            {/* Logo Settings */}
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="siteLogo"
              >
                Logo
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  id="siteLogo"
                  className="file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 block text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
                />
                <span className="text-xs text-gray-400">{logoFileName}</span>
              </div>

              {logoPreview && (
                <div className="mt-4">
                  <span className="mb-1 block text-xs text-gray-500 dark:text-gray-400">
                    Preview:
                  </span>
                  <Image
                    src={logoPreview}
                    alt="Logo Preview"
                    width={64}
                    height={64}
                    className="h-16 w-auto rounded shadow"
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="siteName"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={generalSettings.siteName}
                onChange={handleChange}
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="siteDescription"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Site Description
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={generalSettings.siteDescription}
                onChange={handleChange}
                rows={3}
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="adminEmail"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Admin Email
              </label>
              <input
                type="email"
                id="adminEmail"
                name="adminEmail"
                value={generalSettings.adminEmail}
                onChange={handleChange}
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">Contact Settings</h2>

            {/* WhatsApp Settings */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Enable WhatsApp
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Show a floating WhatsApp contact button on your site
                  </p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    id="whatsappEnabled"
                    name="whatsappEnabled"
                    checked={whatsappEnabled}
                    onChange={(e) => setWhatsappEnabled(e.target.checked)}
                    className="peer sr-only"
                    aria-label={`Toggle WhatsApp ${whatsappEnabled ? 'off' : 'on'}`}
                  />
                  <div className="peer peer-checked:bg-primary-600 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 h-6 w-11 rounded-full bg-gray-200 peer-focus:ring-4 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                  <span className="sr-only">Toggle WhatsApp {whatsappEnabled ? 'off' : 'on'}</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="whatsappPhone"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                WhatsApp Phone (E.164 or digits)
              </label>
              <input
                type="tel"
                id="whatsappPhone"
                name="whatsappPhone"
                disabled={!whatsappEnabled}
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                placeholder="e.g. +521234567890"
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-60 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="whatsappMessage"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Default Message
              </label>
              <textarea
                id="whatsappMessage"
                name="whatsappMessage"
                disabled={!whatsappEnabled}
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                rows={2}
                placeholder="Hello! I'd like to know more..."
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-60 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="whatsappPosition"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Button Position
              </label>
              <select
                id="whatsappPosition"
                name="whatsappPosition"
                disabled={!whatsappEnabled}
                value={whatsappPosition}
                onChange={(e) =>
                  setWhatsappPosition(e.target.value as 'bottom-right' | 'bottom-left')
                }
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm disabled:opacity-60 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">Theme Settings</h2>

            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme Color
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Use the Theme Color Manager below to change the primary color for the entire
                website.
              </p>

              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-sm font-medium text-slate-800 dark:text-gray-100">
                  Theme Color Manager
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Use our dedicated theme color manager to easily set and preview theme colors for
                  the entire site.
                </p>
                <div className="mt-3">
                  <a
                    href="/theme-setter.html"
                    target="_blank"
                    className="bg-primary-500 hover:bg-primary-600 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                    </svg>
                    Open Theme Color Manager
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">Security Settings</h2>

            <div className="mb-4">
              <div className="flex items-center">
                <input
                  id="twoFactor"
                  name="twoFactor"
                  type="checkbox"
                  className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
                <label
                  htmlFor="twoFactor"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Enable Two-Factor Authentication
                </label>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <input
                  id="loginNotifications"
                  name="loginNotifications"
                  type="checkbox"
                  className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  defaultChecked
                />
                <label
                  htmlFor="loginNotifications"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Email Notifications for New Logins
                </label>
              </div>
            </div>
          </div>

          {saveMessage && (
            <div className="mb-4 rounded-md bg-green-50 p-4 dark:bg-green-900/30">
              <div className="flex">
                <div className="text-sm font-medium text-green-800 dark:text-green-400">
                  {saveMessage}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

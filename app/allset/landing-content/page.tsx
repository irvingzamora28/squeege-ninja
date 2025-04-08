'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingContentPage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [saveMessage, setSaveMessage] = useState('')

  // Fetch the current landing content
  useEffect(() => {
    async function fetchLandingContent() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/allset/landing-content')

        if (!response.ok) {
          throw new Error('Failed to fetch landing content')
        }

        const data = await response.json()
        const formattedContent = JSON.stringify(data, null, 2)
        setContent(formattedContent)
        setOriginalContent(formattedContent)
      } catch (err) {
        console.error('Error fetching landing content:', err)
        setError('Failed to load landing content. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLandingContent()
  }, [])

  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  // Validate JSON
  const isValidJSON = (str: string) => {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate JSON
    if (!isValidJSON(content)) {
      setError('Invalid JSON format. Please check your content.')
      return
    }

    setError('')
    setIsSaving(true)
    setSaveMessage('')

    try {
      const response = await fetch('/api/allset/landing-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: content,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save landing content')
      }

      setSaveMessage('Landing content saved successfully!')
      setOriginalContent(content)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage('')
      }, 3000)
    } catch (err: Error | unknown) {
      console.error('Error saving landing content:', err)
      setError(
        err instanceof Error ? err.message : 'An error occurred while saving landing content'
      )
    } finally {
      setIsSaving(false)
    }
  }

  // Reset to original content
  const handleReset = () => {
    setContent(originalContent)
    setError('')
  }

  // Format JSON
  const handleFormat = () => {
    try {
      const parsed = JSON.parse(content)
      setContent(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (err) {
      setError('Cannot format: Invalid JSON format. Please fix the errors first.')
    }
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Landing Content Editor</h1>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleFormat}
            className="rounded-md bg-slate-600 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
          >
            Format JSON
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md bg-slate-600 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
          >
            Reset Changes
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-slate-100 p-6 shadow-md dark:bg-gray-800">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-slate-300"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                Edit the JSON content of your landing page below. Be careful to maintain valid JSON
                format.
              </p>

              {error && (
                <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
                  <div className="flex">
                    <div className="text-sm font-medium text-red-800 dark:text-red-400">
                      {error}
                    </div>
                  </div>
                </div>
              )}

              {saveMessage && (
                <div className="mb-4 rounded-md bg-green-50 p-4 dark:bg-green-900/30">
                  <div className="flex">
                    <div className="text-sm font-medium text-green-800 dark:text-green-400">
                      {saveMessage}
                    </div>
                  </div>
                </div>
              )}

              <div className="relative mt-4">
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  rows={30}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 font-mono text-sm shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  spellCheck="false"
                  data-gramm="false"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving || !isValidJSON(content)}
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}

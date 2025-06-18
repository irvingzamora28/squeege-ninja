'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { extractTextFromPdfFile } from '@/lib/utils/pdf-client'

type KnowledgeItem = {
  id: string
  title: string
  content: string
  dateAdded: string
}

type AgentConfig = {
  name: string
  personality: string
  language: string
  systemPrompt: string
  enabled: boolean
  knowledgeBase: KnowledgeItem[]
}

export default function AgentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [addingKnowledge, setAddingKnowledge] = useState(false)

  // Knowledge item form state
  const [knowledgeTitle, setKnowledgeTitle] = useState('')
  const [knowledgeContent, setKnowledgeContent] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [extractingPdf, setExtractingPdf] = useState(false)

  // Configuration state
  const [config, setConfig] = useState<AgentConfig>({
    name: 'AllSet Assistant',
    personality: 'friendly',
    language: 'english',
    systemPrompt:
      'You are a helpful assistant for our product. Answer customer questions accurately and politely.',
    enabled: false,
    knowledgeBase: [],
  })

  // Fetch current configuration on page load
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/allset/agent/config')
        if (response.ok) {
          const data = await response.json()
          setConfig(data)
        }
      } catch (err) {
        console.error('Error fetching agent configuration:', err)
      }
    }

    fetchConfig()
  }, [])

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    setConfig({
      ...config,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  // Handle file input change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setExtractingPdf(true)
      setError(null)
      try {
        const extractedText = await extractTextFromPdfFile(file)
        setKnowledgeContent(extractedText)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred during PDF extraction'
        )
        setKnowledgeContent('') // Clear content on error
      } finally {
        setExtractingPdf(false)
      }
    } else {
      setSelectedFile(null)
      setKnowledgeContent('') // Clear content if no file is selected
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSaved(false)
    setError(null)

    try {
      const response = await fetch('/api/allset/agent/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      if (!response.ok) {
        throw new Error('Failed to save agent configuration')
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000) // Clear saved message after 3 seconds
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Add knowledge item
  const handleAddKnowledge = async () => {
    if (!knowledgeTitle || !knowledgeContent) {
      setError('Title and content are required for knowledge items')
      return
    }

    setAddingKnowledge(true)
    setError(null)

    try {
      const response = await fetch('/api/allset/agent/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: knowledgeTitle,
          content: knowledgeContent,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add knowledge item')
      }

      const updatedConfig = await response.json()
      setConfig(updatedConfig)

      // Reset form
      setKnowledgeTitle('')
      setKnowledgeContent('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setAddingKnowledge(false)
    }
  }

  // Delete knowledge item
  const handleDeleteKnowledge = async (id: string) => {
    try {
      const response = await fetch(`/api/allset/agent/config?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete knowledge item')
      }

      const updatedConfig = await response.json()
      setConfig(updatedConfig)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  return (
    <div>
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-3xl leading-tight font-bold text-gray-900 dark:text-white">
          Agent Configuration
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Configure your AI assistant to help your customers with product questions.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {saved && (
        <div className="mb-4 rounded-md bg-green-50 p-4 dark:bg-green-900/30">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Success</h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                <p>Agent configuration saved successfully!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Enable Agent</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Turn the AI assistant on or off for your website
            </p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              name="enabled"
              checked={config.enabled}
              onChange={handleChange}
              className="peer sr-only"
              aria-label="Toggle agent enabled state"
            />
            <div className="peer peer-checked:bg-primary-600 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 h-6 w-11 rounded-full bg-gray-200 peer-focus:ring-4 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
            <span className="sr-only">Toggle agent {config.enabled ? 'off' : 'on'}</span>
          </label>
        </div>

        {/* Agent Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Agent Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              value={config.name}
              onChange={handleChange}
              className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Name of your AI assistant"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            This name will be displayed to users when interacting with the assistant.
          </p>
        </div>

        {/* Personality */}
        <div>
          <label
            htmlFor="personality"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Personality
          </label>
          <select
            id="personality"
            name="personality"
            value={config.personality}
            onChange={handleChange}
            className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="friendly">Friendly and Approachable</option>
            <option value="professional">Professional and Formal</option>
            <option value="casual">Casual and Conversational</option>
            <option value="enthusiastic">Enthusiastic and Energetic</option>
            <option value="technical">Technical and Precise</option>
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            This sets the tone and style of the agent's responses.
          </p>
        </div>

        {/* Language */}
        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            value={config.language}
            onChange={handleChange}
            className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 py-2 pr-10 pl-3 text-base focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="english">English</option>
            <option value="spanish">Spanish (Español)</option>
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The primary language the agent will use to communicate with users.
          </p>
        </div>

        {/* System Prompt */}
        <div>
          <label
            htmlFor="systemPrompt"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            System Prompt
          </label>
          <div className="mt-1">
            <textarea
              id="systemPrompt"
              name="systemPrompt"
              rows={4}
              value={config.systemPrompt}
              onChange={handleChange}
              className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Instructions for how the AI should behave and respond"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            This sets the behavior and knowledge of your AI assistant.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-75"
          >
            {loading ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>
      </form>

      {/* Knowledge Base Section */}
      <div className="mt-12">
        <div className="mb-6 border-b border-gray-200 pb-5">
          <h2 className="text-2xl leading-tight font-bold text-gray-900 dark:text-white">
            Knowledge Base
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Add product information and FAQs to help your AI assistant provide accurate answers.
          </p>
        </div>

        {/* Add Knowledge Item Form */}
        <div className="mb-8 rounded-md bg-gray-50 p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Add Knowledge Item
          </h3>

          <div className="mb-4">
            <label
              htmlFor="knowledgeTitle"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="knowledgeTitle"
              value={knowledgeTitle}
              onChange={(e) => setKnowledgeTitle(e.target.value)}
              className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="E.g., Product Features, Pricing FAQ, etc."
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="knowledgeContent"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Content
            </label>
            <textarea
              id="knowledgeContent"
              rows={6}
              value={knowledgeContent}
              onChange={(e) => setKnowledgeContent(e.target.value)}
              className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter detailed information that the AI can use to answer questions"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="knowledgePdf"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Upload PDF (Optional)
            </label>
            <input
              type="file"
              id="knowledgePdf"
              accept=".pdf"
              onChange={handleFileChange}
              className="focus:border-primary-500 focus:ring-primary-500 file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            {extractingPdf && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Extracting text from PDF...
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddKnowledge}
            disabled={addingKnowledge || extractingPdf}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-800 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-75"
          >
            {addingKnowledge ? 'Adding...' : 'Add to Knowledge Base'}
          </button>
        </div>

        {/* Knowledge Items List */}
        <div>
          <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Existing Knowledge Items
          </h3>

          {config.knowledgeBase.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No knowledge items added yet.</p>
          ) : (
            <div className="space-y-4">
              {config.knowledgeBase.map((item) => (
                <div
                  key={item.id}
                  className="rounded-md border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-md font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Added on {new Date(item.dateAdded).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteKnowledge(item.id)}
                      className="ml-2 inline-flex items-center rounded-md border border-transparent bg-red-100 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="mt-2 max-h-40 overflow-y-auto">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {item.content.length > 200
                        ? `${item.content.substring(0, 200)}...`
                        : item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

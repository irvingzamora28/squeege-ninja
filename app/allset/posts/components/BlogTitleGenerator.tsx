'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BlogTitleSuggestion } from '@/lib/llm/types'

interface BlogTitleGeneratorProps {
  onTitleSelected?: (title: string, description: string) => void
}

export default function BlogTitleGenerator({ onTitleSelected }: BlogTitleGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [generationMessage, setGenerationMessage] = useState('')
  const [titleSuggestions, setTitleSuggestions] = useState<BlogTitleSuggestion[]>([])
  const router = useRouter()

  const handleGenerate = async () => {
    setError('')
    setGenerationMessage('')
    setIsGenerating(true)
    setTitleSuggestions([])

    try {
      const response = await fetch('/api/allset/generate-blog-titles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to generate blog titles')
      }

      const data = await response.json()

      if (data.success) {
        setGenerationMessage('Blog title suggestions generated successfully!')
        setTitleSuggestions(data.titles)
      } else {
        throw new Error(data.message || 'Failed to generate blog titles')
      }
    } catch (err: unknown) {
      console.error('Error generating blog titles:', err)
      setError(
        err instanceof Error ? err.message : 'An error occurred while generating blog titles'
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const [isGeneratingContent, setIsGeneratingContent] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedDescription, setSelectedDescription] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')

  const handleTitleSelect = (title: string, description: string) => {
    if (onTitleSelected) {
      onTitleSelected(title, description)
    } else {
      // Navigate to new post page with title and description as query params
      const params = new URLSearchParams({
        title,
        summary: description,
      })
      router.push(`/allset/posts/new?${params.toString()}`)
    }
  }

  const handleGenerateContent = async (title: string, description: string) => {
    setSelectedTitle(title)
    setSelectedDescription(description)
    setIsGeneratingContent(true)
    setError('')
    setGeneratedContent('')

    try {
      const response = await fetch('/api/allset/generate-blog-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to generate blog content')
      }

      const data = await response.json()

      if (data.success) {
        setGeneratedContent(data.content)
        setGenerationMessage('Blog content generated successfully!')
      } else {
        throw new Error(data.message || 'Failed to generate blog content')
      }
    } catch (err: unknown) {
      console.error('Error generating blog content:', err)
      setError(
        err instanceof Error ? err.message : 'An error occurred while generating blog content'
      )
    } finally {
      setIsGeneratingContent(false)
    }
  }

  const handleUseGeneratedContent = () => {
    if (selectedTitle && selectedDescription && generatedContent) {
      // Navigate to new post page with title, description, and content
      const params = new URLSearchParams({
        title: selectedTitle,
        summary: selectedDescription,
        content: generatedContent,
      })
      router.push(`/allset/posts/new?${params.toString()}`)
    }
  }

  return (
    <div className="mb-6 rounded-lg bg-slate-100 p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold">SEO Blog Title Generator</h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Generate SEO-optimized blog title suggestions based on your landing page content.
      </p>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
          <div className="flex">
            <div className="text-sm font-medium text-red-800 dark:text-red-400">{error}</div>
          </div>
        </div>
      )}

      {generationMessage && (
        <div className="mb-4 rounded-md bg-green-50 p-4 dark:bg-green-900/30">
          <div className="flex">
            <div className="text-sm font-medium text-green-800 dark:text-green-400">
              {generationMessage}
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Generating...
            </>
          ) : (
            'Generate Blog Title Suggestions'
          )}
        </button>
      </div>

      {titleSuggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-semibold">Suggested Blog Titles:</h3>
          <ul className="space-y-4">
            {titleSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
              >
                <h4 className="mb-1 text-base font-medium">{suggestion.title}</h4>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  {suggestion.description}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleTitleSelect(suggestion.title, suggestion.description)}
                    className="text-primary-600 hover:text-primary-700 focus:ring-primary-500 rounded-md px-3 py-1 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  >
                    Use Title Only
                  </button>
                  <button
                    onClick={() => handleGenerateContent(suggestion.title, suggestion.description)}
                    disabled={isGeneratingContent && selectedTitle === suggestion.title}
                    className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-3 py-1 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-70"
                  >
                    {isGeneratingContent && selectedTitle === suggestion.title ? (
                      <>
                        <span className="mr-1 inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                        Generating...
                      </>
                    ) : (
                      'Generate Content'
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {generatedContent && (
        <div className="mt-6 rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/30">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-400">
              Generated Content for: {selectedTitle}
            </h3>
            <button
              onClick={handleUseGeneratedContent}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            >
              Use This Content
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto rounded-md bg-white p-4 dark:bg-gray-800">
            <pre className="text-sm whitespace-pre-wrap">{generatedContent}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
    tags: '',
    authors: '',
    draft: false,
    summary: '',
    content: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      // Handle checkbox input
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      // Handle text inputs
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
  }

  // Auto-generate slug when title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      // Prepare the data
      const postData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        authors: formData.authors
          .split(',')
          .map((author) => author.trim())
          .filter(Boolean),
      }

      // Send the request
      const response = await fetch('/api/allset/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to create post')
      }

      const data = await response.json()

      setSuccess('Post created successfully!')

      // Redirect to the edit page after a short delay
      setTimeout(() => {
        router.push(`/allset/posts/edit/${data.slug}`)
      }, 1500)
    } catch (error) {
      console.error('Error creating post:', error)
      setError(error instanceof Error ? error.message : 'An error occurred while creating the post')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create New Post</h1>
        <Link
          href="/allset/posts"
          className="rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
        >
          Back to Posts
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-4 dark:bg-red-900/30">
          <div className="flex">
            <div className="text-sm font-medium text-red-800 dark:text-red-400">{error}</div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-md bg-green-50 p-4 dark:bg-green-900/30">
          <div className="flex">
            <div className="text-sm font-medium text-green-800 dark:text-green-400">{success}</div>
          </div>
        </div>
      )}

      <div className="rounded-lg bg-slate-100 p-6 shadow-md dark:bg-gray-800">
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is a placeholder for the new post creation form. In a real application, you would
            implement a form to create a new post.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            To create a new post, you would need to create a new MDX file in the{' '}
            <code className="rounded bg-gray-200 px-1 py-0.5 dark:bg-gray-700">data/blog</code>{' '}
            directory.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter post title"
              value={formData.title}
              onChange={handleTitleChange}
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="enter-post-slug"
              value={formData.slug}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="tag1, tag2, tag3"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="authors"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Authors (comma separated)
            </label>
            <input
              type="text"
              id="authors"
              name="authors"
              className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="author1, author2"
              value={formData.authors}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              rows={3}
              className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Enter a brief summary of the post"
              value={formData.summary}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Content (Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              rows={10}
              className="focus:border-primary-500 focus:ring-primary-500 mt-1 block w-full rounded-md border-gray-300 font-mono shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="# Your post content here\n\nWrite your post content in Markdown format."
              value={formData.content}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              id="draft"
              name="draft"
              type="checkbox"
              className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              checked={formData.draft}
              onChange={handleChange}
            />
            <label htmlFor="draft" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Save as draft
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

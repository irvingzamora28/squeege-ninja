'use client'

import { useEffect, useState, Suspense } from 'react'
import { allBlogs, Blog } from 'contentlayer/generated'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

// Component that uses useSearchParams
function EditPostContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Get the slug and decode it to handle spaces and special characters
  const encodedSlug = searchParams.get('slug')
  const slug = encodedSlug ? decodeURIComponent(encodedSlug) : null

  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      router.push('/allset/posts')
      return
    }

    // Find the post with the matching slug
    const foundPost = allBlogs.find((p) => p.slug === slug)

    if (foundPost) {
      setPost(foundPost)
    } else {
      // Redirect to posts page if post not found
      router.push('/allset/posts')
    }

    setLoading(false)
  }, [slug, router])

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-slate-300"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/30">
        <h2 className="text-lg font-semibold text-red-800 dark:text-red-400">Post not found</h2>
        <p className="mt-2 text-red-700 dark:text-red-300">
          The post you're looking for doesn't exist or has been removed.
        </p>
        <div className="mt-4">
          <Link
            href="/allset/posts"
            className="rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
          >
            Back to Posts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Post: {post.title}</h1>
        <Link
          href="/allset/posts"
          className="rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
        >
          Back to Posts
        </Link>
      </div>

      <div className="rounded-lg bg-slate-100 p-6 shadow-md dark:bg-gray-800">
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This is a placeholder for the post editor. In a real application, you would implement a
            form to edit the post content.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            To edit the post, you would need to modify the MDX file at:{' '}
            <code className="rounded bg-gray-200 px-1 py-0.5 dark:bg-gray-700">
              {post.filePath}
            </code>
          </p>
        </div>

        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">Post Details</h2>
          <div className="rounded-md bg-white p-4 dark:bg-gray-700">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</p>
                <p className="text-sm text-slate-800 dark:text-white">{post.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                <p className="text-sm text-slate-800 dark:text-white">{post.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                <p className="text-sm text-slate-800 dark:text-white">
                  {post.draft ? 'Draft' : 'Published'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Authors</p>
                <p className="text-sm text-slate-800 dark:text-white">
                  {post.authors?.join(', ') || 'Unknown'}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tags</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {post.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-200 px-2 py-1 text-xs dark:bg-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Summary</p>
                <p className="text-sm text-slate-800 dark:text-white">{post.summary}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Link
            href={`/blog/${encodeURIComponent(post.slug || '')}`}
            target="_blank"
            className="rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
          >
            View Post
          </Link>
          <button
            type="button"
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-md px-4 py-2 text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  )
}

// Main page component with Suspense boundary
export default function EditPostPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-48 items-center justify-center">
          <div className="border-t-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-slate-300"></div>
        </div>
      }
    >
      <EditPostContent />
    </Suspense>
  )
}

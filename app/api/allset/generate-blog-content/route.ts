import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { allBlogs } from 'contentlayer/generated'
import { llmService } from '@/lib/llm'

// For static export, we need to handle this differently
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json()

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: 'Title and description are required' },
        { status: 400 }
      )
    }

    // Get information about existing blog posts for internal linking
    const existingPosts = allBlogs
      .filter((post) => !post.draft)
      .map((post) => ({
        title: post.title,
        slug: post.slug,
        summary: post.summary,
        tags: post.tags,
      }))
      .slice(0, 5) // Limit to 5 posts for context

    // Format existing posts information
    const existingPostsInfo = existingPosts
      .map((post) => `- "${post.title}" (slug: ${post.slug}) - ${post.summary}`)
      .join('\n')

    // Generate blog content using the LLM service
    const result = await llmService.generateBlogContent(title, description, existingPostsInfo)

    if (result.error) {
      return NextResponse.json({ success: false, message: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      content: result.content,
    })
  } catch (error: unknown) {
    console.error('Error generating blog content:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while generating blog content',
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { allBlogs } from 'contentlayer/generated'
import { llmService } from '@/lib/llm'
import siteMetadata from '@/data/siteMetadata'
import { cleanBlogContent } from '@/lib/utils/cleanBlogContent'

// For static export, we need to handle this differently
export const dynamic = 'error'

export async function POST(request: NextRequest) {
  try {
    // Extract title and description from request body
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
    const existingPostsInfo =
      existingPosts.length > 0
        ? existingPosts
            .map((post) => `- "${post.title}" (slug: ${post.slug}) - ${post.summary}`)
            .join('\n')
        : 'No existing posts yet.'

    // Always use the site's language setting
    const contentLanguage = siteMetadata.language
    console.log(`API: Generating blog content in site language: ${contentLanguage}`)

    // Generate blog content using LLM service
    const result = await llmService.generateBlogContent(
      title,
      description,
      existingPostsInfo,
      contentLanguage
    )
    console.log(result)

    if (result.error) {
      return NextResponse.json({ success: false, message: result.error }, { status: 500 })
    }

    // Clean up the content to ensure it's not wrapped in JSON
    const cleanContent = cleanBlogContent(result.content)

    return NextResponse.json({
      success: true,
      content: cleanContent,
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

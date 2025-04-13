/**
 * Unified LLM service that supports multiple providers
 */

import { OpenAIProvider } from './providers/openai'
import { GoogleGenAIProvider } from './providers/google-genai'
import { LLMProvider, LLMResponse } from './types'

// Default prompt for generating landing content
const LANDING_CONTENT_PROMPT = `
You are a professional landing page content creator. Your task is to create content for a landing page based on the user's description of their business or SaaS product.

Generate a complete JSON object that follows this structure:
{
  "hero": {
    "title": "Main headline that captures attention",
    "description": "Compelling subheading that explains the value proposition",
    "primaryCta": {
      "text": "Primary call-to-action button text",
      "link": "#"
    },
    "secondaryCta": {
      "text": "Secondary call-to-action button text",
      "link": "#"
    }
  },
  "mainFeatures": [
    {
      "id": 1,
      "icon": "FiUsers",
      "title": "Feature 1 title",
      "description": "Feature 1 description",
      "image": "/placeholder.jpg"
    },
    {
      "id": 2,
      "icon": "FiLayers",
      "title": "Feature 2 title",
      "description": "Feature 2 description",
      "image": "/placeholder.jpg"
    },
    {
      "id": 3,
      "icon": "FiSmartphone",
      "title": "Feature 3 title",
      "description": "Feature 3 description",
      "image": "/placeholder.jpg"
    }
  ],
  "featureTitle": "Features section title",
  "featureDescription": "Features section description",
  "features": [
    {
      "title": "Feature 1 title",
      "description": "Feature 1 description",
      "icon": "FiCheckCircle"
    },
    {
      "title": "Feature 2 title",
      "description": "Feature 2 description",
      "icon": "FiCheckCircle"
    },
    {
      "title": "Feature 3 title",
      "description": "Feature 3 description",
      "icon": "FiCheckCircle"
    },
    {
      "title": "Feature 4 title",
      "description": "Feature 4 description",
      "icon": "FiCheckCircle"
    },
    {
      "title": "Feature 5 title",
      "description": "Feature 5 description",
      "icon": "FiCheckCircle"
    },
    {
      "title": "Feature 6 title",
      "description": "Feature 6 description",
      "icon": "FiCheckCircle"
    }
  ],
  "cta": {
    "title": "Call to action section title",
    "description": "Call to action section description",
    "button": {
      "text": "Call to action button text",
      "link": "#"
    }
  },
  "faqs": {
    "title": "Frequently Asked Questions",
    "description": "Common questions about our product",
    "questions": [
      {
        "question": "Question 1",
        "answer": "Answer 1"
      },
      {
        "question": "Question 2",
        "answer": "Answer 2"
      },
      {
        "question": "Question 3",
        "answer": "Answer 3"
      },
      {
        "question": "Question 4",
        "answer": "Answer 4"
      },
      {
        "question": "Question 5",
        "answer": "Answer 5"
      }
    ]
  },
  "pricing": {
    "title": "Pricing Plans",
    "description": "Choose the plan that fits your needs",
    "plans": [
      {
        "name": "Basic",
        "price": "$9/month",
        "description": "Perfect for individuals",
        "features": [
          "Feature 1",
          "Feature 2",
          "Feature 3"
        ],
        "cta": {
          "text": "Get Started",
          "link": "#"
        }
      },
      {
        "name": "Pro",
        "price": "$29/month",
        "description": "Ideal for small teams",
        "features": [
          "All Basic features",
          "Feature 4",
          "Feature 5",
          "Feature 6"
        ],
        "cta": {
          "text": "Get Started",
          "link": "#"
        },
        "highlighted": true
      },
      {
        "name": "Enterprise",
        "price": "Contact us",
        "description": "For large organizations",
        "features": [
          "All Pro features",
          "Feature 7",
          "Feature 8",
          "Feature 9"
        ],
        "cta": {
          "text": "Contact Sales",
          "link": "#"
        }
      }
    ]
  }
}

Based on the user's description, create a compelling and relevant landing page content. Make sure to:
1. Use the business name in the hero title
2. Highlight the main value proposition in the hero description
3. Create relevant feature titles and descriptions
4. Generate realistic FAQs that potential customers might ask
5. Adjust pricing plans to match the business model
6. Use appropriate icons (use Feather icon names like FiUsers, FiLayers, etc.)

Return ONLY the JSON object without any additional text or explanation.

User's business description:
`

// Prompt for generating SEO blog titles
const BLOG_TITLES_PROMPT = `
You are an expert SEO content strategist. Your task is to generate 5 blog post titles that would attract traffic to a website based on the provided landing page content.

The titles should:
1. Be SEO-optimized with relevant keywords
2. Be compelling and clickable
3. Address pain points or interests of the target audience
4. Be relevant to the business/product described in the landing page
5. Include a mix of how-to guides, listicles, and problem-solving content

For each blog post, also generate 3-5 relevant tags that would help with SEO and content organization. Tags should be single words or short phrases that accurately categorize the content.

Return the results as a JSON array with the following structure:
[
  {
    "title": "Blog Post Title 1",
    "description": "Brief 1-2 sentence description of what this blog post would cover",
    "tags": ["tag1", "tag2", "tag3", "tag4"]
  },
  {...}
]

Landing page content:
`

// Prompt for generating full blog post content
const BLOG_CONTENT_PROMPT = `
You are an expert SEO content writer. Your task is to create a comprehensive, engaging, and SEO-optimized blog post based on the provided title and description.

The blog post should:
1. Be well-structured with clear headings and subheadings (using Markdown # for h1, ## for h2, ### for h3)
2. Include an engaging introduction that hooks the reader
3. Provide valuable, actionable information throughout the content
4. Use a mix of paragraphs, bullet points, and numbered lists for better readability
5. Include at least one table where appropriate (using Markdown table syntax)
6. Reference at least 2-3 other blog posts from the site for internal linking (I'll provide some existing posts)
7. Include suggestions for 2-3 external resources or references
8. Have a clear conclusion with a call to action
9. Be optimized for SEO with appropriate keyword usage
10. Be between 1000-1500 words in length
11. Use a conversational yet professional tone

Existing blog posts for internal linking:
{{existingPosts}}

IMPORTANT: Return ONLY the Markdown content directly, not wrapped in JSON or any other format. The content should be ready to be used in an MDX file without any additional processing.

Title: {{title}}
Description: {{description}}
`

/**
 * LLM service that provides a unified interface for different LLM providers
 */
export class LLMService {
  private provider: LLMProvider

  constructor() {
    // Initialize the provider based on environment variables
    const providerType = process.env.LLM_API_PROVIDER || 'openai'
    const apiKey = process.env.LLM_API_KEY || 'API_KEY_NOT_SET'
    const model = process.env.LLM_MODEL || 'gpt-3.5-turbo'
    const apiUrl = process.env.LLM_API_URL || 'http://localhost:11434/v1'

    if (!apiKey) {
      throw new Error('LLM_API_KEY is required')
    }

    switch (providerType.toLowerCase()) {
      case 'openai':
        this.provider = new OpenAIProvider(apiKey, model)
        break
      case 'google-genai':
        this.provider = new GoogleGenAIProvider(apiKey, model)
        break
      // Add more providers as needed
      default:
        throw new Error(`Unsupported LLM provider: ${providerType}`)
    }
  }

  /**
   * Generate landing content based on user input
   * @param businessDescription Description of the business or SaaS product
   * @returns Generated landing content as JSON
   */
  async generateLandingContent(businessDescription: string): Promise<LLMResponse> {
    const prompt = LANDING_CONTENT_PROMPT + businessDescription
    return this.provider.generateContent(prompt)
  }

  /**
   * Generate SEO blog titles based on landing page content
   * @param landingContent The landing page content JSON
   * @returns Generated blog titles as JSON array
   */
  async generateBlogTitles(landingContent: string): Promise<LLMResponse> {
    const prompt = BLOG_TITLES_PROMPT + landingContent
    return this.provider.generateContent(prompt)
  }

  /**
   * Generate full blog post content based on title and description
   * @param title The blog post title
   * @param description Brief description of the blog post
   * @param existingPosts Information about existing blog posts for internal linking
   * @returns Generated blog post content in Markdown format
   */
  async generateBlogContent(
    title: string,
    description: string,
    existingPosts: string
  ): Promise<LLMResponse> {
    const prompt = BLOG_CONTENT_PROMPT.replace('{{title}}', title)
      .replace('{{description}}', description)
      .replace('{{existingPosts}}', existingPosts)

    return this.provider.generateContent(prompt)
  }
}

// Export a singleton instance
export const llmService = new LLMService()

/**
 * Unified LLM service that supports multiple providers
 */

import { OpenAIProvider } from './providers/openai'
import { GoogleGenAIProvider } from './providers/google-genai'
import { LLMProvider, LLMResponse } from './types'
import { BLOG_CONTENT_PROMPT, BLOG_TITLES_PROMPT, LANDING_CONTENT_PROMPT } from '../constants'
import { generateImagesForLandingContent } from './generateLandingImages'

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
   * @param language The language code to generate content in (defaults to 'en-us')
   * @returns Generated landing content as JSON
   */
  async generateLandingContent(
    businessDescription: string,
    language: string = 'en-us'
  ): Promise<LLMResponse> {
    // Get language instruction or default to English if language not supported
    const languageInstruction =
      this.languageInstructions[language] || this.languageInstructions['en-us']

    // Add language instruction to the prompt
    const promptWithLanguage = `${languageInstruction}\n\nGenerate the landing page content in ${language === 'es-mx' ? 'Spanish' : 'English'}.\n\n${LANDING_CONTENT_PROMPT}${businessDescription}`

    // Step 1: Generate landing content JSON
    const initialResponse = await this.provider.generateContent(promptWithLanguage)
    if (!initialResponse.content) return initialResponse

    let landingContentObj: Record<string, unknown> | unknown[]
    try {
      landingContentObj =
        typeof initialResponse.content === 'string'
          ? JSON.parse(initialResponse.content)
          : initialResponse.content
    } catch (err) {
      return {
        error: 'Failed to parse landing content JSON',
        content: initialResponse.content,
      }
    }

    // Step 2: Generate images for all imagePrompt fields
    await generateImagesForLandingContent(landingContentObj)

    // Step 3: Return the updated content
    return initialResponse
  }

  /**
   * Generate SEO blog titles based on landing page content
   * @param landingContent The landing page content JSON
   * @param language The language code to generate titles in (defaults to 'en-us')
   * @returns Generated blog titles as JSON array
   */
  async generateBlogTitles(
    landingContent: string,
    language: string = 'en-us'
  ): Promise<LLMResponse> {
    // Get language instruction or default to English if language not supported
    const languageInstruction =
      this.languageInstructions[language] || this.languageInstructions['en-us']

    // Add language instruction to the prompt
    const promptWithLanguage = `${languageInstruction}\n\n${BLOG_TITLES_PROMPT}${landingContent}`

    return this.provider.generateContent(promptWithLanguage)
  }

  /**
   * Language instructions map for multilingual content generation
   * This can be easily extended with more languages in the future
   */
  private languageInstructions: Record<string, string> = {
    'en-us': 'Write this blog post in English (US). Use American English spelling and expressions.',
    'es-mx':
      'Write this blog post in Spanish (Mexican dialect). Ensure all content, including headings, lists, and tables are in Spanish. Use expressions and terminology common in Mexico.',
    // Add more languages as needed, for example:
    // 'fr-fr': 'Write this blog post in French (France). Ensure all content is in French...',
    // 'pt-br': 'Write this blog post in Portuguese (Brazilian). Ensure all content is in Brazilian Portuguese...',
  }

  /**
   * Generate blog content based on title and description
   * @param title The blog post title
   * @param description Brief description of the blog post
   * @param existingPosts Information about existing blog posts for internal linking
   * @param language - The language code to generate content in (defaults to 'en-us')
   */
  async generateBlogContent(
    title: string,
    description: string,
    existingPostsInfo: string,
    language: string = 'en-us'
  ) {
    // Get language instruction or default to English if language not supported
    const languageInstruction =
      this.languageInstructions[language] || this.languageInstructions['en-us']

    const prompt = BLOG_CONTENT_PROMPT.replace('{{title}}', title)
      .replace('{{description}}', description)
      .replace('{{existingPosts}}', existingPostsInfo)

    // Add language instruction to the prompt
    const promptWithLanguage = `${languageInstruction}\n\n${prompt}`

    const result = await this.provider.generateContent(promptWithLanguage)

    return result
  }
}

// Export a singleton instance
export const llmService = new LLMService()

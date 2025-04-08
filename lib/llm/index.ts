/**
 * Unified LLM service that supports multiple providers
 */

import { OpenAIProvider } from './providers/openai'
import { GoogleGenAIProvider } from './providers/google-genai'
import { LLMProvider, LLMResponse } from './types'

// Default prompt for generating landing content
const DEFAULT_PROMPT = `
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
    const prompt = DEFAULT_PROMPT + businessDescription
    return this.provider.generateContent(prompt)
  }
}

// Export a singleton instance
export const llmService = new LLMService()

/**
 * Google Gemini provider for the LLM service
 */

import { GoogleGenAI, Content } from '@google/genai'
import { LLMProvider, LLMResponse, ChatMessage } from '../types'

export class GoogleGenAIProvider implements LLMProvider {
  private client: GoogleGenAI
  private model: string

  constructor(apiKey: string, model: string = 'gemini-1.5-flash') {
    this.client = new GoogleGenAI({ apiKey })
    this.model = model
  }

  async generateContent(prompt: string): Promise<LLMResponse> {
    try {
      const result = await this.client.models.generateContent({
        model: this.model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.7,
          maxOutputTokens: 4000,
          responseMimeType: 'application/json',
        },
      })

      const content = result.text || ''

      return { content }
    } catch (error: Error | unknown) {
      console.error('Google Gemini error:', error)
      return {
        content: '',
        error:
          error instanceof Error
            ? error.message || 'An error occurred while generating content with Google Gemini'
            : 'An error occurred while generating content with Google Gemini',
      }
    }
  }

  async generateChatResponse(messages: ChatMessage[], systemPrompt?: string): Promise<string> {
    try {
      const formattedContents: Content[] = []

      // Add system prompt as the first user message if provided
      if (systemPrompt) {
        formattedContents.push({ role: 'user', parts: [{ text: systemPrompt }] })
        // Add a model 'OK' response to prime the conversation after a system prompt
        formattedContents.push({
          role: 'model',
          parts: [{ text: 'Okay, I will act as instructed.' }],
        })
      }

      // Add all messages from history
      messages.forEach((msg) => {
        formattedContents.push({
          role: msg.role === 'assistant' ? 'model' : 'user', // Convert 'assistant' to 'model'
          parts: [{ text: msg.content }],
        })
      })

      if (formattedContents.length === 0) {
        console.error('Google Gemini chat error: No messages to send.')
        return 'Error: Cannot generate chat response with no messages.'
      }

      const result = await this.client.models.generateContent({
        model: this.model,
        contents: formattedContents,
        config: {
          temperature: 0.7,
          maxOutputTokens: 4000,
          // responseMimeType: 'application/json', // Keep if needed, but text is usually default
        },
      })

      const responseText = result.text || ''
      return responseText
    } catch (error: Error | unknown) {
      console.error('Google Gemini chat error:', error)
      const errorMessage =
        error instanceof Error
          ? error.message || 'An error occurred while generating chat response with Google Gemini'
          : 'An error occurred while generating chat response with Google Gemini'
      return `Error: ${errorMessage}`
    }
  }
}

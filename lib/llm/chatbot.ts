import { LLMProvider, ChatMessage } from './types'

export class Chatbot {
  private provider: LLMProvider
  private conversationHistory: ChatMessage[]
  private systemPrompt?: string

  constructor(provider: LLMProvider, systemPrompt?: string) {
    this.provider = provider
    this.conversationHistory = []
    this.systemPrompt = systemPrompt
  }

  /**
   * Sends a message to the chatbot and gets a response.
   * @param userMessage The message from the user.
   * @returns The chatbot's response.
   */
  async sendMessage(userMessage: string): Promise<string> {
    this.conversationHistory.push({ role: 'user', content: userMessage })

    const botResponseContent = await this.provider.generateChatResponse(
      this.conversationHistory,
      this.systemPrompt
    )

    if (botResponseContent && !botResponseContent.startsWith('Error:')) {
      this.conversationHistory.push({ role: 'assistant', content: botResponseContent })
    }

    return botResponseContent
  }

  /**
   * Clears the current conversation history.
   */
  clearHistory(): void {
    this.conversationHistory = []
  }

  /**
   * Retrieves the current conversation history.
   * @returns Array of chat messages.
   */
  getHistory(): ChatMessage[] {
    return [...this.conversationHistory]
  }
}

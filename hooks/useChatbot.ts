import { useState } from 'react'

export type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export type AgentConfig = {
  name: string
  personality: string
  language: string
  systemPrompt: string
  enabled: boolean
}

/**
 * Custom hook for chatbot functionality
 */
export function useChatbot(agentConfig: AgentConfig | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Set initial messages or add a welcome message
   * @param initialMessages Messages to set
   */
  const setInitialMessages = (initialMessages: Message[]) => {
    setMessages(initialMessages)
  }

  /**
   * Send a message to the chatbot API
   * @param userMessage The message from the user
   */
  const sendMessage = async (userMessage: string): Promise<void> => {
    if (!userMessage.trim()) return

    const userMessageObj: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }
    const newMessages = [...messages, userMessageObj]

    setMessages(newMessages)
    setIsLoading(true)

    try {
      // Send message to API with the full, up-to-date conversation history
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          systemPrompt: agentConfig?.systemPrompt,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle rate limit error specifically
        if (response.status === 429) {
          const resetTime = data.rateLimitInfo?.resetTime
            ? new Date(data.rateLimitInfo.resetTime)
            : new Date(Date.now() + 3600000) // Default to 1 hour if no reset time

          const formattedTime = resetTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })

          throw new Error(
            agentConfig?.language === 'spanish'
              ? `Límite de mensajes alcanzado. Por favor, intenta de nuevo después de las ${formattedTime}.`
              : `Message limit reached. Please try again after ${formattedTime}.`
          )
        }
        throw new Error('Failed to get response')
      }

      // Add assistant message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.message,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error('Error sending message:', error)

      // Handle error message
      let errorMessage = ''

      if (error instanceof Error) {
        // Check for rate limit error specifically
        if (
          error.message.includes('Message limit reached') ||
          error.message.includes('Límite de mensajes alcanzado')
        ) {
          errorMessage = error.message
        } else {
          errorMessage =
            agentConfig?.language === 'spanish'
              ? 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.'
              : 'Sorry, there was an error processing your message. Please try again.'
        }
      } else {
        errorMessage =
          agentConfig?.language === 'spanish'
            ? 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.'
            : 'Sorry, there was an error processing your message. Please try again.'
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Clear all messages in the chat
   */
  const clearMessages = () => {
    setMessages([])
  }

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    setInitialMessages,
  }
}

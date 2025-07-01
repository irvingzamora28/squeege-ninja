'use client'

import { useState, useEffect, useRef } from 'react'
import { useChatbot, AgentConfig, Message } from '@/hooks/useChatbot'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [agentConfig, setAgentConfig] = useState<AgentConfig | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Use the custom chatbot hook
  const { messages, isLoading, sendMessage, setInitialMessages } = useChatbot(agentConfig)

  // Fetch agent configuration on mount
  useEffect(() => {
    const fetchAgentConfig = async () => {
      try {
        const response = await fetch('/api/allset/agent/config')
        if (response.ok) {
          const data = await response.json()
          setAgentConfig(data)

          // If enabled, add welcome message
          if (data.enabled) {
            const welcomeMessage =
              data.language === 'spanish'
                ? `¡Hola! Soy ${data.name}. ¿En qué puedo ayudarte hoy?`
                : `Hi there! I'm ${data.name}. How can I help you today?`

            setInitialMessages([
              {
                role: 'assistant',
                content: welcomeMessage,
                timestamp: new Date(),
              },
            ])
          }
        }
      } catch (error) {
        console.error('Error fetching agent config:', error)
      }
    }

    fetchAgentConfig()
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Only show chat widget if agent is enabled
  if (!agentConfig?.enabled) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) return

    // Use the sendMessage function from the hook
    await sendMessage(message)
    setMessage('')
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed right-4 bottom-20 h-[32rem] w-[90%] max-w-[24rem] rounded-lg bg-white shadow-xl sm:w-[28rem] sm:max-w-none md:w-[32rem] lg:w-[40rem] xl:w-[45rem] dark:bg-gray-800">
          {/* Chat header */}
          <div className="bg-primary-600 flex items-center justify-between rounded-t-lg p-4 text-white">
            <h3 className="text-lg font-medium">{agentConfig?.name || 'Chat Assistant'}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-700 rounded-full p-1 focus:ring-2 focus:ring-white focus:outline-none"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat messages */}
          <div className="h-[calc(32rem-8rem)] overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 rounded-2xl px-4 py-3 shadow-sm ${
                    msg.role === 'user'
                      ? 'border-primary-500 dark:border-primary-400 border-2 bg-white dark:bg-gray-800'
                      : 'border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'
                  }`}
                >
                  <p className="text-sm text-gray-800 dark:text-gray-100">{msg.content}</p>
                  <div className="mt-1.5 flex items-center justify-end">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-3/4 rounded-2xl border-2 border-gray-300 bg-white px-4 py-3 shadow-sm dark:border-gray-600 dark:bg-gray-800">
                  <div className="flex items-center justify-center space-x-1.5 py-1">
                    <div className="bg-primary-500 dark:bg-primary-400 h-2.5 w-2.5 animate-bounce rounded-full"></div>
                    <div
                      className="bg-primary-500 dark:bg-primary-400 h-2.5 w-2.5 animate-bounce rounded-full"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                      className="bg-primary-500 dark:bg-primary-400 h-2.5 w-2.5 animate-bounce rounded-full"
                      style={{ animationDelay: '0.4s' }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <form
            onSubmit={handleSubmit}
            className="flex border-t border-gray-200 p-4 dark:border-gray-700"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                agentConfig?.language === 'spanish' ? 'Escribe un mensaje...' : 'Type a message...'
              }
              className="focus:border-primary-500 focus:ring-primary-500 flex-1 rounded-l-lg border-gray-300 bg-gray-100 px-4 py-2 focus:ring-1 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-r-lg px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
              disabled={isLoading || !message.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

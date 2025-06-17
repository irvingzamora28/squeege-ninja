'use client'

import { useEffect, useState } from 'react'
import ChatWidget from './ChatWidget'

export default function ChatWidgetWrapper() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    // Fetch agent configuration to check if it's enabled
    const fetchAgentConfig = async () => {
      try {
        const response = await fetch('/api/allset/agent/config')
        if (response.ok) {
          const data = await response.json()
          setIsEnabled(data.enabled)
        }
      } catch (error) {
        console.error('Error fetching agent config:', error)
      }
    }

    fetchAgentConfig()
  }, [])

  // Only render the ChatWidget if it's enabled
  if (!isEnabled) return null

  return <ChatWidget />
}

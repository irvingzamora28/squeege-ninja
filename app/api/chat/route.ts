import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { llmService } from '@/lib/llm'
import { Chatbot } from '@/lib/llm/chatbot'
import { ChatMessage } from '@/lib/llm/types'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

type KnowledgeItem = {
  id: string
  title: string
  content: string
  dateAdded: string
}

// Path to the agent configuration file
const configFilePath = path.join(process.cwd(), 'data', 'agent-config.json')

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const clientIp = getClientIp(request)
    const rateLimitResult = rateLimit(clientIp, {
      limit: 2, // Allow 10 requests per window
      windowInSeconds: 60 * 60, // 1 hour window
    })

    // If rate limit exceeded, return 429 Too Many Requests
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          rateLimitInfo: {
            limit: rateLimitResult.limit,
            remaining: rateLimitResult.remaining,
            resetTime: new Date(rateLimitResult.resetTime).toISOString(),
          },
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': Math.floor(rateLimitResult.resetTime / 1000).toString(),
          },
        }
      )
    }

    // Get request body
    const { messages, systemPrompt } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required and must be a non-empty array' },
        { status: 400 }
      )
    }

    // Get the last message from the user
    const lastMessage = messages[messages.length - 1]
    if (lastMessage.role !== 'user') {
      return NextResponse.json({ error: 'The last message must be from the user' }, { status: 400 })
    }
    console.log('Last message:', lastMessage)

    // Read agent configuration
    let agentConfig = {
      name: 'AllSet Assistant',
      personality: 'friendly',
      language: 'english',
      systemPrompt:
        'You are a helpful assistant for our product. Answer customer questions accurately and politely.',
      enabled: true,
      knowledgeBase: [],
    }

    if (fs.existsSync(configFilePath)) {
      const configData = fs.readFileSync(configFilePath, 'utf8')
      agentConfig = JSON.parse(configData)
    }

    // If agent is disabled, return an error
    if (!agentConfig.enabled) {
      return NextResponse.json({ error: 'Chat agent is disabled' }, { status: 403 })
    }

    // Prepare knowledge context from the knowledge base
    let knowledgeContext = ''
    if (agentConfig.knowledgeBase && agentConfig.knowledgeBase.length > 0) {
      knowledgeContext =
        'Here is some information about our product that might help you answer the question:\n\n' +
        agentConfig.knowledgeBase
          .map((item: KnowledgeItem) => `## ${item.title}\n${item.content}`)
          .join('\n\n')
    }

    // Enhance the system prompt with personality, language, and knowledge
    let enhancedSystemPrompt = systemPrompt || agentConfig.systemPrompt || ''

    // Add personality instructions
    switch (agentConfig.personality) {
      case 'friendly':
        enhancedSystemPrompt += '\nBe warm, approachable, and conversational in your responses.'
        break
      case 'professional':
        enhancedSystemPrompt += '\nBe formal, precise, and professional in your responses.'
        break
      case 'casual':
        enhancedSystemPrompt += '\nBe casual, relaxed, and use simple language in your responses.'
        break
      case 'enthusiastic':
        enhancedSystemPrompt += '\nBe energetic, positive, and show excitement in your responses.'
        break
      case 'technical':
        enhancedSystemPrompt += '\nBe detailed, technical, and precise in your responses.'
        break
    }

    // Add language instructions
    if (agentConfig.language === 'spanish') {
      enhancedSystemPrompt += '\nRespond in Spanish. / Responde en español.'
    } else {
      enhancedSystemPrompt += '\nRespond in English.'
    }

    // Add knowledge context if available
    if (knowledgeContext) {
      enhancedSystemPrompt += `\n\n${knowledgeContext}`
    }

    // Create chatbot instance with the enhanced system prompt
    const chatbot = new Chatbot(llmService.provider, enhancedSystemPrompt)

    // Add previous messages to conversation history (except the last one)
    for (let i = 0; i < messages.length - 1; i++) {
      const msg = messages[i]
      chatbot.getHistory().push({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })
    }

    // Send the last user message and get response
    const response = await chatbot.sendMessage(lastMessage.content)
    console.log('Response HERE:', response)

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Error processing chat message:', error)
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 })
  }
}

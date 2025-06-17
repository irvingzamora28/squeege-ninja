# Chatbot Module

This module contains the `Chatbot` class, which provides an interface for interacting with an LLM-powered conversational agent.

## Features

- Manages conversation history.
- Connects to a configured LLM provider (`OpenAIProvider`, `GoogleGenAIProvider`, etc.).
- Allows setting an initial system prompt to guide the chatbot's behavior.

## Usage

```typescript
import { Chatbot } from './chatbot' // Adjusted import path
import { llmService } from './index'

async function main() {
  const provider = llmService.provider

  const chatbot = new Chatbot(
    provider,
    "You are a helpful sales assistant for a SaaS company called 'Innovatech'. Your goal is to answer product questions and encourage users to sign up for a demo."
  )

  let response = await chatbot.sendMessage('Hello, what can you tell me about Innovatech?')
  console.log('Bot:', response)

  response = await chatbot.sendMessage('What are its main features?')
  console.log('Bot:', response)

  // console.log(chatbot.getHistory());
  // chatbot.clearHistory();
}

main().catch(console.error)
```

## `Chatbot` Class

### Constructor

`new Chatbot(provider: LLMProvider, systemPrompt?: string)`

- `provider`: An instance of a class that implements the `LLMProvider` interface.
- `systemPrompt` (optional): An initial instruction for the LLM.

### Methods

- `async sendMessage(userMessage: string): Promise<string>`
- `clearHistory(): void`
- `getHistory(): ChatMessage[]`

(Refer to the class implementation in `chatbot.ts` for full details)

import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Path to the agent configuration file
const configFilePath = path.join(process.cwd(), 'data', 'agent-config.json')

// Ensure the data directory exists
const ensureDirectoryExists = () => {
  const dir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Knowledge item type
type KnowledgeItem = {
  id: string
  title: string
  content: string
  dateAdded: string
}

// Default configuration
const defaultConfig = {
  name: 'AllSet Assistant',
  personality: 'friendly',
  language: 'english',
  systemPrompt:
    'You are a helpful assistant for our product. Answer customer questions accurately and politely.',
  enabled: false,
  knowledgeBase: [] as KnowledgeItem[],
}

export async function GET() {
  try {
    ensureDirectoryExists()

    // Check if config file exists
    if (!fs.existsSync(configFilePath)) {
      // Create default config file if it doesn't exist
      fs.writeFileSync(configFilePath, JSON.stringify(defaultConfig, null, 2))
      return NextResponse.json(defaultConfig)
    }

    // Read and return existing config
    const configData = fs.readFileSync(configFilePath, 'utf8')
    return NextResponse.json(JSON.parse(configData))
  } catch (error) {
    console.error('Error fetching agent configuration:', error)
    return NextResponse.json({ error: 'Failed to fetch agent configuration' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    ensureDirectoryExists()

    // Get request body
    const data = await request.json()

    // Validate required fields
    if (
      data.name === undefined ||
      data.personality === undefined ||
      data.language === undefined ||
      data.systemPrompt === undefined ||
      data.enabled === undefined
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Read existing config if it exists
    let existingConfig = defaultConfig
    if (fs.existsSync(configFilePath)) {
      const configData = fs.readFileSync(configFilePath, 'utf8')
      existingConfig = JSON.parse(configData)
    }

    // Merge new config with existing
    const newConfig = {
      ...existingConfig,
      name: data.name,
      personality: data.personality,
      language: data.language,
      systemPrompt: data.systemPrompt,
      enabled: data.enabled,
      // Only update knowledgeBase if provided
      ...(data.knowledgeBase && { knowledgeBase: data.knowledgeBase }),
    }

    // Write updated config to file
    fs.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2))

    // Return success response
    return NextResponse.json(newConfig)
  } catch (error) {
    console.error('Error saving agent configuration:', error)
    return NextResponse.json({ error: 'Failed to save agent configuration' }, { status: 500 })
  }
}

// API route to add a knowledge item
export async function PUT(request: NextRequest) {
  try {
    ensureDirectoryExists()

    // Get request body
    const { title, content } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    // Read existing config
    let config = defaultConfig
    if (fs.existsSync(configFilePath)) {
      const configData = fs.readFileSync(configFilePath, 'utf8')
      config = JSON.parse(configData)
    }

    // Add new knowledge item
    const knowledgeBase = config.knowledgeBase || ([] as KnowledgeItem[])
    knowledgeBase.push({
      id: Date.now().toString(),
      title,
      content,
      dateAdded: new Date().toISOString(),
    })

    // Update config
    const updatedConfig = {
      ...config,
      knowledgeBase,
    }

    // Write updated config to file
    fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2))

    return NextResponse.json(updatedConfig)
  } catch (error) {
    console.error('Error adding knowledge item:', error)
    return NextResponse.json({ error: 'Failed to add knowledge item' }, { status: 500 })
  }
}

// API route to delete a knowledge item
export async function DELETE(request: NextRequest) {
  try {
    ensureDirectoryExists()

    // Get knowledge item ID from URL
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Knowledge item ID is required' }, { status: 400 })
    }

    // Read existing config
    if (!fs.existsSync(configFilePath)) {
      return NextResponse.json({ error: 'Configuration not found' }, { status: 404 })
    }

    const configData = fs.readFileSync(configFilePath, 'utf8')
    const config = JSON.parse(configData)

    // Remove knowledge item
    const knowledgeBase = (config.knowledgeBase || []).filter(
      (item: KnowledgeItem) => item.id !== id
    )

    // Update config
    const updatedConfig = {
      ...config,
      knowledgeBase,
    }

    // Write updated config to file
    fs.writeFileSync(configFilePath, JSON.stringify(updatedConfig, null, 2))

    return NextResponse.json(updatedConfig)
  } catch (error) {
    console.error('Error deleting knowledge item:', error)
    return NextResponse.json({ error: 'Failed to delete knowledge item' }, { status: 500 })
  }
}

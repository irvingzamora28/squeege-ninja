import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

// Path to the theme settings file
const themeFilePath = path.join(process.cwd(), 'data', 'theme.json')

// Default theme settings
const defaultTheme = {
  primaryColor: '#3b82f6', // Default blue color
}

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch (error) {
    // Directory doesn't exist, create it
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Load theme settings from file
async function loadThemeSettings() {
  try {
    await ensureDataDirectory()
    const fileData = await fs.readFile(themeFilePath, 'utf-8')
    return JSON.parse(fileData)
  } catch (error) {
    // If file doesn't exist or can't be parsed, return default theme
    return defaultTheme
  }
}

// Define theme type
interface ThemeSettings {
  primaryColor: string
  [key: string]: unknown // Using unknown instead of any for better type safety
}

// Helper function to adjust color brightness
function adjustColor(hex: string, factor: number): string {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)

  // Adjust brightness
  r = Math.round(r + (255 - r) * factor)
  g = Math.round(g + (255 - g) * factor)
  b = Math.round(b + (255 - b) * factor)

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Save theme settings to file
async function saveThemeSettings(theme: ThemeSettings) {
  console.log('Saving theme settings to file:', theme)
  await ensureDataDirectory()
  try {
    // Save to theme.json
    await fs.writeFile(themeFilePath, JSON.stringify(theme, null, 2), 'utf-8')

    // Generate CSS content with more specific selectors and !important
    const cssContent = `/* Override the primary color variables with our theme color */
:root {
  --color-primary-50: ${adjustColor(theme.primaryColor, 0.95)} !important;
  --color-primary-100: ${adjustColor(theme.primaryColor, 0.9)} !important;
  --color-primary-200: ${adjustColor(theme.primaryColor, 0.8)} !important;
  --color-primary-300: ${adjustColor(theme.primaryColor, 0.7)} !important;
  --color-primary-400: ${adjustColor(theme.primaryColor, 0.6)} !important;
  --color-primary-500: ${theme.primaryColor} !important;
  --color-primary-600: ${adjustColor(theme.primaryColor, 0.4)} !important;
  --color-primary-700: ${adjustColor(theme.primaryColor, 0.3)} !important;
  --color-primary-800: ${adjustColor(theme.primaryColor, 0.2)} !important;
  --color-primary-900: ${adjustColor(theme.primaryColor, 0.1)} !important;
  --color-primary-950: ${adjustColor(theme.primaryColor, 0.05)} !important;
}

/* Direct overrides for utility classes */
.bg-primary-50, .bg-primary-50 * { background-color: ${adjustColor(theme.primaryColor, 0.95)} !important; }
.bg-primary-100, .bg-primary-100 * { background-color: ${adjustColor(theme.primaryColor, 0.9)} !important; }
.bg-primary-200, .bg-primary-200 * { background-color: ${adjustColor(theme.primaryColor, 0.8)} !important; }
.bg-primary-300, .bg-primary-300 * { background-color: ${adjustColor(theme.primaryColor, 0.7)} !important; }
.bg-primary-400, .bg-primary-400 * { background-color: ${adjustColor(theme.primaryColor, 0.6)} !important; }
.bg-primary-500, .bg-primary-500 * { background-color: ${theme.primaryColor} !important; }
.bg-primary-600, .bg-primary-600 * { background-color: ${adjustColor(theme.primaryColor, 0.4)} !important; }
.bg-primary-700, .bg-primary-700 * { background-color: ${adjustColor(theme.primaryColor, 0.3)} !important; }
.bg-primary-800, .bg-primary-800 * { background-color: ${adjustColor(theme.primaryColor, 0.2)} !important; }
.bg-primary-900, .bg-primary-900 * { background-color: ${adjustColor(theme.primaryColor, 0.1)} !important; }
.bg-primary-950, .bg-primary-950 * { background-color: ${adjustColor(theme.primaryColor, 0.05)} !important; }

.text-primary-50, .text-primary-50 * { color: ${adjustColor(theme.primaryColor, 0.95)} !important; }
.text-primary-100, .text-primary-100 * { color: ${adjustColor(theme.primaryColor, 0.9)} !important; }
.text-primary-200, .text-primary-200 * { color: ${adjustColor(theme.primaryColor, 0.8)} !important; }
.text-primary-300, .text-primary-300 * { color: ${adjustColor(theme.primaryColor, 0.7)} !important; }
.text-primary-400, .text-primary-400 * { color: ${adjustColor(theme.primaryColor, 0.6)} !important; }
.text-primary-500, .text-primary-500 * { color: ${theme.primaryColor} !important; }
.text-primary-600, .text-primary-600 * { color: ${adjustColor(theme.primaryColor, 0.4)} !important; }
.text-primary-700, .text-primary-700 * { color: ${adjustColor(theme.primaryColor, 0.3)} !important; }
.text-primary-800, .text-primary-800 * { color: ${adjustColor(theme.primaryColor, 0.2)} !important; }
.text-primary-900, .text-primary-900 * { color: ${adjustColor(theme.primaryColor, 0.1)} !important; }
.text-primary-950, .text-primary-950 * { color: ${adjustColor(theme.primaryColor, 0.05)} !important; }

.border-primary-50, .border-primary-50 * { border-color: ${adjustColor(theme.primaryColor, 0.95)} !important; }
.border-primary-100, .border-primary-100 * { border-color: ${adjustColor(theme.primaryColor, 0.9)} !important; }
.border-primary-200, .border-primary-200 * { border-color: ${adjustColor(theme.primaryColor, 0.8)} !important; }
.border-primary-300, .border-primary-300 * { border-color: ${adjustColor(theme.primaryColor, 0.7)} !important; }
.border-primary-400, .border-primary-400 * { border-color: ${adjustColor(theme.primaryColor, 0.6)} !important; }
.border-primary-500, .border-primary-500 * { border-color: ${theme.primaryColor} !important; }
.border-primary-600, .border-primary-600 * { border-color: ${adjustColor(theme.primaryColor, 0.4)} !important; }
.border-primary-700, .border-primary-700 * { border-color: ${adjustColor(theme.primaryColor, 0.3)} !important; }
.border-primary-800, .border-primary-800 * { border-color: ${adjustColor(theme.primaryColor, 0.2)} !important; }
.border-primary-900, .border-primary-900 * { border-color: ${adjustColor(theme.primaryColor, 0.1)} !important; }
.border-primary-950, .border-primary-950 * { border-color: ${adjustColor(theme.primaryColor, 0.05)} !important; }

/* Hover variants */
.hover${String.fromCharCode(92)}:bg-primary-500:hover, .hover${String.fromCharCode(92)}:bg-primary-500:hover * { background-color: ${theme.primaryColor} !important; }
.hover${String.fromCharCode(92)}:text-primary-500:hover, .hover${String.fromCharCode(92)}:text-primary-500:hover * { color: ${theme.primaryColor} !important; }
.hover${String.fromCharCode(92)}:border-primary-500:hover, .hover${String.fromCharCode(92)}:border-primary-500:hover * { border-color: ${theme.primaryColor} !important; }
`

    // Save to CSS file
    await fs.writeFile(path.join(process.cwd(), 'css', 'theme-override.css'), cssContent, 'utf-8')

    console.log('Theme settings saved successfully')
  } catch (error) {
    console.error('Error writing theme file:', error)
    throw error
  }
}

export async function GET() {
  console.log('GET /api/theme - Loading theme settings')
  const theme = await loadThemeSettings()
  console.log('GET /api/theme - Returning theme:', theme)
  return NextResponse.json(theme)
}

export async function POST(request: NextRequest) {
  console.log('POST /api/theme - Saving theme settings')
  try {
    const themeData = await request.json()
    console.log('POST /api/theme - Received data:', themeData)

    // Validate the theme data
    if (!themeData.primaryColor || typeof themeData.primaryColor !== 'string') {
      console.log('POST /api/theme - Invalid theme data')
      return NextResponse.json({ success: false, message: 'Invalid theme data' }, { status: 400 })
    }

    // Save the theme data to a file
    await saveThemeSettings(themeData)

    console.log('POST /api/theme - Theme saved successfully')
    return NextResponse.json({ success: true, theme: themeData })
  } catch (error) {
    console.error('Theme update error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred while updating theme' },
      { status: 500 }
    )
  }
}

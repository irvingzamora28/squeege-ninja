'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
  primaryColor: string
  setPrimaryColor: (color: string) => void
  saveTheme: () => Promise<void>
  isSaving: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState('#3b82f6') // Default blue
  const [isSaving, setIsSaving] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load theme settings on mount
  useEffect(() => {
    async function loadTheme() {
      try {
        const response = await fetch('/api/theme')
        if (response.ok) {
          const data = await response.json()
          setPrimaryColor(data.primaryColor)
        }
      } catch (error) {
        console.error('Error loading theme:', error)
      } finally {
        setIsLoaded(true)
      }
    }

    loadTheme()
  }, [])

  // Apply theme changes via CSS variables
  useEffect(() => {
    if (!isLoaded) return

    // Update CSS variables
    document.documentElement.style.setProperty('--color-primary-50', adjustColor(primaryColor, 0.95))
    document.documentElement.style.setProperty('--color-primary-100', adjustColor(primaryColor, 0.9))
    document.documentElement.style.setProperty('--color-primary-200', adjustColor(primaryColor, 0.8))
    document.documentElement.style.setProperty('--color-primary-300', adjustColor(primaryColor, 0.7))
    document.documentElement.style.setProperty('--color-primary-400', adjustColor(primaryColor, 0.6))
    document.documentElement.style.setProperty('--color-primary-500', primaryColor)
    document.documentElement.style.setProperty('--color-primary-600', adjustColor(primaryColor, 0.4))
    document.documentElement.style.setProperty('--color-primary-700', adjustColor(primaryColor, 0.3))
    document.documentElement.style.setProperty('--color-primary-800', adjustColor(primaryColor, 0.2))
    document.documentElement.style.setProperty('--color-primary-900', adjustColor(primaryColor, 0.1))
    document.documentElement.style.setProperty('--color-primary-950', adjustColor(primaryColor, 0.05))
  }, [primaryColor, isLoaded])

  // Function to save theme settings
  const saveTheme = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ primaryColor }),
      })

      if (!response.ok) {
        throw new Error('Failed to save theme')
      }
    } catch (error) {
      console.error('Error saving theme:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <ThemeContext.Provider value={{ primaryColor, setPrimaryColor, saveTheme, isSaving }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
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

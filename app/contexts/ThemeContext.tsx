'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
  primaryColor: string
  setPrimaryColor: (color: string) => void
  saveTheme: () => Promise<void>
  isSaving: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  initialColor = '#3b82f6',
}: {
  children: ReactNode
  initialColor?: string
}) {
  // State for the current primary color
  const [primaryColor, setPrimaryColor] = useState(initialColor)
  const [isSaving, setIsSaving] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedColor = localStorage.getItem('site-theme-color')
      if (storedColor && storedColor !== primaryColor) {
        setPrimaryColor(storedColor)
      }
    }
  }, [primaryColor]) // Include primaryColor to avoid lint warnings

  // Function to save theme settings
  const saveTheme = async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Saving theme with color:', primaryColor)
    }
    setIsSaving(true)
    try {
      // Save to localStorage for immediate access on page load
      localStorage.setItem('site-theme-color', primaryColor)

      // Update CSS variables immediately
      document.documentElement.style.setProperty('--color-primary-500', primaryColor)

      // Also save to server for persistence across devices
      const response = await fetch('/api/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ primaryColor }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error('Failed to save theme')
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('Theme saved successfully')
      }

      // Force a page reload to apply the new theme from the CSS file
      // This is necessary because we're updating a CSS file on the server
      window.location.reload()
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

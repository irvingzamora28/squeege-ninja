'use client'

import { useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

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

export default function ThemeManager() {
  const { primaryColor } = useTheme()

  // We don't need to apply theme colors anymore since we're using static CSS
  // and reloading the page when the theme changes

  // Just log the current theme color for debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Current theme color:', primaryColor)
    }
  }, [primaryColor])

  // This component doesn't need to do anything anymore
  // It's just here for backward compatibility

  // This component doesn't render anything visible
  return null
}

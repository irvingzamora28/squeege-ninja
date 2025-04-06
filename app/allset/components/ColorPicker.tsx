'use client'

import { useState, useEffect, useRef } from 'react'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label?: string
}

export default function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  
  // Predefined color options
  const colorOptions = [
    '#3b82f6', // Blue (default)
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Amber
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#14b8a6', // Teal
    '#f97316', // Orange
    '#6366f1', // Indigo
  ]
  
  // Close the picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div className="relative" ref={pickerRef}>
        <div 
          className="flex cursor-pointer items-center rounded-md border border-gray-300 p-2 dark:border-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div 
            className="mr-2 h-6 w-6 rounded-md border border-gray-300 dark:border-gray-600" 
            style={{ backgroundColor: color }}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{color}</span>
        </div>
        
        {isOpen && (
          <div className="absolute left-0 top-full z-10 mt-1 w-full rounded-md border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((colorOption) => (
                <div
                  key={colorOption}
                  className={`h-8 w-8 cursor-pointer rounded-md border ${
                    colorOption === color ? 'border-gray-800 dark:border-white' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => {
                    onChange(colorOption)
                    setIsOpen(false)
                  }}
                />
              ))}
            </div>
            
            <div className="mt-2">
              <label className="mb-1 block text-xs text-gray-700 dark:text-gray-300">
                Custom Color
              </label>
              <input
                type="text"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="#RRGGBB"
              />
              <input
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 h-8 w-full cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

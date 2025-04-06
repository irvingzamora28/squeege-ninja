'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('/api/allset/logout', {
        method: 'POST',
      })
      router.push('/allset/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">AllSet Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold">Welcome to the Admin Panel</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is a placeholder for the admin dashboard. You can add your admin functionality here.
        </p>
      </div>
    </div>
  )
}

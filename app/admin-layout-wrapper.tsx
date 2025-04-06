'use client'

import { usePathname } from 'next/navigation'
import { Space_Grotesk } from 'next/font/google'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export default function AdminLayoutWrapper({ children, regularContent }: {
  children: React.ReactNode,
  regularContent: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/allset')

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Admin-specific header could go here */}
        <div className="py-8">
          <main>{children}</main>
        </div>
        {/* Admin-specific footer could go here */}
      </div>
    )
  }

  // For non-admin routes, render the regular content
  return <>{regularContent}</>
}

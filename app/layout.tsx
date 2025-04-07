import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import 'css/theme-override.css'

import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { DarkThemeProvider } from './theme-providers'
import { ThemeProvider } from './contexts/ThemeContext'
import AdminLayoutWrapper from './admin-layout-wrapper'
import { getThemeSettings } from './lib/get-theme'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  // Load theme settings during server rendering
  const themeSettings = await getThemeSettings()
  const initialColor = themeSettings.primaryColor

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
      data-theme-color={initialColor}
    >
      <link rel="apple76" sizes="76x76" href={`${basePath}/static/favicons/apple76.png`} />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link rel="mask-icon" href={`${basePath}/static/favicons/safari.svg`} color="#0F172A" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-slate-900 dark:text-white">
        <DarkThemeProvider>
          <ThemeProvider initialColor={initialColor}>
            <AdminLayoutWrapper
              regularContent={
                <>
                  <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
                  <SectionContainer>
                    <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                      <Header />
                      <main className="mb-auto">{children}</main>
                    </SearchProvider>
                    <Footer />
                  </SectionContainer>
                </>
              }
            >
              {children}
            </AdminLayoutWrapper>
          </ThemeProvider>
        </DarkThemeProvider>
      </body>
    </html>
  )
}

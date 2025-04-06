import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Default theme settings
const defaultTheme = {
  primaryColor: '#3b82f6', // Default blue color
}

export async function GET() {
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('site_theme')
  
  let theme = defaultTheme
  
  if (themeCookie) {
    try {
      theme = JSON.parse(themeCookie.value)
    } catch (error) {
      console.error('Error parsing theme cookie:', error)
    }
  }
  
  return NextResponse.json(theme)
}

export async function POST(request: NextRequest) {
  try {
    const themeData = await request.json()
    
    // Validate the theme data
    if (!themeData.primaryColor || typeof themeData.primaryColor !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid theme data' },
        { status: 400 }
      )
    }
    
    // Save the theme data in a cookie
    const cookieStore = await cookies()
    cookieStore.set('site_theme', JSON.stringify(themeData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'strict',
    })
    
    return NextResponse.json({ success: true, theme: themeData })
  } catch (error) {
    console.error('Theme update error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred while updating theme' },
      { status: 500 }
    )
  }
}

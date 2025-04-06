import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  // Clear the authentication cookie
  const cookieStore = cookies()
  cookieStore.delete('allset_auth')

  return NextResponse.json({ success: true })
}

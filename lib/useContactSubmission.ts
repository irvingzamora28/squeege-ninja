import { useState } from 'react'

export type ContactStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export function useContactSubmission() {
  const [status, setStatus] = useState<ContactStatus>('idle')
  const [message, setMessage] = useState<string>('')

  async function submitContact(formData: ContactFormData) {
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/allset/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('Thank you for reaching out!')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Try again later.')
    }
  }

  return { submitContact, status, message, setMessage }
}

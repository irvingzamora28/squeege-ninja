import { useCallback } from 'react'

export interface ShareOptions {
  title: string
  text?: string
  url: string
}

export function useShare() {
  const share = useCallback(({ title, text, url }: ShareOptions) => {
    if (typeof window === 'undefined') return
    if (navigator.share) {
      navigator.share({ title, text, url })
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      alert('Video link copied to clipboard!')
    } else {
      window.prompt('Copy this video link:', url)
    }
  }, [])

  return { share }
}

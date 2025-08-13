"use client"

import { useAccessibility } from '@/hooks/use-accessibility'

export function SkipToContent() {
  const { isKeyboardUser, skipToContent } = useAccessibility()

  if (!isKeyboardUser) return null

  return (
    <button
      onClick={skipToContent()}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
      aria-label="Skip to main content"
    >
      Skip to main content
    </button>
  )
}

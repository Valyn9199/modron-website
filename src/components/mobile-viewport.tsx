"use client"

import { useEffect } from 'react'

interface MobileViewportProps {
  children: React.ReactNode
  preventZoom?: boolean
  enableTouchActions?: boolean
}

export function MobileViewport({ 
  children, 
  preventZoom = true,
  enableTouchActions = true
}: MobileViewportProps) {
  useEffect(() => {
    // Prevent zoom on input focus (iOS)
    if (preventZoom) {
      const preventZoomOnInput = (e: Event) => {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
          target.style.fontSize = '16px'
        }
      }

      document.addEventListener('focusin', preventZoomOnInput)
      return () => document.removeEventListener('focusin', preventZoomOnInput)
    }
  }, [preventZoom])

  useEffect(() => {
    // Enable touch actions for better mobile performance
    if (enableTouchActions) {
      document.body.style.touchAction = 'manipulation'
      return () => {
        document.body.style.touchAction = ''
      }
    }
  }, [enableTouchActions])

  return <>{children}</>
}

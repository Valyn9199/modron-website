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
  // Detect Android device
  const isAndroid = typeof window !== 'undefined' && /Android/i.test(navigator.userAgent)
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
      // Android-specific fixes
      document.body.style.touchAction = 'pan-y'
      document.body.style.webkitOverflowScrolling = 'touch'
      document.body.style.overscrollBehavior = 'none'
      
      // Additional Android fixes
      if (isAndroid) {
        document.documentElement.style.webkitOverflowScrolling = 'touch'
        document.documentElement.style.overscrollBehavior = 'none'
        
        // Force enable scrolling on Android
        const enableScrolling = () => {
          document.body.style.position = 'relative'
          document.body.style.height = 'auto'
          document.body.style.overflow = 'auto'
        }
        
        // Apply fixes after a short delay to ensure DOM is ready
        setTimeout(enableScrolling, 100)
      }
      
      // Fix for Android Chrome scroll blocking
      const preventScrollBlocking = (e: TouchEvent) => {
        e.stopPropagation()
      }
      
      document.addEventListener('touchmove', preventScrollBlocking, { passive: true })
      
      return () => {
        document.body.style.touchAction = ''
        document.body.style.webkitOverflowScrolling = ''
        document.body.style.overscrollBehavior = ''
        document.documentElement.style.webkitOverflowScrolling = ''
        document.documentElement.style.overscrollBehavior = ''
        document.removeEventListener('touchmove', preventScrollBlocking)
      }
    }
  }, [enableTouchActions, isAndroid])

  return <>{children}</>
}

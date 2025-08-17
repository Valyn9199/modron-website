"use client"

import { useEffect, useState } from "react"

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
  const [isMounted, setIsMounted] = useState(false)
  
  // Proper hydration handling
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Detect Android device only after mounting (for future use if needed)
  // const isAndroid = isMounted && /Android/i.test(navigator.userAgent)
  
  useEffect(() => {
    if (!isMounted) return

    // Prevent zoom on input focus (iOS)
    if (preventZoom) {
      const preventZoomOnInput = (e: Event) => {
        const target = e.target as HTMLElement
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") {
          target.style.fontSize = "16px"
        }
      }

      document.addEventListener("focusin", preventZoomOnInput)
      return () => document.removeEventListener("focusin", preventZoomOnInput)
    }
  }, [preventZoom, isMounted])

  useEffect(() => {
    if (!isMounted || !enableTouchActions) return

    // Simplified mobile scrolling fixes - less aggressive
    const enableScrolling = () => {
      // Only set essential styles
      document.body.style.setProperty("-webkit-overflow-scrolling", "touch")
      document.documentElement.style.setProperty("-webkit-overflow-scrolling", "touch")
    }
    
    // Apply fixes after DOM is ready
    const timer = setTimeout(enableScrolling, 100)
    
    return () => {
      clearTimeout(timer)
      // Cleanup
      document.body.style.removeProperty("-webkit-overflow-scrolling")
      document.documentElement.style.removeProperty("-webkit-overflow-scrolling")
    }
  }, [enableTouchActions, isMounted])

  return <>{children}</>
}

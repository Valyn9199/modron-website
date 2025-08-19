"use client"

import { useEffect, useState } from "react"

interface MobileViewportBackupProps {
  children: React.ReactNode
  preventZoom?: boolean
  enableTouchActions?: boolean
}

export function MobileViewportBackup({ 
  children, 
  preventZoom = true,
  enableTouchActions = true
}: MobileViewportBackupProps) {
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

    // Enhanced mobile scrolling fixes
    const enableScrolling = () => {
      // Set essential styles for smooth scrolling
      document.body.style.setProperty("-webkit-overflow-scrolling", "touch")
      document.documentElement.style.setProperty("-webkit-overflow-scrolling", "touch")
      
      // Ensure proper touch actions
      document.body.style.setProperty("touch-action", "pan-y")
      document.documentElement.style.setProperty("touch-action", "pan-y")
      
      // BACKUP: Disable pull-to-refresh (original behavior)
      document.body.style.setProperty("overscroll-behavior", "none")
      document.documentElement.style.setProperty("overscroll-behavior", "none")
      
      // Ensure proper height on mobile
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    
    // Apply fixes after DOM is ready
    const timer = setTimeout(enableScrolling, 100)
    
    // Handle resize events for mobile orientation changes
    const handleResize = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      // Cleanup
      document.body.style.removeProperty("-webkit-overflow-scrolling")
      document.documentElement.style.removeProperty("-webkit-overflow-scrolling")
      document.body.style.removeProperty("touch-action")
      document.documentElement.style.removeProperty("touch-action")
      document.body.style.removeProperty("overscroll-behavior")
      document.documentElement.style.removeProperty("overscroll-behavior")
    }
  }, [enableTouchActions, isMounted])

  return <>{children}</>
}

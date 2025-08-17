"use client"

import { useEffect, useState, useCallback } from 'react'

export function OptimizedScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  const updateScrollProgress = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (scrollTop / docHeight) * 100
    setScrollProgress(Math.min(progress, 100))
  }, [])

  useEffect(() => {
    const throttledUpdate = throttle(updateScrollProgress, 16) // ~60fps
    window.addEventListener('scroll', throttledUpdate, { passive: true })
    return () => window.removeEventListener('scroll', throttledUpdate)
  }, [updateScrollProgress])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div 
        className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  )
}

// Throttle function for performance
function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0

  return (...args: Parameters<T>) => {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

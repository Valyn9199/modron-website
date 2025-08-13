"use client"

import { useState, useEffect } from 'react'

interface ProgressIndicatorProps {
  type?: 'scroll' | 'loading'
  className?: string
  color?: string
  height?: number
}

export function ProgressIndicator({ 
  type = 'scroll', 
  className = "", 
  color = "from-green-500 to-emerald-500",
  height = 2
}: ProgressIndicatorProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (type === 'scroll') {
      const updateProgress = () => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = (scrollTop / docHeight) * 100
        setProgress(scrollPercent)
      }

      window.addEventListener('scroll', updateProgress)
      updateProgress() // Initial call

      return () => window.removeEventListener('scroll', updateProgress)
    } else if (type === 'loading') {
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 10
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [type])

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${className}`}>
      <div 
        className={`h-${height} bg-gradient-to-r ${color} transition-all duration-300 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

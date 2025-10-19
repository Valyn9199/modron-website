"use client"

import React, { useState, useEffect, useRef } from 'react'

interface VideoTriggeredRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export function VideoTriggeredReveal({ 
  children, 
  delay = 3000, 
  className = "", 
  style = {} 
}: VideoTriggeredRevealProps) {
  const [shouldShow, setShouldShow] = useState(false)
  const hasTriggeredRef = useRef(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleVideoStart = () => {
      console.log('Video event received, hasTriggered:', hasTriggeredRef.current)
      if (!hasTriggeredRef.current) {
        console.log('First video event - starting 3 second delay')
        hasTriggeredRef.current = true
        
        // Clear any existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
        
        // Start the delay immediately when video starts
        timerRef.current = setTimeout(() => {
          console.log('3 second delay completed - showing cards')
          setShouldShow(true)
        }, delay)
      } else {
        console.log('Video event ignored - already triggered')
      }
    }

    // Listen for custom video start event
    window.addEventListener('videoStarted', handleVideoStart)
    
    // Fallback: if no video starts within 10 seconds, show cards anyway
    const fallbackTimer = setTimeout(() => {
      if (!hasTriggeredRef.current) {
        console.log('Fallback: No video started within 10 seconds, showing cards anyway')
        hasTriggeredRef.current = true
        setShouldShow(true)
      }
    }, 10000)
    
    return () => {
      window.removeEventListener('videoStarted', handleVideoStart)
      clearTimeout(fallbackTimer)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [delay])

  return (
    <div 
      className={`transition-opacity duration-500 ${shouldShow ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
  delay?: number
}

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  decimals = 0,
  className = '',
  delay = 0
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false })
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isInView && !isAnimating) {
      setIsAnimating(true)
      
      const startDelay = setTimeout(() => {
        let start = 0
        const increment = end / (duration / 16)
        
        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(timer)
            setIsAnimating(false)
          } else {
            setCount(start)
          }
        }, 16)

        return () => {
          clearInterval(timer)
        }
      }, delay)

      return () => clearTimeout(startDelay)
    } else if (!isInView) {
      // Reset animation state when out of view so it can animate again
      setIsAnimating(false)
    }
  }, [isInView, end, duration, isAnimating, delay])

  // Fallback: If component is mounted and not animating, start animation after a short delay
  useEffect(() => {
    if (!isAnimating && count === 0) {
      const fallbackTimer = setTimeout(() => {
        if (!isAnimating) {
          setIsAnimating(true)
          
          const startDelay = setTimeout(() => {
            let start = 0
            const increment = end / (duration / 16)
            
            const timer = setInterval(() => {
              start += increment
              if (start >= end) {
                setCount(end)
                clearInterval(timer)
                setIsAnimating(false)
              } else {
                setCount(start)
              }
            }, 16)

            return () => {
              clearInterval(timer)
            }
          }, delay)

          return () => clearTimeout(startDelay)
        }
      }, 100)

      return () => clearTimeout(fallbackTimer)
    }
  }, [isAnimating, count, end, duration, delay])

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count)

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}


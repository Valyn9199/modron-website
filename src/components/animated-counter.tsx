"use client"

import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
  delay?: number
  reanimateOnView?: boolean // New prop to control re-animation behavior
}

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  decimals = 0,
  className = '',
  delay = 0,
  reanimateOnView = false // Default to false for desktop
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: !reanimateOnView })

  // For desktop: Simple one-time animation
  useEffect(() => {
    if (!reanimateOnView) {
      const timer = setTimeout(() => {
        let start = 0
        const increment = end / (duration / 16)
        
        const animationTimer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(animationTimer)
          } else {
            setCount(start)
          }
        }, 16)

        return () => {
          clearInterval(animationTimer)
        }
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [end, duration, delay, reanimateOnView])

  // For mobile carousel: Re-animate when coming into view
  useEffect(() => {
    if (reanimateOnView && isInView) {
      // Reset count and start animation
      setCount(0)
      
      const timer = setTimeout(() => {
        let start = 0
        const increment = end / (duration / 16)
        
        const animationTimer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(animationTimer)
          } else {
            setCount(start)
          }
        }, 16)

        return () => {
          clearInterval(animationTimer)
        }
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, end, duration, delay, reanimateOnView])

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count)

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}


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
  const isInView = useInView(ref, { once: true })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const startDelay = setTimeout(() => {
        let start = 0
        const increment = end / (duration / 16)
        
        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(timer)
            setHasAnimated(true)
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
  }, [isInView, end, duration, hasAnimated, delay])

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count)

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}


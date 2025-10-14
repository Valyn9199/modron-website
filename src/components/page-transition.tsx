"use client"

import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref } = useScrollAnimation({ threshold: 0.1 })

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
        <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-1000 ease-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  )
}

interface StaggeredRevealProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggeredReveal({ 
  children, 
  className = "", 
  staggerDelay = 100 
}: StaggeredRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const [revealedItems, setRevealedItems] = useState<number[]>([])

  useEffect(() => {
    if (isVisible) {
      const childrenArray = Array.isArray(children) ? children : [children]
      childrenArray.forEach((_, index) => {
        setTimeout(() => {
          setRevealedItems(prev => [...prev, index])
        }, index * staggerDelay)
      })
    }
  }, [isVisible, children, staggerDelay])

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {Array.isArray(children) ? children.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-700 ease-out ${
            revealedItems.includes(index) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {child}
        </div>
      )) : children}
    </div>
  )
}

interface LoadingSpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({ className = "", size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-[#d5aaf9] border-t-transparent`} />
    </div>
  )
}

interface ProgressiveRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ProgressiveReveal({ 
  children, 
  className = "", 
  delay = 0 
}: ProgressiveRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsRevealed(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isVisible, delay])

  return (
        <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-1000 ease-out ${
        isRevealed
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-12 scale-95'
      } ${className}`}
    >
      {children}
    </div>
  )
}

"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

// Throttle function to limit function calls
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }) as T
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  const handleIntersection = useCallback(
    throttle(([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
        setTimeout(() => {
          setIsVisible(true)
          setHasTriggered(true)
        }, delay)
      } else if (!triggerOnce && !entry.isIntersecting) {
        setIsVisible(false)
      }
    }, 16), // ~60fps throttle
    [triggerOnce, hasTriggered, delay]
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, handleIntersection])

  return { ref, isVisible }
}

export function useStaggeredAnimation(
  itemCount: number,
  options: UseScrollAnimationOptions = {}
) {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const containerRef = useRef<HTMLElement>(null)
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options

  const handleStaggeredIntersection = useCallback(
    throttle(([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && visibleItems.length === 0) {
        // Stagger the animations with reduced delay
        for (let i = 0; i < itemCount; i++) {
          setTimeout(() => {
            setVisibleItems(prev => [...prev, i])
          }, i * 100) // Reduced from 150ms to 100ms
        }
      }
    }, 16),
    [itemCount, visibleItems.length]
  )

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleStaggeredIntersection, {
      threshold,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [itemCount, threshold, rootMargin, triggerOnce, handleStaggeredIntersection])

  return { containerRef, visibleItems }
}


import { useEffect, useRef, useState } from 'react'

interface TouchPoint {
  x: number
  y: number
  timestamp: number
}

interface SwipeConfig {
  minSwipeDistance?: number
  maxSwipeTime?: number
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onTap?: () => void
  onDoubleTap?: () => void
}

export function useTouchGestures(config: SwipeConfig = {}) {
  const {
    minSwipeDistance = 50,
    maxSwipeTime = 300,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTap,
    onDoubleTap
  } = config

  const [isTouching, setIsTouching] = useState(false)
  const touchStartRef = useRef<TouchPoint | null>(null)
  const touchEndRef = useRef<TouchPoint | null>(null)
  const lastTapRef = useRef<number>(0)
  const doubleTapTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setIsTouching(true)
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now()
      }
      touchEndRef.current = null
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return
      
      const touch = e.touches[0]
      touchEndRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now()
      }
    }

    const handleTouchEnd = () => {
      setIsTouching(false)
      
      if (!touchStartRef.current || !touchEndRef.current) {
        // Single tap detection
        const now = Date.now()
        const timeSinceLastTap = now - lastTapRef.current
        
        if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
          // Double tap
          if (doubleTapTimeoutRef.current) {
            clearTimeout(doubleTapTimeoutRef.current)
          }
          onDoubleTap?.()
          lastTapRef.current = 0
        } else {
          // Single tap
          if (doubleTapTimeoutRef.current) {
            clearTimeout(doubleTapTimeoutRef.current)
          }
          doubleTapTimeoutRef.current = setTimeout(() => {
            onTap?.()
          }, 300)
          lastTapRef.current = now
        }
        return
      }

      const start = touchStartRef.current
      const end = touchEndRef.current
      const timeDiff = end.timestamp - start.timestamp

      if (timeDiff > maxSwipeTime) return

      const distanceX = end.x - start.x
      const distanceY = end.y - start.y
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance < minSwipeDistance) return

      const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)

      if (isHorizontalSwipe) {
        if (distanceX > 0) {
          onSwipeRight?.()
        } else {
          onSwipeLeft?.()
        }
      } else {
        if (distanceY > 0) {
          onSwipeDown?.()
        } else {
          onSwipeUp?.()
        }
      }

      touchStartRef.current = null
      touchEndRef.current = null
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      if (doubleTapTimeoutRef.current) {
        clearTimeout(doubleTapTimeoutRef.current)
      }
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onTap, onDoubleTap, minSwipeDistance, maxSwipeTime])

  return { isTouching }
}

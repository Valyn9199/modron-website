"use client"

import { useState, useEffect, useRef } from 'react'
import { RefreshCw } from 'lucide-react'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
  threshold?: number
  className?: string
}

export function PullToRefresh({ 
  onRefresh, 
  children, 
  threshold = 80,
  className = ""
}: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef<number>(0)
  const currentYRef = useRef<number>(0)
  const isAtTopRef = useRef<boolean>(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      // Only enable pull-to-refresh when at the very top (within 5px)
      isAtTopRef.current = window.scrollY <= 5
      if (isAtTopRef.current) {
        startYRef.current = e.touches[0].clientY
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Only handle if we're pulling and at the top
      if (!isPulling || !isAtTopRef.current || window.scrollY > 5) {
        setIsPulling(false)
        return
      }

      currentYRef.current = e.touches[0].clientY
      const distance = Math.max(0, currentYRef.current - startYRef.current)
      
      // Only prevent default if we're actually pulling down significantly
      if (distance > 30) {
        const resistance = 0.3 // Much more resistance
        const adjustedDistance = distance * resistance
        setPullDistance(adjustedDistance)
        e.preventDefault()
      }
    }

    const handleTouchEnd = async () => {
      if (!isPulling) return

      if (pullDistance >= threshold) {
        setIsRefreshing(true)
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
        }
      }

      setIsPulling(false)
      setPullDistance(0)
      isAtTopRef.current = false
    }

    // Use passive listeners where possible to improve performance
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPulling, pullDistance, threshold, onRefresh])

  const rotation = Math.min(pullDistance / threshold * 360, 360)
  const opacity = Math.min(pullDistance / threshold, 1)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Pull indicator */}
      {isPulling && (
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center justify-center transition-all duration-200"
          style={{ 
            top: `${Math.min(pullDistance, threshold)}px`,
            opacity: opacity
          }}
        >
          <div className="w-12 h-12 bg-[#32ca73] rounded-full flex items-center justify-center shadow-lg">
            <RefreshCw 
              className="w-6 h-6 text-white transition-transform duration-200"
              style={{ 
                transform: `rotate(${rotation}deg)`,
                animation: isRefreshing ? 'spin 1s linear infinite' : 'none'
              }}
            />
          </div>
          <p className="text-sm text-[#32ca73] mt-2 font-medium">
            {pullDistance >= threshold ? 'Release to refresh' : 'Pull to refresh'}
          </p>
        </div>
      )}

      {/* Content */}
      <div 
        className="transition-transform duration-200"
        style={{ 
          transform: isPulling ? `translateY(${Math.min(pullDistance, threshold)}px)` : 'translateY(0)'
        }}
      >
        {children}
      </div>

      {/* Loading overlay */}
      {isRefreshing && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
            <RefreshCw className="w-6 h-6 text-[#32ca73] animate-spin" />
            <span className="text-gray-700">Refreshing...</span>
          </div>
        </div>
      )}
    </div>
  )
}

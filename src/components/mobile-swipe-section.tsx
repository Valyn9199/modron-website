"use client"

import { useState, useEffect } from 'react'
import { useTouchGestures } from '@/hooks/use-touch-gestures'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SwipeSectionProps {
  children: React.ReactNode[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  showArrows?: boolean
}

export function MobileSwipeSection({ 
  children, 
  className = "",
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true
}: SwipeSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Touch gestures
  useTouchGestures({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    onTap: () => setIsAutoPlaying(!isAutoPlaying)
  })

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || !autoPlay) return

    const interval = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlay, autoPlayInterval, goToNext])

  // Pause auto-play on hover (desktop)
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(autoPlay)

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div 
            key={index} 
            className="w-full flex-shrink-0"
            style={{ width: '100%' }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && children.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && children.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-green-500 scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {autoPlay && (
        <div className="absolute top-4 right-4 z-10">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isAutoPlaying ? 'bg-green-500' : 'bg-gray-500'
          }`} />
        </div>
      )}
    </div>
  )
}

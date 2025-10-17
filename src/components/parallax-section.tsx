"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down"
}

export function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = "",
  direction = "up"
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.pageYOffset || document.documentElement.scrollTop
      const elementTop = rect.top + scrolled
      const elementHeight = rect.height
      const windowHeight = window.innerHeight
      
      // Calculate parallax offset
      const scrollProgress = (scrolled - elementTop + windowHeight) / (windowHeight + elementHeight)
      const parallaxOffset = scrollProgress * 100 * speed * (direction === "up" ? -1 : 1)
      
      setOffset(parallaxOffset)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [speed, direction])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        className="parallax-mobile"
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s linear',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  )
}


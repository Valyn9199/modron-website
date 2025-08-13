"use client"

import { useEffect, useRef, useState } from 'react'

interface AnimatedBackgroundProps {
  className?: string
  variant?: 'flowing' | 'grid' | 'waves' | 'combined'
  intensity?: number
}

export function AnimatedBackground({ 
  className = "", 
  variant = 'combined',
  intensity = 1 
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const [isInView, setIsInView] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Observe viewport visibility to pause work when offscreen
    const container = containerRef.current
    let observer: IntersectionObserver | null = null
    if (container && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        setIsInView(entry.isIntersecting)
      }, { threshold: 0.01 })
      observer.observe(container)
    }

    const resizeCanvas = () => {
      // match device pixel ratio for crisp lines without overdraw
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.floor(window.innerWidth * dpr)
      const height = Math.floor(window.innerHeight * dpr)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let time = 0
    let last = 0
    const animate = (now: number) => {
      if (document.hidden || !isInView) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      // Cap work to ~30fps
      const delta = now - last
      if (delta < 33) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      last = now
      time += 0.01 * intensity
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (variant === 'flowing' || variant === 'combined') {
        // Flowing gradient animation
        const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient1.addColorStop(0, `rgba(34, 197, 94, ${0.1 * intensity})`)
        gradient1.addColorStop(0.5, `rgba(16, 185, 129, ${0.05 * intensity})`)
        gradient1.addColorStop(1, `rgba(5, 150, 105, ${0.1 * intensity})`)

        ctx.fillStyle = gradient1
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Moving gradient overlay
        const gradient2 = ctx.createRadialGradient(
          canvas.width * 0.5 + Math.sin(time) * 100,
          canvas.height * 0.5 + Math.cos(time) * 100,
          0,
          canvas.width * 0.5 + Math.sin(time) * 100,
          canvas.height * 0.5 + Math.cos(time) * 100,
          300
        )
        gradient2.addColorStop(0, `rgba(34, 197, 94, ${0.15 * intensity})`)
        gradient2.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient2
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      if (variant === 'grid' || variant === 'combined') {
        // Animated grid pattern
        const gridSize = 50
        const offsetX = (time * 20) % gridSize
        const offsetY = (time * 15) % gridSize

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.02 * intensity})`
        ctx.lineWidth = 1

        // Vertical lines
        for (let x = offsetX; x < canvas.width; x += gridSize) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, canvas.height)
          ctx.stroke()
        }

        // Horizontal lines
        for (let y = offsetY; y < canvas.height; y += gridSize) {
          ctx.beginPath()
          ctx.moveTo(0, y)
          ctx.lineTo(canvas.width, y)
          ctx.stroke()
        }
      }

      if (variant === 'waves' || variant === 'combined') {
        // Wave effect
        ctx.strokeStyle = `rgba(34, 197, 94, ${0.1 * intensity})`
        ctx.lineWidth = 2

        for (let i = 0; i < 3; i++) {
          ctx.beginPath()
          for (let x = 0; x < canvas.width; x += 2) {
            const y = canvas.height * 0.5 + 
                     Math.sin(x * 0.01 + time + i) * 50 +
                     Math.sin(x * 0.005 + time * 0.5) * 30
            if (x === 0) {
              ctx.moveTo(x, y)
            } else {
              ctx.lineTo(x, y)
            }
          }
          ctx.stroke()
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      if (observer) observer.disconnect()
    }
  }, [variant, intensity, isInView])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none ${className}`}
        aria-hidden="true"
      />
    </div>
  )
}

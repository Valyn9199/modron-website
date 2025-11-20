"use client"

import { useEffect, useRef } from 'react'

interface ImmersionTankAnimationProps {
  className?: string
  width?: number
  height?: number
}

export function ImmersionTankAnimation({ 
  className = "", 
  width = 400, 
  height = 300 
}: ImmersionTankAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    // Fluid particles for background effect only
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      type: 'bubble' | 'fluid'
    }> = []

    // Initialize particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.2 + 0.05,
        type: Math.random() > 0.85 ? 'bubble' : 'fluid'
      })
    }

    let animationId: number

    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(16, 185, 129, 0.03)'
      ctx.fillRect(0, 0, width, height)

      // Update and draw fluid particles (background only)
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off walls
        if (particle.x <= 0 || particle.x >= width) particle.vx *= -0.9
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -0.9

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(width, particle.x))
        particle.y = Math.max(0, Math.min(height, particle.y))

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        
        if (particle.type === 'bubble') {
          // Draw bubble
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
          ctx.fill()
          
          // Bubble highlight
          ctx.beginPath()
          ctx.arc(particle.x - particle.size * 0.3, particle.y - particle.size * 0.3, particle.size * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
          ctx.fill()
        } else {
          // Draw fluid particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(16, 185, 129, 0.3)'
          ctx.fill()
        }
        
        ctx.restore()
      })

      // Add subtle wave effect at the top
      ctx.save()
      ctx.globalAlpha = 0.2
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)'
      for (let i = 0; i < width; i += 15) {
        const waveHeight = Math.sin(Date.now() * 0.0008 + i * 0.015) * 4
        ctx.fillRect(i, 0, 15, 8 + waveHeight)
      }
      ctx.restore()

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [width, height])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 rounded-lg"
        style={{ width, height }}
      />
      
      {/* Static GPU grid overlay */}
      <div className="relative z-10 bg-gradient-to-br from-[#40d0f2]/20 to-[#d5aaf9]/20 rounded-xl p-6 h-full flex flex-col justify-center">
        <div className="text-white font-bold text-lg mb-4 text-center">Immersion Cooling Tank</div>
        <div className="grid grid-cols-3 gap-3 mb-4 flex-1 flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/90 rounded-lg p-3 border-2 border-[#40d0f2]/50 shadow-lg">
              <div className="w-6 h-6 bg-[#40d0f2] rounded mx-auto"></div>
            </div>
          ))}
        </div>
        <div className="text-white/80 text-sm text-center">6× RTX PRO 6000 GPUs per tank</div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedProgressBarProps {
  value: number
  maxValue?: number
  label: string
  color?: string
  showPercentage?: boolean
  delay?: number
}

export function AnimatedProgressBar({
  value,
  maxValue = 100,
  label,
  color = "#40d0f2",
  showPercentage = true,
  delay = 0
}: AnimatedProgressBarProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 })
  const [animatedValue, setAnimatedValue] = useState(0)
  const percentage = (value / maxValue) * 100

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        const duration = 1500
        const steps = 60
        const increment = value / steps
        let currentStep = 0

        const interval = setInterval(() => {
          currentStep++
          setAnimatedValue(Math.min(increment * currentStep, value))

          if (currentStep >= steps) {
            clearInterval(interval)
          }
        }, duration / steps)

        return () => clearInterval(interval)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [isVisible, value, delay])

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium text-sm">{label}</span>
        {showPercentage && (
          <span 
            className="text-sm font-bold transition-all duration-300"
            style={{ color }}
          >
            {Math.round(animatedValue)}%
          </span>
        )}
      </div>
      
      <div className="relative h-3 bg-[#1A1A1A] rounded-full overflow-hidden border border-white/10">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-30 blur-sm"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
            width: `${(animatedValue / maxValue) * 100}%`,
            transition: 'width 0.3s ease-out'
          }}
        />
        
        {/* Progress bar */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-300 ease-out"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
            width: `${(animatedValue / maxValue) * 100}%`,
            boxShadow: `0 0 10px ${color}80`
          }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'shimmer 2s infinite',
            }}
          />
        </div>
      </div>
    </div>
  )
}


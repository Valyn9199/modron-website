"use client"

import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface StatItem {
  value: number
  suffix: string
  label: string
  description: string
  color: string
}

const stats: StatItem[] = [
  {
    value: 60,
    suffix: "%",
    label: "Lower Failure Rates",
    description: "Immersion cooling vs air cooling",
    color: "#40d0f2"
  },
  {
    value: 40,
    suffix: "%",
    label: "Less Power",
    description: "Energy efficiency optimization",
    color: "#32ca73"
  },
  {
    value: 90,
    suffix: "%",
    label: "Faster Setup",
    description: "Container vs traditional data centers",
    color: "#d5aaf9"
  }
]

export function FloatingStatsOverlay() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 })
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0])

  useEffect(() => {
    if (isVisible) {
      const intervals: NodeJS.Timeout[] = []
      
      stats.forEach((stat, index) => {
        const duration = 2000 // 2 seconds
        const steps = 60
        const increment = stat.value / steps
        let currentStep = 0

        const interval = setInterval(() => {
          currentStep++
          setAnimatedValues(prev => {
            const newValues = [...prev]
            newValues[index] = Math.min(Math.round(increment * currentStep), stat.value)
            return newValues
          })

          if (currentStep >= steps) {
            clearInterval(interval)
          }
        }, duration / steps)
        
        intervals.push(interval)
      })

      return () => {
        intervals.forEach(interval => clearInterval(interval))
      }
    }
  }, [isVisible])

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative mt-24 mb-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-5xl px-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`group relative bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 
              hover:bg-black/80 hover:border-white/30 transition-all duration-300 cursor-pointer
              transform hover:scale-105 hover:-translate-y-1`}
            style={{
              animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.2}s forwards` : 'none',
              opacity: isVisible ? 1 : 0
            }}
          >
            {/* Animated background with solid color */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"
              style={{ backgroundColor: stat.color }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-baseline justify-center mb-2">
                <span 
                  className="text-4xl md:text-5xl font-bold"
                  style={{ color: stat.color }}
                >
                  {animatedValues[index]}
                </span>
                <span 
                  className="text-2xl md:text-3xl font-bold ml-1"
                  style={{ color: stat.color }}
                >
                  {stat.suffix}
                </span>
              </div>
              
              <div className="text-center">
                <p className="text-white font-semibold text-sm md:text-base mb-1">
                  {stat.label}
                </p>
                <p className="text-white/60 text-xs opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300">
                  {stat.description}
                </p>
              </div>
            </div>

            {/* Hover glow effect with solid color */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl rounded-xl transition-opacity duration-300 -z-10"
              style={{ backgroundColor: stat.color }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}


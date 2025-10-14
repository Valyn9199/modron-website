"use client"

import { useEffect, useState, useMemo } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedStatsProps {
  className?: string
}

interface StatItem {
  label: string
  value: number
  suffix?: string
  prefix?: string
  color: string
  chartData?: number[]
}

export function AnimatedStats({ className = "" }: AnimatedStatsProps) {
  const { ref, isVisible } = useScrollAnimation()
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0])

  const stats: StatItem[] = useMemo(() => [
    {
      label: "Uptime",
      value: 99.9,
      suffix: "%",
      color: "#32ca73",
      chartData: [95, 97, 98, 99, 99.5, 99.9]
    },
    {
      label: "Carbon Reduction",
      value: 60,
      suffix: "%",
      color: "#d5aaf9",
      chartData: [20, 35, 45, 55, 58, 60]
    },
    {
      label: "Faster AI Performance",
      value: 40,
      suffix: "%",
      color: "#40d0f2",
      chartData: [10, 20, 30, 35, 38, 40]
    }
  ], [])

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

  useEffect(() => {
    if (isVisible) {
      if (prefersReduced) {
        setAnimatedValues(stats.map(stat => stat.value))
        return
      }
      // Reduce animation duration on mobile for better performance
      const duration = isMobile ? 600 : 1200
      const startTime = performance.now()
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        
        setAnimatedValues(stats.map(stat => stat.value * easeOutQuart))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isVisible, stats, prefersReduced, isMobile])

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`mt-16 sm:mt-20 md:mt-24 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8" role="list" aria-label="Performance statistics">
        {stats.map((stat, index) => (
          <div key={stat.label} className="relative group" role="listitem">
            <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 hover:border-[#d5aaf9]/50 hover:shadow-lg hover:shadow-[#d5aaf9]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
              {/* Animated Chart */}
              <div className="mb-3 sm:mb-4 h-12 sm:h-16 relative">
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  {stat.chartData && (
                    <path
                      d={`M 0 ${40 - (stat.chartData[0] / 100) * 40} ${stat.chartData.map((value, i) => 
                        `L ${(i + 1) * (100 / (stat.chartData!.length - 1))} ${40 - (value / 100) * 40}`
                      ).join(' ')}`}
                      stroke={stat.color}
                      strokeWidth="2"
                      fill="none"
                      className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        strokeDasharray: isVisible ? 'none' : '0 1000',
                        strokeDashoffset: isVisible ? 0 : 1000
                      }}
                    />
                  )}
                  {/* Area fill */}
                  {stat.chartData && (
                    <path
                      d={`M 0 ${40 - (stat.chartData[0] / 100) * 40} ${stat.chartData.map((value, i) => 
                        `L ${(i + 1) * (100 / (stat.chartData!.length - 1))} ${40 - (value / 100) * 40}`
                      ).join(' ')} L 100 40 L 0 40 Z`}
                      fill={stat.color}
                      fillOpacity="0.1"
                      className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    />
                  )}
                </svg>
              </div>

              {/* Stat Value */}
              <div className="text-center">
                <div 
                  className="text-2xl sm:text-3xl font-light text-black mb-1 sm:mb-2"
                  aria-label={`${stat.label}: ${animatedValues[index].toFixed(stat.value % 1 === 0 ? 0 : 1)}${stat.suffix || ''}`}
                >
                  {stat.prefix || ''}
                  {animatedValues[index].toFixed(stat.value % 1 === 0 ? 0 : 1)}
                  {stat.suffix || ''}
                </div>
                <div className="text-xs sm:text-sm font-light text-black">{stat.label}</div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 sm:mt-4">
                <div className="w-full bg-[#262626] rounded-full h-1">
                  <div
                    className="h-1 rounded-full transition-all duration-2000 ease-out"
                    style={{
                      width: isVisible ? `${(animatedValues[index] / stat.value) * 100}%` : '0%',
                      backgroundColor: stat.color
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

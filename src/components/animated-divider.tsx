"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedDividerProps {
  variant?: "line" | "gradient" | "dots" | "wave"
  color?: string
  className?: string
}

export function AnimatedDivider({ 
  variant = "gradient",
  color = "#40d0f2",
  className = ""
}: AnimatedDividerProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5 })

  if (variant === "line") {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={`relative h-px w-full ${className}`}>
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'center'
          }}
        />
      </div>
    )
  }

  if (variant === "gradient") {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={`relative h-24 w-full overflow-hidden ${className}`}>
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `linear-gradient(180deg, transparent, ${color}20, transparent)`,
            opacity: isVisible ? 1 : 0
          }}
        />
        <div
          className="absolute top-1/2 left-0 right-0 h-px transition-all duration-1000"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'center'
          }}
        />
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={`flex justify-center items-center space-x-2 py-8 ${className}`}>
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full transition-all duration-500"
            style={{
              backgroundColor: color,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0)',
              transitionDelay: `${index * 100}ms`
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "wave") {
    return (
      <div ref={ref as React.RefObject<HTMLDivElement>} className={`relative h-16 w-full overflow-hidden ${className}`}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 1s ease-out'
          }}
        >
          <path
            d="M0,50 Q300,0 600,50 T1200,50"
            fill="none"
            stroke={color}
            strokeWidth="2"
            style={{
              strokeDasharray: 2000,
              strokeDashoffset: isVisible ? 0 : 2000,
              transition: 'stroke-dashoffset 2s ease-out'
            }}
          />
        </svg>
      </div>
    )
  }

  return null
}


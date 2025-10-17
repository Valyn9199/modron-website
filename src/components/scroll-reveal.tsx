"use client"

import { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface ScrollRevealProps {
  children: ReactNode
  animation?: "fade" | "slide-up" | "slide-left" | "slide-right" | "zoom" | "flip"
  delay?: number
  duration?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  animation = "fade",
  delay = 0,
  duration = 600,
  className = ""
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  const getAnimationStyles = () => {
    const baseStyle = {
      transition: `all ${duration}ms ease-out ${delay}ms`,
      willChange: 'transform, opacity'
    }

    if (!isVisible) {
      switch (animation) {
        case "fade":
          return { ...baseStyle, opacity: 0 }
        case "slide-up":
          return { ...baseStyle, opacity: 0, transform: "translateY(40px)" }
        case "slide-left":
          return { ...baseStyle, opacity: 0, transform: "translateX(40px)" }
        case "slide-right":
          return { ...baseStyle, opacity: 0, transform: "translateX(-40px)" }
        case "zoom":
          return { ...baseStyle, opacity: 0, transform: "scale(0.8)" }
        case "flip":
          return { ...baseStyle, opacity: 0, transform: "perspective(1000px) rotateX(-20deg)" }
        default:
          return { ...baseStyle, opacity: 0 }
      }
    }

    return {
      ...baseStyle,
      opacity: 1,
      transform: animation === "flip" ? "perspective(1000px) rotateX(0deg)" : "translate(0, 0) scale(1)"
    }
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={getAnimationStyles()}
      className={className}
    >
      {children}
    </div>
  )
}


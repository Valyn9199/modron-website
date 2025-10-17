"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  ripple?: boolean
  glow?: boolean
}

export function EnhancedButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled = false,
  loading = false,
  ripple = true,
  glow = false
}: EnhancedButtonProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // Create ripple effect
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const newRipple = { id: Date.now(), x, y }
      
      setRipples(prev => [...prev, newRipple])
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id))
      }, 600)
    }

    onClick?.()
  }

  const baseClasses = "relative overflow-hidden font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#40d0f2] to-[#32ca73] text-white hover:from-[#32ca73] hover:to-[#d5aaf9] focus:ring-[#40d0f2] shadow-lg hover:shadow-xl",
    secondary: "bg-[#1A1A1A] text-white border border-[#262626] hover:bg-[#2A2A2A] hover:border-[#40d0f2] focus:ring-[#40d0f2]",
    outline: "bg-transparent text-[#40d0f2] border-2 border-[#40d0f2] hover:bg-[#40d0f2] hover:text-white focus:ring-[#40d0f2]",
    ghost: "bg-transparent text-gray-300 hover:bg-white/10 hover:text-white focus:ring-white"
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl"
  }

  const glowClasses = glow ? "shadow-[0_0_20px_rgba(64,208,242,0.3)] hover:shadow-[0_0_30px_rgba(64,208,242,0.5)]" : ""

  return (
    <button
      ref={buttonRef}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClasses,
        className
      )}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '50%',
            transform: 'scale(0)',
            animation: 'ripple 0.6s linear',
          }}
        />
      ))}

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Button content */}
      <span className={cn("relative z-10 flex items-center justify-center gap-2", loading && "opacity-0")}>
        {children}
      </span>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#40d0f2]/20 to-[#32ca73]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  )
}

// Add ripple animation to globals.css
const rippleStyles = `
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 0.6s linear;
}
`

// Inject styles (this would normally be done in globals.css)
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = rippleStyles
  document.head.appendChild(style)
}

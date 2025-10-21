"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  type?: "button" | "submit" | "reset"
  className?: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  ripple?: boolean
  glow?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function EnhancedButton({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className,
  onClick,
  disabled = false,
  loading = false,
  ripple = true,
  glow = false,
  onMouseEnter,
  onMouseLeave
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
    primary: "bg-black border border-gray-600 text-white hover:bg-gray-900 hover:border-gray-500 focus:ring-gray-500 transition-all duration-200",
    secondary: "bg-gray-100 text-white border border-gray-200 hover:bg-gray-200 hover:border-primary-cyan focus:ring-primary-cyan transition-all duration-300",
    outline: "bg-transparent text-primary-cyan border-2 border-primary-cyan hover:bg-primary-cyan hover:text-white focus:ring-primary-cyan transition-all duration-300",
    ghost: "bg-transparent text-gray-400 hover:bg-white/10 hover:text-white focus:ring-white transition-all duration-300"
  }

  const sizeClasses = {
    sm: "px-3 py-1.5 text-caption rounded-md",
    md: "px-4 py-2 text-body rounded-lg",
    lg: "px-6 py-3 text-body rounded-xl"
  }

  const glowClasses = glow ? "" : ""

  return (
    <button
      ref={buttonRef}
      type={type}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        glowClasses,
        className
      )}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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

      {/* Hover glow effect - removed for minimalist style */}
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

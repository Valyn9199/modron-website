"use client"

import { ReactNode, useState } from "react"

interface EnhancedCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  icon?: ReactNode
  title?: string
  description?: string
}

export function EnhancedCard({ 
  children, 
  className = "", 
  glowColor = "#40d0f2",
  icon,
  title,
  description
}: EnhancedCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl transition-all duration-500 
        ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.1}deg) rotateY(${(mousePosition.x - 50) * 0.1}deg) scale(1.05)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated gradient border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor}40, transparent 80%)`,
          zIndex: -1,
        }}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${glowColor}60, transparent 70%)`,
          zIndex: -2,
        }}
      />

      {/* Card content */}
      <div className="relative z-10 h-full">
        {icon && (
          <div className="mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
            {icon}
          </div>
        )}
        
        {title && (
          <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 
            group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#40d0f2] 
            group-hover:to-[#32ca73] group-hover:bg-clip-text">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-[#CCCCCC] text-sm leading-relaxed mb-4">
            {description}
          </p>
        )}
        
        {children}
      </div>

      {/* Shine effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)`,
          transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: 'transform 0.7s ease-in-out',
        }}
      />
    </div>
  )
}


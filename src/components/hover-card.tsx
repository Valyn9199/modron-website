"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  onClick?: () => void
}

export function HoverCard({ 
  children, 
  className = "", 
  icon,
  title,
  description,
  onClick
}: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={`relative z-10 overflow-hidden transition-transform duration-300 cursor-pointer group ${
        isHovered ? '-translate-y-1 shadow-[var(--shadow-md)] ring-1 ring-emerald-400/40' : 'hover:-translate-y-1 hover:shadow-[var(--shadow-sm)] hover:ring-1 hover:ring-emerald-400/30'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {icon && (
        <div className={`p-4 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          {icon}
        </div>
      )}

      {(title || description) && (
        <CardHeader className="text-center pb-4">
          {title && (
            <CardTitle className="text-white text-xl">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-[#CCCCCC] text-base mt-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      )}

      <CardContent className="text-center pt-0">
        {children}
      </CardContent>
    </Card>
  )
}

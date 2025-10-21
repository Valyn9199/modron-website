"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface LoadingButtonProps {
  children: React.ReactNode
  onClick?: (e?: React.MouseEvent | React.FormEvent) => Promise<void> | void
  className?: string
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  loadingText?: string
  type?: 'button' | 'submit'
}

export function LoadingButton({ 
  children, 
  onClick, 
  className = "", 
  variant = "default",
  size = "default",
  loadingText = "Loading...",
  type = "button"
}: LoadingButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (onClick && !isLoading) {
      setIsLoading(true)
      try {
        await onClick()
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      type={type}
      className={`relative overflow-hidden transition-all duration-300 ${
        isLoading ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'
      } ${className}`}
      variant={variant}
      size={size}
    >
      {isLoading && (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span className="opacity-0">{children}</span>
          <span className="absolute inset-0 flex items-center justify-center">
            {loadingText}
          </span>
        </>
      )}
      {!isLoading && children}
    </Button>
  )
}

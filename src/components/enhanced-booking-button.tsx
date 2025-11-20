"use client"

import { useState } from "react"
import { EnhancedButton } from "./enhanced-button"
import { Icons } from "@/lib/icon-imports"

interface EnhancedBookingButtonProps {
  onOpenContactForm?: () => void
}

export function EnhancedBookingButton({ onOpenContactForm }: EnhancedBookingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const headerHeight = 64 // Account for fixed header
      const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY - headerHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
      
      // Open the contact form after scrolling
      setTimeout(() => {
        if (onOpenContactForm) {
          onOpenContactForm()
        }
      }, 500) // Wait for scroll to complete
    }
  }

  return (
    <EnhancedButton
      variant="secondary"
      size="lg"
      onClick={handleClick}
      glow
      ripple
      className="mobile-button w-full sm:w-auto group relative overflow-hidden bg-black/80 hover:bg-black text-white hover:text-white transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 text-white">
        <div className="relative">
          <Icons.Calendar className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
          {isHovered && (
            <div className="absolute inset-0 animate-ping">
              <Icons.Calendar className="w-5 h-5 text-white opacity-30" />
            </div>
          )}
        </div>
        <span className="font-semibold text-white">Book a Demo</span>
        <Icons.ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
      </div>
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-green to-primary-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </EnhancedButton>
  )
}

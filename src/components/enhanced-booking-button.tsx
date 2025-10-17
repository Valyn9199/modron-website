"use client"

import { useState } from "react"
import { EnhancedButton } from "./enhanced-button"
import { Icons } from "@/lib/icon-imports"

export function EnhancedBookingButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    // This would normally open the booking modal
    console.log("Booking modal clicked")
  }

  return (
    <EnhancedButton
      variant="secondary"
      size="lg"
      onClick={handleClick}
      glow
      ripple
      className="mobile-button group relative overflow-hidden bg-black hover:bg-gray-800 text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Icons.Calendar className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          {isHovered && (
            <div className="absolute inset-0 animate-ping">
              <Icons.Calendar className="w-5 h-5 opacity-30" />
            </div>
          )}
        </div>
        <span>Book a Demo</span>
        <Icons.ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#32ca73] to-[#d5aaf9] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </EnhancedButton>
  )
}

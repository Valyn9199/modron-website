"use client"

import { useState } from "react"
import { EnhancedButton } from "./enhanced-button"
import { Icons } from "@/lib/icon-imports"

export function EnhancedPricingButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    // This would normally scroll to pricing section
    console.log("View pricing clicked")
  }

  return (
    <EnhancedButton
      variant="primary"
      size="lg"
      onClick={handleClick}
      glow
      ripple
      className="mobile-button group relative overflow-hidden bg-[#40d0f2] hover:bg-[#32ca73] text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold">View Pricing</span>
        <Icons.ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#40d0f2] to-[#32ca73] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </EnhancedButton>
  )
}

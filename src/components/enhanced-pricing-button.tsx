"use client"

import { useState } from "react"
import { EnhancedButton } from "./enhanced-button"
import { Icons } from "@/lib/icon-imports"

export function EnhancedPricingButton() {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      const headerHeight = 64 // Account for fixed header
      const elementPosition = pricingSection.getBoundingClientRect().top + window.scrollY - headerHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <EnhancedButton
      variant="primary"
      size="lg"
      onClick={handleClick}
      glow
      ripple
      className="mobile-button w-full sm:w-auto group relative overflow-hidden bg-primary-cyan hover:bg-primary-green text-white transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Icons.CreditCard className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          {isHovered && (
            <div className="absolute inset-0 animate-ping">
              <Icons.CreditCard className="w-5 h-5 opacity-30" />
            </div>
          )}
        </div>
        <span className="font-semibold">View Pricing</span>
        <Icons.ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-cyan to-primary-green opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </EnhancedButton>
  )
}

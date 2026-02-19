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
      variant="ghost"
      size="lg"
      onClick={handleClick}
      glow
      ripple
      className="hero-cta-glass mobile-button w-full sm:w-auto group relative overflow-hidden !bg-black/70 !text-white border border-white/10 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2 sm:gap-3 text-white">
        <div className="relative hidden sm:block">
          <Icons.CreditCard className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
          {isHovered && (
            <div className="absolute inset-0 animate-ping">
              <Icons.CreditCard className="w-5 h-5 text-white opacity-30" />
            </div>
          )}
        </div>
        <span className="font-semibold text-white text-sm sm:text-base whitespace-nowrap">View Pricing</span>
        <Icons.ArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1 hidden sm:block" />
      </div>
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    </EnhancedButton>
  )
}

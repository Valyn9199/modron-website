"use client"

import { LoadingButton } from '@/components/loading-button'
import { ArrowRight } from 'lucide-react'

export function HeroCTAButtons() {
  const handleExploreCapabilities = async () => {
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 2000))
    const technologySection = document.getElementById('technology')
    if (technologySection) {
      technologySection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleGetCompute = async () => {
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500))
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center" role="group" aria-label="Call to action buttons">
      <LoadingButton 
        size="lg" 
        className="text-body px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-gradient-primary hover:bg-gradient-primary-hover border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        loadingText="Exploring..."
        onClick={handleExploreCapabilities}
        aria-label="Explore MODRON capabilities and scroll to technology section"
      >
        Explore Capabilities
        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
      </LoadingButton>
      
      <LoadingButton 
        variant="outline" 
        size="lg" 
        className="text-body px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 border-2 border-[#4A4A4A] text-gray-400 hover:bg-gray-200 hover:border-primary-cyan hover:text-white transition-all duration-300 transform hover:scale-105"
        loadingText="Connecting..."
        onClick={handleGetCompute}
        aria-label="Get compute access and scroll to contact section"
      >
        Get Compute
      </LoadingButton>
    </div>
  )
}

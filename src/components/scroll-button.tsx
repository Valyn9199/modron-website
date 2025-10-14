"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function ScrollButton() {
  const handleClick = () => {
    const contactForm = document.querySelector('.bg-[#1A1A1A]/50.border.border-[#262626].rounded-2xl');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <Button 
      size="lg" 
      className="text-base sm:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-[#d5aaf9] to-[#40d0f2] hover:from-[#c49ae8] hover:to-[#2bb8d9] border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      onClick={handleClick}
    >
      Get Compute
      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
    </Button>
  )
}

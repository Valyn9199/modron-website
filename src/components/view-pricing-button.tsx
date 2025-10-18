"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function ViewPricingButton() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing')
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <Button 
      size="lg" 
      className="text-body px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-primary-cyan text-white border-2 border-primary-cyan hover:bg-primary-green hover:border-primary-green transition-all duration-300 transform hover:scale-110 active:scale-95 sm:active:scale-100 min-h-[44px] min-w-[44px]"
      onClick={scrollToPricing}
    >
      View Pricing
      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
    </Button>
  )
}


"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-[#d5aaf9] to-[#40d0f2] hover:from-[#c49ae8] hover:to-[#2bb8d9] border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 sm:active:scale-100 min-h-[44px] min-w-[44px]"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}

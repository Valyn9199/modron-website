"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronUp, ChevronDown } from 'lucide-react'

const navigationItems = [
  { name: "Home", href: "#home", icon: "🏠" },
  { name: "Vision", href: "#vision", icon: "🎯" },
  { name: "Tech", href: "#technology", icon: "⚡" },
  { name: "Uses", href: "#use-cases", icon: "🔧" },
  { name: "Features", href: "#features", icon: "✨" },
  { name: "How", href: "#how-it-works", icon: "📋" },
  { name: "Pricing", href: "#pricing", icon: "💰" },
  { name: "Contact", href: "#contact", icon: "📞" },
]

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "vision", "technology", "use-cases", "features", "how-it-works", "pricing", "contact"]
      const scrollPosition = window.scrollY + 100
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsOpen(false)
  }

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 md:hidden">
      <div className="relative">
        {/* Toggle Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0 shadow-lg transition-all duration-300"
          size="icon"
        >
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>

        {/* Navigation Items */}
        {isOpen && (
          <div className="absolute left-0 mt-2 bg-[#1A1A1A]/95 backdrop-blur-sm border border-[#262626] rounded-xl p-2 shadow-xl">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "")
              return (
                <Button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`w-10 h-10 rounded-lg mb-1 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                      : 'bg-transparent hover:bg-[#262626] text-[#999999] hover:text-white'
                  }`}
                  size="icon"
                  title={item.name}
                >
                  <span className="text-sm">{item.icon}</span>
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

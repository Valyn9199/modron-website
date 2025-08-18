"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "Vision", href: "#vision" },
  { name: "Technology", href: "#technology" },
  { name: "Use Cases", href: "#use-cases" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
]

export function SimpleHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  // Enhanced scroll handling for sticky behavior
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Track active section
      const sections = ["home", "vision", "technology", "use-cases", "features", "pricing", "contact"]
      const scrollPosition = currentScrollY + 100
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          console.log('Active section:', sections[i]) // Temporary debug
          break
        }
      }

      // Handle shrink effect (after 100px scroll)
      setIsScrolled(currentScrollY > 100)

      // Handle hide/show on scroll direction (partially persistent)
      if (currentScrollY > 200) { // Only start hiding after 200px
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
          // Scrolling down - hide header
          setIsHeaderVisible(false)
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show header
          setIsHeaderVisible(true)
        }
      } else {
        // Always show header when near top
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      
      // Adjust for header height after scroll
      setTimeout(() => {
        window.scrollBy({
          top: -80, // Increased offset for better spacing
          behavior: 'smooth'
        })
      }, 100)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Enhanced Fixed Header */}
      <header 
  className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out ${
    isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
  } ${
    isScrolled 
      ? 'bg-black/95 backdrop-blur-md border-b border-white/20 shadow-lg shadow-black/20' 
      : 'bg-black/80 backdrop-blur-sm border-b border-white/10'
  }`}
  role="banner"
  aria-label="Main navigation"
>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ease-out ${
            isScrolled ? 'h-14' : 'h-16'
          }`}>
            {/* Logo with smooth size transition */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center group" aria-label="MODRON Home">
                <div className="relative transition-transform duration-300 ease-out group-hover:scale-105">
                  <Image
                    src="/Modron_logo.png"
                    alt="MODRON - Sustainable AI Infrastructure"
                    width={96}
                    height={32}
                    className={`object-contain transition-all duration-300 ease-out ${
                      isScrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-10'
                    }`}
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation with enhanced interactions */}
            <nav className="hidden md:flex items-center space-x-4 xl:space-x-6" role="navigation" aria-label="Main menu">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative font-medium transition-all duration-300 ease-out px-3 py-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center group ${
                      isScrolled ? 'text-xs lg:text-sm' : 'text-sm lg:text-base'
                    } ${
                      isActive 
                        ? "text-green-400 bg-green-400/10 shadow-sm" 
                        : "text-white hover:text-green-400 hover:bg-white/5 hover:shadow-sm"
                    }`}
                    aria-label={`Navigate to ${item.name} section`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-300 ease-out"></div>
                    )}
                    {/* Hover underline effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full scale-x-0 transition-transform duration-300 ease-out origin-left group-hover:scale-x-100"></div>
                  </button>
                )
              })}
            </nav>

            {/* Enhanced Mobile Menu */}
            <div className="flex items-center md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={`border-white/20 text-white hover:bg-white/10 min-h-[44px] min-w-[44px] active:scale-95 transition-all duration-300 ease-out ${
                      isScrolled ? 'h-10 w-10' : 'h-12 w-12'
                    }`}
                    aria-label="Toggle mobile menu"
                  >
                    <Menu className={`transition-all duration-300 ease-out ${
                      isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                    }`} />
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-[280px] sm:w-[320px] md:w-[350px] bg-black/95 backdrop-blur-md border-l border-white/20"
                >
                  <SheetHeader>
                    <SheetTitle className="text-white">Navigation</SheetTitle>
                    <SheetDescription className="text-gray-400">
                      Navigate through the different sections of our site.
                    </SheetDescription>
                  </SheetHeader>
                  
                  {/* Enhanced Mobile Navigation */}
                  <nav className="flex flex-col space-y-2 mt-6" role="navigation" aria-label="Mobile menu">
                    {navigationItems.map((item) => {
                      const isActive = activeSection === item.href.replace("#", "")
                      return (
                        <button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          className={`text-left font-medium transition-all duration-300 ease-out p-4 rounded-lg min-h-[48px] flex items-center ${
                            isActive 
                              ? "text-green-400 bg-green-400/10 border border-green-400/20" 
                              : "text-white hover:text-green-400 hover:bg-white/5 border border-transparent"
                          }`}
                          aria-label={`Navigate to ${item.name} section`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span className="text-base">{item.name}</span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                          )}
                        </button>
                      )
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic spacer to prevent content jump */}
      <div className={`transition-all duration-300 ease-out ${
        isScrolled ? 'h-14' : 'h-16'
      }`} />
    </>
  )
}
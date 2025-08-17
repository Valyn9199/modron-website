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
import { ViewPricingButton } from "@/components/view-pricing-button"
import { BookingModal } from "@/components/booking-modal"

const navigationItems = [
  { name: "Home", href: "#home" },
  { name: "Vision", href: "#vision" },
  { name: "Technology", href: "#technology" },
  { name: "Use Cases", href: "#use-cases" },
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
]

// Improved throttle function with better performance
function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = React.useRef(Date.now())
  
  return React.useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    }) as T,
    [callback, delay]
  )
}

export function ImprovedStickyHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)

  // Improved scroll handler with better performance
  const handleScroll = useThrottledCallback(() => {
    const currentScrollY = window.scrollY
    
    // Show/hide header based on scroll direction (optional)
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsVisible(false) // Hide when scrolling down
    } else {
      setIsVisible(true) // Show when scrolling up
    }
    
    // Update scrolled state
    setIsScrolled(currentScrollY > 50)
    
    // Update active section
    const sections = ["home", "vision", "technology", "use-cases", "features", "how-it-works", "pricing", "contact"]
    const scrollPosition = currentScrollY + 100
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i])
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sections[i])
        break
      }
    }
    
    lastScrollY.current = currentScrollY
  }, 16) // ~60fps

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const headerHeight = 64 // Height of the header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - headerHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Improved Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-lg border-b border-border" 
            : "bg-transparent border-transparent"
        }`}
        style={{
          willChange: 'transform',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="relative">
                  <Image
                    src="/Modron_logo.png"
                    alt="MODRON - Sustainable AI Infrastructure"
                    width={96}
                    height={32}
                    className="h-8 w-auto sm:h-10 object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "")
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-xs lg:text-sm font-medium transition-all duration-300 relative px-3 py-2 rounded-md ${
                      isActive 
                        ? "text-green-400 bg-green-400/10" 
                        : isScrolled 
                          ? "text-muted-foreground hover:text-white hover:bg-white/5"
                          : "text-white hover:text-green-400 hover:bg-white/10"
                    }`}
                    aria-label={`Navigate to ${item.name} section`}
                  >
                    {item.name}
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                    )}
                  </button>
                )
              })}
            </nav>

            {/* Desktop CTA Buttons - Show when scrolled */}
            <div className={`hidden lg:flex items-center space-x-3 transition-all duration-300 ${
              isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}>
              <ViewPricingButton />
              <BookingModal />
            </div>

            {/* Mobile menu */}
            <div className="flex items-center lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className={`transition-all duration-300 ${
                      isScrolled 
                        ? "border-border text-foreground hover:bg-accent" 
                        : "border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                    <SheetDescription>
                      Navigate through the different sections of our site.
                    </SheetDescription>
                  </SheetHeader>
                  
                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2 mt-6">
                    {navigationItems.map((item) => {
                      const isActive = activeSection === item.href.replace("#", "")
                      return (
                        <button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          className={`text-left text-lg font-medium transition-all duration-300 p-3 rounded-lg ${
                            isActive 
                              ? "text-green-400 bg-green-400/10" 
                              : "hover:text-white hover:bg-white/5"
                          }`}
                          aria-label={`Navigate to ${item.name} section`}
                        >
                          {item.name}
                        </button>
                      )
                    })}
                  </nav>

                  {/* Mobile CTA Buttons */}
                  <div className="flex flex-col space-y-3 mt-8 pt-6 border-t">
                    <ViewPricingButton />
                    <BookingModal />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump */}
      <div className="h-16" />
    </>
  )
}



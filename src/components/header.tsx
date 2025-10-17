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
  { name: "Pricing", href: "#pricing" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
      
      // Update active section based on scroll position
      const sections = ["home", "vision", "technology", "use-cases", "features", "pricing", "contact"]
      const headerHeight = 64 // h-16 = 64px
      const scrollPosition = window.scrollY + headerHeight + 50 // Add extra buffer
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    
    // Add the scroll handler
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${
        isScrolled ? "shadow-sm" : ""
      }`}
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
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-xs lg:text-sm font-medium transition-all duration-300 relative ${
                    isActive 
                      ? "text-[#40d0f2]" 
                      : "text-muted-foreground hover:text-[#40d0f2]"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(item.href)
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      const element = document.querySelector(item.href)
                      if (element) {
                        element.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        })
                      }
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Mobile menu */}
          <div className="flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="!z-[60] bg-black/95 backdrop-blur-sm border-l border-gray-800">
  <SheetHeader className="pb-6 border-b border-gray-800">
    <SheetTitle className="text-2xl font-bold text-white">Navigation</SheetTitle>
    <SheetDescription className="text-gray-400 text-base">
      Explore our sustainable AI infrastructure
    </SheetDescription>
  </SheetHeader>
  
  <nav className="flex flex-col space-y-2 mt-8">
    {navigationItems.map((item) => {
      const isActive = activeSection === item.href.replace("#", "")
      return (
        <Link
          key={item.name}
          href={item.href}
          className={`group relative px-4 py-4 rounded-xl transition-all duration-300 ${
            isActive 
              ? "bg-[#d5aaf9]/10 border border-[#d5aaf9]/20 text-[#d5aaf9]" 
              : "text-gray-300 hover:bg-[#d5aaf9]/5 hover:text-[#40d0f2] border border-transparent"
          }`}
          onClick={(e) => {
            e.preventDefault()
            const targetElement = document.querySelector(item.href)
            // Close menu first, then scroll after a brief delay
            setIsMobileMenuOpen(false)
            // Wait for sheet close animation to complete before scrolling
            setTimeout(() => {
              if (targetElement) {
                targetElement.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                })
              }
            }, 300) // Match the sheet animation duration
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              const targetElement = document.querySelector(item.href)
              // Close menu first, then scroll after a brief delay
              setIsMobileMenuOpen(false)
              // Wait for sheet close animation to complete before scrolling
              setTimeout(() => {
                if (targetElement) {
                  targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  })
                }
              }, 300) // Match the sheet animation duration
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`Navigate to ${item.name} section`}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{item.name}</span>
            {isActive && (
              <div className="w-2 h-2 bg-[#40d0f2] rounded-full animate-pulse"></div>
            )}
          </div>
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent rounded-xl"></div>
          )}
        </Link>
      )
    })}
  </nav>
  
  {/* Footer section */}
  <div className="mt-auto pt-8 border-t border-gray-800">
    <div className="text-center">
      <p className="text-gray-500 text-sm mb-4">Ready to get started?</p>
      <div className="space-y-3">
        <ViewPricingButton />
        <BookingModal />
      </div>
    </div>
  </div>
</SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
} 

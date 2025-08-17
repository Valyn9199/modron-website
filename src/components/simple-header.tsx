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

    // Add scroll listener to track active section
React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "vision", "technology", "use-cases", "features", "pricing", "contact"]
      const scrollPosition = window.scrollY + 100
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }
  
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          top: -64,
          behavior: 'smooth'
        })
      }, 100)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-sm border-b border-white/10">
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
                        : "text-white hover:text-green-400 hover:bg-white/5"
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

            {/* Mobile menu */}
            <div className="flex items-center lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-white/20 text-white hover:bg-white/10"
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
                              : "text-white hover:text-green-400 hover:bg-white/5"
                          }`}
                          aria-label={`Navigate to ${item.name} section`}
                        >
                          {item.name}
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

      {/* Spacer to prevent content jump */}
      <div className="h-16" />
    </>
  )
}

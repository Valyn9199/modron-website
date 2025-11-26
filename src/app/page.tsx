"use client"

import React from "react";
import { OptimizedScrollIndicator } from "@/components/optimized-scroll-indicator";

import { EnhancedForm } from "@/components/enhanced-form";
import { SkipToContent } from "@/components/skip-to-content";
import { MobileViewport } from "@/components/mobile-viewport";
import { Icons } from "@/lib/icon-imports";
import { HeroVideoSlideshow, HeroSlideshowContent } from "@/components/hero-video-slideshow";
import Image from "next/image";
 
// Lazy-load non-critical components
const ImmersionTankVideo = dynamic(() => import("@/components/immersion-tank-video").then(mod => ({ default: mod.ImmersionTankVideo })));
// Lazy-load heavier, below-the-fold components to reduce initial JS

import dynamic from 'next/dynamic';

// Lazy-load heavier, below-the-fold components to reduce initial JS
const StaggeredReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.StaggeredReveal })));
const ProgressiveReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.ProgressiveReveal })));

import { Header } from "@/components/header";
import { EnhancedPricingButton } from "@/components/enhanced-pricing-button";
import { EnhancedBookingButton } from "@/components/enhanced-booking-button";
// Lazy-load below-the-fold components
// const FloatingStatsOverlay = dynamic(() => import("@/components/floating-stats-overlay").then(mod => ({ default: mod.FloatingStatsOverlay })), {
//   loading: () => <div className="hidden lg:block" />
// }); // REMOVED - cleaner hero without cards
const ParallaxSection = dynamic(() => import("@/components/parallax-section").then(mod => ({ default: mod.ParallaxSection })));
const ScrollReveal = dynamic(() => import("@/components/scroll-reveal").then(mod => ({ default: mod.ScrollReveal })));
// AnimatedDivider removed - using clean spacing instead
const InteractiveInfrastructure = dynamic(() => import("@/components/interactive-infrastructure").then(mod => ({ default: mod.InteractiveInfrastructure })));
const DynamicComparison = dynamic(() => import("@/components/dynamic-comparison").then(mod => ({ default: mod.DynamicComparison })));
const ScrollProgress = dynamic(() => import("@/components/scroll-progress").then(mod => ({ default: mod.ScrollProgress })));

export default function Home() {
  // Performance optimizations in progress - console logs removed for production
  const [showWorkflowDetails, setShowWorkflowDetails] = React.useState(false)
  
  // Suppress hydration warnings caused by browser extensions (after mount)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalError = console.error;
      console.error = (...args) => {
        if (typeof args[0] === 'string' && args[0].includes('Hydration failed')) {
          return;
        }
        originalError.apply(console, args);
      };
      
      return () => {
        console.error = originalError;
      };
    }
  }, [])
  const [showUseCaseDetails, setShowUseCaseDetails] = React.useState(false)
  const [activeUseCaseTab, setActiveUseCaseTab] = React.useState<'gpu-solutions' | 'ai-development' | 'industry-applications' | 'enterprise-features'>('gpu-solutions')
  const [showCompetitiveComparison, setShowCompetitiveComparison] = React.useState(false)
  const [activeVisionTab, setActiveVisionTab] = React.useState<'none' | 'why-modron' | 'philosophy'>('none')
  const [hoveredPill, setHoveredPill] = React.useState<string | null>(null)
  const [iconIntroStarted, setIconIntroStarted] = React.useState(false)
  const [hasHovered, setHasHovered] = React.useState(false)
  const [brighteningRect, setBrighteningRect] = React.useState<string | null>(null)
  const iconSectionRef = React.useRef<HTMLDivElement>(null)
  
  // Icon rectangle constants - exact pixel control
  const RECT_WIDTH = 146
  const RECT_HEIGHT = 49
  const HORIZONTAL_GAP = 5  // Gap between left and right sides
  const VERTICAL_GAP = 5    // Gap between top and bottom
  const CENTRAL_GAP = 20    // Central square gap size
  
  const [showContactForm, setShowContactForm] = React.useState(false)
  const [currentHeroSlide, setCurrentHeroSlide] = React.useState(0)
  const [heroCTAFadedIn, setHeroCTAFadedIn] = React.useState(false)
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({})
  const [imageLoaded, setImageLoaded] = React.useState<Record<string, boolean>>({})
  const [expandedSpecs, setExpandedSpecs] = React.useState<Record<string, boolean>>({
    h200: false,
    gb300: false,
    l40s: false,
    rtx6000: false
  })
  const [showComparison, setShowComparison] = React.useState(false)
  const [overlayFadedIn, setOverlayFadedIn] = React.useState(false) // Overlay fade-in state
  
  // GPU hover video state
  const [hoveredGpu, setHoveredGpu] = React.useState<string | null>(null)
  const videoRefs = React.useRef<Record<string, HTMLVideoElement | null>>({})
  const [videosInView, setVideosInView] = React.useState<Set<string>>(new Set())
  const videoIntersectionRefs = React.useRef<Record<string, HTMLDivElement | null>>({})
  const hoverTimeoutRef = React.useRef<Record<string, NodeJS.Timeout | null>>({})
  
  // Hero slideshow data
  const heroSlides = [
    {
      videoSrc: "/hero/MODRON_Hero_1.mp4",
      poster: "/hero-poster-1.jpg",
      headline: "Building Australia's AI infrastructure",
      subheading: "MODULAR. IMMERSION-COOLED. SOLAR-POWERED.",
      description: "Locally-built GPU clusters. Ready in 48 hours."
    },
    {
      videoSrc: "/hero/MODRON_Hero_2.mp4",
      poster: "/hero-poster-2.jpg",
      headline: "Rapid Deployment, Anywhere",
      subheading: "48-HOUR DELIVERY. CONTAINER-BASED. SCALABLE.",
      description: "Enterprise AI infrastructure. Modular containers anywhere."
    },
    {
      videoSrc: "/hero/MODRON_Hero_3.mp4",
      poster: "/hero-poster-3.jpg",
      headline: "Sovereign AI for Australian Enterprise",
      subheading: "ON-PREMISES. SECURE. SOVEREIGN.",
      description: "Break free from overseas cloud. Local control and sovereignty."
    },
    {
      videoSrc: "/hero/MODRON_Hero_4.mp4",
      poster: "/hero-poster-4.jpg",
      headline: "Renewable-Powered Computing",
      subheading: "RENEWABLE ENERGY. HIGH PERFORMANCE. SUSTAINABLE.",
      description: "Maximum performance with clean energy. Lower impact."
    }
  ]
  
  // Fade overlay from fully black to target opacity
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayFadedIn(true)
    }, 100) // Start fade after 100ms
    return () => clearTimeout(timer)
  }, [])
  
  // Fade in hero CTAs after mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHeroCTAFadedIn(true)
    }, 500) // Delay slightly after text fades in
    return () => clearTimeout(timer)
  }, [])
  
  // Intersection Observer for lazy loading GPU videos
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    
    const observers: IntersectionObserver[] = []
    const gpuIds = ['gb300', 'h200', 'rtx6000', 'l40s']
    
    gpuIds.forEach((gpuId) => {
      const container = videoIntersectionRefs.current[gpuId]
      if (!container) return
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVideosInView((prev) => new Set(prev).add(gpuId))
            } else {
              setVideosInView((prev) => {
                const next = new Set(prev)
                next.delete(gpuId)
                return next
              })
              // Pause and reset video when out of view
              const video = videoRefs.current[gpuId]
              if (video) {
                video.pause()
                video.currentTime = 0
              }
            }
          })
        },
        {
          rootMargin: '150px', // Start loading 150px before entering viewport
          threshold: 0.01
        }
      )
      
      observer.observe(container)
      observers.push(observer)
    })
    
    return () => {
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])
  
  // Intersection Observer for icon intro sequence
  React.useEffect(() => {
    if (!iconSectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !iconIntroStarted) {
            setIconIntroStarted(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(iconSectionRef.current)

    return () => {
      if (iconSectionRef.current) {
        observer.unobserve(iconSectionRef.current)
      }
    }
  }, [iconIntroStarted])
  
  // Brightening sequence after intro completes
  React.useEffect(() => {
    if (!iconIntroStarted || hasHovered) return

    // Wait for intro to complete (1200ms for last pill/rectangle) + brief pause (300ms)
    const brighteningStartDelay = 1500
    
    const timeout = setTimeout(() => {
      // Sequence: green → purple → cyan → yellow
      const sequence = ['sovereignty', 'infrastructure', 'renewable', 'container']
      const duration = 200 // How long each rectangle stays bright
      const gap = 150 // Gap between each brightening
      
      sequence.forEach((rect, index) => {
        setTimeout(() => {
          setBrighteningRect(rect)
          setTimeout(() => {
            setBrighteningRect(null)
          }, duration)
        }, index * (duration + gap))
      })
    }, brighteningStartDelay)

    return () => clearTimeout(timeout)
  }, [iconIntroStarted, hasHovered])
  
  return (
    <MobileViewport>

        <div className="min-h-screen bg-background relative scroll-container optimize-paint">
          <SkipToContent />
        
          <Header />
          <ScrollProgress />
          {/* Spotlight removed for performance */}
          
          <main id="main-content" tabIndex={-1} className="relative">
        
{/* Hero Section - Video Slideshow */}
<section id="home" className="nav-trigger-home relative min-h-screen flex items-center justify-center w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16" role="banner" aria-labelledby="hero-heading">
  
  {/* SEO H1 - Hidden visually but accessible to search engines and screen readers */}
  <h1 className="sr-only">MODRON - Australia's Sovereign AI Infrastructure | Immersion-Cooled GPU Clusters</h1>
  
  {/* Opacity Cover - Starts fully black, fades to target opacity - Only covers videos, below text */}
  <div
    className="absolute inset-0 z-10"
    style={{
      background: `linear-gradient(
        to bottom,
        rgba(0,0,0,${overlayFadedIn ? 0.3 : 1}),
        rgba(0,0,0,${overlayFadedIn ? 0.15 : 1}),
        rgba(0,0,0,${overlayFadedIn ? 0.25 : 1})
      )`,
      pointerEvents: 'none',
      transition: 'background 1000ms ease-out',
    } as React.CSSProperties}
  />
  <div
    className="absolute inset-0 z-10"
    style={{
      background: `radial-gradient(
        ellipse at center,
        transparent 0%,
        rgba(0,0,0,${overlayFadedIn ? 0.3 : 1}) 70%,
        rgba(0,0,0,${overlayFadedIn ? 0.5 : 1}) 100%
      )`,
      pointerEvents: 'none',
      transition: 'background 1000ms ease-out',
    } as React.CSSProperties}
  />
  
  {/* Background Video Slideshow */}
  <HeroVideoSlideshow 
    slides={heroSlides}
    overlayOpacity={0.15}
    autoPlayInterval={4500}
    onSlideChange={setCurrentHeroSlide}
  />

  {/* Main Content with Dynamic Text */}
  <div 
    className="relative z-50 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mt-12 sm:mt-16 md:mt-18 lg:mt-24" 
    style={{ 
      isolation: 'isolate', 
      position: 'relative',
      zIndex: 50,
      transform: 'translateZ(0)',
    }}
  >
    <HeroSlideshowContent 
      slides={heroSlides}
      currentSlide={currentHeroSlide}
    />
    
    {/* CTA Buttons - Enhanced with micro-interactions - One line with equal spacing */}
    <div className={`flex flex-row gap-4 sm:gap-6 justify-center mb-6 sm:mb-8 md:mb-10 relative z-30 transition-opacity duration-1000 ease-out ${
      heroCTAFadedIn ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="touch-feedback flex-1 sm:flex-initial sm:w-auto max-w-[280px] sm:max-w-none">
        <EnhancedBookingButton onOpenContactForm={() => setShowContactForm(true)} />
      </div>
      <div className="touch-feedback flex-1 sm:flex-initial sm:w-auto max-w-[280px] sm:max-w-none">
        <EnhancedPricingButton />
      </div>
    </div>
  </div>
</section>

{/* Mission & Vision Section */}
<section id="vision" className="nav-trigger-vision mobile-section relative layout-section mobile-optimized bg-black mt-16 sm:mt-20 md:mt-24 lg:mt-32" style={{ scrollMarginTop: '120px' }} role="region" aria-labelledby="vision-heading">
  <div className="layout-container-wide">
    <div className="layout-content-wide">
      {/* Mission Statement - Aligned with hero style */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 sm:mb-8 max-w-5xl mx-auto tracking-tight">
          <span className="text-white font-bold">Australia's first portable, enterprise-grade AI supercomputers.</span>
        </p>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto mb-12 px-4 font-normal">
          Locally assembled, solar-powered, and modular—deploy on-premises or rent compute capacity. Deployable anywhere in 48 hours for sovereign AI infrastructure.
        </p>
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
            <div 
              className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
              onMouseEnter={() => { setHoveredPill('sovereignty'); setHasHovered(true); }}
              onMouseLeave={() => setHoveredPill(null)}
              onTouchStart={(e) => {
                e.preventDefault();
                setHoveredPill('sovereignty');
                setHasHovered(true);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                setHoveredPill(null);
              }}
              style={{
                opacity: iconIntroStarted ? 1 : 0,
                transition: hoveredPill !== null 
                  ? 'transform 0.3s ease-in-out' 
                  : 'opacity 0.6s ease-in, transform 0.3s ease-in-out',
                transitionDelay: (iconIntroStarted && !hasHovered && hoveredPill === null) ? '0ms' : '0ms',
                transform: hoveredPill === 'sovereignty' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <span 
                className="px-4 py-2 rounded-full bg-[#32ca73]/10 border border-[#32ca73]/30 text-[#32ca73] text-sm font-medium text-center w-full"
                style={{
                  filter: hoveredPill === 'sovereignty' ? 'brightness(1.3)' : 'brightness(1.0)',
                  transition: 'filter 0.3s ease-in-out'
                }}
              >
                Australian sovereignty
              </span>
            </div>
            <div 
              className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
              onMouseEnter={() => { setHoveredPill('infrastructure'); setHasHovered(true); }}
              onMouseLeave={() => setHoveredPill(null)}
              onTouchStart={(e) => {
                e.preventDefault();
                setHoveredPill('infrastructure');
                setHasHovered(true);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                setHoveredPill(null);
              }}
              style={{
                opacity: iconIntroStarted ? 1 : 0,
                transition: hoveredPill !== null 
                  ? 'transform 0.3s ease-in-out' 
                  : 'opacity 0.6s ease-in, transform 0.3s ease-in-out',
                transitionDelay: (iconIntroStarted && !hasHovered && hoveredPill === null) ? '400ms' : '0ms',
                transform: hoveredPill === 'infrastructure' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <span 
                className="px-4 py-2 rounded-full bg-[#d5aaf9]/10 border border-[#d5aaf9]/30 text-[#d5aaf9] text-sm font-medium text-center w-full"
                style={{
                  filter: hoveredPill === 'infrastructure' ? 'brightness(1.3)' : 'brightness(1.0)',
                  transition: 'filter 0.3s ease-in-out'
                }}
              >
                Modular infrastructure
              </span>
            </div>
            <div 
              className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
              onMouseEnter={() => { setHoveredPill('renewable'); setHasHovered(true); }}
              onMouseLeave={() => setHoveredPill(null)}
              onTouchStart={(e) => {
                e.preventDefault();
                setHoveredPill('renewable');
                setHasHovered(true);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                setHoveredPill(null);
              }}
              style={{
                opacity: iconIntroStarted ? 1 : 0,
                transition: hoveredPill !== null 
                  ? 'transform 0.3s ease-in-out' 
                  : 'opacity 0.6s ease-in, transform 0.3s ease-in-out',
                transitionDelay: (iconIntroStarted && !hasHovered && hoveredPill === null) ? '800ms' : '0ms',
                transform: hoveredPill === 'renewable' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <span 
                className="px-4 py-2 rounded-full bg-[#40d0f2]/10 border border-[#40d0f2]/30 text-[#40d0f2] text-sm font-medium text-center w-full"
                style={{
                  filter: hoveredPill === 'renewable' ? 'brightness(1.3)' : 'brightness(1.0)',
                  transition: 'filter 0.3s ease-in-out'
                }}
              >
                Renewable first
              </span>
            </div>
            <div 
              className="flex flex-col items-center justify-center cursor-pointer transition-transform duration-300"
              onMouseEnter={() => { setHoveredPill('container'); setHasHovered(true); }}
              onMouseLeave={() => setHoveredPill(null)}
              onTouchStart={(e) => {
                e.preventDefault();
                setHoveredPill('container');
                setHasHovered(true);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                setHoveredPill(null);
              }}
              style={{
                opacity: iconIntroStarted ? 1 : 0,
                transition: hoveredPill !== null 
                  ? 'transform 0.3s ease-in-out' 
                  : 'opacity 0.6s ease-in, transform 0.3s ease-in-out',
                transitionDelay: (iconIntroStarted && !hasHovered && hoveredPill === null) ? '1200ms' : '0ms',
                transform: hoveredPill === 'container' ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <span 
                className="px-4 py-2 rounded-full bg-[#fbff52]/10 border border-[#fbff52]/30 text-[#fbff52] text-sm font-medium text-center w-full"
                style={{
                  filter: hoveredPill === 'container' ? 'brightness(1.3)' : 'brightness(1.0)',
                  transition: 'filter 0.3s ease-in-out'
                }}
              >
                Container native
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8" ref={iconSectionRef}>
          <svg 
            viewBox="40 0 162 162"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            style={{ 
              width: '100%',
              maxWidth: `${(RECT_WIDTH * 2 + CENTRAL_GAP + HORIZONTAL_GAP * 2) * 0.5}px`,
              height: 'auto',
              display: 'block',
              margin: '0 auto'
            }}
          >
            <g>
              {/* Purple (Modular infrastructure) - Single rectangle, vertical orientation */}
              <rect
                x="40"
                y="0"
                width={RECT_HEIGHT}
                height={RECT_WIDTH - 40}
                fill="#d5aaf9"
                className="transition-all duration-300"
                style={{
                  cursor: 'pointer',
                  filter: hoveredPill === 'infrastructure' 
                    ? 'brightness(1.4) drop-shadow(0 0 8px #d5aaf9)' 
                    : brighteningRect === 'infrastructure'
                      ? 'brightness(1.5) drop-shadow(0 0 12px #d5aaf9)'
                      : hoveredPill === null 
                        ? 'brightness(1.0)' 
                        : 'brightness(0.7)',
                  opacity: hoveredPill === 'infrastructure' 
                    ? 1 
                    : hoveredPill === null 
                      ? (iconIntroStarted ? 1 : 0) 
                      : 0.5,
                  transition: hoveredPill !== null || brighteningRect !== null
                    ? 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out' 
                    : 'opacity 0.6s ease-in, filter 0.6s ease-in',
                  transitionDelay: (hoveredPill === null && iconIntroStarted && !hasHovered) ? '400ms' : '0ms'
                }}
                onMouseEnter={() => { setHoveredPill('infrastructure'); setHasHovered(true); }}
                onMouseLeave={() => setHoveredPill(null)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setHoveredPill('infrastructure');
                  setHasHovered(true);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setHoveredPill(null);
                }}
              />
              
              {/* Cyan (Renewable first) - Single rectangle */}
              <rect
                x={RECT_WIDTH + CENTRAL_GAP + HORIZONTAL_GAP - 75}
                y="0"
                width={RECT_WIDTH - 40}
                height={RECT_HEIGHT}
                fill="#40d0f2"
                className="transition-all duration-300"
                style={{
                  cursor: 'pointer',
                  filter: hoveredPill === 'renewable' 
                    ? 'brightness(1.4) drop-shadow(0 0 8px #40d0f2)' 
                    : brighteningRect === 'renewable'
                      ? 'brightness(1.5) drop-shadow(0 0 12px #40d0f2)'
                      : hoveredPill === null 
                        ? 'brightness(1.0)' 
                        : 'brightness(0.7)',
                  opacity: hoveredPill === 'renewable' 
                    ? 1 
                    : hoveredPill === null 
                      ? (iconIntroStarted ? 1 : 0) 
                      : 0.5,
                  transition: hoveredPill !== null || brighteningRect !== null
                    ? 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out' 
                    : 'opacity 0.6s ease-in, filter 0.6s ease-in',
                  transitionDelay: (hoveredPill === null && iconIntroStarted && !hasHovered) ? '800ms' : '0ms'
                }}
                onMouseEnter={() => { setHoveredPill('renewable'); setHasHovered(true); }}
                onMouseLeave={() => setHoveredPill(null)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setHoveredPill('renewable');
                  setHasHovered(true);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setHoveredPill(null);
                }}
              />
              
              {/* Green (Australian sovereignty) - Single rectangle */}
              <rect
                x="40"
                y={RECT_WIDTH + CENTRAL_GAP + VERTICAL_GAP - 58}
                width={RECT_WIDTH - 40}
                height={RECT_HEIGHT}
                fill="#32ca73"
                className="transition-all duration-300"
                style={{
                  cursor: 'pointer',
                  filter: hoveredPill === 'sovereignty' 
                    ? 'brightness(1.4) drop-shadow(0 0 8px #32ca73)' 
                    : brighteningRect === 'sovereignty'
                      ? 'brightness(1.5) drop-shadow(0 0 12px #32ca73)'
                      : hoveredPill === null 
                        ? 'brightness(1.0)' 
                        : 'brightness(0.7)',
                  opacity: hoveredPill === 'sovereignty' 
                    ? 1 
                    : hoveredPill === null 
                      ? (iconIntroStarted ? 1 : 0) 
                      : 0.5,
                  transition: hoveredPill !== null || brighteningRect !== null
                    ? 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out' 
                    : 'opacity 0.6s ease-in, filter 0.6s ease-in',
                  transitionDelay: (hoveredPill === null && iconIntroStarted && !hasHovered) ? '0ms' : '0ms'
                }}
                onMouseEnter={() => { setHoveredPill('sovereignty'); setHasHovered(true); }}
                onMouseLeave={() => setHoveredPill(null)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setHoveredPill('sovereignty');
                  setHasHovered(true);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setHoveredPill(null);
                }}
              />
              
              {/* Yellow (Container native) - Single rectangle, vertical orientation */}
              <rect
                x={RECT_WIDTH + CENTRAL_GAP + HORIZONTAL_GAP - 18}
                y={RECT_WIDTH + CENTRAL_GAP + VERTICAL_GAP - 115}
                width={RECT_HEIGHT}
                height={RECT_WIDTH - 40}
                fill="#fbff52"
                className="transition-all duration-300"
                style={{
                  cursor: 'pointer',
                  filter: hoveredPill === 'container' 
                    ? 'brightness(1.4) drop-shadow(0 0 8px #fbff52)' 
                    : brighteningRect === 'container'
                      ? 'brightness(1.5) drop-shadow(0 0 12px #fbff52)'
                      : hoveredPill === null 
                        ? 'brightness(1.0)' 
                        : 'brightness(0.7)',
                  opacity: hoveredPill === 'container' 
                    ? 1 
                    : hoveredPill === null 
                      ? (iconIntroStarted ? 1 : 0) 
                      : 0.5,
                  transition: hoveredPill !== null || brighteningRect !== null
                    ? 'opacity 0.3s ease-in-out, filter 0.3s ease-in-out' 
                    : 'opacity 0.6s ease-in, filter 0.6s ease-in',
                  transitionDelay: (hoveredPill === null && iconIntroStarted && !hasHovered) ? '1200ms' : '0ms'
                }}
                onMouseEnter={() => { setHoveredPill('container'); setHasHovered(true); }}
                onMouseLeave={() => setHoveredPill(null)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setHoveredPill('container');
                  setHasHovered(true);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setHoveredPill(null);
                }}
              />
            </g>
          </svg>
        </div>
      </div>
      
      {/* Vision Tab Navigation */}
      <div className="text-center mb-8">
        <div className="flex flex-row justify-center space-x-2 sm:space-x-4 max-w-md mx-auto">
          <button
            onClick={() => {
              setActiveVisionTab(activeVisionTab === 'why-modron' ? 'none' : 'why-modron');
            }}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-normal flex items-center justify-center relative z-10 touch-friendly ${
              activeVisionTab === 'why-modron' 
                ? 'bg-[#2A2A2A] text-white border border-[#5A5A5A]' 
                : 'bg-black border border-[#4A4A4A] text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
            }`}
          >
            <span className="font-medium mr-1 sm:mr-2 text-xs sm:text-base">Why MODRON</span>
            <Icons.ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-normal ${activeVisionTab === 'why-modron' ? 'rotate-180' : ''}`} />
          </button>
          <button
            onClick={() => {
              setActiveVisionTab(activeVisionTab === 'philosophy' ? 'none' : 'philosophy');
            }}
            className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg transition-normal flex items-center justify-center relative z-10 touch-friendly ${
              activeVisionTab === 'philosophy' 
                ? 'bg-[#2A2A2A] text-white border border-[#5A5A5A]' 
                : 'bg-black border border-[#4A4A4A] text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
            }`}
          >
            <span className="font-medium mr-1 sm:mr-2 text-xs sm:text-base">Philosophy</span>
            <Icons.ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-normal ${activeVisionTab === 'philosophy' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Why MODRON Tab Content */}
      <div className="mt-6">
        {activeVisionTab === 'why-modron' && (
          <StaggeredReveal staggerDelay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-black border border-[#4A4A4A] rounded-xl p-6 hover:border-primary-purple/30 transition-all duration-200 group">
                <h3 className="text-body font-bold text-white mb-4 group-hover:text-primary-purple transition-colors">Supercomputers in a Box</h3>
                <p className="text-gray-400 text-caption leading-relaxed">
                  Deploy enterprise-grade AI infrastructure anywhere in Australia within 48 hours. No lengthy construction timelines or complex installations required.
                </p>
              </div>
              
              <div className="bg-black border border-[#4A4A4A] rounded-xl p-6 hover:border-primary-cyan/30 transition-all duration-200 group">
                <h3 className="text-body font-bold text-white mb-4 group-hover:text-primary-cyan transition-colors">Compute Independence</h3>
                <p className="text-gray-400 text-caption leading-relaxed">
                  Break free from overseas cloud dependencies. Australian businesses, researchers, and government agencies get sovereign AI infrastructure with local control.
                </p>
              </div>
              
              <div className="bg-black border border-[#4A4A4A] rounded-xl p-6 hover:border-primary-green/30 transition-all duration-200 group">
                <h3 className="text-body font-bold text-white mb-4 group-hover:text-primary-green transition-colors">Rapid Deployment</h3>
                <p className="text-gray-400 text-caption leading-relaxed">
                  From order to operation in 48 hours. Modular containers with immersion cooling deliver industry-leading compute density in a compact footprint.
                </p>
              </div>
            </div>
          </StaggeredReveal>
        )}
      </div>
              
      {/* Philosophy Tab Content */}
      <div className="mt-6">
        {activeVisionTab === 'philosophy' && (
          <StaggeredReveal staggerDelay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-black border border-[#4A4A4A] rounded-xl p-6 hover:border-primary-purple/30 transition-all duration-200 group">
                <h3 className="text-body font-bold text-white mb-4 group-hover:text-primary-purple transition-colors">Australian Sovereignty</h3>
                <p className="text-gray-400 text-caption leading-relaxed">
                  Locally assembled, locally operated, locally controlled. Every GPU cluster is built in Australia with Australian oversight and data residency guarantees.
                </p>
              </div>
              
              <div className="bg-black border border-[#4A4A4A] rounded-xl p-6 hover:border-primary-cyan/30 transition-all duration-200 group">
                <h3 className="text-body font-bold text-white mb-4 group-hover:text-primary-cyan transition-colors">Renewable-First Operations</h3>
                <p className="text-gray-400 text-caption leading-relaxed">
                  Solar panels, battery storage, and grid integration designed for 80-95% renewable energy usage with carbon-neutral operations.
                </p>
              </div>
              
              <div className="bg-black border border-[#4A4A4A] rounded-xl p-6 hover:border-primary-green/30 transition-all duration-200 group">
                <h3 className="text-body font-bold text-white mb-4 group-hover:text-primary-green transition-colors">Container-Native Architecture</h3>
                <p className="text-gray-400 text-caption leading-relaxed">
                  Shipping container infrastructure enables rapid deployment, easy scaling, and disaster recovery across multiple Australian locations.
                </p>
              </div>
            </div>
          </StaggeredReveal>
        )}
      </div>
    </div>
  </div>
</section>

      {/* Animated Divider */}
      {/* Clean spacing between sections */}
      <div className="h-16 md:h-24 bg-black"></div>

      {/* Technology & Infrastructure Section */}
      <section id="technology" className="nav-trigger-technology mobile-section relative py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 sm:mb-12 tracking-tight">
              Technology & Infrastructure
            </h2>
            <p className="section-description text-body text-gray-400 max-w-4xl mx-auto font-light leading-relaxed px-4">
              Modular shipping-container infrastructure with cutting-edge GPUs, revolutionary immersion cooling, and solar integration—deployed in days, not months.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            {/* Infrastructure Diagram - Desktop: Always visible */}
            <div className="hidden lg:block">
              <div className="relative">
                  <div className="bg-black border border-[#4A4A4A] rounded-2xl p-4 sm:p-6 md:p-8" style={{ willChange: 'transform' }}>
                  {/* Solar + Grid Power */}
                  <div className="flex items-center justify-center mb-6 sm:mb-8">
                      <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-[#32ca73]">
                      <Icons.Sun className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                      <div className="rounded-xl p-3 sm:p-4 bg-[#32ca73]">
                      <Icons.Power className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Solar + Grid Hybrid Power</div>
                  </div>
                  
                  {/* Connection Line */}
                  <div className="flex justify-center mb-6 sm:mb-8">
                      <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#32ca73] to-[#fbff52]" style={{ willChange: 'transform' }}></div>
                  </div>
                  
                  {/* GPU Tank */}
                  <div className="mb-6 sm:mb-8">
                    <ImmersionTankVideo className="h-48 sm:h-64" />
                  </div>
                  
                  {/* Connection Line */}
                  <div className="flex justify-center mb-6 sm:mb-8">
                      <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#fbff52] to-[#d5aaf9]" style={{ willChange: 'transform' }}></div>
                  </div>
                  
                  {/* Network Layer */}
                  <div className="flex items-center justify-center">
                      <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-[#d5aaf9]">
                      <Icons.Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                      <div className="rounded-xl p-3 sm:p-4 bg-[#d5aaf9]">
                      <Icons.Network className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Vast.ai + Direct Connect</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Infrastructure Diagram - Mobile: Always Visible */}
            <div className="lg:hidden">
              <div className="mb-6">
                <div className="p-4 bg-[#1A1A1A]/30 border border-[#262626] rounded-xl">
                    <div className="relative">
                      <div className="bg-black border border-[#4A4A4A] rounded-2xl p-4 sm:p-6 md:p-8" style={{ willChange: 'transform' }}>
                        {/* Solar + Grid Power */}
                        <div className="flex items-center justify-center mb-6 sm:mb-8">
                            <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-[#32ca73]">
                            <Icons.Sun className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                            <div className="rounded-xl p-3 sm:p-4 bg-[#32ca73]">
                            <Icons.Power className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                          <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Solar + Grid Hybrid Power</div>
                        </div>
                        
                        {/* Connection Line */}
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#32ca73] to-[#fbff52]" style={{ willChange: 'transform' }}></div>
                        </div>
                        
                        {/* GPU Tank */}
                        <div className="mb-6 sm:mb-8">
                          <ImmersionTankVideo className="h-48 sm:h-64" />
                        </div>
                        
                        {/* Connection Line */}
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#fbff52] to-[#d5aaf9]" style={{ willChange: 'transform' }}></div>
                        </div>
                        
                        {/* Network Layer */}
                        <div className="flex items-center justify-center">
                            <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-[#d5aaf9]">
                            <Icons.Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                            <div className="rounded-xl p-3 sm:p-4 bg-[#d5aaf9]">
                            <Icons.Network className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                          <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Vast.ai + Direct Connect</div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Infrastructure Details - Mobile: Progressive Disclosure */}
            <div className="lg:hidden">
              <details className="group mb-6">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-between p-4 bg-black border border-[#4A4A4A] rounded-xl hover:border-primary-purple/30 transition-all duration-200">
                    <h3 className="text-white font-semibold text-lg">Infrastructure Overview</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-cyan text-sm font-medium">View Details</span>
                      <Icons.ChevronDown className="h-5 w-5 text-primary-cyan transition-transform duration-200 group-open:rotate-180" />
                    </div>
                  </div>
                </summary>
                
                <div className="mt-4">
            <StaggeredReveal staggerDelay={100}>
            <div className="space-y-6 sm:space-y-8">
              {/* GPU Nodes */}
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-purple/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#d5aaf9' }}>
                    <Icons.Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">MODRON GPU Clusters</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">6× High-Performance GPUs (RTX PRO 6000/H200/L40S/GB300), Australian-assembled, immersion-cooled</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Locally sourced components with Australian quality control and support.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Immersion Cooling */}
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-cyan/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#40d0f2' }}>
                    <Icons.Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Immersion Cooling</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Proprietary liquid cooling system</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Advanced immersion cooling technology reduces failure rates by 60% while maintaining peak performance and enabling higher compute density. This represents a significant improvement over traditional air cooling systems.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Solar + Grid Hybrid */}
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-green/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#32ca73' }}>
                    <Icons.Zap className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Solar + Battery Hybrid</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Australian-made solar panels, advanced battery storage integration</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Grid-independent operation with intelligent energy management delivering 40% power consumption savings through renewable energy optimization.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Vast.ai + Direct Connect */}
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-purple/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#fbff52' }}>
                    <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Container Infrastructure</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">ISO shipping containers, rapid deployment, disaster recovery</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Deploy anywhere in Australia within 48 hours vs 6-12 months for traditional data centers. Industry-leading compute density in a compact footprint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </StaggeredReveal>
          </div>
              </details>
        </div>
            
            {/* Infrastructure Details - Desktop: Always Visible */}
            <div className="hidden lg:block">
              <StaggeredReveal staggerDelay={100}>
                <div className="space-y-6 sm:space-y-8">
                  {/* GPU Nodes */}
                  <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-purple/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#d5aaf9' }}>
                        <Icons.Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">MODRON GPU Clusters</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">6× High-Performance GPUs (RTX PRO 6000/H200/L40S/GB300), Australian-assembled, immersion-cooled</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Locally sourced components with Australian quality control and support.
                        </p>
                      </div>
                    </div>
            </div>
            
                  {/* Immersion Cooling */}
                  <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-cyan/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#40d0f2' }}>
                        <Icons.Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Immersion Cooling</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Proprietary liquid cooling system</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Advanced immersion cooling technology reduces failure rates by 60% while maintaining peak performance and enabling higher compute density. This represents a significant improvement over traditional air cooling systems.
                        </p>
                </div>
                    </div>
              </div>
              
                  {/* Solar + Battery Hybrid */}
                  <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-green/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#32ca73' }}>
                        <Icons.Zap className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Solar + Battery Hybrid</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Australian-made solar panels, advanced battery storage integration</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Grid-independent operation with intelligent energy management delivering 40% power consumption savings through renewable energy optimization.
                        </p>
                </div>
                    </div>
              </div>
              
                  {/* Container Infrastructure */}
                  <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-[#fbff52]/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#fbff52' }}>
                        <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Container Infrastructure</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">ISO shipping containers, rapid deployment, disaster recovery</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Deploy anywhere in Australia within 48 hours vs 6-12 months for traditional data centers. Industry-leading compute density in a compact footprint.
                        </p>
                </div>
                    </div>
              </div>
            </div>
            </StaggeredReveal>
          </div>
        </div>
        
          {/* Interactive Infrastructure Button */}
        <div className="text-center mt-8 sm:mt-12 hidden lg:block">
            <details className="group">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between p-4 bg-black border border-[#4A4A4A] rounded-xl hover:border-primary-purple/30 transition-all duration-200">
                  <span className="text-white font-semibold text-lg">Explore Interactive Infrastructure</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm font-medium">Explore</span>
                    <Icons.ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </div>
              </summary>
              
              <div className="mt-4">
                <InteractiveInfrastructure />
              </div>
            </details>
            </div>
            
                  </div>
      </section>

      {/* Modular Deployment Section */}
      <section className="nav-trigger-technology relative py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-8 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Video Side */}
            <div className="order-1 lg:order-1">
              <div className="video-container relative rounded-2xl overflow-hidden bg-black min-h-[256px] h-64 sm:h-80 md:h-80 lg:h-96">
                {/* Video wrapper to help with rounded corner clipping */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover object-center"
                    poster="/MODRON_Gold_Delivery_poster.jpg"
                    style={{
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      willChange: 'auto',
                    }}
                  >
                    <source src="/MODRON_Gold_Delivery_02.mp4" type="video/mp4" />
                  </video>
                </div>
                {/* Transparent rounded rectangle overlay */}
                <div className="absolute inset-0 border-6 border-black rounded-2xl bg-transparent z-20 pointer-events-none"></div>
                {/* Subtle overlay to mask lighter sections */}
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
                  </div>

            {/* Content Side */}
            <div className="order-2 lg:order-2">
              <div className="max-w-lg mx-auto lg:mx-0">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-6 sm:mb-8 tracking-tight">
                  Modular Deployment
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#CCCCCC] mb-6 sm:mb-8 font-light leading-relaxed">
                  Deploy anywhere in Australia within 48 hours using modular containers with industry-leading compute density and immersion cooling.
                  <span className="hidden sm:block text-xs text-gray-500 mt-2">* Requires site suitability thresholds</span>
                </p>
                {/* Mobile disclaimer */}
                <p className="sm:hidden text-xs text-gray-500 mb-4">* Requires site suitability thresholds</p>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#fbff52] flex items-center justify-center flex-shrink-0 mt-1">
                      <Icons.Zap className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                  </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">100+ PetaFLOPS Compute Power</h3>
                      <p className="text-[#999999] text-sm sm:text-base">Industry-leading performance with our diverse GPU portfolio delivering unmatched AI training and inference capabilities across all workload types.</p>
                </div>
              </div>
              
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#d5aaf9] flex items-center justify-center flex-shrink-0 mt-1">
                      <Icons.Clock className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                  </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">Deploy Anywhere in 48 Hours</h3>
                      <p className="text-[#999999] text-sm sm:text-base">Self-contained units that can be installed at most sites for on-premises operations in hours and days.</p>
                    </div>
                </div>
                
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#40d0f2] flex items-center justify-center flex-shrink-0 mt-1">
                      <Icons.Settings className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                  </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">Plug-and-Play Infrastructure</h3>
                      <p className="text-[#999999] text-sm sm:text-base">Complete AI infrastructure in portable containers with minimal site preparation required.</p>
                </div>
              </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Animated Divider */}
      {/* Clean spacing between sections */}
      <div className="h-16 md:h-24 bg-black"></div>


      {/* Use Cases Section */}
      <section id="use-cases" className="nav-trigger-use-cases relative z-10 overflow-visible py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 sm:mb-12 tracking-tight">
              Use Cases
            </h2>
            {/* Deployment trigger - safe change */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
              Enterprise-grade AI infrastructure—on-premises deployment or campus access—anywhere in Australia within 48 hours. Sovereign. Scalable. With industry-leading compute density and Australian data residency.
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {/* Tabbed Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#1A1A1A]/30 border border-[#262626] rounded-xl p-1 flex overflow-x-auto w-full max-w-4xl" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4B5563 transparent' }}>
                {/* GPU Solutions - Now First */}
                <button
                  onClick={() => setActiveUseCaseTab('gpu-solutions')}
                  className={`px-2 sm:px-6 py-1.5 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-xs sm:text-base whitespace-nowrap flex-shrink-0 ${
                    activeUseCaseTab === 'gpu-solutions'
                      ? 'bg-[#1A1A1A]/50 text-white underline underline-offset-4'
                      : 'text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icons.Cpu className="h-4 w-4 mr-2 hidden sm:block" />
                  GPU Solutions
                </button>
                <button
                  onClick={() => setActiveUseCaseTab('ai-development')}
                  className={`px-2 sm:px-6 py-1.5 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-xs sm:text-base whitespace-nowrap flex-shrink-0 ${
                    activeUseCaseTab === 'ai-development'
                      ? 'bg-[#1A1A1A]/50 text-white underline underline-offset-4'
                      : 'text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icons.Brain className="h-4 w-4 mr-2 hidden sm:block" />
                  AI Development Process
                </button>
                <button
                  onClick={() => setActiveUseCaseTab('industry-applications')}
                  className={`px-2 sm:px-6 py-1.5 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-xs sm:text-base whitespace-nowrap flex-shrink-0 ${
                    activeUseCaseTab === 'industry-applications'
                      ? 'bg-[#1A1A1A]/50 text-white underline underline-offset-4'
                      : 'text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icons.Shield className="h-4 w-4 mr-2 hidden sm:block" />
                  Industry Applications
                </button>
                <button
                  onClick={() => setActiveUseCaseTab('enterprise-features')}
                  className={`px-2 sm:px-6 py-1.5 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-xs sm:text-base whitespace-nowrap flex-shrink-0 ${
                    activeUseCaseTab === 'enterprise-features'
                      ? 'bg-[#1A1A1A]/50 text-white underline underline-offset-4'
                      : 'text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icons.Settings className="h-4 w-4 mr-2 hidden sm:block" />
                  Enterprise Features
                </button>
              </div>
              </div>
              
              {/* Tab Content */}
            <div className="bg-black border border-[#4A4A4A] rounded-2xl p-6 hover:border-[#4A4A4A] transition-all duration-300 group relative overflow-hidden">
              
              {/* AI Development Process Tab Content */}
              {activeUseCaseTab === 'ai-development' && (
                <div className="relative z-10">
                      
                      <h3 className="text-xl font-bold text-white mb-6 text-center relative z-10">AI Development Process</h3>
                      
                      {/* AI Development Capabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                          <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.Database className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            </div>
                            <h4 className="text-white font-semibold">Data Processing</h4>
                          </div>
                          <p className="text-gray-400 text-sm">Process 10TB+ datasets with 95% lower carbon footprint. Real-time pipelines with Australian data residency throughout the entire workflow.</p>
                        </div>
                        
                        <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                          <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.Brain className="h-5 w-5 text-gray-400 flex-shrink-0" />
                            </div>
                            <h4 className="text-white font-semibold">Model Training</h4>
                          </div>
                          <p className="text-gray-400 text-sm">Train models 3x faster with immersion cooling. Renewable-powered GPU clusters with zero vendor lock-in and container-native architecture.</p>
                        </div>
                        
                        <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                          <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.BarChart3 className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                      <h4 className="text-white font-semibold">Performance Monitoring</h4>
                    </div>
                    <p className="text-gray-400 text-sm">Real-time evaluation with automatic optimization. Deploy monitoring in 48 hours vs. 6+ months for traditional infrastructure.</p>
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.Server className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                      <h4 className="text-white font-semibold">Container Deployment</h4>
                    </div>
                    <p className="text-gray-400 text-sm">Zero-migration deployment with Kubernetes orchestration. Scale from 1 to 1000 GPUs in minutes, keeping all data within Australian borders.</p>
                  </div>
                </div>
                
                
                <button 
                  onClick={() => {
                    console.log('Workflow button clicked, current state:', showWorkflowDetails);
                    setShowWorkflowDetails(!showWorkflowDetails);
                  }}
                  className="w-full bg-black border border-[#4A4A4A] text-gray-400 py-3 rounded-lg hover:bg-[#2A2A2A] hover:text-white transition-normal flex items-center justify-center relative z-10"
                >
                  <span className="font-medium mr-2">View Detailed Workflow</span>
                  <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showWorkflowDetails ? 'rotate-180' : ''}`} />
                </button>
                
                {showWorkflowDetails && (
                  <div className="mt-6">
                    <div className="bg-black/30 border border-[#4A4A4A] rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-4 text-center">Complete AI Workflow</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <Icons.Database className="h-4 w-4 text-gray-400" />
              </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Data Ingestion (Days 1-3)</h5>
                            <p className="text-gray-500 text-xs">Ingest 10TB+ datasets from S3, Snowflake, or on-prem systems. Built-in data validation, deduplication, and preprocessing pipelines with real-time streaming support.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <Icons.Brain className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Model Training (Days 4-30)</h5>
                            <p className="text-gray-500 text-xs">Distributed training across 100+ GPUs with automatic fault tolerance. Built-in experiment tracking with Weights & Biases integration and hyperparameter optimization.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <Icons.BarChart3 className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Model Validation (Days 31-45)</h5>
                            <p className="text-gray-500 text-xs">A/B testing framework with canary deployments. Real-time performance monitoring with automatic rollback and bias detection tools.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <Icons.Server className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Production Deployment (Days 46+)</h5>
                            <p className="text-gray-500 text-xs">Container orchestration with Kubernetes. Auto-scaling based on traffic patterns and global edge deployment in 48 hours.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              )}
              
              {/* Industry Applications Tab Content */}
              {activeUseCaseTab === 'industry-applications' && (
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">Industry Applications</h3>
                
                {/* Industry Solutions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.Shield className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>
                      <h4 className="text-white font-semibold">Government</h4>
                </div>
                    <p className="text-gray-400 text-sm">Process classified datasets 10x faster with air-gapped security. Defense-grade AI with ISO27001-ready infrastructure supporting Australian data residency requirements.</p>
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.Brain className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>
                      <h4 className="text-white font-semibold">Research</h4>
                </div>
                    <p className="text-gray-400 text-sm">Enable breakthrough discoveries with 95% lower carbon footprint. High-performance computing for universities and CSIRO achieving net-zero AI operations.</p>
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.Server className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      </div>
                      <h4 className="text-white font-semibold">Enterprise</h4>
                    </div>
                    <p className="text-gray-400 text-sm">Scale from 1 to 1000 GPUs in minutes with spot pricing at 40% below cloud. All data stays within Australian borders with 99.9% uptime SLA.</p>
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.Heart className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      </div>
                      <h4 className="text-white font-semibold">Healthcare</h4>
                    </div>
                    <p className="text-gray-400 text-sm">Process radiology scans 5x faster with HIPAA-compliant infrastructure. AI-powered medical imaging analysis for Australian hospitals with guaranteed data residency.</p>
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.DollarSign className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      </div>
                      <h4 className="text-white font-semibold">FinTech</h4>
                    </div>
                    <p className="text-gray-400 text-sm">Process millions of transactions with &lt;50ms latency. Real-time fraud detection with strict regulatory compliance and Australian data residency.</p>
                  </div>
                  
                  <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                        <Icons.Hammer className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      </div>
                      <h4 className="text-white font-semibold">Mining</h4>
                    </div>
                    <p className="text-gray-400 text-sm">Reduce equipment downtime by 30% with predictive maintenance. Autonomous operations with computer vision for safety monitoring and operational efficiency.</p>
                  </div>
                </div>
                
                
                <button 
                  onClick={() => {
                    console.log('Use case button clicked, current state:', showUseCaseDetails);
                    setShowUseCaseDetails(!showUseCaseDetails);
                  }}
                  className="w-full bg-black border border-[#4A4A4A] text-gray-400 py-3 rounded-lg hover:bg-[#2A2A2A] hover:text-white transition-normal flex items-center justify-center relative z-10"
                >
                  <span className="font-medium mr-2">View Detailed Use Cases</span>
                  <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showUseCaseDetails ? 'rotate-180' : ''}`} />
                </button>
                
                {showUseCaseDetails && (
                  <div className="mt-6">
                    <div className="bg-black/30 border border-[#4A4A4A] rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-4 text-center">Complete Use Cases</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <Icons.Shield className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Australian Government AI</h5>
                            <p className="text-gray-500 text-xs">Defense, healthcare, and public services with data residency</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <Icons.Brain className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Research & Academia</h5>
                            <p className="text-gray-500 text-xs">Universities and CSIRO with carbon-neutral operations</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <Icons.Server className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Australian Enterprise</h5>
                            <p className="text-gray-500 text-xs">Mining, agriculture, and finance with local support</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center flex-shrink-0">
                            <Icons.Code className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Sovereign AI Development</h5>
                            <p className="text-gray-500 text-xs">Complete data sovereignty and Australian oversight</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              )}
              
              {/* Enterprise Features Tab Content */}
              {activeUseCaseTab === 'enterprise-features' && (
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">Enterprise Features</h3>
                  
                  {/* Enterprise System Architecture */}
                  <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                            <Icons.Server className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          </div>
                          <h4 className="text-white font-semibold">Infrastructure</h4>
                        </div>
                        <p className="text-gray-400 text-sm">Modular shipping containers with immersion cooling reduce PUE to 1.05 (vs. 1.5+ for traditional data centers). Solar-powered with 80-95% renewable energy.</p>
                      </div>
                      
                      <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                            <Icons.Cloud className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          </div>
                          <h4 className="text-white font-semibold">Platform</h4>
                        </div>
                        <p className="text-gray-400 text-sm">Kubernetes orchestration with auto-scaling APIs. Deploy in hours, not weeks. Zero-migration deployment of existing Docker containers and REST APIs.</p>
                      </div>
                      
                      <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                            <Icons.Code className="h-5 w-5 text-gray-400 flex-shrink-0" />
                          </div>
                          <h4 className="text-white font-semibold">Application</h4>
                        </div>
                        <p className="text-gray-400 text-sm">Zero-downtime deployments with automatic rollback and canary releases. Custom AI workloads with native Kubernetes orchestration.</p>
                      </div>
                    </div>
                  </div>

                  {/* vs. Cloud Providers Comparison */}
                  <div className="mb-8 bg-black/30 border border-[#4A4A4A] rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-4 text-center">MODRON vs. Cloud Providers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-white font-medium text-sm mb-2">Cost Savings</h5>
                        <p className="text-gray-400 text-xs">40-70% lower than AWS/GCP/Azure with spot instances up to 70% savings and predictable reserved capacity pricing.</p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-sm mb-2">Data Residency</h5>
                        <p className="text-gray-400 text-xs">100% Australian data residency vs. uncertain cloud locations. Guaranteed compliance with Australian regulations.</p>
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-sm mb-2">Environmental Impact</h5>
                        <p className="text-gray-400 text-xs">95% lower carbon footprint vs. traditional cloud. 80-95% renewable energy with automatic ESG reporting.</p>
                      </div>
                    </div>
                  </div>
            
                  {/* Key Enterprise Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Always-on Availability */}
                    <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                          <Icons.Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        </div>
                        <h4 className="text-white font-semibold">Always-on Availability</h4>
                      </div>
                      <p className="text-gray-400 text-sm">99.9% uptime SLA with automatic failover in under 1 second (vs. cloud&apos;s 99.95% with 30s+ failover) for mission-critical production systems.</p>
                    </div>

                    {/* Clean Energy Credits */}
                    <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                          <Icons.Award className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        </div>
                        <h4 className="text-white font-semibold">Clean Energy Credits</h4>
                      </div>
                      <p className="text-gray-400 text-sm">80-95% renewable energy with automatic carbon reporting for ESG compliance. Achieve net-zero certification with transparent environmental metrics.</p>
                    </div>

                    {/* Custom Containers & APIs */}
                    <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                          <Icons.Settings className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        </div>
                        <h4 className="text-white font-semibold">Custom Containers & APIs</h4>
                      </div>
                      <p className="text-gray-400 text-sm">Zero-migration deployment of existing Docker containers and REST APIs. Native Kubernetes orchestration with full compatibility.</p>
                    </div>

                    {/* Spot & Reserved Instances */}
                    <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                          <Icons.Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        </div>
                        <h4 className="text-white font-semibold">Spot & Reserved Instances</h4>
                      </div>
                      <p className="text-gray-400 text-sm">Flexible pricing with spot instances (up to 70% savings) and reserved capacity (predictable costs). Average customer saves $500K/year vs. cloud.</p>
                    </div>

                    {/* Remote Monitoring */}
                    <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                          <Icons.Eye className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        </div>
                        <h4 className="text-white font-semibold">Remote Monitoring</h4>
                      </div>
                      <p className="text-gray-400 text-sm">Real-time performance dashboards with automated alerts and predictive maintenance. 24/7 incident management with &lt;1s response time.</p>
                    </div>

                    {/* Compliance & Security */}
                    <div className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:border-[#4A4A4A] transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#4A4A4A] flex items-center justify-center mr-3 flex-shrink-0">
                          <Icons.Shield className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        </div>
                        <h4 className="text-white font-semibold">Compliance & Security</h4>
                      </div>
                      <p className="text-gray-400 text-sm">Australian data residency with ISO27001-ready infrastructure. End-to-end encryption with air-gapped deployment options for classified workloads.</p>
                    </div>
            </div>
              </div>
              )}
              
              {/* GPU Solutions Tab Content - Enhanced with Detailed Specifications */}
              {activeUseCaseTab === 'gpu-solutions' && (
                <section 
                  id="gpu-solutions" 
                  aria-labelledby="gpu-solutions-heading"
                  className="relative z-10 animate-in fade-in duration-300"
                >
                  <h2 id="gpu-solutions-heading" className="text-lg sm:text-xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                    <Image 
                      src="/MODRON_ICON.png" 
                      alt="MODRON" 
                      width={24} 
                      height={24} 
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    />
                    GPU Product Specifications
                  </h2>
                  
                  <p className="text-gray-400 text-center mb-6 max-w-3xl mx-auto leading-relaxed px-4 text-sm">
                    Choose the right GPU configuration for your workload. All GPUs are Australian-assembled, immersion-cooled, and optimized for performance. Renewable energy options available with solar-powered infrastructure.
                  </p>
                  
                  {/* GPU Product Cards Grid - More Compact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto mb-6 px-4 sm:px-0">
                    
                    {/* NVIDIA GB300 Blackwell - Next-Gen Research */}
                    <div 
                      className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:bg-[#d5aaf9]/10 transition-colors duration-300 relative"
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current['gb300']) {
                          clearTimeout(hoverTimeoutRef.current['gb300'])
                        }
                        
                        setHoveredGpu('gb300')
                        const video = videoRefs.current['gb300']
                        if (video && videosInView.has('gb300')) {
                          hoverTimeoutRef.current['gb300'] = setTimeout(() => {
                            if (video.readyState >= 2) {
                              video.play().catch(() => {})
                            } else {
                              video.load()
                              video.addEventListener('canplay', () => {
                                video.play().catch(() => {})
                              }, { once: true })
                            }
                          }, 50)
                        }
                      }}
                      onMouseLeave={() => {
                        if (hoverTimeoutRef.current['gb300']) {
                          clearTimeout(hoverTimeoutRef.current['gb300'])
                        }
                        
                        setHoveredGpu(null)
                        const video = videoRefs.current['gb300']
                        if (video) {
                          video.pause()
                          video.currentTime = 0
                        }
                      }}
                    >
                      <div className="mb-3">
                        <div 
                          ref={(el) => { videoIntersectionRefs.current['gb300'] = el }}
                          className="relative w-full aspect-[16/9] bg-black/70 rounded-lg p-2 border border-[#4A4A4A] flex items-center justify-center group-hover:border-[#4A4A4A] transition-colors overflow-hidden"
                          style={{ contain: 'layout style paint' }}
                        >
                          {!imageErrors['gb300'] ? (
                            <>
                              {!imageLoaded['gb300'] && (
                                <div className="absolute inset-0 animate-pulse bg-[#1A1A1A] rounded-lg" />
                              )}
                              {/* Thumbnail Image */}
                              <Image 
                                src="/gpus/MODRON_GB300.png" 
                                alt="NVIDIA GB300 Blackwell GPU" 
                                width={400}
                                height={225}
                                className={`absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500 ${
                                  hoveredGpu === 'gb300' ? 'opacity-0' : 'opacity-100'
                                }`}
                                loading="lazy"
                                onLoad={() => setImageLoaded(prev => ({ ...prev, gb300: true }))}
                                onError={() => setImageErrors(prev => ({ ...prev, gb300: true }))}
                              />
                              {/* Hover Video - Lazy loaded */}
                              {videosInView.has('gb300') && (
                                <video
                                  ref={(el) => { videoRefs.current['gb300'] = el }}
                                  src="/gpus/MODRON_GB300_animate.mp4"
                                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                                    hoveredGpu === 'gb300' ? 'opacity-100' : 'opacity-0'
                                  }`}
                                  style={{
                                    willChange: hoveredGpu === 'gb300' ? 'opacity' : 'auto',
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                  }}
                                  loop
                                  muted
                                  playsInline
                                  preload="none"
                                  onLoadedData={(e) => {
                                    if (hoveredGpu === 'gb300') {
                                      e.currentTarget.play().catch(() => {})
                                    }
                                  }}
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full rounded-lg bg-[#2A2A2A] border border-[#4A4A4A] flex items-center justify-center">
                              <Icons.Zap className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-center mb-3">
                        <h3 className="text-white font-bold text-base mb-1">NVIDIA GB300 Blackwell</h3>
                        <p className="text-gray-400 font-medium text-xs mb-2">Next-Gen Research & Massive Models</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          <span className="px-1.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#4A4A4A] text-gray-400 text-[10px] font-medium">
                            Research
                          </span>
                          <span className="px-1.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#4A4A4A] text-gray-400 text-[10px] font-medium">
                            Massive Models
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 mb-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Memory:</span>
                          <span className="text-white font-medium">192GB HBM3e</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Bandwidth:</span>
                          <span className="text-white font-medium">8TB/s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Architecture:</span>
                          <span className="text-white font-medium">Blackwell</span>
                        </div>
                      </div>
                      
                      <details className="mb-3">
                        <summary className="text-gray-300 text-xs cursor-pointer hover:text-white transition-colors flex items-center justify-between list-none">
                          <span>More Details</span>
                          <Icons.ChevronDown className={`h-3 w-3 transition-transform duration-200 text-gray-400 ${expandedSpecs['gb300'] ? 'rotate-180' : ''}`} />
                        </summary>
                        <div className="mt-2 pt-2 border-t border-[#4A4A4A] text-xs space-y-1">
                          <div className="flex items-start">
                            <Icons.CheckCircle className="h-3 w-3 mr-1.5 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-400">Next-generation Blackwell architecture</span>
                          </div>
                          <div className="flex items-start">
                            <Icons.CheckCircle className="h-3 w-3 mr-1.5 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-400">Massive model training capability</span>
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* NVIDIA H200 - Enterprise Training */}
                    <div 
                      className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:bg-[#d5aaf9]/10 transition-colors duration-300 relative"
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current['h200']) {
                          clearTimeout(hoverTimeoutRef.current['h200'])
                        }
                        
                        setHoveredGpu('h200')
                        const video = videoRefs.current['h200']
                        if (video && videosInView.has('h200')) {
                          hoverTimeoutRef.current['h200'] = setTimeout(() => {
                            if (video.readyState >= 2) {
                              video.play().catch(() => {})
                            } else {
                              video.load()
                              video.addEventListener('canplay', () => {
                                video.play().catch(() => {})
                              }, { once: true })
                            }
                          }, 50)
                        }
                      }}
                      onMouseLeave={() => {
                        if (hoverTimeoutRef.current['h200']) {
                          clearTimeout(hoverTimeoutRef.current['h200'])
                        }
                        
                        setHoveredGpu(null)
                        const video = videoRefs.current['h200']
                        if (video) {
                          video.pause()
                          video.currentTime = 0
                        }
                      }}
                    >
                      {/* GPU Image - Widescreen Style - Larger */}
                      <div className="mb-3">
                        <div 
                          ref={(el) => { videoIntersectionRefs.current['h200'] = el }}
                          className="relative w-full aspect-[16/9] bg-black/70 rounded-lg p-2 border border-[#4A4A4A] flex items-center justify-center group-hover:border-[#4A4A4A] transition-colors overflow-hidden"
                          style={{ contain: 'layout style paint' }}
                        >
                          {!imageErrors['h200'] ? (
                            <>
                              {!imageLoaded['h200'] && (
                                <div className="absolute inset-0 animate-pulse bg-[#1A1A1A] rounded-lg" />
                              )}
                              {/* Thumbnail Image */}
                              <Image 
                                src="/gpus/MODRON_h200.png" 
                                alt="NVIDIA H200 GPU" 
                                width={400}
                                height={225}
                                className={`absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500 ${
                                  hoveredGpu === 'h200' ? 'opacity-0' : 'opacity-100'
                                }`}
                                loading="lazy"
                                onLoad={() => setImageLoaded(prev => ({ ...prev, h200: true }))}
                                onError={() => setImageErrors(prev => ({ ...prev, h200: true }))}
                              />
                              {/* Hover Video - Lazy loaded */}
                              {videosInView.has('h200') && (
                                <video
                                  ref={(el) => { videoRefs.current['h200'] = el }}
                                  src="/gpus/MODRON_h200_animate.mp4"
                                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                                    hoveredGpu === 'h200' ? 'opacity-100' : 'opacity-0'
                                  }`}
                                  style={{
                                    willChange: hoveredGpu === 'h200' ? 'opacity' : 'auto',
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                  }}
                                  loop
                                  muted
                                  playsInline
                                  preload="none"
                                  onLoadedData={(e) => {
                                    if (hoveredGpu === 'h200') {
                                      e.currentTarget.play().catch(() => {})
                                    }
                                  }}
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full rounded-lg bg-[#2A2A2A] border border-[#4A4A4A] flex items-center justify-center">
                              <Icons.Zap className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Title and Badges - Compact */}
                      <div className="text-center mb-3">
                        <h3 className="text-white font-bold text-base mb-1">NVIDIA H200</h3>
                        <p className="text-gray-400 font-medium text-xs mb-2">Enterprise Training & LLMs</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          <span className="px-1.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#4A4A4A] text-gray-400 text-[10px] font-medium">
                            LLMs
                          </span>
                          <span className="px-1.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#4A4A4A] text-gray-400 text-[10px] font-medium">
                            Enterprise
                          </span>
                        </div>
                      </div>
                      
                      {/* Key Specs - Inline */}
                      <div className="space-y-1.5 mb-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Memory:</span>
                          <span className="text-white font-medium">141GB HBM3e</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Bandwidth:</span>
                          <span className="text-white font-medium">4.8TB/s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Architecture:</span>
                          <span className="text-white font-medium">Hopper</span>
                        </div>
                      </div>
                      
                      {/* Expandable Details */}
                      <details className="mb-3">
                        <summary className="text-gray-300 text-xs cursor-pointer hover:text-white transition-colors flex items-center justify-between list-none">
                          <span>More Details</span>
                          <Icons.ChevronDown className={`h-3 w-3 transition-transform duration-200 text-gray-400 ${expandedSpecs['h200'] ? 'rotate-180' : ''}`} />
                        </summary>
                        <div className="mt-2 pt-2 border-t border-[#4A4A4A] text-xs space-y-1">
                          <div className="flex items-start">
                            <Icons.CheckCircle className="h-3 w-3 mr-1.5 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-400">Exceptional inference performance</span>
                          </div>
                          <div className="flex items-start">
                            <Icons.CheckCircle className="h-3 w-3 mr-1.5 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-400">Memory-intensive applications</span>
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* RTX PRO 6000 - Development */}
                    <div 
                      className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:bg-[#d5aaf9]/10 transition-colors duration-300 relative"
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current['rtx6000']) {
                          clearTimeout(hoverTimeoutRef.current['rtx6000'])
                        }
                        
                        setHoveredGpu('rtx6000')
                        const video = videoRefs.current['rtx6000']
                        if (video && videosInView.has('rtx6000')) {
                          hoverTimeoutRef.current['rtx6000'] = setTimeout(() => {
                            if (video.readyState >= 2) {
                              video.play().catch(() => {})
                            } else {
                              video.load()
                              video.addEventListener('canplay', () => {
                                video.play().catch(() => {})
                              }, { once: true })
                            }
                          }, 50)
                        }
                      }}
                      onMouseLeave={() => {
                        if (hoverTimeoutRef.current['rtx6000']) {
                          clearTimeout(hoverTimeoutRef.current['rtx6000'])
                        }
                        
                        setHoveredGpu(null)
                        const video = videoRefs.current['rtx6000']
                        if (video) {
                          video.pause()
                          video.currentTime = 0
                        }
                      }}
                    >
                      <div className="mb-3">
                        <div 
                          ref={(el) => { videoIntersectionRefs.current['rtx6000'] = el }}
                          className="relative w-full aspect-[16/9] bg-black/70 rounded-lg p-2 border border-[#4A4A4A] flex items-center justify-center group-hover:border-[#4A4A4A] transition-colors overflow-hidden"
                          style={{ contain: 'layout style paint' }}
                        >
                          {!imageErrors['rtx6000'] ? (
                            <>
                              {!imageLoaded['rtx6000'] && (
                                <div className="absolute inset-0 animate-pulse bg-[#1A1A1A] rounded-lg" />
                              )}
                              {/* Thumbnail Image */}
                              <Image 
                                src="/gpus/MODRON_rtx6000.png" 
                                alt="NVIDIA RTX PRO 6000 GPU" 
                                width={400}
                                height={225}
                                className={`absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500 ${
                                  hoveredGpu === 'rtx6000' ? 'opacity-0' : 'opacity-100'
                                }`}
                                loading="lazy"
                                onLoad={() => setImageLoaded(prev => ({ ...prev, rtx6000: true }))}
                                onError={() => setImageErrors(prev => ({ ...prev, rtx6000: true }))}
                              />
                              {/* Hover Video - Lazy loaded */}
                              {videosInView.has('rtx6000') && (
                                <video
                                  ref={(el) => { videoRefs.current['rtx6000'] = el }}
                                  src="/gpus/MODRON_rtx6000_animate.mp4"
                                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                                    hoveredGpu === 'rtx6000' ? 'opacity-100' : 'opacity-0'
                                  }`}
                                  style={{
                                    willChange: hoveredGpu === 'rtx6000' ? 'opacity' : 'auto',
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                  }}
                                  loop
                                  muted
                                  playsInline
                                  preload="none"
                                  onLoadedData={(e) => {
                                    if (hoveredGpu === 'rtx6000') {
                                      e.currentTarget.play().catch(() => {})
                                    }
                                  }}
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full rounded-lg bg-[#2A2A2A] border border-[#4A4A4A] flex items-center justify-center">
                              <Icons.Code className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-center mb-3">
                        <h3 className="text-white font-bold text-base mb-1">RTX PRO 6000</h3>
                        <p className="text-gray-400 font-medium text-xs mb-2">Development & Prototyping</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          <span className="px-1.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#4A4A4A] text-gray-400 text-[10px] font-medium">
                            Development
                          </span>
                          <span className="px-1.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#4A4A4A] text-gray-400 text-[10px] font-medium">
                            Cost-Effective
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 mb-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Memory:</span>
                          <span className="text-white font-medium">48GB GDDR6</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Bandwidth:</span>
                          <span className="text-white font-medium">960GB/s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Architecture:</span>
                          <span className="text-white font-medium">Ada Lovelace</span>
                        </div>
                      </div>
                      
                      <details className="mb-3">
                        <summary className="text-gray-300 text-xs cursor-pointer hover:text-white transition-colors flex items-center justify-between list-none">
                          <span>More Details</span>
                          <Icons.ChevronDown className={`h-3 w-3 transition-transform duration-200 text-gray-400 ${expandedSpecs['rtx6000'] ? 'rotate-180' : ''}`} />
                        </summary>
                        <div className="mt-2 pt-2 border-t border-[#4A4A4A] text-xs space-y-1">
                          <div className="flex items-start">
                            <Icons.CheckCircle className="h-3 w-3 mr-1.5 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-400">Cost-optimized for development</span>
                          </div>
                          <div className="flex items-start">
                            <Icons.CheckCircle className="h-3 w-3 mr-1.5 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-400">High inference performance</span>
                          </div>
                        </div>
                      </details>
                    </div>

                    {/* NVIDIA L40S - AI Inference */}
                    <div 
                      className="bg-black/50 rounded-lg p-4 border border-[#4A4A4A] group hover:bg-[#d5aaf9]/10 transition-colors duration-300 relative"
                      onMouseEnter={() => {
                        if (hoverTimeoutRef.current['l40s']) {
                          clearTimeout(hoverTimeoutRef.current['l40s'])
                        }
                        
                        setHoveredGpu('l40s')
                        const video = videoRefs.current['l40s']
                        if (video && videosInView.has('l40s')) {
                          hoverTimeoutRef.current['l40s'] = setTimeout(() => {
                            if (video.readyState >= 2) {
                              video.play().catch(() => {})
                            } else {
                              video.load()
                              video.addEventListener('canplay', () => {
                                video.play().catch(() => {})
                              }, { once: true })
                            }
                          }, 50)
                        }
                      }}
                      onMouseLeave={() => {
                        if (hoverTimeoutRef.current['l40s']) {
                          clearTimeout(hoverTimeoutRef.current['l40s'])
                        }
                        
                        setHoveredGpu(null)
                        const video = videoRefs.current['l40s']
                        if (video) {
                          video.pause()
                          video.currentTime = 0
                        }
                      }}
                    >
                      <div className="mb-3">
                        <div 
                          ref={(el) => { videoIntersectionRefs.current['l40s'] = el }}
                          className="relative w-full aspect-[16/9] bg-black/70 rounded-lg p-2 border border-[#4A4A4A] flex items-center justify-center group-hover:border-[#4A4A4A] transition-colors overflow-hidden"
                          style={{ contain: 'layout style paint' }}
                        >
                          {!imageErrors['l40s'] ? (
                            <>
                              {!imageLoaded['l40s'] && (
                                <div className="absolute inset-0 animate-pulse bg-[#1A1A1A] rounded-lg" />
                              )}
                              {/* Thumbnail Image */}
                              <Image 
                                src="/gpus/MODRON_l40s.png" 
                                alt="NVIDIA L40S GPU" 
                                width={400}
                                height={225}
                                className={`absolute inset-0 w-full h-full object-contain z-10 transition-opacity duration-500 ${
                                  hoveredGpu === 'l40s' ? 'opacity-0' : 'opacity-100'
                                }`}
                                loading="lazy"
                                onLoad={() => setImageLoaded(prev => ({ ...prev, l40s: true }))}
                                onError={() => setImageErrors(prev => ({ ...prev, l40s: true }))}
                              />
                              {/* Hover Video - Lazy loaded */}
                              {videosInView.has('l40s') && (
                                <video
                                  ref={(el) => { videoRefs.current['l40s'] = el }}
                                  src="/gpus/MODRON_l40s_animate.mp4"
                                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                                    hoveredGpu === 'l40s' ? 'opacity-100' : 'opacity-0'
                                  }`}
                                  style={{
                                    willChange: hoveredGpu === 'l40s' ? 'opacity' : 'auto',
                                    transform: 'translateZ(0)',
                                    backfaceVisibility: 'hidden',
                                  }}
                                  loop
                                  muted
                                  playsInline
                                  preload="none"
                                  onLoadedData={(e) => {
                                    if (hoveredGpu === 'l40s') {
                                      e.currentTarget.play().catch(() => {})
                                    }
                                  }}
                                />
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full rounded-lg bg-[#2A2A2A] border border-[#4A4A4A] flex items-center justify-center">
                              <Icons.Gauge className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-center mb-3">
                        <h3 className="text-white font-bold text-base mb-1">NVIDIA L40S</h3>
                        <p className="text-gray-400 font-medium text-xs mb-2">AI Inference & Visual Computing</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          <span className="px-1.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#4A4A4A] text-gray-400 text-[10px] font-medium">
                            Inference
                          </span>
                          <span className="px-1.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#4A4A4A] text-gray-400 text-[10px] font-medium">
                            Visual
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5 mb-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Memory:</span>
                          <span className="text-white font-medium">48GB GDDR6</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Bandwidth:</span>
                          <span className="text-white font-medium">864GB/s</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Architecture:</span>
                          <span className="text-white font-medium">Ada Lovelace</span>
                        </div>
                      </div>
                      
                      <details className="mb-3">
                        <summary className="text-gray-300 text-xs cursor-pointer hover:text-white transition-colors flex items-center justify-between list-none">
                          <span>More Details</span>
                          <Icons.ChevronDown className={`h-3 w-3 transition-transform duration-200 text-gray-400 ${expandedSpecs['l40s'] ? 'rotate-180' : ''}`} />
                        </summary>
                        <div className="mt-2 pt-2 border-t border-[#4A4A4A] text-xs space-y-1">
                          <div className="flex items-start">
                            <Icons.CheckCircle className="h-3 w-3 mr-1.5 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-400">Tensor Cores for inference</span>
                          </div>
                          <div className="flex items-start">
                            <Icons.CheckCircle className="h-3 w-3 mr-1.5 text-gray-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-gray-400">AI-powered graphics</span>
                          </div>
                        </div>
                      </details>
                    </div>

                  </div>

                  {/* Compact Comparison Button */}
                  <div className="text-center mb-4">
                    <button
                      onClick={() => setShowComparison(!showComparison)}
                      className="px-4 py-2 bg-black border border-[#4A4A4A] text-white rounded-lg hover:bg-[#2A2A2A] hover:border-[#32ca73]/50 transition-all duration-200 flex items-center justify-center mx-auto text-sm"
                      aria-expanded={showComparison}
                      aria-controls="gpu-comparison-table"
                    >
                      <Icons.BarChart3 className="h-3 w-3 mr-2" aria-hidden="true" />
                      {showComparison ? 'Hide' : 'Compare'} GPUs
                    </button>
                  </div>

                  {/* GPU Comparison Table - Compact */}
                  {showComparison && (
                    <div id="gpu-comparison-table" className="bg-black/30 border border-[#4A4A4A] rounded-lg p-4 mb-4 max-w-6xl mx-auto animate-in fade-in duration-300">
                      <h3 className="text-white font-bold text-base mb-4 text-center">GPU Comparison</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-[#4A4A4A]">
                              <th className="text-left p-2 text-white font-semibold">GPU Model</th>
                              <th className="text-center p-2 text-white font-semibold">Memory</th>
                              <th className="text-center p-2 text-white font-semibold">Bandwidth</th>
                              <th className="text-center p-2 text-white font-semibold">Best For</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-[#4A4A4A]/50">
                              <td className="p-2 text-white font-medium">NVIDIA GB300 Blackwell</td>
                              <td className="p-2 text-center text-gray-300">192GB HBM3e</td>
                              <td className="p-2 text-center text-gray-300">8TB/s</td>
                              <td className="p-2 text-center text-gray-400">Research, Massive Models</td>
                            </tr>
                            <tr className="border-b border-[#4A4A4A]/50">
                              <td className="p-2 text-white font-medium">NVIDIA H200</td>
                              <td className="p-2 text-center text-gray-300">141GB HBM3e</td>
                              <td className="p-2 text-center text-gray-300">4.8TB/s</td>
                              <td className="p-2 text-center text-gray-400">LLMs, Enterprise</td>
                            </tr>
                            <tr className="border-b border-[#4A4A4A]/50">
                              <td className="p-2 text-white font-medium">RTX PRO 6000</td>
                              <td className="p-2 text-center text-gray-300">48GB GDDR6</td>
                              <td className="p-2 text-center text-gray-300">960GB/s</td>
                              <td className="p-2 text-center text-gray-400">Development</td>
                            </tr>
                            <tr>
                              <td className="p-2 text-white font-medium">NVIDIA L40S</td>
                              <td className="p-2 text-center text-gray-300">48GB GDDR6</td>
                              <td className="p-2 text-center text-gray-300">864GB/s</td>
                              <td className="p-2 text-center text-gray-400">Inference, Visual</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </section>
              )}
                      </div>
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      {/* Clean spacing between sections */}
      <div className="h-16 md:h-24 bg-black"></div>

      {/* Pricing Section */}
      <section id="pricing" className="nav-trigger-pricing relative py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 sm:mb-12 tracking-tight">
                Transparent, Competitive Pricing
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
                Flexible deployment options: on-premises infrastructure or campus compute rental. Competitive rates with built-in sustainability. No hidden costs, no carbon guilt.
              </p>
            </div>

            {/* Competitive Comparison */}
            <div className="mb-16 sm:mb-20">

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[800px] sm:min-w-0">
                  <table className="w-full bg-black border border-[#4A4A4A] rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-[#262626]/50">
                        <th className="text-left p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Provider</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Price/hr (AUD)</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Renewable Energy</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Australian Assembly</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Deployment Speed</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Data Residency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#333333] bg-[#d5aaf9]/10 modron-highlight-row">
                        <td className="p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">
                          <div className="flex items-center gap-2">
                            <Image 
                              src="/MODRON_ICON.png" 
                              alt="MODRON" 
                              width={24} 
                              height={24} 
                              className="w-5 h-5 sm:w-6 sm:h-6"
                            />
                            <span>MODRON</span>
                          </div>
                        </td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">$0.54–$0.90</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">80–95%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">Yes - Local Manufacturing</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">48 hours</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">100% Australian</td>
                      </tr>
                      <tr className="border-t border-[#333333] pricing-table-row">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">AWS</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$1.20+</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">20-30%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">No - Imported</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Weeks/Months</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">International</td>
                      </tr>
                      <tr className="border-t border-[#333333] pricing-table-row">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">GCP</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$1.10+</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">25-35%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">No - Imported</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Weeks/Months</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">International</td>
                      </tr>
                      <tr className="border-t border-[#333333] pricing-table-row">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">Lambda Labs</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$0.90</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">40-50%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">No - Imported</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Weeks/Months</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">International</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {/* MODRON Card - Highlighted */}
                <div className="bg-gradient-to-br from-[#d5aaf9]/15 to-[#32ca73]/10 border-2 border-[#d5aaf9]/40 rounded-xl p-5 shadow-lg shadow-[#d5aaf9]/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Image 
                        src="/MODRON_ICON.png" 
                        alt="MODRON" 
                        width={24} 
                        height={24} 
                        className="w-6 h-6"
                      />
                      <h4 className="text-white font-bold text-lg">MODRON</h4>
                    </div>
                    <span className="text-[#32ca73] font-bold text-xl">$0.54–$0.90</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Renewable</span>
                      <span className="text-[#32ca73] font-semibold">80–95%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Assembly</span>
                      <span className="text-[#32ca73] font-semibold">Australian</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Deployment</span>
                      <span className="text-[#32ca73] font-semibold">48 hours</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Data Residency</span>
                      <span className="text-[#32ca73] font-semibold">100% AU</span>
                    </div>
                  </div>
                </div>

                {/* AWS Card */}
                <div className="bg-black/50 border border-[#4A4A4A] rounded-xl p-4 opacity-70">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-bold text-base">AWS</h4>
                    <span className="text-[#CCCCCC] font-bold text-base">~$1.20+</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Renewable</span>
                      <span className="text-[#CCCCCC] font-semibold">20-30%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Assembly</span>
                      <span className="text-[#CCCCCC] font-semibold">No</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Deployment</span>
                      <span className="text-[#CCCCCC] font-semibold">Weeks/Months</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Data Residency</span>
                      <span className="text-[#CCCCCC] font-semibold">International</span>
                    </div>
                  </div>
                </div>

                {/* GCP Card */}
                <div className="bg-black/50 border border-[#4A4A4A] rounded-xl p-4 opacity-70">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-bold text-base">GCP</h4>
                    <span className="text-[#CCCCCC] font-bold text-base">~$1.10+</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Renewable</span>
                      <span className="text-[#CCCCCC] font-semibold">25-35%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Assembly</span>
                      <span className="text-[#CCCCCC] font-semibold">No</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Deployment</span>
                      <span className="text-[#CCCCCC] font-semibold">Weeks/Months</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Data Residency</span>
                      <span className="text-[#CCCCCC] font-semibold">International</span>
                    </div>
                  </div>
                </div>

                {/* Lambda Labs Card */}
                <div className="bg-black/50 border border-[#4A4A4A] rounded-xl p-4 opacity-70">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-bold text-base">Lambda Labs</h4>
                    <span className="text-[#CCCCCC] font-bold text-base">~$0.90</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Renewable</span>
                      <span className="text-[#CCCCCC] font-semibold">40-50%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Assembly</span>
                      <span className="text-[#CCCCCC] font-semibold">No</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Deployment</span>
                      <span className="text-[#CCCCCC] font-semibold">Weeks/Months</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#999999] text-xs mb-1">Data Residency</span>
                      <span className="text-[#CCCCCC] font-semibold">International</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-[#999999] text-sm">
                  * Prices shown for equivalent high-performance GPU instances. Contact us for specific GPU configurations and pricing.
                </p>
              </div>
            </div>

            {/* Pre-Launch Offer - BACKUP (COMMENTED OUT) */}
            {/* 
            <div className="bg-gradient-to-br from-[#d5aaf9]/20 to-[#fbff52]/20 border border-[#d5aaf9]/30 rounded-2xl p-8 sm:p-12 text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-[#d5aaf9] to-[#fbff52] rounded-xl flex items-center justify-center">
                <Icons.Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Pre-Launch Offer
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[#CCCCCC] mb-6 sm:mb-8 max-w-2xl mx-auto">
                Early waitlist members receive priority access to new clusters and pre-launch pricing for the first 6 months.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center text-primary-cyan font-bold text-base sm:text-lg">
                  <Icons.Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Priority Access
                </div>
                <div className="flex items-center text-primary-cyan font-bold text-base sm:text-lg">
                  <Icons.CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Pre-Launch Pricing
                </div>
                <div className="flex items-center text-primary-cyan font-bold text-base sm:text-lg">
                  <Icons.Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  6 Months Duration
                </div>
              </div>
              <WaitlistModal />
            </div>
            */}

            {/* Pre-Launch Offer - ENHANCED VERSION - HIDDEN */}
            {/* 
            <div className="bg-gradient-to-br from-[#d5aaf9]/20 to-[#fbff52]/20 border border-[#d5aaf9]/30 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-2 h-2 bg-[#fbff52]/30 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-[#32ca73]/40 rounded-full animate-ping"></div>
                <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-[#d5aaf9]/20 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-10 w-1 h-1 bg-[#fbff52]/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-[#32ca73]/15 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              </div>

              <div className="mx-auto mb-6 w-16 h-16 rounded-xl flex items-center justify-center relative group" style={{ backgroundColor: '#d5aaf9' }}>
                <Icons.Star className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" style={{ backgroundColor: '#d5aaf9' }}></div>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Pre-Launch Offer
              </h3>
              
              <p className="text-base sm:text-lg md:text-xl text-[#CCCCCC] mb-6 sm:mb-8 max-w-2xl mx-auto">
                Early waitlist members receive priority access to new clusters and pre-launch pricing for the first 6 months.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-[#fbff52]/10 border border-[#fbff52]/20 rounded-xl p-4 hover:bg-[#fbff52]/20 hover:border-[#fbff52]/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.Clock className="h-6 w-6 text-primary-cyan group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-primary-cyan font-bold text-sm">Priority Access</p>
                    <p className="text-[#999999] text-xs mt-1">Skip the queue</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-[#32ca73]/10 border border-[#d5aaf9]/20 rounded-xl p-4 hover:bg-[#32ca73]/20 hover:border-[#d5aaf9]/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.CheckCircle className="h-6 w-6 text-[#32ca73] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-[#32ca73] font-bold text-sm">Pre-Launch Pricing</p>
                    <p className="text-[#999999] text-xs mt-1">Exclusive rates</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-[#32ca73]/10 border border-[#d5aaf9]/20 rounded-xl p-4 hover:bg-[#32ca73]/20 hover:border-[#d5aaf9]/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.Zap className="h-6 w-6 text-[#32ca73] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-[#32ca73] font-bold text-sm">6 Months Duration</p>
                    <p className="text-[#999999] text-xs mt-1">Limited time</p>
                  </div>
                </div>
              </div>

              <EnhancedBookingButton />
            </div>
            */}
          </div>
          
          {/* Competitive Comparison Progressive Disclosure */}
          <div className="text-center mt-12 sm:mt-16 md:mt-20">
            <button
              onClick={() => {
                console.log('Competitive Comparison button clicked, current state:', showCompetitiveComparison);
                setShowCompetitiveComparison(!showCompetitiveComparison);
              }}
              className="w-full bg-black border border-[#4A4A4A] text-gray-400 py-3 rounded-lg hover:bg-[#2A2A2A] hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto"
            >
              <span className="font-medium mr-2">View Competitive Comparison</span>
              <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showCompetitiveComparison ? 'rotate-180' : ''}`} />
            </button>
            
            {showCompetitiveComparison && (
              <div className="mt-8">
                <DynamicComparison />
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      {/* Clean spacing between sections */}
      <div className="h-16 md:h-24 bg-black"></div>

      {/* CTA / Contact Section */}
      <section id="contact" className="nav-trigger-contact relative py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 sm:mb-12 tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#CCCCCC] mb-4 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Deploy sovereign AI infrastructure on-premises or access our campus facilities. Get in touch to discuss your requirements.
            </p>
            <p className="text-sm sm:text-base text-[#999999] mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-4">
              We respond within 24 hours.
            </p>
            

            {/* Contact Form - Mobile: Progressive Disclosure */}
            <div className="md:hidden">
              <div className="text-center mb-6">
                <button
                  onClick={() => {
                    console.log('Contact Form button clicked, current state:', showContactForm);
                    setShowContactForm(!showContactForm);
                  }}
                  className="w-full bg-black border border-[#4A4A4A] text-gray-400 py-3 rounded-lg hover:bg-[#2A2A2A] hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto"
                >
                  <span className="font-medium mr-2">Get in Touch</span>
                  <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showContactForm ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {showContactForm && (
                <div className="bg-black border border-[#4A4A4A] rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
              <EnhancedForm />
            </div>
              )}
            </div>
            
            {/* Contact Form - Desktop: Always Visible */}
            <div className="hidden md:block">
              <div className="bg-black border border-[#4A4A4A] rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
                {/* Contact form submits to /api/contact with email sending enabled */}
                <EnhancedForm />
              </div>
            </div>
          </div>
        </div>
      </section>


      </main>

      {/* Animated Divider */}
      {/* Clean spacing before footer */}
      <div className="h-12 md:h-16 bg-black"></div>
      
      {/* Footer */}
      <footer className="bg-black" role="contentinfo">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">

            {/* Footer Links with Logo */}
            <div className="pt-6 sm:pt-8">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6 xl:space-x-8 text-xs sm:text-sm text-[#666666] px-4">
                {/* Logo as first item */}
                <div className="flex items-center justify-center min-h-[44px] min-w-[44px]">
                  <img 
                    src="/MODRON_ICON.png" 
                    alt="MODRON" 
                    className="w-8 h-8 sm:w-10 sm:h-10"
                    loading="lazy"
                  />
                </div>
                <span>&copy; 2025. All rights reserved.</span>
                <a href="/privacy" className="hover:text-[#999999] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">Privacy Policy</a>
                <a href="/terms" className="hover:text-[#999999] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">Terms of Service</a>
                <a href="/cookies" className="hover:text-[#999999] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

        </div>

    </MobileViewport>
  );
}

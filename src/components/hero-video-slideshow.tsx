"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"

interface VideoSlide {
  videoSrc: string
  poster?: string
  headline: string
  subheading: string
  description: string
}

interface HeroVideoSlideshowProps {
  slides: VideoSlide[]
  overlayOpacity?: number
  autoPlayInterval?: number // milliseconds between slides
  className?: string
  onSlideChange?: (index: number) => void
}

export function HeroVideoSlideshow({
  slides,
  overlayOpacity = 0.4,
  autoPlayInterval = 8000, // 8 seconds default
  className = "",
  onSlideChange,
}: HeroVideoSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true) // Default to true
  const [isMounted, setIsMounted] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const abortControllersRef = useRef<Map<number, AbortController>>(new Map())
  const errorCountRef = useRef<Map<number, number>>(new Map())

  // Ensure component is mounted before doing client-only operations
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check for reduced motion preference
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Get optimal preload strategy based on device capabilities
  const getOptimalPreload = useCallback((index: number, isActive: boolean, isNext: boolean) => {
    if (typeof window === "undefined") return "none"
    
    // Check device capabilities
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    const deviceMemory = (navigator as any).deviceMemory
    const hardwareConcurrency = navigator.hardwareConcurrency || 2
    
    // Low-end devices: more conservative preloading
    if (deviceMemory && deviceMemory < 4) {
      return index === 0 && isActive ? "metadata" : "none"
    }
    
    // Low CPU cores: reduce preloading
    if (hardwareConcurrency < 4) {
      return isActive ? "metadata" : isNext ? "metadata" : "none"
    }
    
    // Slow connections: only preload metadata
    if (connection) {
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g') {
        return isActive ? "metadata" : "none"
      }
      if (connection.effectiveType === '3g') {
        return isActive ? "metadata" : isNext ? "metadata" : "none"
      }
    }
    
    // Default strategy for good devices/connections
    return index === 0 ? "auto" : isActive ? "auto" : isNext ? "metadata" : "none"
  }, [])

  // Comprehensive check for video playback suitability
  useEffect(() => {
    if (typeof window === "undefined") {
      setShouldPlayVideo(false)
      return
    }

    if (prefersReduced) {
      setShouldPlayVideo(false)
      return
    }

    // Default to true, only disable for very restrictive conditions
    let canPlay = true

    // Check network conditions - only disable for very slow connections
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    
    if (connection) {
      // Only disable if user explicitly has data saver on
      if (connection.saveData) {
        canPlay = false
      } 
      // Only disable for extremely slow connections
      else if (connection.effectiveType === 'slow-2g') {
        canPlay = false
      }
      // For 2g and 3g, still allow but with lower quality expectations
    }

    // Check battery status - reduce playback on low battery
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.level < 0.2 && !battery.charging) {
          setShouldPlayVideo(false)
          return
        }
      }).catch(() => {
        // Battery API not available or failed, continue with default
      })
    }

    setShouldPlayVideo(canPlay)
  }, [prefersReduced])

  // Preload next video while current plays - with requestIdleCallback optimization
  useEffect(() => {
    if (!isMounted) return
    
    const nextIndex = (currentSlide + 1) % slides.length
    const nextVideo = videoRefs.current[nextIndex]
    
    if (nextVideo && nextVideo.readyState < 2) {
      // Use requestIdleCallback if available for non-critical preloading
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          if (nextVideo && nextVideo.readyState < 2) {
            nextVideo.load()
          }
        }, { timeout: 2000 })
      } else {
        // Fallback for browsers without requestIdleCallback
        nextVideo.load()
      }
    }
  }, [currentSlide, isMounted, slides.length])

  // Unload distant videos to free memory
  useEffect(() => {
    if (!isMounted) return
    
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      
      const distance = Math.min(
        Math.abs(index - currentSlide),
        Math.abs(index - currentSlide + slides.length),
        Math.abs(index - currentSlide - slides.length)
      )
      
      // Unload videos more than 2 slides away
      if (distance > 2 && video.readyState > 0 && video !== videoRefs.current[currentSlide]) {
        // Only unload if not currently playing
        if (video.paused) {
          video.pause()
          // Remove src to free memory, but keep element for reuse
          const sources = video.querySelectorAll('source')
          sources.forEach(source => {
            const src = source.src
            source.removeAttribute('src')
            // Store src for reload if needed
            if (!video.dataset.originalSrc) {
              video.dataset.originalSrc = src
            }
          })
          video.load() // This unloads the video buffer
        }
      } else if (distance <= 2 && video.dataset.originalSrc && video.readyState === 0) {
        // Reload if we're getting close and video was unloaded
        const sources = video.querySelectorAll('source')
        if (sources.length === 0) {
          const source = document.createElement('source')
          source.src = video.dataset.originalSrc
          source.type = 'video/mp4'
          video.appendChild(source)
          video.load()
        }
      }
    })
  }, [currentSlide, isMounted, slides.length])

  // Handle video error recovery
  const handleVideoError = useCallback((video: HTMLVideoElement, slide: VideoSlide, index: number) => {
    const errorCount = errorCountRef.current.get(index) || 0
    
    if (errorCount < 3) {
      errorCountRef.current.set(index, errorCount + 1)
      
      // Try to reload after delay
      setTimeout(() => {
        if (video.error && errorCount < 2) {
          video.load()
        }
      }, 3000)
    } else {
      // After 3 failures, fallback to poster if available
      console.warn(`Video failed to load after ${errorCount} attempts:`, slide.videoSrc)
    }
  }, [])

  // Handle video playback and transitions - optimized with AbortController
  useEffect(() => {
    if (!isMounted) return
    
    const currentVideo = videoRefs.current[currentSlide]
    if (!currentVideo) return

    // Clean up previous abort controller
    const prevController = abortControllersRef.current.get(currentSlide)
    if (prevController) {
      prevController.abort()
    }

    // Create new abort controller for this slide
    const abortController = new AbortController()
    abortControllersRef.current.set(currentSlide, abortController)
    const signal = abortController.signal

    // Check if video is already playing to avoid duplicate play calls
    const isAlreadyPlaying = !currentVideo.paused && currentVideo.currentTime > 0

    // Always try to play videos
    const playVideo = async () => {
      if (signal.aborted) return
      
      try {
        // Skip if already playing
        if (isAlreadyPlaying) {
          return
        }
        
        // Ensure video attributes are set
        currentVideo.muted = true
        currentVideo.setAttribute("playsinline", "true")
        currentVideo.setAttribute("muted", "true")
        
        // Always try to play
        await currentVideo.play().catch((err) => {
          if (!signal.aborted) {
            console.warn('Video autoplay failed:', err)
          }
        })
      } catch (error) {
        if (!signal.aborted) {
          console.warn('Video playback error:', error)
        }
      }
    }

    // Single handler for multiple events
    const handleReady = () => {
      if (signal.aborted || !currentVideo || !currentVideo.paused) return
      playVideo()
    }

    // Try to play immediately if ready, otherwise wait for events
    if (currentVideo.readyState >= 2) {
      // Video already loaded
      if (!isAlreadyPlaying) {
        playVideo()
      }
    } else {
      // Use single event listener pattern with AbortController
      ['canplay', 'loadeddata', 'loadedmetadata'].forEach(event => {
        currentVideo.addEventListener(event, handleReady, { once: true, signal })
      })
    }

    // Pause other videos - but delay to allow fade transition
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentSlide) {
        // Delay pausing to allow the fade-out transition to complete
        setTimeout(() => {
          if (signal.aborted) return
          const videoIndex = videoRefs.current.indexOf(video)
          if (video && videoIndex !== currentSlide && !signal.aborted) {
            video.pause()
            video.currentTime = 0
          }
        }, 600) // Slightly longer than transition duration (500ms) to ensure smooth fade
      }
    })

    // Auto-advance slides
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      if (!signal.aborted) {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
    }, autoPlayInterval)

    return () => {
      abortController.abort()
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentSlide, isMounted, slides.length, autoPlayInterval, handleVideoError])

  // Intersection Observer for lazy loading videos
  useEffect(() => {
    if (!isMounted) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting && video.readyState === 0) {
            // Start loading when video is about to be visible
            video.load()
          }
        })
      },
      { 
        rootMargin: '50%', // Start loading when 50% away from viewport
        threshold: 0.1
      }
    )
    
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video)
    })
    
    return () => observer.disconnect()
  }, [isMounted])

  // Removed redundant initial video load effect - the main playback effect handles initial play

  // Notify parent of slide changes
  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentSlide)
    }
  }, [currentSlide, onSlideChange])

  // Manual navigation - optimized with useCallback
  const goToSlide = useCallback((index: number) => {
    if (index !== currentSlide) {
      setCurrentSlide(index)
    }
  }, [currentSlide])

  return (
    <div className={`absolute inset-0 w-full h-full bg-black z-0 ${className}`} suppressHydrationWarning>
      {/* Overlay removed - now rendered in page.tsx to prevent React re-render fade-in */}
      
      {/* Unmounted state - show poster only */}
      {!isMounted && (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0" aria-hidden suppressHydrationWarning>
          {/* Placeholder for first video poster - show immediately */}
          {slides[0]?.poster && (
            <img 
              src={slides[0].poster} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover hero-bg-video-mobile"
              aria-hidden="true"
            />
          )}
        </div>
      )}
      
      {/* Poster Image - Shows immediately as fallback */}
      {slides[0]?.poster && (
        <img 
          src={slides[0].poster} 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover hero-bg-video-mobile"
          aria-hidden="true"
          style={{
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      )}
      
      {/* Video Container - Always visible, no fade-in */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden z-0"
        aria-hidden 
        suppressHydrationWarning
        style={{
          willChange: 'contents',
          transform: 'translateZ(0)',
          zIndex: 2,
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === currentSlide
          const isNext = index === (currentSlide + 1) % slides.length
          return (
            <video
              key={slide.videoSrc}
              ref={(el) => {
                if (el) {
                  videoRefs.current[index] = el
                }
              }}
              className={`absolute inset-0 w-full h-full object-cover hero-bg-video-mobile transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{
                minWidth: '100%',
                minHeight: '100%',
                width: 'auto',
                height: 'auto',
                willChange: 'auto', // Avoid compositor layer downscaling for crisper playback
                transform: 'translateZ(0)',
                backfaceVisibility: isActive ? 'visible' : 'hidden', // Crisper on active, prevent flicker on inactive
                WebkitTransform: 'translateZ(0)',
                contain: 'layout style paint',
              }}
              autoPlay={false}
              playsInline
              muted
              loop
              preload={isActive ? 'auto' : getOptimalPreload(index, isActive, isNext)}
              poster={slide.poster}
              crossOrigin="anonymous"
              aria-label={`Background video ${index + 1} of ${slides.length}`}
              suppressHydrationWarning
              onError={(e) => {
                const video = e.currentTarget
                handleVideoError(video, slide, index)
              }}
            >
              <source src={slide.videoSrc} type="video/mp4" />
            </video>
          )
        })}
      </div>

      {/* Slide Indicators - Hidden on smaller screens */}
      <div className="hidden md:flex absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 gap-1 sm:gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-4 sm:w-6 bg-white/60'
                : 'w-1 sm:w-1.5 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Component for rendering hero text content that syncs with slideshow
export function HeroSlideshowContent({ 
  slides, 
  currentSlide 
}: { 
  slides: VideoSlide[]
  currentSlide: number 
}) {
  const [isVisible, setIsVisible] = useState(true)
  const [displaySlide, setDisplaySlide] = useState(currentSlide)
  // Start as true to match server render and prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(true)
  const [textFadedIn, setTextFadedIn] = useState(true) // Independent text fade-in state
  
  // Handle initial mount and fade-in - completely independent of video
  useEffect(() => {
    // Only update if we're actually on the client (hydration check)
    if (typeof window !== 'undefined') {
      setIsMounted(true)
      // Fade in text immediately on mount, no delay, completely independent of video
      // Use requestAnimationFrame to ensure it happens after render
      const rafId = requestAnimationFrame(() => {
        setTextFadedIn(true)
      })
      // Fallback to ensure it always fades in
      const fallbackTimer = setTimeout(() => {
        setTextFadedIn(true)
      }, 50)
      return () => {
        cancelAnimationFrame(rafId)
        clearTimeout(fallbackTimer)
      }
    }
  }, [])
  
  // Handle fade out/in when slide changes
  useEffect(() => {
    if (currentSlide !== displaySlide) {
      // Fade out
      setIsVisible(false)
      // After fade out completes, update content and fade in
      const timer = setTimeout(() => {
        setDisplaySlide(currentSlide)
        setIsVisible(true)
      }, 500) // Half of transition duration
      
      return () => clearTimeout(timer)
    }
  }, [currentSlide, displaySlide])
  
  const currentSlideData = slides[displaySlide]
  
  return (
    <div 
      className="relative z-50 text-center" 
      style={{ 
        isolation: 'isolate', 
        position: 'relative',
        zIndex: 50,
        transform: 'translateZ(0)',
      }}
    >
      {/* Text with multiple legibility enhancements */}
      <div className={`transition-opacity duration-1000 ease-out ${
        isMounted && textFadedIn && isVisible ? 'opacity-100' : 'opacity-0'
      }`} style={{ opacity: isMounted && textFadedIn && isVisible ? 1 : 0 }}>
        <h2 
          id="hero-heading" 
          className="text-4xl xl:text-5xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight text-white"
          style={{
            color: '#ffffff',
            opacity: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.4)',
            filter: 'none',
            WebkitTextFillColor: '#ffffff',
            mixBlendMode: 'normal',
            isolation: 'isolate',
          }}
        >
          <span className="inline-block">
            {currentSlideData.headline.includes('|') ? (() => {
              const parts = currentSlideData.headline.split('|')
              return (
                <>
                  {parts[0]}
                  <span className="sm:hidden"> </span>
                  <br className="hidden sm:block" />
                  {parts[1]}
                </>
              )
            })() : currentSlideData.headline}
          </span>
        </h2>
      </div>
      
      {/* Combined content block with subheading and description - hidden on mobile, only main heading shows */}
      <div className="hero-blur-block-mobile-hide max-w-4xl mx-auto hidden sm:block">
        <div 
          className="px-6 py-4 mb-6 sm:mb-8 md:mb-10 rounded-lg hero-content-blur"
          style={{
            backgroundColor: 'rgba(0,0,0,0.15)',
          }}
        >
          <div className={`transition-opacity duration-1000 ease-out ${
            isMounted && textFadedIn && isVisible ? 'opacity-100' : 'opacity-0'
          }`} style={{ opacity: isMounted && textFadedIn && isVisible ? 1 : 0 }}>
            <p 
              className="hidden sm:block font-semibold mb-3 text-white whitespace-nowrap overflow-hidden"
              style={{ 
                letterSpacing: '0.1em',
                color: '#ffffff',
                opacity: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.9), 0 4px 8px rgba(0,0,0,0.7)',
                WebkitTextFillColor: '#ffffff',
                mixBlendMode: 'normal',
                isolation: 'isolate',
                fontSize: 'clamp(0.5rem, 1.75vw, 1.125rem)',
                lineHeight: '1.2',
              }}
            >
              {currentSlideData.subheading}
            </p>
            <p 
              className="hidden sm:block font-normal text-white"
              style={{ 
                color: '#ffffff',
                opacity: 1,
                textShadow: '0 1px 3px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.7)',
                WebkitTextFillColor: '#ffffff',
                mixBlendMode: 'normal',
                isolation: 'isolate',
                fontSize: 'clamp(0.75rem, 2vw, 1.25rem)',
                lineHeight: '1.2',
              }}
            >
              {currentSlideData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


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

  // Ensure component is mounted before doing client-only operations
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check for reduced motion preference
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
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

    setShouldPlayVideo(canPlay)
  }, [prefersReduced])

  // Preload next video while current plays
  useEffect(() => {
    if (!isMounted) return
    
    const nextIndex = (currentSlide + 1) % slides.length
    const nextVideo = videoRefs.current[nextIndex]
    
    if (nextVideo && nextVideo.readyState < 2) {
      nextVideo.load()
    }
  }, [currentSlide, isMounted, slides.length])

  // Handle video playback and transitions
  useEffect(() => {
    if (!isMounted) return
    
    const currentVideo = videoRefs.current[currentSlide]
    if (!currentVideo) return

    // Always try to play videos
    const playVideo = async () => {
      try {
        // Ensure video attributes are set
        currentVideo.muted = true
        currentVideo.setAttribute("playsinline", "true")
        currentVideo.setAttribute("muted", "true")
        
        // Always try to play
        await currentVideo.play().catch((err) => {
          console.warn('Video autoplay failed:', err)
        })
      } catch (error) {
        console.warn('Video playback error:', error)
      }
    }

    // Wait for video to be ready
    const handleCanPlay = () => {
      playVideo()
    }

    const handleLoadedData = () => {
      playVideo()
    }

    // Try to play immediately if ready, otherwise wait for events
    if (currentVideo.readyState >= 2) {
      // Video already loaded
      playVideo()
    } else {
      currentVideo.addEventListener('canplay', handleCanPlay, { once: true })
      currentVideo.addEventListener('loadeddata', handleLoadedData, { once: true })
      currentVideo.addEventListener('loadedmetadata', handleCanPlay, { once: true })
    }

    // Pause other videos - but delay to allow fade transition
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentSlide) {
        // Delay pausing to allow the fade-out transition to complete
        setTimeout(() => {
          const videoIndex = videoRefs.current.indexOf(video)
          if (video && videoIndex !== currentSlide) {
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
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      currentVideo.removeEventListener('canplay', handleCanPlay)
      currentVideo.removeEventListener('loadeddata', handleLoadedData)
      currentVideo.removeEventListener('loadedmetadata', handleCanPlay)
    }
  }, [currentSlide, isMounted, slides.length, autoPlayInterval])

  // Initial video load - ensure first video plays on mount
  useEffect(() => {
    if (!isMounted) return
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const firstVideo = videoRefs.current[0]
      if (!firstVideo) {
        console.warn('First video element not found')
        return
      }

      console.log('Loading first video:', slides[0].videoSrc, firstVideo)

      const tryInitialPlay = async () => {
        try {
          firstVideo.muted = true
          firstVideo.setAttribute("playsinline", "true")
          firstVideo.setAttribute("muted", "true")
          firstVideo.load() // Force load
          await firstVideo.play().catch((err) => {
            console.warn('Initial video play failed, will retry:', err)
          })
        } catch (error) {
          console.warn('Initial video play error:', error)
        }
      }

      // Try immediately if ready
      if (firstVideo.readyState >= 2) {
        tryInitialPlay()
      } else {
        // Wait for video to be ready
        const handleCanPlay = () => {
          console.log('First video can play')
          tryInitialPlay()
        }
        const handleLoadedData = () => {
          console.log('First video loaded data')
          tryInitialPlay()
        }
        
        firstVideo.addEventListener('canplay', handleCanPlay, { once: true })
        firstVideo.addEventListener('loadeddata', handleLoadedData, { once: true })
        firstVideo.addEventListener('loadedmetadata', handleCanPlay, { once: true })
        firstVideo.addEventListener('error', (e) => {
          console.error('First video error:', e, firstVideo.error)
        }, { once: true })
        
        // Force load
        firstVideo.load()
        
        return () => {
          firstVideo.removeEventListener('canplay', handleCanPlay)
          firstVideo.removeEventListener('loadeddata', handleLoadedData)
          firstVideo.removeEventListener('loadedmetadata', handleCanPlay)
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [isMounted, slides])

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

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className={`absolute inset-0 w-full h-full bg-black z-0 ${className}`} suppressHydrationWarning>
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0" aria-hidden suppressHydrationWarning>
          {/* Placeholder for first video poster */}
          {slides[0]?.poster && (
            <img 
              src={slides[0].poster} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 w-full h-full bg-black z-0 ${className}`} suppressHydrationWarning>
      {/* Video Container */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden z-0" 
        aria-hidden 
        suppressHydrationWarning
        style={{
          willChange: 'contents',
          transform: 'translateZ(0)',
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
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{
                minWidth: '100%',
                minHeight: '100%',
                width: 'auto',
                height: 'auto',
                willChange: isActive || isNext ? 'opacity' : 'auto',
                transform: 'translateZ(0)', // Force GPU layer
                backfaceVisibility: 'hidden', // Prevent flickering
                WebkitTransform: 'translateZ(0)', // Safari support
              }}
              autoPlay={isActive && isMounted}
              playsInline
              muted
              loop
              preload={
                index === 0 
                  ? "auto" 
                  : isActive 
                    ? "auto" 
                    : isNext
                      ? "metadata"
                      : "none"
              }
              poster={slide.poster}
              crossOrigin="anonymous"
              aria-label={`Background video ${index + 1} of ${slides.length}`}
              suppressHydrationWarning
              onError={(e) => {
                console.error('Video load error:', slide.videoSrc, e)
              }}
              onLoadedData={() => {
                if (isActive && isMounted) {
                  const video = videoRefs.current[index]
                  if (video) {
                    video.play().catch(err => console.warn('Video play error:', err))
                  }
                }
              }}
              onCanPlay={() => {
                if (isActive && isMounted) {
                  const video = videoRefs.current[index]
                  if (video && video.paused) {
                    video.play().catch(err => console.warn('Video play error:', err))
                  }
                }
              }}
            >
              <source src={slide.videoSrc} type="video/mp4" />
            </video>
          )
        })}
        
        {/* Adaptive Overlay - Darkens background for text legibility */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(0,0,0,${overlayOpacity + 0.15}),
              rgba(0,0,0,${overlayOpacity}),
              rgba(0,0,0,${overlayOpacity + 0.1})
            )`
          }}
        />
        
        {/* Additional gradient overlay for better text contrast */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background: `radial-gradient(
              ellipse at center,
              transparent 0%,
              rgba(0,0,0,0.3) 70%,
              rgba(0,0,0,0.5) 100%
            )`
          }}
        />
      </div>

      {/* Slide Indicators */}
      <div className="hidden sm:flex absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 gap-1 sm:gap-1.5">
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
    <div className={`relative z-40 text-center transition-opacity duration-1000 ease-in-out ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Text with multiple legibility enhancements */}
      <h1 
        id="hero-heading" 
        className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight"
        style={{
          color: '#ffffff',
          textShadow: `
            0 2px 4px rgba(0,0,0,0.5),
            0 4px 8px rgba(0,0,0,0.4),
            0 8px 16px rgba(0,0,0,0.3),
            0 0 20px rgba(0,0,0,0.2)
          `,
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
        }}
      >
        <span className="inline-block">
          {currentSlideData.headline}
        </span>
      </h1>
      
      {/* Combined content block with subheading and description */}
      <div 
        className="max-w-4xl mx-auto px-6 py-4 mb-6 sm:mb-8 md:mb-10 rounded-lg"
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <p 
          className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-semibold mb-3"
          style={{ 
            letterSpacing: '0.1em',
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          {currentSlideData.subheading}
        </p>
        <p 
          className="text-base sm:text-lg md:text-xl leading-relaxed font-normal"
          style={{ 
            color: '#ffffff',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          }}
        >
          {currentSlideData.description}
        </p>
      </div>
    </div>
  )
}


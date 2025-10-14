"use client"

import { useEffect, useRef, useState } from 'react'
import { Cpu } from 'lucide-react'

interface ImmersionTankVideoProps {
  className?: string
  videoSrc?: string
}

export function ImmersionTankVideo({ 
  className = "", 
  videoSrc = "/Immersion.mp4"
}: ImmersionTankVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    
    const markReady = () => setIsLoaded(true)
    
    // Optimize video loading
    video.preload = "metadata" // Only load metadata initially
    video.setAttribute("playsinline", "true")
    video.muted = true
    
    // Attach early events and a fallback
    video.addEventListener('loadeddata', markReady, { once: true })
    video.addEventListener('canplay', markReady, { once: true })
    video.addEventListener('error', markReady, { once: true })
    
    const fallback = window.setTimeout(markReady, 600)
    
    // Start playback when ready
    const tryPlay = () => video.play().catch(() => void 0)
    video.addEventListener('canplay', tryPlay, { once: true })
    
    return () => {
      window.clearTimeout(fallback)
      video.removeEventListener('loadeddata', markReady)
      video.removeEventListener('canplay', markReady)
      video.removeEventListener('error', markReady)
      video.removeEventListener('canplay', tryPlay)
    }
  }, [])

  return (
    <div className={`relative rounded-xl overflow-hidden bg-black ${className}`} style={{ willChange: 'transform' }}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)' // Hardware acceleration
        }}
        aria-label="Immersion cooling tank video showing RTX 4090 GPUs"
        aria-describedby="tank-video-description"
      >
        <source src={videoSrc} type="video/mp4" />
        <div id="tank-video-description" className="sr-only">
          Video showing MODRON's immersion cooling tank with multiple RTX 4090 GPUs submerged in cooling liquid
        </div>
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#40d0f2]/40 to-[#d5aaf9]/40" />
      
      {/* Static GPU grid overlay */}
      <div className="relative z-10 p-3 sm:p-4 md:p-6 text-center h-full flex flex-col justify-center">
        <div className="text-white font-bold text-base sm:text-lg mb-3 sm:mb-4">Immersion Cooling Tank</div>
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3 sm:mb-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/20 rounded-lg p-1 sm:p-2">
              <Cpu className="h-4 w-4 sm:h-6 sm:w-6 text-white mx-auto" />
            </div>
          ))}
        </div>
        <div className="text-white/80 text-xs sm:text-sm">6× RTX 4090 GPUs per tank</div>
      </div>
    </div>
  )
}

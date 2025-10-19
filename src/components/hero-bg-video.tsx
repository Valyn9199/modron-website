"use client"

import { useEffect, useMemo, useRef, useState } from "react"

interface Source {
  src: string
  type: string
}

interface HeroBgVideoProps {
  sources?: Source[]
  poster?: string
  overlayOpacity?: number
  className?: string
  onVideoStart?: () => void
}

export function HeroBgVideo({
  sources = [
    { src: "/MODRON_Hero_Containers_04.mp4", type: "video/mp4" },
  ],
  poster = "/AI_Clouds_01.png",
  overlayOpacity = 0.75,
  className = "",
  onVideoStart,
}: HeroBgVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  
  // Check for reduced motion preference
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  // Comprehensive check for video playback suitability
  useEffect(() => {
    console.log('🎬 HeroBgVideo useEffect - checking video playback suitability')
    if (typeof window === "undefined" || prefersReduced) {
      console.log('🎬 Video disabled: window undefined or reduced motion')
      setShouldPlayVideo(false)
      return
    }

    let canPlay = true

    // 1. Check network conditions
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    
    if (connection) {
      console.log('🎬 Network connection detected:', connection.effectiveType, 'saveData:', connection.saveData)
      // Respect user's data saver preference
      if (connection.saveData) {
        console.log('🎬 Video disabled: data saver enabled')
        canPlay = false
      }
      // Don't play on slow connections
      else if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        console.log('🎬 Video disabled: slow connection')
        canPlay = false
      }
      // For 3G, only play on desktop
      else if (connection.effectiveType === '3g') {
        canPlay = window.matchMedia('(min-width: 1024px)').matches
        console.log('🎬 3G connection - desktop only:', canPlay)
      }
    }

    // 2. Check device memory (if available)
    const memory = (navigator as any).deviceMemory
    if (memory && memory < 4) {
      console.log('🎬 Video disabled: low memory device')
      canPlay = false
    }

    console.log('🎬 Final video decision:', canPlay)
    setShouldPlayVideo(canPlay)
  }, [prefersReduced])

  useEffect(() => {
    const v = videoRef.current
    console.log('🎬 Video playback effect - shouldPlayVideo:', shouldPlayVideo, 'video element:', !!v)
    if (!v || !shouldPlayVideo) {
      console.log('🎬 Video playback skipped - no video element or shouldPlayVideo is false')
      return
    }
    
    // Ensure attributes for inline autoplay
    v.setAttribute("playsinline", "true")
    v.muted = true
    
    // Add event listener for when video starts playing
    const handlePlay = () => {
      const timestamp = new Date().toLocaleTimeString()
      console.log(`🎬 VIDEO PLAY EVENT FIRED at ${timestamp}`)
      if (onVideoStart) {
        onVideoStart()
      }
      // Dispatch custom event for other components to listen to
      window.dispatchEvent(new CustomEvent('videoStarted'))
    }
    
    const handlePlaying = () => {
      const timestamp = new Date().toLocaleTimeString()
      console.log(`🎬 VIDEO PLAYING EVENT FIRED at ${timestamp}`)
      if (onVideoStart) {
        onVideoStart()
      }
      // Dispatch custom event for other components to listen to
      window.dispatchEvent(new CustomEvent('videoStarted'))
    }
    
    v.addEventListener('play', handlePlay)
    v.addEventListener('playing', handlePlaying)
    
    // Kick playback
    const tryPlay = () => v.play().catch(() => void 0)
    tryPlay()
    
    // Cleanup
    return () => {
      v.removeEventListener('play', handlePlay)
      v.removeEventListener('playing', handlePlaying)
    }
  }, [shouldPlayVideo, onVideoStart])

  return (
    <div className={`absolute inset-0 w-full max-w-[100vw] ${className}`} aria-hidden>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover scale-105"
        autoPlay={shouldPlayVideo}
        playsInline
        muted
        loop={true}
        preload={shouldPlayVideo ? "auto" : "none"}
        poster={poster}
        crossOrigin="anonymous"
        aria-label="Background video showing MODRON's sustainable GPU infrastructure"
        aria-describedby="hero-video-description"
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
        <div id="hero-video-description" className="sr-only">
          Background video showcasing MODRON's green GPU infrastructure with solar panels and immersion cooling technology
        </div>
      </video>
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, rgba(0,0,0,${overlayOpacity + 0.2}), rgba(0,0,0,${overlayOpacity}))` }}
      />
    </div>
  )
}

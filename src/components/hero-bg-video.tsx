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
}

export function HeroBgVideo({
  sources = [
    { src: "/MODRON_GPUS_Immersion.mp4", type: "video/mp4" },
  ],
  poster = "/hero-poster.jpg",
  overlayOpacity = 0.75,
  className = "",
}: HeroBgVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia('(max-width: 768px)').matches
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Ensure attributes for instant, inline autoplay
    v.setAttribute("playsinline", "true")
    v.muted = true
    
    // On mobile or with reduced motion, show poster immediately and don't autoplay
    if (prefersReduced || isMobile) {
      setReady(true)
      return
    }
    
    // Kick playback as soon as possible (desktop only)
    const tryPlay = () => v.play().catch(() => void 0)
    const markReady = () => setReady(true)
    // The earliest useful events for first frame
    v.addEventListener("loadeddata", markReady, { once: true })
    v.addEventListener("canplay", markReady, { once: true })
    v.addEventListener("error", markReady, { once: true })
    // Fallback in case events are delayed
    const fallback = window.setTimeout(markReady, 600)
    // Trigger playback attempt
    tryPlay()
    return () => {
      window.clearTimeout(fallback)
      v.removeEventListener("loadeddata", markReady)
      v.removeEventListener("canplay", markReady)
      v.removeEventListener("error", markReady)
    }
  }, [prefersReduced, isMobile])

  return (
    <div className={`absolute inset-0 w-full max-w-[100vw] ${className}`} aria-hidden>
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-300 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        autoPlay={false}
        playsInline
        muted
        loop={false}
preload="metadata"
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

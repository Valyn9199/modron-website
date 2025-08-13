"use client"

import { useEffect, useRef } from "react"

interface SpotlightProps {
  size?: number
  strength?: number
}

export function Spotlight({ size = 520, strength = 0.5 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let rafId: number | null = null
    let lastX = 0
    let lastY = 0
    const onMove = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        el.style.setProperty("--x", `${lastX}px`)
        el.style.setProperty("--y", `${lastY}px`)
        rafId = null
      })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{
        background: `radial-gradient(${size}px ${size}px at var(--x) var(--y), rgba(16,185,129,${strength}) 0%, rgba(16,185,129,0.08) 35%, rgba(16,185,129,0) 60%)`,
        mixBlendMode: "screen",
        willChange: "background",
      }}
    />
  )
}

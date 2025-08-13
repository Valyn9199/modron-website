"use client"

import { useEffect, useRef, useState } from "react"

function useCountUp(target: number, duration = 1200) {
  const [val, setVal] = useState(0)
  const started = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration)
          setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration])

  return { ref, val }
}

export function HeroStats() {
  const uptime = useCountUp(99)
  const carbon = useCountUp(60)
  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-[#999999]" aria-label="Key performance indicators">
      <div className="text-center">
        <div ref={uptime.ref} className="text-3xl font-light text-white mb-3">{uptime.val}.9%</div>
        <div className="text-sm font-light">Uptime Guarantee</div>
      </div>
      <div className="text-center">
        <div ref={carbon.ref} className="text-3xl font-light text-white mb-3">{carbon.val}%</div>
        <div className="text-sm font-light">Carbon Reduction</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-light text-white mb-3">24/7</div>
        <div className="text-sm font-light">Global Support</div>
      </div>
    </div>
  )
}

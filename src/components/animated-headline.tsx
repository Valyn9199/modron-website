"use client"

import { motion } from "framer-motion"

export function AnimatedHeadline() {
  return (
    <motion.h1 
      id="hero-heading" 
      className="hero-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight will-change-transform font-heading"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
    >
      <span className="text-gray-800">
        Building Australia's sovereign AI infrastructure
      </span>
    </motion.h1>
  )
}

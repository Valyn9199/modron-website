"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-6 sm:mb-8"
    >
      <Image
        src="/Modron_logo.png"
        alt="MODRON"
        width={200}
        height={53}
        className="mx-auto h-12 sm:h-14 md:h-16 w-auto"
        priority
      />
    </motion.div>
  )
}

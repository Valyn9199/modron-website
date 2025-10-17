"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  className?: string
  titleClassName?: string
  contentClassName?: string
  showOnMobile?: boolean // If false, always expanded on mobile
}

export function CollapsibleSection({
  title,
  children,
  defaultExpanded = false,
  className = "",
  titleClassName = "",
  contentClassName = "",
  showOnMobile = true
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  // On mobile, if showOnMobile is false, always show content
  const shouldShowCollapsible = typeof window !== 'undefined' ? 
    window.innerWidth >= 768 || showOnMobile : showOnMobile

  const toggleExpanded = () => {
    if (shouldShowCollapsible) {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <div className={`collapsible-section ${className}`}>
      {/* Header */}
      <motion.div
        className={`collapsible-header cursor-pointer flex items-center justify-between p-4 bg-[#1A1A1A]/50 border border-[#262626] rounded-xl hover:border-[#40d0f2]/30 transition-all duration-200 ${titleClassName}`}
        onClick={toggleExpanded}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h3 className="text-white font-semibold text-lg sm:text-xl">
          {title}
        </h3>
        
        {shouldShowCollapsible && (
          <div className="flex items-center gap-2 text-[#40d0f2] group">
            <span className="text-sm font-medium group-hover:text-[#32ca73] transition-colors">
              {isExpanded ? 'Hide Details' : 'View Details'}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Content */}
      <AnimatePresence>
        {(isExpanded || !shouldShowCollapsible) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`overflow-hidden ${contentClassName}`}
          >
            <div className="pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Mobile-specific version that's always collapsed initially
export function MobileCollapsibleSection({
  title,
  children,
  className = "",
  titleClassName = "",
  contentClassName = ""
}: Omit<CollapsibleSectionProps, 'defaultExpanded' | 'showOnMobile'>) {
  return (
    <CollapsibleSection
      title={title}
      defaultExpanded={false}
      showOnMobile={true}
      className={className}
      titleClassName={titleClassName}
      contentClassName={contentClassName}
    >
      {children}
    </CollapsibleSection>
  )
}

"use client"

import { MobileViewport } from "./mobile-viewport"
import { MobileViewportBackup } from "./mobile-viewport-backup"

interface MobileViewportSwitcherProps {
  children: React.ReactNode
  enablePullToRefresh?: boolean
  preventZoom?: boolean
  enableTouchActions?: boolean
}

export function MobileViewportSwitcher({ 
  children, 
  enablePullToRefresh = true,
  preventZoom = true,
  enableTouchActions = true
}: MobileViewportSwitcherProps) {
  // Use the main component with pull-to-refresh enabled
  if (enablePullToRefresh) {
    return (
      <MobileViewport 
        enablePullToRefresh={true}
        preventZoom={preventZoom}
        enableTouchActions={enableTouchActions}
      >
        {children}
      </MobileViewport>
    )
  }
  
  // Use the backup component with pull-to-refresh disabled
  return (
    <MobileViewportBackup 
      preventZoom={preventZoom}
      enableTouchActions={enableTouchActions}
    >
      {children}
    </MobileViewportBackup>
  )
}

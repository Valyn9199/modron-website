"use client"

import { PullToRefresh } from '@/components/pull-to-refresh'

export function RefreshWrapper({ children }: { children: React.ReactNode }) {
  const handleRefresh = async () => {
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    window.location.reload()
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      {children}
    </PullToRefresh>
  )
}

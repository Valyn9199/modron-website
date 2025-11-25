"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface Competitor {
  name: string
  logo: string
  color: string
  metrics: {
    [key: string]: number | string
  }
}

interface ComparisonMetric {
  key: string
  label: string
  unit: string
  higherIsBetter: boolean
  description: string
}

export function DynamicComparison() {
  const { ref } = useScrollAnimation({ threshold: 0.3 })
  const [selectedMetric, setSelectedMetric] = useState<string>("performance")
  const [hoveredCompetitor, setHoveredCompetitor] = useState<string | null>(null)
  const [isAutoCycling, setIsAutoCycling] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const competitors: Competitor[] = [
    {
      name: "MODRON",
      logo: "M",
      color: "#fbff52",
      metrics: {
        performance: 95,
        efficiency: 90,
        deployment: 48,
        cost: 60,
        support: 98,
        security: 95
      }
    },
    {
      name: "AWS",
      logo: "A",
      color: "#666666",
      metrics: {
        performance: 85,
        efficiency: 70,
        deployment: 720,
        cost: 40,
        support: 85,
        security: 90
      }
    },
    {
      name: "Google Cloud",
      logo: "G",
      color: "#666666",
      metrics: {
        performance: 80,
        efficiency: 75,
        deployment: 480,
        cost: 45,
        support: 80,
        security: 88
      }
    },
    {
      name: "Traditional DC",
      logo: "T",
      color: "#666666",
      metrics: {
        performance: 70,
        efficiency: 60,
        deployment: 4320,
        cost: 20,
        support: 70,
        security: 85
      }
    }
  ]

  const metrics: ComparisonMetric[] = [
    {
      key: "performance",
      label: "AI Performance",
      unit: "%",
      higherIsBetter: true,
      description: "Relative performance compared to baseline"
    },
    {
      key: "efficiency",
      label: "Energy Efficiency",
      unit: "%",
      higherIsBetter: true,
      description: "Power efficiency rating"
    },
    {
      key: "deployment",
      label: "Deployment Time",
      unit: "hours",
      higherIsBetter: false,
      description: "Time to full deployment"
    },
    {
      key: "cost",
      label: "Cost Efficiency",
      unit: "%",
      higherIsBetter: true,
      description: "Cost per compute unit efficiency"
    },
    {
      key: "support",
      label: "Support Quality",
      unit: "%",
      higherIsBetter: true,
      description: "Customer support satisfaction"
    },
    {
      key: "security",
      label: "Security Rating",
      unit: "%",
      higherIsBetter: true,
      description: "Security compliance and features"
    }
  ]

  // Auto-cycling effect
  useEffect(() => {
    if (isAutoCycling && !userInteracted) {
      intervalRef.current = setInterval(() => {
        setSelectedMetric(prevMetric => {
          const currentIndex = metrics.findIndex(m => m.key === prevMetric)
          const nextIndex = (currentIndex + 1) % metrics.length
          return metrics[nextIndex].key
        })
      }, 3000) // 3 seconds per tab
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoCycling, userInteracted])

  // Handle manual tab selection
  const handleMetricClick = (metricKey: string) => {
    setSelectedMetric(metricKey)
    setIsAutoCycling(false)
    setUserInteracted(true)
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  // Optional: Restart auto-cycling
  const restartAutoCycling = () => {
    setIsAutoCycling(true)
    setUserInteracted(false)
  }

  const selectedMetricData = metrics.find(m => m.key === selectedMetric)
  const maxValue = Math.max(...competitors.map(c => Number(c.metrics[selectedMetric])))

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Competitive Comparison</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how MODRON compares to leading cloud providers and traditional data centers
          </p>
        </div>

        {/* Metric Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => handleMetricClick(metric.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedMetric === metric.key
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {metric.label}
            </button>
          ))}
          
          {/* Restart auto-cycling button */}
          {userInteracted && (
            <button
              onClick={restartAutoCycling}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-[#40d0f2]/20 text-[#40d0f2] hover:bg-[#40d0f2]/30 transition-all duration-300"
              title="Restart auto-cycling"
            >
              🔄 Auto
            </button>
          )}
        </div>

        {/* Comparison Chart */}
        <div className="bg-[#1A1A1A]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="mb-6">
            <h3 
              className="text-xl font-bold mb-2 text-white"
            >
              {selectedMetricData?.label}
            </h3>
            <p className="text-gray-400 text-sm">{selectedMetricData?.description}</p>
          </div>

          <div className="space-y-4">
            {competitors.map((competitor) => {
              const value = Number(competitor.metrics[selectedMetric])
              const percentage = (value / maxValue) * 100
              const isModron = competitor.name === "MODRON"
              
              return (
                <div
                  key={competitor.name}
                  className="flex items-center gap-4"
                  onMouseEnter={() => setHoveredCompetitor(competitor.name)}
                  onMouseLeave={() => setHoveredCompetitor(null)}
                >
                  {/* Competitor Info */}
                  <div className="flex items-center gap-3 min-w-[200px]">
                    {isModron ? (
                      <Image
                        src="/MODRON_ICON.png"
                        alt="MODRON"
                        width={40}
                        height={40}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                        style={{ backgroundColor: competitor.color }}
                      >
                        {competitor.logo}
                      </div>
                    )}
                    <div>
                      <div className={`font-semibold ${isModron ? 'text-white' : 'text-gray-300'}`}>
                        {competitor.name}
                        {isModron && <span className="ml-2 text-xs bg-[#fbff52] text-black px-2 py-1 rounded">YOU</span>}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 relative">
                    <div className="h-8 bg-[#2A2A2A] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                          hoveredCompetitor === competitor.name ? 'scale-y-110' : ''
                        }`}
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: competitor.color,
                          boxShadow: isModron ? `0 0 20px ${competitor.color}40` : 'none'
                        }}
                      >
                        {/* Animated shimmer effect for MODRON */}
                        {isModron && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                        )}
                      </div>
                    </div>
                    
                    {/* Value Label */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                      <span className={`text-sm font-bold ${isModron ? 'text-black' : 'text-white'}`}>
                        {value}{selectedMetricData?.unit}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Key Insights */}
          <div className="mt-8 p-4 bg-gradient-to-r from-[#40d0f2]/10 to-[#32ca73]/10 rounded-lg border border-[#40d0f2]/20">
            <h4 className="font-bold text-white mb-2">Key Insights</h4>
            <div className="text-sm text-gray-300">
              {selectedMetric === 'performance' && (
                <p>MODRON delivers 10-25% better AI performance through optimized hardware and cooling.</p>
              )}
              {selectedMetric === 'efficiency' && (
                <p>Immersion cooling reduces power consumption by 40% compared to air-cooled systems.</p>
              )}
              {selectedMetric === 'deployment' && (
                <p>Container-based deployment is 15-90x faster than traditional data center setup.</p>
              )}
              {selectedMetric === 'cost' && (
                <p>MODRON provides 20-40% better cost efficiency through renewable energy and local deployment.</p>
              )}
              {selectedMetric === 'support' && (
                <p>Dedicated local support team with 98% satisfaction rating and same-day response.</p>
              )}
              {selectedMetric === 'security' && (
                <p>Australian data residency and sovereign infrastructure meets government security standards.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

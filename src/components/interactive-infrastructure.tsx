"use client"

import { useState, useEffect, useCallback } from "react"
import { Icons } from "@/lib/icon-imports"

interface InfrastructureComponent {
  id: string
  name: string
  description: string
  position: { x: number; y: number }
  color: string
  details: {
    capacity?: string
    efficiency?: string
    deployment?: string
    cost?: string
  }
  connections?: string[] // IDs of connected components
}

interface Connection {
  from: string
  to: string
}

export function InteractiveInfrastructure() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null)

  const getGradientForComponent = (componentId: string) => {
    switch (componentId) {
      case 'solar-panels':
        return 'linear-gradient(135deg, #32ca73 0%, #40d0f2 100%)'
      case 'battery-storage':
        return 'linear-gradient(135deg, #32ca73 0%, #d5aaf9 100%)'
      case 'immersion-tank':
        return 'linear-gradient(135deg, #40d0f2 0%, #32ca73 100%)'
      case 'container':
        return 'linear-gradient(135deg, #fbff52 0%, #d5aaf9 100%)'
      default:
        return 'transparent'
    }
  }

  const components: InfrastructureComponent[] = [
    {
      id: "solar-panels",
      name: "Solar Panels",
      description: "Australian-made solar panels providing renewable energy",
      position: { x: 20, y: 15 },
      color: "#32ca73",
      connections: ["battery-storage", "immersion-tank"],
      details: {
        capacity: "50kW peak output",
        efficiency: "22% conversion rate",
        deployment: "Modular installation",
        cost: "ROI in 3-5 years"
      }
    },
    {
      id: "battery-storage",
      name: "Battery Storage",
      description: "Advanced battery storage integration for energy storage",
      position: { x: 80, y: 15 },
      color: "#32ca73",
      connections: ["immersion-tank"],
      details: {
        capacity: "1 megawatt+",
        efficiency: "95% round-trip efficiency",
        deployment: "Grid-independent backup",
        cost: "24/7 renewable power"
      }
    },
    {
      id: "immersion-tank",
      name: "Immersion Cooling",
      description: "Direct-to-chip cooling system for maximum efficiency",
      position: { x: 50, y: 45 },
      color: "#40d0f2",
      connections: ["container"],
      details: {
        capacity: "GB300, H200, RTX 6000, L40S",
        efficiency: "60% less power consumption",
        deployment: "Self-contained unit",
        cost: "40% operational savings"
      }
    },
    {
      id: "container",
      name: "Container Infrastructure",
      description: "ISO shipping containers for rapid deployment",
      position: { x: 50, y: 75 },
      color: "#fbff52",
      connections: [],
      details: {
        capacity: "10ft, 20ft, 40ft ISO",
        efficiency: "Plug-and-play setup",
        deployment: "48-hour deployment",
        cost: "90% faster than traditional DC"
      }
    }
  ]

  // Build connection lines based on component connections
  const getConnections = (): Connection[] => {
    const connections: Connection[] = []
    components.forEach(component => {
      if (component.connections) {
        component.connections.forEach(targetId => {
          connections.push({ from: component.id, to: targetId })
        })
      }
    })
    return connections
  }

  const connections = getConnections()

  const selectedData = components.find(c => c.id === selectedComponent)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedComponent(null)
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (selectedComponent) {
          const currentIndex = components.findIndex(c => c.id === selectedComponent)
          const nextIndex = (currentIndex + 1) % components.length
          setSelectedComponent(components[nextIndex].id)
        } else {
          setSelectedComponent(components[0].id)
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (selectedComponent) {
          const currentIndex = components.findIndex(c => c.id === selectedComponent)
          const prevIndex = (currentIndex - 1 + components.length) % components.length
          setSelectedComponent(components[prevIndex].id)
        } else {
          setSelectedComponent(components[components.length - 1].id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedComponent])

  // Check if a connection should be highlighted
  const isConnectionHighlighted = useCallback((connection: Connection) => {
    if (!hoveredComponent && !selectedComponent) return false
    const activeId = selectedComponent || hoveredComponent
    return connection.from === activeId || connection.to === activeId
  }, [hoveredComponent, selectedComponent])

  // Get icon for detail key
  const getDetailIcon = (key: string) => {
    switch (key) {
      case 'capacity':
        return <Icons.Server className="w-4 h-4" />
      case 'efficiency':
        return <Icons.Zap className="w-4 h-4" />
      case 'deployment':
        return <Icons.ArrowRight className="w-4 h-4" />
      case 'cost':
        return <Icons.DollarSign className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Interactive Infrastructure</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Click on any component to explore MODRON's modular AI infrastructure
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Infrastructure Diagram */}
          <div 
            className="relative bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-6 sm:p-8 min-h-[400px] sm:min-h-[500px] border border-white/10"
            role="img"
            aria-label="MODRON infrastructure diagram"
          >
            {/* Background Grid - Enhanced */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Connection Lines - Logical Flow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
              {connections.map((connection, index) => {
                const fromComp = components.find(c => c.id === connection.from)
                const toComp = components.find(c => c.id === connection.to)
                if (!fromComp || !toComp) return null

                const isHighlighted = isConnectionHighlighted(connection)
                const fromColor = fromComp.color
                const toColor = toComp.color

                return (
                  <line
                    key={`line-${connection.from}-${connection.to}-${index}`}
                    x1={`${fromComp.position.x}%`}
                    y1={`${fromComp.position.y}%`}
                    x2={`${toComp.position.x}%`}
                    y2={`${toComp.position.y}%`}
                    stroke={isHighlighted ? fromColor : "rgba(255,255,255,0.15)"}
                    strokeWidth={isHighlighted ? "3" : "2"}
                    strokeDasharray="5,5"
                    opacity={isHighlighted ? 0.8 : 0.4}
                    className={isHighlighted ? "transition-all duration-300" : ""}
                    style={{
                      filter: isHighlighted ? `drop-shadow(0 0 4px ${fromColor}80)` : 'none'
                    }}
                  />
                )
              })}
            </svg>

            {/* Interactive Components */}
            {components.map((component) => {
              const isSelected = selectedComponent === component.id
              const isHovered = hoveredComponent === component.id
              const isActive = isSelected || isHovered

              return (
                <div
                  key={component.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${component.position.x}%`,
                    top: `${component.position.y}%`,
                  }}
                  onClick={() => setSelectedComponent(component.id)}
                  onMouseEnter={() => setHoveredComponent(component.id)}
                  onMouseLeave={() => setHoveredComponent(null)}
                  onFocus={() => setHoveredComponent(component.id)}
                  onBlur={() => setHoveredComponent(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${component.name}: ${component.description}. Click to view details.`}
                  aria-pressed={isSelected}
                >
                  {/* Component Circle */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center
                      transition-all duration-300 
                      ${isActive ? 'scale-125 border-opacity-100' : 'scale-100 border-opacity-20 group-hover:scale-110 group-hover:border-opacity-60'}
                      ${isSelected ? 'ring-4 ring-offset-2 ring-offset-[#1A1A1A]' : ''}
                      focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1A]`}
                    style={{
                      background: isSelected 
                        ? getGradientForComponent(component.id)
                        : isHovered
                        ? `${component.color}20`
                        : 'transparent',
                      borderColor: component.color,
                      boxShadow: isSelected 
                        ? `0 0 30px ${component.color}80, 0 0 60px ${component.color}40` 
                        : isHovered
                        ? `0 0 15px ${component.color}60`
                        : 'none',
                      transform: isSelected ? 'scale(1.25)' : isHovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
                      {component.id === 'solar-panels' && <Icons.Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                      {component.id === 'battery-storage' && <Icons.Battery className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                      {component.id === 'immersion-tank' && <Icons.Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                      {component.id === 'container' && <Icons.Server className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                    </div>
                  </div>

                  {/* Component Label */}
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none">
                    <span 
                      className={`text-xs sm:text-sm font-medium px-2 py-1 rounded transition-all duration-300 ${
                        isActive ? 'opacity-100 scale-105' : 'opacity-80'
                      }`}
                      style={{ 
                        color: component.color,
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        border: `1px solid ${component.color}40`
                      }}
                    >
                      {component.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Component Details Panel - Enhanced */}
          {selectedData && (
            <div 
              className="mt-6 sm:mt-8 bg-[#1A1A1A] border border-white/10 rounded-xl p-5 sm:p-6 animate-fadeIn"
              role="region"
              aria-label={`Details for ${selectedData.name}`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                  <h3 
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ color: selectedData.color }}
                  >
                    {selectedData.name}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">{selectedData.description}</p>
                </div>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="text-gray-400 hover:text-white transition-colors ml-4 p-1 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
                  aria-label="Close details panel"
                >
                  <Icons.X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {Object.entries(selectedData.details).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="text-center p-3 rounded-lg bg-black/30 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div 
                        className="p-1.5 rounded"
                        style={{ 
                          color: selectedData.color,
                          backgroundColor: `${selectedData.color}15`
                        }}
                      >
                        {getDetailIcon(key)}
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide mb-1.5">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="font-semibold text-white text-sm sm:text-base">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions - Enhanced */}
          {!selectedComponent && (
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Click on any component above to learn more about MODRON's infrastructure
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Use arrow keys to navigate • Press Escape to close
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

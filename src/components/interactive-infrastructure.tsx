"use client"

import { useState } from "react"
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
}

export function InteractiveInfrastructure() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)

  const getGradientForComponent = (componentId: string) => {
    switch (componentId) {
      case 'solar-panels':
        return 'linear-gradient(135deg, #d5aaf9 0%, #40d0f2 100%)'
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
      details: {
        capacity: "6x RTX 4090 GPUs",
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
      details: {
        capacity: "20ft ISO standard",
        efficiency: "Plug-and-play setup",
        deployment: "48-hour deployment",
        cost: "90% faster than traditional DC"
      }
    }
  ]

  const selectedData = components.find(c => c.id === selectedComponent)

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
          <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-2xl p-8 min-h-[500px] border border-white/10">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {components.map((comp, index) => {
                const nextComp = components[(index + 1) % components.length]
                return (
                  <line
                    key={`line-${index}`}
                    x1={`${comp.position.x}%`}
                    y1={`${comp.position.y}%`}
                    x2={`${nextComp.position.x}%`}
                    y2={`${nextComp.position.y}%`}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                )
              })}
            </svg>

            {/* Interactive Components */}
            {components.map((component) => (
              <div
                key={component.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${component.position.x}%`,
                  top: `${component.position.y}%`,
                }}
                onClick={() => setSelectedComponent(component.id)}
              >
                {/* Component Circle */}
                <div
                  className={`w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center
                    transition-all duration-300 group-hover:scale-110 group-hover:border-opacity-100
                    ${selectedComponent === component.id ? 'scale-110 border-opacity-100' : ''}`}
                  style={{
                    background: selectedComponent === component.id 
                      ? getGradientForComponent(component.id)
                      : 'transparent',
                    borderColor: component.color,
                    boxShadow: selectedComponent === component.id 
                      ? `0 0 20px ${component.color}80` 
                      : 'none'
                  }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    {component.id === 'solar-panels' && <Icons.Sun className="w-6 h-6 text-white" />}
                    {component.id === 'battery-storage' && <Icons.Battery className="w-6 h-6 text-white" />}
                    {component.id === 'immersion-tank' && <Icons.Cpu className="w-6 h-6 text-white" />}
                    {component.id === 'container' && <Icons.Server className="w-6 h-6 text-white" />}
                  </div>
                </div>

                {/* Component Label */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span 
                    className="text-sm font-medium px-2 py-1 rounded"
                    style={{ 
                      color: component.color,
                      backgroundColor: 'rgba(0,0,0,0.8)'
                    }}
                  >
                    {component.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Component Details Panel */}
          {selectedData && (
            <div className="mt-8 bg-[#1A1A1A]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6 animate-fadeIn">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ color: selectedData.color }}
                  >
                    {selectedData.name}
                  </h3>
                  <p className="text-gray-300">{selectedData.description}</p>
                </div>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icons.X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(selectedData.details).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          {!selectedComponent && (
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Click on any component above to learn more about MODRON's infrastructure
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

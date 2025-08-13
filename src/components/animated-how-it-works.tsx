"use client"

import { useEffect, useState, useMemo } from 'react'
import { CheckCircle, Server, Play, Sparkles, ArrowRight as ArrowRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface Step {
  id: number
  icon: React.ReactNode
  stepLabel: string
  title: string
  description: string
  gradient: string
  textColor: string
}

export function AnimatedHowItWorks() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])

  const steps: Step[] = useMemo(() => [
    {
      id: 1,
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      stepLabel: "STEP 1",
      title: "Select Instance",
      description: "Choose from GPU configurations optimized for your specific workload requirements.",
      gradient: "from-green-500 to-emerald-600",
      textColor: "text-green-400"
    },
    {
      id: 2,
      icon: <Server className="h-8 w-8 text-white" />,
      stepLabel: "STEP 2",
      title: "Connect to Container",
      description: "Access your container environment through secure SSH or web-based interface.",
      gradient: "from-emerald-500 to-green-600",
      textColor: "text-emerald-400"
    },
    {
      id: 3,
      icon: <Play className="h-8 w-8 text-white" />,
      stepLabel: "STEP 3",
      title: "Start Work",
      description: "Begin AI training, rendering, or data science workloads with full GPU acceleration.",
      gradient: "from-green-600 to-emerald-700",
      textColor: "text-green-500"
    },
    {
      id: 4,
      icon: <Sparkles className="h-8 w-8 text-white" />,
      stepLabel: "OPTIONAL",
      title: "Preconfigured AI Environments",
      description: "Use ready-to-go environments with popular AI frameworks and tools pre-installed.",
      gradient: "from-emerald-600 to-green-700",
      textColor: "text-emerald-500"
    }
  ], [])

  useEffect(() => {
    if (isVisible) {
      // Stagger the step reveals
      steps.forEach((step, index) => {
        setTimeout(() => {
          setVisibleSteps(prev => [...prev, step.id])
        }, index * 300) // 300ms delay between each step
      })
    }
  }, [isVisible, steps])

  return (
    <section id="how-it-works" className="relative py-20 bg-gradient-to-br from-black via-green-900/20 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 tracking-tight">
            How It Works
          </h2>
          <p className="text-xl md:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed">
            Get started with MODRON in just a few simple steps
          </p>
        </div>
        
        <div ref={ref as React.RefObject<HTMLDivElement>} className="max-w-6xl mx-auto">
          {/* Step-by-Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group">
                <div 
                  className={`bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-6 text-center hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-700 ease-out hover-lift h-full flex flex-col ${
                    visibleSteps.includes(step.id) 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-12 scale-95'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className={`mx-auto mb-4 w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 hover-glow`}>
                    {step.icon}
                  </div>
                  <div className={`${step.textColor} font-bold text-sm mb-2`}>{step.stepLabel}</div>
                  <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                  <p className="text-[#999999] text-sm leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
                
                {/* Animated Arrow for desktop */}
                {step.id < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div 
                      className={`w-8 h-8 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center transition-all duration-700 ${
                        visibleSteps.includes(step.id + 1) 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-75'
                      }`}
                      style={{
                        transitionDelay: `${(index + 1) * 100}ms`
                      }}
                    >
                      <ArrowRightIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual Flow Diagram for Mobile */}
          <div className="lg:hidden mb-12">
            <div className="flex flex-col items-center space-y-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div 
                    className={`w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-700 ${
                      visibleSteps.includes(step) 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-75'
                    }`}
                    style={{
                      transitionDelay: `${(step - 1) * 200}ms`
                    }}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div 
                      className={`w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 mx-4 transition-all duration-700 ${
                        visibleSteps.includes(step + 1) 
                          ? 'opacity-100 scale-y-100' 
                          : 'opacity-0 scale-y-0'
                      }`}
                      style={{
                        transitionDelay: `${step * 200}ms`
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div 
            className={`text-center transition-all duration-1000 ease-out ${
              visibleSteps.includes(4) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '1200ms'
            }}
          >
            <div className="bg-[#1A1A1A]/30 border border-[#262626] rounded-xl p-8 max-w-4xl mx-auto hover-lift">
              <h3 className="text-white font-bold text-xl mb-4">Ready to Get Started?</h3>
              <p className="text-[#CCCCCC] mb-6">
                Our streamlined process gets you up and running in minutes, not hours. 
                No complex setup required - just select, connect, and start working.
              </p>
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-[#4D4D4D] text-[#CCCCCC] hover:bg-[#262626] hover:border-[#666666] hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Header } from "@/components/header";
import { OptimizedScrollIndicator } from "@/components/optimized-scroll-indicator";

import { HoverCard } from "@/components/hover-card";
import { EnhancedForm } from "@/components/enhanced-form";
import { SkipToContent } from "@/components/skip-to-content";

import { MobileViewport } from "@/components/mobile-viewport";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/lib/icon-imports";
import { HeroBgVideo } from "@/components/hero-bg-video";
import Image from "next/image";
import { LoadingSkeleton } from "@/components/loading-skeleton";
 


import { ImmersionTankVideo } from "@/components/immersion-tank-video";
// Lazy-load heavier, below-the-fold components to reduce initial JS

import dynamic from 'next/dynamic';

// Lazy-load heavier, below-the-fold components to reduce initial JS
const AnimatedHowItWorks = dynamic(() => import("@/components/animated-how-it-works").then(mod => ({ default: mod.AnimatedHowItWorks })), {
  loading: () => <LoadingSkeleton />
});
const StaggeredReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.StaggeredReveal })));
const ProgressiveReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.ProgressiveReveal })));

import { EnhancedPricingButton } from "@/components/enhanced-pricing-button";
import { EnhancedBookingButton } from "@/components/enhanced-booking-button";
import { FloatingStatsOverlay } from "@/components/floating-stats-overlay";
import { AnimatedProgressBar } from "@/components/animated-progress-bar";
import { ParallaxSection } from "@/components/parallax-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedDivider } from "@/components/animated-divider";
import { InteractiveInfrastructure } from "@/components/interactive-infrastructure";
import { DynamicComparison } from "@/components/dynamic-comparison";
import { AnimatedCounter } from "@/components/animated-counter";
import { ScrollProgress } from "@/components/scroll-progress";
import { AnimatedHeadline } from "@/components/animated-headline";

export default function Home() {
  // Performance optimizations in progress - console logs removed for production
  
  return (
    <MobileViewport>

        <div className="min-h-screen bg-background relative scroll-container optimize-paint">
          <SkipToContent />
        
          <Header />
          <ScrollProgress />
          {/* Spotlight removed for performance */}
          
          <main id="main-content" tabIndex={-1} className="relative">
        
{/* Hero Section - Compressed */}
<section id="home" className="relative min-h-screen flex items-center justify-center w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16" role="banner" aria-labelledby="hero-heading">
  {/* Background Video */}
  <HeroBgVideo overlayOpacity={0} />

  {/* Main Content */}
  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mt-12 sm:mt-16 md:mt-18 lg:mt-24">
    {/* Main Headline - MODRON-specific and differentiated */}
      <AnimatedHeadline />
    
       {/* Subheading - MODRON's unique value proposition */}
    <p className="hero-subheading text-base sm:text-lg md:text-lg lg:text-xl text-gray-800 mb-3 sm:mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed font-semibold reveal reveal-delay will-change-transform px-4" style={{ letterSpacing: '0.1em' }}>      IMMERSION-COOLED. SOLAR-POWERED. MODULAR.
    </p>
    
    {/* Additional sub text - MODRON-specific description */}
    <p className="hero-description text-sm sm:text-base md:text-base lg:text-lg text-gray-800 mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed font-medium reveal reveal-delay-2 will-change-transform px-4">
      MODRON delivers locally-built, renewable-powered GPU clusters for Australian enterprises. 
      Immersion cooling meets solar energy in modular containers designed for rapid deployment and maximum efficiency.
    </p>
    
    {/* CTA Buttons - Enhanced with micro-interactions */}
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-6 sm:mb-8 md:mb-10">
      <div className="touch-feedback">
        <EnhancedBookingButton />
      </div>
      <div className="touch-feedback">
        <EnhancedPricingButton />
      </div>
    </div>
    
  {/* Floating Stats Overlay - Desktop only */}
  <div className="hidden lg:block">
    <FloatingStatsOverlay />
  </div>
  
  {/* Scroll Indicator */}
  <OptimizedScrollIndicator />
  </div>
  </section>

{/* Mission & Vision Section */}
<section id="vision" className="mobile-section relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-[#1A1A1A]/20 to-black" role="region" aria-labelledby="vision-heading">
  <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      {/* Mission Statement */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <ScrollReveal animation="fade" delay={0}>
          <h2 id="vision-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
            Our Mission
          </h2>
        </ScrollReveal>
        <ParallaxSection speed={0.3}>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#DDDDDD] leading-relaxed font-light max-w-5xl mx-auto mb-8 sm:mb-12 px-4">
            Building Australia's first sovereign and truly modular AI infrastructure platform. From local GPU assembly to solar-powered operations, MODRON delivers compute independence for Australian businesses, researchers, and government agencies.
          </p>
        </ParallaxSection>
        <ScrollReveal animation="zoom" delay={200}>
          <div className="w-24 h-1 bg-gradient-to-r from-[#d5aaf9] to-[#40d0f2] mx-auto"></div>
        </ScrollReveal>
      </div>
      
      {/* Why MODRON Grid */}
      <StaggeredReveal staggerDelay={150}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" role="list" aria-label="Why choose MODRON">
              {/* Renewable-powered */}
                <div className="text-center group hover-lift" role="listitem">
                  <div className="mobile-icon mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#d5aaf9' }} aria-hidden="true">
                  <Icons.Leaf className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-lg mb-3">Renewable-powered</h3>
                <p className="text-[#999999] leading-relaxed font-light text-sm sm:text-base">
                  Solar and grid-integrated power systems for sustainable operations
                </p>
              </div>

              {/* Immersion cooling = lower failure rates */}
                <div className="text-center group hover-lift">
                  <div className="mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#40d0f2' }}>
                  <Icons.Shield className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-lg mb-3">Immersion cooling = lower failure rates</h3>
                <p className="text-[#999999] leading-relaxed font-light text-sm sm:text-base">
                  Advanced liquid cooling technology ensures maximum reliability and performance
                </p>
              </div>

              {/* Operates at the edge of efficiency */}
                <div className="text-center group hover-lift">
                  <div className="mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#32ca73' }}>
                  <Icons.Gauge className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-lg mb-3">Operates at the edge of efficiency</h3>
                <p className="text-[#999999] leading-relaxed font-light text-sm sm:text-base">
                  Optimized systems delivering peak performance with minimal energy waste
                </p>
              </div>

              {/* Carbon-aware + Off-grid capable */}
                <div className="text-center group hover-lift">
                  <div className="mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#fbff52' }}>
                  <Icons.Globe className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-lg mb-3">Carbon-aware + Off-grid capable</h3>
                <p className="text-[#999999] leading-relaxed font-light text-sm sm:text-base">
                  Environmentally conscious infrastructure that can operate independently
                </p>
              </div>
            </div>
            </StaggeredReveal>
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      <AnimatedDivider variant="gradient" color="#40d0f2" />

      {/* MODRON Design Philosophy Section */}
      <section className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A]">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <ScrollReveal animation="slide-up" delay={0}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
                  MODRON's Design Philosophy
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="fade" delay={200}>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
                  Three pillars that define our approach to sovereign AI infrastructure
                </p>
              </ScrollReveal>
            </div>
            
            <StaggeredReveal staggerDelay={150}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-6 hover:border-[#d5aaf9]/30 transition-all duration-200 group">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#d5aaf9] transition-colors">Australian Sovereignty</h3>
                <p className="text-[#CCCCCC] text-sm leading-relaxed">
                  Locally assembled, locally operated, locally controlled. Every GPU cluster is built in Australia with Australian oversight and data residency guarantees.
                </p>
              </div>
              
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-6 hover:border-[#40d0f2]/30 transition-all duration-200 group">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#40d0f2] transition-colors">Renewable-First Operations</h3>
                <p className="text-[#CCCCCC] text-sm leading-relaxed">
                  Solar panels, battery storage, and grid integration designed for 80-95% renewable energy usage with carbon-neutral operations.
                </p>
              </div>
              
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-6 hover:border-[#32ca73]/30 transition-all duration-200 group">
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#32ca73] transition-colors">Container-Native Architecture</h3>
                <p className="text-[#CCCCCC] text-sm leading-relaxed">
                  Shipping container infrastructure enables rapid deployment, easy scaling, and disaster recovery across multiple Australian locations.
                </p>
              </div>
            </div>
            </StaggeredReveal>
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      <AnimatedDivider variant="wave" color="#32ca73" />

      {/* Technology & Infrastructure Section */}
      <section id="technology" className="mobile-section relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A]">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
              Technology & Infrastructure
            </h2>
            <p className="section-description text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
              Modular, scalable architecture designed for maximum performance and efficiency. Our hardware-first approach 
              combines cutting-edge RTX 4090 GPUs with revolutionary immersion cooling technology, all housed in 
              shipping container infrastructure for rapid deployment and scalability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            {/* Infrastructure Diagram - Desktop: Always visible */}
            <div className="hidden lg:block">
              <ProgressiveReveal delay={200}>
              <div className="relative">
                  <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-2xl p-4 sm:p-6 md:p-8" style={{ willChange: 'transform' }}>
                  {/* Solar + Grid Power */}
                  <div className="flex items-center justify-center mb-6 sm:mb-8">
                      <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                      <Icons.Sun className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                      <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                      <Icons.Power className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <div className="ml-2 sm:ml-4 text-white font-semibold text-sm sm:text-base">Solar + Grid Hybrid Power</div>
                  </div>
                  
                  {/* Connection Line */}
                  <div className="flex justify-center mb-6 sm:mb-8">
                      <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#d5aaf9] to-[#40d0f2]" style={{ willChange: 'transform' }}></div>
                  </div>
                  
                  {/* GPU Tank */}
                  <div className="mb-6 sm:mb-8">
                    <ImmersionTankVideo className="h-48 sm:h-64" />
                  </div>
                  
                  {/* Connection Line */}
                  <div className="flex justify-center mb-6 sm:mb-8">
                      <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#40d0f2] to-[#32ca73]" style={{ willChange: 'transform' }}></div>
                  </div>
                  
                  {/* Network Layer */}
                  <div className="flex items-center justify-center">
                      <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#d5aaf9]">
                      <Icons.Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                      <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#fbff52] to-[#d5aaf9]">
                      <Icons.Network className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <div className="ml-2 sm:ml-4 text-white font-semibold text-sm sm:text-base">Vast.ai + Direct Connect</div>
                  </div>
                </div>
              </div>
              </ProgressiveReveal>
            </div>

            {/* Infrastructure Diagram - Mobile: Progressive Disclosure */}
            <div className="lg:hidden">
              <details className="group mb-6">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-between p-4 bg-[#1A1A1A]/50 border border-[#262626] rounded-xl hover:border-[#d5aaf9]/30 transition-all duration-200">
                    <h3 className="text-white font-semibold text-lg">Infrastructure Overview</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#40d0f2] text-sm font-medium">View Details</span>
                      <Icons.ChevronDown className="h-5 w-5 text-[#40d0f2] transition-transform duration-200 group-open:rotate-180" />
                    </div>
                  </div>
                </summary>
                
                <div className="mt-4 p-4 bg-[#1A1A1A]/30 border border-[#262626] rounded-xl">
                  <ProgressiveReveal delay={200}>
                    <div className="relative">
                      <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-2xl p-4 sm:p-6 md:p-8" style={{ willChange: 'transform' }}>
                        {/* Solar + Grid Power */}
                        <div className="flex items-center justify-center mb-6 sm:mb-8">
                            <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                            <Icons.Sun className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                            <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                            <Icons.Power className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                          <div className="ml-2 sm:ml-4 text-white font-semibold text-sm sm:text-base">Solar + Grid Hybrid Power</div>
                        </div>
                        
                        {/* Connection Line */}
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#d5aaf9] to-[#40d0f2]" style={{ willChange: 'transform' }}></div>
                        </div>
                        
                        {/* GPU Tank */}
                        <div className="mb-6 sm:mb-8">
                          <ImmersionTankVideo className="h-48 sm:h-64" />
                        </div>
                        
                        {/* Connection Line */}
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#40d0f2] to-[#32ca73]" style={{ willChange: 'transform' }}></div>
                        </div>
                        
                        {/* Network Layer */}
                        <div className="flex items-center justify-center">
                            <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#d5aaf9]">
                            <Icons.Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                            <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#fbff52] to-[#d5aaf9]">
                            <Icons.Network className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                          <div className="ml-2 sm:ml-4 text-white font-semibold text-sm sm:text-base">Vast.ai + Direct Connect</div>
                        </div>
                      </div>
                    </div>
                  </ProgressiveReveal>
                </div>
              </details>
            </div>
            
            {/* Infrastructure Details */}
            <StaggeredReveal staggerDelay={100}>
            <div className="space-y-6 sm:space-y-8">
              {/* GPU Nodes */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 hover:border-[#d5aaf9]/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#d5aaf9' }}>
                    <Icons.Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">MODRON GPU Clusters</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-sm sm:text-base">6× RTX 4090 24GB, Australian-assembled, immersion-cooled</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Locally sourced components with Australian quality control and support.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Immersion Cooling */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 hover:border-[#40d0f2]/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#40d0f2' }}>
                    <Icons.Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Immersion Cooling</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-sm sm:text-base">Proprietary liquid cooling system</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Advanced immersion cooling technology reduces failure rates by 60% while maintaining peak performance and enabling higher compute density.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Solar + Grid Hybrid */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 hover:border-[#32ca73]/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#32ca73' }}>
                    <Icons.Zap className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Solar + Battery Hybrid</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-sm sm:text-base">Australian-made solar panels, advanced battery storage integration</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Grid-independent operation with intelligent energy management.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Vast.ai + Direct Connect */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 hover:border-[#d5aaf9]/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#fbff52' }}>
                    <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Container Infrastructure</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-sm sm:text-base">ISO shipping containers, rapid deployment, disaster recovery</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Deploy anywhere in Australia within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </StaggeredReveal>
          </div>
        </div>
      </section>

      {/* Interactive Infrastructure Section */}
      <section className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-[#32ca73]/10 to-black">
        <InteractiveInfrastructure />
      </section>

      {/* Animated Divider */}
      <AnimatedDivider variant="dots" color="#d5aaf9" />

      {/* MODRON Performance Advantages Section */}
      <section className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-[#40d0f2]/10 to-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
                MODRON Performance Advantages
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
                Measurable benefits of our immersion-cooled, solar-powered approach
              </p>
            </div>
            
            <StaggeredReveal staggerDelay={150}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-6 hover:border-[#40d0f2]/30 transition-all duration-300 hover:scale-105 group">
                <h3 className="text-white font-bold text-lg mb-4">Cooling Efficiency</h3>
                <div className="mb-6">
                  <div className="text-5xl font-bold text-[#40d0f2] mb-2">
                    <AnimatedCounter end={60} duration={2000} suffix="%" />
                  </div>
                  <p className="text-white text-sm font-semibold mb-4">Failure Rate Reduction</p>
                  <AnimatedProgressBar 
                    value={60} 
                    label="" 
                    color="#40d0f2"
                    delay={0}
                  />
                </div>
                <p className="text-[#999999] text-sm">Immersion cooling vs traditional air cooling</p>
              </div>
              
              <div className="text-center bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-6 hover:border-[#32ca73]/30 transition-all duration-300 hover:scale-105 group">
                <h3 className="text-white font-bold text-lg mb-4">Energy Efficiency</h3>
                <div className="mb-6">
                  <div className="text-5xl font-bold text-[#32ca73] mb-2">
                    <AnimatedCounter end={40} duration={2000} suffix="%" delay={100} />
                  </div>
                  <p className="text-white text-sm font-semibold mb-4">Power Consumption Savings</p>
                  <AnimatedProgressBar 
                    value={40} 
                    label="" 
                    color="#32ca73"
                    delay={200}
                  />
                </div>
                <p className="text-[#999999] text-sm">Immersion cooling + renewable energy optimization</p>
              </div>
              
              <div className="text-center bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-6 hover:border-[#d5aaf9]/30 transition-all duration-300 hover:scale-105 group">
                <h3 className="text-white font-bold text-lg mb-4">Deployment Speed</h3>
                <div className="mb-6">
                  <div className="text-5xl font-bold text-[#d5aaf9] mb-2">
                    <AnimatedCounter end={90} duration={2000} suffix="%" delay={200} />
                  </div>
                  <p className="text-white text-sm font-semibold mb-4">Setup Time Reduction</p>
                  <AnimatedProgressBar 
                    value={90} 
                    label="" 
                    color="#d5aaf9"
                    delay={400}
                  />
                </div>
                <p className="text-[#999999] text-sm">Container-based infrastructure vs traditional data centers</p>
              </div>
            </div>
            </StaggeredReveal>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="relative z-10 overflow-visible py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-[#d5aaf9]/10 to-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
              Use Cases
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
              Sovereign AI infrastructure for Australian enterprises, government, and research institutions
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {/* AI Workflow Diagram */}
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-2xl p-4 sm:p-6 md:p-8 overflow-hidden relative z-0">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">AI Development Workflow</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {/* Data Preparation */}
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#d5aaf9' }}>
                      <Icons.Database className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Data Preparation</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Raw data processing and preprocessing</p>
                  </div>
                  
                  {/* Model Training */}
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#40d0f2' }}>
                      <Icons.Brain className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Model Training</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Neural network training and optimization</p>
                  </div>
                  
                  {/* Model Evaluation */}
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#32ca73' }}>
                      <Icons.BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Model Evaluation</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Performance testing and validation</p>
                  </div>
                  
                  {/* Deployment */}
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#fbff52' }}>
                      <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Deployment</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Production deployment and serving</p>
                  </div>
                </div>
                
                {/* Connection Lines */}
                <div className="hidden lg:block mt-8">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-1 bg-gradient-to-r from-[#d5aaf9] to-[#40d0f2] rounded-full"></div>
                    <div className="w-8 h-1 bg-gradient-to-r from-[#32ca73] to-[#d5aaf9] rounded-full"></div>
                    <div className="w-8 h-1 bg-gradient-to-r from-[#d5aaf9] to-[#40d0f2] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pointer-events-none h-4"></div>
            <StaggeredReveal staggerDelay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mt-6 relative z-10">
            {/* Australian Government AI */}
            <HoverCard 
              className="bg-[#1A1A1A]/50 border-[#262626]"
              icon={
                <div className="mx-auto w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                  <Icons.Shield className="h-8 w-8 text-black" />
                </div>
              }
              title="Australian Government AI"
              description="Secure, sovereign compute for defense, healthcare, and public services with guaranteed data residency"
            >
              <div className="text-sm text-[#999999] space-y-1">
                <p>• Defense & Security AI</p>
                <p>• Healthcare Data Analysis</p>
                <p>• Public Service Automation</p>
                <p>• Emergency Response Systems</p>
              </div>
            </HoverCard>

            {/* Australian Research & Academia */}
            <HoverCard 
              className="bg-[#1A1A1A]/50 border-[#262626]"
              icon={
                <div className="mx-auto w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#32ca73] to-[#d5aaf9]">
                  <Icons.Brain className="h-8 w-8 text-black" />
                </div>
              }
              title="Australian Research & Academia"
              description="Renewable-powered research clusters for universities and CSIRO with carbon-neutral operations"
            >
              <div className="text-sm text-[#999999] space-y-1">
                <p>• University Research Projects</p>
                <p>• CSIRO Scientific Computing</p>
                <p>• Climate & Environmental Modeling</p>
                <p>• Medical Research AI</p>
              </div>
            </HoverCard>

            {/* Australian Enterprise */}
            <Card className="bg-[#1A1A1A]/50 border-[#262626] pt-2 hover:border-[#d5aaf9]/50 hover:shadow-lg hover:shadow-[#d5aaf9]/20 transition-all duration-300 group overflow-visible">
              <CardHeader className="text-center pt-6 pb-4">
                <div className="mx-auto mb-4 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                  <Icons.Server className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-white text-xl">Australian Enterprise</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-[#CCCCCC] text-base mb-4">
                  Locally-built infrastructure for mining, agriculture, and finance with Australian support and compliance
                </CardDescription>
                <div className="text-sm text-[#999999] space-y-1">
                  <p>• Mining & Resources AI</p>
                  <p>• Agricultural Automation</p>
                  <p>• Financial Services</p>
                  <p>• Supply Chain Optimization</p>
                </div>
              </CardContent>
            </Card>

            {/* Sovereign AI Development */}
            <Card className="bg-[#1A1A1A]/50 border-[#262626] pt-2 hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group overflow-visible">
              <CardHeader className="text-center pt-6 pb-4">
                <div className="mx-auto mb-4 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover bg-gradient-to-br from-[#fbff52] to-[#d5aaf9]">
                  <Icons.Code className="h-8 w-8 text-black" />
                </div>
                <CardTitle className="text-white text-xl">Sovereign AI Development</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-[#CCCCCC] text-base mb-4">
                  Build and deploy AI models with complete data sovereignty and Australian oversight
                </CardDescription>
                <div className="text-sm text-[#999999] space-y-1">
                  <p>• Custom AI Model Training</p>
                  <p>• Secure Data Processing</p>
                  <p>• Australian AI Standards</p>
                  <p>• Compliance & Auditing</p>
                </div>
              </CardContent>
            </Card>
          </div>
            </StaggeredReveal>
          </div>
        </div>
      </section>

      {/* Dynamic Competitive Comparison Section */}
      <section className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-[#40d0f2]/10 to-black">
        <DynamicComparison />
      </section>

      {/* Features Grid Section */}
      <section id="features" className="relative z-10 overflow-visible py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A]">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
              Enterprise Features
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
              Advanced capabilities designed for enterprise-grade reliability and flexibility
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {/* Enterprise System Architecture Diagram */}
            <div className="mb-12 sm:mb-16 md:mb-20">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">Enterprise System Architecture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Infrastructure Layer */}
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#d5aaf9' }}>
                      <Icons.Server className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Infrastructure Layer</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">GPU clusters, cooling systems, power management</p>
                  </div>
                  
                  {/* Platform Layer */}
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#32ca73' }}>
                      <Icons.Cloud className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Platform Layer</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Container orchestration, APIs, monitoring</p>
                  </div>
                  
                  {/* Application Layer */}
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#40d0f2' }}>
                      <Icons.Code className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Application Layer</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">AI workloads, enterprise integrations</p>
                  </div>
                </div>
                
                {/* Connection Lines */}
                <div className="hidden lg:block mt-8">
                  <div className="flex justify-center items-center space-x-8">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#d5aaf9] to-[#40d0f2] rounded-full"></div>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#32ca73] to-[#d5aaf9] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop: Show all features */}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Always-on Availability */}
            <div className="group cursor-pointer">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                    <Icons.Clock className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Always-on Availability</h3>
                </div>
                <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                  99.9% uptime guarantee with redundant systems and automatic failover for continuous operations.
                </p>
              </div>
            </div>

            {/* Clean Energy Credits */}
            <div className="group cursor-pointer">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#d5aaf9]">
                    <Icons.Award className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Clean Energy Credits</h3>
                </div>
                <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                  Earn carbon credits and sustainability certifications through our renewable-powered infrastructure.
                </p>
              </div>
            </div>

            {/* Custom Containers & APIs */}
            <div className="group cursor-pointer">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                    <Icons.Settings className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Custom Containers & APIs</h3>
                </div>
                <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                  Tailored container environments and RESTful APIs for seamless integration with your workflows.
                </p>
              </div>
            </div>

            {/* Spot & Reserved Instances */}
            <div className="group cursor-pointer">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#fbff52] to-[#d5aaf9]">
                    <Icons.Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Spot & Reserved Instances</h3>
                </div>
                <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                  Flexible pricing options with spot instances for cost optimization and reserved instances for guaranteed capacity.
                </p>
              </div>
            </div>

            {/* Remote Monitoring */}
            <div className="group cursor-pointer">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-700/50 hover:shadow-lg hover:shadow-green-700/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#d5aaf9]">
                    <Icons.Eye className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Remote Monitoring</h3>
                </div>
                <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                  Real-time monitoring dashboard with performance metrics, alerts, and automated health checks.
                </p>
              </div>
            </div>

            {/* Dedicated Support */}
            <div className="group cursor-pointer">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#d5aaf9]/50 hover:shadow-lg hover:shadow-[#d5aaf9]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                    <Icons.Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Dedicated Support</h3>
                </div>
                <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                  24/7 technical support with dedicated account managers and priority response times for enterprise clients.
                </p>
              </div>
            </div>
            </div>

            {/* Mobile: Progressive disclosure */}
            <div className="md:hidden space-y-4">
              {/* Show first 2 features by default */}
              <div className="grid grid-cols-1 gap-6">
                {/* Always-on Availability */}
                <div className="group cursor-pointer">
                  <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                        <Icons.Clock className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                      </div>
                      <h3 className="text-white font-bold text-base sm:text-lg">Always-on Availability</h3>
                    </div>
                    <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                      99.9% uptime guarantee with redundant systems and automatic failover for continuous operations.
                    </p>
                  </div>
                </div>
                
                {/* Clean Energy Credits */}
                <div className="group cursor-pointer">
                  <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#d5aaf9]">
                        <Icons.Award className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                      </div>
                      <h3 className="text-white font-bold text-base sm:text-lg">Clean Energy Credits</h3>
                    </div>
                    <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                      Earn carbon credits and sustainability certifications through our renewable-powered infrastructure.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Progressive disclosure for remaining features */}
              <details className="group">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-center p-4 bg-[#1A1A1A]/50 border border-[#262626] rounded-xl hover:border-[#d5aaf9]/30 transition-all duration-200">
                    <span className="text-[#40d0f2] font-medium mr-2">View More Features</span>
                    <Icons.ChevronDown className="h-5 w-5 text-[#40d0f2] transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                
                <div className="mt-4 grid grid-cols-1 gap-6">
                  {/* Custom Containers & APIs */}
                  <div className="group cursor-pointer">
                    <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                          <Icons.Settings className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                        </div>
                        <h3 className="text-white font-bold text-base sm:text-lg">Custom Containers & APIs</h3>
                      </div>
                      <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                        Tailored container environments and RESTful APIs for seamless integration with your workflows.
                      </p>
                    </div>
                  </div>

                  {/* Spot & Reserved Instances */}
                  <div className="group cursor-pointer">
                    <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#fbff52] to-[#d5aaf9]">
                          <Icons.Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                        </div>
                        <h3 className="text-white font-bold text-base sm:text-lg">Spot & Reserved Instances</h3>
                      </div>
                      <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                        Flexible pricing options with spot instances for cost optimization and reserved instances for guaranteed capacity.
                      </p>
                    </div>
                  </div>

                  {/* Remote Monitoring */}
                  <div className="group cursor-pointer">
                    <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-700/50 hover:shadow-lg hover:shadow-green-700/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#d5aaf9]">
                          <Icons.Eye className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                        </div>
                        <h3 className="text-white font-bold text-base sm:text-lg">Remote Monitoring</h3>
                      </div>
                      <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                        Real-time monitoring dashboard with performance metrics, alerts, and automated health checks.
                      </p>
                    </div>
                  </div>

                  {/* Dedicated Support */}
                  <div className="group cursor-pointer">
                    <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#d5aaf9]/50 hover:shadow-lg hover:shadow-[#d5aaf9]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-3 sm:mr-4 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                          <Icons.Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                        </div>
                        <h3 className="text-white font-bold text-base sm:text-lg">Dedicated Support</h3>
                      </div>
                      <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                        24/7 technical support with dedicated account managers and priority response times for enterprise clients.
                      </p>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <AnimatedHowItWorks />

      {/* Pricing Section */}
      <section id="pricing" className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-[#40d0f2]/10 to-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
                Transparent Pricing
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
                Competitive rates with built-in sustainability. No hidden costs, no carbon guilt.
              </p>
            </div>

            {/* Competitive Comparison */}
            <div className="mb-16 sm:mb-20">
              <div className="text-center mb-12 sm:mb-16">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 sm:mb-8 tracking-tight">
                  Competitive Comparison
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-[#CCCCCC] max-w-3xl mx-auto font-light leading-relaxed">
                  See how MODRON's renewable-powered infrastructure compares to traditional cloud providers
                </p>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[800px] sm:min-w-0">
                  <table className="w-full bg-[#1A1A1A]/50 border border-[#262626] rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-[#262626]/50">
                        <th className="text-left p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Provider</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Price/hr (AUD)</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Renewable Energy</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Australian Assembly</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Deployment Speed</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Data Residency</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#333333] bg-[#d5aaf9]/10">
                        <td className="p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">MODRON</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">$0.54–$0.80</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">80–95%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">Yes - Local Manufacturing</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">48 hours</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">100% Australian</td>
                      </tr>
                      <tr className="border-t border-[#333333]">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">AWS</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$1.20+</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">20-30%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">No - Imported</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Weeks/Months</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">International</td>
                      </tr>
                      <tr className="border-t border-[#333333]">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">GCP</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$1.10+</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">25-35%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">No - Imported</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Weeks/Months</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">International</td>
                      </tr>
                      <tr className="border-t border-[#333333]">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">Lambda Labs</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$0.90</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">40-50%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">No - Imported</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Weeks/Months</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">International</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {/* MODRON Card */}
                <div className="bg-[#d5aaf9]/10 border border-[#d5aaf9]/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-bold text-lg">MODRON</h4>
                    <span className="text-[#40d0f2] font-bold text-lg">$0.54–$0.80</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#999999]">Renewable:</span>
                      <span className="text-[#40d0f2] font-semibold ml-2">80–95%</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Australian:</span>
                      <span className="text-[#40d0f2] font-semibold ml-2">Yes</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Deploy:</span>
                      <span className="text-[#40d0f2] font-semibold ml-2">48 hours</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Data:</span>
                      <span className="text-[#40d0f2] font-semibold ml-2">100% AU</span>
                    </div>
                  </div>
                </div>

                {/* AWS Card */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-bold text-lg">AWS</h4>
                    <span className="text-[#CCCCCC] font-bold text-lg">~$1.20+</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#999999]">Renewable:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">20-30%</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Australian:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">No</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Deploy:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Weeks</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Data:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">International</span>
                    </div>
                  </div>
                </div>

                {/* GCP Card */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-bold text-lg">GCP</h4>
                    <span className="text-[#CCCCCC] font-bold text-lg">~$1.10+</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#999999]">Renewable:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">25-35%</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Cooling:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Air</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Dedicated:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Often Shared</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">SLA:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">99.5%</span>
                    </div>
                  </div>
                </div>

                {/* Lambda Labs Card */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-bold text-lg">Lambda Labs</h4>
                    <span className="text-[#CCCCCC] font-bold text-lg">~$0.90</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#999999]">Renewable:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">40-50%</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Cooling:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Air</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Dedicated:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Yes</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">SLA:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">99.9%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-[#999999] text-sm">
                  * Prices shown for equivalent RTX 4090 class GPU instances
                </p>
              </div>
            </div>

            {/* Pre-Launch Offer - BACKUP (COMMENTED OUT) */}
            {/* 
            <div className="bg-gradient-to-br from-[#d5aaf9]/20 to-[#40d0f2]/20 border border-[#d5aaf9]/30 rounded-2xl p-8 sm:p-12 text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2] rounded-xl flex items-center justify-center">
                <Icons.Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Pre-Launch Offer
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[#CCCCCC] mb-6 sm:mb-8 max-w-2xl mx-auto">
                Early waitlist members receive priority access to new clusters and pre-launch pricing for the first 6 months.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center text-[#40d0f2] font-bold text-base sm:text-lg">
                  <Icons.Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Priority Access
                </div>
                <div className="flex items-center text-[#40d0f2] font-bold text-base sm:text-lg">
                  <Icons.CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Pre-Launch Pricing
                </div>
                <div className="flex items-center text-[#40d0f2] font-bold text-base sm:text-lg">
                  <Icons.Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  6 Months Duration
                </div>
              </div>
              <WaitlistModal />
            </div>
            */}

            {/* Pre-Launch Offer - ENHANCED VERSION */}
            <div className="bg-gradient-to-br from-[#32ca73]/20 to-[#40d0f2]/20 border border-[#32ca73]/30 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-2 h-2 bg-[#40d0f2]/30 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-[#32ca73]/40 rounded-full animate-ping"></div>
                <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-[#d5aaf9]/20 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-10 w-1 h-1 bg-[#40d0f2]/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-[#32ca73]/15 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              </div>

              {/* Enhanced Star Icon */}
              <div className="mx-auto mb-6 w-16 h-16 rounded-xl flex items-center justify-center relative group" style={{ backgroundColor: '#d5aaf9' }}>
                <Icons.Star className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" style={{ backgroundColor: '#d5aaf9' }}></div>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Pre-Launch Offer
              </h3>
              
              <p className="text-base sm:text-lg md:text-xl text-[#CCCCCC] mb-6 sm:mb-8 max-w-2xl mx-auto">
                Early waitlist members receive priority access to new clusters and pre-launch pricing for the first 6 months.
              </p>



              {/* Interactive Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-[#40d0f2]/10 border border-[#40d0f2]/20 rounded-xl p-4 hover:bg-[#40d0f2]/20 hover:border-[#40d0f2]/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.Clock className="h-6 w-6 text-[#40d0f2] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-[#40d0f2] font-bold text-sm">Priority Access</p>
                    <p className="text-[#999999] text-xs mt-1">Skip the queue</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-[#32ca73]/10 border border-[#32ca73]/20 rounded-xl p-4 hover:bg-[#32ca73]/20 hover:border-[#32ca73]/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.CheckCircle className="h-6 w-6 text-[#32ca73] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-[#32ca73] font-bold text-sm">Pre-Launch Pricing</p>
                    <p className="text-[#999999] text-xs mt-1">Exclusive rates</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-[#32ca73]/10 border border-[#32ca73]/20 rounded-xl p-4 hover:bg-[#32ca73]/20 hover:border-[#32ca73]/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.Zap className="h-6 w-6 text-[#32ca73] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-[#32ca73] font-bold text-sm">6 Months Duration</p>
                    <p className="text-[#999999] text-xs mt-1">Limited time</p>
                  </div>
                </div>
              </div>



              {/* Enhanced CTA */}
              <EnhancedBookingButton />
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-[#32ca73]/10 to-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#CCCCCC] mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Join the future of sustainable AI computing. Get in touch to discuss your requirements or start your free trial today.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 md:mb-20">
              <EnhancedBookingButton />
            </div>

            {/* Contact Form */}
            <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h3>
              <p className="text-[#999999] mb-6 sm:mb-8 text-sm sm:text-base">
                Have questions? Send us a message and we&apos;ll get back to you within 24 hours.
              </p>
              
              <EnhancedForm />
            </div>
          </div>
        </div>
      </section>


      </main>
      
      {/* Footer */}
      <footer className="bg-black border-t border-[#d5aaf9]/20" role="contentinfo">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            {/* Company Info */}
            <div className="mb-8 sm:mb-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Image
                    src="/Modron_logo.png"
                    alt="MODRON - Sustainable AI Infrastructure"
                    width={200}
                    height={53}
                    className="h-12 sm:h-16 w-auto"
                    priority
                  />
                </div>
                <div className="flex justify-center">
                <p className="text-[#999999] text-sm sm:text-base text-center leading-tight whitespace-nowrap pr-[7px]">
  Modular Operations Data Resource Optimization Network
</p>              
                </div>
              </div>
            </div>

            {/* Contact Information removed at user's request */}



            {/* Legal Text */}
            <div className="border-t border-[#262626] pt-6 sm:pt-8">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6 xl:space-x-8 text-xs sm:text-sm text-[#666666] px-4">
                <span>NSW, Australia</span>
                <span>&copy; 2025. All rights reserved.</span>
                <a href="/privacy" className="hover:text-[#999999] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">Privacy Policy</a>
                <a href="/terms" className="hover:text-[#999999] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">Terms of Service</a>
                <a href="/cookies" className="hover:text-[#999999] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

        </div>

    </MobileViewport>
  );
}

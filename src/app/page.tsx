"use client"

import React from "react";

// Suppress hydration warnings caused by browser extensions
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Hydration failed')) {
      return;
    }
    originalError.apply(console, args);
  };
}
import { OptimizedScrollIndicator } from "@/components/optimized-scroll-indicator";

import { EnhancedForm } from "@/components/enhanced-form";
import { SkipToContent } from "@/components/skip-to-content";
import { MobileViewport } from "@/components/mobile-viewport";
import { Icons } from "@/lib/icon-imports";
import { HeroBgVideo } from "@/components/hero-bg-video";
import Image from "next/image";
 
// Lazy-load non-critical components
const ImmersionTankVideo = dynamic(() => import("@/components/immersion-tank-video").then(mod => ({ default: mod.ImmersionTankVideo })));
// Lazy-load heavier, below-the-fold components to reduce initial JS

import dynamic from 'next/dynamic';

// Lazy-load heavier, below-the-fold components to reduce initial JS
const StaggeredReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.StaggeredReveal })));
const ProgressiveReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.ProgressiveReveal })));

import { Header } from "@/components/header";
import { EnhancedPricingButton } from "@/components/enhanced-pricing-button";
import { EnhancedBookingButton } from "@/components/enhanced-booking-button";
// Lazy-load below-the-fold components
// const FloatingStatsOverlay = dynamic(() => import("@/components/floating-stats-overlay").then(mod => ({ default: mod.FloatingStatsOverlay })), {
//   loading: () => <div className="hidden lg:block" />
// }); // REMOVED - cleaner hero without cards
const ParallaxSection = dynamic(() => import("@/components/parallax-section").then(mod => ({ default: mod.ParallaxSection })));
const ScrollReveal = dynamic(() => import("@/components/scroll-reveal").then(mod => ({ default: mod.ScrollReveal })));
// AnimatedDivider removed - using clean spacing instead
const InteractiveInfrastructure = dynamic(() => import("@/components/interactive-infrastructure").then(mod => ({ default: mod.InteractiveInfrastructure })));
const DynamicComparison = dynamic(() => import("@/components/dynamic-comparison").then(mod => ({ default: mod.DynamicComparison })));
const ScrollProgress = dynamic(() => import("@/components/scroll-progress").then(mod => ({ default: mod.ScrollProgress })));
const AnimatedHeadline = dynamic(() => import("@/components/animated-headline").then(mod => ({ default: mod.AnimatedHeadline })));

export default function Home() {
  // Performance optimizations in progress - console logs removed for production
  const [showWorkflowDetails, setShowWorkflowDetails] = React.useState(false)
  const [showUseCaseDetails, setShowUseCaseDetails] = React.useState(false)
  const [activeUseCaseTab, setActiveUseCaseTab] = React.useState<'ai-development' | 'industry-applications' | 'enterprise-features' | 'gpu-solutions'>('ai-development')
  const [showCompetitiveComparison, setShowCompetitiveComparison] = React.useState(false)
  const [showVisionDetails, setShowVisionDetails] = React.useState(false)
  const [showContactForm, setShowContactForm] = React.useState(false)
  
  
  return (
    <MobileViewport>

        <div className="min-h-screen bg-background relative scroll-container optimize-paint">
          <SkipToContent />
        
          <Header />
          <ScrollProgress />
          {/* Spotlight removed for performance */}
          
          <main id="main-content" tabIndex={-1} className="relative">
        
{/* Hero Section - Compressed */}
<section id="home" className="nav-trigger-home relative min-h-screen flex items-center justify-center w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16" role="banner" aria-labelledby="hero-heading">
  
  {/* Background Video */}
  <HeroBgVideo overlayOpacity={0} />

  {/* Main Content */}
  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mt-12 sm:mt-16 md:mt-18 lg:mt-24">
    {/* Main Headline - MODRON-specific and differentiated */}
      <AnimatedHeadline />
    
       {/* Subheading - MODRON's unique value proposition */}
    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-3 sm:mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed font-semibold px-4" style={{ letterSpacing: '0.1em', color: '#1f2937' }}>      MODULAR. IMMERSION-COOLED. SOLAR-POWERED.
    </p>
    
    {/* Additional sub text - MODRON-specific description */}
    <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed font-normal px-4" style={{ color: '#1f2937' }}>
      MODRON delivers locally-built, renewable-powered GPU clusters for Australian enterprises. 
      Deploy anywhere in Australia within 48 hours using modular containers with industry-leading compute density and immersion cooling.
    </p>
    
    {/* CTA Buttons - Enhanced with micro-interactions */}
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-6 sm:mb-8 md:mb-10">
      <div className="touch-feedback w-full sm:w-auto">
        <EnhancedBookingButton onOpenContactForm={() => setShowContactForm(true)} />
      </div>
      <div className="touch-feedback w-full sm:w-auto">
        <EnhancedPricingButton />
      </div>
    </div>
    
  {/* Floating Stats Overlay - REMOVED for cleaner hero */}
  
  {/* Scroll Indicator */}
  <OptimizedScrollIndicator />
  </div>
  </section>

{/* Mission & Vision Section */}
<section id="vision" className="nav-trigger-vision mobile-section relative layout-section mobile-optimized bg-black" role="region" aria-labelledby="vision-heading">
  <div className="layout-container-wide">
    <div className="layout-content-wide">
      {/* Mission Statement - Updated for fresh deployment */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <ScrollReveal animation="fade" delay={0}>
            <h2 id="vision-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 sm:mb-12 tracking-tight">
            Vision
          </h2>
        </ScrollReveal>
        <ParallaxSection speed={0.3}>
          <p className="text-body text-gray-500 leading-relaxed !font-bold max-w-5xl mx-auto mb-8 px-4">
            Australia's first sovereign AI infrastructure platform. Locally assembled, solar powered, and modular, delivering compute independence for Australian businesses, researchers, and government agencies.
          </p>
          <p className="text-body text-gray-400 leading-relaxed font-light max-w-4xl mx-auto mb-12 sm:mb-16 px-4">
            Built on three pillars: Australian sovereignty, renewable first operations, and container native architecture.
          </p>
        </ParallaxSection>
        <ScrollReveal animation="zoom" delay={200}>
          <div className="w-24 h-1 bg-gradient-to-r from-[#32ca73] to-[#40d0f2] mx-auto mt-4"></div>
        </ScrollReveal>
      </div>
      
      {/* Mobile Progressive Disclosure Trigger */}
      <div className="block sm:hidden text-center mb-8">
        <button
          onClick={() => {
            console.log('Vision details button clicked, current state:', showVisionDetails);
            setShowVisionDetails(!showVisionDetails);
          }}
          className="w-full bg-black border border-[#4A4A4A] text-gray-400 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto touch-friendly"
        >
          <span className="font-medium mr-2">Why MODRON</span>
          <Icons.ChevronDown className={`h-4 w-4 transition-normal ${showVisionDetails ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Why MODRON Grid */}
        <StaggeredReveal staggerDelay={150}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 grid-gap ${showVisionDetails ? 'block' : 'hidden sm:grid'}`} role="list" aria-label="Why choose MODRON">
              {/* Australian Sovereignty */}
                <div className="text-center group hover-lift" role="listitem">
                  <div className="mobile-icon mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#d5aaf9' }} aria-hidden="true">
                  <Icons.Shield className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-body mb-3">Australian Sovereignty</h3>
                <p className="text-gray-300 leading-relaxed font-light text-caption">
                  Locally assembled, operated, and controlled with data residency guarantees
                </p>
              </div>

              {/* Renewable & Carbon-Neutral */}
              <div className="text-center group hover-lift" role="listitem">
                  <div className="mobile-icon mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#32ca73' }} aria-hidden="true">
                  <Icons.Leaf className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-body mb-3">Renewable & Carbon-Neutral</h3>
                <p className="text-gray-300 leading-relaxed font-light text-caption">
                  80-95% renewable energy with solar panels, battery storage, and off-grid capability
                </p>
              </div>
              
              {/* Container-Native Architecture */}
                <div className="text-center group hover-lift" role="listitem">
                  <div className="mobile-icon mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#fbff52' }} aria-hidden="true">
                  <Icons.Server className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-body mb-3">Container-Native Architecture</h3>
                <p className="text-gray-300 leading-relaxed font-light text-caption">
                  Rapid deployment and scaling with shipping container infrastructure
                </p>
              </div>
              
              {/* Advanced Cooling & Efficiency */}
                <div className="text-center group hover-lift" role="listitem">
                  <div className="mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#40d0f2' }}>
                  <Icons.Gauge className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-body mb-3">Advanced Cooling & Efficiency</h3>
                <p className="text-gray-300 leading-relaxed font-light text-caption">
                  Immersion cooling technology delivering maximum reliability and peak performance
                </p>
                </div>
              </div>
              </StaggeredReveal>
              
          {/* Progressive Disclosure for Philosophy Details */}
          <div className="mt-12 text-center">
              <details className="group">
                <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-center p-3 sm:p-4 bg-black border border-[#4A4A4A] rounded-xl hover:border-gray-400 transition-all duration-200 max-w-md mx-auto">
                  <span className="text-gray-400 font-medium mr-2 text-caption">Learn More About Our Philosophy</span>
                  <Icons.ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                
                <div className="mt-6">
              <StaggeredReveal staggerDelay={150}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-6 hover:border-primary-purple/30 transition-all duration-200 group">
                      <h3 className="text-body font-bold text-white mb-3 sm:mb-4 group-hover:text-primary-purple transition-colors">Australian Sovereignty</h3>
                      <p className="text-gray-400 text-caption leading-relaxed">
                          Locally assembled, locally operated, locally controlled. Every GPU cluster is built in Australia with Australian oversight and data residency guarantees.
                  </p>
                </div>
                
                    <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-6 hover:border-primary-cyan/30 transition-all duration-200 group">
                      <h3 className="text-body font-bold text-white mb-3 sm:mb-4 group-hover:text-primary-cyan transition-colors">Renewable-First Operations</h3>
                      <p className="text-gray-400 text-caption leading-relaxed">
                          Solar panels, battery storage, and grid integration designed for 80-95% renewable energy usage with carbon-neutral operations.
                  </p>
                </div>
                
                    <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-6 hover:border-primary-green/30 transition-all duration-200 group">
                      <h3 className="text-body font-bold text-white mb-3 sm:mb-4 group-hover:text-primary-green transition-colors">Container-Native Architecture</h3>
                      <p className="text-gray-400 text-caption leading-relaxed">
                          Shipping container infrastructure enables rapid deployment, easy scaling, and disaster recovery across multiple Australian locations.
                  </p>
                </div>
              </div>
              </StaggeredReveal>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      {/* Clean spacing between sections */}
      <div className="h-16 md:h-24 bg-black"></div>

      {/* Technology & Infrastructure Section */}
      <section id="technology" className="nav-trigger-technology mobile-section relative py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 sm:mb-12 tracking-tight">
              Technology & Infrastructure
            </h2>
            <p className="section-description text-body text-gray-400 max-w-4xl mx-auto font-light leading-relaxed px-4">
              Modular, scalable architecture designed for maximum performance and efficiency. Our hardware-first approach 
              combines cutting-edge high-performance GPUs (RTX 4090, H200, L40S, Blackwell GB300) with revolutionary immersion cooling technology, all housed in 
              shipping container infrastructure for rapid deployment and scalability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            {/* Infrastructure Diagram - Desktop: Always visible */}
            <div className="hidden lg:block">
              <div className="relative">
                  <div className="bg-black border border-[#4A4A4A] rounded-2xl p-4 sm:p-6 md:p-8" style={{ willChange: 'transform' }}>
                  {/* Solar + Grid Power */}
                  <div className="flex items-center justify-center mb-6 sm:mb-8">
                      <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#40d0f2]">
                      <Icons.Sun className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                      <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                      <Icons.Power className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Solar + Grid Hybrid Power</div>
                  </div>
                  
                  {/* Connection Line */}
                  <div className="flex justify-center mb-6 sm:mb-8">
                      <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#32ca73] to-[#40d0f2]" style={{ willChange: 'transform' }}></div>
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
                      <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#40d0f2]">
                      <Icons.Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                      <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#fbff52] to-[#40d0f2]">
                      <Icons.Network className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Vast.ai + Direct Connect</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Infrastructure Diagram - Mobile: Always Visible */}
            <div className="lg:hidden">
              <div className="mb-6">
                <div className="p-4 bg-[#1A1A1A]/30 border border-[#262626] rounded-xl">
                    <div className="relative">
                      <div className="bg-black border border-[#4A4A4A] rounded-2xl p-4 sm:p-6 md:p-8" style={{ willChange: 'transform' }}>
                        {/* Solar + Grid Power */}
                        <div className="flex items-center justify-center mb-6 sm:mb-8">
                            <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#40d0f2]">
                            <Icons.Sun className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                            <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                            <Icons.Power className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                          <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Solar + Grid Hybrid Power</div>
                        </div>
                        
                        {/* Connection Line */}
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#32ca73] to-[#40d0f2]" style={{ willChange: 'transform' }}></div>
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
                            <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#32ca73] to-[#40d0f2]">
                            <Icons.Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                            <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#fbff52] to-[#40d0f2]">
                            <Icons.Network className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                          <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Vast.ai + Direct Connect</div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            
            {/* Infrastructure Details - Mobile: Progressive Disclosure */}
            <div className="lg:hidden">
              <details className="group mb-6">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-between p-4 bg-black border border-[#4A4A4A] rounded-xl hover:border-primary-purple/30 transition-all duration-200">
                    <h3 className="text-white font-semibold text-lg">Infrastructure Overview</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-primary-cyan text-sm font-medium">View Details</span>
                      <Icons.ChevronDown className="h-5 w-5 text-primary-cyan transition-transform duration-200 group-open:rotate-180" />
                    </div>
                  </div>
                </summary>
                
                <div className="mt-4">
            <StaggeredReveal staggerDelay={100}>
            <div className="space-y-6 sm:space-y-8">
              {/* GPU Nodes */}
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-purple/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#d5aaf9' }}>
                    <Icons.Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">MODRON GPU Clusters</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">6× High-Performance GPUs (RTX 4090/H200/L40S), Australian-assembled, immersion-cooled</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Locally sourced components with Australian quality control and support.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Immersion Cooling */}
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-cyan/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#40d0f2' }}>
                    <Icons.Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Immersion Cooling</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Proprietary liquid cooling system</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Advanced immersion cooling technology reduces failure rates by 60% while maintaining peak performance and enabling higher compute density. This represents a significant improvement over traditional air cooling systems.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Solar + Grid Hybrid */}
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-green/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#32ca73' }}>
                    <Icons.Zap className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Solar + Battery Hybrid</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Australian-made solar panels, advanced battery storage integration</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Grid-independent operation with intelligent energy management delivering 40% power consumption savings through renewable energy optimization.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Vast.ai + Direct Connect */}
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-purple/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#fbff52' }}>
                    <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Container Infrastructure</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">ISO shipping containers, rapid deployment, disaster recovery</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Deploy anywhere in Australia within 48 hours vs 6-12 months for traditional data centers. Industry-leading compute density in a compact footprint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </StaggeredReveal>
          </div>
              </details>
        </div>
            
            {/* Infrastructure Details - Desktop: Always Visible */}
            <div className="hidden lg:block">
              <StaggeredReveal staggerDelay={100}>
                <div className="space-y-6 sm:space-y-8">
                  {/* GPU Nodes */}
                  <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-purple/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#d5aaf9' }}>
                        <Icons.Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">MODRON GPU Clusters</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">6× High-Performance GPUs (RTX 4090/H200/L40S), Australian-assembled, immersion-cooled</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Locally sourced components with Australian quality control and support.
                        </p>
                      </div>
                    </div>
            </div>
            
                  {/* Immersion Cooling */}
                  <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-cyan/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#40d0f2' }}>
                        <Icons.Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Immersion Cooling</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Proprietary liquid cooling system</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Advanced immersion cooling technology reduces failure rates by 60% while maintaining peak performance and enabling higher compute density. This represents a significant improvement over traditional air cooling systems.
                        </p>
                </div>
                    </div>
              </div>
              
                  {/* Solar + Battery Hybrid */}
                  <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-green/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#32ca73' }}>
                        <Icons.Zap className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Solar + Battery Hybrid</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Australian-made solar panels, advanced battery storage integration</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Grid-independent operation with intelligent energy management delivering 40% power consumption savings through renewable energy optimization.
                        </p>
                </div>
                    </div>
              </div>
              
                  {/* Container Infrastructure */}
                  <div className="bg-black border border-[#4A4A4A] rounded-xl p-4 sm:p-5 md:p-6 hover:border-[#fbff52]/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#fbff52' }}>
                        <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Container Infrastructure</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">ISO shipping containers, rapid deployment, disaster recovery</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Deploy anywhere in Australia within 48 hours vs 6-12 months for traditional data centers. Industry-leading compute density in a compact footprint.
                        </p>
                </div>
                    </div>
              </div>
            </div>
            </StaggeredReveal>
          </div>
        </div>
        
          {/* Interactive Infrastructure Button */}
        <div className="text-center mt-8 sm:mt-12 hidden lg:block">
            <details className="group">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between p-4 bg-black border border-[#4A4A4A] rounded-xl hover:border-primary-purple/30 transition-all duration-200">
                  <span className="text-white font-semibold text-lg">Explore Interactive Infrastructure</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-primary-cyan text-sm font-medium">Explore</span>
                    <Icons.ChevronDown className="h-5 w-5 text-primary-cyan transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </div>
              </summary>
              
              <div className="mt-4">
                <InteractiveInfrastructure />
              </div>
            </details>
            </div>
            
                  </div>
      </section>

      {/* Modular Deployment Section */}
      <section className="nav-trigger-technology relative py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Video Side */}
            <div className="order-1 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden bg-black min-h-[256px] h-64 sm:h-80 md:h-80 lg:h-96">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover object-center will-change-transform"
                  style={{
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    contain: 'layout style paint',
                    isolation: 'isolate',
                    imageRendering: 'auto'
                  }}
                  poster="/MODRON_Gold_03_poster.png"
                >
                  <source src="/MODRON_Gold_03.mp4" type="video/mp4" />
                </video>
                {/* Fallback text overlay for mobile */}
                <div className="absolute inset-0 flex items-center justify-center lg:hidden">
                  <div className="text-center text-white p-4">
                    <p className="text-sm opacity-75">Modular GPU Container</p>
                  </div>
                </div>
              </div>
                  </div>

            {/* Content Side */}
            <div className="order-2 lg:order-2">
              <div className="max-w-lg mx-auto lg:mx-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
                  Modular Deployment
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#CCCCCC] mb-6 sm:mb-8 font-light leading-relaxed">
                  Deploy anywhere in Australia within 48 hours using modular containers with industry-leading compute density and immersion cooling.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#fbff52] to-[#40d0f2] flex items-center justify-center flex-shrink-0 mt-1">
                      <Icons.Zap className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                  </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">100+ PetaFLOPS Compute Power</h3>
                      <p className="text-[#999999] text-sm sm:text-base">Industry-leading performance with our diverse GPU portfolio delivering unmatched AI training and inference capabilities across all workload types.</p>
                </div>
              </div>
              
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#32ca73] to-[#40d0f2] flex items-center justify-center flex-shrink-0 mt-1">
                      <Icons.Clock className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                  </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">Deploy Anywhere in 48 Hours</h3>
                      <p className="text-[#999999] text-sm sm:text-base">Self-contained units that can be installed at most sites for on-premises operations in hours and days.</p>
                    </div>
                </div>
                
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#40d0f2] to-[#32ca73] flex items-center justify-center flex-shrink-0 mt-1">
                      <Icons.Settings className="h-3 w-3 sm:h-4 sm:w-4 text-black" />
                  </div>
                    <div>
                      <h3 className="text-white font-semibold text-base sm:text-lg mb-1 sm:mb-2">Plug-and-Play Infrastructure</h3>
                      <p className="text-[#999999] text-sm sm:text-base">Complete AI infrastructure in portable containers with minimal site preparation required.</p>
                </div>
              </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Animated Divider */}
      {/* Clean spacing between sections */}
      <div className="h-16 md:h-24 bg-black"></div>


      {/* Use Cases Section */}
      <section id="use-cases" className="nav-trigger-use-cases relative z-10 overflow-visible py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 sm:mb-12 tracking-tight">
              Use Cases
            </h2>
            {/* Deployment trigger - safe change */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
              Deploy enterprise-grade AI infrastructure anywhere in Australia within 48 hours - sovereign, scalable, with industry-leading compute density
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            {/* Tabbed Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#1A1A1A]/30 border border-[#262626] rounded-xl p-1 flex">
                <button
                  onClick={() => setActiveUseCaseTab('ai-development')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                    activeUseCaseTab === 'ai-development'
                      ? 'bg-[#1A1A1A]/50 text-white underline underline-offset-4'
                      : 'text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icons.Brain className="h-4 w-4 mr-2 hidden sm:block" />
                  AI Development Process
                </button>
                <button
                  onClick={() => setActiveUseCaseTab('industry-applications')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                    activeUseCaseTab === 'industry-applications'
                      ? 'bg-[#1A1A1A]/50 text-white underline underline-offset-4'
                      : 'text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icons.Shield className="h-4 w-4 mr-2 hidden sm:block" />
                  Industry Applications
                </button>
                <button
                  onClick={() => setActiveUseCaseTab('enterprise-features')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                    activeUseCaseTab === 'enterprise-features'
                      ? 'bg-[#1A1A1A]/50 text-white underline underline-offset-4'
                      : 'text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icons.Settings className="h-4 w-4 mr-2 hidden sm:block" />
                  Enterprise Features
                </button>
                <button
                  onClick={() => setActiveUseCaseTab('gpu-solutions')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                    activeUseCaseTab === 'gpu-solutions'
                      ? 'bg-[#1A1A1A]/50 text-white underline underline-offset-4'
                      : 'text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icons.Cpu className="h-4 w-4 mr-2 hidden sm:block" />
                  GPU Solutions
                </button>
              </div>
              </div>
              
              {/* Tab Content */}
            <div className="bg-black border border-[#4A4A4A] rounded-2xl p-6 hover:border-[#40d5f2]/30 transition-all duration-300 group relative overflow-hidden">
                      {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#40d5f2]/5 via-[#d5aaf9]/5 to-[#32ca73]/5 opacity-0 group-hover:opacity-100 transition-slow rounded-2xl"></div>
              
              {/* AI Development Process Tab Content */}
              {activeUseCaseTab === 'ai-development' && (
                <div className="relative z-10">
                      
                      <h3 className="text-xl font-bold text-white mb-6 text-center relative z-10">AI Development Process</h3>
                      
                      {/* AI Development Capabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-[#32ca73]/10 to-[#40d0f2]/10 rounded-xl p-4 border border-[#d5aaf9]/20 group hover:border-[#d5aaf9]/40 transition-all duration-300">
                          <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#d5aaf9] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Database className="h-5 w-5 text-black flex-shrink-0" />
                            </div>
                            <h4 className="text-white font-semibold">Data Processing</h4>
                          </div>
                          <p className="text-gray-300 text-sm">High-performance data pipeline with real-time processing capabilities</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-[#40d0f2]/10 to-[#32ca73]/10 rounded-xl p-4 border border-[#40d0f2]/20 group hover:border-[#40d0f2]/40 transition-all duration-300">
                          <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Brain className="h-5 w-5 text-black flex-shrink-0" />
                            </div>
                            <h4 className="text-white font-semibold">Model Training</h4>
                          </div>
                          <p className="text-gray-300 text-sm">Renewable-powered GPU clusters for efficient neural network training</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-[#32ca73]/10 to-[#fbff52]/10 rounded-xl p-4 border border-[#32ca73]/20 group hover:border-[#32ca73]/40 transition-all duration-300">
                          <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#32ca73] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.BarChart3 className="h-5 w-5 text-black flex-shrink-0" />
                    </div>
                      <h4 className="text-white font-semibold">Performance Monitoring</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Real-time evaluation and optimization of model performance</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#fbff52]/10 to-[#40d0f2]/10 rounded-xl p-4 border border-[#fbff52]/20 group hover:border-[#fbff52]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-[#fbff52] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Server className="h-5 w-5 text-black flex-shrink-0" />
                    </div>
                      <h4 className="text-white font-semibold">Container Deployment</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Container-native infrastructure for rapid deployment and scaling</p>
                  </div>
                </div>
                
                
                <button 
                  onClick={() => {
                    console.log('Workflow button clicked, current state:', showWorkflowDetails);
                    setShowWorkflowDetails(!showWorkflowDetails);
                  }}
                  className="w-full bg-black border border-[#4A4A4A] text-gray-400 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-normal flex items-center justify-center relative z-10"
                >
                  <span className="font-medium mr-2">View Detailed Workflow</span>
                  <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showWorkflowDetails ? 'rotate-180' : ''}`} />
                </button>
                
                {showWorkflowDetails && (
                  <div className="mt-6">
                    <div className="bg-[#1A1A1A]/30 border border-[#262626] rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-white mb-4 text-center">Complete AI Workflow</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#d5aaf9' }}>
                            <Icons.Database className="h-4 w-4 text-black" />
              </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Data Preparation</h5>
                            <p className="text-[#999999] text-xs">Raw data processing and preprocessing for AI model training</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#40d0f2' }}>
                            <Icons.Brain className="h-4 w-4 text-black" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Model Training</h5>
                            <p className="text-[#999999] text-xs">Neural network training and optimization using MODRON's GPU clusters</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#32ca73' }}>
                            <Icons.BarChart3 className="h-4 w-4 text-black" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Model Evaluation</h5>
                            <p className="text-[#999999] text-xs">Performance testing and validation against test datasets</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#fbff52' }}>
                            <Icons.Server className="h-4 w-4 text-black" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Deployment</h5>
                            <p className="text-[#999999] text-xs">Production deployment and serving with monitoring</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              )}
              
              {/* Industry Applications Tab Content */}
              {activeUseCaseTab === 'industry-applications' && (
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">Industry Applications</h3>
                
                {/* Industry Solutions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-[#32ca73]/10 to-[#40d0f2]/10 rounded-xl p-4 border border-[#d5aaf9]/20 group hover:border-[#d5aaf9]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#32ca73] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Shield className="h-5 w-5 text-black flex-shrink-0" />
                </div>
                      <h4 className="text-white font-semibold">Government</h4>
                </div>
                    <p className="text-gray-300 text-sm">Sovereign data residency with guaranteed compliance and security</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#32ca73]/10 to-[#40d0f2]/10 rounded-xl p-4 border border-[#32ca73]/20 group hover:border-[#32ca73]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#32ca73] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Brain className="h-5 w-5 text-black flex-shrink-0" />
                </div>
                      <h4 className="text-white font-semibold">Research</h4>
                </div>
                    <p className="text-gray-300 text-sm">Carbon-neutral computing for universities and research institutions</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#40d0f2]/10 to-[#32ca73]/10 rounded-xl p-4 border border-[#40d0f2]/20 group hover:border-[#40d0f2]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#40d0f2] to-[#32ca73] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Server className="h-5 w-5 text-black flex-shrink-0" />
                      </div>
                      <h4 className="text-white font-semibold">Enterprise</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Australian-built infrastructure with local support and expertise</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#fbff52]/10 to-[#40d0f2]/10 rounded-xl p-4 border border-[#fbff52]/20 group hover:border-[#fbff52]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fbff52] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Code className="h-5 w-5 text-black flex-shrink-0" />
                      </div>
                      <h4 className="text-white font-semibold">Development</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Complete data sovereignty with Australian oversight and standards</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#ff6b6b]/10 to-[#40d0f2]/10 rounded-xl p-4 border border-[#ff6b6b]/20 group hover:border-[#ff6b6b]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff6b6b] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Zap className="h-5 w-5 text-black flex-shrink-0" />
                      </div>
                      <h4 className="text-white font-semibold">Emergency AI Infrastructure</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Deploy critical AI compute within 48 hours for emergency response and disaster management</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#4ecdc4]/10 to-[#40d0f2]/10 rounded-xl p-4 border border-[#4ecdc4]/20 group hover:border-[#4ecdc4]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4ecdc4] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.RefreshCw className="h-5 w-5 text-black flex-shrink-0" />
                      </div>
                      <h4 className="text-white font-semibold">Disaster Recovery</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Rapid infrastructure restoration with modular containers for business continuity</p>
                  </div>
                </div>
                
                
                <button 
                  onClick={() => {
                    console.log('Use case button clicked, current state:', showUseCaseDetails);
                    setShowUseCaseDetails(!showUseCaseDetails);
                  }}
                  className="w-full bg-black border border-[#4A4A4A] text-gray-400 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-normal flex items-center justify-center relative z-10"
                >
                  <span className="font-medium mr-2">View Detailed Use Cases</span>
                  <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showUseCaseDetails ? 'rotate-180' : ''}`} />
                </button>
                
                {showUseCaseDetails && (
                  <div className="mt-6">
                    <div className="bg-[#1A1A1A]/30 border border-[#262626] rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-white mb-4 text-center">Complete Use Cases</h4>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#32ca73] to-[#40d0f2]">
                            <Icons.Shield className="h-4 w-4 text-black" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Australian Government AI</h5>
                            <p className="text-[#999999] text-xs">Defense, healthcare, and public services with data residency</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#32ca73] to-[#40d0f2]">
                            <Icons.Brain className="h-4 w-4 text-black" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Research & Academia</h5>
                            <p className="text-[#999999] text-xs">Universities and CSIRO with carbon-neutral operations</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                            <Icons.Server className="h-4 w-4 text-black" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Australian Enterprise</h5>
                            <p className="text-[#999999] text-xs">Mining, agriculture, and finance with local support</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#fbff52] to-[#40d0f2]">
                            <Icons.Code className="h-4 w-4 text-black" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Sovereign AI Development</h5>
                            <p className="text-[#999999] text-xs">Complete data sovereignty and Australian oversight</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              )}
              
              {/* Enterprise Features Tab Content */}
              {activeUseCaseTab === 'enterprise-features' && (
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">Enterprise Features</h3>
                  
                  {/* Simplified Enterprise System Architecture */}
                  <div className="mb-8">
                    <div className="bg-black border border-[#4A4A4A] rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-white mb-4 text-center">Enterprise System Architecture</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-[#32ca73] to-[#40d0f2] flex items-center justify-center">
                            <Icons.Server className="h-6 w-6 text-black" />
                    </div>
                          <h5 className="text-white font-medium text-sm">Infrastructure</h5>
                          <p className="text-[#999999] text-xs">GPU clusters, cooling, power</p>
                  </div>
                  <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-[#32ca73] to-[#40d0f2] flex items-center justify-center">
                            <Icons.Cloud className="h-6 w-6 text-black" />
                    </div>
                          <h5 className="text-white font-medium text-sm">Platform</h5>
                          <p className="text-[#999999] text-xs">APIs, monitoring, orchestration</p>
                  </div>
                  <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-[#40d0f2] to-[#32ca73] flex items-center justify-center">
                            <Icons.Code className="h-6 w-6 text-black" />
                    </div>
                          <h5 className="text-white font-medium text-sm">Application</h5>
                          <p className="text-[#999999] text-xs">AI workloads, integrations</p>
                  </div>
                </div>
              </div>
            </div>
            
                  {/* Key Enterprise Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Always-on Availability */}
                    <div className="bg-gradient-to-br from-[#32ca73]/10 to-transparent rounded-xl p-4 border border-[#d5aaf9]/20 group hover:border-[#d5aaf9]/40 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#32ca73] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icons.Clock className="h-5 w-5 text-black flex-shrink-0" />
                  </div>
                        <h4 className="text-white font-semibold">Always-on Availability</h4>
                </div>
                      <p className="text-gray-300 text-sm">99.9% uptime guarantee with redundant systems and automatic failover for continuous operations.</p>
            </div>

            {/* Clean Energy Credits */}
                    <div className="bg-gradient-to-br from-[#32ca73]/10 to-transparent rounded-xl p-4 border border-[#32ca73]/20 group hover:border-[#32ca73]/40 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#32ca73] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icons.Award className="h-5 w-5 text-black flex-shrink-0" />
                  </div>
                        <h4 className="text-white font-semibold">Clean Energy Credits</h4>
                </div>
                      <p className="text-gray-300 text-sm">Earn carbon credits and sustainability certifications through our renewable-powered infrastructure.</p>
            </div>

            {/* Custom Containers & APIs */}
                    <div className="bg-gradient-to-br from-[#40d0f2]/10 to-transparent rounded-xl p-4 border border-[#40d0f2]/20 group hover:border-[#40d0f2]/40 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#40d0f2] to-[#32ca73] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icons.Settings className="h-5 w-5 text-black flex-shrink-0" />
                  </div>
                        <h4 className="text-white font-semibold">Custom Containers & APIs</h4>
                </div>
                      <p className="text-gray-300 text-sm">Tailored container environments and RESTful APIs for seamless integration with your workflows.</p>
            </div>

            {/* Spot & Reserved Instances */}
                    <div className="bg-gradient-to-br from-[#fbff52]/10 to-transparent rounded-xl p-4 border border-[#fbff52]/20 group hover:border-[#fbff52]/40 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fbff52] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icons.Calendar className="h-5 w-5 text-black flex-shrink-0" />
                  </div>
                        <h4 className="text-white font-semibold">Spot & Reserved Instances</h4>
                </div>
                      <p className="text-gray-300 text-sm">Flexible pricing models with spot instances for cost optimization and reserved instances for predictable workloads.</p>
            </div>

            {/* Remote Monitoring */}
                    <div className="bg-gradient-to-br from-[#32ca73]/10 to-transparent rounded-xl p-4 border border-[#32ca73]/20 group hover:border-[#32ca73]/40 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#32ca73] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icons.Eye className="h-5 w-5 text-black flex-shrink-0" />
                  </div>
                        <h4 className="text-white font-semibold">Remote Monitoring</h4>
                </div>
                      <p className="text-gray-300 text-sm">Comprehensive monitoring and alerting with real-time performance metrics and automated incident response.</p>
            </div>

                    {/* Compliance & Security */}
                    <div className="bg-gradient-to-br from-[#32ca73]/10 to-transparent rounded-xl p-4 border border-[#d5aaf9]/20 group hover:border-[#d5aaf9]/40 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#32ca73] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icons.Shield className="h-5 w-5 text-black flex-shrink-0" />
                  </div>
                        <h4 className="text-white font-semibold">Compliance & Security</h4>
                </div>
                      <p className="text-gray-300 text-sm">Enterprise-grade security with compliance certifications and data sovereignty guarantees for Australian operations.</p>
              </div>
            </div>
              </div>
              )}
              
              {/* GPU Solutions Tab Content */}
              {activeUseCaseTab === 'gpu-solutions' && (
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">GPU Solutions</h3>
                  
                  <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
                    Choose the right GPU configuration for your workload - from cost-effective development clusters to enterprise training systems and next-generation research platforms.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    {/* Development & Inference Tier */}
                    <div className="bg-black border border-[#4A4A4A] rounded-xl p-6 hover:border-[#d5aaf9]/30 transition-all duration-300 group">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#d5aaf9' }}>
                          <Icons.Cpu className="h-8 w-8 text-black" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Development & Inference</h3>
                        <p className="text-[#32ca73] font-semibold text-sm mb-3">RTX 4090, L40S</p>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        Cost-effective high-performance GPUs for AI development, inference workloads, and smaller model training. Perfect for startups and development teams.
                      </p>
                      <ul className="text-gray-300 text-xs space-y-2">
                        <li className="flex items-center">
                          <Icons.CheckCircle className="h-3 w-3 mr-2 text-[#32ca73] flex-shrink-0" />
                          Cost-optimized for development
                        </li>
                        <li className="flex items-center">
                          <Icons.CheckCircle className="h-3 w-3 mr-2 text-[#32ca73] flex-shrink-0" />
                          High inference performance
                        </li>
                        <li className="flex items-center">
                          <Icons.CheckCircle className="h-3 w-3 mr-2 text-[#32ca73] flex-shrink-0" />
                          Rapid prototyping support
                        </li>
                      </ul>
                    </div>

                    {/* Enterprise Training Tier */}
                    <div className="bg-black border border-[#4A4A4A] rounded-xl p-6 hover:border-[#40d0f2]/30 transition-all duration-300 group">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#40d0f2' }}>
                          <Icons.Server className="h-8 w-8 text-black" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Enterprise Training</h3>
                        <p className="text-[#40d0f2] font-semibold text-sm mb-3">H200, L40S</p>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        High-memory enterprise GPUs for large model training, production AI workloads, and enterprise-scale deployments with maximum reliability.
                      </p>
                      <ul className="text-gray-300 text-xs space-y-2">
                        <li className="flex items-center">
                          <Icons.CheckCircle className="h-3 w-3 mr-2 text-[#40d0f2] flex-shrink-0" />
                          Large model training capability
                        </li>
                        <li className="flex items-center">
                          <Icons.CheckCircle className="h-3 w-3 mr-2 text-[#40d0f2] flex-shrink-0" />
                          Enterprise-grade reliability
                        </li>
                        <li className="flex items-center">
                          <Icons.CheckCircle className="h-3 w-3 mr-2 text-[#40d0f2] flex-shrink-0" />
                          Production-ready infrastructure
                        </li>
                      </ul>
                    </div>

                    {/* Next-Gen Research Tier */}
                    <div className="bg-black border border-[#4A4A4A] rounded-xl p-6 hover:border-[#32ca73]/30 transition-all duration-300 group">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: '#32ca73' }}>
                          <Icons.Zap className="h-8 w-8 text-black" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Next-Gen Research</h3>
                        <p className="text-[#32ca73] font-semibold text-sm mb-3">Blackwell GB300</p>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        Cutting-edge AI research GPUs for massive model training, breakthrough research, and the most demanding AI workloads requiring maximum performance.
                      </p>
                      <ul className="text-gray-300 text-xs space-y-2">
                        <li className="flex items-center">
                          <Icons.CheckCircle className="h-3 w-3 mr-2 text-[#32ca73] flex-shrink-0" />
                          Massive model training
                        </li>
                        <li className="flex items-center">
                          <Icons.CheckCircle className="h-3 w-3 mr-2 text-[#32ca73] flex-shrink-0" />
                          Research-grade performance
                        </li>
                        <li className="flex items-center">
                          <Icons.CheckCircle className="h-3 w-3 mr-2 text-[#32ca73] flex-shrink-0" />
                          Future-proof architecture
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <p className="text-gray-400 text-sm max-w-3xl mx-auto leading-relaxed">
                      All GPU configurations include Australian assembly, immersion cooling, and solar power integration. 
                      Contact us to discuss the optimal setup for your specific workload requirements.
                    </p>
                  </div>
                </div>
              )}
                      </div>
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      {/* Clean spacing between sections */}
      <div className="h-16 md:h-24 bg-black"></div>

      {/* Pricing Section */}
      <section id="pricing" className="nav-trigger-pricing relative py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 sm:mb-12 tracking-tight">
                Transparent Pricing
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
                Competitive rates with built-in sustainability. No hidden costs, no carbon guilt.
              </p>
            </div>

            {/* Competitive Comparison */}
            <div className="mb-16 sm:mb-20">

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[800px] sm:min-w-0">
                  <table className="w-full bg-black border border-[#4A4A4A] rounded-xl overflow-hidden">
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
                      <tr className="border-t border-[#333333] bg-[#d5aaf9]/10 modron-highlight-row">
                        <td className="p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">MODRON</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">$0.54–$0.90</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">80–95%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">Yes - Local Manufacturing</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">48 hours</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">100% Australian</td>
                      </tr>
                      <tr className="border-t border-[#333333] pricing-table-row">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">AWS</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$1.20+</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">20-30%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">No - Imported</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Weeks/Months</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">International</td>
                      </tr>
                      <tr className="border-t border-[#333333] pricing-table-row">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">GCP</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$1.10+</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">25-35%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">No - Imported</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Weeks/Months</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">International</td>
                      </tr>
                      <tr className="border-t border-[#333333] pricing-table-row">
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
                    <span className="text-[#32ca73] font-bold text-lg">$0.54–$0.90</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#999999]">Renewable:</span>
                      <span className="text-[#32ca73] font-semibold ml-2">80–95%</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Australian:</span>
                      <span className="text-[#32ca73] font-semibold ml-2">Yes</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Deploy:</span>
                      <span className="text-[#32ca73] font-semibold ml-2">48 hours</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Data:</span>
                      <span className="text-[#32ca73] font-semibold ml-2">100% AU</span>
                    </div>
                  </div>
                </div>

                {/* AWS Card */}
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4">
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
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4">
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
                <div className="bg-black border border-[#4A4A4A] rounded-xl p-4">
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
                  * Prices shown for equivalent high-performance GPU instances. Contact us for specific GPU configurations and pricing.
                </p>
              </div>
            </div>

            {/* Pre-Launch Offer - BACKUP (COMMENTED OUT) */}
            {/* 
            <div className="bg-gradient-to-br from-[#32ca73]/20 to-[#40d0f2]/20 border border-[#d5aaf9]/30 rounded-2xl p-8 sm:p-12 text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-[#32ca73] to-[#40d0f2] rounded-xl flex items-center justify-center">
                <Icons.Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Pre-Launch Offer
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[#CCCCCC] mb-6 sm:mb-8 max-w-2xl mx-auto">
                Early waitlist members receive priority access to new clusters and pre-launch pricing for the first 6 months.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center text-primary-cyan font-bold text-base sm:text-lg">
                  <Icons.Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Priority Access
                </div>
                <div className="flex items-center text-primary-cyan font-bold text-base sm:text-lg">
                  <Icons.CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Pre-Launch Pricing
                </div>
                <div className="flex items-center text-primary-cyan font-bold text-base sm:text-lg">
                  <Icons.Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  6 Months Duration
                </div>
              </div>
              <WaitlistModal />
            </div>
            */}

            {/* Pre-Launch Offer - ENHANCED VERSION - HIDDEN */}
            {/* 
            <div className="bg-gradient-to-br from-[#32ca73]/20 to-[#40d0f2]/20 border border-[#32ca73]/30 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-2 h-2 bg-[#40d0f2]/30 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-[#32ca73]/40 rounded-full animate-ping"></div>
                <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-[#d5aaf9]/20 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-10 w-1 h-1 bg-[#40d0f2]/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-[#32ca73]/15 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-[#40d0f2]/10 border border-[#40d0f2]/20 rounded-xl p-4 hover:bg-[#40d0f2]/20 hover:border-[#40d0f2]/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.Clock className="h-6 w-6 text-primary-cyan group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-primary-cyan font-bold text-sm">Priority Access</p>
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

              <EnhancedBookingButton />
            </div>
            */}
          </div>
          
          {/* Competitive Comparison Progressive Disclosure */}
          <div className="text-center mt-12 sm:mt-16 md:mt-20">
            <button
              onClick={() => {
                console.log('Competitive Comparison button clicked, current state:', showCompetitiveComparison);
                setShowCompetitiveComparison(!showCompetitiveComparison);
              }}
              className="w-full bg-black border border-[#4A4A4A] text-gray-400 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto"
            >
              <span className="font-medium mr-2">View Competitive Comparison</span>
              <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showCompetitiveComparison ? 'rotate-180' : ''}`} />
            </button>
            
            {showCompetitiveComparison && (
              <div className="mt-8">
                <DynamicComparison />
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      {/* Clean spacing between sections */}
      <div className="h-16 md:h-24 bg-black"></div>

      {/* CTA / Contact Section */}
      <section id="contact" className="nav-trigger-contact relative py-20 md:py-24 lg:py-28 xl:py-32 bg-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white mb-8 sm:mb-12 tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#CCCCCC] mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Join the future of sustainable AI computing. Get in touch to discuss your requirements or start your free trial today.
            </p>
            

            {/* Contact Form - Mobile: Progressive Disclosure */}
            <div className="md:hidden">
              <div className="text-center mb-6">
                <button
                  onClick={() => {
                    console.log('Contact Form button clicked, current state:', showContactForm);
                    setShowContactForm(!showContactForm);
                  }}
                  className="w-full bg-black border border-[#4A4A4A] text-gray-400 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto"
                >
                  <span className="font-medium mr-2">Get in Touch</span>
                  <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showContactForm ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {showContactForm && (
                <div className="bg-black border border-[#4A4A4A] rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h3>
                  <p className="text-[#999999] mb-6 sm:mb-8 text-caption">
                Have questions? Send us a message and we&apos;ll get back to you within 24 hours.
              </p>
              
              <EnhancedForm />
            </div>
              )}
            </div>
            
            {/* Contact Form - Desktop: Always Visible */}
            <div className="hidden md:block">
              <div className="bg-black border border-[#4A4A4A] rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h3>
                <p className="text-[#999999] mb-6 sm:mb-8 text-caption">
                  Have questions? Send us a message and we&apos;ll get back to you within 24 hours.
                </p>
                
                <EnhancedForm />
              </div>
            </div>
          </div>
        </div>
      </section>


      </main>

      {/* Animated Divider */}
      {/* Clean spacing before footer */}
      <div className="h-12 md:h-16 bg-black"></div>
      
      {/* Footer */}
      <footer className="bg-black" role="contentinfo">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">

            {/* Contact Information removed at user's request */}



            {/* Legal Text */}
            <div className="pt-6 sm:pt-8">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6 xl:space-x-8 text-xs sm:text-sm text-[#666666] px-4">
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

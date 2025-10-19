"use client"

import React, { useEffect } from "react";
import { OptimizedScrollIndicator } from "@/components/optimized-scroll-indicator";

import { EnhancedForm } from "@/components/enhanced-form";
import { SkipToContent } from "@/components/skip-to-content";
import { MobileViewport } from "@/components/mobile-viewport";
import { Icons } from "@/lib/icon-imports";
import { HeroBgVideo } from "@/components/hero-bg-video";
import Image from "next/image";
import { EnhancedLoadingSkeleton } from "@/components/enhanced-loading-skeleton";

// Lazy-load non-critical components
const ImmersionTankVideo = dynamic(() => import("@/components/immersion-tank-video").then(mod => ({ default: mod.ImmersionTankVideo })));
// Lazy-load heavier, below-the-fold components to reduce initial JS

import dynamic from 'next/dynamic';

// Lazy-load heavier, below-the-fold components to reduce initial JS
const AnimatedHowItWorks = dynamic(() => import("@/components/animated-how-it-works").then(mod => ({ default: mod.AnimatedHowItWorks })), {
  loading: () => <EnhancedLoadingSkeleton variant="card" height="300px" />
});
const StaggeredReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.StaggeredReveal })));
const ProgressiveReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.ProgressiveReveal })));

import { Header } from "@/components/header";
import { EnhancedPricingButton } from "@/components/enhanced-pricing-button";
import { EnhancedBookingButton } from "@/components/enhanced-booking-button";
// Lazy-load below-the-fold components
// const FloatingStatsOverlay = dynamic(() => import("@/components/floating-stats-overlay").then(mod => ({ default: mod.FloatingStatsOverlay })), {
//   loading: () => <div className="hidden lg:block" />
// }); // REMOVED - cleaner hero without cards
const MobileCollapsibleSection = dynamic(() => import("@/components/collapsible-section").then(mod => ({ default: mod.MobileCollapsibleSection })));
const AnimatedProgressBar = dynamic(() => import("@/components/animated-progress-bar").then(mod => ({ default: mod.AnimatedProgressBar })));
const ParallaxSection = dynamic(() => import("@/components/parallax-section").then(mod => ({ default: mod.ParallaxSection })));
const ScrollReveal = dynamic(() => import("@/components/scroll-reveal").then(mod => ({ default: mod.ScrollReveal })));
const AnimatedDivider = dynamic(() => import("@/components/animated-divider").then(mod => ({ default: mod.AnimatedDivider })));
const InteractiveInfrastructure = dynamic(() => import("@/components/interactive-infrastructure").then(mod => ({ default: mod.InteractiveInfrastructure })));
const DynamicComparison = dynamic(() => import("@/components/dynamic-comparison").then(mod => ({ default: mod.DynamicComparison })));
const AnimatedCounter = dynamic(() => import("@/components/animated-counter").then(mod => ({ default: mod.AnimatedCounter })));
const ScrollProgress = dynamic(() => import("@/components/scroll-progress").then(mod => ({ default: mod.ScrollProgress })));
const AnimatedHeadline = dynamic(() => import("@/components/animated-headline").then(mod => ({ default: mod.AnimatedHeadline })));

export default function Home() {
  // Performance optimizations in progress - console logs removed for production
  const [showWorkflowDetails, setShowWorkflowDetails] = React.useState(false)
  const [showUseCaseDetails, setShowUseCaseDetails] = React.useState(false)
  const [activeUseCaseTab, setActiveUseCaseTab] = React.useState<'ai-development' | 'industry-applications'>('ai-development')
  const [showCompetitiveComparison, setShowCompetitiveComparison] = React.useState(false)
  const [showHowItWorks, setShowHowItWorks] = React.useState(false)
  const [showVisionDetails, setShowVisionDetails] = React.useState(false)
  const [showInteractiveInfrastructure, setShowInteractiveInfrastructure] = React.useState(false)
  const [currentCardIndex, setCurrentCardIndex] = React.useState(0)
  const [showContactForm, setShowContactForm] = React.useState(false)
  const [videoStarted, setVideoStarted] = React.useState(false)
  const [showPerformanceCards, setShowPerformanceCards] = React.useState(false)
  
  // Handle video start callback
  const handleVideoStart = React.useCallback(() => {
    const timestamp = new Date().toLocaleTimeString()
    console.log(`🎬 VIDEO CALLBACK TRIGGERED at ${timestamp} - setting up 8 second delay`)
    setVideoStarted(true)
    // Start 8-second delay after video starts
    setTimeout(() => {
      const completionTime = new Date().toLocaleTimeString()
      console.log(`⏰ 8 second delay completed at ${completionTime} - showing performance cards`)
      setShowPerformanceCards(true)
    }, 8000)
  }, [])

  // Fallback: if no video starts within 12 seconds, show cards anyway
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!showPerformanceCards) {
        console.log('⏰ Fallback: No video started within 12 seconds, showing cards anyway')
        setShowPerformanceCards(true)
      }
    }, 12000)
    
    return () => clearTimeout(fallbackTimer)
  }, [showPerformanceCards])
  
  // Auto-cycling for mobile performance cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % 3)
    }, 3000) // Change card every 3 seconds

    return () => clearInterval(interval)
  }, [])
  
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
  <HeroBgVideo overlayOpacity={0} onVideoStart={handleVideoStart} />

  {/* Main Content */}
  <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mt-12 sm:mt-16 md:mt-18 lg:mt-24">
    {/* Main Headline - MODRON-specific and differentiated */}
      <AnimatedHeadline />
    
       {/* Subheading - MODRON's unique value proposition */}
    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-3 sm:mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed font-semibold px-4" style={{ letterSpacing: '0.1em', color: '#1f2937' }}>      IMMERSION-COOLED. SOLAR-POWERED. MODULAR.
    </p>
    
    {/* Additional sub text - MODRON-specific description */}
    <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed font-normal px-4" style={{ color: '#1f2937' }}>
      MODRON delivers locally-built, renewable-powered GPU clusters for Australian enterprises. 
      Immersion cooling meets solar energy in modular containers designed for rapid deployment and maximum efficiency.
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
<section id="vision" className="mobile-section relative layout-section mobile-optimized bg-gradient-to-br from-black via-[#1A1A1A]/20 to-black" role="region" aria-labelledby="vision-heading">
  <div className="layout-container-wide">
    <div className="layout-content-wide">
      {/* Mission Statement */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <ScrollReveal animation="fade" delay={0}>
          <h2 id="vision-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
            Our Mission
          </h2>
        </ScrollReveal>
        <ParallaxSection speed={0.3}>
          <p className="text-body text-gray-500 leading-relaxed font-light max-w-5xl mx-auto mb-12 sm:mb-16 px-4">
            Building Australia's first sovereign and truly modular AI infrastructure platform. From local GPU assembly to solar-powered operations, MODRON delivers compute independence for Australian businesses, researchers, and government agencies.
          </p>
        </ParallaxSection>
        <ScrollReveal animation="zoom" delay={200}>
          <div className="w-24 h-1 bg-gradient-to-r from-[#d5aaf9] to-[#40d0f2] mx-auto mt-4"></div>
        </ScrollReveal>
      </div>
      
      {/* Mobile Progressive Disclosure Trigger */}
      <div className="block sm:hidden text-center mb-8">
        <button
          onClick={() => {
            console.log('Vision details button clicked, current state:', showVisionDetails);
            setShowVisionDetails(!showVisionDetails);
          }}
          className="w-full bg-gray-100/50 border border-gray-200 text-gray-400 py-3 rounded-lg hover:bg-gray-200/50 hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto touch-friendly"
        >
          <span className="font-medium mr-2">Why MODRON</span>
          <Icons.ChevronDown className={`h-4 w-4 transition-normal ${showVisionDetails ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Why MODRON Grid */}
        <StaggeredReveal staggerDelay={150}>
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 grid-gap ${showVisionDetails ? 'block' : 'hidden sm:grid'}`} role="list" aria-label="Why choose MODRON">
              {/* Renewable-powered */}
                <div className="text-center group hover-lift" role="listitem">
                  <div className="mobile-icon mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#d5aaf9' }} aria-hidden="true">
                  <Icons.Leaf className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-body mb-3">Renewable-powered</h3>
                <p className="text-gray-300 leading-relaxed font-light text-caption">
                  Solar and grid-integrated power systems for sustainable operations
                </p>
              </div>

              {/* Immersion cooling = lower failure rates */}
                <div className="text-center group hover-lift">
                  <div className="mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#40d0f2' }}>
                  <Icons.Shield className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-body mb-3">Immersion cooling = lower failure rates</h3>
                <p className="text-gray-300 leading-relaxed font-light text-caption">
                  Advanced liquid cooling technology ensures maximum reliability and performance
                </p>
              </div>

              {/* Operates at the edge of efficiency */}
                <div className="text-center group hover-lift">
                  <div className="mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#32ca73' }}>
                  <Icons.Gauge className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-body mb-3">Operates at the edge of efficiency</h3>
                <p className="text-gray-300 leading-relaxed font-light text-caption">
                  Optimized systems delivering peak performance with minimal energy waste
                </p>
              </div>

              {/* Carbon-aware + Off-grid capable */}
                <div className="text-center group hover-lift">
                  <div className="mx-auto mb-6 mobile-icon w-16 h-16 rounded-xl flex items-center justify-center icon-hover shadow-lg hover-glow" style={{ backgroundColor: '#fbff52' }}>
                  <Icons.Globe className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-white font-light text-body mb-3">Carbon-aware + Off-grid capable</h3>
                <p className="text-gray-300 leading-relaxed font-light text-caption">
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
      <section className="relative layout-section mobile-optimized bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A]">
        <div className="layout-container-wide">
          <div className="layout-content-wide">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <ScrollReveal animation="slide-up" delay={0}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
                  MODRON's Design Philosophy
                </h2>
              </ScrollReveal>
              <ScrollReveal animation="fade" delay={200}>
                <p className="text-body text-gray-400 max-w-4xl mx-auto font-light leading-relaxed px-4">
                  Three pillars that define our approach to sovereign AI infrastructure
                </p>
              </ScrollReveal>
            </div>
            
            {/* Philosophy Overview - Always Visible */}
            <div className="text-center content-spacing">
              <h3 className="heading-tertiary text-center mb-6 sm:mb-8">Three Core Pillars</h3>
              <StaggeredReveal staggerDelay={150}>
                <div className="grid grid-cols-1 sm:grid-cols-3 grid-gap content-spacing">
                  {/* Australian Sovereignty */}
                  <div className="card-interactive group">
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-slow rounded-2xl"></div>
                    
                    {/* Content - Centered */}
                    <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
                      {/* Icon with enhanced styling */}
                      <div className="card-icon card-icon-purple group-hover:scale-110">
                      <Icons.Shield className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                </div>
                      
                      {/* Text content */}
                      <h4 className="heading-quaternary text-center mb-1 sm:mb-2 group-hover:text-primary-purple transition-normal">Australian Sovereignty</h4>
                      <p className="text-gray-400 text-caption leading-relaxed">Locally assembled & controlled</p>
                </div>
                  </div>

                  {/* Renewable-First */}
                  <div className="card-interactive group">
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-slow rounded-2xl"></div>
                    
                    {/* Content - Centered */}
                    <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
                      {/* Icon with enhanced styling */}
                      <div className="card-icon card-icon-cyan group-hover:scale-110">
                      <Icons.Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                      
                      {/* Text content */}
                      <h4 className="heading-quaternary text-center mb-1 sm:mb-2 group-hover:text-primary-cyan transition-normal">Renewable-First</h4>
                      <p className="text-gray-400 text-caption leading-relaxed">80-95% renewable energy</p>
                  </div>
                  </div>

                  {/* Container-Native */}
                  <div className="card-interactive group">
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-green/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-slow rounded-2xl"></div>
                    
                    {/* Content - Centered */}
                    <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
                      {/* Icon with enhanced styling */}
                      <div className="card-icon card-icon-green group-hover:scale-110">
                      <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                      
                      {/* Text content */}
                      <h4 className="heading-quaternary text-center mb-1 sm:mb-2 group-hover:text-primary-green transition-normal">Container-Native</h4>
                      <p className="text-gray-400 text-caption leading-relaxed">Rapid deployment & scaling</p>
                    </div>
                </div>
              </div>
              </StaggeredReveal>
              
              {/* Expandable Details */}
              <details className="group">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-center p-3 sm:p-4 bg-gray-100/50 border border-gray-200 rounded-xl hover:border-gray-400 transition-all duration-200 max-w-md mx-auto">
                    <span className="text-gray-400 font-medium mr-2 text-caption">Learn More About Our Philosophy</span>
                    <Icons.ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                
                <div className="mt-6">
              <StaggeredReveal staggerDelay={150}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                      <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-primary-purple/30 transition-all duration-200 group">
                        <h3 className="text-body font-bold text-white mb-3 sm:mb-4 group-hover:text-primary-purple transition-colors">Australian Sovereignty</h3>
                        <p className="text-gray-400 text-caption leading-relaxed">
                          Locally assembled, locally operated, locally controlled. Every GPU cluster is built in Australia with Australian oversight and data residency guarantees.
                  </p>
                </div>
                
                      <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-primary-cyan/30 transition-all duration-200 group">
                        <h3 className="text-body font-bold text-white mb-3 sm:mb-4 group-hover:text-primary-cyan transition-colors">Renewable-First Operations</h3>
                        <p className="text-gray-400 text-caption leading-relaxed">
                          Solar panels, battery storage, and grid integration designed for 80-95% renewable energy usage with carbon-neutral operations.
                  </p>
                </div>
                
                      <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:border-primary-green/30 transition-all duration-200 group">
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
      <AnimatedDivider variant="wave" color="#32ca73" />

      {/* Technology & Infrastructure Section */}
      <section id="technology" className="mobile-section relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A]">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
              Technology & Infrastructure
            </h2>
            <p className="section-description text-body text-gray-400 max-w-4xl mx-auto font-light leading-relaxed px-4">
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
                  <div className="bg-gray-100/50 border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8" style={{ willChange: 'transform' }}>
                  {/* Solar + Grid Power */}
                  <div className="flex items-center justify-center mb-6 sm:mb-8">
                      <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                      <Icons.Sun className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                      <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                      <Icons.Power className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                    </div>
                    <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Solar + Grid Hybrid Power</div>
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
                    <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Vast.ai + Direct Connect</div>
                  </div>
                </div>
              </div>
              </ProgressiveReveal>
            </div>

            {/* Infrastructure Diagram - Mobile: Always Visible */}
            <div className="lg:hidden">
              <div className="mb-6">
                <div className="p-4 bg-[#1A1A1A]/30 border border-[#262626] rounded-xl">
                  <ProgressiveReveal delay={200}>
                    <div className="relative">
                      <div className="bg-gray-100/50 border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8" style={{ willChange: 'transform' }}>
                        {/* Solar + Grid Power */}
                        <div className="flex items-center justify-center mb-6 sm:mb-8">
                            <div className="rounded-xl p-3 sm:p-4 mr-2 sm:mr-4 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                            <Icons.Sun className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                            <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-br from-[#40d0f2] to-[#32ca73]">
                            <Icons.Power className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                          </div>
                          <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Solar + Grid Hybrid Power</div>
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
                          <div className="ml-2 sm:ml-4 text-white font-semibold text-caption">Vast.ai + Direct Connect</div>
                        </div>
                      </div>
                    </div>
                  </ProgressiveReveal>
                </div>
              </div>
            </div>
            
            {/* Infrastructure Details - Mobile: Progressive Disclosure */}
            <div className="lg:hidden">
              <details className="group mb-6">
                <summary className="cursor-pointer list-none">
                  <div className="flex items-center justify-between p-4 bg-gray-100/50 border border-gray-200 rounded-xl hover:border-primary-purple/30 transition-all duration-200">
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
                <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-purple/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#d5aaf9' }}>
                    <Icons.Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">MODRON GPU Clusters</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">6× RTX 4090 24GB, Australian-assembled, immersion-cooled</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Locally sourced components with Australian quality control and support.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Immersion Cooling */}
                <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-cyan/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#40d0f2' }}>
                    <Icons.Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Immersion Cooling</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Proprietary liquid cooling system</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Advanced immersion cooling technology reduces failure rates by 60% while maintaining peak performance and enabling higher compute density.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Solar + Grid Hybrid */}
                <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-green/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#32ca73' }}>
                    <Icons.Zap className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Solar + Battery Hybrid</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Australian-made solar panels, advanced battery storage integration</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Grid-independent operation with intelligent energy management.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Vast.ai + Direct Connect */}
                <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-purple/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#fbff52' }}>
                    <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Container Infrastructure</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-caption">ISO shipping containers, rapid deployment, disaster recovery</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Deploy anywhere in Australia within 48 hours.
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
                  <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-purple/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#d5aaf9' }}>
                        <Icons.Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">MODRON GPU Clusters</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">6× RTX 4090 24GB, Australian-assembled, immersion-cooled</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Locally sourced components with Australian quality control and support.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Immersion Cooling */}
                  <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-cyan/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#40d0f2' }}>
                        <Icons.Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Immersion Cooling</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Proprietary liquid cooling system</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Advanced immersion cooling technology reduces failure rates by 60% while maintaining peak performance and enabling higher compute density.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Solar + Battery Hybrid */}
                  <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 hover:border-primary-green/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#32ca73' }}>
                        <Icons.Zap className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Solar + Battery Hybrid</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">Australian-made solar panels, advanced battery storage integration</p>
                        <p className="text-[#CCCCCC] text-xs sm:text-sm">
                          Grid-independent operation with intelligent energy management.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Container Infrastructure */}
                  <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 hover:border-[#fbff52]/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                    <div className="flex items-start">
                      <div className="rounded-xl p-2 sm:p-3 mr-3 sm:mr-4" style={{ backgroundColor: '#fbff52' }}>
                        <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-black" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Container Infrastructure</h3>
                        <p className="text-[#999999] mb-2 sm:mb-3 text-caption">ISO shipping containers, rapid deployment, disaster recovery</p>
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
          
        </div>
      </section>


      {/* Animated Divider */}
      <AnimatedDivider variant="wave" color="#d5aaf9" />

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
            
              {/* Mobile: Cycling Carousel - COMPLETELY REMOVED TO PROVE CARDS CAN BE HIDDEN */}
        
              {/* Desktop: All Cards Visible */}
              <div className="hidden md:block">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className={`text-center bg-gray-100/50 border border-gray-200 rounded-xl p-6 hover:border-primary-cyan/30 transition-all duration-300 hover:scale-105 group transition-opacity duration-500 ${showPerformanceCards ? 'opacity-100' : 'opacity-0'}`}>
                      <h3 className="text-white font-bold text-lg mb-4">Cooling Efficiency</h3>
                      <div className="mb-6">
                        <div className="text-5xl font-bold text-primary-cyan mb-2">
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
                
                    <div className={`text-center bg-gray-100/50 border border-gray-200 rounded-xl p-6 hover:border-primary-green/30 transition-all duration-300 hover:scale-105 group transition-opacity duration-500 ${showPerformanceCards ? 'opacity-100' : 'opacity-0'}`}>
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
              
                    <div className={`text-center bg-gray-100/50 border border-gray-200 rounded-xl p-6 hover:border-primary-purple/30 transition-all duration-300 hover:scale-105 group transition-opacity duration-500 ${showPerformanceCards ? 'opacity-100' : 'opacity-0'}`}>
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
              </div>
            </div>
          </div>
        </section>
                
      {/* Interactive Infrastructure Progressive Disclosure */}
      <section className="relative py-6 md:py-8 lg:py-10 xl:py-12 bg-gradient-to-br from-black via-[#32ca73]/10 to-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mt-4 sm:mt-6 md:mt-8">
            <button
              onClick={() => {
                console.log('Interactive Infrastructure button clicked, current state:', showInteractiveInfrastructure);
                setShowInteractiveInfrastructure(!showInteractiveInfrastructure);
              }}
              className="w-full bg-gray-100/50 border border-gray-200 text-gray-400 py-3 rounded-lg hover:bg-gray-200/50 hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto"
            >
              <span className="font-medium mr-2">Explore Interactive Infrastructure</span>
              <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showInteractiveInfrastructure ? 'rotate-180' : ''}`} />
            </button>
            
            {showInteractiveInfrastructure && (
              <div className="mt-8">
                <InteractiveInfrastructure />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      <AnimatedDivider variant="wave" color="#32ca73" />

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
            {/* Tabbed Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-[#1A1A1A]/30 border border-[#262626] rounded-xl p-1 flex">
                <button
                  onClick={() => setActiveUseCaseTab('ai-development')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
                    activeUseCaseTab === 'ai-development'
                      ? 'bg-[#40d5f2] text-black'
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
                      ? 'bg-[#d5aaf9] text-black'
                      : 'text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/50'
                  }`}
                >
                  <Icons.Shield className="h-4 w-4 mr-2 hidden sm:block" />
                  Industry Applications
                </button>
              </div>
              </div>
              
              {/* Tab Content */}
            <div className="bg-gray-100/50 border border-gray-200 rounded-2xl p-6 hover:border-[#40d5f2]/30 transition-all duration-300 group relative overflow-hidden">
                      {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#40d5f2]/5 via-[#d5aaf9]/5 to-[#32ca73]/5 opacity-0 group-hover:opacity-100 transition-slow rounded-2xl"></div>
              
              {/* AI Development Process Tab Content */}
              {activeUseCaseTab === 'ai-development' && (
                <div className="relative z-10">
                      
                      <h3 className="text-xl font-bold text-white mb-6 text-center relative z-10">AI Development Process</h3>
                      
                      {/* AI Development Capabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-[#d5aaf9]/10 to-[#40d0f2]/10 rounded-xl p-4 border border-[#d5aaf9]/20 group hover:border-[#d5aaf9]/40 transition-all duration-300">
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
                  
                  <div className="bg-gradient-to-br from-[#fbff52]/10 to-[#d5aaf9]/10 rounded-xl p-4 border border-[#fbff52]/20 group hover:border-[#fbff52]/40 transition-all duration-300">
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
                  className="w-full bg-gray-100/50 border border-gray-200 text-gray-400 py-3 rounded-lg hover:bg-gray-200/50 hover:text-white transition-normal flex items-center justify-center relative z-10"
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
                  <div className="bg-gradient-to-br from-[#d5aaf9]/10 to-[#40d0f2]/10 rounded-xl p-4 border border-[#d5aaf9]/20 group hover:border-[#d5aaf9]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Shield className="h-5 w-5 text-black flex-shrink-0" />
                </div>
                      <h4 className="text-white font-semibold">Government</h4>
                </div>
                    <p className="text-gray-300 text-sm">Sovereign data residency with guaranteed compliance and security</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-[#32ca73]/10 to-[#d5aaf9]/10 rounded-xl p-4 border border-[#32ca73]/20 group hover:border-[#32ca73]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#32ca73] to-[#d5aaf9] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
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
                  
                  <div className="bg-gradient-to-br from-[#fbff52]/10 to-[#d5aaf9]/10 rounded-xl p-4 border border-[#fbff52]/20 group hover:border-[#fbff52]/40 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fbff52] to-[#d5aaf9] flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icons.Code className="h-5 w-5 text-black flex-shrink-0" />
                      </div>
                      <h4 className="text-white font-semibold">Development</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Complete data sovereignty with Australian oversight and standards</p>
                  </div>
                </div>
                
                
                <button 
                  onClick={() => {
                    console.log('Use case button clicked, current state:', showUseCaseDetails);
                    setShowUseCaseDetails(!showUseCaseDetails);
                  }}
                  className="w-full bg-gray-100/50 border border-gray-200 text-gray-400 py-3 rounded-lg hover:bg-gray-200/50 hover:text-white transition-normal flex items-center justify-center relative z-10"
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
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#d5aaf9] to-[#40d0f2]">
                            <Icons.Shield className="h-4 w-4 text-black" />
                          </div>
                          <div>
                            <h5 className="text-white font-medium text-sm">Australian Government AI</h5>
                            <p className="text-[#999999] text-xs">Defense, healthcare, and public services with data residency</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#32ca73] to-[#d5aaf9]">
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
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#fbff52] to-[#d5aaf9]">
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
            </div>
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      <AnimatedDivider variant="line" color="#d5aaf9" />

      {/* Features Grid Section */}
      <section id="features" className="hidden md:block relative z-10 overflow-visible py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A]">
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
              <div className="bg-gray-100/50 border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">Enterprise System Architecture</h3>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Infrastructure Layer */}
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#d5aaf9' }}>
                      <Icons.Server className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-caption">Infrastructure Layer</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">GPU clusters, cooling systems, power management</p>
                  </div>
                  
                  {/* Platform Layer */}
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#32ca73' }}>
                      <Icons.Cloud className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-caption">Platform Layer</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Container orchestration, APIs, monitoring</p>
                  </div>
                  
                  {/* Application Layer */}
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4" style={{ backgroundColor: '#40d0f2' }}>
                      <Icons.Code className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-caption">Application Layer</h4>
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
            
            {/* Desktop: Show all features with collapsible option */}
            <MobileCollapsibleSection 
              title="All Enterprise Features"
              className="hidden md:block"
            >
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Always-on Availability */}
            <div className="group cursor-pointer">
              <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
              <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
              <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
              <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
              <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-700/50 hover:shadow-lg hover:shadow-green-700/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
              <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#d5aaf9]/50 hover:shadow-lg hover:shadow-[#d5aaf9]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
            </MobileCollapsibleSection>

            {/* Mobile: Progressive disclosure */}
            <div className="md:hidden space-y-4">
              {/* Show first 2 features by default */}
              <div className="grid grid-cols-1 gap-6">
                {/* Always-on Availability */}
                <div className="group cursor-pointer">
                  <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
                  <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
                  <div className="flex items-center justify-center p-4 bg-gray-100/50 border border-gray-200 rounded-xl hover:border-primary-purple/30 transition-all duration-200">
                    <span className="text-primary-cyan font-medium mr-2">View More Features</span>
                    <Icons.ChevronDown className="h-5 w-5 text-primary-cyan transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                
                <div className="mt-4 grid grid-cols-1 gap-6">
                  {/* Custom Containers & APIs */}
                  <div className="group cursor-pointer">
                    <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
                    <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#32ca73]/50 hover:shadow-lg hover:shadow-[#32ca73]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
                    <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-700/50 hover:shadow-lg hover:shadow-green-700/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
                    <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-[#d5aaf9]/50 hover:shadow-lg hover:shadow-[#d5aaf9]/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
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
          
          {/* How It Works Progressive Disclosure */}
          <div className="text-center mt-12 sm:mt-16 md:mt-20">
            <button
              onClick={() => {
                console.log('How It Works button clicked, current state:', showHowItWorks);
                setShowHowItWorks(!showHowItWorks);
              }}
              className="w-full bg-gray-100/50 border border-gray-200 text-gray-400 py-3 rounded-lg hover:bg-gray-200/50 hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto"
            >
              <span className="font-medium mr-2">How It Works</span>
              <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showHowItWorks ? 'rotate-180' : ''}`} />
            </button>
            
            {showHowItWorks && (
              <div className="mt-8">
                <AnimatedHowItWorks />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Animated Divider */}
      <AnimatedDivider variant="line" color="#fbff52" />

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

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[800px] sm:min-w-0">
                  <table className="w-full bg-gray-100/50 border border-gray-200 rounded-xl overflow-hidden">
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
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#32ca73] font-bold text-xs sm:text-sm md:text-base">$0.54–$0.80</td>
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
                    <span className="text-primary-cyan font-bold text-lg">$0.54–$0.80</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#999999]">Renewable:</span>
                      <span className="text-primary-cyan font-semibold ml-2">80–95%</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Australian:</span>
                      <span className="text-primary-cyan font-semibold ml-2">Yes</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Deploy:</span>
                      <span className="text-primary-cyan font-semibold ml-2">48 hours</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Data:</span>
                      <span className="text-primary-cyan font-semibold ml-2">100% AU</span>
                    </div>
                  </div>
                </div>

                {/* AWS Card */}
                <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4">
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
                <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4">
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
                <div className="bg-gray-100/50 border border-gray-200 rounded-xl p-4">
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
              className="w-full bg-gray-100/50 border border-gray-200 text-gray-400 py-3 rounded-lg hover:bg-gray-200/50 hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto"
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
      <AnimatedDivider variant="gradient" color="#40d0f2" />

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
            

            {/* Contact Form - Mobile: Progressive Disclosure */}
            <div className="md:hidden">
              <div className="text-center mb-6">
                <button
                  onClick={() => {
                    console.log('Contact Form button clicked, current state:', showContactForm);
                    setShowContactForm(!showContactForm);
                  }}
                  className="w-full bg-gray-100/50 border border-gray-200 text-gray-400 py-3 rounded-lg hover:bg-gray-200/50 hover:text-white transition-normal flex items-center justify-center relative z-10 max-w-md mx-auto"
                >
                  <span className="font-medium mr-2">Get in Touch</span>
                  <Icons.ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showContactForm ? 'rotate-180' : ''}`} />
                </button>
              </div>
              
              {showContactForm && (
                <div className="bg-gray-100/50 border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
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
              <div className="bg-gray-100/50 border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
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
      <AnimatedDivider variant="dots" color="#d5aaf9" />
      
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
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                <div className="flex justify-center">
                <p className="text-[#999999] text-caption text-center leading-tight whitespace-nowrap pr-[7px]">
  Modular Operations Data Resource Optimization Network
</p>              
                </div>
              </div>
            </div>

            {/* Contact Information removed at user's request */}



            {/* Legal Text */}
            <div className="border-t border-[#262626] pt-6 sm:pt-8">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 lg:space-x-6 xl:space-x-8 text-xs sm:text-sm text-[#666666] px-4">
                <span>Australia</span>
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

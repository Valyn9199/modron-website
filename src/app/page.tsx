import { Header } from "@/components/header";
import { OptimizedScrollIndicator } from "@/components/optimized-scroll-indicator";

import { HoverCard } from "@/components/hover-card";
import { ContactForm } from "@/components/contact-form";
import { SkipToContent } from "@/components/skip-to-content";

import { MobileViewport } from "@/components/mobile-viewport";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/lib/icon-imports";
import { HeroBgVideo } from "@/components/hero-bg-video";
import Image from "next/image";
import { LoadingSkeleton, StatsSkeleton } from "@/components/loading-skeleton";
 


import { ImmersionTankVideo } from "@/components/immersion-tank-video";
// Lazy-load heavier, below-the-fold components to reduce initial JS

import dynamic from 'next/dynamic';

// Lazy-load heavier, below-the-fold components to reduce initial JS
const AnimatedHowItWorks = dynamic(() => import("@/components/animated-how-it-works").then(mod => ({ default: mod.AnimatedHowItWorks })), {
  loading: () => <LoadingSkeleton />
});
const AnimatedStats = dynamic(() => import("@/components/animated-stats").then(mod => ({ default: mod.AnimatedStats })), {
  loading: () => <StatsSkeleton />
});
const StaggeredReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.StaggeredReveal })));
const ProgressiveReveal = dynamic(() => import("@/components/page-transition").then(mod => ({ default: mod.ProgressiveReveal })));

import { ViewPricingButton } from "@/components/view-pricing-button";
import { WaitlistModal } from "@/components/waitlist-modal";
import { BookingModal } from "@/components/booking-modal";

export default function Home() {
  // Performance optimizations in progress - console logs removed for production
  
  return (
    <MobileViewport>

        <div className="min-h-screen bg-background relative">
          <SkipToContent />
        
          <Header />
          {/* Spotlight removed for performance */}
          
          <main id="main-content" tabIndex={-1} className="relative">
        
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center w-full pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-20" role="banner" aria-labelledby="hero-heading">
          {/* Background Video */}
          <HeroBgVideo overlayOpacity={0.6} />

          {/* Main Content */}
          <div className="relative container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center max-w-[100vw]">
            <div className="max-w-4xl mx-auto">
                {/* MODRON Logo removed to keep hero content above the fold */}
              
              {/* Main Headline with subtle parallax */}
              <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light tracking-tight mb-6 sm:mb-8 md:mb-12 leading-tight reveal will-change-transform">
                <span className="bg-gradient-to-r from-white via-green-200 to-white bg-clip-text text-transparent">
                  Green AI Compute
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent">
                  for Enterprises
                </span>
              </h1>
              
              {/* Subheading */}
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#DDDDDD] mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed font-light reveal reveal-delay will-change-transform px-4">
                Immersion-cooled, solar-powered GPU infrastructure with SLA-backed uptime — delivering performance and sustainability at scale.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-10 md:mb-12">
                <div className="min-h-[44px]">
                  <BookingModal />
                </div>
                <div className="min-h-[44px]">
                  <ViewPricingButton />
                </div>
              </div>
              
                {/* Enhanced Animated Stats (restored) */}
                <div className="mt-8 sm:mt-10 md:mt-12">
                  <AnimatedStats />
                </div>
              </div>
          </div>
          
          {/* Scroll Indicator */}
          <OptimizedScrollIndicator />
        </section>

      {/* Mission & Vision Section */}
      <section id="vision" className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-[#1A1A1A]/20 to-black" role="region" aria-labelledby="vision-heading">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Mission Statement */}
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 id="vision-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
                Our Mission
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[#DDDDDD] leading-relaxed font-light max-w-5xl mx-auto mb-8 sm:mb-12 px-4">
                MODRON is building sustainable enterprise AI compute infrastructure — optimized for AI workloads, powered by the sun, and scaled globally with purpose.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 mx-auto"></div>
            </div>
            
            {/* Why MODRON Grid */}
            <StaggeredReveal staggerDelay={150}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8" role="list" aria-label="Why choose MODRON">
              {/* Renewable-powered */}
                <div className="text-center group hover-lift" role="listitem">
                  <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg hover-glow active:scale-95 sm:active:scale-100" aria-hidden="true">
                  <Icons.Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-light text-lg mb-3">Renewable-powered</h3>
                <p className="text-[#999999] leading-relaxed font-light text-sm sm:text-base">
                  Solar and grid-integrated power systems for sustainable operations
                </p>
              </div>

              {/* Immersion cooling = lower failure rates */}
                <div className="text-center group hover-lift">
                  <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg hover-glow active:scale-95 sm:active:scale-100">
                  <Icons.Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-light text-lg mb-3">Immersion cooling = lower failure rates</h3>
                <p className="text-[#999999] leading-relaxed font-light text-sm sm:text-base">
                  Advanced liquid cooling technology ensures maximum reliability and performance
                </p>
              </div>

              {/* Operates at the edge of efficiency */}
                <div className="text-center group hover-lift">
                  <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg hover-glow active:scale-95 sm:active:scale-100">
                  <Icons.Gauge className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-white font-light text-lg mb-3">Operates at the edge of efficiency</h3>
                <p className="text-[#999999] leading-relaxed font-light text-sm sm:text-base">
                  Optimized systems delivering peak performance with minimal energy waste
                </p>
              </div>

              {/* Carbon-aware + Off-grid capable */}
                <div className="text-center group hover-lift">
                  <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg hover-glow active:scale-95 sm:active:scale-100">
                  <Icons.Globe className="h-8 w-8 text-white" />
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

      {/* Technology & Infrastructure Section */}
      <section id="technology" className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-[#1A1A1A] via-black to-[#1A1A1A]">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
              Technology & Infrastructure
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
              Modular, scalable architecture designed for maximum performance and efficiency. Our hardware-first approach 
              combines cutting-edge RTX 4090 GPUs with revolutionary immersion cooling technology, all housed in 
              shipping container infrastructure for rapid deployment and scalability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
            {/* Infrastructure Diagram */}
            <ProgressiveReveal delay={200}>
            <div className="relative">
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-2xl p-4 sm:p-6 md:p-8" style={{ willChange: 'transform' }}>
                {/* Solar + Grid Power */}
                <div className="flex items-center justify-center mb-6 sm:mb-8">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3 sm:p-4 mr-2 sm:mr-4">
                    <Icons.Sun className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                    <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl p-3 sm:p-4">
                    <Icons.Power className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="ml-2 sm:ml-4 text-white font-semibold text-sm sm:text-base">Solar + Grid Hybrid Power</div>
                </div>
                
                {/* Connection Line */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-green-500 to-emerald-600" style={{ willChange: 'transform' }}></div>
                </div>
                
                {/* GPU Tank */}
                <div className="mb-6 sm:mb-8">
                  <ImmersionTankVideo className="h-48 sm:h-64" />
                </div>
                
                {/* Connection Line */}
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-emerald-600 to-green-700" style={{ willChange: 'transform' }}></div>
                </div>
                
                {/* Network Layer */}
                <div className="flex items-center justify-center">
                    <div className="bg-gradient-to-br from-green-700 to-emerald-800 rounded-xl p-3 sm:p-4 mr-2 sm:mr-4">
                    <Icons.Cloud className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                    <div className="bg-gradient-to-br from-emerald-800 to-green-900 rounded-xl p-3 sm:p-4">
                    <Icons.Network className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="ml-2 sm:ml-4 text-white font-semibold text-sm sm:text-base">Vast.ai + Direct Connect</div>
                </div>
              </div>
            </div>
            </ProgressiveReveal>
            
            {/* Infrastructure Details */}
            <StaggeredReveal staggerDelay={100}>
            <div className="space-y-6 sm:space-y-8">
              {/* GPU Nodes */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 hover:border-green-500/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-2 sm:p-3 mr-3 sm:mr-4">
                    <Icons.Cpu className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">GPU Nodes</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-sm sm:text-base">6× RTX 4090 per tank</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      High-density GPU clusters optimized for AI workloads with maximum throughput and minimal latency.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Immersion Cooling */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 hover:border-emerald-500/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-2 sm:p-3 mr-3 sm:mr-4">
                    <Icons.Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Immersion Cooling</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-sm sm:text-base">Advanced liquid cooling system</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Proprietary immersion cooling technology reduces failure rates by 60% while maintaining peak performance.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Solar + Grid Hybrid */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 hover:border-green-600/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-2 sm:p-3 mr-3 sm:mr-4">
                    <Icons.Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Solar + Grid Hybrid Power</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-sm sm:text-base">Sustainable energy infrastructure</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Intelligent power management combining solar generation with grid integration for optimal efficiency.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Vast.ai + Direct Connect */}
                <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 hover:border-emerald-600/30 transition-all duration-200" style={{ willChange: 'transform' }}>
                <div className="flex items-start">
                    <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl p-2 sm:p-3 mr-3 sm:mr-4">
                    <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Vast.ai + Direct Connect</h3>
                    <p className="text-[#999999] mb-2 sm:mb-3 text-sm sm:text-base">Flexible access options</p>
                    <p className="text-[#CCCCCC] text-xs sm:text-sm">
                      Seamless integration with Vast.ai marketplace plus direct enterprise connections for dedicated workloads.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </StaggeredReveal>
          </div>
        </div>
      </section>



      {/* Use Cases Section */}
      <section id="use-cases" className="relative z-10 overflow-visible py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-green-900/20 to-black">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 tracking-tight">
              Use Cases
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#CCCCCC] max-w-4xl mx-auto font-light leading-relaxed px-4">
              Powerful infrastructure designed for the most demanding AI and computing workloads
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
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icons.Database className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Data Preparation</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Raw data processing and preprocessing</p>
                  </div>
                  
                  {/* Model Training */}
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icons.Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Model Training</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Neural network training and optimization</p>
                  </div>
                  
                  {/* Model Evaluation */}
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icons.BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Model Evaluation</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Performance testing and validation</p>
                  </div>
                  
                  {/* Deployment */}
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icons.Server className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Deployment</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Production deployment and serving</p>
                  </div>
                </div>
                
                {/* Connection Lines */}
                <div className="hidden lg:block mt-8">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                    <div className="w-8 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"></div>
                    <div className="w-8 h-1 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pointer-events-none h-4"></div>
            <StaggeredReveal staggerDelay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mt-6 relative z-10">
            {/* AI Training */}
            <HoverCard 
              className="bg-[#1A1A1A]/50 border-[#262626]"
              icon={
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Icons.Brain className="h-8 w-8 text-white" />
                </div>
              }
              title="AI Training"
              description="Train large-scale neural networks and machine learning models with unprecedented speed and efficiency"
            >
              <div className="text-sm text-[#999999] space-y-1">
                <p>• Large Language Models (LLMs)</p>
                <p>• Computer Vision Models</p>
                <p>• Recommendation Systems</p>
                <p>• Autonomous Vehicle AI</p>
              </div>
            </HoverCard>

            {/* Rendering */}
            <HoverCard 
              className="bg-[#1A1A1A]/50 border-[#262626]"
              icon={
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Icons.Monitor className="h-8 w-8 text-white" />
                </div>
              }
              title="Rendering"
              description="Accelerate 3D rendering, video processing, and visual effects production"
            >
              <div className="text-sm text-[#999999] space-y-1">
                <p>• 3D Animation & VFX</p>
                <p>• Architectural Visualization</p>
                <p>• Game Development</p>
                <p>• Video Production</p>
              </div>
            </HoverCard>

            {/* LLM Fine-tuning */}
            <Card className="bg-[#1A1A1A]/50 border-[#262626] pt-2 hover:border-green-600/50 hover:shadow-lg hover:shadow-green-600/20 transition-all duration-300 group overflow-visible">
              <CardHeader className="text-center pt-6 pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icons.Code className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">LLM Fine-tuning</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-[#CCCCCC] text-base mb-4">
                  Customize and optimize large language models for specific domains and applications
                </CardDescription>
                <div className="text-sm text-[#999999] space-y-1">
                  <p>• Domain-Specific Models</p>
                  <p>• Instruction Tuning</p>
                  <p>• Parameter-Efficient Training</p>
                  <p>• Multi-Modal Models</p>
                </div>
              </CardContent>
            </Card>

            {/* Data Science & Inference */}
            <Card className="bg-[#1A1A1A]/50 border-[#262626] pt-2 hover:border-emerald-600/50 hover:shadow-lg hover:shadow-emerald-600/20 transition-all duration-300 group overflow-visible">
              <CardHeader className="text-center pt-6 pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icons.BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">Data Science & Inference</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-[#CCCCCC] text-base mb-4">
                  Power real-time inference and complex data analysis workloads
                </CardDescription>
                <div className="text-sm text-[#999999] space-y-1">
                  <p>• Real-Time Inference</p>
                  <p>• Predictive Analytics</p>
                  <p>• Big Data Processing</p>
                  <p>• Model Serving</p>
                </div>
              </CardContent>
            </Card>
          </div>
            </StaggeredReveal>
          </div>
        </div>
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
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icons.Server className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Infrastructure Layer</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">GPU clusters, cooling systems, power management</p>
                  </div>
                  
                  {/* Platform Layer */}
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icons.Cloud className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Platform Layer</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">Container orchestration, APIs, monitoring</p>
                  </div>
                  
                  {/* Application Layer */}
                  <div className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Icons.Code className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                    </div>
                    <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Application Layer</h4>
                    <p className="text-[#999999] text-xs sm:text-sm">AI workloads, enterprise integrations</p>
                  </div>
                </div>
                
                {/* Connection Lines */}
                <div className="hidden lg:block mt-8">
                  <div className="flex justify-center items-center space-x-8">
                    <div className="w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"></div>
                    <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Always-on Availability */}
            <div className="group cursor-pointer">
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Icons.Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
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
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Icons.Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
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
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-green-600/50 hover:shadow-lg hover:shadow-green-600/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Icons.Settings className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
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
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-emerald-600/50 hover:shadow-lg hover:shadow-emerald-600/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Icons.Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
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
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-700 to-emerald-800 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Icons.Eye className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
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
              <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-xl p-4 sm:p-5 md:p-6 h-full hover:border-emerald-700/50 hover:shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 group-hover:scale-105 active:scale-95 sm:active:scale-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-700 to-green-800 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                    <Icons.Headphones className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">Dedicated Support</h3>
                </div>
                <p className="text-[#999999] text-xs sm:text-sm leading-relaxed">
                  24/7 technical support with dedicated account managers and priority response times for enterprise clients.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <AnimatedHowItWorks />

      {/* Pricing Section */}
      <section id="pricing" className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-green-900/20 to-black">
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
                  See how MODRON stacks up against traditional cloud providers
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
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Green Energy</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Dedicated Resources</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">SLA</th>
                        <th className="text-center p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">Carbon Offset</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#333333] bg-green-900/20">
                        <td className="p-3 sm:p-4 md:p-6 text-white font-bold text-xs sm:text-sm md:text-base">MODRON</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-green-400 font-bold text-xs sm:text-sm md:text-base">$0.54–$0.80</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-green-400 font-bold text-xs sm:text-sm md:text-base">80–95%</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-green-400 font-bold text-xs sm:text-sm md:text-base">Yes</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-green-400 font-bold text-xs sm:text-sm md:text-base">High</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-green-400 font-bold text-xs sm:text-sm md:text-base">Included</td>
                      </tr>
                      <tr className="border-t border-[#333333]">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">AWS</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$1.20+</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Low</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Often Shared</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Varies</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Paid Extra</td>
                      </tr>
                      <tr className="border-t border-[#333333]">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">GCP</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$1.10+</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Low</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Often Shared</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Varies</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Paid Extra</td>
                      </tr>
                      <tr className="border-t border-[#333333]">
                        <td className="p-3 sm:p-4 md:p-6 text-white text-xs sm:text-sm md:text-base">Lambda Labs</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">~$0.90</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Medium</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Yes</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">High</td>
                        <td className="text-center p-3 sm:p-4 md:p-6 text-[#CCCCCC] text-xs sm:text-sm md:text-base">Paid Extra</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {/* MODRON Card */}
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-white font-bold text-lg">MODRON</h4>
                    <span className="text-green-400 font-bold text-lg">$0.54–$0.80</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-[#999999]">Green Energy:</span>
                      <span className="text-green-400 font-semibold ml-2">80–95%</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Dedicated:</span>
                      <span className="text-green-400 font-semibold ml-2">Yes</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">SLA:</span>
                      <span className="text-green-400 font-semibold ml-2">High</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Carbon Offset:</span>
                      <span className="text-green-400 font-semibold ml-2">Included</span>
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
                      <span className="text-[#999999]">Green Energy:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Low</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Dedicated:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Often Shared</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">SLA:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Varies</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Carbon Offset:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Paid Extra</span>
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
                      <span className="text-[#999999]">Green Energy:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Low</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Dedicated:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Often Shared</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">SLA:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Varies</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Carbon Offset:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Paid Extra</span>
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
                      <span className="text-[#999999]">Green Energy:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Medium</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Dedicated:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Yes</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">SLA:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">High</span>
                    </div>
                    <div>
                      <span className="text-[#999999]">Carbon Offset:</span>
                      <span className="text-[#CCCCCC] font-semibold ml-2">Paid Extra</span>
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
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-8 sm:p-12 text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Icons.Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
                Pre-Launch Offer
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[#CCCCCC] mb-6 sm:mb-8 max-w-2xl mx-auto">
                Early waitlist members receive priority access to new clusters and pre-launch pricing for the first 6 months.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center text-green-400 font-bold text-base sm:text-lg">
                  <Icons.Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Priority Access
                </div>
                <div className="flex items-center text-green-400 font-bold text-base sm:text-lg">
                  <Icons.CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Pre-Launch Pricing
                </div>
                <div className="flex items-center text-green-400 font-bold text-base sm:text-lg">
                  <Icons.Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  6 Months Duration
                </div>
              </div>
              <WaitlistModal />
            </div>
            */}

            {/* Pre-Launch Offer - ENHANCED VERSION */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-2 h-2 bg-green-400/30 rounded-full animate-pulse"></div>
                <div className="absolute top-20 right-20 w-1 h-1 bg-emerald-400/40 rounded-full animate-ping"></div>
                <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-green-300/20 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 right-10 w-1 h-1 bg-green-400/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-emerald-300/15 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              </div>

              {/* Enhanced Star Icon */}
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center relative group">
                <Icons.Star className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
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
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 hover:bg-green-500/20 hover:border-green-400/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.Clock className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-green-400 font-bold text-sm">Priority Access</p>
                    <p className="text-[#999999] text-xs mt-1">Skip the queue</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 hover:bg-emerald-500/20 hover:border-emerald-400/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.CheckCircle className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-emerald-400 font-bold text-sm">Pre-Launch Pricing</p>
                    <p className="text-[#999999] text-xs mt-1">Exclusive rates</p>
                  </div>
                </div>
                
                <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                  <div className="bg-green-600/10 border border-green-600/20 rounded-xl p-4 hover:bg-green-600/20 hover:border-green-500/40 transition-all duration-300">
                    <div className="flex items-center justify-center mb-3">
                      <Icons.Zap className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-green-500 font-bold text-sm">6 Months Duration</p>
                    <p className="text-[#999999] text-xs mt-1">Limited time</p>
                  </div>
                </div>
              </div>



              {/* Enhanced CTA */}
              <WaitlistModal />
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Contact Section */}
      <section id="contact" className="relative py-12 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-black via-green-900/30 to-black">
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
              <div className="min-h-[44px]">
                <BookingModal />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#1A1A1A]/50 border border-[#262626] rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Get in Touch</h3>
              <p className="text-[#999999] mb-6 sm:mb-8 text-sm sm:text-base">
                Have questions? Send us a message and we&apos;ll get back to you within 24 hours.
              </p>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      </main>
      
      {/* Footer */}
      <footer className="bg-black border-t border-[#262626]" role="contentinfo">
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

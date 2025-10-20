export function AnimatedHeadline() {
  return (
    <h1 
      id="hero-heading" 
      className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight"
      style={{ color: '#1f2937' }}
    >
      <span style={{ color: '#1f2937' }}>
        Building Australia's <br className="hidden lg:block" />AI infrastructure
      </span>
    </h1>
  )
}

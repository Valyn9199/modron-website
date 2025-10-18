export function AnimatedHeadline() {
  return (
    <h1 
      id="hero-heading" 
      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 leading-tight"
      style={{ color: '#1f2937' }}
    >
      <span style={{ color: '#1f2937' }}>
        Building Australia's sovereign <br className="hidden lg:block" />AI infrastructure
      </span>
    </h1>
  )
}

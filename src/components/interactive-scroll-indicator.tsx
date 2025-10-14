"use client"

export function InteractiveScrollIndicator() {
  const scrollToVision = () => {
    const visionSection = document.getElementById('vision')
    if (visionSection) {
      visionSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div 
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
      onClick={scrollToVision}
    >
      <div className="w-6 h-10 border-2 border-[#999999] rounded-full flex justify-center hover:border-[#40d0f2] transition-colors duration-300">
        <div className="w-1 h-3 bg-[#999999] rounded-full mt-2 animate-pulse hover:bg-[#40d0f2] transition-colors duration-300"></div>
      </div>
    </div>
  )
}

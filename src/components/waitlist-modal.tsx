"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { X, Mail, CheckCircle } from "lucide-react"

export function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    setIsOpen(false)
    setEmail("")
    setError("")
    setIsSubmitted(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const modalContent = isOpen ? (
    <div
      style={{
        position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 9998,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
        boxSizing: "border-box", animation: "fadeIn 0.3s ease-out"
      }}
      onClick={closeModal}
    >
      <div
        style={{
          backgroundColor: "#1a1a1a", borderRadius: "12px", padding: "32px",
          maxWidth: "500px", width: "100%", maxHeight: "90vh", overflowY: "auto",
          border: "2px solid #333", position: "relative", boxSizing: "border-box",
          animation: "slideIn 0.3s ease-out", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "none", border: "none", cursor: "pointer",
            color: "#999", fontSize: "24px", lineHeight: "1"
          }}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Join the Waitlist</h2>
              <p className="text-[#CCCCCC] text-base">
                Be among the first to access MODRONs green GPU infrastructure when we launch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#CCCCCC] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#666666]" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 bg-[#262626] border border-[#333333] rounded-lg text-white placeholder-[#666666] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0 text-white py-4 text-base font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>

            <div className="mt-6 bg-[#262626]/50 border border-[#333333] rounded-lg p-4">
              <p className="text-[#999999] text-sm text-center">
                Well notify you as soon as we launch and give you early access to our platform.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Youre on the list!</h2>
            <p className="text-[#CCCCCC] text-base mb-6">
              Thanks for joining our waitlist. Well be in touch soon with updates on our launch progress.
            </p>
            <Button
              onClick={closeModal}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0 text-white py-3 px-6 font-medium transition-all duration-300"
            >
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  ) : null

  return (
    <>
      <Button 
        variant="outline" 
        size="lg" 
        className="border-2 border-[#4D4D4D] text-[#CCCCCC] hover:bg-[#262626] hover:border-[#666666] hover:text-white transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
        onClick={openModal}
      >
        Join Waitlist
      </Button>
      {typeof window !== "undefined" && createPortal(modalContent, document.body)}
    </>
  )
}

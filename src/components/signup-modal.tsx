"use client"

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { X, Mail, Phone, MessageSquare, ArrowRight } from 'lucide-react'

export function SignupModal() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const modalContent = isOpen ? (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 9998,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        boxSizing: 'border-box', animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={closeModal}
    >
      <div
        style={{
          backgroundColor: '#1a1a1a', borderRadius: '12px', padding: '32px',
          maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
          border: '2px solid #333', position: 'relative', boxSizing: 'border-box',
          animation: 'slideIn 0.3s ease-out', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#999', fontSize: '24px', lineHeight: '1'
          }}
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Get Compute Access</h2>
          <p className="text-[#CCCCCC] text-base">
            Choose how you'd like to get started with MODRON's green GPU infrastructure
          </p>
        </div>

        {/* Contact Options */}
        <div className="space-y-4 mb-8">
          {/* Contact Sales */}
          <Button
            onClick={() => {
              window.open('mailto:contact@modron.com?subject=Sales Inquiry - Get Compute Access', '_blank')
              closeModal()
            }}
            className="w-full bg-gradient-to-r from-[#d5aaf9] to-[#40d0f2] hover:from-[#c49ae8] hover:to-[#2bb8d9] border-0 text-white py-4 text-base font-medium transition-all duration-300 transform hover:scale-105"
          >
            <MessageSquare className="mr-3 h-5 w-5" />
            Contact Sales Team
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>

          {/* Email Directly */}
          <Button
            onClick={() => {
              window.open('mailto:contact@modron.com?subject=Compute Access Request', '_blank')
              closeModal()
            }}
            variant="outline"
            className="w-full border-2 border-[#4D4D4D] text-[#CCCCCC] hover:bg-[#262626] hover:border-[#666666] hover:text-white py-4 text-base font-medium transition-all duration-300"
          >
            <Mail className="mr-3 h-5 w-5" />
            Email Directly
          </Button>

          {/* Call Us */}
          <Button
            onClick={() => {
              window.open('tel:+61400000000', '_blank')
              closeModal()
            }}
            variant="outline"
            className="w-full border-2 border-[#4D4D4D] text-[#CCCCCC] hover:bg-[#262626] hover:border-[#666666] hover:text-white py-4 text-base font-medium transition-all duration-300"
          >
            <Phone className="mr-3 h-5 w-5" />
            Call Us Now
          </Button>
        </div>

        {/* Additional Info */}
        <div className="bg-[#262626]/50 border border-[#333333] rounded-lg p-4">
          <p className="text-[#999999] text-sm text-center">
            Our team will get back to you within 24 hours to discuss your requirements and set up your compute access.
          </p>
        </div>
      </div>
    </div>
  ) : null

  return (
    <>
      <Button 
        size="lg" 
        className="text-base sm:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-[#d5aaf9] to-[#40d0f2] hover:from-[#c49ae8] hover:to-[#2bb8d9] border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        onClick={openModal}
      >
        Get Compute
        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      {typeof window !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  )
}

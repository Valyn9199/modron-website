"use client"

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { LoadingButton } from '@/components/loading-button'
import { 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  X,
  Loader2
} from 'lucide-react'

export function BookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      // Send to Next.js API route
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        })
        
        // Close modal after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
          setIsOpen(false)
        }, 3000)
      } else {
        setSubmitError(result.error || "Failed to book consultation. Please try again.")
      }
      
    } catch (error) {
      console.error('Booking submission error:', error)
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const openModal = () => {
    previousFocusRef.current = document.activeElement as HTMLElement
    setIsOpen(true)
  }
  
  const closeModal = () => {
    setIsOpen(false)
    if (previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }

  // Focus management
  useEffect(() => {
    if (isOpen) {
      const modal = modalRef.current
      if (modal) {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>
        
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }
    }
  }, [isOpen])

  // Portal modal to document.body
  const modalContent = isOpen ? (
    <div 
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        overflow: 'auto',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={closeModal}
    >
      {/* Modal Content */}
      <div 
        ref={modalRef}
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '12px',
          padding: '16px',
          maxWidth: '500px',
          width: 'calc(100% - 20px)',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '2px solid #333',
          position: 'relative',
          boxSizing: 'border-box',
          animation: 'slideIn 0.3s ease-out',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        aria-describedby="booking-modal-description"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h2 
            id="booking-modal-title"
            style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#fff', 
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Calendar size={24} />
            Book a Consultation
          </h2>
          <p id="booking-modal-description" style={{ color: '#999', fontSize: '16px' }}>
            Schedule a call to discuss your AI infrastructure needs
          </p>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div 
            role="alert" 
            aria-live="polite" 
            aria-atomic="true"
            style={{
              backgroundColor: '#1a3a1a',
              border: '1px solid #4ade80',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            <CheckCircle size={20} color="#4ade80" />
            <div>
              <div style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '4px' }}>
                Booking Submitted!
              </div>
              <div style={{ color: '#9ca3af', fontSize: '14px' }}>
                We'll get back to you within 24 hours to confirm your consultation.
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div 
            role="alert" 
            aria-live="assertive" 
            aria-atomic="true"
            style={{
              backgroundColor: '#3a1a1a',
              border: '1px solid #f87171',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideIn 0.3s ease-out'
            }}
          >
            <AlertCircle size={20} color="#f87171" />
            <div style={{ color: '#f87171', fontSize: '14px' }}>
              {submitError}
            </div>
          </div>
        )}

        {/* Booking Form */}
        {!submitSuccess && (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label htmlFor="booking-name" style={{ 
                display: 'block', 
                color: '#fff', 
                marginBottom: '8px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Name *
              </label>
              <input
                id="booking-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                minLength={2}
                maxLength={100}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#262626',
                  border: '1px solid #404040',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  transition: 'all 0.2s ease'
                }}
                placeholder="Your full name"
                aria-describedby="booking-name-error"
                aria-invalid={!!submitError && !formData.name}
                onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                onBlur={(e) => e.target.style.borderColor = '#404040'}
              />
              {submitError && !formData.name && (
                <div id="booking-name-error" role="alert" aria-live="polite" style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>
                  Name is required
                </div>
              )}
            </div>

            <div>
              <label htmlFor="booking-email" style={{ 
                display: 'block', 
                color: '#fff', 
                marginBottom: '8px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Email *
              </label>
              <input
                id="booking-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#262626',
                  border: '1px solid #404040',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  transition: 'all 0.2s ease'
                }}
                placeholder="your.email@company.com"
                aria-describedby="booking-email-error"
                aria-invalid={!!submitError && !formData.email}
                onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                onBlur={(e) => e.target.style.borderColor = '#404040'}
              />
              {submitError && !formData.email && (
                <div id="booking-email-error" role="alert" aria-live="polite" style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>
                  Valid email is required
                </div>
              )}
            </div>

            <div>
              <label htmlFor="booking-company" style={{ 
                display: 'block', 
                color: '#fff', 
                marginBottom: '8px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Company
              </label>
              <input
                id="booking-company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                maxLength={100}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#262626',
                  border: '1px solid #404040',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  transition: 'all 0.2s ease'
                }}
                placeholder="Your company name"
                onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                onBlur={(e) => e.target.style.borderColor = '#404040'}
              />
            </div>

            <div>
              <label htmlFor="booking-phone" style={{ 
                display: 'block', 
                color: '#fff', 
                marginBottom: '8px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Phone
              </label>
              <input
                id="booking-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                pattern="[\+]?[0-9\s\-\(\)]{10,}"
                maxLength={20}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#262626',
                  border: '1px solid #404040',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  transition: 'all 0.2s ease'
                }}
                placeholder="Your phone number"
                onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                onBlur={(e) => e.target.style.borderColor = '#404040'}
              />
            </div>

            <div>
              <label htmlFor="booking-message" style={{ 
                display: 'block', 
                color: '#fff', 
                marginBottom: '8px', 
                fontSize: '14px',
                fontWeight: '500'
              }}>
                Message *
              </label>
              <textarea
                id="booking-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                minLength={10}
                maxLength={1000}
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#262626',
                  border: '1px solid #404040',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '16px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease'
                }}
                placeholder="Tell us about your project and requirements..."
                aria-describedby="booking-message-error"
                aria-invalid={!!submitError && !formData.message}
                onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                onBlur={(e) => e.target.style.borderColor = '#404040'}
              />
              {submitError && !formData.message && (
                <div id="booking-message-error" role="alert" aria-live="polite" style={{ color: '#f87171', fontSize: '12px', marginTop: '4px' }}>
                  Message is required (minimum 10 characters)
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Book Consultation
                  <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  ) : null

  return (
    <>
      <Button 
        variant="outline" 
        size="lg" 
        className="text-base sm:text-lg px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 border-2 border-[#4D4D4D] text-[#CCCCCC] hover:bg-[#262626] hover:border-[#666666] hover:text-white transition-all duration-300 transform hover:scale-105"
        onClick={openModal}
      >
        Book a Call
      </Button>

      {/* Render modal via portal */}
      {typeof window !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  )
}

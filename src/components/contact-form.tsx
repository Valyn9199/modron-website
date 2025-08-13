"use client"

import { useState } from 'react'
import { LoadingButton } from '@/components/loading-button'
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Company validation (optional but if provided, validate)
    if (formData.company.trim() && formData.company.trim().length < 2) {
      newErrors.company = 'Company name must be at least 2 characters'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      // Send to Next.js API route
      const response = await fetch('/api/contact', {
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
          name: "",
          email: "",
          company: "",
          message: ""
        })
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      } else {
        // Handle validation errors
        if (result.errors) {
          setErrors(result.errors)
          setSubmitError("Please fix the errors above")
        } else {
          setSubmitError(result.error || "Failed to send message. Please try again or email us directly at contact@modron.com")
        }
      }
      
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError("Network error. Please check your connection and try again, or email us directly at contact@modron.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit()
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-[#1A1A1A]/50 border border-green-500/50 rounded-2xl p-8 text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-[#CCCCCC] mb-4">
          Thank you for your message. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-green-400 hover:text-green-300 transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#1A1A1A]/30 p-8 rounded-2xl border border-[#333333]/50" noValidate>
      {submitError && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{submitError}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#CCCCCC] mb-3 text-center md:text-left">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full h-14 px-4 bg-[#262626] border-2 rounded-lg text-white placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-base ${
              errors.name ? 'border-red-500' : 'border-[#333333]'
            }`}
            placeholder="Your name"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
            required
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#CCCCCC] mb-3 text-center md:text-left">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full h-14 px-4 bg-[#262626] border-2 rounded-lg text-white placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-base ${
              errors.email ? 'border-red-500' : 'border-[#333333]'
            }`}
            placeholder="your.email@company.com"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            required
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-[#CCCCCC] mb-3 text-center md:text-left">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className={`w-full h-14 px-4 bg-[#262626] border-2 rounded-lg text-white placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-base ${
            errors.company ? 'border-red-500' : 'border-[#333333]'
          }`}
          placeholder="Your company (optional)"
          aria-describedby={errors.company ? "company-error" : undefined}
          aria-invalid={!!errors.company}
        />
        {errors.company && (
          <p id="company-error" className="mt-1 text-sm text-red-400" role="alert">
            {errors.company}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#CCCCCC] mb-3 text-center md:text-left">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={5}
          className={`w-full px-4 py-4 bg-[#262626] border-2 rounded-lg text-white placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none text-base ${
            errors.message ? 'border-red-500' : 'border-[#333333]'
          }`}
          placeholder="Tell us about your project or requirements..."
          aria-describedby={errors.message ? "message-error" : "message-help"}
          aria-invalid={!!errors.message}
          required
        />
        <div className="flex justify-between items-center mt-1">
          {errors.message ? (
            <p id="message-error" className="text-sm text-red-400" role="alert">
              {errors.message}
            </p>
          ) : (
            <p id="message-help" className="text-sm text-[#666666]">
              Press Ctrl+Enter to submit
            </p>
          )}
          <span className="text-sm text-[#666666]">
            {formData.message.length}/1000
          </span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <LoadingButton 
          type="submit"
          size="lg" 
          className="flex-1 h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
          loadingText="Sending..."
          onClick={handleSubmit}
        >
          Send Message
          <ArrowRight className="ml-2 h-5 w-5" />
        </LoadingButton>
        
        <a 
          href="mailto:contact@modron.com?subject=Inquiry about MODRON services"
          className="flex-1 inline-flex items-center justify-center h-14 px-6 border-2 border-[#4D4D4D] text-[#CCCCCC] hover:bg-[#262626] hover:border-[#666666] hover:text-white transition-all duration-300 transform hover:scale-105 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold text-lg"
          aria-label="Send email directly to contact@modron.com"
        >
          <Mail className="mr-2 h-5 w-5" />
          Email Directly
        </a>
      </div>
    </form>
  )
}

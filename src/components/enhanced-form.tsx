"use client"

import { useState } from "react"
import { EnhancedButton } from "./enhanced-button"
import { EnhancedInput, EnhancedTextarea } from "./enhanced-input"
import { Icons } from "@/lib/icon-imports"

interface FormData {
  name: string
  email: string
  company: string
  message: string
}

interface EnhancedFormProps {
  onSubmit?: (data: FormData) => void
  className?: string
}

export function EnhancedForm({ onSubmit, className }: EnhancedFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: ""
  })
  
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
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
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message')
      }
      
      onSubmit?.(formData)
      setIsSubmitted(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ name: "", email: "", company: "", message: "" })
        setIsSubmitted(false)
      }, 3000)
      
    } catch (error) {
      console.error("Form submission error:", error)
      setErrors({ message: "Failed to send message. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateField = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-r from-[#40d0f2] to-[#32ca73] rounded-full flex items-center justify-center mx-auto mb-4">
          <Icons.CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-gray-400">We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={className || ""}>
      <div className="space-y-6">
        {/* Name Field */}
        <EnhancedInput
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={updateField("name")}
          error={errors.name}
          required
          icon={<Icons.User className="w-5 h-5" />}
        />

        {/* Email Field */}
        <EnhancedInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={updateField("email")}
          error={errors.email}
          required
          icon={<Icons.Mail className="w-5 h-5" />}
        />

        {/* Company Field */}
        <EnhancedInput
          label="Company (Optional)"
          placeholder="Enter your company name"
          value={formData.company}
          onChange={updateField("company")}
          icon={<Icons.Building className="w-5 h-5" />}
        />

        {/* Message Field */}
        <EnhancedTextarea
          label="Message"
          placeholder="Tell us about your project requirements"
          value={formData.message}
          onChange={updateField("message")}
          error={errors.message}
          required
          rows={5}
        />

        {/* Submit Button */}
        <EnhancedButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={isSubmitting}
          glow
          ripple
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </EnhancedButton>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center">
          By submitting this form, you agree to our privacy policy. We'll never share your information.
        </p>
      </div>
    </form>
  )
}

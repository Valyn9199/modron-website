"use client"

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { 
  LogIn, 
  X,
  Loader2,
  Mail,
  Lock
} from 'lucide-react'
import Image from 'next/image'

export function LoginModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string>('')
  const modalRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // All login attempts fail
    if (email && password) {
      setError('Invalid email or password. Please contact your administrator for access.')
    } else {
      setError('Please enter both email and password')
    }
    
    setIsSubmitting(false)
  }

  const closeModal = () => {
    setIsOpen(false)
    setError('')
    setEmail('')
    setPassword('')
  }

  // Handle ESC key and click outside
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const modalContent = isOpen ? (
    <div 
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(4px)',
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
      <div 
        ref={modalRef}
        style={{
          backgroundColor: '#000000',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '480px',
          width: 'calc(100% - 20px)',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '1px solid #1a1a1a',
          position: 'relative',
          boxSizing: 'border-box',
          animation: 'slideIn 0.3s ease-out',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95)'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1a1a] transition-all duration-200"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="p-2">
              <Image
                src="/MODRON_ICON.png"
                alt="MODRON"
                width={72}
                height={72}
                className="w-18 h-18 object-contain"
              />
            </div>
          </div>
          <h2 id="login-modal-title" className="text-3xl font-semibold text-white mb-3 tracking-tight">
            Client Login
          </h2>
          <p className="text-gray-400 text-base">
            Access your MODRON dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#333333] focus:bg-[#0f0f0f] transition-all duration-200 hover:border-[#262626]"
                placeholder="your@email.com"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#333333] focus:bg-[#0f0f0f] transition-all duration-200 hover:border-[#262626]"
                placeholder="Enter your password"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0a0a0a] hover:bg-[#1a1a1a] border border-[#1a1a1a] hover:border-[#333333] text-white font-medium py-3.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  ) : null

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="flex items-center gap-2 border-[#4A4A4A] text-gray-300 hover:text-white hover:bg-[#1A1A1A] hover:border-[#666666] w-full lg:w-auto"
      >
        Login
      </Button>
      {typeof window !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  )
}

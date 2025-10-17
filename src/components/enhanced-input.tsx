"use client"

import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface EnhancedInputProps {
  label?: string
  placeholder?: string
  type?: "text" | "email" | "password" | "tel"
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  required?: boolean
  className?: string
  floating?: boolean
  icon?: React.ReactNode
}

export function EnhancedInput({
  label,
  placeholder,
  type = "text",
  value = "",
  onChange,
  error,
  disabled = false,
  required = false,
  className,
  floating = true,
  icon
}: EnhancedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(value.length > 0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setHasValue((inputRef.current?.value?.length || 0) > 0)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setHasValue(newValue.length > 0)
    onChange?.(newValue)
  }

  const isFloating = floating && (isFocused || hasValue)

  return (
    <div className={cn("relative", className)}>
      {/* Input container */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {icon}
          </div>
        )}

        {/* Input field */}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={floating ? "" : placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            "w-full px-4 py-3 bg-[#1A1A1A] border border-[#262626] rounded-lg",
            "text-white placeholder-gray-500 transition-all duration-200",
            "focus:outline-none focus:border-[#40d0f2] focus:ring-1 focus:ring-[#40d0f2]",
            "hover:border-[#404040] disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            icon && "pl-10"
          )}
        />

        {/* Floating label */}
        {floating && label && (
          <label
            className={cn(
              "absolute left-4 transition-all duration-200 pointer-events-none",
              isFloating
                ? "top-2 text-xs text-[#40d0f2]"
                : "top-1/2 transform -translate-y-1/2 text-gray-400",
              icon && "left-10",
              error && "text-red-500"
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Focus indicator */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-200 pointer-events-none",
            isFocused && "border-[#40d0f2] shadow-[0_0_0_1px_rgba(64,208,242,0.2)]"
          )}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}

interface EnhancedTextareaProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  className?: string
  floating?: boolean
}

export function EnhancedTextarea({
  label,
  placeholder,
  value = "",
  onChange,
  error,
  disabled = false,
  required = false,
  rows = 4,
  className,
  floating = true
}: EnhancedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(value.length > 0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setHasValue(textareaRef.current?.value.length > 0 || false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setHasValue(newValue.length > 0)
    onChange?.(newValue)
  }

  const isFloating = floating && (isFocused || hasValue)

  return (
    <div className={cn("relative", className)}>
      {/* Textarea container */}
      <div className="relative">
        {/* Textarea field */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={floating ? "" : placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          className={cn(
            "w-full px-4 py-3 bg-[#1A1A1A] border border-[#262626] rounded-lg",
            "text-white placeholder-gray-500 transition-all duration-200 resize-none",
            "focus:outline-none focus:border-[#40d0f2] focus:ring-1 focus:ring-[#40d0f2]",
            "hover:border-[#404040] disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        />

        {/* Floating label */}
        {floating && label && (
          <label
            className={cn(
              "absolute left-4 transition-all duration-200 pointer-events-none",
              isFloating
                ? "top-2 text-xs text-[#40d0f2]"
                : "top-4 text-gray-400"
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Focus indicator */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-200 pointer-events-none",
            isFocused && "border-[#40d0f2] shadow-[0_0_0_1px_rgba(64,208,242,0.2)]"
          )}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}

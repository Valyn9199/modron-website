import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Resend API types
export interface ResendEmailOptions {
  from: string
  to: string[]
  subject: string
  html: string
  replyTo?: string
}

export interface ResendResponse {
  data?: unknown
  error?: unknown
}

export interface ResendClient {
  emails: {
    send: (options: ResendEmailOptions) => Promise<ResendResponse>
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { ResendClient } from '@/lib/utils'

// Only import Resend if API key is available
let resend: ResendClient | null = null
if (process.env.RESEND_API_KEY) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Resend } = require('resend')
    resend = new Resend(process.env.RESEND_API_KEY)
  } catch (error) {
    console.warn('Resend not available:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { 
      name, 
      email, 
      company, 
      phone, 
      message 
    } = body
    
    // Check required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, email, and message are required' 
        },
        { status: 400 }
      )
    }
    
    // Validate name length
    if (name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name must be between 2 and 100 characters' 
        },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please enter a valid email address' 
        },
        { status: 400 }
      )
    }
    
    // Validate message length
    if (message.trim().length < 10 || message.trim().length > 1000) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message must be between 10 and 1000 characters' 
        },
        { status: 400 }
      )
    }
    
    // Validate phone number if provided
    if (phone && phone.trim()) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
      if (!phoneRegex.test(phone.trim())) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Please enter a valid phone number' 
          },
          { status: 400 }
        )
      }
    }
    
    // Validate company name if provided
    if (company && company.trim().length > 100) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Company name must be less than 100 characters' 
        },
        { status: 400 }
      )
    }
    
    // If Resend is not available, just log the booking and return success
    if (!resend) {
      console.log('Booking request received (email service not configured):', {
        name,
        email,
        company,
        phone,
        message,
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json({
        success: true,
        message: 'Booking request submitted successfully (email service not configured)'
      })
    }
    
    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'MODRON Booking <noreply@modron.com>',
        to: [process.env.BOOKING_EMAIL || 'contact@modron.com'],
        subject: `New Consultation Booking: ${name}${company ? ` from ${company}` : ''}`,
        html: `
          <h2>New Consultation Booking Request</h2>
          
          <h3>Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          
          <h3>Project Description</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
          
          <hr>
          <p><em>This booking request was submitted from the MODRON website on ${new Date().toLocaleString()}</em></p>
        `,
        replyTo: email
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to send booking email. Please try again later.' 
          },
          { status: 500 }
        )
      }

      console.log('Booking email sent successfully:', data)
      
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send booking email. Please try again later.' 
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully'
    })
    
  } catch (error) {
    console.error('Booking form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    )
  }
}


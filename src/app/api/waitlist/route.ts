import { NextRequest, NextResponse } from 'next/server'

// Only import Resend if API key is available
let resend: { emails: { send: (options: any) => Promise<any> } } | null = null
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
    const { email } = body
    
    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email is required' 
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
          error: 'Invalid email format' 
        },
        { status: 400 }
      )
    }
    
    // If Resend is not available, just log the waitlist signup and return success
    if (!resend) {
      console.log('Waitlist signup received (email service not configured):', {
        email,
        timestamp: new Date().toISOString()
      })
      
      return NextResponse.json({
        success: true,
        message: 'Successfully joined waitlist (email service not configured)'
      })
    }
    
    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'MODRON Waitlist <noreply@modron.com>',
        to: [process.env.WAITLIST_EMAIL || 'contact@modron.com'],
        subject: `New Waitlist Signup: ${email}`,
        html: `
          <h2>New Waitlist Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p><em>This person has joined the MODRON waitlist and should be notified when the platform launches.</em></p>
        `,
        replyTo: email
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to send waitlist notification' 
          },
          { status: 500 }
        )
      }

      console.log('Waitlist email sent successfully:', data)
      
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the request if email fails, just log it
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist'
    })
    
  } catch (error) {
    console.error('Waitlist form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

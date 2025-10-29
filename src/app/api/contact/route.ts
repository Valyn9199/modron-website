import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, message, company } = body
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name, email, and message are required' 
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
    
    // Try to send email using Resend if API key is available
    if (process.env.RESEND_API_KEY) {
      try {
        // Dynamic import to avoid build issues
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        const { data, error } = await resend.emails.send({
          from: process.env.FROM_EMAIL || 'Modron Contact Form <noreply@yourdomain.com>',
          to: [process.env.CONTACT_EMAIL || 'contact@modron.com'],
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <img src="https://www.modron.com/MODRON_ICON.png" alt="MODRON" style="width: 60px; height: 60px; border-radius: 8px;">
                <h1 style="color: #40d0f2; margin: 10px 0; font-size: 24px;">MODRON</h1>
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #40d0f2;">
                <h2 style="color: #333; margin-top: 0;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
                <p>This message was sent from the MODRON website contact form.</p>
                <p>Reply directly to this email to respond to ${name}.</p>
              </div>
            </div>
          `,
          text: `
MODRON - New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Message:
${message}

---
This message was sent from the MODRON website contact form.
Reply directly to this email to respond to ${name}.
          `,
          replyTo: email
        })

        if (error) {
          console.error('Resend error:', error)
          // Don't fail the request if email fails, just log it
        } else {
          console.log('Email sent successfully:', data)
        }
        
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        // Don't fail the request if email fails, just log it
      }
    } else {
      console.log('Contact form submission received (email service not configured):', {
        name,
        email,
        company,
        message,
        timestamp: new Date().toISOString()
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    })
    
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

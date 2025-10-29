import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, email, message, company, userDetails } = body
    
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

    // Extract server-side user details
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               request.headers.get('cf-connecting-ip') ||
               'Unknown'
    
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const referer = request.headers.get('referer') || 'Direct'
    const timestamp = new Date().toISOString()
    
    // Parse user agent for device info
    const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
    const isTablet = /iPad|Android(?=.*Mobile)/i.test(userAgent)
    const browser = userAgent.includes('Chrome') ? 'Chrome' :
                   userAgent.includes('Firefox') ? 'Firefox' :
                   userAgent.includes('Safari') ? 'Safari' :
                   userAgent.includes('Edge') ? 'Edge' : 'Other'
    
    const deviceType = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop'
    
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
                <img src="https://www.modron.com/MODRON_ICON.png" alt="MODRON" style="width: 60px; height: 60px; border-radius: 8px; margin-bottom: 10px;">
              </div>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #40d0f2;">
                <h2 style="color: #333; margin-top: 0;">New Contact Form Submission</h2>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                  <div>
                    <h3 style="color: #40d0f2; margin: 0 0 10px 0; font-size: 16px;">Contact Details</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                  </div>
                  
                  <div>
                    <h3 style="color: #40d0f2; margin: 0 0 10px 0; font-size: 16px;">Technical Details</h3>
                    <p><strong>Device:</strong> ${deviceType}</p>
                    <p><strong>Browser:</strong> ${browser}</p>
                    <p><strong>IP Address:</strong> ${ip}</p>
                    <p><strong>Referrer:</strong> ${referer}</p>
                    <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
                  </div>
                </div>
                
                <h3 style="color: #40d0f2; margin: 0 0 10px 0; font-size: 16px;">Message</h3>
                <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px; color: #666; font-size: 14px;">
                <p>This message was sent from the MODRON website contact form.</p>
                <p>Reply directly to this email to respond to ${email}.</p>
              </div>
            </div>
          `,
          text: `
MODRON - New Contact Form Submission

CONTACT DETAILS:
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

TECHNICAL DETAILS:
Device: ${deviceType}
Browser: ${browser}
IP Address: ${ip}
Referrer: ${referer}
Timestamp: ${new Date(timestamp).toLocaleString()}

MESSAGE:
${message}

---
This message was sent from the MODRON website contact form.
Reply directly to this email to respond to ${email}.
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
        timestamp,
        ip,
        userAgent,
        referer,
        deviceType,
        browser
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

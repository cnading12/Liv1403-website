import { supabaseAdmin } from '../../../../lib/supabase'
import { resend, FROM_EMAIL, MANAGER_EMAIL } from '../../../../lib/resend'

// Email template for buyer application confirmation
const buyerConfirmationEmail = (application) => ({
  subject: 'Buyer Portal Application Received - Liv 1403',
  html: `
    <h2>Thank you for your interest in Liv 1403!</h2>
    <p>Dear ${application.full_name},</p>
    <p>We have received your buyer portal application. Our team will review your information and contact you within 1-2 business days.</p>
    <h3>Your Application Details:</h3>
    <ul>
      <li><strong>Name:</strong> ${application.full_name}</li>
      <li><strong>Email:</strong> ${application.email}</li>
      <li><strong>Phone:</strong> ${application.phone}</li>
      <li><strong>Interested Units:</strong> ${application.interested_units || 'Not specified'}</li>
    </ul>
    <p>If you have any questions, please contact Lance Nading at lance.nading@liv1403.com or 720-359-8337.</p>
    <p>Best regards,<br>The Liv 1403 Team</p>
  `,
  text: `Thank you for your interest in Liv 1403!\n\nWe have received your buyer portal application and will contact you within 1-2 business days.\n\nBest regards,\nThe Liv 1403 Team`
});

// Email template for manager notification
const buyerManagerNotificationEmail = (application) => ({
  subject: `New Buyer Portal Application - ${application.full_name}`,
  html: `
    <h2>New Buyer Portal Application Received</h2>
    <h3>Applicant Information:</h3>
    <ul>
      <li><strong>Name:</strong> ${application.full_name}</li>
      <li><strong>Email:</strong> ${application.email}</li>
      <li><strong>Phone:</strong> ${application.phone}</li>
      <li><strong>Interested Units:</strong> ${application.interested_units || 'Not specified'}</li>
      <li><strong>Pre-qualified:</strong> ${application.pre_qualified ? 'Yes' : 'No'}</li>
      ${application.message ? `<li><strong>Message:</strong> ${application.message}</li>` : ''}
    </ul>
    <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/investor">Review in Admin Panel</a></p>
  `,
  text: `New Buyer Portal Application\n\nName: ${application.full_name}\nEmail: ${application.email}\nPhone: ${application.phone}\nInterested Units: ${application.interested_units || 'Not specified'}\nPre-qualified: ${application.pre_qualified ? 'Yes' : 'No'}`
});

// POST /api/applications/buyer - Submit a new buyer application
export async function POST(request) {
  try {
    const applicationData = await request.json()

    // Validate required fields
    const requiredFields = ['full_name', 'email', 'phone']
    for (const field of requiredFields) {
      if (!applicationData[field]) {
        return Response.json({ 
          error: `Missing required field: ${field}` 
        }, { status: 400 })
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(applicationData.email)) {
      return Response.json({ 
        error: 'Invalid email format' 
      }, { status: 400 })
    }

    // Validate phone format (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(applicationData.phone)) {
      return Response.json({ 
        error: 'Invalid phone format' 
      }, { status: 400 })
    }

    // Check if email already has a pending or approved application
    const { data: existingApplication } = await supabaseAdmin
      .from('buyer_applications')
      .select('id, status')
      .eq('email', applicationData.email.toLowerCase())
      .in('status', ['pending', 'approved'])
      .single()

    if (existingApplication) {
      if (existingApplication.status === 'approved') {
        return Response.json({ 
          error: 'An approved application already exists for this email. Please check your email for login credentials or contact us for assistance.' 
        }, { status: 400 })
      } else {
        return Response.json({ 
          error: 'An application with this email is already pending review. We will contact you soon.' 
        }, { status: 400 })
      }
    }

    // Create application
    const { data: newApplication, error: createError } = await supabaseAdmin
      .from('buyer_applications')
      .insert({
        full_name: applicationData.full_name,
        email: applicationData.email.toLowerCase(),
        phone: applicationData.phone,
        interested_units: applicationData.interested_units || null,
        pre_qualified: applicationData.pre_qualified || false,
        message: applicationData.message || null,
        status: 'pending'
      })
      .select('*')
      .single()

    if (createError) {
      console.error('Create buyer application error:', createError)
      return Response.json({ 
        error: 'Failed to submit application. Please try again.' 
      }, { status: 500 })
    }

    // Send confirmation email to applicant
    try {
      const confirmationEmail = buyerConfirmationEmail(newApplication)
      
      await resend.emails.send({
        from: FROM_EMAIL,
        to: newApplication.email,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html,
        text: confirmationEmail.text
      })
      
      console.log('✅ Confirmation email sent to buyer applicant:', newApplication.email)
    } catch (emailError) {
      console.error('❌ Error sending confirmation email:', emailError)
      // Don't fail the whole request if email fails
    }

    // Send notification email to manager
    try {
      const notificationEmail = buyerManagerNotificationEmail(newApplication)
      
      await resend.emails.send({
        from: FROM_EMAIL,
        to: MANAGER_EMAIL,
        subject: notificationEmail.subject,
        html: notificationEmail.html,
        text: notificationEmail.text
      })
      
      console.log('✅ Notification email sent to manager:', MANAGER_EMAIL)
    } catch (emailError) {
      console.error('❌ Error sending notification email:', emailError)
      // Don't fail the whole request if email fails
    }
    
    console.log('New buyer application submitted:', {
      id: newApplication.id,
      email: newApplication.email,
      name: newApplication.full_name
    })

    return Response.json({ 
      success: true,
      message: 'Application submitted successfully! Check your email for confirmation. Our team will review your application and contact you within 1-2 business days.',
      application_id: newApplication.id
    })

  } catch (error) {
    console.error('Submit buyer application error:', error)
    return Response.json({ 
      error: 'Internal server error. Please try again later.' 
    }, { status: 500 })
  }
}
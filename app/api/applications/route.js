import { supabaseAdmin } from '../../../lib/supabase'
import { resend, FROM_EMAIL, MANAGER_EMAIL } from '../../../lib/resend'
import { applicantConfirmationEmail, managerNotificationEmail } from '../../../lib/email-templates'

// POST /api/applications - Submit a new investor application
export async function POST(request) {
  try {
    const applicationData = await request.json()

    // Validate required fields
    const requiredFields = ['full_name', 'email', 'phone', 'investment_amount', 'accredited_investor']
    for (const field of requiredFields) {
      if (!applicationData[field] && applicationData[field] !== false) {
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
      .from('investor_applications')
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
      .from('investor_applications')
      .insert({
        full_name: applicationData.full_name,
        email: applicationData.email.toLowerCase(),
        phone: applicationData.phone,
        company_name: applicationData.company_name || null,
        investment_amount: applicationData.investment_amount,
        accredited_investor: applicationData.accredited_investor,
        entity_type: applicationData.entity_type || null,
        referral_source: applicationData.referral_source || null,
        message: applicationData.message || null,
        status: 'pending'
      })
      .select('*')
      .single()

    if (createError) {
      console.error('Create application error:', createError)
      return Response.json({ 
        error: 'Failed to submit application. Please try again.' 
      }, { status: 500 })
    }

    // Send confirmation email to applicant
    try {
      const confirmationEmail = applicantConfirmationEmail(newApplication)
      
      await resend.emails.send({
        from: FROM_EMAIL,
        to: newApplication.email,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html,
        text: confirmationEmail.text
      })
      
      console.log('✅ Confirmation email sent to applicant:', newApplication.email)
    } catch (emailError) {
      console.error('❌ Error sending confirmation email:', emailError)
      // Don't fail the whole request if email fails
    }

    // Send notification email to manager
    try {
      const notificationEmail = managerNotificationEmail(newApplication)
      
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
    
    console.log('New application submitted:', {
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
    console.error('Submit application error:', error)
    return Response.json({ 
      error: 'Internal server error. Please try again later.' 
    }, { status: 500 })
  }
}
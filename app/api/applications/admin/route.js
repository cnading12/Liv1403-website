import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/lib/supabase' 
// Helper function to verify JWT and get user
async function verifyAuth(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Missing or invalid authorization header', status: 401 }
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Get current user to verify they're admin
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', decoded.userId)
      .eq('status', 'active')
      .single()

    if (error || !user) {
      return { error: 'User not found', status: 401 }
    }

    if (user.role !== 'admin') {
      return { error: 'Admin access required', status: 403 }
    }

    return { user }
  } catch (error) {
    return { error: 'Invalid token', status: 401 }
  }
}

// GET /api/applications/admin - Get all applications (admin only)
export async function GET(request) {
  try {
    const auth = await verifyAuth(request)
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const url = new URL(request.url)
    const status = url.searchParams.get('status')

    let query = supabaseAdmin
      .from('investor_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (status && ['pending', 'approved', 'rejected', 'contacted'].includes(status)) {
      query = query.eq('status', status)
    }

    const { data: applications, error } = await query

    if (error) {
      console.error('Get applications error:', error)
      return Response.json({ error: 'Failed to fetch applications' }, { status: 500 })
    }

    return Response.json({ applications })

  } catch (error) {
    console.error('Get applications error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/applications/admin - Update application status (admin only)
export async function PATCH(request) {
  try {
    const auth = await verifyAuth(request)
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const { application_id, status, admin_notes, create_user } = await request.json()

    if (!application_id) {
      return Response.json({ error: 'Application ID is required' }, { status: 400 })
    }

    if (status && !['pending', 'approved', 'rejected', 'contacted'].includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 })
    }

    // Get the application
    const { data: application, error: getError } = await supabaseAdmin
      .from('investor_applications')
      .select('*')
      .eq('id', application_id)
      .single()

    if (getError || !application) {
      return Response.json({ error: 'Application not found' }, { status: 404 })
    }

    const updateData = {}
    
    if (status) {
      updateData.status = status
      updateData.reviewed_by = auth.user.id
      updateData.reviewed_at = new Date().toISOString()
    }
    
    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes
    }

    // Variable to store temp password for response
    let tempPassword = null

    // If approving and creating user
    if (create_user && status === 'approved') {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('email')
        .eq('email', application.email)
        .single()

      if (existingUser) {
        return Response.json({ 
          error: 'A user with this email already exists' 
        }, { status: 400 })
      }

      // Generate random password
      const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
        let password = ''
        for (let i = 0; i < 12; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return password
      }

      tempPassword = generatePassword()
      const passwordHash = await bcrypt.hash(tempPassword, 12)

      // Create user
      const { data: newUser, error: userError } = await supabaseAdmin
        .from('users')
        .insert({
          email: application.email,
          name: application.full_name,
          password_hash: passwordHash,
          role: 'investor',
          status: 'active'
        })
        .select('id, email, name')
        .single()

      if (userError) {
        console.error('Create user error:', userError)
        return Response.json({ 
          error: 'Failed to create user account' 
        }, { status: 500 })
      }

      // Log audit
      await supabaseAdmin
        .from('admin_audit_log')
        .insert({
          admin_id: auth.user.id,
          action: 'user_created_from_application',
          target_user_id: newUser.id,
          details: { 
            application_id: application.id,
            email: newUser.email 
          }
        })

      // TODO: Send email with credentials to the new investor
      console.log('User created from application:', {
        user_id: newUser.id,
        email: newUser.email,
        temp_password: tempPassword // In production, this would be emailed
      })
    }

    // Update application (don't include temp_password in database update)
    const { data: updatedApplication, error: updateError } = await supabaseAdmin
      .from('investor_applications')
      .update(updateData)
      .eq('id', application_id)
      .select('*')
      .single()

    if (updateError) {
      console.error('Update application error:', updateError)
      return Response.json({ 
        error: 'Failed to update application' 
      }, { status: 500 })
    }

    // Log audit
    await supabaseAdmin
      .from('application_audit_log')
      .insert({
        admin_id: auth.user.id,
        application_id: application_id,
        action: status ? 'status_updated' : 'notes_updated',
        details: { 
          old_status: application.status,
          new_status: status || application.status,
          notes: admin_notes,
          user_created: !!create_user
        }
      })

    const response = {
      success: true,
      application: updatedApplication,
      message: 'Application updated successfully'
    }

    // Include temporary password if user was created
    if (tempPassword) {
      response.temp_password = tempPassword
      response.message = 'Application approved and user account created successfully'
    }

    return Response.json(response)

  } catch (error) {
    console.error('Update application error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/applications/admin - Delete application (admin only)
export async function DELETE(request) {
  try {
    const auth = await verifyAuth(request)
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const url = new URL(request.url)
    const application_id = url.searchParams.get('id')

    if (!application_id) {
      return Response.json({ error: 'Application ID is required' }, { status: 400 })
    }

    // Get application info before deletion
    const { data: application, error: getError } = await supabaseAdmin
      .from('investor_applications')
      .select('*')
      .eq('id', application_id)
      .single()

    if (getError || !application) {
      return Response.json({ error: 'Application not found' }, { status: 404 })
    }

    // Delete application
    const { error: deleteError } = await supabaseAdmin
      .from('investor_applications')
      .delete()
      .eq('id', application_id)

    if (deleteError) {
      console.error('Delete application error:', deleteError)
      return Response.json({ 
        error: 'Failed to delete application' 
      }, { status: 500 })
    }

    // Log audit
    await supabaseAdmin
      .from('application_audit_log')
      .insert({
        admin_id: auth.user.id,
        application_id: null,
        action: 'application_deleted',
        details: { 
          deleted_application: {
            email: application.email,
            name: application.full_name,
            status: application.status
          }
        }
      })

    return Response.json({ 
      success: true,
      message: 'Application deleted successfully' 
    })

  } catch (error) {
    console.error('Delete application error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
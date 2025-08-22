import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../../../lib/supabase'

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

// PATCH /api/users/[id] - Update user (admin only)
export async function PATCH(request, { params }) {
  try {
    const auth = await verifyAuth(request)
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const { id } = params
    const updates = await request.json()

    // Validate updates
    const allowedUpdates = ['name', 'email', 'role', 'status']
    const updateData = {}
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowedUpdates.includes(key)) {
        if (key === 'email') {
          updateData[key] = value.toLowerCase()
        } else if (key === 'role' && !['investor', 'admin'].includes(value)) {
          return Response.json({ error: 'Invalid role' }, { status: 400 })
        } else if (key === 'status' && !['active', 'inactive'].includes(value)) {
          return Response.json({ error: 'Invalid status' }, { status: 400 })
        } else {
          updateData[key] = value
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return Response.json({ error: 'No valid updates provided' }, { status: 400 })
    }

    // Prevent admin from deactivating themselves
    if (updateData.status === 'inactive' && id === auth.user.id) {
      return Response.json({ error: 'Cannot deactivate your own account' }, { status: 400 })
    }

    // Check if email is being changed and if it already exists
    if (updateData.email) {
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', updateData.email)
        .neq('id', id)
        .single()

      if (existingUser) {
        return Response.json({ error: 'Email already exists' }, { status: 400 })
      }
    }

    updateData.updated_at = new Date().toISOString()

    // Update user
    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select('id, email, name, role, status, created_at, updated_at, last_login')
      .single()

    if (updateError) {
      console.error('Update user error:', updateError)
      return Response.json({ error: 'Failed to update user' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_audit_log')
      .insert({
        admin_id: auth.user.id,
        action: 'user_updated',
        target_user_id: id,
        details: updateData
      })

    return Response.json({ 
      success: true, 
      user: updatedUser,
      message: 'User updated successfully' 
    })

  } catch (error) {
    console.error('Update user error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/users/[id] - Delete user (admin only)
export async function DELETE(request, { params }) {
  try {
    const auth = await verifyAuth(request)
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const { id } = params

    // Prevent admin from deleting themselves
    if (id === auth.user.id) {
      return Response.json({ error: 'Cannot delete your own account' }, { status: 400 })
    }

    // Get user info before deletion for audit log
    const { data: userToDelete, error: getUserError } = await supabaseAdmin
      .from('users')
      .select('email, name, role')
      .eq('id', id)
      .single()

    if (getUserError || !userToDelete) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    // Delete user (this will cascade delete related records due to foreign key constraints)
    const { error: deleteError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Delete user error:', deleteError)
      return Response.json({ error: 'Failed to delete user' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_audit_log')
      .insert({
        admin_id: auth.user.id,
        action: 'user_deleted',
        target_user_id: id,
        details: { 
          deleted_user: {
            email: userToDelete.email,
            name: userToDelete.name,
            role: userToDelete.role
          }
        }
      })

    return Response.json({ 
      success: true,
      message: 'User deleted successfully' 
    })

  } catch (error) {
    console.error('Delete user error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
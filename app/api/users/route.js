import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../../lib/supabase'

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

// GET /api/users - Get all users (admin only)
export async function GET(request) {
  try {
    const auth = await verifyAuth(request)
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, role, status, created_at, last_login')
      .order('created_at', { ascending: false })

    if (error) {
      return Response.json({ error: 'Failed to fetch users' }, { status: 500 })
    }

    return Response.json({ users })

  } catch (error) {
    console.error('Get users error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/users - Create new user (admin only)
export async function POST(request) {
  try {
    const auth = await verifyAuth(request)
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const { email, name, role, password } = await request.json()

    if (!email || !name || !role || !password) {
      return Response.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (!['investor', 'admin', 'buyer'].includes(role)) {
      return Response.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Check if email already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('email')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      return Response.json({ error: 'Email already exists' }, { status: 400 })
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user
    const { data: newUser, error: createError } = await supabaseAdmin
      .from('users')
      .insert({
        email: email.toLowerCase(),
        name,
        role,
        password_hash: passwordHash,
        status: 'active'
      })
      .select('id, email, name, role, status, created_at')
      .single()

    if (createError) {
      console.error('Create user error:', createError)
      return Response.json({ error: 'Failed to create user' }, { status: 500 })
    }

    // Log admin action
    await supabaseAdmin
      .from('admin_audit_log')
      .insert({
        admin_id: auth.user.id,
        action: 'user_created',
        target_user_id: newUser.id,
        details: { email: newUser.email, name: newUser.name, role: newUser.role }
      })

    return Response.json({ 
      success: true, 
      user: newUser,
      message: 'User created successfully' 
    })

  } catch (error) {
    console.error('Create user error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
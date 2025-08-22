import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '../../../../lib/supabase'

// Named export for POST method
export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 })
    }

    console.log('Login attempt for:', email)

    // Find user by email
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('status', 'active')
      .single()

    if (userError || !user) {
      console.error('User lookup error:', userError)
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    console.log('User found:', user.email)

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password_hash)
    
    if (!passwordMatch) {
      console.log('Password mismatch')
      return Response.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    console.log('Password matches')

    // Update last login
    await supabaseAdmin
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id)

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Remove password hash from response
    const { password_hash, ...userWithoutPassword } = user

    console.log('Login successful for:', user.email)

    return Response.json({
      success: true,
      user: userWithoutPassword,
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
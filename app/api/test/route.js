import { supabaseAdmin } from '../../../lib/supabase'

export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('email, name, role')
      .limit(1)

    if (error) {
      console.error('Database error:', error)
      return Response.json({ error: 'Database connection failed', details: error.message }, { status: 500 })
    }

    return Response.json({ 
      message: 'Database connected successfully!',
      users: data,
      hasJwtSecret: !!process.env.JWT_SECRET
    })

  } catch (error) {
    console.error('Test error:', error)
    return Response.json({ error: 'Test failed', details: error.message }, { status: 500 })
  }
}
// scripts/create-admin.js
// Run this script ONCE to create your first admin user
// Usage: node scripts/create-admin.js

import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdminUser() {
  try {
    console.log('🔐 Creating admin user...')

    // Admin user details (CHANGE THESE!)
    const adminData = {
      email: 'merrittfitnessmanager@gmail.com',
      password: 'Liv1403CNLN', // CHANGE THIS PASSWORD!
      name: 'Father Son Duo'
    }

    // Check if admin already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', adminData.email)
      .single()

    if (existingUser) {
      console.log('✅ Admin user already exists!')
      console.log('📧 Email:', adminData.email)
      console.log('🔑 You can log in with your existing password')
      return
    }

    // Hash the password
    console.log('🔒 Hashing password...')
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(adminData.password, saltRounds)

    // Create admin user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert({
        email: adminData.email,
        password_hash: passwordHash,
        name: adminData.name,
        role: 'admin',
        status: 'active'
      })
      .select('id, email, name, role')
      .single()

    if (error) {
      console.error('❌ Error creating admin user:', error.message)
      process.exit(1)
    }

    console.log('🎉 Admin user created successfully!')
    console.log('📧 Email:', newUser.email)
    console.log('🔑 Password:', adminData.password)
    console.log('👤 Name:', newUser.name)
    console.log('🛡️  Role:', newUser.role)
    console.log('')
    console.log('⚠️  IMPORTANT: Change your password after first login!')
    console.log('🌐 You can now log in to your investor portal')

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    process.exit(1)
  }
}

// Run the script
createAdminUser()
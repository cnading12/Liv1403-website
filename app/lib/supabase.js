import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client for frontend (browser)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for backend operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types for TypeScript (optional but helpful)
export const DOCUMENT_TYPES = {
  NDA: 'nda',
  MEMORANDUM: 'memorandum', 
  SUBSCRIPTION: 'subscription',
  OPERATING: 'operating'
}

export const DOCUMENT_STATUS = {
  PENDING: 'pending',
  VIEWED: 'viewed',
  SIGNED: 'signed',
  COMPLETED: 'completed'
}

export const USER_ROLES = {
  INVESTOR: 'investor',
  ADMIN: 'admin'
}

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
}
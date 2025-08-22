import jwt from 'jsonwebtoken'
import { supabaseAdmin, DOCUMENT_TYPES, DOCUMENT_STATUS } from '../../../lib/supabase'

// Helper function to verify JWT and get user
async function verifyAuth(request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { error: 'Missing or invalid authorization header', status: 401 }
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Get current user
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', decoded.userId)
      .eq('status', 'active')
      .single()

    if (error || !user) {
      return { error: 'User not found', status: 401 }
    }

    return { user }
  } catch (error) {
    return { error: 'Invalid token', status: 401 }
  }
}

// GET /api/documents - Get user's document status
export async function GET(request) {
  try {
    const auth = await verifyAuth(request)
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const { data: documents, error } = await supabaseAdmin
      .from('user_documents')
      .select('*')
      .eq('user_id', auth.user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Get documents error:', error)
      return Response.json({ error: 'Failed to fetch documents' }, { status: 500 })
    }

    // Ensure all required document types exist for user
    const existingTypes = documents.map(doc => doc.document_type)
    const requiredTypes = Object.values(DOCUMENT_TYPES)
    
    const missingDocuments = []
    for (const docType of requiredTypes) {
      if (!existingTypes.includes(docType)) {
        missingDocuments.push({
          user_id: auth.user.id,
          document_type: docType,
          status: DOCUMENT_STATUS.PENDING
        })
      }
    }

    // Create missing document records
    if (missingDocuments.length > 0) {
      const { data: newDocs, error: createError } = await supabaseAdmin
        .from('user_documents')
        .insert(missingDocuments)
        .select('*')

      if (createError) {
        console.error('Create missing documents error:', createError)
      } else {
        documents.push(...newDocs)
      }
    }

    return Response.json({ documents })

  } catch (error) {
    console.error('Get documents error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/documents - Update document status
export async function PATCH(request) {
  try {
    const auth = await verifyAuth(request)
    if (auth.error) {
      return Response.json({ error: auth.error }, { status: auth.status })
    }

    const { document_type, status, action } = await request.json()

    if (!document_type || !Object.values(DOCUMENT_TYPES).includes(document_type)) {
      return Response.json({ error: 'Invalid document type' }, { status: 400 })
    }

    if (!status || !Object.values(DOCUMENT_STATUS).includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 })
    }

    const updateData = {
      status,
      updated_at: new Date().toISOString()
    }

    // Set timestamp based on action
    if (action === 'viewed' && status === DOCUMENT_STATUS.VIEWED) {
      updateData.viewed_at = new Date().toISOString()
    } else if (action === 'signed' && status === DOCUMENT_STATUS.SIGNED) {
      updateData.signed_at = new Date().toISOString()
      if (!updateData.viewed_at) {
        updateData.viewed_at = new Date().toISOString()
      }
    }

    // Update or create document record
    const { data: existingDoc } = await supabaseAdmin
      .from('user_documents')
      .select('id')
      .eq('user_id', auth.user.id)
      .eq('document_type', document_type)
      .single()

    let result
    if (existingDoc) {
      // Update existing document
      const { data, error } = await supabaseAdmin
        .from('user_documents')
        .update(updateData)
        .eq('id', existingDoc.id)
        .select('*')
        .single()
      
      result = { data, error }
    } else {
      // Create new document record
      const { data, error } = await supabaseAdmin
        .from('user_documents')
        .insert({
          user_id: auth.user.id,
          document_type,
          ...updateData
        })
        .select('*')
        .single()
      
      result = { data, error }
    }

    if (result.error) {
      console.error('Update document error:', result.error)
      return Response.json({ error: 'Failed to update document status' }, { status: 500 })
    }

    return Response.json({ 
      success: true, 
      document: result.data,
      message: 'Document status updated successfully' 
    })

  } catch (error) {
    console.error('Update document error:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
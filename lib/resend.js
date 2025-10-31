import { Resend } from 'resend';

// Initialize Resend client
export const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender email (must be verified in Resend)
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'manager@liv1403.com';

// Manager email for notifications
export const MANAGER_EMAIL = 'manager@liv1403.com';
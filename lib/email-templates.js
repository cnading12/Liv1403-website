// Email templates for investor application notifications

export const applicantConfirmationEmail = (applicantData) => {
  const { full_name, investment_amount, entity_type } = applicantData;
  
  return {
    subject: 'Liv1403 - Application Received',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Received</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">Liv1403</h1>
                      <p style="color: #d1d5db; margin: 8px 0 0 0; font-size: 14px;">1403 South Pearl Street, Denver</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <div style="text-align: center; margin-bottom: 30px;">
                        <div style="display: inline-block; width: 64px; height: 64px; background-color: #10b981; border-radius: 50%; margin-bottom: 20px;">
                          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 32L28 40L44 24" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      
                      <h2 style="color: #111827; margin: 0 0 16px 0; font-size: 24px; font-weight: bold; text-align: center;">Application Received</h2>
                      
                      <p style="color: #4b5563; margin: 0 0 24px 0; font-size: 16px; line-height: 24px;">
                        Dear ${full_name},
                      </p>
                      
                      <p style="color: #4b5563; margin: 0 0 24px 0; font-size: 16px; line-height: 24px;">
                        Thank you for your interest in the Liv1403 investment opportunity. We have successfully received your application and our team will review it carefully.
                      </p>
                      
                      <!-- Application Summary -->
                      <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                        <h3 style="color: #111827; margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Application Summary</h3>
                        <table width="100%" cellpadding="8" cellspacing="0">
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 8px 0;">Investment Amount:</td>
                            <td style="color: #111827; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0;">${investment_amount}</td>
                          </tr>
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 8px 0; border-top: 1px solid #e5e7eb;">Entity Type:</td>
                            <td style="color: #111827; font-size: 14px; font-weight: 600; text-align: right; padding: 8px 0; border-top: 1px solid #e5e7eb; text-transform: capitalize;">${entity_type}</td>
                          </tr>
                        </table>
                      </div>
                      
                      <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                        <p style="color: #1e40af; margin: 0; font-size: 14px; line-height: 20px;">
                          <strong>Next Steps:</strong> Our team will review your application within 1-2 business days. You will receive an email with further instructions and access credentials if your application is approved.
                        </p>
                      </div>
                      
                      <p style="color: #4b5563; margin: 0 0 24px 0; font-size: 16px; line-height: 24px;">
                        If you have any questions in the meantime, please don't hesitate to contact Lance Nading directly:
                      </p>
                      
                      <div style="text-align: center; margin-bottom: 24px;">
                        <a href="tel:+13033598337" style="display: inline-block; background-color: #d97706; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 16px; margin: 0 8px 8px 0;">
                          📞 Call 303-359-8337
                        </a>
                        <a href="mailto:lance.nading@c3hdenver.com" style="display: inline-block; background-color: #6b7280; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; font-size: 16px; margin: 0 0 8px 8px;">
                          ✉️ Email Lance
                        </a>
                      </div>
                      
                      <p style="color: #6b7280; margin: 24px 0 0 0; font-size: 14px; line-height: 20px; text-align: center;">
                        Thank you for considering Liv1403 for your investment portfolio.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 12px;">
                        Liv1403 - 1403 South Pearl Street, Denver, CO
                      </p>
                      <p style="color: #9ca3af; margin: 0; font-size: 11px;">
                        This email contains confidential investment information. Do not forward without permission.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `
Liv1403 - Application Received

Dear ${full_name},

Thank you for your interest in the Liv1403 investment opportunity. We have successfully received your application and our team will review it carefully.

Application Summary:
- Investment Amount: ${investment_amount}
- Entity Type: ${entity_type}

Next Steps:
Our team will review your application within 1-2 business days. You will receive an email with further instructions and access credentials if your application is approved.

If you have any questions in the meantime, please contact:
Lance Nading
Phone: 303-359-8337
Email: lance.nading@c3hdenver.com

Thank you for considering Liv1403 for your investment portfolio.

---
Liv1403 - 1403 South Pearl Street, Denver, CO
This email contains confidential investment information.
    `
  };
};

export const managerNotificationEmail = (applicantData) => {
  const {
    full_name,
    email,
    phone,
    company_name,
    investment_amount,
    accredited_investor,
    entity_type,
    referral_source,
    message,
    id,
    created_at
  } = applicantData;
  
  return {
    subject: `🔔 New Investor Application - ${full_name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Application Notification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
            <tr>
              <td align="center">
                <table width="650" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0 0 8px 0; font-size: 28px; font-weight: bold;">🔔 New Application Alert</h1>
                      <p style="color: #fecaca; margin: 0; font-size: 14px;">Liv1403 Investor Portal</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #111827; margin: 0 0 24px 0; font-size: 18px; font-weight: 600;">
                        Hi Lance,
                      </p>
                      
                      <p style="color: #4b5563; margin: 0 0 24px 0; font-size: 16px; line-height: 24px;">
                        A new investor application has been submitted for Liv1403. Please review the details below and take appropriate action.
                      </p>
                      
                      <!-- Applicant Details -->
                      <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #d97706;">
                        <h3 style="color: #111827; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">📋 Applicant Information</h3>
                        
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 10px 0; width: 40%;">Full Name:</td>
                            <td style="color: #111827; font-size: 14px; font-weight: 600; padding: 10px 0;"><strong>${full_name}</strong></td>
                          </tr>
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 10px 0; border-top: 1px solid #e5e7eb;">Email:</td>
                            <td style="padding: 10px 0; border-top: 1px solid #e5e7eb;">
                              <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-size: 14px; font-weight: 600;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 10px 0; border-top: 1px solid #e5e7eb;">Phone:</td>
                            <td style="padding: 10px 0; border-top: 1px solid #e5e7eb;">
                              <a href="tel:${phone}" style="color: #2563eb; text-decoration: none; font-size: 14px; font-weight: 600;">${phone}</a>
                            </td>
                          </tr>
                          ${company_name ? `
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 10px 0; border-top: 1px solid #e5e7eb;">Company:</td>
                            <td style="color: #111827; font-size: 14px; font-weight: 600; padding: 10px 0; border-top: 1px solid #e5e7eb;">${company_name}</td>
                          </tr>
                          ` : ''}
                        </table>
                      </div>
                      
                      <!-- Investment Details -->
                      <div style="background-color: #ecfdf5; border-radius: 8px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #10b981;">
                        <h3 style="color: #111827; margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">💰 Investment Details</h3>
                        
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 10px 0; width: 40%;">Investment Amount:</td>
                            <td style="color: #111827; font-size: 15px; font-weight: 700; padding: 10px 0;">${investment_amount}</td>
                          </tr>
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 10px 0; border-top: 1px solid #d1fae5;">Entity Type:</td>
                            <td style="color: #111827; font-size: 14px; font-weight: 600; padding: 10px 0; border-top: 1px solid #d1fae5; text-transform: capitalize;">${entity_type}</td>
                          </tr>
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 10px 0; border-top: 1px solid #d1fae5;">Accredited Investor:</td>
                            <td style="padding: 10px 0; border-top: 1px solid #d1fae5;">
                              <span style="display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; ${accredited_investor ? 'background-color: #10b981; color: #ffffff;' : 'background-color: #ef4444; color: #ffffff;'}">
                                ${accredited_investor ? '✓ YES' : '✗ NO'}
                              </span>
                            </td>
                          </tr>
                          ${referral_source ? `
                          <tr>
                            <td style="color: #6b7280; font-size: 14px; padding: 10px 0; border-top: 1px solid #d1fae5;">Referral Source:</td>
                            <td style="color: #111827; font-size: 14px; font-weight: 600; padding: 10px 0; border-top: 1px solid #d1fae5;">${referral_source}</td>
                          </tr>
                          ` : ''}
                        </table>
                      </div>
                      
                      ${message ? `
                      <!-- Additional Message -->
                      <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #f59e0b;">
                        <h3 style="color: #111827; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">💬 Applicant Message</h3>
                        <p style="color: #78350f; margin: 0; font-size: 14px; line-height: 22px; white-space: pre-wrap;">${message}</p>
                      </div>
                      ` : ''}
                      
                      <!-- Metadata -->
                      <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin-bottom: 32px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="color: #6b7280; font-size: 13px; padding: 6px 0;">Application ID:</td>
                            <td style="color: #4b5563; font-size: 13px; font-family: monospace; padding: 6px 0; text-align: right;">${id}</td>
                          </tr>
                          <tr>
                            <td style="color: #6b7280; font-size: 13px; padding: 6px 0;">Submitted:</td>
                            <td style="color: #4b5563; font-size: 13px; padding: 6px 0; text-align: right;">${new Date(created_at).toLocaleString('en-US', { 
                              dateStyle: 'medium', 
                              timeStyle: 'short' 
                            })}</td>
                          </tr>
                        </table>
                      </div>
                      
                      <!-- Action Button -->
                      <div style="text-align: center; margin-bottom: 24px;">
                        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/investor" 
                           style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                          🔐 Review in Admin Panel
                        </a>
                      </div>
                      
                      <div style="background-color: #eff6ff; border-radius: 6px; padding: 16px; text-align: center;">
                        <p style="color: #1e40af; margin: 0; font-size: 13px; line-height: 20px;">
                          <strong>⏰ Action Required:</strong> Please review this application within 1-2 business days.
                        </p>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 24px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 12px;">
                        Liv1403 Investor Portal - Automated Notification
                      </p>
                      <p style="color: #9ca3af; margin: 0; font-size: 11px;">
                        This is an automated notification. Please do not reply to this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
    text: `
NEW INVESTOR APPLICATION - LIV1403

Hi Lance,

A new investor application has been submitted. Please review the details below:

APPLICANT INFORMATION
----------------------
Name: ${full_name}
Email: ${email}
Phone: ${phone}
${company_name ? `Company: ${company_name}` : ''}

INVESTMENT DETAILS
------------------
Investment Amount: ${investment_amount}
Entity Type: ${entity_type}
Accredited Investor: ${accredited_investor ? 'YES' : 'NO'}
${referral_source ? `Referral Source: ${referral_source}` : ''}

${message ? `APPLICANT MESSAGE\n-----------------\n${message}\n` : ''}

APPLICATION METADATA
--------------------
Application ID: ${id}
Submitted: ${new Date(created_at).toLocaleString()}

ACTION REQUIRED
---------------
Please review this application within 1-2 business days by logging into the admin panel at:
${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/investor

---
Liv1403 Investor Portal - Automated Notification
    `
  };
};
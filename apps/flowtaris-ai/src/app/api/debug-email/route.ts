// DEBUG ONLY — remove before going to production
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  const toEmail = process.env.RESEND_TO_EMAIL

  // Safety: return env status
  if (!apiKey) {
    return NextResponse.json({
      status: 'error',
      message: 'RESEND_API_KEY is not set in environment variables.',
      env: {
        RESEND_API_KEY: 'NOT SET',
        RESEND_FROM_EMAIL: fromEmail,
        RESEND_TO_EMAIL: toEmail || 'NOT SET',
      },
    })
  }

  if (!toEmail) {
    return NextResponse.json({
      status: 'error',
      message: 'RESEND_TO_EMAIL is not set. In Sandbox mode, you MUST set this to your Resend account email.',
      env: {
        RESEND_API_KEY: `${apiKey.slice(0, 8)}...${apiKey.slice(-4)} (set)`,
        RESEND_FROM_EMAIL: fromEmail,
        RESEND_TO_EMAIL: 'NOT SET — THIS IS THE PROBLEM',
      },
    })
  }

  // Try sending a test email
  const resend = new Resend(apiKey)
  try {
    const { data, error } = await resend.emails.send({
      from: `Flowtaris Debug <${fromEmail}>`,
      to: [toEmail],
      subject: '[Flowtaris Debug] Email Test — Resend is working!',
      html: `
        <div style="font-family: sans-serif; max-width:500px; margin:0 auto; padding:24px;">
          <h2 style="margin:0 0 16px;">✅ Resend is connected!</h2>
          <p>Your Flowtaris email integration is working correctly.</p>
          <hr style="border:1px solid #eee; margin:20px 0;"/>
          <p style="font-size:12px; color:#666;">Sent from: <code>${fromEmail}</code><br/>
          Sent to: <code>${toEmail}</code><br/>
          API Key: <code>${apiKey.slice(0, 8)}...${apiKey.slice(-4)}</code></p>
        </div>
      `,
    })

    if (error) {
      return NextResponse.json({
        status: 'resend_error',
        message: 'Resend rejected the email. See error details.',
        error,
        hint: error.message?.includes('domain') || error.message?.includes('from')
          ? 'Your FROM domain is not verified. Use onboarding@resend.dev or verify flowtaris.ai in the Resend dashboard.'
          : error.message?.includes('sandbox')
          ? 'You are in Sandbox mode. RESEND_TO_EMAIL must be the exact email you signed up with on Resend.'
          : 'Check Resend dashboard logs for more detail.',
        env: {
          RESEND_FROM_EMAIL: fromEmail,
          RESEND_TO_EMAIL: toEmail,
        },
      })
    }

    return NextResponse.json({
      status: 'success',
      message: `Test email sent successfully! Check ${toEmail} inbox.`,
      resendMessageId: data?.id,
      env: {
        RESEND_API_KEY: `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}`,
        RESEND_FROM_EMAIL: fromEmail,
        RESEND_TO_EMAIL: toEmail,
      },
    })
  } catch (e: any) {
    return NextResponse.json({
      status: 'exception',
      message: e.message || 'Unknown error calling Resend',
      env: {
        RESEND_FROM_EMAIL: fromEmail,
        RESEND_TO_EMAIL: toEmail,
      },
    })
  }
}

// @flowtaris/email - Resend email notifications

import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@flowtaris.ai'
const toEmail = process.env.RESEND_TO_EMAIL || 'leads@flowtaris.ai'
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

// Create Resend client (server-side only)
function getResendClient(): Resend | null {
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured - emails will not be sent')
    return null
  }
  return new Resend(resendApiKey)
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

// 1. New Lead → Practice Lead Notification
export async function sendNewLeadNotification(
  lead: {
    id: string
    answers: Record<string, unknown>
    recommendations: string[]
    leadScore: number
    routedTo: string
    createdAt: string
  }
) {
  const resend = getResendClient()
  if (!resend) return { success: false, reason: 'No Resend client' }

  const erp = lead.answers['erp'] || lead.answers['erp-platform'] || 'Unknown'
  const urgency = lead.answers['urgency'] || 'Unknown'
  const painPoints = lead.answers['painPoints'] || lead.answers['pain-points'] || []

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🚀 New Assessment Lead</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Flowtaris AI Practice Lead Notification</p>
      </div>
      <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
        <div style="display: grid; gap: 16px; margin-bottom: 24px;">
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Lead ID</div>
            <div style="font-family: monospace; font-size: 14px;">${lead.id.slice(0, 8)}...</div>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Lead Score</div>
            <div style="font-size: 32px; font-weight: 700; color: ${lead.leadScore >= 70 ? '#10b981' : '#f59e0b'};">${lead.leadScore}/100</div>
          </div>
          <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Routing</div>
            <div style="font-size: 16px; font-weight: 600; color: ${lead.routedTo === 'sales' ? '#10b981' : '#6366f1'}; text-transform: capitalize;">${lead.routedTo}</div>
          </div>
        </div>
        <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Profile</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div><strong>ERP Platform:</strong> ${erp}</div>
            <div><strong>Urgency:</strong> ${urgency}</div>
          </div>
        </div>
        <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Pain Points</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${(painPoints as string[]).map(p => `<span style="background: #f1f5f9; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">${p}</span>`).join('')}
          </div>
        </div>
        <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Recommendations</div>
          <ul style="margin: 0; padding-left: 20px;">
            ${lead.recommendations.map(r => `<li style="margin-bottom: 4px;">${r}</li>`).join('')}
          </ul>
        </div>
        <a href="${appUrl}/admin/leads/${lead.id}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">View in Dashboard →</a>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: `Flowtaris AI <${fromEmail}>`,
      to: toEmail,
      subject: `[Lead #${lead.id.slice(0, 8)}] Score ${lead.leadScore}/100 — ${lead.routedTo === 'sales' ? 'SALES' : 'NURTURE'}`,
      html,
    })
    return { success: true, data: result.data }
  } catch (error) {
    console.error('Failed to send new lead notification:', error)
    return { success: false, error }
  }
}

// 2. High-Score Lead → Sales Alert
export async function sendHighScoreSalesAlert(
  lead: {
    id: string
    answers: Record<string, unknown>
    recommendations: string[]
    leadScore: number
    email?: string
    createdAt: string
  }
) {
  const resend = getResendClient()
  if (!resend) return { success: false, reason: 'No Resend client' }

  const erp = lead.answers['erp'] || lead.answers['erp-platform'] || 'Unknown'
  const urgency = lead.answers['urgency'] || 'Unknown'
  const hasEmail = !!lead.email

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🔥 HIGH-VALUE LEAD ALERT</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Score ≥ 70 — Immediate Sales Follow-up Required</p>
      </div>
      <div style="background: #fef2f2; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #fecaca; border-top: none;">
        <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #fecaca; margin-bottom: 24px;">
          <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Lead Score</div>
          <div style="font-size: 40px; font-weight: 700; color: #ef4444;">${lead.leadScore}/100</div>
        </div>
        <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #fecaca; margin-bottom: 24px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div><strong>ERP Platform:</strong> ${erp}</div>
            <div><strong>Urgency:</strong> ${urgency}</div>
            <div><strong>Has Email:</strong> ${hasEmail ? '✅ Yes' : '❌ No'}</div>
            <div><strong>Lead ID:</strong> ${lead.id.slice(0, 8)}...</div>
          </div>
        </div>
        <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #fecaca; margin-bottom: 24px;">
          <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Top Recommendations</div>
          <ul style="margin: 0; padding-left: 20px;">
            ${lead.recommendations.slice(0, 3).map(r => `<li style="margin-bottom: 4px;">${r}</li>`).join('')}
          </ul>
        </div>
        <div style="text-align: center;">
          <a href="${appUrl}/admin/leads/${lead.id}" style="display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #f97316 100%); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px;">🚨 VIEW & ASSIGN NOW →</a>
        </div>
        ${hasEmail ? `<p style="margin-top: 16px; font-size: 14px; color: #64748b;">Email captured: <strong>${lead.email}</strong></p>` : ''}
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: `Flowtaris AI Alerts <${fromEmail}>`,
      to: toEmail,
      subject: `🔥 HIGH-VALUE LEAD: Score ${lead.leadScore}/100 — ${erp} — ${urgency}`,
      html,
    })
    return { success: true, data: result.data }
  } catch (error) {
    console.error('Failed to send high-score alert:', error)
    return { success: false, error }
  }
}

// 3. Demo Request → Calendar Link Email (to prospect)
export async function sendDemoConfirmationEmail(
  data: {
    name: string
    email: string
    company: string
    calendarLink: string
    assessmentId?: string
    roiCalcId?: string
  }
) {
  const resend = getResendClient()
  if (!resend) return { success: false, reason: 'No Resend client' }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Thanks for Requesting a Demo! 🎯</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0; font-size: 16px;">Let's explore how AI automation transforms your finance operations</p>
      </div>
      <div style="background: #f8fafc; padding: 32px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
        <p style="font-size: 16px; margin-bottom: 24px;">Hi ${data.name},</p>
        <p style="font-size: 16px; margin-bottom: 24px;">We're excited to show you how Flowtaris AI helps ${data.company || 'your team'} eliminate manual finance work and unlock strategic capacity.</p>
        <div style="background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px; text-align: center;">
          <p style="margin: 0 0 16px; font-size: 14px; color: #64748b;">Book your 30-minute session</p>
          <a href="${data.calendarLink}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">📅 Schedule Demo on Calendly</a>
        </div>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 8px;">What to expect:</p>
        <ul style="font-size: 14px; color: #475569; margin: 0 0 24px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Live demo of capabilities matched to your ERP (${data.assessmentId ? 'from your assessment' : 'NetSuite, Coupa, SAP, or Workday'})</li>
          <li style="margin-bottom: 8px;">ROI walkthrough with your actual volumes ${data.roiCalcId ? '(pre-filled from your ROI calculation)' : ''}</li>
          <li style="margin-bottom: 8px;">Implementation timeline and resource requirements</li>
          <li>Q&A with a Flowtaris AI practice lead</li>
        </ul>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
        <p style="font-size: 13px; color: #94a3b8; margin: 0;">Questions? Reply to this email or visit <a href="${appUrl}" style="color: #0ea5e9;">flowtaris.ai</a></p>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: `Flowtaris AI <${fromEmail}>`,
      to: data.email,
      subject: `Your Flowtaris AI Demo — Book a Time That Works`,
      html,
    })
    // Also notify internal team
    await resend.emails.send({
      from: `Flowtaris AI <${fromEmail}>`,
      to: toEmail,
      subject: `📅 New Demo Request: ${data.name} (${data.company || 'No company'})`,
      html: `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
        <p><strong>Assessment ID:</strong> ${data.assessmentId || 'None'}</p>
        <p><strong>ROI Calc ID:</strong> ${data.roiCalcId || 'None'}</p>
      `,
    })
    return { success: true, data: result.data }
  } catch (error) {
    console.error('Failed to send demo confirmation:', error)
    return { success: false, error }
  }
}

// 4. Assessment Complete Email to Prospect (with roadmap)
export async function sendAssessmentResultsEmail(
  data: {
    email: string
    name?: string
    assessmentId: string
    leadScore: number
    recommendations: Array<{
      capability: string
      category: string
      timeline: string
      projectedImpact: string
    }>
    roiUrl: string
  }
) {
  const resend = getResendClient()
  if (!resend) return { success: false, reason: 'No Resend client' }

  const quickWins = data.recommendations.filter(r => r.category === 'quick-win')
  const strategic = data.recommendations.filter(r => r.category === 'strategic')
  const innovation = data.recommendations.filter(r => r.category === 'innovation')

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Your AI Automation Roadmap is Ready 🎯</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0; font-size: 16px;">Lead Score: <strong style="font-size: 20px;">${data.leadScore}/100</strong></p>
      </div>
      <div style="background: #f8fafc; padding: 32px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
        <p style="font-size: 16px; margin-bottom: 24px;">${data.name ? `Hi ${data.name},` : 'Hi there,'}</p>
        <p style="font-size: 16px; margin-bottom: 24px;">Thanks for completing the Flowtaris AI Readiness Assessment. Based on your responses, we've generated a personalized 3-column roadmap tailored to your ERP, volume, and urgency.</p>

        <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px; border-left: 4px solid #10b981;">
          <h3 style="margin: 0 0 12px; color: #10b981; font-size: 16px;">⚡ Quick Wins (0-3 months)</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
            ${quickWins.map(r => `<li style="margin-bottom: 6px;"><strong>${r.capability}</strong> — ${r.timeline} • ${r.projectedImpact}</li>`).join('') || '<li style="color: #94a3b8;">No quick wins identified</li>'}
          </ul>
        </div>

        <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
          <h3 style="margin: 0 0 12px; color: #f59e0b; font-size: 16px;">🎯 Strategic (3-9 months)</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
            ${strategic.map(r => `<li style="margin-bottom: 6px;"><strong>${r.capability}</strong> — ${r.timeline} • ${r.projectedImpact}</li>`).join('') || '<li style="color: #94a3b8;">No strategic initiatives identified</li>'}
          </ul>
        </div>

        <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px; border-left: 4px solid #8b5cf6;">
          <h3 style="margin: 0 0 12px; color: #8b5cf6; font-size: 16px;">🚀 Innovation (9-18 months)</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
            ${innovation.map(r => `<li style="margin-bottom: 6px;"><strong>${r.capability}</strong> — ${r.timeline} • ${r.projectedImpact}</li>`).join('') || '<li style="color: #94a3b8;">No innovation opportunities identified</li>'}
          </ul>
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${data.roiUrl}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">📊 Calculate ROI for Top Recommendation</a>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
        <p style="font-size: 13px; color: #94a3b8; margin: 0;">Your assessment ID: <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${data.assessmentId.slice(0, 8)}...</code></p>
        <p style="font-size: 13px; color: #94a3b8; margin: 8px 0 0;">Questions? Reply to this email or visit <a href="${appUrl}" style="color: #0ea5e9;">flowtaris.ai</a></p>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: `Flowtaris AI <${fromEmail}>`,
      to: data.email,
      subject: `Your AI Automation Roadmap (Score: ${data.leadScore}/100)`,
      html,
    })
    return { success: true, data: result.data }
  } catch (error) {
    console.error('Failed to send assessment results:', error)
    return { success: false, error }
  }
}

// 5. ROI Calculator Results Email
export async function sendROIResultsEmail(
  data: {
    email: string
    name?: string
    roiCalcId: string
    projectedSavings: number
    paybackMonths: number
    fteFreed: number
    inactionUrl: string
  }
) {
  const resend = getResendClient()
  if (!resend) return { success: false, reason: 'No Resend client' }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%); padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Your ROI Analysis is Ready 📊</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0; font-size: 16px;">Projected Annual Savings: <strong style="font-size: 24px;">$${data.projectedSavings.toLocaleString()}</strong></p>
      </div>
      <div style="background: #f8fafc; padding: 32px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
        <p style="font-size: 16px; margin-bottom: 24px;">${data.name ? `Hi ${data.name},` : 'Hi there,'}</p>
        <p style="font-size: 16px; margin-bottom: 24px;">Here are your detailed ROI projections based on your inputs:</p>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 24px;">
          <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Annual Savings</div>
            <div style="font-size: 24px; font-weight: 700; color: #10b981;">$${data.projectedSavings.toLocaleString()}</div>
          </div>
          <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Payback Period</div>
            <div style="font-size: 24px; font-weight: 700; color: #0ea5e9;">${data.paybackMonths.toFixed(1)} months</div>
          </div>
          <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">FTE Freed</div>
            <div style="font-size: 24px; font-weight: 700; color: #8b5cf6;">${data.fteFreed.toFixed(1)}</div>
          </div>
        </div>

        <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px; font-size: 16px;">What This Means</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #475569;">
            <li style="margin-bottom: 8px;">Implementation completes in ~12 weeks</li>
            <li style="margin-bottom: 8px;">Break-even achieved in ${data.paybackMonths.toFixed(1)} months</li>
            <li style="margin-bottom: 8px;">${data.fteFreed.toFixed(1)} FTEs redirected to strategic work annually</li>
            <li>3-year NPV significantly positive at 10% discount rate</li>
          </ul>
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${data.inactionUrl}" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600;">⚠️ What If I Wait? (Cost of Inaction)</a>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
        <p style="font-size: 13px; color: #94a3b8; margin: 0;">ROI Calculation ID: <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${data.roiCalcId.slice(0, 8)}...</code></p>
        <p style="font-size: 13px; color: #94a3b8; margin: 8px 0 0;">Questions? Reply to this email or visit <a href="${appUrl}" style="color: #0ea5e9;">flowtaris.ai</a></p>
      </div>
    </body>
    </html>
  `

  try {
    const result = await resend.emails.send({
      from: `Flowtaris AI <${fromEmail}>`,
      to: data.email,
      subject: `Your ROI Analysis: $${data.projectedSavings.toLocaleString()}/yr savings, ${data.paybackMonths.toFixed(1)}mo payback`,
      html,
    })
    return { success: true, data: result.data }
  } catch (error) {
    console.error('Failed to send ROI results:', error)
    return { success: false, error }
  }
}

// Helper: Send all notifications for a new assessment lead
export async function processAssessmentLeadNotifications(
  lead: {
    id: string
    answers: Record<string, unknown>
    recommendations: string[]
    leadScore: number
    routedTo: string
    email?: string
    createdAt: string
  }
) {
  const results = []

  // Always notify practice lead
  results.push(await sendNewLeadNotification(lead))

  // If high score, alert sales
  if (lead.leadScore >= 70) {
    results.push(await sendHighScoreSalesAlert(lead))
  }

  // If email captured, send results to prospect
  if (lead.email) {
    const roiUrl = `/roi-calculator?assessmentId=${lead.id}`
    results.push(await sendAssessmentResultsEmail({
      email: lead.email,
      assessmentId: lead.id,
      leadScore: lead.leadScore,
      recommendations: lead.recommendations.map(r => ({
        capability: r,
        category: 'quick-win', // Would be enriched with actual category
        timeline: '0-3 months',
        projectedImpact: 'High',
      })),
      roiUrl,
    }))
  }

  return results
}

export { getResendClient }
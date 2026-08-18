// @flowtaris/flowtaris-ai - Assessment Lead Email Capture API
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@flowtaris/supabase-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, email } = body

    if (!id || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: id, email' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Use service role client for server-side update
    const supabase = createServerClient()

    // Update the lead with email
    const { data, error } = await supabase
      .from('assessment_leads')
      .update({ email })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update lead' },
        { status: 500 }
      )
    }

    // Return success with lead info (without sensitive data)
    return NextResponse.json({
      success: true,
      leadId: data.id,
      leadScore: data.lead_score,
      routedTo: data.routed_to,
    })

  } catch (error) {
    console.error('Assessment email capture error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
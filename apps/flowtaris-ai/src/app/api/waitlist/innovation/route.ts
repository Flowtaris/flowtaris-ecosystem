// @flowtaris/flowtaris-ai - Innovation Lab Waitlist API
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@flowtaris/supabase-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, capabilitySlug, source = 'innovation-lab' } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Missing required field: email' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    // Check if already on waitlist
    const { data: existing } = await supabase
      .from('innovation_waitlist')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Email already on waitlist', waitlistId: existing.id },
        { status: 409 }
      )
    }

    // Insert new waitlist entry
    const { data, error } = await supabase
      .from('innovation_waitlist')
      .insert({
        email,
        capability_slug: capabilitySlug || null,
        source,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      waitlistId: data.id,
      capabilitySlug: data.capability_slug,
    })

  } catch (error) {
    console.error('Innovation waitlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
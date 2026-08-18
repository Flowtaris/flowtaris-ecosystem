// @flowtaris/flowtaris-ai - Demo Request API
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@flowtaris/supabase-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, urgently, assessmentId, roiCalcId } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email' },
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

    // Store demo request in contacts table with type 'demo'
    const { data, error } = await supabase
      .from('contacts')
      .insert({
        type: 'demo',
        name,
        email,
        company,
        message: `Urgency: ${urgently || 'standard'}. Assessment ID: ${assessmentId || 'none'}. ROI Calc ID: ${roiCalcId || 'none'}`,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create demo request' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      requestId: data.id,
      calendarLink: 'https://calendly.com/flowtaris/demo', // Replace with actual Calendly link
    })

  } catch (error) {
    console.error('Demo request error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
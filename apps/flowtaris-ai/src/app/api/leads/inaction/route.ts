// @flowtaris/flowtaris-ai - Inaction Calculation Email Capture API
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()

    const { data, error } = await supabase
      .from('inaction_calculations')
      .update({ email })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update inaction calculation' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      calcId: data.id,
      monthlyLeakage: data.outputs?.monthlyLeakage,
    })

  } catch (error) {
    console.error('Inaction email capture error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
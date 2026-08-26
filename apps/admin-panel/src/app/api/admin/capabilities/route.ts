// Admin API — Save capability content to Supabase
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@flowtaris/supabase-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const supabase = createServerClient()

    const payload = {
      slug: body.slug,
      category: body.category,
      title: body.title,
      headline: body.headline,
      subheadline: body.subheadline,
      maturity: body.maturity || 'production',
      problem_headline: body.problem_headline,
      problem_body: body.problem_body,
      problem_stat_value: body.problem_stat_value,
      problem_stat_label: body.problem_stat_label,
      stats: body.stats || [],
      integrations: body.integrations
        ? body.integrations.split(',').map((s: string) => s.trim()).filter(Boolean)
        : [],
      faq_items: body.faq_items || [],
      seo_title: body.seo_title,
      seo_description: body.seo_description,
      seo_keywords: body.seo_keywords,
      cta_headline: body.cta_headline,
      cta_body: body.cta_body,
      cta_primary_label: body.cta_primary_label,
      cta_primary_href: body.cta_primary_href,
      cta_secondary_label: body.cta_secondary_label,
      cta_secondary_href: body.cta_secondary_href,
    }

    const { error } = await supabase
      .from('capabilities')
      .upsert(payload, { onConflict: 'slug' })

    if (error) {
      console.error('Supabase error saving capability:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Trigger ISR revalidation of the public page
    const baseUrl = process.env.NEXT_PUBLIC_FLOWTARIS_AI_URL || 'https://flowtaris-ecosystem-flowtaris-ai.vercel.app'
    try {
      await fetch(`${baseUrl}/api/revalidate?tag=capability-${body.slug}&secret=${process.env.REVALIDATION_SECRET || 'flowtaris-dev'}`)
    } catch {
      // Non-fatal — ISR will revalidate within 60s regardless
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Capability save error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

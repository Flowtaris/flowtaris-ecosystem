import { NextResponse } from 'next/server'
import { getSiteConfig, createAdminClient } from '@/lib/supabase'

/**
 * GET /api/site-config
 * Returns a minimal subset of site_config safe for public consumption.
 * Used by the SiteHeader and other public-facing components to pull
 * admin-controlled branding (logo URL, brand name, badge text).
 *
 * Cached at the CDN edge for 60 seconds — balance between freshness
 * and performance. Admin changes propagate within 1 minute.
 */
export async function GET() {
  try {
    const data = await getSiteConfig()

    // Only expose the fields needed for public header rendering
    const publicConfig = {
      logoUrl:    data?.logo_url    ?? '/images/flowtaris-logo.png',
      brandName:  (data as any)?.header_brand_name ?? 'Flowtaris',
      badgeText:  (data as any)?.header_badge_text  ?? '.ai',
      showLogo:   (data as any)?.header_show_logo   !== false,
      siteName:   data?.site_name   ?? 'Flowtaris AI',
      tagline:    data?.tagline     ?? 'Enterprise AI Automation for Finance',
      trustSignals: (data as any)?.trust_signals ?? [
        { id: '1', label: 'Certified', value: 'SOC 2' },
        { id: '2', label: 'Compliant', value: 'GDPR' },
        { id: '3', label: 'Certified', value: 'ISO 27001' },
        { id: '4', label: 'Uptime SLA', value: '99.99%' },
        { id: '5', label: 'API Calls/Day', value: '50M+' },
        { id: '6', label: 'Trusted By', value: 'Fortune 500' },
      ],
    }

    return NextResponse.json(publicConfig, {
      status: 200,
      headers: {
        // Cache at CDN for 60s, allow stale for up to 300s while revalidating
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('[/api/site-config] Failed to fetch:', error)
    // Return safe defaults — never fail the header render
    return NextResponse.json(
      {
        logoUrl:   '/images/flowtaris-logo.png',
        brandName: 'Flowtaris',
        badgeText: '.ai',
        showLogo:  true,
        siteName:  'Flowtaris AI',
        tagline:   'Enterprise AI Automation for Finance',
        trustSignals: [],
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' },
      }
    )
  }
}

/**
 * POST /api/site-config
 * Updates site_config using the service-role admin client (server-side only).
 * The anon key cannot UPDATE via RLS, so all saves must go through this route.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      site_name, site_url, tagline, logo_url, favicon_url,
      header_brand_name, header_badge_text, header_show_logo,
      navigation, social_links, contact_email, support_email,
      privacy_policy_url, terms_of_service_url, cookie_policy_url,
      analytics, seo, trust_signals
    } = body

    const updatePayload: Record<string, unknown> = {}
    if (site_name !== undefined)            updatePayload.site_name = site_name
    if (site_url !== undefined)             updatePayload.site_url = site_url
    if (tagline !== undefined)              updatePayload.tagline = tagline
    if (logo_url !== undefined)             updatePayload.logo_url = logo_url
    if (favicon_url !== undefined)          updatePayload.favicon_url = favicon_url
    if (header_brand_name !== undefined)    updatePayload.header_brand_name = header_brand_name
    if (header_badge_text !== undefined)    updatePayload.header_badge_text = header_badge_text
    if (header_show_logo !== undefined)     updatePayload.header_show_logo = header_show_logo
    if (navigation !== undefined)           updatePayload.navigation = navigation
    if (social_links !== undefined)         updatePayload.social_links = social_links
    if (contact_email !== undefined)        updatePayload.contact_email = contact_email
    if (support_email !== undefined)        updatePayload.support_email = support_email
    if (privacy_policy_url !== undefined)   updatePayload.privacy_policy_url = privacy_policy_url
    if (terms_of_service_url !== undefined) updatePayload.terms_of_service_url = terms_of_service_url
    if (cookie_policy_url !== undefined)    updatePayload.cookie_policy_url = cookie_policy_url
    if (analytics !== undefined)            updatePayload.analytics = analytics
    if (seo !== undefined)                  updatePayload.seo = seo
    if (trust_signals !== undefined)        updatePayload.trust_signals = trust_signals

    const adminClient = createAdminClient()
    const { error } = await adminClient
      .from('site_config')
      .update(updatePayload)
      .eq('id', '00000000-0000-0000-0000-000000000001')

    if (error) {
      console.error('[POST /api/site-config] Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    console.error('[POST /api/site-config] Unexpected error:', err)
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 })
  }
}

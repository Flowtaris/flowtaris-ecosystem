import { NextResponse } from 'next/server'
import { getSiteConfig } from '@/lib/supabase'

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
      logoUrl:    data?.logo_url    ?? 'https://www.flowtaris.com/logo.svg',
      brandName:  (data as any)?.header_brand_name ?? 'Flowtaris',
      badgeText:  (data as any)?.header_badge_text  ?? '.ai',
      showLogo:   (data as any)?.header_show_logo   !== false,
      siteName:   data?.site_name   ?? 'Flowtaris AI',
      tagline:    data?.tagline     ?? 'Enterprise AI Automation for Finance',
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
        logoUrl:   'https://www.flowtaris.com/logo.svg',
        brandName: 'Flowtaris',
        badgeText: '.ai',
        showLogo:  true,
        siteName:  'Flowtaris AI',
        tagline:   'Enterprise AI Automation for Finance',
      },
      {
        status: 200,
        headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' },
      }
    )
  }
}

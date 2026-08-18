import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

/**
 * Sanity webhook handler for ISR revalidation
 *
 * Sanity webhook config:
 * - URL: https://your-domain.vercel.app/api/revalidate
 * - Trigger: Document create/update/delete/publish
 * - Filter: _type in ["aiCapability", "caseStudy", "insight", "platformPage", "siteConfig", "assessmentConfig", "roiConfig"]
 * - Headers: Authorization: Bearer <SANITY_WEBHOOK_SECRET>
 */
export async function POST(request: Request) {
  const headersList = headers()
  const authHeader = headersList.get('authorization')
  const webhookSecret = process.env.SANITY_WEBHOOK_SECRET

  // Verify webhook secret
  if (!webhookSecret || authHeader !== `Bearer ${webhookSecret}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type, slug } = body

    if (!_type) {
      return new Response('Missing _type in body', { status: 400 })
    }

    console.log(`[revalidate] Received webhook for _type: ${_type}`, { slug })

    // Map Sanity document types to revalidation paths
    const pathsToRevalidate: string[] = []

    switch (_type) {
      case 'aiCapability':
        if (slug?.current) {
          pathsToRevalidate.push(`/capabilities`, `/capabilities/${slug.current}`)
        } else {
          pathsToRevalidate.push(`/capabilities`)
        }
        // Also revalidate home hero trust signals
        pathsToRevalidate.push(`/`)
        break

      case 'caseStudy':
        if (slug?.current) {
          pathsToRevalidate.push(`/case-studies`, `/case-studies/${slug.current}`)
        } else {
          pathsToRevalidate.push(`/case-studies`)
        }
        // Also revalidate home hero trust signals
        pathsToRevalidate.push(`/`)
        break

      case 'insight':
        if (slug?.current) {
          pathsToRevalidate.push(`/insights`, `/insights/${slug.current}`)
        } else {
          pathsToRevalidate.push(`/insights`)
        }
        break

      case 'platformPage':
        if (slug?.current) {
          pathsToRevalidate.push(`/platforms/${slug.current}`)
        }
        pathsToRevalidate.push(`/platforms`)
        // Also revalidate capabilities (platform badges)
        pathsToRevalidate.push(`/capabilities`)
        break

      case 'siteConfig':
        // Revalidate all pages that use site config
        pathsToRevalidate.push(
          `/`,
          `/capabilities`,
          `/case-studies`,
          `/insights`,
          `/platforms`,
          `/about`,
          `/contact`,
          `/innovation-lab`
        )
        break

      case 'assessmentConfig':
      case 'roiConfig':
        // Revalidate tool pages
        pathsToRevalidate.push(`/assessment`, `/roi-calculator`, `/cost-of-inaction`)
        break

      default:
        console.log(`[revalidate] Unknown _type: ${_type}, revalidating home`)
        pathsToRevalidate.push(`/`)
    }

    // Revalidate all paths
    pathsToRevalidate.forEach((path) => {
      revalidatePath(path)
      console.log(`[revalidate] Revalidated: ${path}`)
    })

    // Also revalidate sitemap and robots
    revalidatePath('/sitemap.xml')
    revalidatePath('/robots.txt')

    return Response.json({
      revalidated: true,
      paths: pathsToRevalidate,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[revalidate] Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
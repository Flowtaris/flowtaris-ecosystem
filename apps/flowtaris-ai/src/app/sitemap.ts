import { MetadataRoute } from 'next'
import { client, queries } from '@flowtaris/cms-client'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://flowtaris.ai'

type ChangeFreq = 'weekly' | 'monthly' | 'always' | 'hourly' | 'daily' | 'yearly' | 'never'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/assessment`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/roi-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cost-of-inaction`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/innovation-lab`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/capabilities`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFreq,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/platforms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFreq,
      priority: 0.7,
    },
  ]

  // Dynamic pages from Sanity (only if configured)
  const dynamicPages: MetadataRoute.Sitemap = []

  if (client && client.fetch) {
    try {
      // Fetch capabilities
      const capabilities = await client.fetch(queries.allCapabilities)
      if (capabilities && Array.isArray(capabilities)) {
        capabilities.forEach((capability: any) => {
          if (capability.slug?.current) {
            dynamicPages.push({
              url: `${BASE_URL}/capabilities/${capability.slug.current}`,
              lastModified: capability._updatedAt ? new Date(capability._updatedAt) : new Date(),
              changeFrequency: 'monthly' as ChangeFreq,
              priority: 0.7,
            })
          }
        })
      }

      // Fetch case studies
      const caseStudies = await client.fetch(queries.allCaseStudies)
      if (caseStudies && Array.isArray(caseStudies)) {
        caseStudies.forEach((study: any) => {
          if (study.slug?.current) {
            dynamicPages.push({
              url: `${BASE_URL}/case-studies/${study.slug.current}`,
              lastModified: study._updatedAt ? new Date(study._updatedAt) : new Date(),
              changeFrequency: 'monthly' as ChangeFreq,
              priority: 0.7,
            })
          }
        })
      }

      // Fetch insights
      const insights = await client.fetch(queries.allInsights)
      if (insights && Array.isArray(insights)) {
        insights.forEach((insight: any) => {
          if (insight.slug?.current) {
            dynamicPages.push({
              url: `${BASE_URL}/insights/${insight.slug.current}`,
              lastModified: insight.publishedAt ? new Date(insight.publishedAt) : new Date(),
              changeFrequency: 'monthly' as ChangeFreq,
              priority: 0.6,
            })
          }
        })
      }

      // Fetch platform pages
      const platformPages = await client.fetch(queries.allPlatformPages)
      if (platformPages && Array.isArray(platformPages)) {
        platformPages.forEach((page: any) => {
          if (page.slug?.current) {
            dynamicPages.push({
              url: `${BASE_URL}/platforms/${page.slug.current}`,
              lastModified: page._updatedAt ? new Date(page._updatedAt) : new Date(),
              changeFrequency: 'monthly' as ChangeFreq,
              priority: 0.7,
            })
          }
        })
      }
    } catch (error) {
      console.warn('Failed to fetch dynamic pages for sitemap:', error)
    }
  }

  // Combine static and dynamic pages
  return [...staticPages, ...dynamicPages]
}
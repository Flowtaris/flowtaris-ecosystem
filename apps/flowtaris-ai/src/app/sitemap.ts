import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://flowtaris.ai'

type ChangeFreq = 'weekly' | 'monthly' | 'always' | 'hourly' | 'daily' | 'yearly' | 'never'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as ChangeFreq, priority: 1.0 },
    { url: `${BASE_URL}/assessment`, lastModified: new Date(), changeFrequency: 'monthly' as ChangeFreq, priority: 0.9 },
    { url: `${BASE_URL}/roi-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as ChangeFreq, priority: 0.9 },
    { url: `${BASE_URL}/cost-of-inaction`, lastModified: new Date(), changeFrequency: 'monthly' as ChangeFreq, priority: 0.9 },
    { url: `${BASE_URL}/innovation-lab`, lastModified: new Date(), changeFrequency: 'monthly' as ChangeFreq, priority: 0.8 },
    { url: `${BASE_URL}/capabilities`, lastModified: new Date(), changeFrequency: 'weekly' as ChangeFreq, priority: 0.8 },
    { url: `${BASE_URL}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly' as ChangeFreq, priority: 0.8 },
    { url: `${BASE_URL}/insights`, lastModified: new Date(), changeFrequency: 'weekly' as ChangeFreq, priority: 0.8 },
    { url: `${BASE_URL}/platforms`, lastModified: new Date(), changeFrequency: 'monthly' as ChangeFreq, priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as ChangeFreq, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as ChangeFreq, priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as ChangeFreq, priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as ChangeFreq, priority: 0.3 },
  ]

  return staticPages
}
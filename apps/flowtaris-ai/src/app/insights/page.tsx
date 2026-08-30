import { Metadata } from 'next'
import InsightsClient from './InsightsClient'
import { getInsights } from '@/lib/supabase'

export const metadata: Metadata = {
  title: 'Insights & Research | Flowtaris AI',
  description: 'Original research, benchmarks, and thought leadership on AI automation in enterprise finance.',
}

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function InsightsPage() {
  const dbInsights = await getInsights()
  
  // Format the insights for the client components matching the shape they expect
  const insights = dbInsights.map((i: any) => ({
    slug: i.slug,
    title: i.title,
    category: i.rich_text?.category || 'Research',
    author: i.author || 'Flowtaris AI',
    publishDate: i.published_at || i.created_at,
    readTime: i.rich_text?.readTime || '10 min',
    excerpt: i.excerpt || '',
    tags: i.topic_clusters || [],
    featured: i.rich_text?.featured || false,
    image: i.rich_text?.image || null,
  }))

  // Derived unique categories from DB insights
  const dynamicCategories = Array.from(new Set(insights.map((i: any) => i.category)))
  const categories = ['All', ...dynamicCategories]

  return <InsightsClient insights={insights} categories={categories} />
}
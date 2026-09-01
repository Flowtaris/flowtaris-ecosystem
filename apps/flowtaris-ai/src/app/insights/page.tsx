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
  
  // Fallback mock data if DB is empty
  const mockInsights = [
    {
      slug: 'future-of-finance-automation',
      title: 'The Future of Finance Automation: Moving Beyond RPA',
      category: 'Research',
      author: 'Dr. Sarah Chen',
      publishDate: '2026-08-15',
      readTime: '8 min',
      excerpt: 'Robotic Process Automation is brittle. Discover how multi-agent architectures and LLMs are fundamentally reshaping enterprise ERP interactions.',
      tags: ['Automation', 'RPA', 'LLMs'],
      featured: true,
      image: null
    },
    {
      slug: 'roi-generative-ai-ap',
      title: 'Benchmarking the True ROI of GenAI in Accounts Payable',
      category: 'Benchmarks',
      author: 'Michael Torres',
      publishDate: '2026-07-22',
      readTime: '12 min',
      excerpt: 'An analysis of 50+ Fortune 500 companies reveals that true GenAI integration reduces AP processing costs by an average of 68% within 6 months.',
      tags: ['ROI', 'Accounts Payable', 'Benchmarks'],
      featured: false,
      image: null
    },
    {
      slug: 'navigating-eu-ai-act-finance',
      title: 'Navigating the EU AI Act: A Guide for Global Finance Teams',
      category: 'Compliance',
      author: 'Elena Rostova',
      publishDate: '2026-09-01',
      readTime: '15 min',
      excerpt: 'The EU AI Act classifies certain financial models as high-risk. Here is the definitive guide to maintaining compliance while aggressively deploying GenAI.',
      tags: ['Compliance', 'EU AI Act', 'Regulation'],
      featured: false,
      image: null
    },
    {
      slug: 'architecting-trust-financial-llms',
      title: 'Architecting Trust: Hallucination Mitigation in Financial LLMs',
      category: 'Technology',
      author: 'Dr. James Wright',
      publishDate: '2026-08-05',
      readTime: '10 min',
      excerpt: 'Financial data requires zero-tolerance for hallucinations. Learn how Flowtaris employs deterministic grounding and semantic verification layers.',
      tags: ['Technology', 'Security', 'Hallucinations'],
      featured: false,
      image: null
    }
  ]

  // Format the insights for the client components matching the shape they expect
  const formattedInsights = dbInsights.length > 0 ? dbInsights.map((i: any) => ({
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
  })) : mockInsights

  // Derived unique categories from insights
  const dynamicCategories = Array.from(new Set(formattedInsights.map((i: any) => i.category)))
  const categories = ['All', ...dynamicCategories]

  return <InsightsClient insights={formattedInsights} categories={categories} />
}
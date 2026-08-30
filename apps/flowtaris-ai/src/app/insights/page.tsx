import { Metadata } from 'next'
import InsightsClient from './InsightsClient'

const categories = ['All', 'Research', 'Benchmarks', 'Guides', 'Case Studies', 'Announcements']
const insights = [
  {
    slug: 'state-of-ai-automation-2025',
    title: 'State of AI Automation in Enterprise Finance 2025',
    category: 'Research',
    author: 'Dr. Sarah Chen',
    publishDate: '2025-01-15',
    readTime: '12 min',
    excerpt: 'Our annual survey of 500+ finance leaders reveals 73% plan to deploy GenAI document processing by 2026, but only 12% have production implementations.',
    tags: ['GenAI', 'Finance', 'Automation', 'Survey'],
    featured: true,
  },
  {
    slug: 'ap-automation-benchmark-2024',
    title: 'AP Automation Benchmark Report 2024',
    category: 'Benchmarks',
    author: 'Marcus Rodriguez',
    publishDate: '2024-11-20',
    readTime: '18 min',
    excerpt: 'Comprehensive benchmarks across 200+ implementations: processing times, error rates, cost per invoice, and automation rates by platform.',
    tags: ['AP Automation', 'Benchmarks', 'KPIs', 'ROI'],
    featured: true,
  },
  {
    slug: 'conversational-erp-future',
    title: 'The Future of ERP: Conversational Interfaces & Natural Language SQL',
    category: 'Research',
    author: 'Dr. Alex Kim',
    publishDate: '2024-03-08',
    readTime: '20 min',
    excerpt: 'Deep dive into the next paradigm shift: moving from click-based ERP to conversational interfaces. Technical architecture, current capabilities, and 3-year roadmap.',
    tags: ['Conversational ERP', 'Natural Language SQL', 'Future', 'Innovation'],
    featured: true,
  },
  {
    slug: 'eu-ai-act-compliance-guide',
    title: 'EU AI Act Compliance Guide for Finance AI Systems',
    category: 'Guides',
    author: 'Elena Volkov',
    publishDate: '2024-09-10',
    readTime: '22 min',
    excerpt: 'Practical roadmap for classifying your finance AI systems under the EU AI Act, implementing required controls, and achieving compliance before the 2025 deadline.',
    tags: ['EU AI Act', 'Compliance', 'Governance'],
    featured: false,
  },
  {
    slug: 'genai-vs-ocr-invoice-processing',
    title: 'GenAI vs OCR: Invoice Processing Accuracy Showdown',
    category: 'Research',
    author: 'Dr. James Park',
    publishDate: '2024-07-22',
    readTime: '15 min',
    excerpt: 'Head-to-head comparison of GenAI document intelligence vs traditional OCR/RPA on 50,000 real invoices across 15 formats and 8 languages.',
    tags: ['GenAI', 'OCR', 'Accuracy'],
    featured: false,
  },
  {
    slug: 'roi-automation-calculator-methodology',
    title: 'ROI Calculator Methodology: How We Calculate Your Savings',
    category: 'Guides',
    author: 'Priya Sharma',
    publishDate: '2024-05-15',
    readTime: '10 min',
    excerpt: 'Transparent breakdown of the formulas, assumptions, and data sources behind our ROI Calculator. Every variable explained so you can validate or customize.',
    tags: ['ROI', 'Methodology', 'Calculator'],
    featured: false,
  },
]

export const metadata: Metadata = {
  title: 'Insights & Research | Flowtaris AI',
  description: 'Original research, benchmarks, and thought leadership on AI automation in enterprise finance.',
}

export default function InsightsPage() {
  return <InsightsClient insights={insights} categories={categories} />
}
import { Metadata } from 'next'
import CaseStudiesClient from './CaseStudiesClient'

export const metadata: Metadata = {
  title: 'Case Studies — Real Enterprise AI Results | Flowtaris AI',
  description: 'Three verified enterprise AI automation deployments. $21M+ in combined savings and risk reduction across NetSuite, SAP, Coupa, and Workday. Full technical details and before/after metrics.',
  alternates: { canonical: 'https://flowtaris.ai/case-studies' },
  openGraph: {
    title: 'Case Studies — Real Enterprise AI Results | Flowtaris AI',
    description: 'Three verified enterprise deployments. $21M+ savings across NetSuite, SAP, Coupa, and Workday.',
    url: 'https://flowtaris.ai/case-studies',
    siteName: 'Flowtaris AI',
    type: 'website',
  },
}

export default function CaseStudiesPage() {
  return <CaseStudiesClient />
}
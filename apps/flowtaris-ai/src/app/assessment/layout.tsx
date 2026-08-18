import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | Flowtaris AI',
  description: 'Free 3-minute diagnostic to get your personalized AI automation roadmap. Identify quick wins, strategic initiatives, and innovation opportunities for your ERP.',
  openGraph: {
    title: 'AI Readiness Assessment | Flowtaris AI',
    description: 'Free 3-minute diagnostic for your personalized AI automation roadmap.',
    type: 'website',
  },
}

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return children
}
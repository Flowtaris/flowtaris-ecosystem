import { Metadata } from 'next'
import AssessmentWizardClient from './AssessmentWizardClient'

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | Flowtaris AI',
  description: 'Free 3-minute diagnostic → Personalized roadmap with Quick Wins (0-3mo), Strategic initiatives (3-9mo), and Innovation opportunities (9-18mo).',
  openGraph: {
    title: 'AI Readiness Assessment | Flowtaris AI',
    description: 'Free 3-minute diagnostic → Personalized roadmap with Quick Wins, Strategic initiatives, and Innovation opportunities.',
    type: 'website',
  },
}

export default async function AssessmentPage() {
  return <AssessmentWizardClient initialConfig={null} />
}
import { Metadata } from 'next'
import AssessmentWizardClient from './AssessmentWizardClient'

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | Flowtaris AI',
  description: 'Free 3-minute diagnostic → Personalized roadmap with Quick Wins (0-3mo), Strategic initiatives (3-9mo), and Innovation opportunities (9-18mo).',
  alternates: { canonical: 'https://flowtaris.ai/assessment' },
  openGraph: {
    title: 'AI Readiness Assessment | Flowtaris AI',
    description: 'Free 3-minute diagnostic → Personalized roadmap with Quick Wins, Strategic initiatives, and Innovation opportunities.',
    type: 'website',
  },
}

import { getAssessmentConfig } from '@flowtaris/supabase-client'

export default async function AssessmentPage() {
  let config = null;
  try {
    config = await getAssessmentConfig();
  } catch (e) {
    console.error("Failed to load Assessment config:", e);
  }
  return <AssessmentWizardClient initialConfig={config} />
}
import { Metadata } from 'next'
import { getClient } from '@flowtaris/cms-client'
import { queries } from '@flowtaris/cms-client'
import AssessmentWizardClient from './AssessmentWizardClient'
import { serviceSchema } from '@flowtaris/seo'

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | Flowtaris AI',
  description: 'Free 3-minute diagnostic → Personalized roadmap with Quick Wins (0-3mo), Strategic initiatives (3-9mo), and Innovation opportunities (9-18mo).',
  openGraph: {
    title: 'AI Readiness Assessment | Flowtaris AI',
    description: 'Free 3-minute diagnostic → Personalized roadmap with Quick Wins, Strategic initiatives, and Innovation opportunities.',
    type: 'website',
  },
  other: {
    'script:ld+json': JSON.stringify(
      serviceSchema({
        name: 'AI Readiness Assessment',
        description: 'Free 3-minute diagnostic assessing your finance team\'s AI automation readiness across 7 dimensions. Get a personalized roadmap with Quick Wins (0-3 months), Strategic Initiatives (3-9 months), and Innovation Opportunities (9-18 months).',
        category: 'Assessment & Consulting',
        platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'],
      })
    ),
  },
}

async function getAssessmentConfig() {
  const client = getClient(false)
  try {
    const config = await client.fetch(queries.assessmentConfig)
    return config
  } catch (error) {
    console.error('Failed to fetch assessment config:', error)
    return null
  }
}

export default async function AssessmentPage() {
  const config = await getAssessmentConfig()

  return <AssessmentWizardClient initialConfig={config} />
}
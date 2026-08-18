import { Metadata } from 'next'
import { getClient } from '@flowtaris/cms-client'
import { queries } from '@flowtaris/cms-client'
import CostOfInactionClient from './CostOfInactionClient'
import { serviceSchema } from '@flowtaris/seo'

export const metadata: Metadata = {
  title: 'Cost of Inaction Calculator | Flowtaris AI',
  description: 'Calculate the cost of waiting. Monthly revenue leakage, annual compliance risk, 3-year competitive gap, and cost of 6-month delay.',
  openGraph: {
    title: 'Cost of Inaction Calculator | Flowtaris AI',
    description: 'Calculate the cost of waiting. Monthly revenue leakage, annual compliance risk, 3-year competitive gap.',
    type: 'website',
  },
  other: {
    'script:ld+json': JSON.stringify(
      serviceSchema({
        name: 'Cost of Inaction Calculator',
        description: 'Calculate the financial impact of delaying AI finance automation. Quantify monthly revenue leakage, annual compliance risk, 3-year competitive gap, and the cost of a 6-month delay based on your specific ERP and volume.',
        category: 'Financial Risk Analysis',
        platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'],
      })
    ),
  },
}

async function getInactionConfig() {
  const client = getClient(false)
  try {
    const config = await client.fetch(queries.inactionConfig)
    return config
  } catch (error) {
    console.error('Failed to fetch inaction config:', error)
    return null
  }
}

export default async function CostOfInactionPage() {
  const config = await getInactionConfig()

  return <CostOfInactionClient initialConfig={config} />
}
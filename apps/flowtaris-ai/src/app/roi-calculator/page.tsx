import { Metadata } from 'next'
import { getClient } from '@flowtaris/cms-client'
import { queries } from '@flowtaris/cms-client'
import ROICalculatorClient from './ROICalculatorClient'
import { serviceSchema } from '@flowtaris/seo'

export const metadata: Metadata = {
  title: 'ROI Calculator | Flowtaris AI',
  description: 'Calculate your AI automation ROI with live sliders. Real-time projections for annual savings, payback period, and FTE freed based on your ERP and volume.',
  openGraph: {
    title: 'ROI Calculator | Flowtaris AI',
    description: 'Calculate your AI automation ROI with live sliders and real-time projections.',
    type: 'website',
  },
  other: {
    'script:ld+json': JSON.stringify(
      serviceSchema({
        name: 'ROI Calculator',
        description: 'Interactive ROI calculator for AI finance automation. Configure your ERP platform, invoice volume, and automation scope to see real-time projections for annual savings, payback period, and FTEs freed.',
        category: 'Financial Analysis Tool',
        platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'],
      })
    ),
  },
}

async function getROIConfig() {
  const client = getClient(false)
  try {
    const config = await client.fetch(queries.roiConfig)
    return config
  } catch (error) {
    console.error('Failed to fetch ROI config:', error)
    return null
  }
}

export default async function ROICalculatorPage() {
  const config = await getROIConfig()

  return <ROICalculatorClient initialConfig={config} />
}
import { Metadata } from 'next'
import ROICalculatorClient from './ROICalculatorClient'

export const metadata: Metadata = {
  title: 'ROI Calculator | Flowtaris AI',
  description: 'Calculate your AI automation ROI with live sliders. Real-time projections for annual savings, payback period, and FTE freed based on your ERP and volume.',
  openGraph: {
    title: 'ROI Calculator | Flowtaris AI',
    description: 'Calculate your AI automation ROI with live sliders and real-time projections.',
    type: 'website',
  },
}

export default async function ROICalculatorPage() {
  return <ROICalculatorClient initialConfig={null} />
}
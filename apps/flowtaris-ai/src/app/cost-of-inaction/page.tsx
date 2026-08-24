import { Metadata } from 'next'
import CostOfInactionClient from './CostOfInactionClient'

export const metadata: Metadata = {
  title: 'Cost of Inaction Calculator | Flowtaris AI',
  description: 'Calculate the cost of waiting. Monthly revenue leakage, annual compliance risk, 3-year competitive gap, and cost of 6-month delay.',
  openGraph: {
    title: 'Cost of Inaction Calculator | Flowtaris AI',
    description: 'Calculate the cost of waiting. Monthly revenue leakage, annual compliance risk, 3-year competitive gap.',
    type: 'website',
  },
}

export default async function CostOfInactionPage() {
  return <CostOfInactionClient initialConfig={null} />
}
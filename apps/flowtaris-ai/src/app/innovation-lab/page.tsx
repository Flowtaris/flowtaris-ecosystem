import { Metadata } from 'next'
import Script from 'next/script'
import InnovationLabClient from './InnovationLabClient'

export const metadata: Metadata = {
  title: 'Innovation Lab | Flowtaris AI Research & Experiments',
  description: 'Flowtaris AI Innovation Lab: Cutting-edge research on conversational ERP, GenAI document understanding, predictive finance, and AI governance. Open benchmarks, model cards, and experimental prototypes.',
  openGraph: {
    title: 'Innovation Lab | Flowtaris AI Research & Experiments',
    description: 'Cutting-edge research on conversational ERP, GenAI document understanding, predictive finance.',
    type: 'website',
  },
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Innovation Lab | Flowtaris AI Research & Experiments',
      description: 'Flowtaris AI Innovation Lab: Cutting-edge research on conversational ERP, GenAI document understanding, predictive finance, and AI governance.',
      publisher: {
        '@type': 'Organization',
        name: 'Flowtaris',
      },
    }),
  },
}

export default function InnovationLabPage() {
  return (
    <>
      <Script
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Innovation Lab | Flowtaris AI Research & Experiments',
          description: 'Flowtaris AI Innovation Lab: Cutting-edge research on conversational ERP, GenAI document understanding, predictive finance, and AI governance.',
          publisher: {
            '@type': 'Organization',
            name: 'Flowtaris',
          },
        }) }}
      />
      <InnovationLabClient />
    </>
  )
}
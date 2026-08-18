// @flowtaris/seo - Schema.org generators, meta tags, sitemap

import { Metadata } from 'next'

// Organization schema - used site-wide
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Flowtaris',
  url: 'https://flowtaris.ai',
  logo: 'https://flowtaris.ai/logo.png',
  sameAs: [
    'https://www.linkedin.com/company/flowtaris',
    'https://twitter.com/flowtaris',
  ],
  knowAbout: [
    'NetSuite',
    'Coupa',
    'SAP',
    'Workday',
    'Enterprise AI',
    'ERP Automation',
    'AI Governance',
    'Predictive Analytics',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-XXX-XXX-XXXX',
    contactType: 'sales',
    availableLanguage: ['English'],
  },
}

// Service schema per capability
export function serviceSchema(capability: {
  name: string
  description: string
  category: string
  platforms: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: capability.name,
    description: capability.description,
    provider: organizationSchema,
    serviceType: capability.category,
    areaServed: 'Global',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `https://flowtaris.ai/capabilities/${capability.name.toLowerCase().replace(/\s+/g, '-')}`,
    },
    knowsAbout: capability.platforms,
  }
}

// FAQPage schema - 3-5 Q&A pattern
export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// CaseStudy schema
export function caseStudySchema(caseStudy: {
  name: string
  description: string
  client: string
  industry: string
  platforms: string[]
  metrics: Array<{ name: string; value: string; change: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CaseStudy',
    name: caseStudy.name,
    description: caseStudy.description,
    about: {
      '@type': 'Organization',
      name: caseStudy.client,
      industry: caseStudy.industry,
    },
    knowsAbout: caseStudy.platforms,
    result: caseStudy.metrics.map((metric) => ({
      '@type': 'QuantitativeValue',
      name: metric.name,
      value: metric.value,
      description: metric.change,
    })),
  }
}

// SoftwareApplication schema per AI capability
export function softwareApplicationSchema(capability: {
  name: string
  description: string
  category: string
  platforms: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: capability.name,
    description: capability.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Cloud',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    provider: organizationSchema,
    featureList: capability.platforms,
  }
}

// Entity page schema (platform pages)
export function entityPageSchema(platform: {
  name: string
  description: string
  wikidataId: string
  capabilities: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${platform.name} AI Automation`,
    description: platform.description,
    about: {
      '@type': 'SoftwareApplication',
      name: platform.name,
      sameAs: `https://www.wikidata.org/wiki/${platform.wikidataId}`,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: platform.capabilities.map((cap, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: cap,
        },
      })),
    },
  }
}

// Speakable markup for voice search / AEO
export function speakableSchema(cssSelectors: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    cssSelector: cssSelectors,
  }
}

// Generate metadata for pages
export function generatePageMetadata({
  title,
  description,
  path,
  schema,
  ogImage,
  twitterCard = 'summary_large_image',
}: {
  title: string
  description: string
  path: string
  schema?: object
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
}): Metadata {
  const url = `https://flowtaris.ai${path}`

  return {
    title,
    description,
    metadataBase: new URL('https://flowtaris.ai'),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Flowtaris',
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
    other: schema ? { 'script:ld+json': JSON.stringify(schema) } : undefined,
  }
}
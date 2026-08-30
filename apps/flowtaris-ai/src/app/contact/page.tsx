import { Metadata } from 'next'
import ContactForm from './ContactForm'
import { organizationSchema } from '@flowtaris/seo'

export const metadata: Metadata = {
  title: 'Contact Flowtaris AI | Get Started with AI Finance Automation',
  description: 'Contact Flowtaris AI for a demo, assessment, or partnership inquiry. Schedule a call with our solutions architects to see GenAI Document Intelligence in action on your ERP.',
  alternates: { canonical: 'https://flowtaris.ai/contact' },
  openGraph: {
    title: 'Contact Flowtaris AI | Get Started with AI Finance Automation',
    description: 'Contact us for a demo, assessment, or partnership inquiry.',
    type: 'website',
  },
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Flowtaris AI',
      description: 'Get in touch with Flowtaris AI for demos, assessments, or partnership inquiries.',
      mainEntity: organizationSchema,
      publisher: organizationSchema,
    }),
  },
}

export default function ContactPage() {
  return <ContactForm />
}
import { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Flowtaris AI | Get Started with AI Finance Automation',
  description: 'Contact Flowtaris AI for a demo, assessment, or partnership inquiry. Schedule a call with our solutions architects to see GenAI Document Intelligence in action on your ERP.',
  openGraph: {
    title: 'Contact Flowtaris AI | Get Started with AI Finance Automation',
    description: 'Contact us for a demo, assessment, or partnership inquiry.',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactForm />
}
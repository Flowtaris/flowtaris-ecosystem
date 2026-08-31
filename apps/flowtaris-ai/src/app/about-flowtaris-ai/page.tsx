import AboutClient from './AboutClient'
import Image from 'next/image'

export const metadata = {
  title: 'About Flowtaris AI — The Intelligence Engine Behind Enterprise Finance Automation',
  description: 'Flowtaris AI is the R&D and product division of Flowtaris — born from 5+ years inside the ERP trenches, now automating what we used to do by hand. We deliver 99.5%+ document automation, save 14,000+ hours annually, and achieve <90 days time-to-value with $21M+ client savings documented.',
  // Open Graph / Twitter
  openGraph: {
    title: 'About Flowtaris AI — The Intelligence Engine Behind Enterprise Finance Automation',
    description: 'Flowtaris AI is the intelligence engine of Flowtaris, built by former controllers, Big 4 auditors, and ERP consultants who have deployed 200+ customizations across NetSuite, Coupa, SAP, and Workday.',
    url: 'https://flowtaris.ai/about-flowtaris-ai',
    siteName: 'Flowtaris AI',
    images: [
      {
        url: 'https://flowtaris.ai/images/og-about-flowtaris-ai.png',
        width: 1200,
        height: 630,
        alt: 'Flowtaris AI - The Intelligence Engine Behind Enterprise Finance Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Flowtaris AI — The Intelligence Engine Behind Enterprise Finance Automation',
    description: 'Flowtaris AI is the intelligence engine of Flowtaris, built by former controllers, Big 4 auditors, and ERP consultants who have deployed 200+ customizations across NetSuite, Coupa, SAP, and Workday.',
    images: ['https://flowtaris.ai/images/twitter-about-flowtaris-ai.png'],
  },
}

export default function AboutFlowtarisAIPage() {
  return (
    <div>
      <main className="min-h-[calc(100vh-4rem)] bg-[#0B0F19] text-white">
        <AboutClient />
      </main>
    </div>
  )
}
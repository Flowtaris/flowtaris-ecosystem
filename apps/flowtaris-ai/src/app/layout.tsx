import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const organizationSchema = {
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
    telephone: '+1-650-555-0100',
    contactType: 'sales',
    availableLanguage: ['English'],
  },
}

export const metadata: Metadata = {
  title: {
    default: 'Flowtaris AI | Enterprise AI Automation for Finance',
    template: '%s | Flowtaris AI',
  },
  description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP for NetSuite, Coupa, SAP, and Workday.',
  metadataBase: new URL('https://flowtaris.ai'),
  alternates: {
    canonical: 'https://flowtaris.ai',
  },
  openGraph: {
    title: 'Flowtaris AI | Enterprise AI Automation for Finance',
    description: 'Enterprise AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics.',
    url: 'https://flowtaris.ai',
    siteName: 'Flowtaris AI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowtaris AI | Enterprise AI Automation for Finance',
    description: 'Enterprise AI automation for finance teams. GenAI, Autonomous Workflows, Predictive Analytics.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
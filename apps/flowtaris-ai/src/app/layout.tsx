import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import FlowtarisGuide from "../components/onboarding/FlowtarisGuide";
import SiteHeader from "../components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── Server-side site config fetch ─────────────────────────────────────────────
// Fetches admin-controlled header config (logo, brand name, badge text).
// Falls back gracefully to defaults if DB is unreachable.
// Cache: next.js fetch cache with 60s revalidation.
async function fetchHeaderConfig() {
  try {
    // Use the internal API route for consistency + CDN caching
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://flowtaris.ai'
    const res = await fetch(`${baseUrl}/api/site-config`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch {
    // Safe defaults — header always renders even if DB is down
    return {
      logoUrl:   'https://www.flowtaris.com/logo.svg',
      brandName: 'Flowtaris',
      badgeText: '.ai',
      showLogo:  true,
    }
  }
}

// ── Schema.org Organization structured data ───────────────────────────────────
// flowtaris.ai is the AI product arm of flowtaris.com.
// sameAs + parentOrganization signal brand unity to Google/AI engines
// so both domains share authority under one Flowtaris brand entity.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Flowtaris',
  alternateName: 'Flowtaris AI',
  url: 'https://flowtaris.ai',
  logo: {
    '@type': 'ImageObject',
    url: 'https://flowtaris.ai/images/flowtaris_logo.png',
    width: 512,
    height: 512,
  },
  // Link back to parent — prevents Google from treating .ai as a separate brand
  parentOrganization: {
    '@type': 'Organization',
    name: 'Flowtaris',
    url: 'https://flowtaris.com',
  },
  sameAs: [
    'https://flowtaris.com',
    'https://www.linkedin.com/company/flowtaris',
    'https://twitter.com/flowtaris',
  ],
  knowsAbout: [
    'NetSuite ERP Automation',
    'Coupa Procurement AI',
    'SAP AI Integration',
    'Workday Finance Automation',
    'Enterprise AI for Finance',
    'Agentic ERP Workflows',
    'Predictive Finance Analytics',
    'AI Governance in Finance',
    'GenAI Document Intelligence',
    'Autonomous AP/AR Workflows',
  ],
  description: 'Flowtaris AI is the enterprise AI automation platform by Flowtaris, delivering GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP for NetSuite, Coupa, SAP, and Workday.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    availableLanguage: ['English'],
    areaServed: 'Worldwide',
  },
}

// ── Site Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Flowtaris AI | Enterprise AI Automation for Finance Teams',
    template: '%s | Flowtaris AI',
  },
  description:
    'Flowtaris AI builds enterprise-grade AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP — native on NetSuite, Coupa, SAP, and Workday.',
  metadataBase: new URL('https://flowtaris.ai'),
  alternates: {
    canonical: 'https://flowtaris.ai',
  },
  openGraph: {
    title: 'Flowtaris AI | Enterprise AI Automation for Finance Teams',
    description:
      'Enterprise AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics — native on NetSuite, Coupa, SAP, Workday.',
    url: 'https://flowtaris.ai',
    siteName: 'Flowtaris AI',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://flowtaris.ai/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Flowtaris AI — Enterprise AI Automation for Finance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowtaris AI | Enterprise AI Automation for Finance Teams',
    description:
      'Enterprise AI automation for finance — GenAI, Autonomous Workflows, Predictive Analytics. Native on NetSuite, Coupa, SAP, Workday.',
    images: ['https://flowtaris.ai/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: 'Flowtaris', url: 'https://flowtaris.com' }],
  creator: 'Flowtaris',
  publisher: 'Flowtaris',
  keywords: [
    'enterprise AI finance automation',
    'NetSuite AI automation',
    'Coupa AI procurement',
    'SAP AI integration',
    'Workday AI finance',
    'GenAI ERP',
    'autonomous AP workflow',
    'predictive finance analytics',
    'AI document intelligence',
    'conversational ERP',
    'Flowtaris AI',
    'finance AI platform',
  ],
  category: 'technology',
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch header config server-side (ISR cached, 60s revalidation)
  const headerConfig = await fetchHeaderConfig()

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Organization schema — signals brand unity between flowtaris.ai and flowtaris.com */}
        <Script
          id="schema-org-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Header receives server-fetched config — admin changes propagate within 60s */}
        <SiteHeader config={headerConfig} />
        {children}
        <FlowtarisGuide />
      </body>
    </html>
  );
}
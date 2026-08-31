'use client'

import React from 'react'
import { Footer, FooterColumn } from '@repo/ui'
import { Twitter, Linkedin, Github } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SiteFooter() {
  const pathname = usePathname()

  const columns: FooterColumn[] = [
    {
      title: 'Platform',
      links: [
        { label: 'Capabilities', href: '/capabilities' },
        { label: 'NetSuite', href: '/platforms/netsuite' },
        { label: 'Coupa', href: '/platforms/coupa' },
        { label: 'SAP', href: '/platforms/sap' },
        { label: 'Workday', href: '/platforms/workday' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Insights', href: '/insights' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'ROI Calculator', href: '/roi-calculator' },
        { label: 'Assessment', href: '/assessment' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about-flowtaris-ai' },
        { label: 'Contact', href: '/contact' },
        { label: 'Flowtaris.com', href: 'https://flowtaris.com', external: true },
      ],
    },
  ]

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://linkedin.com/company/flowtaris',
      label: 'LinkedIn',
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: 'https://twitter.com/flowtaris',
      label: 'Twitter',
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/flowtaris',
      label: 'GitHub',
    },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ]

  return (
    <Footer
      columns={columns}
      socialLinks={socialLinks}
      legalLinks={legalLinks}
      copyright={`© ${new Date().getFullYear()} Flowtaris AI. All rights reserved.`}
      showBackToTop={true}
    />
  )
}

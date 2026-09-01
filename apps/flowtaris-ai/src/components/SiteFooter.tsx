'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react'

export default function SiteFooter({ config }: { config?: any } = {}) {
  const logoUrl = config?.logoUrl || "/images/logo.png"
  const tagline = config?.tagline || "The intelligence layer enterprise finance was missing. Built by the best, deployed in weeks."
  
  // Use navigation json if provided, otherwise fallback to defaults
  const resources = config?.navigation?.footer?.resources || [
    { label: 'Insights', href: '/insights' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'ROI Calculator', href: '/roi-calculator' },
    { label: 'Assessment', href: '/assessment' },
    { label: 'Cost of Inaction', href: '/cost-of-inaction' },
  ]
  const company = config?.navigation?.footer?.company || [
    { label: 'About Us', href: '/about-flowtaris-ai' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="relative bg-[#050B14] overflow-hidden pt-32 border-t border-white/[0.05]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E8A020]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Removed Massive Brand Statement per user request */}
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="col-span-2 md:col-span-4 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6 relative w-72 h-16">
                <Image src={logoUrl} alt="Flowtaris AI" fill className="object-contain object-left" />
              </Link>
              <p className="text-neutral-500 font-light text-sm max-w-xs leading-relaxed mb-8">
                {tagline}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: 'https://flowtaris.com' },
                { icon: <Twitter className="w-4 h-4" />, href: 'https://flowtaris.com' },
                { icon: <Github className="w-4 h-4" />, href: 'https://flowtaris.com' },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#E8A020] hover:border-[#E8A020]/30 hover:bg-[#E8A020]/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        {/* Removed Platform section per user request */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm">Resources</h4>
            <ul className="space-y-4">
              {resources.map((link: any, i: number) => (
                <li key={i}>
                  <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 ease-out">
                      <ArrowRight className="w-3 h-3 text-[#E8A020]" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-white font-semibold mb-6 text-sm">Company</h4>
            <ul className="space-y-4 mb-8">
              {company.map((link: any, i: number) => (
                <li key={i}>
                  <Link href={link.href} className="text-neutral-400 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 ease-out">
                      <ArrowRight className="w-3 h-3 text-[#E8A020]" />
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://flowtaris.com" target="_blank" rel="noopener noreferrer" className="text-[#E8A020] hover:text-[#f5d98c] text-sm transition-colors flex items-center gap-2 group font-medium">
                  Corporate Site
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 pb-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs font-light">
            © {new Date().getFullYear()} Flowtaris AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-neutral-500 font-light">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Huge Background Text at very bottom */}
        <div className="pointer-events-none select-none overflow-hidden flex justify-center opacity-10 mix-blend-overlay pb-0 mb-[-2%]">
          <span className="text-[16vw] font-bold leading-[0.8] tracking-tighter text-white whitespace-nowrap" style={{ fontFamily: 'var(--font-sora)' }}>
            FLOWTARIS
          </span>
        </div>
      </div>
    </footer>
  )
}

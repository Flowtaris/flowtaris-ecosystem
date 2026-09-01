'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="relative bg-[#050B14] overflow-hidden pt-32 border-t border-white/[0.05]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E8A020]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Massive Brand Statement */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-white/10 pb-20">
          <div>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#E8A020] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/70">Enterprise Ready</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-sora)' }}>
              Automate the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8A020] to-[#f5d98c]">impossible.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-6 max-w-sm">
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed md:text-right font-light">
              Join the Fortune 500 finance teams already operating at the speed of thought with Flowtaris AI.
            </p>
            <Link 
              href="/assessment" 
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white text-[#0A1628] rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10 transition-colors group-hover:text-[#0A1628]">Start Assessment</span>
              <div className="w-8 h-8 rounded-full bg-[#E8A020] flex items-center justify-center relative z-10 transition-transform group-hover:translate-x-1 group-hover:bg-[#0A1628]">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#E8A020] to-[#f5d98c] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-cols-12 gap-12 lg:gap-8 mb-20">
          <div className="col-span-2 md:col-span-4 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl font-bold text-white tracking-wide" style={{ fontFamily: 'var(--font-sora)' }}>Flowtaris <span className="text-[#E8A020]">.AI</span></span>
              </Link>
              <p className="text-neutral-500 font-light text-sm max-w-xs leading-relaxed mb-8">
                The intelligence layer enterprise finance was missing. Built by the best, deployed in weeks.
              </p>
            </div>
            <div className="flex items-center gap-4">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com/company/flowtaris' },
                { icon: <Twitter className="w-4 h-4" />, href: 'https://twitter.com/flowtaris' },
                { icon: <Github className="w-4 h-4" />, href: 'https://github.com/flowtaris' },
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

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm">Platform</h4>
            <ul className="space-y-4">
              {[
                { label: 'Capabilities', href: '/capabilities' },
                { label: 'Security & Trust', href: '/capabilities' },
                { label: 'Integrations', href: '/about-flowtaris-ai' },
              ].map((link, i) => (
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

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm">Resources</h4>
            <ul className="space-y-4">
              {[
                { label: 'Insights', href: '/insights' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'ROI Calculator', href: '/roi-calculator' },
                { label: 'Assessment', href: '/assessment' },
              ].map((link, i) => (
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
              {[
                { label: 'About Us', href: '/about-flowtaris-ai' },
                { label: 'Contact', href: '/contact' },
              ].map((link, i) => (
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
        <div className="pointer-events-none select-none overflow-hidden flex justify-center opacity-[0.02] mix-blend-overlay pb-0 mb-[-2%]">
          <span className="text-[16vw] font-bold leading-[0.8] tracking-tighter text-white whitespace-nowrap" style={{ fontFamily: 'var(--font-sora)' }}>
            FLOWTARIS
          </span>
        </div>
      </div>
    </footer>
  )
}

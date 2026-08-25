'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Calculator, CheckCircle2, Sparkles } from 'lucide-react'

export default function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="fixed top-6 right-6 z-50 animate-fade-in-down pointer-events-auto">
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#05050a]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-[#00b8db]/5">
        
        {/* Logo / Home */}
        <Link 
          href="/" 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors group"
          aria-label="Flowtaris AI Home"
        >
          <div className="relative w-7 h-7 flex items-center justify-center rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-[#00b8db]/50 transition-colors">
            <Image 
              src="/images/flowtaris_logo.png" 
              alt="Flowtaris" 
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="text-white font-semibold text-sm tracking-tight font-sans">
            Flowtaris<span className="text-[#00b8db]">.ai</span>
          </span>
        </Link>

        {/* Vertical Separator */}
        <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

        {/* Internal Links */}
        <nav className="flex items-center gap-1">
          <Link 
            href="/assessment" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              pathname === '/assessment' 
                ? 'bg-[#00b8db]/15 text-[#00b8db] shadow-[inset_0_0_0_1px_rgba(0,184,219,0.3)]' 
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Assessment</span>
          </Link>

          <Link 
            href="/roi-calculator" 
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              pathname === '/roi-calculator' 
                ? 'bg-[#00b8db]/15 text-[#00b8db] shadow-[inset_0_0_0_1px_rgba(0,184,219,0.3)]' 
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">ROI</span>
          </Link>
        </nav>

        {/* Vertical Separator */}
        <div className="w-[1px] h-6 bg-white/10 mx-1"></div>

        {/* External Link back to .com */}
        <a 
          href="https://flowtaris.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors group border border-transparent hover:border-white/10"
        >
          <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">Corporate</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-colors" />
        </a>
        
      </div>
    </header>
  )
}

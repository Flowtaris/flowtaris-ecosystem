'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react'

interface HeaderConfig {
  logoUrl?: string
  brandName?: string
  badgeText?: string
  showLogo?: boolean
}

interface SiteHeaderProps {
  config?: HeaderConfig
}

export default function SiteHeader({ config }: SiteHeaderProps = {}) {
  const pathname = usePathname()

  const logoUrl   = config?.logoUrl   ?? '/images/flowtaris-logo.png'
  const brandName = config?.brandName ?? 'Flowtaris'
  const badgeText = config?.badgeText ?? '.ai'
  const showLogo  = config?.showLogo  !== false

  const isActive = (path: string) =>
    pathname === path || (pathname?.startsWith(path + '/') && path !== '/')

  return (
    <header
      className="fixed top-6 right-6 z-50 pointer-events-auto"
      role="banner"
      aria-label="Flowtaris AI — primary site navigation"
    >
      {/* ── Ultra-Premium Glassmorphism Container ── */}
      <div
        className="
          relative flex items-center gap-1.5 p-[5px] rounded-full
          bg-[#000000]/40 backdrop-blur-[40px]
          border border-white/[0.08]
          shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.08)]
          animate-header-enter group/header
          overflow-hidden
        "
      >
        {/* Subtle shimmer sweep animation */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent group-hover/header:animate-shimmer pointer-events-none" />

        {/* ── BRAND: Logo + Name + .ai Badge ── */}
        <Link
          href="/"
          className="
            relative flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full
            hover:bg-white/[0.04] active:bg-white/[0.06]
            transition-all duration-300 ease-out group
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20
          "
          aria-label="Flowtaris AI — go to homepage"
          title="Flowtaris AI — Enterprise AI Automation for Finance Teams"
        >
          {showLogo && (
            <div
              className="
                relative w-8 h-8 flex-shrink-0 rounded-full
                bg-white overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.2)]
                group-hover:shadow-[0_0_15px_rgba(212,168,71,0.3)]
                transition-all duration-500 ease-out
                flex items-center justify-center
              "
              aria-hidden="true"
            >
              <Image
                src={logoUrl}
                alt="Flowtaris logo"
                width={32}
                height={32}
                className="object-contain w-full h-full p-1 group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          )}

          <span className="flex items-center gap-2 select-none leading-none">
            <span className="text-white font-semibold text-[14px] tracking-wide font-sans">
              {brandName}
            </span>

            {/* Premium animated .ai badge */}
            <span
              className="
                relative inline-flex items-center gap-[3px] px-2 py-[3px] rounded-full
                bg-gradient-to-r from-[#D4A847]/20 via-[#f0c97a]/10 to-[#D4A847]/20
                border border-[#D4A847]/40
                text-[#f0c97a] text-[10px] font-bold tracking-widest uppercase
                shadow-[0_0_12px_rgba(212,168,71,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]
                group-hover:shadow-[0_0_18px_rgba(212,168,71,0.4),inset_0_1px_0_rgba(255,255,255,0.12)]
                group-hover:border-[#D4A847]/70 group-hover:text-[#fde68a]
                transition-all duration-500
              "
            >
              {/* Animated AI spark */}
              <span className="w-[5px] h-[5px] rounded-full bg-gradient-to-b from-[#fde68a] to-[#D4A847] animate-badge-pulse shadow-[0_0_6px_rgba(212,168,71,0.8)] flex-shrink-0" />
              {badgeText}
            </span>
          </span>
        </Link>

        {/* ── Separator ── */}
        <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-white/[0.15] to-transparent mx-1 flex-shrink-0" aria-hidden="true" />

        {/* ── PRIMARY NAV ── */}
        <nav
          className="flex items-center gap-1"
          role="navigation"
          aria-label="Main navigation links"
        >
          {/* Assessment */}
          <Link
            href="/assessment"
            className={`
              relative flex items-center gap-2 px-4 py-2.5 rounded-full
              text-[13px] tracking-wide transition-all duration-300
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20
              group
              ${isActive('/assessment')
                ? 'text-white bg-white/[0.08] font-medium'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
              }
            `}
          >
            <CheckCircle2
              strokeWidth={isActive('/assessment') ? 2.5 : 2}
              className={`w-4 h-4 flex-shrink-0 transition-colors duration-300
                ${isActive('/assessment') ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}
            />
            <span className="hidden sm:inline">Assessment</span>
          </Link>

          {/* ROI Calculator */}
          <Link
            href="/roi-calculator"
            className={`
              relative flex items-center gap-2 px-4 py-2.5 rounded-full
              text-[13px] tracking-wide transition-all duration-300
              focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20
              group
              ${isActive('/roi-calculator')
                ? 'text-white bg-white/[0.08] font-medium'
                : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
              }
            `}
          >
            <TrendingUp
              strokeWidth={isActive('/calculator') ? 2.5 : 2}
              className={`w-4 h-4 flex-shrink-0 transition-colors duration-300
                ${isActive('/roi-calculator') ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`}
            />
            <span className="hidden sm:inline">ROI</span>
          </Link>
        </nav>

        {/* ── Separator ── */}
        <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-white/[0.15] to-transparent mx-1 flex-shrink-0" aria-hidden="true" />

        {/* ── CORPORATE LINK ── */}
        <a
          href="https://flowtaris.com"
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative flex items-center gap-1.5 pl-4 pr-5 py-2.5 rounded-full
            bg-transparent border border-transparent
            hover:bg-white/[0.04]
            text-[13px] font-medium tracking-wide
            transition-all duration-300 ease-out group overflow-hidden
          "
        >
          {/* Subtle gold gradient text */}
          <span className="bg-gradient-to-br from-[#f0c97a] via-[#D4A847] to-[#b3852b] bg-clip-text text-transparent group-hover:brightness-110 transition-all duration-300 whitespace-nowrap">
            Corporate
          </span>
          <ArrowUpRight
            strokeWidth={2.5}
            className="w-3.5 h-3.5 text-[#D4A847]/70 group-hover:text-[#f0c97a] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-300 flex-shrink-0"
          />
        </a>
      </div>
    </header>
  )
}

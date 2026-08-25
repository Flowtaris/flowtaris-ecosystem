'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, BarChart3, CheckCircle2 } from 'lucide-react'

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

  const logoUrl   = config?.logoUrl   ?? '/images/flowtaris_logo.png'
  const brandName = config?.brandName ?? 'Flowtaris'
  const badgeText = config?.badgeText ?? '.ai'
  const showLogo  = config?.showLogo  !== false

  const isActive = (path: string) =>
    pathname === path || (pathname?.startsWith(path + '/') && path !== '/')

  return (
    <header
      className="fixed top-5 right-5 z-50 pointer-events-auto"
      role="banner"
      aria-label="Flowtaris AI — primary site navigation"
    >
      {/* ── Glassmorphism pill container ── */}
      <div
        className="
          flex items-center gap-1.5 p-1.5 rounded-full
          bg-[#05050a]/88 backdrop-blur-2xl
          border border-white/[0.08]
          shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.06)]
          animate-header-enter
        "
      >

        {/* ── BRAND: Logo + Name + .ai Badge ── */}
        <Link
          href="/"
          className="
            flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full
            hover:bg-white/[0.05] active:bg-white/[0.08]
            transition-all duration-200 ease-out group
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b8db]/60
          "
          aria-label="Flowtaris AI — go to homepage"
          title="Flowtaris AI — Enterprise AI Automation for Finance Teams"
        >
          {/* Logo mark — same Flowtaris 'F' emblem as flowtaris.com (unified brand) */}
          {showLogo && (
            <div
              className="
                relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden
                ring-1 ring-white/[0.12] group-hover:ring-[#D4A847]/45
                shadow-[0_0_0_0_rgba(212,168,71,0)] group-hover:shadow-[0_0_14px_rgba(212,168,71,0.22)]
                transition-all duration-300 ease-out
              "
              aria-hidden="true"
            >
              <Image
                src={logoUrl}
                alt="Flowtaris — navy and gold F emblem"
                fill
                sizes="32px"
                className="object-contain p-0.5"
                priority
              />
            </div>
          )}

          {/* Wordmark: brand name + platform qualifier badge */}
          <span className="flex items-baseline gap-0 select-none leading-none">
            {/* "Flowtaris" — the unified brand name, same as flowtaris.com */}
            <span className="text-white font-bold text-[13.5px] tracking-[-0.3px] font-sans">
              {brandName}
            </span>

            {/*
              ".ai" badge — This is a PRODUCT QUALIFIER, not a domain name written out.
              It signals: "This is Flowtaris's AI platform" — distinct from writing "Flowtaris.ai"
              which would read as a URL and confuse users / split brand perception.
              Styled as a badge to make the qualifier nature visually clear.
            */}
            <span
              className="
                relative inline-flex items-center ml-[3px] px-[5px] py-[2px] rounded
                bg-[#00b8db]/[0.14] border border-[#00b8db]/30
                text-[#00b8db] text-[10px] font-bold tracking-wide
                shadow-[0_0_8px_rgba(0,184,219,0.18)]
                group-hover:bg-[#00b8db]/[0.22] group-hover:shadow-[0_0_14px_rgba(0,184,219,0.32)]
                transition-all duration-300
              "
              aria-label="AI Platform — product qualifier"
              title="Flowtaris AI Platform — powered by Flowtaris.com"
            >
              {/* Live status dot */}
              <span
                className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px] rounded-full bg-[#00b8db] shadow-[0_0_5px_#00b8db] animate-badge-pulse"
                aria-hidden="true"
              />
              {badgeText}
            </span>
          </span>
        </Link>

        {/* ── Separator ── */}
        <div className="w-px h-5 bg-white/[0.08] mx-0.5 flex-shrink-0" aria-hidden="true" />

        {/* ── PRIMARY NAV ── */}
        <nav
          className="flex items-center gap-0.5"
          role="navigation"
          aria-label="Main navigation links"
        >
          {/* Assessment */}
          <Link
            href="/assessment"
            id="nav-assessment"
            className={`
              relative flex items-center gap-1.5 px-3.5 py-2 rounded-full
              text-[12.5px] font-medium transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b8db]/60
              group
              ${isActive('/assessment')
                ? 'text-[#00b8db] bg-[#00b8db]/[0.12] shadow-[inset_0_0_0_1px_rgba(0,184,219,0.25)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
              }
            `}
            aria-label="AI Readiness Assessment — evaluate your team's AI maturity"
            aria-current={isActive('/assessment') ? 'page' : undefined}
          >
            <CheckCircle2
              className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200
                ${isActive('/assessment') ? 'text-[#00b8db]' : 'text-neutral-500 group-hover:text-neutral-300'}`}
              aria-hidden="true"
            />
            <span className="hidden sm:inline whitespace-nowrap">Assessment</span>
            {isActive('/assessment') && (
              <span
                className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full bg-[#00b8db]/55"
                aria-hidden="true"
              />
            )}
          </Link>

          {/* ROI Calculator */}
          <Link
            href="/roi-calculator"
            id="nav-roi"
            className={`
              relative flex items-center gap-1.5 px-3.5 py-2 rounded-full
              text-[12.5px] font-medium transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b8db]/60
              group
              ${isActive('/roi-calculator')
                ? 'text-[#00b8db] bg-[#00b8db]/[0.12] shadow-[inset_0_0_0_1px_rgba(0,184,219,0.25)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
              }
            `}
            aria-label="ROI Calculator — estimate your AI automation return on investment"
            aria-current={isActive('/roi-calculator') ? 'page' : undefined}
          >
            <BarChart3
              className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200
                ${isActive('/roi-calculator') ? 'text-[#00b8db]' : 'text-neutral-500 group-hover:text-neutral-300'}`}
              aria-hidden="true"
            />
            <span className="hidden sm:inline whitespace-nowrap">ROI</span>
            {isActive('/roi-calculator') && (
              <span
                className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full bg-[#00b8db]/55"
                aria-hidden="true"
              />
            )}
          </Link>
        </nav>

        {/* ── Separator ── */}
        <div className="w-px h-5 bg-white/[0.08] mx-0.5 flex-shrink-0" aria-hidden="true" />

        {/* ── CORPORATE LINK → flowtaris.com ──
            No rel="nofollow" so we pass link equity to the parent domain.
            This reinforces brand unity and helps Google understand flowtaris.ai
            is a product of flowtaris.com, not a competing entity.
        */}
        <a
          href="https://flowtaris.com"
          target="_blank"
          rel="noopener noreferrer"
          id="nav-corporate"
          className="
            flex items-center gap-1.5 px-4 py-2 rounded-full
            bg-gradient-to-r from-[#D4A847]/[0.12] to-[#D4A847]/[0.05]
            border border-[#D4A847]/20
            hover:from-[#D4A847]/[0.2] hover:to-[#D4A847]/[0.1] hover:border-[#D4A847]/35
            text-[12.5px] font-semibold
            transition-all duration-200 ease-out group
            shadow-[0_0_0_0_rgba(212,168,71,0)] hover:shadow-[0_0_16px_rgba(212,168,71,0.1)]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A847]/60
          "
          aria-label="Visit Flowtaris Corporate — flowtaris.com (opens in new tab)"
          title="Flowtaris — Corporate headquarters and full product suite at flowtaris.com"
        >
          <span className="bg-gradient-to-r from-[#D4A847] via-[#e8b84b] to-[#f0c97a] bg-clip-text text-transparent whitespace-nowrap">
            Corporate
          </span>
          <ArrowUpRight
            className="w-[11px] h-[11px] text-[#D4A847]/55 group-hover:text-[#D4A847] group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-all duration-200 flex-shrink-0"
            aria-hidden="true"
          />
        </a>

      </div>
    </header>
  )
}

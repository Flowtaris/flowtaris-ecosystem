'use client';
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { getSiteConfig, updateSiteConfig } from '@/lib/supabase'
import { Upload, X, Eye, EyeOff, RefreshCw, CheckCircle2, AlertCircle, ImageIcon, Type, Tag } from 'lucide-react'

// ── Shared UI primitives ─────────────────────────────────────────────────────

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
  <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5">
    {children}
  </label>
)

const Hint = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs text-gray-400 mt-1">{children}</p>
)

const Input = ({
  id, label, value, onChange, placeholder, hint, type = 'text', disabled = false
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; hint?: string; type?: string; disabled?: boolean
}) => (
  <div className="mb-5">
    <Label htmlFor={id}>{label}</Label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3.5 py-2.5 text-sm
        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
        placeholder-gray-400 dark:placeholder-gray-500
        focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    />
    {hint && <Hint>{hint}</Hint>}
  </div>
)

const Textarea = ({
  id, label, value, onChange, rows = 4, placeholder, hint
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  rows?: number; placeholder?: string; hint?: string
}) => (
  <div className="mb-5">
    <Label htmlFor={id}>{label}</Label>
    <textarea
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3.5 py-2.5 text-sm
        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
        placeholder-gray-400 dark:placeholder-gray-500 font-mono
        focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
        transition-all resize-y"
    />
    {hint && <Hint>{hint}</Hint>}
  </div>
)

// ── Section Wrapper ───────────────────────────────────────────────────────────

const Section = ({ title, icon: Icon, children, accent = 'blue' }: {
  title: string; icon: React.ElementType; children: React.ReactNode; accent?: string
}) => {
  const accentClasses: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/40',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/40',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/40',
  }
  const iconClasses: Record<string, string> = {
    blue: 'text-blue-500',
    amber: 'text-amber-500',
    purple: 'text-purple-500',
  }
  return (
    <div className={`rounded-xl border p-6 ${accentClasses[accent] ?? accentClasses.blue} mb-6`}>
      <div className="flex items-center gap-2.5 mb-5">
        <Icon className={`w-5 h-5 ${iconClasses[accent] ?? iconClasses.blue}`} />
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">{title}</h2>
      </div>
      {children}
    </div>
  )
}

// ── Types ─────────────────────────────────────────────────────────────────────

type SiteConfigFormData = {
  site_name: string
  site_url: string
  tagline: string
  logo_url: string
  favicon_url: string
  header_brand_name: string
  header_badge_text: string
  header_show_logo: boolean
  navigation: string
  social_links: string
  contact_email: string
  support_email: string
  privacy_policy_url: string
  terms_of_service_url: string
  cookie_policy_url: string
  analytics: string
  seo: string
}

const DEFAULT_LOGO = '/images/flowtaris_logo.png'
const DEFAULTS: SiteConfigFormData = {
  site_name: 'Flowtaris AI',
  site_url: 'https://flowtaris.ai',
  tagline: 'Enterprise AI Automation for Finance',
  logo_url: DEFAULT_LOGO,
  favicon_url: '/favicon.ico',
  header_brand_name: 'Flowtaris',
  header_badge_text: '.ai',
  header_show_logo: true,
  navigation: '[]',
  social_links: '{}',
  contact_email: '',
  support_email: '',
  privacy_policy_url: '',
  terms_of_service_url: '',
  cookie_policy_url: '',
  analytics: '{}',
  seo: '{}',
}

// ── Logo Upload Component ─────────────────────────────────────────────────────

function LogoManager({
  logoUrl,
  showLogo,
  onLogoChange,
  onShowLogoChange,
}: {
  logoUrl: string
  showLogo: boolean
  onLogoChange: (url: string) => void
  onShowLogoChange: (show: boolean) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [urlInput, setUrlInput] = useState(logoUrl)
  const [previewError, setPreviewError] = useState(false)
  const [inputMode, setInputMode] = useState<'preview' | 'url'>('preview')

  const currentLogo = logoUrl || DEFAULT_LOGO
  const isDefault = !logoUrl || logoUrl === DEFAULT_LOGO

  const handleUrlCommit = () => {
    onLogoChange(urlInput.trim())
    setPreviewError(false)
    setInputMode('preview')
  }

  const handleRemove = () => {
    onLogoChange('')
    setUrlInput(DEFAULT_LOGO)
    setPreviewError(false)
  }

  const handleReset = () => {
    onLogoChange(DEFAULT_LOGO)
    setUrlInput(DEFAULT_LOGO)
    setPreviewError(false)
  }

  return (
    <div className="space-y-4">
      {/* Preview card */}
      <div className="flex items-start gap-5">
        {/* Logo preview box */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600
            bg-gray-50 dark:bg-gray-700/50 flex items-center justify-center overflow-hidden
            shadow-inner">
            {showLogo && !previewError ? (
              <Image
                src={currentLogo.startsWith('/') ? currentLogo : (currentLogo || DEFAULT_LOGO)}
                alt="Current logo preview"
                width={64}
                height={64}
                className="object-contain w-16 h-16"
                onError={() => setPreviewError(true)}
                unoptimized={currentLogo.startsWith('http')}
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-gray-300">
                <ImageIcon className="w-8 h-8" />
                <span className="text-[10px]">{showLogo ? 'Error' : 'Hidden'}</span>
              </div>
            )}
          </div>
          {/* Status badge */}
          <span className={`absolute -bottom-1.5 -right-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full border
            ${isDefault
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 border-gray-200 dark:border-gray-600'
              : 'bg-green-50 dark:bg-green-900/30 text-green-600 border-green-200 dark:border-green-700'
            }`}>
            {isDefault ? 'Default' : 'Custom'}
          </span>
        </div>

        {/* Logo info + actions */}
        <div className="flex-1 min-w-0">
          {/* Header preview */}
          <div className="mb-3 px-3 py-2.5 bg-[#05050a] rounded-lg flex items-center gap-2 w-fit">
            {showLogo && !previewError && (
              <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-white/20 flex-shrink-0">
                <Image
                  src={currentLogo.startsWith('/') ? currentLogo : (currentLogo || DEFAULT_LOGO)}
                  alt="Logo in header"
                  width={24}
                  height={24}
                  className="object-contain"
                  onError={() => setPreviewError(true)}
                  unoptimized={currentLogo.startsWith('http')}
                />
              </div>
            )}
            <span className="text-white text-xs font-bold">Flowtaris</span>
            <span className="text-[#00b8db] text-[10px] font-bold px-1 py-0.5 rounded bg-[#00b8db]/10 border border-[#00b8db]/25">.ai</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 truncate max-w-xs">
            {isDefault ? 'Using default Flowtaris logo' : (logoUrl || 'No logo set')}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setInputMode(inputMode === 'url' ? 'preview' : 'url')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400
                border border-blue-200 dark:border-blue-700/50
                hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              <Type className="w-3 h-3" />
              {inputMode === 'url' ? 'Cancel' : 'Set URL'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isDefault}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400
                border border-gray-200 dark:border-gray-600
                hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-3 h-3" />
              Reset to default
            </button>
            <button
              type="button"
              onClick={() => onShowLogoChange(!showLogo)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                border transition-colors
                ${showLogo
                  ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 border-amber-200 dark:border-amber-700/50 hover:bg-amber-100'
                  : 'bg-green-50 dark:bg-green-900/30 text-green-600 border-green-200 dark:border-green-700/50 hover:bg-green-100'
                }`}
            >
              {showLogo ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {showLogo ? 'Hide logo' : 'Show logo'}
            </button>
          </div>
        </div>
      </div>

      {/* URL input mode */}
      {inputMode === 'url' && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 space-y-3">
          <Label>Logo image URL</Label>
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              placeholder="https://... or /images/logo.png"
              className="flex-1 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
              onKeyDown={e => e.key === 'Enter' && handleUrlCommit()}
            />
            <button
              type="button"
              onClick={handleUrlCommit}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Apply
            </button>
          </div>
          <div className="flex items-center justify-between">
            <Hint>Paste an external URL or a path relative to /public</Hint>
            {logoUrl && !isDefault && (
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3" /> Remove custom logo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Header Live Preview ───────────────────────────────────────────────────────

function HeaderPreview({ brandName, badgeText, showLogo, logoUrl }: {
  brandName: string; badgeText: string; showLogo: boolean; logoUrl: string
}) {
  const [imgError, setImgError] = useState(false)
  const logo = logoUrl || DEFAULT_LOGO

  return (
    <div className="mt-4 p-4 bg-gray-900 rounded-xl border border-gray-700">
      <p className="text-xs text-gray-500 mb-3 uppercase tracking-widest font-semibold">Live Header Preview</p>
      <div className="flex justify-end">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#05050a] border border-white/10 shadow-xl">
          {/* Brand */}
          <div className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5">
            {showLogo && !imgError && (
              <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/15 flex-shrink-0">
                <Image
                  src={logo.startsWith('/') ? logo : (logo || DEFAULT_LOGO)}
                  alt="Logo preview"
                  width={28}
                  height={28}
                  className="object-contain"
                  onError={() => setImgError(true)}
                  unoptimized={logo.startsWith('http')}
                />
              </div>
            )}
            <span className="flex items-baseline gap-0.5">
              <span className="text-white font-bold text-[13px]">{brandName || 'Flowtaris'}</span>
              <span className="text-[#00b8db] text-[10px] font-bold px-1 py-0.5 rounded bg-[#00b8db]/10 border border-[#00b8db]/25 ml-0.5">
                {badgeText || '.ai'}
              </span>
            </span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-0.5">
            <div className="px-3 py-1.5 rounded-full text-[12px] text-neutral-400">Assessment</div>
            <div className="px-3 py-1.5 rounded-full text-[12px] text-neutral-400">ROI</div>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-[#D4A847]/20 bg-[#D4A847]/10">
            <span className="text-[#D4A847] text-[12px] font-semibold">Corporate</span>
            <span className="text-[#D4A847]/50 text-[10px]">↗</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function SiteConfigPage() {
  const [config, setConfig] = useState<SiteConfigFormData>(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const update = <K extends keyof SiteConfigFormData>(key: K, value: SiteConfigFormData[K]) =>
    setConfig(prev => ({ ...prev, [key]: value }))

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true)
        const data = await getSiteConfig()
        if (data) {
          setConfig({
            site_name: data.site_name || DEFAULTS.site_name,
            site_url: data.site_url || DEFAULTS.site_url,
            tagline: data.tagline || DEFAULTS.tagline,
            logo_url: data.logo_url || DEFAULTS.logo_url,
            favicon_url: data.favicon_url || DEFAULTS.favicon_url,
            // Extended header fields (may not exist in DB yet — use defaults)
            header_brand_name: (data as any).header_brand_name || DEFAULTS.header_brand_name,
            header_badge_text: (data as any).header_badge_text || DEFAULTS.header_badge_text,
            header_show_logo: (data as any).header_show_logo !== undefined
              ? (data as any).header_show_logo
              : DEFAULTS.header_show_logo,
            navigation: JSON.stringify(data.navigation ?? [], null, 2),
            social_links: JSON.stringify(data.social_links ?? {}, null, 2),
            contact_email: data.contact_email || '',
            support_email: data.support_email || '',
            privacy_policy_url: data.privacy_policy_url || '',
            terms_of_service_url: data.terms_of_service_url || '',
            cookie_policy_url: data.cookie_policy_url || '',
            analytics: JSON.stringify(data.analytics ?? {}, null, 2),
            seo: JSON.stringify(data.seo ?? {}, null, 2),
          })
        }
      } catch (err) {
        setError('Failed to load site configuration. Using defaults.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchConfig()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      let nav = [], social = {}, analytics = {}, seo = {}
      try { nav = JSON.parse(config.navigation) } catch { throw new Error('Navigation JSON is invalid') }
      try { social = JSON.parse(config.social_links) } catch { throw new Error('Social Links JSON is invalid') }
      try { analytics = JSON.parse(config.analytics) } catch { throw new Error('Analytics JSON is invalid') }
      try { seo = JSON.parse(config.seo) } catch { throw new Error('SEO JSON is invalid') }

      await updateSiteConfig({
        site_name: config.site_name,
        site_url: config.site_url,
        tagline: config.tagline,
        logo_url: config.logo_url,
        favicon_url: config.favicon_url,
        navigation: nav,
        social_links: social,
        contact_email: config.contact_email,
        support_email: config.support_email,
        privacy_policy_url: config.privacy_policy_url,
        terms_of_service_url: config.terms_of_service_url,
        cookie_policy_url: config.cookie_policy_url,
        analytics: analytics,
        seo: seo,
      } as any)

      setSuccess('Site configuration saved successfully!')
      setTimeout(() => setSuccess(null), 4000)
    } catch (err: any) {
      setError(err.message || 'Failed to save configuration')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-64">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          <span>Loading site configuration…</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Site Configuration</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your brand identity, header appearance, and global settings.</p>
      </div>

      {/* Status messages */}
      {error && (
        <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl mb-6">
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">

        {/* ── SECTION 1: LOGO & HEADER APPEARANCE ── */}
        <Section title="Logo & Header Appearance" icon={ImageIcon} accent="amber">
          <LogoManager
            logoUrl={config.logo_url}
            showLogo={config.header_show_logo}
            onLogoChange={v => update('logo_url', v)}
            onShowLogoChange={v => update('header_show_logo', v)}
          />

          <div className="border-t border-amber-200/50 dark:border-amber-700/30 my-5 pt-5 grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="header_brand_name">Brand name in header</Label>
              <input
                id="header_brand_name"
                type="text"
                value={config.header_brand_name}
                onChange={e => update('header_brand_name', e.target.value)}
                maxLength={30}
                placeholder="Flowtaris"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3.5 py-2.5 text-sm
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
              />
              <Hint>The main brand word shown next to the logo (e.g. "Flowtaris")</Hint>
            </div>
            <div>
              <Label htmlFor="header_badge_text">Platform badge text</Label>
              <input
                id="header_badge_text"
                type="text"
                value={config.header_badge_text}
                onChange={e => update('header_badge_text', e.target.value)}
                maxLength={10}
                placeholder=".ai"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-3.5 py-2.5 text-sm
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
              />
              <Hint>Qualifier shown as a badge next to brand name (e.g. ".ai", "Beta", "Pro")</Hint>
            </div>
          </div>

          {/* Live header preview */}
          <HeaderPreview
            brandName={config.header_brand_name}
            badgeText={config.header_badge_text}
            showLogo={config.header_show_logo}
            logoUrl={config.logo_url}
          />
        </Section>

        {/* ── SECTION 2: BASIC INFO ── */}
        <Section title="Site Identity & SEO Basics" icon={Tag} accent="blue">
          <Input
            id="site_name"
            label="Site name"
            value={config.site_name}
            onChange={v => update('site_name', v)}
            placeholder="Flowtaris AI"
            hint="Used in meta titles, OG tags, and schema.org Organization name"
          />
          <Input
            id="site_url"
            label="Site URL"
            value={config.site_url}
            onChange={v => update('site_url', v)}
            placeholder="https://flowtaris.ai"
            type="url"
            hint="Canonical base URL — used for all absolute links and sitemaps"
          />
          <Input
            id="tagline"
            label="Tagline"
            value={config.tagline}
            onChange={v => update('tagline', v)}
            placeholder="Enterprise AI Automation for Finance"
            hint="Short value proposition — used in meta descriptions and hero text"
          />
          <Input
            id="favicon_url"
            label="Favicon URL"
            value={config.favicon_url}
            onChange={v => update('favicon_url', v)}
            placeholder="/favicon.ico"
            hint="Path or URL to the site favicon (ICO, PNG, or SVG)"
          />
        </Section>

        {/* ── SECTION 3: CONTACT ── */}
        <Section title="Contact & Legal" icon={Type} accent="purple">
          <div className="grid grid-cols-2 gap-4">
            <Input id="contact_email" label="Contact email" value={config.contact_email}
              onChange={v => update('contact_email', v)} placeholder="hello@flowtaris.ai" type="email" />
            <Input id="support_email" label="Support email" value={config.support_email}
              onChange={v => update('support_email', v)} placeholder="support@flowtaris.ai" type="email" />
          </div>
          <Input id="privacy_policy_url" label="Privacy policy URL" value={config.privacy_policy_url}
            onChange={v => update('privacy_policy_url', v)} placeholder="https://flowtaris.com/privacy" />
          <Input id="terms_url" label="Terms of service URL" value={config.terms_of_service_url}
            onChange={v => update('terms_of_service_url', v)} placeholder="https://flowtaris.com/terms" />
          <Input id="cookie_url" label="Cookie policy URL" value={config.cookie_policy_url}
            onChange={v => update('cookie_policy_url', v)} placeholder="https://flowtaris.com/cookies" />
        </Section>

        {/* ── SECTION 4: JSON CONFIGS ── */}
        <Section title="Advanced Configuration (JSON)" icon={Tag} accent="blue">
          <Textarea id="navigation" label="Navigation (JSON)" value={config.navigation}
            onChange={v => update('navigation', v)} rows={5}
            hint="Array of nav link objects — updates the site navigation structure"
            placeholder='[{"label":"Capabilities","href":"/capabilities"}]' />
          <Textarea id="social_links" label="Social links (JSON)" value={config.social_links}
            onChange={v => update('social_links', v)} rows={5}
            hint='Object with social media URLs: {"linkedin":"https://...","twitter":"https://..."}'
            placeholder='{"linkedin":"","twitter":""}' />
          <Textarea id="analytics" label="Analytics config (JSON)" value={config.analytics}
            onChange={v => update('analytics', v)} rows={4}
            hint="GA4 measurement ID, GTM container, etc."
            placeholder='{"ga4_id":"G-XXXXXXXXXX"}' />
          <Textarea id="seo" label="SEO overrides (JSON)" value={config.seo}
            onChange={v => update('seo', v)} rows={6}
            hint="Global SEO settings — default OG image, robots directives, etc."
            placeholder='{"og_image":"/images/og-default.jpg"}' />
        </Section>

        {/* ── SUBMIT ── */}
        <div className="flex items-center justify-between pt-2 pb-8">
          <p className="text-xs text-gray-400">Changes take effect on next page load after saving.</p>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl
              bg-gradient-to-r from-blue-600 to-blue-700
              hover:from-blue-500 hover:to-blue-600
              text-white text-sm font-bold shadow-lg shadow-blue-500/20
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Save Configuration
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

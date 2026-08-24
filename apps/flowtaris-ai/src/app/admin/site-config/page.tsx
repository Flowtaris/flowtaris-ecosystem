'use client';
import { useEffect, useState } from 'react'
import { getSiteConfig, updateSiteConfig } from '@/lib/supabase'

// Simple UI components for admin panel (using Tailwind directly)
const SimpleButton = ({ children, type = 'submit', disabled = false, className = '' }: { children: React.ReactNode; type?: 'button' | 'submit' | 'reset'; disabled?: boolean; className?: string }) => (
  <button type={type} disabled={disabled} className={`bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white font-bold py-2 px-4 rounded ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
    {children}
  </button>
)

const SimpleInput = ({ label, value, onChange, className = '' }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e)}
      className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-cyan-500 ${className}`}
    />
  </div>
)

const SimpleTextarea = ({ label, value, onChange, className = '', rows = 4, placeholder = '' }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; className?: string; rows?: number; placeholder?: string }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={e => onChange(e)}
      className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-cyan-500 ${className}`}
      rows={rows}
      placeholder={placeholder}
    />
  </div>
)

type SiteConfigFormData = {
  site_name: string
  site_url: string
  tagline: string
  logo_url: string
  favicon_url: string
  navigation: string // JSON string
  social_links: string // JSON string
  contact_email: string
  support_email: string
  privacy_policy_url: string
  terms_of_service_url: string
  cookie_policy_url: string
  analytics: string // JSON string
  seo: string // JSON string
}

export default function SiteConfigPage() {
  const [config, setConfig] = useState<SiteConfigFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Fetch site config on load
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true)
        const data = await getSiteConfig()
        // Convert the data to our form format, ensuring JSON fields are strings
        const formData: SiteConfigFormData = {
          site_name: data.site_name || '',
          site_url: data.site_url || '',
          tagline: data.tagline || '',
          logo_url: data.logo_url || '',
          favicon_url: data.favicon_url || '',
          navigation: JSON.stringify(data.navigation, null, 2),
          social_links: JSON.stringify(data.social_links, null, 2),
          contact_email: data.contact_email || '',
          support_email: data.support_email || '',
          privacy_policy_url: data.privacy_policy_url || '',
          terms_of_service_url: data.terms_of_service_url || '',
          cookie_policy_url: data.cookie_policy_url || '',
          analytics: JSON.stringify(data.analytics, null, 2),
          seo: JSON.stringify(data.seo, null, 2),
        }
        setConfig(formData)
      } catch (err: any) {
        setError('Failed to load site configuration')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!config) return

    try {
      setError(null)
      setSuccess(null)

      // Parse JSON fields back to objects
      const updateData = {
        site_name: config.site_name,
        site_url: config.site_url,
        tagline: config.tagline,
        logo_url: config.logo_url,
        favicon_url: config.favicon_url,
        navigation: JSON.parse(config.navigation),
        social_links: JSON.parse(config.social_links),
        contact_email: config.contact_email,
        support_email: config.support_email,
        privacy_policy_url: config.privacy_policy_url,
        terms_of_service_url: config.terms_of_service_url,
        cookie_policy_url: config.cookie_policy_url,
        analytics: JSON.parse(config.analytics),
        seo: JSON.parse(config.seo),
      }

      await updateSiteConfig(updateData)
      setSuccess('Site configuration updated successfully!')
    } catch (err: any) {
      setError('Failed to update site configuration')
      console.error(err)
    }
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Site Configuration
      </h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <SimpleInput
          label="Site Name"
          value={config?.site_name ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, site_name: e.target.value } : null)}
        />
        <SimpleInput
          label="Site URL"
          value={config?.site_url ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, site_url: e.target.value } : null)}
        />
        <SimpleTextarea
          label="Tagline"
          value={config?.tagline ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, tagline: e.target.value } : null)}
        />
        <SimpleInput
          label="Logo URL"
          value={config?.logo_url ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, logo_url: e.target.value } : null)}
        />
        <SimpleInput
          label="Favicon URL"
          value={config?.favicon_url ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, favicon_url: e.target.value } : null)}
        />
        <SimpleTextarea
          label="Navigation (JSON)"
          value={config?.navigation ?? '[]'}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, navigation: e.target.value } : null)}
        />
        <SimpleTextarea
          label="Social Links (JSON)"
          value={config?.social_links ?? '{}'}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, social_links: e.target.value } : null)}
        />
        <SimpleInput
          label="Contact Email"
          value={config?.contact_email ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, contact_email: e.target.value } : null)}
        />
        <SimpleInput
          label="Support Email"
          value={config?.support_email ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, support_email: e.target.value } : null)}
        />
        <SimpleInput
          label="Privacy Policy URL"
          value={config?.privacy_policy_url ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, privacy_policy_url: e.target.value } : null)}
        />
        <SimpleInput
          label="Terms of Service URL"
          value={config?.terms_of_service_url ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, terms_of_service_url: e.target.value } : null)}
        />
        <SimpleInput
          label="Cookie Policy URL"
          value={config?.cookie_policy_url ?? ''}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, cookie_policy_url: e.target.value } : null)}
        />
        <SimpleTextarea
          label="Analytics (JSON)"
          value={config?.analytics ?? '{}'}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, analytics: e.target.value } : null)}
        />
        <SimpleTextarea
          label="SEO (JSON)"
          value={config?.seo ?? '{}'}
          onChange={(e) => setConfig((prev) => prev ? { ...prev, seo: e.target.value } : null)}
        />
        <div className="flex justify-end">
          <SimpleButton type="submit">Save Changes</SimpleButton>
        </div>
      </form>
    </div>
  )
}

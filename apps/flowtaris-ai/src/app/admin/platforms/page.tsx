'use client';
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPlatformPages } from '@/lib/supabase'

// Simple UI components for admin panel (using Tailwind directly)
const SimpleButton = ({ children, type = 'button', disabled = false, className = '' }: { children: React.ReactNode; type?: 'button' | 'submit' | 'reset'; disabled?: boolean; className?: string }) => (
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

type PlatformPageFormData = {
  id: string
  slug: string
  name: string
  tagline: string
  category: string
  maturity: string
  logo_emoji: string
  short_description: string
  description: string
  capabilities: string // JSON string
  integrations: string // JSON string
  certifications: string // JSON string
  case_study_ids: string // JSON string (array of UUIDs)
  demo_url: string
  docs_url: string
  metrics: string // JSON string
  faq: string // JSON string
  architecture: string // JSON string
  seo: string // JSON string
}

export default function PlatformsPage() {
  const [platforms, setPlatforms] = useState<PlatformPageFormData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch platforms on load
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        setLoading(true)
        const data = await getPlatformPages()
        // Convert the data to our form format, ensuring JSON fields are strings and handling UUID arrays
        const formData: PlatformPageFormData[] = data.map((platform: any) => ({
          id: platform.id,
          slug: platform.slug || '',
          name: platform.name || '',
          tagline: platform.tagline || '',
          category: platform.category || '',
          maturity: platform.maturity || '',
          logo_emoji: platform.logo_emoji || '',
          short_description: platform.short_description || '',
          description: platform.description || '',
          capabilities: JSON.stringify(platform.capabilities, null, 2),
          integrations: JSON.stringify(platform.integrations, null, 2),
          certifications: JSON.stringify(platform.certifications, null, 2),
          case_study_ids: JSON.stringify(platform.case_study_ids || []),
          demo_url: platform.demo_url || '',
          docs_url: platform.docs_url || '',
          metrics: JSON.stringify(platform.metrics, null, 2),
          faq: JSON.stringify(platform.faq, null, 2),
          architecture: JSON.stringify(platform.architecture, null, 2),
          seo: JSON.stringify(platform.seo, null, 2),
        }))
        setPlatforms(formData)
      } catch (err: any) {
        setError('Failed to load platforms')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlatforms()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Platforms
        </h1>
        <Link href="/admin/platforms/new" className="bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white font-bold py-2 px-4 rounded">
          New Platform
        </Link>
      </div>
      
      {platforms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No platforms found. Create your first platform.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {platforms.map((platform) => (
            <div key={platform.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{platform.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <span className="bg-brand-cyan-100 text-brand-cyan-800 text-xs px-2 py-1 rounded">{platform.category}</span>
                    <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">{platform.maturity}</span>
                  </p>
                  {platform.tagline && <p className="text-body-sm text-gray-600 dark:text-gray-300">{platform.tagline}</p>}
                </div>
                <div className="space-x-2">
                  <Link href={`/platforms/${platform.id}/edit`} className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Slug: <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">{platform.slug}</code>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

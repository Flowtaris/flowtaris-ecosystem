'use client';
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getPlatformPageById, updatePlatformPage } from '@/lib/supabase'

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

const SimpleSelect = ({ label, value, onChange, options, className = '' }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: Array<{ value: string; label: string }>; className?: string }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e)}
      className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-cyan-500 ${className}`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

// Default category and maturity options (matching Sanity schema)
const CATEGORY_OPTIONS = [
  { value: 'ERP', label: 'ERP' },
  { value: 'BSM', label: 'BSM' },
  { value: 'ERP/HCM', label: 'ERP/HCM' },
  { value: 'Hybrid', label: 'Hybrid' }
]

const MATURITY_OPTIONS = [
  { value: 'production', label: 'Production Ready' },
  { value: 'pilot', label: 'Pilot / Beta' },
  { value: 'beta', label: 'Beta' },
  { value: 'research', label: 'Research / Alpha' }
]

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

export default function EditPlatformPage() {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<PlatformPageFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Fetch platform page data on load
  useEffect(() => {
    const fetchPlatformPage = async () => {
      if (!id) return
      try {
        setLoading(true)
        const data = await getPlatformPageById(id)
        if (data) {
          // Convert the data to our form format, ensuring JSON fields are strings and handling UUID arrays
          const formData: PlatformPageFormData = {
            id: data.id,
            slug: data.slug || '',
            name: data.name || '',
            tagline: data.tagline || '',
            category: data.category || 'ERP',
            maturity: data.maturity || 'production',
            logo_emoji: data.logo_emoji || '',
            short_description: data.short_description || '',
            description: data.description || '',
            capabilities: JSON.stringify(data.capabilities || [], null, 2),
            integrations: JSON.stringify(data.integrations || [], null, 2),
            certifications: JSON.stringify(data.certifications || [], null, 2),
            case_study_ids: JSON.stringify(data.case_study_ids || []),
            demo_url: data.demo_url || '',
            docs_url: data.docs_url || '',
            metrics: JSON.stringify(data.metrics || {}, null, 2),
            faq: JSON.stringify(data.faq || [], null, 2),
            architecture: JSON.stringify(data.architecture || [], null, 2),
            seo: JSON.stringify(data.seo || {}, null, 2)
          }
          setFormData(formData)
        } else {
          setError('Platform page not found')
        }
      } catch (err: any) {
        setError('Failed to load platform page')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlatformPage()
  }, [id])

  const handleChange = (field: keyof PlatformPageFormData, value: string) => {
    if (formData) {
      setFormData(prev => prev ? ({ ...prev, [field]: value }) : null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return

    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      // Prepare data for update
      const platformPageData = {
        slug: formData.slug,
        name: formData.name,
        tagline: formData.tagline,
        category: formData.category,
        maturity: formData.maturity,
        logo_emoji: formData.logo_emoji,
        short_description: formData.short_description,
        description: formData.description,
        capabilities: JSON.parse(formData.capabilities),
        integrations: JSON.parse(formData.integrations),
        certifications: JSON.parse(formData.certifications),
        case_study_ids: JSON.parse(formData.case_study_ids),
        demo_url: formData.demo_url,
        docs_url: formData.docs_url,
        metrics: JSON.parse(formData.metrics),
        faq: JSON.parse(formData.faq),
        architecture: JSON.parse(formData.architecture),
        seo: JSON.parse(formData.seo)
      }

      // Update the platform page
      await updatePlatformPage(id, platformPageData)
      setSuccess('Platform page updated successfully!')

      // Redirect to platforms list after a short delay
      setTimeout(() => {
        router.push('/admin/platforms')
      }, 1500)
    } catch (err: any) {
      setError('Failed to update platform page')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
  if (!formData) return <div className="p-6">No data to display</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Edit Platform Page
        </h1>
        <a href="/admin/platforms" className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
          ← Back to Platforms
        </a>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SimpleInput
          label="Platform Name *"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <SimpleInput
          label="Slug *"
          value={formData.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
        />
        <SimpleInput
          label="Tagline"
          value={formData.tagline}
          onChange={(e) => handleChange('tagline', e.target.value)}
        />
        <SimpleSelect
          label="Category *"
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
          options={CATEGORY_OPTIONS}
        />
        <SimpleSelect
          label="Maturity Level *"
          value={formData.maturity}
          onChange={(e) => handleChange('maturity', e.target.value)}
          options={MATURITY_OPTIONS}
        />
        <SimpleInput
          label="Logo Emoji"
          value={formData.logo_emoji}
          onChange={(e) => handleChange('logo_emoji', e.target.value)}
        />
        <SimpleInput
          label="Short Description"
          value={formData.short_description}
          onChange={(e) => handleChange('short_description', e.target.value)}
        />
        <SimpleTextarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={6}
        />
        <SimpleTextarea
          label="Capabilities (JSON Array of objects)"
          value={formData.capabilities}
          onChange={(e) => handleChange('capabilities', e.target.value)}
        />
        <SimpleTextarea
          label="Integrations (JSON Array of objects)"
          value={formData.integrations}
          onChange={(e) => handleChange('integrations', e.target.value)}
        />
        <SimpleTextarea
          label="Certifications (JSON Array of strings)"
          value={formData.certifications}
          onChange={(e) => handleChange('certifications', e.target.value)}
        />
        <SimpleTextarea
          label="Case Study IDs (JSON Array of UUIDs)"
          value={formData.case_study_ids}
          onChange={(e) => handleChange('case_study_ids', e.target.value)}
        />
        <SimpleInput
          label="Demo URL"
          value={formData.demo_url}
          onChange={(e) => handleChange('demo_url', e.target.value)}
        />
        <SimpleInput
          label="Documentation URL"
          value={formData.docs_url}
          onChange={(e) => handleChange('docs_url', e.target.value)}
        />
        <SimpleTextarea
          label="Metrics (JSON Object)"
          value={formData.metrics}
          onChange={(e) => handleChange('metrics', e.target.value)}
        />
        <SimpleTextarea
          label="FAQ (JSON Array of {q, a} objects)"
          value={formData.faq}
          onChange={(e) => handleChange('faq', e.target.value)}
        />
        <SimpleTextarea
          label="Architecture (JSON Array of {layer, tech, detail} objects)"
          value={formData.architecture}
          onChange={(e) => handleChange('architecture', e.target.value)}
        />
        <SimpleTextarea
          label="SEO (JSON Object)"
          value={formData.seo}
          onChange={(e) => handleChange('seo', e.target.value)}
        />
        <div className="flex justify-end">
          <SimpleButton type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Platform Page'}
          </SimpleButton>
        </div>
      </form>
    </div>
  )
}

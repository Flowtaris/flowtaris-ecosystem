import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getPlatformPages, createPlatformPage } from '@/lib/supabase'

// Simple UI components for admin panel (using Tailwind directly)
const SimpleButton = ({ children, type = 'submit', className = '' }: { children: React.ReactNode; type?: string; className?: string }) => (
  <button type={type} className={`bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white font-bold py-2 px-4 rounded ${className}`}>
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

const SimpleTextarea = ({ label, value, onChange, className = '' }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; className?: string }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={e => onChange(e)}
      className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-cyan-500 ${className}`}
      rows={4}
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

// Default category and maturity options
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

type NewPlatformFormData = {
  name: string
  slug: string
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

export default function NewPlatformPage() {
  const [formData, setFormData] = useState<NewPlatformFormData>({
    name: '',
    slug: '',
    tagline: '',
    category: 'ERP',
    maturity: 'production',
    logo_emoji: '',
    short_description: '',
    description: '',
    capabilities: '[]',
    integrations: '[]',
    certifications: '[]',
    case_study_ids: '[]',
    demo_url: '',
    docs_url: '',
    metrics: '{}',
    faq: '[]',
    architecture: '[]',
    seo: '{}'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (field: keyof NewPlatformFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      // Generate slug from name if not provided
      const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

      // Prepare data for insertion
      const platformData = {
        name: formData.name,
        slug: slug,
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

      // Create the platform
      await createPlatformPage(platformData)
      setSuccess('Platform created successfully!')

      // Redirect to platforms list after a short delay
      setTimeout(() => {
        router.push('/admin/platforms')
      }, 1500)
    } catch (err: any) {
      setError('Failed to create platform')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          New Platform
        </h1>
        <a href="/admin/admin/platforms" className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
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
          label="Slug (auto-generated from name if empty)"
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
          label="Logo Emoji (e.g., 💻, 📊, ⚡)"
          value={formData.logo_emoji}
          onChange={(e) => handleChange('logo_emoji', e.target.value)}
        />
        <SimpleTextarea
          label="Short Description"
          value={formData.short_description}
          onChange={(e) => handleChange('short_description', e.target.value)}
        />
        <SimpleTextarea
          label="Full Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={6}
        />
        <SimpleTextarea
          label="Capabilities (JSON Array)"
          value={formData.capabilities}
          onChange={(e) => handleChange('capabilities', e.target.value)}
        />
        <SimpleTextarea
          label="Integrations (JSON Array)"
          value={formData.integrations}
          onChange={(e) => handleChange('integrations', e.target.value)}
        />
        <SimpleTextarea
          label="Certifications (JSON Array)"
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
            {loading ? 'Creating...' : 'Create Platform'}
          </SimpleButton>
        </div>
      </form>
    </div>
  )
}

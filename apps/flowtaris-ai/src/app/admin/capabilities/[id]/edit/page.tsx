'use client';
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getAICapabilityById, updateAICapability } from '@/lib/supabase'

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

// Default category and maturity options (matching Sanity schema)
const CATEGORY_OPTIONS = [
  { value: 'Document Intelligence', label: 'Document Intelligence' },
  { value: 'Workflow Automation', label: 'Workflow Automation' },
  { value: 'Analytics & Forecasting', label: 'Analytics & Forecasting' },
  { value: 'Governance & Compliance', label: 'Governance & Compliance' },
  { value: 'Integration & Monitoring', label: 'Integration & Monitoring' }
]

const MATURITY_OPTIONS = [
  { value: 'production', label: 'Production Ready' },
  { value: 'pilot', label: 'Pilot / Beta' },
  { value: 'beta', label: 'Beta' },
  { value: 'research', label: 'Research / Alpha' }
]

type AICapabilityFormData = {
  id: string
  name: string
  slug: string
  category: string
  maturity: string
  short_description: string
  description: string
  icon: string
  key_metrics: string // JSON string
  features: string // JSON string
  use_cases: string // JSON string
  supported_platform_ids: string // JSON string (array of UUIDs)
  timeline: string
  prerequisites: string // JSON string
  demo_url: string
  docs_url: string
  related_capability_ids: string // JSON string (array of UUIDs)
  case_study_ids: string // JSON string (array of UUIDs)
  seo: string // JSON string
}

export default function EditCapabilityPage() {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<AICapabilityFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Fetch capability data on load
  useEffect(() => {
    const fetchAICapability = async () => {
      if (!id) return
      try {
        setLoading(true)
        const data = await getAICapabilityById(id)
        if (data) {
          // Convert the data to our form format, ensuring JSON fields are strings and handling UUID arrays
          const formData: AICapabilityFormData = {
            id: data.id,
            name: data.name || '',
            slug: data.slug || '',
            category: data.category || 'Document Intelligence',
            maturity: data.maturity || 'production',
            short_description: data.short_description || '',
            description: data.description || '',
            icon: data.icon || '',
            key_metrics: JSON.stringify(data.key_metrics || [], null, 2),
            features: JSON.stringify(data.features || [], null, 2),
            use_cases: JSON.stringify(data.use_cases || [], null, 2),
            supported_platform_ids: JSON.stringify(data.supported_platform_ids || []),
            timeline: data.timeline || '',
            prerequisites: JSON.stringify(data.prerequisites || [], null, 2),
            demo_url: data.demo_url || '',
            docs_url: data.docs_url || '',
            related_capability_ids: JSON.stringify(data.related_capability_ids || []),
            case_study_ids: JSON.stringify(data.case_study_ids || []),
            seo: JSON.stringify(data.seo || {}, null, 2)
          }
          setFormData(formData)
        } else {
          setError('Capability not found')
        }
      } catch (err: any) {
        setError('Failed to load capability')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAICapability()
  }, [id])

  const handleChange = (field: keyof AICapabilityFormData, value: string) => {
    if (formData) {
      setFormData(prev => ({ ...prev, [field]: value }))
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
      const capabilityData = {
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        maturity: formData.maturity,
        short_description: formData.short_description,
        description: formData.description,
        icon: formData.icon,
        key_metrics: JSON.parse(formData.key_metrics),
        features: JSON.parse(formData.features),
        use_cases: JSON.parse(formData.use_cases),
        supported_platform_ids: JSON.parse(formData.supported_platform_ids),
        timeline: formData.timeline,
        prerequisites: JSON.parse(formData.prerequisites),
        demo_url: formData.demo_url,
        docs_url: formData.docs_url,
        related_capability_ids: JSON.parse(formData.related_capability_ids),
        case_study_ids: JSON.parse(formData.case_study_ids),
        seo: JSON.parse(formData.seo)
      }

      // Update the capability
      await updateAICapability(id, capabilityData)
      setSuccess('Capability updated successfully!')

      // Redirect to capabilities list after a short delay
      setTimeout(() => {
        router.push('/admin/capabilities')
      }, 1500)
    } catch (err: any) {
      setError('Failed to update capability')
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
          Edit Capability
        </h1>
        <a href="/admin/capabilities" className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
          ← Back to Capabilities
        </a>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SimpleInput
          label="Capability Name *"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <SimpleInput
          label="Slug *"
          value={formData.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
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
          label="Icon (Emoji or Lucide name)"
          value={formData.icon}
          onChange={(e) => handleChange('icon', e.target.value)}
        />
        <SimpleInput
          label="Short Description *"
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
          label="Key Metrics (JSON Array of {label, value} objects)"
          value={formData.key_metrics}
          onChange={(e) => handleChange('key_metrics', e.target.value)}
        />
        <SimpleTextarea
          label="Features (JSON Array of strings)"
          value={formData.features}
          onChange={(e) => handleChange('features', e.target.value)}
        />
        <SimpleTextarea
          label="Use Cases (JSON Array of strings)"
          value={formData.use_cases}
          onChange={(e) => handleChange('use_cases', e.target.value)}
        />
        {/* For simplicity, we are using a text area for UUID arrays. In a real app, we would use a multi-select. */}
        <SimpleTextarea
          label="Supported Platform IDs (JSON Array of UUIDs)"
          value={formData.supported_platform_ids}
          onChange={(e) => handleChange('supported_platform_ids', e.target.value)}
        />
        <SimpleInput
          label="Timeline (e.g., 'Q1 2024 - Q3 2024')"
          value={formData.timeline}
          onChange={(e) => handleChange('timeline', e.target.value)}
        />
        <SimpleTextarea
          label="Prerequisites (JSON Array of strings)"
          value={formData.prerequisites}
          onChange={(e) => handleChange('prerequisites', e.target.value)}
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
        {/* For related capabilities and case studies, we are using text areas for UUID arrays. */}
        <SimpleTextarea
          label="Related Capability IDs (JSON Array of UUIDs)"
          value={formData.related_capability_ids}
          onChange={(e) => handleChange('related_capability_ids', e.target.value)}
        />
        <SimpleTextarea
          label="Case Study IDs (JSON Array of UUIDs)"
          value={formData.case_study_ids}
          onChange={(e) => handleChange('case_study_ids', e.target.value)}
        />
        <SimpleTextarea
          label="SEO (JSON Object)"
          value={formData.seo}
          onChange={(e) => handleChange('seo', e.target.value)}
        />
        <div className="flex justify-end">
          <SimpleButton type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Capability'}
          </SimpleButton>
        </div>
      </form>
    </div>
  )
}

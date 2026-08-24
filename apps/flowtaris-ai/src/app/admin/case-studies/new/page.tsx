'use client';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCaseStudies, getAICapabilities, createCaseStudy } from '@/lib/supabase'

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

// Default industry options (common ERP/BSM industries)
const INDUSTRY_OPTIONS = [
  { value: 'Financial Services', label: 'Financial Services' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Education', label: 'Education' },
  { value: 'Government', label: 'Government' },
  { value: 'Non-Profit', label: 'Non-Profit' },
  { value: 'Other', label: 'Other' }
]

type NewCaseStudyFormData = {
  title: string
  slug: string
  client: string
  industry: string
  platforms: string // JSON string
  challenge: string
  solution: string
  results: string // JSON string
  timeline: string
  testimonial: string
  hero_image_url: string
  seo: string // JSON string
  geo_signals: string // JSON string
  related_capability_ids: string // JSON string (array of UUIDs)
}

export default function NewCaseStudyPage() {
  const [formData, setFormData] = useState<NewCaseStudyFormData>({
    title: '',
    slug: '',
    client: '',
    industry: 'Financial Services',
    platforms: '[]',
    challenge: '',
    solution: '',
    results: '[]',
    timeline: '',
    testimonial: '',
    hero_image_url: '',
    seo: '{}',
    geo_signals: '{}',
    related_capability_ids: '[]'
  })
  const [capabilities, setCapabilities] = useState<Array<{id: string; name: string}>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Fetch capabilities for the related_capability_ids multi-select
  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const data = await getAICapabilities()
        setCapabilities(data.map((c: any) => ({ id: c.id, name: c.name })))
      } catch (err) {
        console.error('Failed to load capabilities:', err)
      }
    }
    fetchCapabilities()
  }, [])

  const handleChange = (field: keyof NewCaseStudyFormData, value: string) => {
    setFormData(prev => prev ? ({ ...prev, [field]: value }) : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      // Generate slug from title if not provided
      const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

      // Prepare data for insertion
      const caseStudyData = {
        title: formData.title,
        slug: slug,
        client: formData.client,
        industry: formData.industry,
        platforms: JSON.parse(formData.platforms),
        challenge: formData.challenge,
        solution: formData.solution,
        results: JSON.parse(formData.results),
        timeline: formData.timeline,
        testimonial: formData.testimonial,
        hero_image_url: formData.hero_image_url,
        seo: JSON.parse(formData.seo),
        geo_signals: JSON.parse(formData.geo_signals),
        related_capability_ids: JSON.parse(formData.related_capability_ids)
      }

      // Create the case study
      await createCaseStudy(caseStudyData)
      setSuccess('Case study created successfully!')

      // Redirect to case studies list after a short delay
      setTimeout(() => {
        router.push('/admin/case-studies')
      }, 1500)
    } catch (err: any) {
      setError('Failed to create case study')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          New Case Study
        </h1>
        <a href="/admin/admin/case-studies" className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
          ← Back to Case Studies
        </a>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SimpleInput
          label="Case Study Title *"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <SimpleInput
          label="Slug (auto-generated from title if empty)"
          value={formData.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
        />
        <SimpleInput
          label="Client Name *"
          value={formData.client}
          onChange={(e) => handleChange('client', e.target.value)}
        />
        <SimpleSelect
          label="Industry"
          value={formData.industry}
          onChange={(e) => handleChange('industry', e.target.value)}
          options={INDUSTRY_OPTIONS}
        />
        <SimpleTextarea
          label="Platforms (JSON Array of strings)"
          value={formData.platforms}
          onChange={(e) => handleChange('platforms', e.target.value)}
        />
        <SimpleTextarea
          label="Challenge *"
          value={formData.challenge}
          onChange={(e) => handleChange('challenge', e.target.value)}
          rows={4}
        />
        <SimpleTextarea
          label="Solution *"
          value={formData.solution}
          onChange={(e) => handleChange('solution', e.target.value)}
          rows={4}
        />
        <SimpleTextarea
          label="Results (JSON Array of objects)"
          value={formData.results}
          onChange={(e) => handleChange('results', e.target.value)}
        />
        <SimpleInput
          label="Timeline (e.g., 'Q1 2024')"
          value={formData.timeline}
          onChange={(e) => handleChange('timeline', e.target.value)}
        />
        <SimpleTextarea
          label="Testimonial"
          value={formData.testimonial}
          onChange={(e) => handleChange('testimonial', e.target.value)}
          rows={3}
        />
        <SimpleInput
          label="Hero Image URL"
          value={formData.hero_image_url}
          onChange={(e) => handleChange('hero_image_url', e.target.value)}
        />
        <SimpleTextarea
          label="SEO (JSON Object)"
          value={formData.seo}
          onChange={(e) => handleChange('seo', e.target.value)}
        />
        <SimpleTextarea
          label="GEO Signals (JSON Object)"
          value={formData.geo_signals}
          onChange={(e) => handleChange('geo_signals', e.target.value)}
        />
        {/* For related capabilities, we are using a text area for UUID arrays. */}
        <SimpleTextarea
          label="Related Capability IDs (JSON Array of UUIDs)"
          value={formData.related_capability_ids}
          onChange={(e) => handleChange('related_capability_ids', e.target.value)}
        />
        <div className="flex justify-end">
          <SimpleButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Case Study'}
          </SimpleButton>
        </div>
      </form>
    </div>
  )
}

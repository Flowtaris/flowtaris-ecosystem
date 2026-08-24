'use client';
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getCaseStudyById, updateCaseStudy } from '@/lib/supabase'

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

type CaseStudyFormData = {
  id: string
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

export default function EditCaseStudyPage() {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<CaseStudyFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Fetch case study data on load
  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!id) return
      try {
        setLoading(true)
        const data = await getCaseStudyById(id)
        if (data) {
          // Convert the data to our form format, ensuring JSON fields are strings and handling UUID arrays
          const formData: CaseStudyFormData = {
            id: data.id,
            title: data.title || '',
            slug: data.slug || '',
            client: data.client || '',
            industry: data.industry || 'Financial Services',
            platforms: JSON.stringify(data.platforms || [], null, 2),
            challenge: data.challenge || '',
            solution: data.solution || '',
            results: JSON.stringify(data.results || [], null, 2),
            timeline: data.timeline || '',
            testimonial: data.testimonial || '',
            hero_image_url: data.hero_image_url || '',
            seo: JSON.stringify(data.seo || {}, null, 2),
            geo_signals: JSON.stringify(data.geo_signals || {}, null, 2),
            related_capability_ids: JSON.stringify(data.related_capability_ids || [])
          }
          setFormData(formData)
        } else {
          setError('Case study not found')
        }
      } catch (err: any) {
        setError('Failed to load case study')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudy()
  }, [id])

  const handleChange = (field: keyof CaseStudyFormData, value: string) => {
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
      const caseStudyData = {
        title: formData.title,
        slug: formData.slug,
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

      // Update the case study
      await updateCaseStudy(id, caseStudyData)
      setSuccess('Case study updated successfully!')

      // Redirect to case studies list after a short delay
      setTimeout(() => {
        router.push('/admin/case-studies')
      }, 1500)
    } catch (err: any) {
      setError('Failed to update case study')
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
          Edit Case Study
        </h1>
        <a href="/admin/case-studies" className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
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
          label="Slug *"
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
            {loading ? 'Updating...' : 'Update Case Study'}
          </SimpleButton>
        </div>
      </form>
    </div>
  )
}

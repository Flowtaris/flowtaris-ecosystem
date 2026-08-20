import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getInsights, getAICapabilities, createInsight } from '@/lib/supabase'

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

// Default topic cluster options (common AI/tech topics)
const TOPIC_CLUSTER_OPTIONS = [
  { value: 'AI Automation', label: 'AI Automation' },
  { value: 'Document Intelligence', label: 'Document Intelligence' },
  { value: 'Workflow Automation', label: 'Workflow Automation' },
  { value: 'Predictive Analytics', label: 'Predictive Analytics' },
  { value: 'ERP Systems', label: 'ERP Systems' },
  { value: 'Finance Transformation', label: 'Finance Transformation' },
  { value: 'AI Governance', label: 'AI Governance' },
  { value: 'Digital Transformation', label: 'Digital Transformation' }
]

type NewInsightFormData = {
  title: string
  slug: string
  author: string
  excerpt: string
  rich_text: string // JSON string (portable text)
  topic_clusters: string // JSON string
  faq_items: string // JSON string
  citations: string // JSON string
  related_capability_ids: string // JSON string (array of UUIDs)
  published_at: string | null
  seo: string // JSON string
  geo_signals: string // JSON string
}

export default function NewInsightPage() {
  const [formData, setFormData] = useState<NewInsightFormData>({
    title: '',
    slug: '',
    author: '',
    excerpt: '',
    rich_text: '{}',
    topic_clusters: '[]',
    faq_items: '[]',
    citations: '[]',
    related_capability_ids: '[]',
    published_at: null,
    seo: '{}',
    geo_signals: '{}'
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

  const handleChange = (field: keyof NewInsightFormData, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
      const insightData = {
        title: formData.title,
        slug: slug,
        author: formData.author,
        excerpt: formData.excerpt,
        rich_text: JSON.parse(formData.rich_text),
        topic_clusters: JSON.parse(formData.topic_clusters),
        faq_items: JSON.parse(formData.faq_items),
        citations: JSON.parse(formData.citations),
        related_capability_ids: JSON.parse(formData.related_capability_ids),
        published_at: formData.published_at,
        seo: JSON.parse(formData.seo),
        geo_signals: JSON.parse(formData.geo_signals)
      }

      // Create the insight
      await createInsight(insightData)
      setSuccess('Insight created successfully!')

      // Redirect to insights list after a short delay
      setTimeout(() => {
        router.push('/insights')
      }, 1500)
    } catch (err: any) {
      setError('Failed to create insight')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          New Insight
        </h1>
        <a href="/insights" className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
          ← Back to Insights
        </a>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SimpleInput
          label="Insight Title *"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <SimpleInput
          label="Slug (auto-generated from title if empty)"
          value={formData.slug}
          onChange={(e) => handleChange('slug', e.target.value)}
        />
        <SimpleInput
          label="Author"
          value={formData.author}
          onChange={(e) => handleChange('author', e.target.value)}
        />
        <SimpleTextarea
          label="Excerpt"
          value={formData.excerpt}
          onChange={(e) => handleChange('excerpt', e.target.value)}
          rows={3}
        />
        <SimpleTextarea
          label="Rich Text (Portable Text JSON)"
          value={formData.rich_text}
          onChange={(e) => handleChange('rich_text', e.target.value)}
          rows={6}
        />
        <SimpleTextarea
          label="Topic Clusters (JSON Array of strings)"
          value={formData.topic_clusters}
          onChange={(e) => handleChange('topic_clusters', e.target.value)}
        />
        <SimpleTextarea
          label="FAQ Items (JSON Array of objects)"
          value={formData.faq_items}
          onChange={(e) => handleChange('faq_items', e.target.value)}
        />
        <SimpleTextarea
          label="Citations (JSON Array of objects)"
          value={formData.citations}
          onChange={(e) => handleChange('citations', e.target.value)}
        />
        {/* For related capabilities, we are using a text area for UUID arrays. */}
        <SimpleTextarea
          label="Related Capability IDs (JSON Array of UUIDs)"
          value={formData.related_capability_ids}
          onChange={(e) => handleChange('related_capability_ids', e.target.value)}
        />
        <SimpleInput
          label="Published At (ISO date string, leave blank for now)"
          value={formData.published_at || ''}
          onChange={(e) => handleChange('published_at', e.target.value)}
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
        <div className="flex justify-end">
          <SimpleButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Insight'}
          </SimpleButton>
        </div>
      </form>
    </div>
  )
}
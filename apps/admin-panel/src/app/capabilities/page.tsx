import { useEffect, useState } from 'react'
import { Link } from 'next/link'
import { getAICapabilities } from '@/lib/supabase'

// Simple UI components for admin panel (using Tailwind directly)
const SimpleButton = ({ children, type = 'button', className = '' }: { children: React.ReactNode; type?: string; className?: string }) => (
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
  slug: string
  name: string
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

export default function CapabilitiesPage() {
  const [capabilities, setCapabilities] = useState<AICapabilityFormData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch capabilities on load
  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        setLoading(true)
        const data = await getAICapabilities()
        // Convert the data to our form format, ensuring JSON fields are strings and handling UUID arrays
        const formData: AICapabilityFormData[] = data.map((cap: any) => ({
          id: cap.id,
          slug: cap.slug || '',
          name: cap.name || '',
          category: cap.category || '',
          maturity: cap.maturity || '',
          short_description: cap.short_description || '',
          description: cap.description || '',
          icon: cap.icon || '',
          key_metrics: JSON.stringify(cap.key_metrics, null, 2),
          features: JSON.stringify(cap.features, null, 2),
          use_cases: JSON.stringify(cap.use_cases, null, 2),
          supported_platform_ids: JSON.stringify(cap.supported_platform_ids || []),
          timeline: cap.timeline || '',
          prerequisites: JSON.stringify(cap.prerequisites, null, 2),
          demo_url: cap.demo_url || '',
          docs_url: cap.docs_url || '',
          related_capability_ids: JSON.stringify(cap.related_capability_ids || []),
          case_study_ids: JSON.stringify(cap.case_study_ids || []),
          seo: JSON.stringify(cap.seo, null, 2),
        }))
        setCapabilities(formData)
      } catch (err: any) {
        setError('Failed to load AI capabilities')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCapabilities()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          AI Capabilities
        </h1>
        <Link href="/capabilities/new" className="bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white font-bold py-2 px-4 rounded">
          New Capability
        </Link>
      </div>

      {capabilities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No capabilities found. Create your first capability.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {capabilities.map((cap) => (
            <div key={cap.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{cap.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <span className="bg-brand-cyan-100 text-brand-cyan-800 text-xs px-2 py-1 rounded">{cap.category}</span>
                    <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">{cap.maturity}</span>
                  </p>
                  {cap.short_description && <p className="text-body-sm text-gray-600 dark:text-gray-300">{cap.short_description}</p>}
                </div>
                <div className="space-x-2">
                  <Link href={`/capabilities/${cap.id}/edit`} className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Slug: <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">{cap.slug}</code>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
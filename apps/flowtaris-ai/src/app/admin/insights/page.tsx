import { useEffect, useState } from 'react'
import { Link } from 'next/link'
import { getInsights } from '@/lib/supabase'

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

type InsightFormData = {
  id: string
  slug: string
  title: string
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

export default function InsightsPage() {
  const [insights, setInsights] = useState<InsightFormData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch insights on load
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true)
        const data = await getInsights()
        // Convert the data to our form format, ensuring JSON fields are strings and handling UUID arrays
        const formData: InsightFormData[] = data.map((insight: any) => ({
          id: insight.id,
          slug: insight.slug || '',
          title: insight.title || '',
          author: insight.author || '',
          excerpt: insight.excerpt || '',
          rich_text: JSON.stringify(insight.rich_text, null, 2),
          topic_clusters: JSON.stringify(insight.topic_clusters, null, 2),
          faq_items: JSON.stringify(insight.faq_items, null, 2),
          citations: JSON.stringify(insight.citations, null, 2),
          related_capability_ids: JSON.stringify(insight.related_capability_ids || []),
          published_at: insight.published_at || null,
          seo: JSON.stringify(insight.seo, null, 2),
          geo_signals: JSON.stringify(insight.geo_signals, null, 2),
        }))
        setInsights(formData)
      } catch (err: any) {
        setError('Failed to load insights')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchInsights()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Insights & Blog
        </h1>
        <Link href="/admin/admin/insights/new" className="bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white font-bold py-2 px-4 rounded">
          New Insight
        </Link>
      </div>
      
      {insights.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No insights found. Create your first insight.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{insight.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {insight.author && <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">{insight.author}</span>}
                    {insight.published_at && <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">{new Date(insight.published_at).toLocaleDateString()}</span>}
                  </p>
                  {insight.excerpt && <p className="text-body-sm text-gray-600 dark:text-gray-300">{insight.excerpt.substring(0, 100)}...</p>}
                </div>
                <div className="space-x-2">
                  <Link href={`/insights/${insight.id}/edit`} className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Slug: <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">{insight.slug}</code>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

'use client';
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCaseStudies } from '@/lib/supabase'

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

type CaseStudyFormData = {
  id: string
  slug: string
  title: string
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

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyFormData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch case studies on load
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true)
        const data = await getCaseStudies()
        // Convert the data to our form format, ensuring JSON fields are strings and handling UUID arrays
        const formData: CaseStudyFormData[] = data.map((cs: any) => ({
          id: cs.id,
          slug: cs.slug || '',
          title: cs.title || '',
          client: cs.client || '',
          industry: cs.industry || '',
          platforms: JSON.stringify(cs.platforms, null, 2),
          challenge: cs.challenge || '',
          solution: cs.solution || '',
          results: JSON.stringify(cs.results, null, 2),
          timeline: cs.timeline || '',
          testimonial: cs.testimonial || '',
          hero_image_url: cs.hero_image_url || '',
          seo: JSON.stringify(cs.seo, null, 2),
          geo_signals: JSON.stringify(cs.geo_signals, null, 2),
          related_capability_ids: JSON.stringify(cs.related_capability_ids || []),
        }))
        setCaseStudies(formData)
      } catch (err: any) {
        setError('Failed to load case studies')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCaseStudies()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Case Studies
        </h1>
        <Link href="/admin/admin/case-studies/new" className="bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white font-bold py-2 px-4 rounded">
          New Case Study
        </Link>
      </div>
      
      {caseStudies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No case studies found. Create your first case study.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {caseStudies.map((cs) => (
            <div key={cs.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{cs.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <span className="bg-brand-cyan-100 text-brand-cyan-800 text-xs px-2 py-1 rounded">{cs.client}</span>
                    {cs.industry && <span className="ml-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">{cs.industry}</span>}
                  </p>
                  {cs.solution && <p className="text-body-sm text-gray-600 dark:text-gray-300">{cs.solution.substring(0, 100)}...</p>}
                </div>
                <div className="space-x-2">
                  <Link href={`/case-studies/${cs.id}/edit`} className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Slug: <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">{cs.slug}</code>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

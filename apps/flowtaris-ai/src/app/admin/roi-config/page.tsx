'use client';
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getRoiConfigs } from '@/lib/supabase'

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

type RoiConfigFormData = {
  id: string
  assumptions: string // JSON string
  formulas: string // JSON string
  benchmarks: string // JSON string
  platform_multipliers: string // JSON string
}

export default function RoiConfigPage() {
  const [configs, setConfigs] = useState<RoiConfigFormData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch roi configs on load
  useEffect(() => {
    const fetchRoiConfigs = async () => {
      try {
        setLoading(true)
        const data = await getRoiConfigs()
        // Convert the data to our form format, ensuring JSON fields are strings
        const formData: RoiConfigFormData[] = data.map((config: any) => ({
          id: config.id,
          assumptions: JSON.stringify(config.assumptions, null, 2),
          formulas: JSON.stringify(config.formulas, null, 2),
          benchmarks: JSON.stringify(config.benchmarks, null, 2),
          platform_multipliers: JSON.stringify(config.platform_multipliers, null, 2),
        }))
        setConfigs(formData)
      } catch (err: any) {
        setError('Failed to load ROI configs')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRoiConfigs()
  }, [])

  if (loading) return <div className="p-6">Loading...</div>
  if (error) return <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          ROI Configurations
        </h1>
        <Link href="/admin/roi-config/new" className="bg-brand-cyan-600 hover:bg-brand-cyan-700 text-white font-bold py-2 px-4 rounded">
          New ROI Config
        </Link>
      </div>

      {configs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No ROI configurations found. Create your first ROI config.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {configs.map((config) => (
            <div key={config.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    ROI Config {config.id.substring(0, 8)}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Assumptions: {JSON.parse(config.assumptions).length > 0 ? Object.keys(JSON.parse(config.assumptions)).length : 0} items
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Formulas: {JSON.parse(config.formulas).length > 0 ? Object.keys(JSON.parse(config.formulas)).length : 0} items
                  </p>
                </div>
                <div className="space-x-2">
                  <Link href={`/roi-config/${config.id}/edit`} className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
                    Edit
                  </Link>
                </div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last Updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

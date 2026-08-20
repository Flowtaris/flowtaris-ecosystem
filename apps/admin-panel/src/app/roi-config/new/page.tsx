import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getRoiConfigs, createRoiConfig } from '@/lib/supabase'

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

type NewRoiConfigFormData = {
  assumptions: string // JSON string
  formulas: string // JSON string
  benchmarks: string // JSON string
  platform_multipliers: string // JSON string
}

export default function NewRoiConfigPage() {
  const [formData, setFormData] = useState<NewRoiConfigFormData>({
    assumptions: '{}',
    formulas: '{}',
    benchmarks: '{}',
    platform_multipliers: '{}'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (field: keyof NewRoiConfigFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      // Prepare data for insertion
      const roiConfigData = {
        assumptions: JSON.parse(formData.assumptions),
        formulas: JSON.parse(formData.formulas),
        benchmarks: JSON.parse(formData.benchmarks),
        platform_multipliers: JSON.parse(formData.platform_multipliers)
      }

      // Create the ROI config
      await createRoiConfig(roiConfigData)
      setSuccess('ROI config created successfully!')

      // Redirect to ROI config list after a short delay
      setTimeout(() => {
        router.push('/roi-config')
      }, 1500)
    } catch (err: any) {
      setError('Failed to create ROI config')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          New ROI Config
        </h1>
        <a href="/roi-config" className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
          ← Back to ROI Configs
        </a>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SimpleTextarea
          label="Assumptions (JSON Object)"
          value={formData.assumptions}
          onChange={(e) => handleChange('assumptions', e.target.value)}
          rows={6}
          placeholder='{"currency": "USD", "tax_rate": 0.2}'
        />
        <SimpleTextarea
          label="Formulas (JSON Object)"
          value={formData.formulas}
          onChange={(e) => handleChange('formulas', e.target.value)}
          rows={6}
          placeholder='{"roi": "(gain - cost) / cost", "payback_period": "cost / monthly_gain"}'
        />
        <SimpleTextarea
          label="Benchmarks (JSON Object)"
          value={formData.benchmarks}
          onChange={(e) => handleChange('benchmarks', e.target.value)}
          rows={6}
          placeholder='{"implementation_months": 3, "user_adoption_rate": 0.8}'
        />
        <SimpleTextarea
          label="Platform Multipliers (JSON Object)"
          value={formData.platform_multipliers}
          onChange={(e) => handleChange('platform_multipliers', e.target.value)}
          rows={6}
          placeholder='{"ERP": 1.2, "BSM": 1.0, "Hybrid": 1.1}'
        />
        <div className="flex justify-end">
          <SimpleButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create ROI Config'}
          </SimpleButton>
        </div>
      </form>
    </div>
  )
}
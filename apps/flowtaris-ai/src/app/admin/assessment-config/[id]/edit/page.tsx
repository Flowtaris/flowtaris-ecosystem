'use client';
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getAssessmentConfig, updateAssessmentConfig } from '@/lib/supabase'

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

type AssessmentConfigFormData = {
  id: string
  questions: string // JSON string
  recommendation_rules: string // JSON string
  capability_mapping: string // JSON string
}

export default function EditAssessmentConfigPage() {
  const { id } = useParams<{ id: string }>()
  const [formData, setFormData] = useState<AssessmentConfigFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  // Fetch assessment config on load
  useEffect(() => {
    const fetchAssessmentConfig = async () => {
      if (!id) return
      try {
        setLoading(true)
        const data = await getAssessmentConfig()
        if (data) {
          // Convert the data to our form format, ensuring JSON fields are strings
          const formData: AssessmentConfigFormData = {
            id: data.id,
            questions: JSON.stringify(data.questions, null, 2),
            recommendation_rules: JSON.stringify(data.recommendation_rules, null, 2),
            capability_mapping: JSON.stringify(data.capability_mapping, null, 2)
          }
          setFormData(formData)
        } else {
          setError('Assessment config not found')
        }
      } catch (err: any) {
        setError('Failed to load assessment config')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAssessmentConfig()
  }, [id])

  const handleChange = (field: keyof AssessmentConfigFormData, value: string) => {
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
      const assessmentConfigData = {
        questions: JSON.parse(formData.questions),
        recommendation_rules: JSON.parse(formData.recommendation_rules),
        capability_mapping: JSON.parse(formData.capability_mapping)
      }

      // Update the assessment config
      await updateAssessmentConfig(assessmentConfigData)
      setSuccess('Assessment config updated successfully!')

      // Redirect to assessment config list after a short delay
      setTimeout(() => {
        router.push('/admin/assessment-config')
      }, 1500)
    } catch (err: any) {
      setError('Failed to update assessment config')
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
          Edit Assessment Config
        </h1>
        <a href="/admin/assessment-config" className="text-sm text-brand-cyan-600 hover:text-brand-cyan-700">
          ← Back to Assessment Configs
        </a>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SimpleTextarea
          label="Questions (JSON Array of question objects)"
          value={formData.questions}
          onChange={(e) => handleChange('questions', e.target.value)}
          rows={8}
          placeholder='[{"id": "q1", "text": "Question text", "type": "multiple_choice", "options": ["Option 1", "Option 2"]}]'
        />
        <SimpleTextarea
          label="Recommendation Rules (JSON Object mapping scores to recommendations)"
          value={formData.recommendation_rules}
          onChange={(e) => handleChange('recommendation_rules', e.target.value)}
          rows={6}
          placeholder='{"low": "Recommendation for low score", "high": "Recommendation for high score"}'
        />
        <SimpleTextarea
          label="Capability Mapping (JSON Object mapping capability IDs to question IDs)"
          value={formData.capability_mapping}
          onChange={(e) => handleChange('capability_mapping', e.target.value)}
          rows={6}
          placeholder='{"capability-uuid-1": ["q1", "q2"], "capability-uuid-2": ["q3"]}'
        />
        <div className="flex justify-end">
          <SimpleButton type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Assessment Config'}
          </SimpleButton>
        </div>
      </form>
    </div>
  )
}

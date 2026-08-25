'use client'

import React, { useState, useEffect, useCallback, FormEvent, useMemo } from 'react'
import { Section, Container, Stack, Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Label, RadioGroup, Progress, Checkbox, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@repo/ui'
import { ArrowRight, ChevronRight, Sparkles, Zap, Shield, BarChart3, CheckCircle, Loader2, ChartBar, ChevronLeft, Mail, ExternalLink } from 'lucide-react'
import { runAssessment, type AssessmentAnswers, type AssessmentResult, type Recommendation } from '@flowtaris/assessment-engine'
import { insertAssessmentLead } from '@flowtaris/supabase-client'
import { analytics } from '@flowtaris/analytics'

const STORAGE_KEY = 'flowtaris-assessment-draft'

// Type for Sanity assessment config
interface SanityAssessmentConfig {
  questions: Array<{
    id: string
    step: number
    title: string
    description: string
    type: 'radio' | 'checkbox' | 'number' | 'select'
    options?: Array<{
      value: string
      label: string
      description: string
      icon?: string
      weight?: number
    }>
    fields?: Array<{
      id: string
      label: string
      placeholder: string
      min: number
    }>
    validation?: {
      required?: boolean
      min?: number
      max?: number
      maxSelections?: number
    }
    dependsOn?: {
      questionId: string
      value: string
    }
  }>
  recommendationRules?: Array<{
    id: string
    name: string
    category: 'quick-win' | 'strategic' | 'innovation'
    conditions: Array<{
      questionId: string
      operator: string
      value: string
    }>
    capabilityRefs?: Array<{ _ref: string }>
    customRecommendations?: Array<{
      title: string
      description: string
      timeline: string
      projectedImpact: string
    }>
    priority: number
  }>
  capabilityMapping?: {
    erpMapping?: Record<string, Array<{ _ref: string }>>
    painPointMapping?: Record<string, Array<{ _ref: string }>>
    volumeMapping?: Record<string, Array<{ _ref: string }>>
  }
  scoringWeights?: {
    erpPlatform?: number
    painPoints?: number
    volume?: number
    currentState?: number
    techMaturity?: number
    urgency?: number
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  geoSignals?: {
    keyClaims?: string[]
    faqItems?: Array<{ question: string; answer: string }>
    entityAssociations?: string[]
    topicClusters?: string[]
  }
}

// Default steps fallback (when no Sanity config)
const defaultSteps: SanityAssessmentConfig['questions'] = [
  {
    id: 'erp-platform',
    step: 1,
    title: 'ERP Platform',
    description: 'Which ERP platform(s) do you currently use?',
    type: 'radio',
    options: [
      { value: 'NetSuite', label: 'NetSuite', icon: '🔷', description: 'Oracle NetSuite ERP' },
      { value: 'Coupa', label: 'Coupa', icon: '🟠', description: 'Coupa Business Spend Management' },
      { value: 'SAP', label: 'SAP', icon: '🔵', description: 'SAP S/4HANA or ECC' },
      { value: 'Workday', label: 'Workday', icon: '🟢', description: 'Workday Financial Management' },
      { value: 'Multiple', label: 'Multiple Platforms', icon: '🔄', description: 'More than one ERP system' },
    ],
    validation: { required: true },
  },
  {
    id: 'pain-points',
    step: 2,
    title: 'Pain Points',
    description: 'What are your top 3 operational pain points? (Select up to 3)',
    type: 'checkbox',
    options: [
      { value: 'Manual data entry', label: 'Manual Invoice/PO Processing', icon: '📄', description: 'High volume of manual data entry', weight: 25 },
      { value: 'Invoice processing delays', label: 'Cash Flow Visibility', icon: '💰', description: 'Poor forecasting and visibility', weight: 20 },
      { value: 'Integration Failures', label: 'Integration Failures', icon: '🔗', description: 'Frequent iPaaS/API breakages', weight: 20 },
      { value: 'Compliance risks', label: 'Compliance & Audit Risk', icon: '⚖️', description: 'Regulatory pressure and audit findings', weight: 15 },
      { value: 'Slow decision making', label: 'Slow Financial Close', icon: '📊', description: 'Month-end close takes too long', weight: 10 },
      { value: 'High error rates', label: 'Vendor Disputes', icon: '🤝', description: 'Payment delays and dispute resolution', weight: 10 },
    ],
    validation: { required: true, maxSelections: 3 },
  },
  {
    id: 'volume-metrics',
    step: 3,
    title: 'Volume Metrics',
    description: 'Help us calculate your potential ROI with approximate volumes',
    type: 'number',
    fields: [
      { id: 'invoicesPerMonth', label: 'Invoices/Month', placeholder: 'e.g., 5000', min: 0 },
      { id: 'employees', label: 'Finance Team Size (FTE)', placeholder: 'e.g., 15', min: 1 },
      { id: 'transactions', label: 'Transactions/Month', placeholder: 'e.g., 25000', min: 0 },
      { id: 'poLines', label: 'PO Lines/Month', placeholder: 'e.g., 3000', min: 0 },
    ],
    validation: { required: true, min: 0 },
  },
  {
    id: 'current-state',
    step: 4,
    title: 'Current State',
    description: 'How are you currently handling these processes?',
    type: 'radio',
    options: [
      { value: 'Manual', label: 'Fully Manual', icon: '✋', description: 'Spreadsheets, email, paper-based' },
      { value: 'Partial', label: 'Partial Automation', icon: '⚙️', description: 'Some OCR/RPA but lots of exceptions' },
      { value: 'iPaaS', label: 'iPaaS Integration', icon: '☁️', description: 'MuleSoft, Boomi, Celigo, etc.' },
      { value: 'Custom', label: 'Custom Development', icon: '💻', description: 'In-house built solutions' },
      { value: "Don't know", label: "Don't Know", icon: '❓', description: 'Not sure about current tech stack' },
    ],
    validation: { required: true },
  },
  {
    id: 'tech-maturity',
    step: 5,
    title: 'Tech Maturity',
    description: 'How would you describe your organization\'s technology maturity?',
    type: 'radio',
    options: [
      { value: 'Legacy', label: 'Legacy Systems', icon: '🏛️', description: 'On-premise, older ERP versions' },
      { value: 'Modern', label: 'Modern Cloud', icon: '☁️', description: 'Cloud-native, recent implementations' },
      { value: 'Hybrid', label: 'Hybrid', icon: '🔀', description: 'Mix of legacy and cloud systems' },
      { value: 'AI Pilot', label: 'AI Pilot Active', icon: '🧪', description: 'Already running AI/ML experiments' },
    ],
    validation: { required: true },
  },
  {
    id: 'urgency',
    step: 6,
    title: 'Urgency',
    description: 'What\'s driving your evaluation timeline?',
    type: 'radio',
    options: [
      { value: 'Exploring', label: 'Exploring Options', icon: '🔍', description: 'Early research phase' },
      { value: 'Budget Approved', label: 'Budget Approved', icon: '✅', description: 'Funding secured for this year' },
      { value: 'Board Mandate', label: 'Board Mandate', icon: '🎯', description: 'Strategic directive from leadership' },
      { value: 'Audit-Driven', label: 'Audit/Compliance Driven', icon: '📋', description: 'Regulatory or audit requirement' },
    ],
    validation: { required: true },
  },
]

// Step icon mapping
const stepIcons: Record<string, string> = {
  'erp-platform': '🔷',
  'pain-points': '📄',
  'volume-metrics': '📊',
  'current-state': '⚙️',
  'tech-maturity': '🏛️',
  'urgency': '🔍',
}

const initialAnswers: AssessmentAnswers = {
  erp: '',
  painPoints: [],
  volume: {
    invoicesPerMonth: 0,
    employees: 1,
    transactions: 0,
    poLines: 0,
  },
  currentState: '',
  techMaturity: '',
  urgency: '',
}

interface AssessmentWizardClientProps {
  initialConfig: SanityAssessmentConfig | null
}

function getCategoryIcon(category: Recommendation['category']) {
  switch (category) {
    case 'quick-win': return '⚡'
    case 'strategic': return '🎯'
    case 'innovation': return '🚀'
  }
}

function getCategoryColor(category: Recommendation['category']) {
  switch (category) {
    case 'quick-win': return 'border-brand-green-500 bg-brand-green-500/10 text-brand-green-400'
    case 'strategic': return 'border-brand-amber-500 bg-brand-amber-500/10 text-brand-amber-400'
    case 'innovation': return 'border-brand-purple-500 bg-brand-purple-500/10 text-brand-purple-400'
  }
}

function getCategoryLabel(category: Recommendation['category']) {
  switch (category) {
    case 'quick-win': return 'Quick Wins (0-3mo)'
    case 'strategic': return 'Strategic (3-9mo)'
    case 'innovation': return 'Innovation (9-18mo)'
  }
}

export default function AssessmentWizardClient({ initialConfig }: AssessmentWizardClientProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers)
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Use Sanity config or fallback to defaults
  const questions = useMemo(() => initialConfig?.questions ?? defaultSteps, [initialConfig])

  // Map Sanity question IDs to AssessmentAnswers fields
  const questionFieldMap: Record<string, keyof AssessmentAnswers> = {
    'erp-platform': 'erp',
    'pain-points': 'painPoints',
    'volume-metrics': 'volume',
    'current-state': 'currentState',
    'tech-maturity': 'techMaturity',
    'urgency': 'urgency',
  }

  // Load draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setAnswers(parsed.answers || initialAnswers)
        setCurrentStep(parsed.currentStep || 1)
        setEmail(parsed.email || '')
      } catch {
        // Invalid storage, ignore
      }
    }
    // Track assessment start
    analytics.assessment.start({ source: 'direct' })
  }, [])

  // Save draft to localStorage on changes
  useEffect(() => {
    if (currentStep < 7 && !result) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        answers,
        currentStep,
        email,
        timestamp: Date.now(),
      }))
    }
  }, [answers, currentStep, email, result])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handleBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, answers, result])

  const validateStep = useCallback((step: number, currentAnswers: AssessmentAnswers): boolean => {
    const question = questions.find(q => q.step === step)
    const newErrors: Record<string, string> = {}

    if (!question) return true

    const fieldName = questionFieldMap[question.id]
    const validation = question.validation

    switch (question.type) {
      case 'radio':
      case 'select':
        if (fieldName && validation?.required && !currentAnswers[fieldName]) {
          newErrors[fieldName as string] = `Please select an option for ${question.title}`
        }
        break
      case 'checkbox':
        const selections = (currentAnswers[fieldName as keyof AssessmentAnswers] as string[]) || []
        if (validation?.required && selections.length === 0) {
          newErrors[fieldName as string] = `Please select at least one option for ${question.title}`
        } else if (selections.length > (validation?.maxSelections || 3)) {
          newErrors[fieldName as string] = `Please select no more than ${validation?.maxSelections || 3} options`
        }
        break
      case 'number':
        const volume = currentAnswers.volume
        if (validation?.required) {
          const volumeFields = question.fields || []
          volumeFields.forEach(f => {
            if (f.id === 'invoicesPerMonth' && (!volume.invoicesPerMonth || volume.invoicesPerMonth < (validation.min || 1))) {
              newErrors.invoicesPerMonth = 'Please enter a valid invoice volume'
            }
            if (f.id === 'employees' && (!volume.employees || volume.employees < (validation.min || 1))) {
              newErrors.employees = 'Please enter team size'
            }
          })
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [questions])

  const handleAnswerChange = (field: keyof AssessmentAnswers, value: string | number | string[] | AssessmentAnswers['volume']) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }

  const handleNext = () => {
    if (validateStep(currentStep, answers)) {
      const question = questions.find(q => q.step === currentStep)
      const stepName = question?.title || `Step ${currentStep}`
      analytics.assessment.stepComplete({ step: currentStep, stepName, erp: answers.erp })
      setCurrentStep(prev => Math.min(prev + 1, 7))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault()
    if (!validateStep(6, answers)) return

    setIsSubmitting(true)
    try {
      const assessmentResult = runAssessment(answers)
      setResult(assessmentResult)
      setCurrentStep(7)

      // Track completion
      analytics.assessment.complete({
        leadScore: assessmentResult.leadScore,
        recommendations: assessmentResult.recommendations.map(r => r.capability),
        erp: answers.erp,
      })

      // Save to Supabase
      const { data, error } = await insertAssessmentLead({
        answers: answers as unknown as Record<string, unknown>,
        recommendations: assessmentResult.recommendations.map(r => r.capability),
        lead_score: assessmentResult.leadScore,
        routed_to: assessmentResult.leadScore > 70 ? 'sales' : 'nurture',
      })

      if (!error && data) {
        setAssessmentId(data.id)
      }
    } catch (error) {
      console.error('Assessment error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !result) return

    try {
      // Call API route to persist email to Supabase (if we have an assessmentId)
      if (assessmentId) {
        const response = await fetch('/api/leads/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: assessmentId, email }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to capture email')
        }
      }

      // Track analytics event
      analytics.assessment.emailCapture({
        email,
        leadScore: result.leadScore,
        recommendations: result.recommendations.map(r => r.capability),
      })

      // Clear draft since completed
      localStorage.removeItem(STORAGE_KEY)
      setEmailSent(true)
    } catch (error) {
      console.error('Email capture error:', error)
      alert('Failed to save email. Please try again.')
    }
  }

  const getROIUrl = () => {
    if (!result) return '/roi-calculator'
    const topRec = result.recommendations[0]
    const params = new URLSearchParams({
      assessmentId: assessmentId || '',
      erp: answers.erp.toLowerCase(),
      invoices: String(answers.volume.invoicesPerMonth * 12),
      useCase: 'ap-automation',
    })
    return `/roi-calculator?${params.toString()}`
  }

  const progress = currentStep <= 6 ? (currentStep - 1) / 6 * 100 : 100

  // Render step content using dynamic questions from Sanity
  const renderStep = (stepNum: number) => {
    const question = questions.find(q => q.step === stepNum)
    if (!question) return null

    const isActive = stepNum === currentStep
    const isComplete = stepNum < currentStep
    const fieldName = questionFieldMap[question.id]

    const stepIcon = stepIcons[question.id] || '❓'

    const getOptionIcon = (icon?: string) => {
      if (!icon) return stepIcon
      // If it's a lucide icon name, we could render it, but for now use emoji fallback
      const lucideIcons: Record<string, string> = {
        'building': '🏢',
        'cpu': '💻',
        'server': '☁️',
        'database': '🗄️',
        'network': '🌐',
        'code': '💻',
        'file': '📄',
        'dollar-sign': '💰',
        'link': '🔗',
        'shield': '⚖️',
        'clock': '📊',
        'alert-triangle': '🤝',
        'layout': '🏛️',
        'zap': '⚡',
        'search': '🔍',
        'check': '✅',
        'target': '🎯',
        'clipboard': '📋',
      }
      return lucideIcons[icon] || stepIcon
    }

    // Radio or Select type
    if ((question.type === 'radio' || question.type === 'select') && question.options && fieldName) {
      return (
        <Card className={`glass-card ${isActive ? '' : isComplete ? 'opacity-50 pointer-events-none' : 'opacity-30 pointer-events-none'}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <Badge
                variant={isActive ? 'default' : isComplete ? 'success' : 'outline'}
                className="text-body-xs"
              >
                Step {question.step} of 6
              </Badge>
              {isComplete && <CheckCircle className="h-4 w-4 text-brand-green-400" />}
            </div>
            <CardTitle className="text-headline-lg">{question.title}</CardTitle>
            <p className="text-body-md text-neutral-400">{question.description}</p>
          </CardHeader>
          <CardContent>
            {question.type === 'radio' ? (
              <RadioGroup
                name={fieldName}
                value={(answers[fieldName] as string) || ''}
                onChange={(value) => handleAnswerChange(fieldName, value)}
                options={question.options.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                  description: opt.description,
                }))}
                inline
                size="md"
              />
            ) : (
              <Select
                value={(answers[fieldName] as string) || ''}
                onValueChange={(value) => handleAnswerChange(fieldName, value)}
                disabled={!isActive}
              >
                <SelectTrigger className="glass">
                  <SelectValue placeholder="Select an option..." />
                </SelectTrigger>
                <SelectContent>
                  {question.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                      {opt.description && <span className="text-neutral-400 ml-2">— {opt.description}</span>}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors[fieldName as string] && (
              <p className="text-body-sm text-brand-red-400 mt-3">{errors[fieldName as string]}</p>
            )}
          </CardContent>
        </Card>
      )
    }

    // Checkbox type (multi-select)
    if (question.type === 'checkbox' && question.options && fieldName) {
      const currentSelections = (answers[fieldName] as string[]) || []
      const maxSelections = question.validation?.maxSelections || 3

      return (
        <Card className={`glass-card ${isActive ? '' : isComplete ? 'opacity-50 pointer-events-none' : 'opacity-30 pointer-events-none'}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <Badge
                variant={isActive ? 'default' : isComplete ? 'success' : 'outline'}
                className="text-body-xs"
              >
                Step {question.step} of 6
              </Badge>
              {isComplete && <CheckCircle className="h-4 w-4 text-brand-green-400" />}
            </div>
            <CardTitle className="text-headline-lg">{question.title}</CardTitle>
            <p className="text-body-md text-neutral-400">{question.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {question.options.map((opt) => (
                <label
                  key={opt.value}
                  className={`glass rounded-xl p-4 cursor-pointer transition-all ${
                    currentSelections.includes(opt.value)
                      ? 'border-brand-cyan-500/50 bg-brand-cyan-500/10'
                      : 'hover:border-white/10'
                  } ${!isActive ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={currentSelections.includes(opt.value)}
                    onChange={(e) => {
                      const newPoints = e.target.checked
                        ? [...currentSelections, opt.value]
                        : currentSelections.filter((p) => p !== opt.value)
                      if (newPoints.length <= maxSelections) {
                        handleAnswerChange(fieldName, newPoints)
                      }
                    }}
                    disabled={!isActive}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getOptionIcon(opt.icon)}</span>
                    <div>
                      <p className="font-medium text-white">{opt.label}</p>
                      <p className="text-body-xs text-neutral-400">{opt.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {errors[fieldName as string] && (
              <p className="text-body-sm text-brand-red-400 mt-3">{errors[fieldName as string]}</p>
            )}
          </CardContent>
        </Card>
      )
    }

    // Number type (volume metrics)
    if (question.type === 'number' && question.fields) {
      return (
        <Card className={`glass-card ${isActive ? '' : isComplete ? 'opacity-50 pointer-events-none' : 'opacity-30 pointer-events-none'}`}>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3 mb-2">
              <Badge
                variant={isActive ? 'default' : isComplete ? 'success' : 'outline'}
                className="text-body-xs"
              >
                Step {question.step} of 6
              </Badge>
              {isComplete && <CheckCircle className="h-4 w-4 text-brand-green-400" />}
            </div>
            <CardTitle className="text-headline-lg">{question.title}</CardTitle>
            <p className="text-body-md text-neutral-400">{question.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {question.fields.map((field) => (
                <div key={field.id}>
                  <Label className="block text-body-sm text-neutral-300 mb-2">
                    {field.label}
                  </Label>
                  <Input
                    type="number"
                    id={field.id}
                    placeholder={field.placeholder}
                    min={field.min}
                    value={answers.volume[field.id as keyof typeof answers.volume]}
                    onChange={(e) => {
                      const newVolume = { ...answers.volume }
                      newVolume[field.id as keyof typeof newVolume] = parseInt(e.target.value) || 0
                      handleAnswerChange('volume', newVolume)
                    }}
                    disabled={!isActive}
                    className="glass"
                    aria-invalid={!!errors[field.id]}
                  />
                  {errors[field.id] && (
                    <p className="text-body-xs text-brand-red-400 mt-1">{errors[field.id]}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  const renderResults = () => {
    if (!result) return null

    const quickWins = result.recommendations.filter(r => r.category === 'quick-win')
    const strategic = result.recommendations.filter(r => r.category === 'strategic')
    const innovation = result.recommendations.filter(r => r.category === 'innovation')

    return (
      <Card className="glass-card border-brand-cyan-500/20 animate-in fade-in duration-500">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="success" className="text-body-xs">Your Roadmap</Badge>
          </div>
          <CardTitle className="text-headline-lg">Assessment Complete</CardTitle>
          <p className="text-body-md text-neutral-400">Your personalized AI automation roadmap is ready</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { recommendations: quickWins, category: 'quick-win' as const },
              { recommendations: strategic, category: 'strategic' as const },
              { recommendations: innovation, category: 'innovation' as const },
            ].map(({ recommendations, category }) => (
              <div key={category} className={`glass-strong p-6 rounded-xl border-l-4 ${getCategoryColor(category)}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{getCategoryIcon(category)}</span>
                  <h4 className="text-headline-sm">{getCategoryLabel(category)}</h4>
                </div>
                <p className="text-body-sm text-neutral-400 mb-4">
                  {category === 'quick-win' && 'High-impact, low-effort capabilities ready for immediate implementation'}
                  {category === 'strategic' && 'Core capabilities requiring moderate investment for transformational impact'}
                  {category === 'innovation' && 'Next-gen capabilities for competitive differentiation and future-proofing'}
                </p>
                <ul className="space-y-2">
                  {recommendations.map((rec) => (
                    <li key={rec.capabilitySlug} className="flex items-start gap-2 text-body-sm text-neutral-300">
                      <span className="text-lg">{getCategoryIcon(category)}</span>
                      <div>
                        <p className="font-medium">{rec.capability}</p>
                        <p className="text-body-xs text-neutral-400">{rec.timeline} • {rec.projectedImpact}</p>
                        <a
                          href={`/innovation-lab?capability=${rec.capabilitySlug}`}
                          className="text-body-xs text-brand-cyan-400 hover:underline mt-1 inline-block"
                          onClick={() => {
                            analytics.assessment.ctaClick({
                              ctaType: 'innovation_lab_deep_link',
                              capability: rec.capabilitySlug,
                            })
                          }}
                        >
                          View capability details →
                        </a>
                      </div>
                    </li>
                  ))}
                  {recommendations.length === 0 && (
                    <li className="text-body-sm text-neutral-500">No recommendations in this category</li>
                  )}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 mt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href={getROIUrl()}>
                <Button size="lg" className="glass-strong px-8 py-3">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Calculate ROI for Recommendations
                </Button>
              </a>
              <a href="/cost-of-inaction">
                <Button variant="secondary" size="lg" className="glass px-8 py-3">
                  <Shield className="mr-2 h-4 w-4" />
                  Cost of Inaction Analysis
                </Button>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <Label className="block text-body-sm text-neutral-400 mb-2">Get your roadmap emailed to you</Label>
              <form onSubmit={handleEmailSubmit} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 glass"
                  disabled={emailSent || isSubmitting}
                  required
                />
                <Button type="submit" className="glass-strong" disabled={emailSent || isSubmitting || !email}>
                  {emailSent ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Sent
                    </>
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </Button>
              </form>
              <p className="text-body-xs text-neutral-500 mt-2 text-center">
                {emailSent ? 'Check your inbox! We\'ll never share your email.' : 'We\'ll never share your email. Unsubscribe anytime.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col flex-1 w-full">

      {/* ── Premium Hero Header ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#020817] border-b border-white/5">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-cyan-500/10 blur-[80px] rounded-full" />
        
        <Container size="lg">
          <div className="relative z-10 py-16 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-cyan-500/10 border border-brand-cyan-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan-400 animate-pulse" />
              <span className="text-xs text-brand-cyan-300 font-medium tracking-wider uppercase">Free · No signup required</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              AI Readiness{' '}
              <span className="bg-gradient-to-r from-brand-cyan-400 to-brand-purple-400 bg-clip-text text-transparent">
                Assessment
              </span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10">
              Free 3-minute diagnostic → Get a personalized roadmap with Quick Wins (0–3mo), Strategic initiatives (3–9mo), and Innovation opportunities (9–18mo).
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { value: '3 min', label: 'To complete' },
                { value: '6', label: 'Questions' },
                { value: '3', label: 'Roadmap tracks' },
                { value: 'Free', label: 'No cost' },
              ].map(({ value, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <span className="text-xl font-bold text-white">{value}</span>
                  <span className="text-xs text-neutral-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <main className="flex-1 w-full">
        <section className="py-12 px-6" aria-labelledby="assessment-heading">
          <Container size="lg">
            <Stack gap="2xl" className="w-full max-w-3xl mx-auto">
              <h2 id="assessment-heading" className="sr-only">Your Personalized AI Automation Roadmap</h2>


              {/* Progress Indicator */}
              <div id="tour-progress" className="glass-strong rounded-2xl p-6">
                <div className="flex justify-between text-body-sm text-neutral-400 mb-2">
                  <span>Step {currentStep} of 6</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Steps 1-6 */}
              <div id="tour-step">
                {currentStep <= 6 && renderStep(currentStep)}
              </div>

              {/* Results */}
              {currentStep === 7 && renderResults()}

              {/* Navigation */}
              {currentStep <= 6 && (
                <div id="tour-nav" className="flex justify-between pt-4 border-t border-white/10">
                  <Button
                    variant="secondary"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="glass"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={currentStep === 6 ? handleSubmit : handleNext}
                    disabled={isSubmitting}
                    className="glass-strong"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : currentStep === 6 ? (
                      <>
                        Get My Roadmap
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* CTA to next tool (shown after results) */}
              {currentStep === 7 && (
                <div className="glass-strong rounded-2xl p-8 text-center border border-brand-cyan-500/20">
                  <h3 className="text-headline-lg text-white mb-3">Ready to See the Numbers?</h3>
                  <p className="text-body-md text-neutral-400 mb-6 max-w-md mx-auto">
                    Take your top recommendation to the ROI Calculator for detailed projections with live data visualization.
                  </p>
                  <a
                    href={getROIUrl()}
                    onClick={() => {
                      analytics.assessment.ctaClick({ ctaType: 'roi_calculator' })
                      analytics.assessment.stepComplete({ step: 7, stepName: 'cta_roi_calculator', erp: answers.erp })
                    }}
                  >
                    <Button size="lg" className="glass-strong px-10 py-4">
                      Open ROI Calculator
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              )}
            </Stack>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-6">
        <Container size="xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
              Built with Flowtaris AI Design System
            </p>
            <div className="flex items-center gap-6">
              <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
              <a href="/roi-calculator" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">ROI Calculator</a>
              <a href="/cost-of-inaction" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Cost of Inaction</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
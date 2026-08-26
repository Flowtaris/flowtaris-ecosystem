'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, ArrowLeft, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react'

interface PageParams {
  params: { slug: string }
}

// ─── INITIAL DATA PER SLUG ────────────────────────────────────────────────────
const INITIAL_DATA: Record<string, any> = {
  'genai-document-intelligence': {
    slug: 'genai-document-intelligence',
    category: 'DOCUMENT PROCESSING',
    title: 'GenAI Document Intelligence',
    headline: 'Your Finance Team Processes 400 Documents a Day. AI Can Handle 400,000.',
    subheadline: 'Flowtaris AI extracts, validates, and routes invoices, purchase orders, receipts, and contracts — at 99.4% accuracy — directly into your ERP. No templates. No rules configuration. No manual keying.',
    maturity: 'production',
    problem_headline: 'Finance teams lose 23 hours per week manually keying invoices, POs, and receipts into the ERP.',
    problem_body: 'At a fully loaded cost of $45/hr per finance analyst, that\'s $53,820 per person per year — before accounting for error remediation, late payment penalties, and duplicate invoice fraud.',
    problem_stat_value: '23 hrs',
    problem_stat_label: 'lost per analyst per week to manual document entry',
    stats: [
      { value: '99.4%', label: 'Extraction Accuracy', context: 'across 2.1M documents processed' },
      { value: '4 days → 3 min', label: 'Invoice-to-Pay Cycle', context: 'median reduction in production' },
      { value: '85%', label: 'Automation Rate', context: 'of invoices with zero human touch' },
      { value: '$4.5M/yr', label: 'Cost Reduction', context: 'for enterprise at 50K invoices/yr' },
    ],
    integrations: 'NetSuite SuiteCloud, Coupa Open APIs, SAP BTP, Workday Cloud Connect, Oracle ERP Cloud, MuleSoft, Celonis, Microsoft Azure AI',
    faq_items: [
      { question: 'How does Flowtaris AI handle invoices from vendors it has never seen before?', answer: 'Unlike legacy OCR tools that require a template per vendor, Flowtaris AI uses a large language model trained on financial documents across industries.' },
      { question: 'What ERP systems does Flowtaris AI integrate with?', answer: 'Flowtaris AI integrates natively with NetSuite, Coupa, SAP, Workday, and Oracle ERP Cloud via native APIs.' },
    ],
    seo_title: 'AI Invoice Processing & Document Intelligence for NetSuite, Coupa & SAP | Flowtaris AI',
    seo_description: 'Automate accounts payable with GenAI. Flowtaris AI extracts invoice data at 99.4% accuracy and syncs directly to NetSuite, Coupa, SAP, and Workday.',
    seo_keywords: 'AI invoice processing, GenAI document extraction, AP automation NetSuite',
    cta_headline: 'See exactly how much your current AP process is costing you.',
    cta_body: 'Run our 3-minute Cost of Inaction analysis or take the AI Readiness Assessment.',
    cta_primary_label: 'Start AI Readiness Assessment',
    cta_primary_href: '/assessment',
    cta_secondary_label: 'Calculate Cost of Inaction',
    cta_secondary_href: '/cost-of-inaction',
  },
}

// ─── REUSABLE INPUT COMPONENTS ────────────────────────────────────────────────
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-bold text-slate-900">{label}</label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, mono }: { value: string; onChange: (v: string) => void; placeholder?: string; mono?: boolean }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${mono ? 'font-mono' : ''}`}
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-y"
    />
  )
}

function SectionHeader({ title, description, expanded, onToggle }: { title: string; description: string; expanded: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 rounded-xl"
    >
      <div className="text-left">
        <div className="font-bold text-slate-900 text-sm">{title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      </div>
      {expanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
    </button>
  )
}

// ─── MAIN EDIT PAGE ───────────────────────────────────────────────────────────
export default function CapabilityEditPage({ params }: PageParams) {
  const { slug } = params
  const router = useRouter()
  const [data, setData] = useState(INITIAL_DATA[slug] || INITIAL_DATA['genai-document-intelligence'])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [sections, setSections] = useState({ basics: true, problem: false, stats: false, integrations: false, faqs: false, seo: false, cta: false })

  const update = (key: string, val: any) => setData((d: any) => ({ ...d, [key]: val }))
  const toggleSection = (key: string) => setSections(s => ({ ...s, [key]: !s[key as keyof typeof s] }))

  const updateStat = (idx: number, field: string, val: string) => {
    const updated = [...data.stats]
    updated[idx] = { ...updated[idx], [field]: val }
    update('stats', updated)
  }

  const addStat = () => {
    update('stats', [...data.stats, { value: '', label: '', context: '' }])
  }

  const removeStat = (idx: number) => {
    update('stats', data.stats.filter((_: any, i: number) => i !== idx))
  }

  const updateFaq = (idx: number, field: string, val: string) => {
    const updated = [...data.faq_items]
    updated[idx] = { ...updated[idx], [field]: val }
    update('faq_items', updated)
  }

  const addFaq = () => {
    update('faq_items', [...data.faq_items, { question: '', answer: '' }])
  }

  const removeFaq = (idx: number) => {
    update('faq_items', data.faq_items.filter((_: any, i: number) => i !== idx))
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/admin/capabilities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: any) {
      setError(e.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div>
            <div className="font-black text-slate-900 text-sm">{data.title}</div>
            <div className="text-xs text-slate-400 font-mono">/capabilities/{data.slug}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {error && (
            <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          {saved && (
            <div className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4" /> Saved!
            </div>
          )}
          <a
            href={`https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-4 h-4" /> Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-sm font-bold px-5 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-4">

        {/* 1. BASICS */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <SectionHeader title="Page Basics" description="Title, headline, category, and maturity status" expanded={sections.basics} onToggle={() => toggleSection('basics')} />
          {sections.basics && (
            <div className="p-6 space-y-5">
              <Field label="Page Title" hint="Displayed in the hero section — make it bold and specific">
                <TextInput value={data.title} onChange={v => update('title', v)} placeholder="GenAI Document Intelligence" />
              </Field>
              <Field label="Headline (H1)" hint="The big statement at the top. Should be customer-centric and specific.">
                <TextArea value={data.headline} onChange={v => update('headline', v)} rows={2} placeholder="Your Finance Team Processes 400 Documents a Day. AI Can Handle 400,000." />
              </Field>
              <Field label="Subheadline" hint="Supporting sentence — 1-2 sentences expanding the headline.">
                <TextArea value={data.subheadline} onChange={v => update('subheadline', v)} rows={3} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category (eyebrow)" hint="Shown above the title in caps">
                  <TextInput value={data.category} onChange={v => update('category', v)} placeholder="DOCUMENT PROCESSING" />
                </Field>
                <Field label="Maturity">
                  <select
                    value={data.maturity}
                    onChange={e => update('maturity', e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="production">Production</option>
                    <option value="pilot">Pilot</option>
                    <option value="research">Research</option>
                  </select>
                </Field>
              </div>
            </div>
          )}
        </div>

        {/* 2. PROBLEM SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <SectionHeader title="Problem Section" description="The emotional hook — what breaks without this capability" expanded={sections.problem} onToggle={() => toggleSection('problem')} />
          {sections.problem && (
            <div className="p-6 space-y-5">
              <Field label="Problem Headline" hint="Bold, specific pain point. Include a number if possible.">
                <TextArea value={data.problem_headline} onChange={v => update('problem_headline', v)} rows={2} />
              </Field>
              <Field label="Problem Body" hint="2-3 paragraphs explaining the pain in detail. Separate paragraphs with a blank line.">
                <TextArea value={data.problem_body} onChange={v => update('problem_body', v)} rows={6} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stat Value" hint="e.g. 23 hrs, $53K, 40%">
                  <TextInput value={data.problem_stat_value} onChange={v => update('problem_stat_value', v)} placeholder="23 hrs" />
                </Field>
                <Field label="Stat Label" hint="Short description of what the stat means">
                  <TextInput value={data.problem_stat_label} onChange={v => update('problem_stat_label', v)} placeholder="lost per analyst per week" />
                </Field>
              </div>
            </div>
          )}
        </div>

        {/* 3. STATS */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <SectionHeader title="Metrics (4 stat cards)" description="The proof bar shown at the top of the page" expanded={sections.stats} onToggle={() => toggleSection('stats')} />
          {sections.stats && (
            <div className="p-6 space-y-4">
              {data.stats.map((stat: any, idx: number) => (
                <div key={idx} className="grid grid-cols-3 gap-3 items-start p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Field label={`Value ${idx + 1}`}>
                    <TextInput value={stat.value} onChange={v => updateStat(idx, 'value', v)} placeholder="99.4%" />
                  </Field>
                  <Field label="Label">
                    <TextInput value={stat.label} onChange={v => updateStat(idx, 'label', v)} placeholder="Extraction Accuracy" />
                  </Field>
                  <div className="relative">
                    <Field label="Context note">
                      <TextInput value={stat.context} onChange={v => updateStat(idx, 'context', v)} placeholder="across 2.1M docs" />
                    </Field>
                    {data.stats.length > 1 && (
                      <button onClick={() => removeStat(idx)} className="absolute -top-1 -right-1 p-1 text-red-400 hover:text-red-600 bg-white rounded-full shadow-sm border border-red-100">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button onClick={addStat} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-medium">
                <Plus className="w-4 h-4" /> Add metric
              </button>
            </div>
          )}
        </div>

        {/* 4. INTEGRATIONS */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <SectionHeader title="Platform Integrations" description="Comma-separated list of supported platforms" expanded={sections.integrations} onToggle={() => toggleSection('integrations')} />
          {sections.integrations && (
            <div className="p-6">
              <Field label="Integrations" hint="Comma-separated. e.g. NetSuite SuiteCloud, Coupa Open APIs, SAP BTP">
                <TextArea value={data.integrations} onChange={v => update('integrations', v)} rows={3} placeholder="NetSuite SuiteCloud, Coupa Open APIs, SAP BTP, Workday Cloud Connect" />
              </Field>
            </div>
          )}
        </div>

        {/* 5. FAQ */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <SectionHeader title={`FAQ Items (${data.faq_items.length})`} description="Question & answer pairs. Used for FAQ schema (AEO/SGE optimization)" expanded={sections.faqs} onToggle={() => toggleSection('faqs')} />
          {sections.faqs && (
            <div className="p-6 space-y-4">
              {data.faq_items.map((faq: any, idx: number) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Question {idx + 1}</span>
                    <button onClick={() => removeFaq(idx)} className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <TextInput value={faq.question} onChange={v => updateFaq(idx, 'question', v)} placeholder="How does Flowtaris AI handle new vendors?" />
                  <TextArea value={faq.answer} onChange={v => updateFaq(idx, 'answer', v)} rows={3} placeholder="Detailed answer..." />
                </div>
              ))}
              <button onClick={addFaq} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 font-medium">
                <Plus className="w-4 h-4" /> Add FAQ item
              </button>
            </div>
          )}
        </div>

        {/* 6. SEO */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <SectionHeader title="SEO Metadata" description="Title tag, meta description, OG image, and keywords" expanded={sections.seo} onToggle={() => toggleSection('seo')} />
          {sections.seo && (
            <div className="p-6 space-y-5">
              <Field label="SEO Title" hint="Target: 50-60 characters. Include primary keyword + Flowtaris AI.">
                <TextInput value={data.seo_title} onChange={v => update('seo_title', v)} />
                <div className={`text-xs mt-1 ${data.seo_title?.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                  {data.seo_title?.length || 0}/60 characters
                </div>
              </Field>
              <Field label="Meta Description" hint="Target: 140-155 characters. Lead with the benefit, include ERP names.">
                <TextArea value={data.seo_description} onChange={v => update('seo_description', v)} rows={3} />
                <div className={`text-xs mt-1 ${data.seo_description?.length > 155 ? 'text-red-500' : 'text-slate-400'}`}>
                  {data.seo_description?.length || 0}/155 characters
                </div>
              </Field>
              <Field label="Keywords" hint="Comma-separated. Include ERP names and action phrases.">
                <TextArea value={data.seo_keywords} onChange={v => update('seo_keywords', v)} rows={2} />
              </Field>
            </div>
          )}
        </div>

        {/* 7. CTA */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <SectionHeader title="CTA Section" description="Bottom call-to-action block" expanded={sections.cta} onToggle={() => toggleSection('cta')} />
          {sections.cta && (
            <div className="p-6 space-y-5">
              <Field label="CTA Headline">
                <TextInput value={data.cta_headline} onChange={v => update('cta_headline', v)} />
              </Field>
              <Field label="CTA Body">
                <TextArea value={data.cta_body} onChange={v => update('cta_body', v)} rows={2} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Primary Button Label">
                  <TextInput value={data.cta_primary_label} onChange={v => update('cta_primary_label', v)} />
                </Field>
                <Field label="Primary Button Link" hint="Internal path e.g. /assessment">
                  <TextInput value={data.cta_primary_href} onChange={v => update('cta_primary_href', v)} mono />
                </Field>
                <Field label="Secondary Button Label">
                  <TextInput value={data.cta_secondary_label} onChange={v => update('cta_secondary_label', v)} />
                </Field>
                <Field label="Secondary Button Link">
                  <TextInput value={data.cta_secondary_href} onChange={v => update('cta_secondary_href', v)} mono />
                </Field>
              </div>
            </div>
          )}
        </div>

        <div className="pb-16" />
      </div>
    </div>
  )
}

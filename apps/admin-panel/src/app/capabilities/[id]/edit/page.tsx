'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Globe, GlobeOff } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

interface PageParams {
  params: { id: string }
}

// ─── UI COMPONENTS ─────────────────────────────────────────────────────────────
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
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent ${mono ? 'font-mono' : ''}`}
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 4 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-y"
    />
  )
}

function SectionHeader({ title, description, expanded, onToggle, accent }: { title: string; description: string; expanded: boolean; onToggle: () => void; accent?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 hover:bg-slate-100 transition-colors border border-slate-200 rounded-xl bg-slate-50"
    >
      <div className="text-left">
        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
          {accent && <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: accent }} />}
          {title}
        </div>
        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      </div>
      {expanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
    </button>
  )
}

// ─── MAIN EDIT PAGE ─────────────────────────────────────────────────────────────
export default function CapabilityEditPage({ params }: PageParams) {
  const { id } = params
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [sections, setSections] = useState({
    basics: true, problem: false, stats: false, steps: false,
    technical: false, integrations: false, faqs: false, seo: false, cta: false
  })

  function getSupabase() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabase()
        const { data: cap, error } = await supabase
          .from('capabilities')
          .select('*')
          .eq('id', id)
          .single()
        if (error) throw error
        // Ensure array fields are arrays
        setData({
          ...cap,
          stats: cap.stats || [],
          steps: cap.steps || [],
          technical_details: cap.technical_details || [],
          integrations: cap.integrations || [],
          faq_items: cap.faq_items || [],
          related_slugs: cap.related_slugs || [],
        })
      } catch (e: any) {
        setError('Could not load capability. ' + (e.message || ''))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const update = (key: string, val: any) => setData((d: any) => ({ ...d, [key]: val }))
  const toggleSection = (key: string) => setSections(s => ({ ...s, [key]: !s[key as keyof typeof s] }))

  // Stats CRUD
  const updateStat = (idx: number, field: string, val: string) => {
    const updated = [...data.stats]; updated[idx] = { ...updated[idx], [field]: val }; update('stats', updated)
  }
  const addStat = () => update('stats', [...data.stats, { value: '', label: '', context: '' }])
  const removeStat = (idx: number) => update('stats', data.stats.filter((_: any, i: number) => i !== idx))

  // Steps CRUD
  const updateStep = (idx: number, field: string, val: any) => {
    const updated = [...data.steps]; updated[idx] = { ...updated[idx], [field]: val }; update('steps', updated)
  }
  const addStep = () => update('steps', [...data.steps, { eyebrow: '', headline: '', body: '', image: '', imageAlt: '', imageRight: false, bullets: [] }])
  const removeStep = (idx: number) => update('steps', data.steps.filter((_: any, i: number) => i !== idx))
  const updateStepBullet = (stepIdx: number, bIdx: number, val: string) => {
    const bullets = [...(data.steps[stepIdx].bullets || [])]; bullets[bIdx] = val
    updateStep(stepIdx, 'bullets', bullets)
  }
  const addStepBullet = (stepIdx: number) => updateStep(stepIdx, 'bullets', [...(data.steps[stepIdx].bullets || []), ''])
  const removeStepBullet = (stepIdx: number, bIdx: number) => updateStep(stepIdx, 'bullets', data.steps[stepIdx].bullets.filter((_: any, i: number) => i !== bIdx))

  // Tech CRUD
  const updateTech = (idx: number, field: string, val: string) => {
    const updated = [...data.technical_details]; updated[idx] = { ...updated[idx], [field]: val }; update('technical_details', updated)
  }
  const addTech = () => update('technical_details', [...data.technical_details, { component: '', technology: '', description: '' }])
  const removeTech = (idx: number) => update('technical_details', data.technical_details.filter((_: any, i: number) => i !== idx))

  // FAQs CRUD
  const updateFaq = (idx: number, field: string, val: string) => {
    const updated = [...data.faq_items]; updated[idx] = { ...updated[idx], [field]: val }; update('faq_items', updated)
  }
  const addFaq = () => update('faq_items', [...data.faq_items, { question: '', answer: '' }])
  const removeFaq = (idx: number) => update('faq_items', data.faq_items.filter((_: any, i: number) => i !== idx))

  const handleSave = async () => {
    setSaving(true); setError('')
    try {
      const supabase = getSupabase()
      const { error: saveError } = await supabase
        .from('capabilities')
        .update({
          ...data,
          integrations: typeof data.integrations === 'string'
            ? data.integrations.split(',').map((s: string) => s.trim()).filter(Boolean)
            : data.integrations,
          related_slugs: typeof data.related_slugs === 'string'
            ? data.related_slugs.split(',').map((s: string) => s.trim()).filter(Boolean)
            : data.related_slugs,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
      if (saveError) throw saveError
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: any) {
      setError(e.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleTogglePublish = async () => {
    update('is_published', !data.is_published)
    const supabase = getSupabase()
    await supabase.from('capabilities').update({ is_published: !data.is_published }).eq('id', id)
  }

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Loading capability…</p>
      </div>
    </div>
  )

  if (error && !data) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Could not load capability</h2>
        <p className="text-slate-500 text-sm mb-6">{error}</p>
        <button onClick={() => router.back()} className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors">Go Back</button>
      </div>
    </div>
  )

  const accent = data?.accent_color || '#6366f1'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── TOP BAR ───────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
            <div>
              <div className="font-black text-slate-900 text-sm">{data?.title}</div>
              <div className="text-xs text-slate-400 font-mono">/capabilities/{data?.slug}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {error && (
            <div className="flex items-center gap-1.5 text-red-600 text-xs font-medium">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          {saved && (
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4" /> Saved successfully!
            </div>
          )}

          {/* Publish toggle */}
          <button
            onClick={handleTogglePublish}
            className={`inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg border transition-colors ${data?.is_published ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100' : 'text-slate-600 bg-white border-slate-200 hover:bg-slate-50'}`}
          >
            {data?.is_published ? <><Globe className="w-4 h-4" /> Live</> : <><GlobeOff className="w-4 h-4" /> Draft</>}
          </button>

          <a
            href={`https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/${data?.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-4 h-4" /> Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* ── FORM BODY ─────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-4">

        {/* BASICS */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <SectionHeader title="Basics & Branding" description="Category, headline, subheadline, accent color" expanded={sections.basics} onToggle={() => toggleSection('basics')} accent={accent} />
          {sections.basics && (
            <div className="p-6 space-y-5 border-t border-slate-100">
              <div className="grid md:grid-cols-3 gap-4">
                <Field label="Slug" hint="URL identifier — do not change after publish">
                  <TextInput value={data.slug} onChange={v => update('slug', v)} mono />
                </Field>
                <Field label="Category" hint="Short uppercase label (e.g. DOCUMENT PROCESSING)">
                  <TextInput value={data.category} onChange={v => update('category', v)} />
                </Field>
                <Field label="Maturity">
                  <select value={data.maturity} onChange={e => update('maturity', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900">
                    <option value="production">Production</option>
                    <option value="pilot">Pilot</option>
                    <option value="research">Research</option>
                  </select>
                </Field>
              </div>
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <Field label="Accent Color" hint="Per-capability color identity (hex)">
                  <div className="flex items-center gap-3">
                    <input type="color" value={accent} onChange={e => update('accent_color', e.target.value)} className="w-12 h-10 cursor-pointer rounded border border-slate-200 p-1" />
                    <TextInput value={accent} onChange={v => update('accent_color', v)} mono />
                  </div>
                </Field>
              </div>
              <Field label="Page Title" hint="Large H1 — should be a bold, CEO-targeting claim">
                <TextArea value={data.headline} onChange={v => update('headline', v)} rows={2} placeholder="Your Finance Team Is Spending $53,820 Per Analyst…" />
              </Field>
              <Field label="Subheadline" hint="One or two sentences expanding on the headline">
                <TextArea value={data.subheadline} onChange={v => update('subheadline', v)} rows={3} />
              </Field>
            </div>
          )}
        </div>

        {/* PROBLEM */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <SectionHeader title="Problem Section" description="Eyebrow, headline, body copy, and big stat callout" expanded={sections.problem} onToggle={() => toggleSection('problem')} />
          {sections.problem && (
            <div className="p-6 space-y-5 border-t border-slate-100">
              <Field label="Eyebrow" hint="Short label above the problem headline (e.g. THE BOARDROOM PROBLEM)">
                <TextInput value={data.problem_eyebrow} onChange={v => update('problem_eyebrow', v)} />
              </Field>
              <Field label="Problem Headline">
                <TextArea value={data.problem_headline} onChange={v => update('problem_headline', v)} rows={2} />
              </Field>
              <Field label="Problem Body" hint="Use two newlines between paragraphs">
                <TextArea value={data.problem_body} onChange={v => update('problem_body', v)} rows={8} />
              </Field>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Stat Value" hint="The BIG number in the callout box (e.g. $53K, 23 hrs)">
                  <TextInput value={data.problem_stat_value} onChange={v => update('problem_stat_value', v)} />
                </Field>
                <Field label="Stat Label" hint="Context below the stat value">
                  <TextInput value={data.problem_stat_label} onChange={v => update('problem_stat_label', v)} />
                </Field>
              </div>
            </div>
          )}
        </div>

        {/* STATS */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <SectionHeader title="Metric Cards (4 Stats)" description="The 4 key performance metrics shown in the hero" expanded={sections.stats} onToggle={() => toggleSection('stats')} />
          {sections.stats && (
            <div className="p-6 space-y-4 border-t border-slate-100">
              {data.stats.map((stat: any, idx: number) => (
                <div key={idx} className="flex gap-3 items-start p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-1 grid md:grid-cols-3 gap-3">
                    <Field label="Value"><TextInput value={stat.value} onChange={v => updateStat(idx, 'value', v)} placeholder="99.4%" /></Field>
                    <Field label="Label"><TextInput value={stat.label} onChange={v => updateStat(idx, 'label', v)} placeholder="Extraction Accuracy" /></Field>
                    <Field label="Context"><TextInput value={stat.context} onChange={v => updateStat(idx, 'context', v)} placeholder="across 2.1M documents" /></Field>
                  </div>
                  <button onClick={() => removeStat(idx)} className="mt-6 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={addStat} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 border border-dashed border-slate-300 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors w-full justify-center">
                <Plus className="w-4 h-4" /> Add Stat Card
              </button>
            </div>
          )}
        </div>

        {/* STEPS */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <SectionHeader title="How It Works — Steps" description="Alternating image/text sections (3 recommended)" expanded={sections.steps} onToggle={() => toggleSection('steps')} />
          {sections.steps && (
            <div className="p-6 space-y-6 border-t border-slate-100">
              {data.steps.map((step: any, idx: number) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-700 text-sm">Step {idx + 1}</div>
                    <button onClick={() => removeStep(idx)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Eyebrow"><TextInput value={step.eyebrow} onChange={v => updateStep(idx, 'eyebrow', v)} placeholder="STEP 01 — CAPTURE" /></Field>
                    <Field label="Image URL"><TextInput value={step.image} onChange={v => updateStep(idx, 'image', v)} placeholder="/images/capabilities/cap1-invoice-extract.png" mono /></Field>
                  </div>
                  <Field label="Headline"><TextInput value={step.headline} onChange={v => updateStep(idx, 'headline', v)} placeholder="Every document in. Zero configuration." /></Field>
                  <Field label="Body (use two newlines for paragraphs)"><TextArea value={step.body} onChange={v => updateStep(idx, 'body', v)} rows={5} /></Field>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Image Alt Text"><TextInput value={step.imageAlt} onChange={v => updateStep(idx, 'imageAlt', v)} /></Field>
                    <Field label="Image Position">
                      <select value={step.imageRight ? 'right' : 'left'} onChange={e => updateStep(idx, 'imageRight', e.target.value === 'right')} className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-900">
                        <option value="left">Image Left (text on right)</option>
                        <option value="right">Image Right (text on left)</option>
                      </select>
                    </Field>
                  </div>
                  <Field label="Bullet Points">
                    <div className="space-y-2">
                      {(step.bullets || []).map((b: string, bIdx: number) => (
                        <div key={bIdx} className="flex items-center gap-2">
                          <TextInput value={b} onChange={v => updateStepBullet(idx, bIdx, v)} placeholder="Bullet point text" />
                          <button onClick={() => removeStepBullet(idx, bIdx)} className="p-2 text-slate-400 hover:text-red-500 rounded-lg transition-colors flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                      <button onClick={() => addStepBullet(idx)} className="text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors">+ Add bullet</button>
                    </div>
                  </Field>
                </div>
              ))}
              <button onClick={addStep} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 border border-dashed border-slate-300 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors w-full justify-center">
                <Plus className="w-4 h-4" /> Add Step
              </button>
            </div>
          )}
        </div>

        {/* TECHNICAL DETAILS */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <SectionHeader title="Technical Architecture Table" description="Component, technology, description rows" expanded={sections.technical} onToggle={() => toggleSection('technical')} />
          {sections.technical && (
            <div className="p-6 space-y-4 border-t border-slate-100">
              {data.technical_details.map((row: any, idx: number) => (
                <div key={idx} className="flex gap-3 items-start p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-1 grid md:grid-cols-3 gap-3">
                    <Field label="Component"><TextInput value={row.component} onChange={v => updateTech(idx, 'component', v)} placeholder="Extraction Engine" /></Field>
                    <Field label="Technology"><TextInput value={row.technology} onChange={v => updateTech(idx, 'technology', v)} placeholder="Fine-tuned Gemini 1.5 Pro" mono /></Field>
                    <Field label="Description"><TextInput value={row.description} onChange={v => updateTech(idx, 'description', v)} placeholder="What it does…" /></Field>
                  </div>
                  <button onClick={() => removeTech(idx)} className="mt-6 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button onClick={addTech} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 border border-dashed border-slate-300 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors w-full justify-center">
                <Plus className="w-4 h-4" /> Add Architecture Row
              </button>
            </div>
          )}
        </div>

        {/* INTEGRATIONS */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <SectionHeader title="Platform Integrations" description="Comma-separated list of connected platforms" expanded={sections.integrations} onToggle={() => toggleSection('integrations')} />
          {sections.integrations && (
            <div className="p-6 border-t border-slate-100">
              <Field label="Integrations" hint="Comma-separated: NetSuite SuiteCloud, Coupa Open APIs, SAP BTP, …">
                <TextArea
                  value={Array.isArray(data.integrations) ? data.integrations.join(', ') : data.integrations}
                  onChange={v => update('integrations', v)}
                  rows={4}
                  placeholder="NetSuite SuiteCloud, Coupa Open APIs, SAP BTP, Workday Cloud Connect"
                />
              </Field>
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <SectionHeader title={`FAQs (${data.faq_items.length} items)`} description="6-8 FAQs recommended for AEO and FAQ schema" expanded={sections.faqs} onToggle={() => toggleSection('faqs')} />
          {sections.faqs && (
            <div className="p-6 space-y-4 border-t border-slate-100">
              {data.faq_items.map((faq: any, idx: number) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">FAQ {idx + 1}</span>
                    <button onClick={() => removeFaq(idx)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <Field label="Question"><TextInput value={faq.question} onChange={v => updateFaq(idx, 'question', v)} placeholder="How does Flowtaris handle…?" /></Field>
                  <Field label="Answer" hint="Detailed, specific answer. Avoid generic AI-sounding language.">
                    <TextArea value={faq.answer} onChange={v => updateFaq(idx, 'answer', v)} rows={4} />
                  </Field>
                </div>
              ))}
              <button onClick={addFaq} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 border border-dashed border-slate-300 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors w-full justify-center">
                <Plus className="w-4 h-4" /> Add FAQ
              </button>
            </div>
          )}
        </div>

        {/* SEO */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <SectionHeader title="SEO / GEO / AEO Metadata" description="Title tag, meta description, keywords, OG image" expanded={sections.seo} onToggle={() => toggleSection('seo')} />
          {sections.seo && (
            <div className="p-6 space-y-5 border-t border-slate-100">
              <Field label="SEO Title" hint="Ideal: 50-60 characters. Include primary keyword + brand.">
                <TextInput value={data.seo_title} onChange={v => update('seo_title', v)} placeholder="AI Invoice Processing for NetSuite & SAP | Flowtaris AI" />
                <p className="text-xs text-slate-400 mt-1">{(data.seo_title || '').length} / 60 chars</p>
              </Field>
              <Field label="Meta Description" hint="Ideal: 150-160 characters. Specific, with numbers.">
                <TextArea value={data.seo_description} onChange={v => update('seo_description', v)} rows={3} />
                <p className="text-xs text-slate-400 mt-1">{(data.seo_description || '').length} / 160 chars</p>
              </Field>
              <Field label="Keywords" hint="Comma-separated primary and secondary keywords">
                <TextArea value={data.seo_keywords} onChange={v => update('seo_keywords', v)} rows={3} />
              </Field>
              <Field label="OG Image URL" hint="1200×630px image URL for social sharing previews">
                <TextInput value={data.seo_og_image} onChange={v => update('seo_og_image', v)} placeholder="https://flowtaris.ai/images/og/..." mono />
              </Field>
              <Field label="Related Slugs" hint="Comma-separated slugs for the Related Capabilities section">
                <TextInput
                  value={Array.isArray(data.related_slugs) ? data.related_slugs.join(', ') : data.related_slugs}
                  onChange={v => update('related_slugs', v)}
                  placeholder="autonomous-workflow-engine, predictive-analytics"
                />
              </Field>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
          <SectionHeader title="CTA Section" description="Bottom-of-page call to action headline, body, and buttons" expanded={sections.cta} onToggle={() => toggleSection('cta')} />
          {sections.cta && (
            <div className="p-6 space-y-5 border-t border-slate-100">
              <Field label="CTA Headline"><TextArea value={data.cta_headline} onChange={v => update('cta_headline', v)} rows={2} placeholder="Ready to see it in action?" /></Field>
              <Field label="CTA Body"><TextArea value={data.cta_body} onChange={v => update('cta_body', v)} rows={3} /></Field>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Primary Button Label"><TextInput value={data.cta_primary_label} onChange={v => update('cta_primary_label', v)} placeholder="Start Assessment" /></Field>
                <Field label="Primary Button URL"><TextInput value={data.cta_primary_href} onChange={v => update('cta_primary_href', v)} placeholder="/assessment" mono /></Field>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Secondary Button Label"><TextInput value={data.cta_secondary_label} onChange={v => update('cta_secondary_label', v)} placeholder="Calculate Cost of Inaction" /></Field>
                <Field label="Secondary Button URL"><TextInput value={data.cta_secondary_href} onChange={v => update('cta_secondary_href', v)} placeholder="/cost-of-inaction" mono /></Field>
              </div>
            </div>
          )}
        </div>

        {/* Save Footer */}
        <div className="sticky bottom-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-2xl hover:bg-slate-700 disabled:opacity-50 transition-all"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving Changes…' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
'use client'

import React, { useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'

export const inputCls = 'w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan-500 transition'
export const textareaCls = inputCls + ' resize-y'

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 italic">{hint}</p>}
      {children}
    </div>
  )
}

export function StringListEditor({ label, hint, value, onChange }: { label: string; hint?: string; value: string[]; onChange: (v: string[]) => void }) {
  const add = () => onChange([...(value || []), ''])
  const update = (i: number, v: string) => { const n = [...value]; n[i] = v; onChange(n) }
  const remove = (i: number) => onChange(value?.filter((_, idx) => idx !== i) || [])
  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {(value || []).map((item, i) => (
          <div key={i} className="flex gap-2">
            <input value={item} onChange={e => update(i, e.target.value)} className={inputCls + ' flex-1'} placeholder={`Item ${i + 1}`} />
            <button type="button" onClick={() => remove(i)} className="px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-200 transition">✕</button>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-brand-cyan-600 dark:text-brand-cyan-400 hover:text-brand-cyan-800 font-semibold transition">
          <span className="text-lg leading-none">+</span> Add item
        </button>
      </div>
    </Field>
  )
}

type FAQ = { question: string; answer: string }
export function FaqEditor({ value, onChange }: { value: FAQ[]; onChange: (v: FAQ[]) => void }) {
  const add = () => onChange([...(value || []), { question: '', answer: '' }])
  const update = (i: number, field: keyof FAQ, v: string) => {
    const n = [...value]; n[i] = { ...n[i], [field]: v }; onChange(n)
  }
  const remove = (i: number) => onChange(value?.filter((_, idx) => idx !== i) || [])
  return (
    <Field label="FAQs" hint="Populates the FAQ accordion and injects JSON-LD schema.">
      <div className="space-y-4">
        {(value || []).map((faq, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-800/60 space-y-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-brand-cyan-600 dark:text-brand-cyan-400 uppercase tracking-wider">FAQ #{i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="text-red-500 text-xs hover:text-red-700 font-bold">Remove</button>
            </div>
            <input value={faq.question} onChange={e => update(i, 'question', e.target.value)} placeholder="Question" className={inputCls} />
            <textarea value={faq.answer} onChange={e => update(i, 'answer', e.target.value)} placeholder="Answer" rows={3} className={textareaCls} />
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-brand-cyan-600 dark:text-brand-cyan-400 hover:text-brand-cyan-800 font-semibold transition">
          <span className="text-lg leading-none">+</span> Add FAQ
        </button>
      </div>
    </Field>
  )
}

type Section = { id: string; title: string; content: string }
export function SectionsEditor({ value, onChange }: { value: Section[]; onChange: (v: Section[]) => void }) {
  const add = () => onChange([...(value || []), { id: `section-${(value || []).length + 1}`, title: '', content: '' }])
  const update = (i: number, field: keyof Section, v: string) => {
    const n = [...value]; n[i] = { ...n[i], [field]: v }; onChange(n)
  }
  const remove = (i: number) => onChange(value?.filter((_, idx) => idx !== i) || [])
  return (
    <Field label="Article Sections" hint="Each section becomes a heading + content block. Use markdown formatting.">
      <div className="space-y-4">
        {(value || []).map((section, i) => (
          <div key={i} className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Section #{i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="text-red-500 text-xs hover:text-red-700 font-bold">Remove</button>
            </div>
            <input value={section.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Section Heading" className={inputCls} />
            <textarea value={section.content} onChange={e => update(i, 'content', e.target.value)} placeholder="Section content..." rows={6} className={textareaCls} />
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-brand-cyan-600 dark:text-brand-cyan-400 hover:text-brand-cyan-800 font-semibold transition">
          <span className="text-lg leading-none">+</span> Add Section
        </button>
      </div>
    </Field>
  )
}

type ResultItem = { metric: string; label: string }
export function ResultsEditor({ value, onChange }: { value: ResultItem[]; onChange: (v: ResultItem[]) => void }) {
  const add = () => onChange([...(value || []), { metric: '', label: '' }])
  const update = (i: number, field: keyof ResultItem, v: string) => {
    const n = [...value]; n[i] = { ...n[i], [field]: v }; onChange(n)
  }
  const remove = (i: number) => onChange(value?.filter((_, idx) => idx !== i) || [])
  return (
    <Field label="Key Results" hint="Highlight metrics achieved in the case study.">
      <div className="space-y-2">
        {(value || []).map((res, i) => (
          <div key={i} className="flex gap-2">
            <input value={res.metric} onChange={e => update(i, 'metric', e.target.value)} className={inputCls + ' flex-1'} placeholder="Metric (e.g. 50%)" />
            <input value={res.label} onChange={e => update(i, 'label', e.target.value)} className={inputCls + ' flex-[2]'} placeholder="Label (e.g. Reduction in manual processing)" />
            <button type="button" onClick={() => remove(i)} className="px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-200 transition">✕</button>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-brand-cyan-600 dark:text-brand-cyan-400 hover:text-brand-cyan-800 font-semibold transition mt-2">
          <span className="text-lg leading-none">+</span> Add Result Metric
        </button>
      </div>
    </Field>
  )
}

export function SeoEditor({ value, onChange }: { value: any; onChange: (v: any) => void }) {
  const seo = value || {}
  const update = (field: string, v: string) => onChange({ ...seo, [field]: v })
  return (
    <Field label="SEO Configuration" hint="Meta tags and search engine overrides for this page.">
      <div className="space-y-3 p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50">
        <div>
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Meta Title</label>
          <input value={seo.metaTitle || ''} onChange={e => update('metaTitle', e.target.value)} className={inputCls} placeholder="Custom SEO title..." />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Meta Description</label>
          <textarea value={seo.metaDescription || ''} onChange={e => update('metaDescription', e.target.value)} className={textareaCls} placeholder="Custom SEO description..." rows={2} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1 block">Keywords</label>
          <input value={seo.keywords || ''} onChange={e => update('keywords', e.target.value)} className={inputCls} placeholder="keyword1, keyword2..." />
        </div>
      </div>
    </Field>
  )
}

export function GeoEditor({ value, onChange }: { value: any; onChange: (v: any) => void }) {
  const geo = value || { targetRegions: [], localSearchTerms: [] }
  const updateRegions = (v: string[]) => onChange({ ...geo, targetRegions: v })
  const updateTerms = (v: string[]) => onChange({ ...geo, localSearchTerms: v })
  return (
    <Field label="Geo-Targeting Signals" hint="Regions and local terms for AEO and Local SEO.">
      <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50 space-y-4">
        <StringListEditor label="Target Regions" value={geo.targetRegions || []} onChange={updateRegions} hint="e.g. North America, EMEA" />
        <StringListEditor label="Local Search Terms" value={geo.localSearchTerms || []} onChange={updateTerms} hint="e.g. enterprise ai automation near me" />
      </div>
    </Field>
  )
}

export function ImageUploader({ label, hint, value, onChange }: { label: string; hint?: string; value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `admin-upload-${Date.now()}.${fileExt}`
      const { error } = await supabase.storage.from('assets').upload(fileName, file)
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(fileName)
      onChange(publicUrl)
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="flex items-center gap-4">
        <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
          {value ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs text-gray-400">No Image</span>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-brand-cyan-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={handleUpload} />
          <button type="button" onClick={() => fileRef.current?.click()} className="self-start px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-semibold transition">
            Upload Image
          </button>
          <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder="Or paste image URL..." className={inputCls} />
        </div>
      </div>
    </Field>
  )
}

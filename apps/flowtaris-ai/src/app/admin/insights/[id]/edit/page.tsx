'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getInsightById, updateInsight, deleteInsight } from '@/lib/supabase'

// ─── Shared Components ────────────────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 italic">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls = 'w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition'
const textareaCls = inputCls + ' resize-y'

type FAQ = { question: string; answer: string }
type Section = { id: string; title: string; content: string }

function StringListEditor({ label, hint, value, onChange }: { label: string; hint?: string; value: string[]; onChange: (v: string[]) => void }) {
  const add = () => onChange([...value, ''])
  const update = (i: number, v: string) => { const n = [...value]; n[i] = v; onChange(n) }
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  return (
    <Field label={label} hint={hint}>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input value={item} onChange={e => update(i, e.target.value)} className={inputCls + ' flex-1'} placeholder={`Item ${i + 1}`} />
            <button type="button" onClick={() => remove(i)} className="px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-bold hover:bg-red-200 transition">✕</button>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 font-semibold transition">
          <span className="text-lg leading-none">+</span> Add item
        </button>
      </div>
    </Field>
  )
}

function FaqEditor({ value, onChange }: { value: FAQ[]; onChange: (v: FAQ[]) => void }) {
  const add = () => onChange([...value, { question: '', answer: '' }])
  const update = (i: number, field: keyof FAQ, v: string) => {
    const n = [...value]; n[i] = { ...n[i], [field]: v }; onChange(n)
  }
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  return (
    <Field label="FAQs" hint="Populates the FAQ accordion at the bottom of the article AND injects FAQPage JSON-LD schema in the <head> for Google Featured Snippets & AI Overviews.">
      <div className="space-y-4">
        {value.map((faq, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-800/60 space-y-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">FAQ #{i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="text-red-500 text-xs hover:text-red-700 font-bold">Remove</button>
            </div>
            <input value={faq.question} onChange={e => update(i, 'question', e.target.value)} placeholder="Question" className={inputCls} />
            <textarea value={faq.answer} onChange={e => update(i, 'answer', e.target.value)} placeholder="Answer (2-4 direct sentences)" rows={3} className={textareaCls} />
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 font-semibold transition">
          <span className="text-lg leading-none">+</span> Add FAQ
        </button>
      </div>
    </Field>
  )
}

function SectionsEditor({ value, onChange }: { value: Section[]; onChange: (v: Section[]) => void }) {
  const add = () => onChange([...value, { id: `section-${value.length + 1}`, title: '', content: '' }])
  const update = (i: number, field: keyof Section, v: string) => {
    const n = [...value]; n[i] = { ...n[i], [field]: v }; onChange(n)
  }
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  return (
    <Field label="Article Sections" hint="Each section becomes a heading + content block in the article. Use **bold**, *italic* and - bullet points in content.">
      <div className="space-y-4">
        {value.map((section, i) => (
          <div key={i} className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Section #{i + 1}</span>
              <button type="button" onClick={() => remove(i)} className="text-red-500 text-xs hover:text-red-700 font-bold">Remove</button>
            </div>
            <input value={section.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Section Heading" className={inputCls} />
            <textarea value={section.content} onChange={e => update(i, 'content', e.target.value)} placeholder="Section content..." rows={6} className={textareaCls} />
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-800 font-semibold transition">
          <span className="text-lg leading-none">+</span> Add Section
        </button>
      </div>
    </Field>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EditInsightPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [loadingData, setLoadingData] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Core fields
  const [dbId, setDbId] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [author, setAuthor] = useState('')
  const [authorRole, setAuthorRole] = useState('')
  const [authorBio, setAuthorBio] = useState('')
  const [category, setCategory] = useState('Research')
  const [readTime, setReadTime] = useState('10 min')
  const [publishDate, setPublishDate] = useState('')
  const [featured, setFeatured] = useState(false)
  const [excerpt, setExcerpt] = useState('')
  const [image, setImage] = useState('')
  const [keyClaims, setKeyClaims] = useState<string[]>([''])
  const [topicClusters, setTopicClusters] = useState<string[]>([''])
  const [sections, setSections] = useState<Section[]>([{ id: 'section-1', title: '', content: '' }])
  const [faqs, setFaqs] = useState<FAQ[]>([{ question: '', answer: '' }])

  useEffect(() => {
    if (!id) return
    getInsightById(id).then((data: any) => {
      if (!data) { setError('Insight not found'); setLoadingData(false); return }

      setDbId(data.id)
      setTitle(data.title || '')
      setSlug(data.slug || '')
      setAuthor(data.author || '')
      setAuthorRole(data.rich_text?.authorRole || '')
      setAuthorBio(data.rich_text?.authorBio || '')
      setCategory(data.rich_text?.category || 'Research')
      setReadTime(data.rich_text?.readTime || '10 min')
      setFeatured(data.rich_text?.featured || false)
      setImage(data.rich_text?.image || '')
      setExcerpt(data.excerpt || '')
      setPublishDate(data.published_at ? data.published_at.slice(0, 10) : '')
      setKeyClaims(data.rich_text?.keyClaims?.length ? data.rich_text.keyClaims : [''])
      setTopicClusters(data.topic_clusters?.length ? data.topic_clusters : [''])
      setSections(data.rich_text?.sections?.length ? data.rich_text.sections : [{ id: 'section-1', title: '', content: '' }])
      setFaqs(data.faq_items?.length ? data.faq_items : [{ question: '', answer: '' }])
      setLoadingData(false)
    }).catch(() => { setError('Failed to load insight'); setLoadingData(false) })
  }, [id])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError(null); setSuccess(null)
    try {
      await updateInsight(dbId, {
        slug,
        title,
        author,
        excerpt,
        published_at: publishDate ? new Date(publishDate).toISOString() : null,
        rich_text: {
          category,
          authorRole,
          authorBio,
          readTime,
          featured,
          image,
          keyClaims: keyClaims.filter(Boolean),
          sections: sections.filter(s => s.title || s.content),
        },
        topic_clusters: topicClusters.filter(Boolean),
        faq_items: faqs.filter(f => f.question || f.answer),
        citations: [],
      })
      setSuccess('✓ Insight saved successfully! Changes are live on the site within 60 seconds.')
    } catch (err: any) {
      setError(err.message || 'Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true); setError(null)
    try {
      await deleteInsight(dbId)
      router.push('/admin/insights')
    } catch (err: any) {
      setError(err.message || 'Failed to delete insight.')
      setDeleting(false)
    }
  }

  if (loadingData) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading insight data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      {/* Header */}
      <div className="flex justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Insight Article</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Changes are saved to the database and reflected live within 60 seconds.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {slug && (
            <a href={`/insights/${slug}`} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-600 dark:text-sky-400 hover:underline">
              View Live →
            </a>
          )}
          <a href="/admin/insights" className="text-sm text-violet-600 hover:underline">← Back</a>
        </div>
      </div>

      {error && <div className="bg-red-50 dark:bg-red-900/40 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">{error}</div>}
      {success && <div className="bg-green-50 dark:bg-green-900/40 border border-green-400 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-6 text-sm">{success}</div>}

      <form onSubmit={handleSave} className="space-y-8">

        {/* ── CORE IDENTITY ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-5">📋 Core Identity</h2>

          <Field label="Article Title *" hint="The large H1 heading at the top of the article page and the browser tab title.">
            <input value={title} onChange={e => setTitle(e.target.value)} required className={inputCls} />
          </Field>

          <Field label="URL Slug" hint="The URL of this article: flowtaris.ai/insights/[slug]. Changing this will break existing links.">
            <div className="flex items-center">
              <span className="text-xs text-gray-400 dark:text-gray-500 mr-2 shrink-0">/insights/</span>
              <input value={slug} onChange={e => setSlug(e.target.value)} className={inputCls} />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" hint="The purple tag on the article card. Also groups articles in the sidebar navigation.">
              <select value={category} onChange={e => setCategory(e.target.value)} className={inputCls}>
                {['Research', 'Benchmarks', 'Analysis', 'Guides', 'Compliance', 'Technology', 'Case Studies'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Read Time" hint="Shown on article card next to the clock icon.">
              <input value={readTime} onChange={e => setReadTime(e.target.value)} className={inputCls} placeholder="15 min" />
            </Field>
          </div>

          <Field label="Publish Date" hint="The publication date shown below the author name.">
            <input type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} className={inputCls} />
          </Field>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
            <input type="checkbox" id="featured-edit" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4 rounded accent-violet-600" />
            <div>
              <label htmlFor="featured-edit" className="text-sm font-semibold text-gray-800 dark:text-gray-200 cursor-pointer">Featured Article</label>
              <p className="text-xs text-gray-400 dark:text-gray-500 italic">Featured articles may be highlighted at the top of the insights listing.</p>
            </div>
          </div>
        </div>

        {/* ── HERO IMAGE ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-5">🖼️ Hero Image</h2>

          <Field label="Image Path" hint="Used as both the article card thumbnail AND the hero banner at the top of the article. Path must start with /insights/ (e.g. /insights/my-image.png). Upload your image file to public/insights/ first.">
            <input value={image} onChange={e => setImage(e.target.value)} className={inputCls} placeholder="/insights/my-article-image.png" />
          </Field>

          {image && (
            <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 max-h-52">
              <img src={image} alt="Preview" className="w-full h-52 object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
            </div>
          )}

          {image && (
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-600">
                <strong>Article Card:</strong> This image appears as the article card thumbnail on the main Insights page.
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-600">
                <strong>Article Hero:</strong> This image also appears as the full-width banner at the top of the article page.
              </div>
            </div>
          )}
        </div>

        {/* ── AUTHOR ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-5">👤 Author Details</h2>

          <Field label="Author Name" hint="Appears on the article card and below the article title (e.g. 'Dr. Sarah Chen').">
            <input value={author} onChange={e => setAuthor(e.target.value)} className={inputCls} />
          </Field>

          <Field label="Author Role / Title" hint="Shown in small text next to the author name in the article sidebar (e.g. 'Head of Automation Strategy').">
            <input value={authorRole} onChange={e => setAuthorRole(e.target.value)} className={inputCls} />
          </Field>

          <Field label="Author Bio" hint="A 1-2 sentence biography displayed in the author box at the bottom of the article.">
            <textarea value={authorBio} onChange={e => setAuthorBio(e.target.value)} rows={2} className={textareaCls} />
          </Field>
        </div>

        {/* ── CONTENT ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-5">📝 Article Content</h2>

          <Field label="Excerpt / Summary *" hint="The 2-3 sentence preview shown on the article card. This is the first thing a visitor reads before clicking through.">
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} required rows={3} className={textareaCls} />
          </Field>

          <StringListEditor
            label="Key Claims / Data Points"
            hint="Numbered bullet points shown in the highlighted 'Key Takeaways' box at the top of the article. Each should be a striking stat or bold claim."
            value={keyClaims}
            onChange={setKeyClaims}
          />

          <SectionsEditor value={sections} onChange={setSections} />
        </div>

        {/* ── SEO & AEO ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-5">🔍 SEO & AEO (Answer Engine Optimization)</h2>

          <FaqEditor value={faqs} onChange={setFaqs} />

          <StringListEditor
            label="Topic Clusters / Tags"
            hint="Keywords used to group this article. These also appear in the sidebar filter on the Insights listing page."
            value={topicClusters}
            onChange={setTopicClusters}
          />
        </div>

        {/* ── FOOTER ACTIONS ── */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-5 py-2.5 rounded-xl border border-red-300 dark:border-red-700 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/40 transition"
          >
            Delete Article
          </button>

          <div className="flex items-center gap-3">
            <a href="/admin/insights" className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              Cancel
            </a>
            <button type="submit" disabled={saving} className="px-8 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold disabled:opacity-60 transition shadow-md">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete this article?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              You are about to permanently delete <strong className="text-gray-800 dark:text-gray-200">"{title}"</strong>. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting} className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold disabled:opacity-60 transition">
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

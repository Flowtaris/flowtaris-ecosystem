'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getInsights, deleteInsight } from '@/lib/supabase'
import { BookOpen, Clock, Calendar, Tag, Pencil, Trash2, Plus, ExternalLink } from 'lucide-react'

export default function InsightsAdminPage() {
  const [insights, setInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null)

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const data = await getInsights()
      setInsights(data || [])
    } catch (err: any) {
      setError('Failed to load insights. Check your Supabase connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchInsights() }, [])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteInsight(id)
      setInsights(prev => prev.filter(i => i.id !== id))
    } catch (err: any) {
      setError('Failed to delete insight.')
    } finally {
      setDeletingId(null)
      setConfirmDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-16">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading insights from database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Insights & Blog</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {insights.length} article{insights.length !== 1 ? 's' : ''} in the database — all changes go live within 60 seconds.
          </p>
        </div>
        <Link
          href="/admin/insights/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition shadow-md"
        >
          <Plus className="w-4 h-4" /> New Article
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/40 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Legend / Field Map */}
      <div className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-700 rounded-2xl p-5 mb-8">
        <h3 className="text-sm font-bold text-violet-700 dark:text-violet-300 mb-3">📍 Where each field appears on the live site</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-gray-600 dark:text-gray-400">
          <div><strong className="text-gray-800 dark:text-gray-200">Title →</strong> Article page H1 heading + browser tab + article card</div>
          <div><strong className="text-gray-800 dark:text-gray-200">Image →</strong> Article card thumbnail + article hero banner</div>
          <div><strong className="text-gray-800 dark:text-gray-200">Category →</strong> Purple tag on card + sidebar filter group</div>
          <div><strong className="text-gray-800 dark:text-gray-200">Excerpt →</strong> Preview text on article card (main insights page)</div>
          <div><strong className="text-gray-800 dark:text-gray-200">Author →</strong> Card footer + article title area + author bio box</div>
          <div><strong className="text-gray-800 dark:text-gray-200">Key Claims →</strong> "Key Takeaways" box at top of article</div>
          <div><strong className="text-gray-800 dark:text-gray-200">Sections →</strong> Main article body blocks (heading + content)</div>
          <div><strong className="text-gray-800 dark:text-gray-200">FAQs →</strong> FAQ accordion at bottom of article + Google Schema</div>
          <div><strong className="text-gray-800 dark:text-gray-200">Topic Clusters →</strong> Sidebar category filter on insights page</div>
        </div>
      </div>

      {insights.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
          <BookOpen className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-4">No insights in the database yet.</p>
          <Link href="/admin/insights/new" className="inline-flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:underline font-semibold">
            <Plus className="w-4 h-4" /> Create your first article
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight) => {
            const richText = insight.rich_text || {}
            const image = richText.image || null
            const category = richText.category || '—'
            const readTime = richText.readTime || '—'
            const faqCount = (insight.faq_items || []).length
            const sectionCount = (richText.sections || []).length

            return (
              <div key={insight.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="flex gap-0">
                  {/* Thumbnail */}
                  <div className="w-36 shrink-0 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    {image ? (
                      <img src={image} alt={insight.title} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
                        <BookOpen className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-2 py-0.5 rounded-md">
                            {category}
                          </span>
                          {richText.featured && (
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md">
                              ⭐ Featured
                            </span>
                          )}
                        </div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white leading-snug truncate">{insight.title}</h2>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`/insights/${insight.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg text-gray-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 transition"
                          title="View live article"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/admin/insights/${insight.id}/edit`}
                          className="p-2 rounded-lg text-gray-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition"
                          title="Edit article"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setConfirmDelete({ id: insight.id, title: insight.title })}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {insight.excerpt && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{insight.excerpt}</p>
                    )}

                    {/* Metadata Row */}
                    <div className="flex items-center gap-4 flex-wrap text-xs text-gray-400 dark:text-gray-500">
                      {insight.author && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> {insight.author}
                        </span>
                      )}
                      {insight.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {new Date(insight.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                      {readTime !== '—' && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {readTime}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {sectionCount} sections · {faqCount} FAQs
                      </span>
                    </div>

                    {/* Slug */}
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <code className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 px-2 py-0.5 rounded">
                        /insights/{insight.slug}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Delete this article?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              You are about to permanently delete <strong className="text-gray-800 dark:text-gray-200">"{confirmDelete.title}"</strong>. This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete.id)}
                disabled={deletingId === confirmDelete.id}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold disabled:opacity-60 transition"
              >
                {deletingId === confirmDelete.id ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

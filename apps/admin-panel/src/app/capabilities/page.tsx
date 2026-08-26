'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Edit3, Eye, CheckCircle2, Clock, FlaskConical, Plus, RefreshCw, Globe, GlobeOff } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

interface Capability {
  id: string
  slug: string
  category: string
  title: string
  headline: string
  maturity: 'production' | 'pilot' | 'research'
  is_published: boolean
  accent_color?: string
  updated_at: string
}

const MATURITY_CONFIG = {
  production: { label: 'Production', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
  pilot: { label: 'Pilot', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', icon: Clock },
  research: { label: 'Research', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', icon: FlaskConical },
}

const SEED_DATA = [
  { slug: 'genai-document-intelligence', title: 'GenAI Document Intelligence', category: 'DOCUMENT PROCESSING', accent_color: '#f59e0b' },
  { slug: 'autonomous-workflow-engine', title: 'Autonomous Workflow Engine', category: 'PROCESS AUTOMATION', accent_color: '#10b981' },
  { slug: 'predictive-analytics', title: 'Predictive Analytics', category: 'FINANCE INTELLIGENCE', accent_color: '#8b5cf6' },
  { slug: 'conversational-erp', title: 'Conversational ERP Interface', category: 'HUMAN COMPUTER INTERACTION', accent_color: '#06b6d4' },
  { slug: 'integration-health-monitoring', title: 'Integration Health Monitoring', category: 'OBSERVABILITY', accent_color: '#ef4444' },
  { slug: 'ai-governance-compliance', title: 'AI Governance & Compliance', category: 'RISK AND COMPLIANCE', accent_color: '#eab308' },
]

export default function CapabilitiesAdminPage() {
  const [capabilities, setCapabilities] = useState<Capability[]>([])
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [toggling, setToggling] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function getSupabase() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  async function loadCapabilities() {
    setLoading(true)
    setError(null)
    try {
      const supabase = getSupabase()
      const { data, error } = await supabase
        .from('capabilities')
        .select('id, slug, category, title, headline, maturity, is_published, accent_color, updated_at')
        .order('created_at', { ascending: true })
      if (error) throw error
      setCapabilities(data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load capabilities. Have you run the Supabase migration?')
    } finally {
      setLoading(false)
    }
  }

  async function handleSeedAll() {
    setSeeding(true)
    try {
      const supabase = getSupabase()
      const { error } = await supabase.from('capabilities').upsert(
        SEED_DATA.map(c => ({
          slug: c.slug,
          title: c.title,
          category: c.category,
          headline: `[Edit this headline for ${c.title}]`,
          subheadline: `[Edit this subheadline for ${c.title}]`,
          accent_color: c.accent_color,
          maturity: 'production',
          is_published: false,
          stats: [],
          steps: [],
          technical_details: [],
          integrations: [],
          faq_items: [],
          related_slugs: [],
        })),
        { onConflict: 'slug', ignoreDuplicates: true }
      )
      if (error) throw error
      await loadCapabilities()
    } catch (err: any) {
      setError(err.message || 'Seeding failed')
    } finally {
      setSeeding(false)
    }
  }

  async function togglePublish(cap: Capability) {
    setToggling(cap.id)
    try {
      const supabase = getSupabase()
      const { error } = await supabase
        .from('capabilities')
        .update({ is_published: !cap.is_published })
        .eq('id', cap.id)
      if (error) throw error
      setCapabilities(prev => prev.map(c => c.id === cap.id ? { ...c, is_published: !c.is_published } : c))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setToggling(null)
    }
  }

  useEffect(() => { loadCapabilities() }, [])

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-slate-900">AI Capabilities</h1>
          <p className="text-slate-500 mt-2">Manage content, SEO metadata, FAQs, and publish status for all 6 capability pages.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadCapabilities}
            disabled={loading}
            className="inline-flex items-center gap-2 text-sm text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <a
            href="https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-600 border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-4 h-4" /> View Live
          </a>
          {capabilities.length === 0 && !loading && (
            <button
              onClick={handleSeedAll}
              disabled={seeding}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-60"
            >
              <Plus className="w-4 h-4" /> {seeding ? 'Seeding…' : 'Seed All 6 Capabilities'}
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <strong>Error:</strong> {error}
          {error.includes('migration') && (
            <div className="mt-2">Run <code className="bg-red-100 px-1 rounded">20260826000001_create_capabilities_table.sql</code> in your Supabase SQL editor first.</div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-16 text-center">
            <div className="inline-block w-6 h-6 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 text-sm">Loading from database…</p>
          </div>
        ) : capabilities.length === 0 ? (
          <div className="p-16 text-center text-slate-500">
            <div className="text-4xl mb-4">📭</div>
            <p className="font-medium mb-2">No capabilities found in the database.</p>
            <p className="text-sm mb-6">Run the migration first, then use the "Seed All 6" button to populate initial records.</p>
            <button onClick={handleSeedAll} disabled={seeding} className="inline-flex items-center gap-2 text-sm font-semibold bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-60">
              <Plus className="w-4 h-4" /> {seeding ? 'Seeding…' : 'Seed All 6 Capabilities'}
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Capability</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 hidden md:table-cell">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 hidden lg:table-cell">Updated</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {SEED_DATA.map((seed) => {
                const cap = capabilities.find(c => c.slug === seed.slug)
                const maturity = cap ? (MATURITY_CONFIG[cap.maturity] || MATURITY_CONFIG.production) : null
                const MaturityIcon = maturity?.icon || CheckCircle2
                return (
                  <tr key={seed.slug} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {/* Color dot */}
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: seed.accent_color }} />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{seed.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5 font-mono">/capabilities/{seed.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      {cap ? (
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${maturity?.color}`}>
                            <MaturityIcon className="w-3 h-3" /> {maturity?.label}
                          </span>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${cap.is_published ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 'text-slate-500 bg-slate-100 border-slate-200'}`}>
                            {cap.is_published ? '● Live' : '○ Draft'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">Not seeded</span>
                      )}
                    </td>
                    <td className="px-6 py-5 hidden lg:table-cell text-xs text-slate-400">
                      {cap ? new Date(cap.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Preview */}
                        <a
                          href={`https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/${seed.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Preview live page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>

                        {/* Publish toggle — only if seeded */}
                        {cap && (
                          <button
                            onClick={() => togglePublish(cap)}
                            disabled={toggling === cap.id}
                            className={`p-2 rounded-lg transition-colors ${cap.is_published ? 'text-emerald-600 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-100'}`}
                            title={cap.is_published ? 'Unpublish' : 'Publish'}
                          >
                            {cap.is_published ? <Globe className="w-4 h-4" /> : <GlobeOff className="w-4 h-4" />}
                          </button>
                        )}

                        {/* Edit */}
                        {cap ? (
                          <Link
                            href={`/capabilities/${cap.id}/edit`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </Link>
                        ) : (
                          <button
                            onClick={handleSeedAll}
                            disabled={seeding}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" /> Seed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-6 text-center">
        Capabilities are served from Supabase when the DB is configured, or from static fallback data when not connected.
      </p>
    </div>
  )
}
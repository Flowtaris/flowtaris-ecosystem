'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Edit3, Eye, CheckCircle2, Clock, FlaskConical, ChevronRight, Plus } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

interface Capability {
  id: string
  slug: string
  category: string
  title: string
  headline: string
  maturity: 'production' | 'pilot' | 'research'
  is_published: boolean
  updated_at: string
}

const MATURITY_CONFIG = {
  production: { label: 'Production', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: CheckCircle2 },
  pilot: { label: 'Pilot', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: Clock },
  research: { label: 'Research', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: FlaskConical },
}

export default function CapabilitiesAdminPage() {
  const [capabilities, setCapabilities] = useState<Capability[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCapabilities() {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        const { data, error } = await supabase
          .from('capabilities')
          .select('id, slug, category, title, headline, maturity, is_published, updated_at')
          .order('updated_at', { ascending: false })

        if (error) throw error
        setCapabilities(data || [])
      } catch (err) {
        console.error('Failed to load capabilities:', err)
      } finally {
        setLoading(false)
      }
    }
    loadCapabilities()
  }, [])

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Capabilities Content</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage the rich content, SEO metadata, and FAQs for the 6 capability detail pages.
          </p>
        </div>
        <a
          href="https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <Eye className="w-4 h-4" /> View Live
        </a>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading capabilities from database...</div>
        ) : capabilities.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No capabilities found. Please run the Supabase migration `20260826000001_create_capabilities_table.sql` first.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Capability</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 hidden md:table-cell">Category</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 hidden lg:table-cell">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 hidden lg:table-cell">Updated</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {capabilities.map((cap, i) => {
                const maturity = MATURITY_CONFIG[cap.maturity] || MATURITY_CONFIG.production
                const MaturityIcon = maturity.icon
                return (
                  <tr key={cap.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900 text-sm">{cap.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 font-mono">/capabilities/{cap.slug}</div>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      <span className="text-xs text-slate-500 font-medium">{cap.category}</span>
                    </td>
                    <td className="px-6 py-5 hidden lg:table-cell">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${maturity.color}`}>
                        <MaturityIcon className="w-3 h-3" />
                        {maturity.label}
                      </span>
                    </td>
                    <td className="px-6 py-5 hidden lg:table-cell">
                      <span className="text-xs text-slate-400">
                        {new Date(cap.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/${cap.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Preview live page"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                        <Link
                          href={`/capabilities/${cap.slug}/edit`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-700 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
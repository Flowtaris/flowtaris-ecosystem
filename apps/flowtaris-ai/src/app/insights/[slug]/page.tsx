import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Container } from '@repo/ui'
import { ArrowRight, ChevronRight, Clock, BookOpen, FileText, Lightbulb, Brain, Search, ExternalLink, Calendar, Twitter, Linkedin, HelpCircle } from 'lucide-react'
import { createAdminClient, getInsights } from '@/lib/supabase'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60 // Revalidate cache every 60 seconds

export async function generateStaticParams() {
  try {
    const insights = await getInsights()
    return insights.map((i: any) => ({ slug: i.slug }))
  } catch (e) {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const { slug } = resolvedParams
  const client = createAdminClient()
  const { data: dbData } = await client.from('insights').select('*').eq('slug', slug).single()

  if (!dbData) return { title: 'Insight Not Found' }

  return {
    title: `${dbData.title} | Flowtaris AI Insights`,
    description: dbData.excerpt,
  }
}

export default async function InsightPage({ params }: Props) {
  const resolvedParams = await params
  const { slug } = resolvedParams
  
  const client = createAdminClient()
  const { data: dbData } = await client.from('insights').select('*').eq('slug', slug).single()

  if (!dbData) return notFound()

  // Reconstruct the data object that the frontend expects
  const data = {
    title: dbData.title,
    category: dbData.rich_text?.category || 'Research',
    author: dbData.author || 'Flowtaris AI',
    authorRole: dbData.rich_text?.authorRole || '',
    authorBio: dbData.rich_text?.authorBio || '',
    publishDate: dbData.published_at || dbData.created_at,
    readTime: dbData.rich_text?.readTime || '10 min',
    excerpt: dbData.excerpt || '',
    image: dbData.rich_text?.image || null,
    keyClaims: dbData.rich_text?.keyClaims || [],
    faqs: dbData.faq_items || [],
    citations: dbData.citations || [],
    sections: dbData.rich_text?.sections || [],
  }

  const formattedDate = new Date(data.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // Generate AEO / FAQ Schema
  const schemaOrgJSONLD = data.faqs && data.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': data.faqs.map((faq: any) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  } : null;

  return (
    <div className="flex flex-col flex-1 w-full bg-[#0B0F19] text-white">
      {schemaOrgJSONLD && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgJSONLD) }}
        />
      )}
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 border-b-2 border-white/10 relative overflow-hidden" aria-labelledby="article-header">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#c084fc] blur-[150px] opacity-10" />
        <Container size="xl" className="relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            
            {/* Tag row */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-none border border-[#c084fc] bg-[#c084fc]/10 px-3 py-1 text-sm font-bold text-[#c084fc] shadow-[4px_4px_0px_#c084fc] uppercase tracking-wider">
                {data.category}
              </div>
              {data.featured && (
                <div className="inline-flex items-center rounded-none border border-[#38bdf8] bg-[#38bdf8]/10 px-3 py-1 text-sm font-bold text-[#38bdf8] shadow-[4px_4px_0px_#38bdf8] uppercase tracking-wider">
                  Featured
                </div>
              )}
              <span className="flex items-center gap-2 text-sm font-bold text-neutral-400">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2 text-sm font-bold text-neutral-400">
                <Clock className="h-4 w-4" />
                {data.readTime}
              </span>
            </div>

            <h1 id="article-header" className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              {data.title}
            </h1>

            <div className="flex items-center gap-4 bg-[#111827] border-2 border-white/10 rounded-xl p-6 max-w-2xl shadow-xl">
              <div className="w-16 h-16 rounded-lg bg-[#c084fc]/20 flex items-center justify-center border border-[#c084fc]/50">
                <Brain className="h-8 w-8 text-[#c084fc]" />
              </div>
              <div>
                <p className="font-black text-xl text-white">{data.author}</p>
                <p className="text-sm font-bold text-[#38bdf8]">{data.authorRole}</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl font-bold text-neutral-300 leading-relaxed border-l-4 border-[#38bdf8] pl-6 mt-4">
              {data.excerpt}
            </p>
          </div>
        </Container>
      </section>

      <main className="flex-1 w-full py-16 px-6">
        <Container size="xl">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Sidebar (TOC & Share) */}
            <aside className="lg:col-span-4 lg:sticky top-32 space-y-8">
              <div className="bg-[#111827] border-2 border-white/10 rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 border-b-2 border-white/10 pb-4 uppercase tracking-widest">
                  <BookOpen className="h-5 w-5 text-[#c084fc]" />
                  Contents
                </h3>
                <nav>
                  <ul className="space-y-4 font-bold">
                    {data.sections.map((section: any) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`} className="text-neutral-400 hover:text-white transition-colors flex items-center gap-3">
                          <span className="text-[#38bdf8] text-lg font-black">/</span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                    {data.keyClaims?.length > 0 && (
                      <li>
                        <a href="#key-claims" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-3">
                          <span className="text-[#38bdf8] text-lg font-black">/</span>
                          Key Claims
                        </a>
                      </li>
                    )}
                    {data.faqs?.length > 0 && (
                      <li>
                        <a href="#faq" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-3">
                          <span className="text-[#38bdf8] text-lg font-black">/</span>
                          FAQ
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>

              <div className="bg-transparent border-2 border-[#c084fc] rounded-2xl p-8 shadow-[6px_6px_0px_#c084fc]">
                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-widest">Share Report</h3>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center justify-center w-12 h-12 bg-[#111827] border border-[#c084fc]/50 text-white rounded-lg hover:bg-[#c084fc] transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="flex items-center justify-center w-12 h-12 bg-[#111827] border border-[#c084fc]/50 text-white rounded-lg hover:bg-[#c084fc] transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#download-pdf" className="flex items-center justify-center px-4 h-12 bg-[#111827] border border-[#c084fc]/50 text-white rounded-lg hover:bg-[#c084fc] transition-colors font-bold text-sm gap-2">
                    <FileText className="h-4 w-4" /> PDF
                  </a>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-8">
              
              {/* Realistic Corporate Image at the Top of Content */}
              {data.image && (
                <div className="mb-16 border-2 border-white/20 p-2 bg-white/5 rounded-2xl shadow-2xl overflow-hidden relative group">
                  <img src={data.image} alt={data.title} className="w-full h-auto rounded-xl shadow-lg border border-white/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 rounded-2xl pointer-events-none">
                     <p className="text-white font-bold text-sm uppercase tracking-widest">Figure 1.0 - Flowtaris Telemetry Data</p>
                  </div>
                </div>
              )}

              {data.sections.map((section: any) => (
                <article key={section.id} id={section.id} className="mb-16">
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-8 pb-4 border-b-2 border-white/10 flex items-center gap-4">
                    <span className="text-[#c084fc]">#</span> {section.title}
                  </h2>
                  <div className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-p:font-medium prose-p:text-neutral-300 prose-p:leading-relaxed prose-strong:font-black prose-strong:text-white prose-ul:font-medium prose-ul:text-neutral-300">
                    {section.content.split('\n\n').map((paragraph: string, i: number) => {
                      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                        return (
                          <ul key={i} className="list-disc pl-6 mb-8 space-y-3">
                            {paragraph.split('\n').map((item, j) => (
                              <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^[-*]\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                            ))}
                          </ul>
                        )
                      }
                      if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                        return (
                          <ol key={i} className="list-decimal pl-6 mb-8 space-y-3 font-medium text-lg">
                            {paragraph.split('\n').map((item, j) => (
                              <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                            ))}
                          </ol>
                        )
                      }
                      return (
                        <p key={i} className="mb-8 text-xl" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                      )
                    })}
                  </div>
                </article>
              ))}

              {/* Key Claims */}
              {data.keyClaims?.length > 0 && (
                <article id="key-claims" className="mb-16">
                  <h2 className="text-3xl font-black text-white mb-8 pb-4 border-b-2 border-white/10 flex items-center gap-4">
                    <Lightbulb className="h-8 w-8 text-[#e8ff7d]" />
                    Key Claims
                  </h2>
                  <div className="bg-[#111827] border border-white/10 rounded-2xl p-8 space-y-4 shadow-xl">
                    {data.keyClaims.map((claim: string, i: number) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-black/40 border border-[#e8ff7d]/20 rounded-xl">
                        <span className="flex-shrink-0 text-xl font-black text-[#e8ff7d]">{i + 1}.</span>
                        <p className="text-lg font-bold text-white flex-1">{claim}</p>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* FAQs (AEO Optimization) */}
              {data.faqs?.length > 0 && (
                <article id="faq" className="mb-16">
                  <h2 className="text-3xl font-black text-white mb-8 pb-4 border-b-2 border-white/10 flex items-center gap-4">
                    <HelpCircle className="h-8 w-8 text-[#38bdf8]" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {data.faqs.map((faq: any, i: number) => (
                      <details key={i} className="group bg-[#111827] border border-white/10 rounded-2xl p-6 open:bg-[#1f2937] transition-colors cursor-pointer">
                        <summary className="text-xl font-black text-white flex justify-between items-center outline-none">
                          {faq.question}
                          <ChevronRight className="h-6 w-6 text-[#c084fc] group-open:rotate-90 transition-transform" />
                        </summary>
                        <p className="mt-4 text-lg font-medium text-neutral-300 leading-relaxed pl-2 border-l-2 border-[#38bdf8]">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </article>
              )}

              {/* Related CTA */}
              <div className="mt-24 bg-[#0B0F19] border-2 border-[#38bdf8] p-12 shadow-[12px_12px_0px_#38bdf8] text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c084fc] blur-[80px] opacity-20" />
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Ready to Apply These Insights?
                </h2>
                <p className="text-xl font-bold text-neutral-400 mb-10 max-w-2xl mx-auto">
                  Take our 3-minute diagnostic to get a personalized AI automation roadmap.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                  <a href="/assessment" className="inline-flex items-center justify-center px-10 h-16 bg-[#38bdf8] border-2 border-white rounded-none font-black text-xl text-black shadow-[6px_6px_0px_#fff] hover:translate-x-1 hover:-translate-y-1 transition-transform uppercase tracking-wider">
                    Start Free Assessment
                  </a>
                </div>
              </div>

            </div>

          </div>
        </Container>
      </main>
    </div>
  )
}
import { Metadata } from 'next'
import { Container, Badge, Button, Input } from '@repo/ui'
import { ArrowRight, BookOpen, Clock, PlayCircle } from 'lucide-react'

const categories = ['All', 'Research', 'Benchmarks', 'Guides', 'Case Studies', 'Announcements']
const insights = [
  {
    slug: 'state-of-ai-automation-2025',
    title: 'State of AI Automation in Enterprise Finance 2025',
    category: 'Research',
    author: 'Dr. Sarah Chen',
    publishDate: '2025-01-15',
    readTime: '12 min',
    excerpt: 'Our annual survey of 500+ finance leaders reveals 73% plan to deploy GenAI document processing by 2026, but only 12% have production implementations.',
    tags: ['GenAI', 'Finance', 'Automation', 'Survey'],
    featured: true,
  },
  {
    slug: 'ap-automation-benchmark-2024',
    title: 'AP Automation Benchmark Report 2024',
    category: 'Benchmarks',
    author: 'Marcus Rodriguez',
    publishDate: '2024-11-20',
    readTime: '18 min',
    excerpt: 'Comprehensive benchmarks across 200+ implementations: processing times, error rates, cost per invoice, and automation rates by platform.',
    tags: ['AP Automation', 'Benchmarks', 'KPIs', 'ROI'],
    featured: true,
  },
  {
    slug: 'conversational-erp-future',
    title: 'The Future of ERP: Conversational Interfaces & Natural Language SQL',
    category: 'Research',
    author: 'Dr. Alex Kim',
    publishDate: '2024-03-08',
    readTime: '20 min',
    excerpt: 'Deep dive into the next paradigm shift: moving from click-based ERP to conversational interfaces. Technical architecture, current capabilities, and 3-year roadmap.',
    tags: ['Conversational ERP', 'Natural Language SQL', 'Future', 'Innovation'],
    featured: true,
  },
  {
    slug: 'eu-ai-act-compliance-guide',
    title: 'EU AI Act Compliance Guide for Finance AI Systems',
    category: 'Guides',
    author: 'Elena Volkov',
    publishDate: '2024-09-10',
    readTime: '22 min',
    excerpt: 'Practical roadmap for classifying your finance AI systems under the EU AI Act, implementing required controls, and achieving compliance before the 2025 deadline.',
    tags: ['EU AI Act', 'Compliance', 'Governance'],
    featured: false,
  },
  {
    slug: 'genai-vs-ocr-invoice-processing',
    title: 'GenAI vs OCR: Invoice Processing Accuracy Showdown',
    category: 'Research',
    author: 'Dr. James Park',
    publishDate: '2024-07-22',
    readTime: '15 min',
    excerpt: 'Head-to-head comparison of GenAI document intelligence vs traditional OCR/RPA on 50,000 real invoices across 15 formats and 8 languages.',
    tags: ['GenAI', 'OCR', 'Accuracy'],
    featured: false,
  },
  {
    slug: 'roi-automation-calculator-methodology',
    title: 'ROI Calculator Methodology: How We Calculate Your Savings',
    category: 'Guides',
    author: 'Priya Sharma',
    publishDate: '2024-05-15',
    readTime: '10 min',
    excerpt: 'Transparent breakdown of the formulas, assumptions, and data sources behind our ROI Calculator. Every variable explained so you can validate or customize.',
    tags: ['ROI', 'Methodology', 'Calculator'],
    featured: false,
  },
]

export const metadata: Metadata = {
  title: 'Insights & Research | Flowtaris AI',
  description: 'Original research, benchmarks, and thought leadership on AI automation in enterprise finance.',
}

export default function InsightsPage() {
  return (
    <div className="flex flex-col flex-1 w-full bg-[#0B0F19]">
      
      {/* 1. HERO SECTION (Asymmetric Split Design) */}
      <section className="relative w-full pt-32 pb-16 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-brand-navy-400/10 blur-[120px]" />

        <Container size="xl" className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography targeting CFO */}
            <div className="lg:col-span-6 lg:pr-8">
              <Badge variant="outline" className="mb-6 border-brand-cyan-500/30 text-brand-cyan-400 bg-brand-cyan-500/10">
                Strategic Insights for Finance Leaders
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
                Empower Your <br />
                <span className="text-gradient-brand">Financial Strategy</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-lg leading-relaxed">
                Explore original research, benchmark data, and proven methodologies to navigate AI adoption and automation in enterprise finance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-brand-cyan-500 hover:bg-brand-cyan-400 text-brand-navy-900 rounded-full px-8" asChild>
                  <a href="/assessment">
                    Take the Diagnostic
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 rounded-full px-8" asChild>
                  <a href="#research">
                    Explore Research
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column: Custom Animated SVG Graphic (The "Pill" design) */}
            <div className="lg:col-span-6 relative h-[400px] sm:h-[500px] w-full flex items-center justify-center">
              
              {/* Outer Graphic Container */}
              <div className="relative w-full max-w-[500px] aspect-[4/3] bg-surface-layer2/30 backdrop-blur-3xl border border-white/5 rounded-[120px] overflow-hidden flex items-center justify-end p-8 shadow-2xl">
                
                {/* Decorative Dots Pattern */}
                <div className="absolute left-8 bottom-8 w-24 h-24 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.5" fill="#fff" />
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
                  </svg>
                </div>

                {/* Floating Circle */}
                <div className="absolute left-16 top-16 w-12 h-12 rounded-full bg-brand-cyan-400 shadow-[0_0_30px_rgba(45,212,191,0.4)] animate-pulse" />

                {/* Inner Concentric Rings */}
                <div className="relative w-64 h-64 border border-brand-cyan-500/20 rounded-full flex flex-col items-center justify-center gap-4">
                  <div className="absolute inset-2 border border-white/5 rounded-full" />
                  
                  {/* Floating Badges (Animated) */}
                  <div className="relative z-10 bg-surface-layer1 border border-white/10 px-6 py-2.5 rounded-full shadow-lg transform transition-transform animate-[bounce_4s_infinite]">
                    <span className="text-white font-medium">Compliance</span>
                  </div>
                  
                  <div className="relative z-10 bg-brand-cyan-500 px-8 py-3 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.3)] transform transition-transform animate-[bounce_5s_infinite_1s]">
                    <span className="text-brand-navy-900 font-bold text-lg">ROI Data</span>
                  </div>
                  
                  <div className="relative z-10 bg-surface-layer1 border border-white/10 px-6 py-2.5 rounded-full shadow-lg transform transition-transform animate-[bounce_6s_infinite_0.5s]">
                    <span className="text-white font-medium">Research</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. LOGO STRIP DIVIDER */}
      <section className="w-full border-y border-white/10 bg-surface-layer1/50 py-8">
        <Container size="xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-sm font-semibold tracking-widest text-neutral-400 uppercase">Featured Insights & Benchmarks</span>
            <div className="flex items-center gap-12 md:gap-24 font-bold text-xl text-neutral-300">
              <span className="flex items-center gap-2"><PlayCircle className="h-6 w-6"/> Gartner</span>
              <span className="flex items-center gap-2"><span className="italic">Forbes</span></span>
              <span className="flex items-center gap-2 font-serif">WSJ</span>
              <span className="flex items-center gap-2">Bloomberg</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CLEAN ASYMMETRICAL LIST LAYOUT */}
      <main className="flex-1 w-full" id="research">
        <section className="py-24 px-6">
          <Container size="xl">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Sticky Sidebar for Categories */}
              <aside className="w-full lg:w-1/4">
                <div className="sticky top-32">
                  <h3 className="text-xl font-bold text-white mb-6">Filter by Topic</h3>
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <button 
                        key={category} 
                        className={`text-left px-4 py-3 rounded-xl transition-colors ${category === 'All' ? 'bg-surface-layer2 text-white font-medium border border-white/10' : 'text-neutral-400 hover:text-white hover:bg-surface-layer1'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Minimalist Article List */}
              <div className="w-full lg:w-3/4 flex flex-col gap-12">
                {insights.map((insight) => (
                  <article key={insight.slug} className="group relative flex flex-col border-b border-white/10 pb-12 last:border-0">
                    <div className="flex items-start gap-4 mb-4">
                      <Badge variant="outline" className="border-brand-cyan-500/30 text-brand-cyan-400 bg-transparent text-xs uppercase tracking-wider">
                        {insight.category}
                      </Badge>
                      <span className="text-sm text-neutral-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {insight.readTime}
                      </span>
                    </div>

                    <a href={`/insights/${insight.slug}`} className="block mb-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-brand-cyan-400 transition-colors leading-snug">
                        {insight.title}
                      </h2>
                    </a>

                    <p className="text-neutral-400 text-lg leading-relaxed mb-6 max-w-3xl">
                      {insight.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <BookOpen className="h-4 w-4" />
                        <span>{insight.author}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(insight.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      
                      <a href={`/insights/${insight.slug}`} className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white group-hover:bg-brand-cyan-500 group-hover:border-brand-cyan-500 group-hover:text-brand-navy-900 transition-all">
                        <ArrowRight className="h-5 w-5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          </Container>
        </section>

        {/* Minimal Newsletter CTA */}
        <section className="pb-24 px-6">
          <Container size="xl">
            <div className="bg-surface-layer1 border border-white/5 rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h3 className="text-3xl font-bold text-white mb-4">Subscribe to our Research</h3>
                <p className="text-neutral-400 text-lg">Get the latest benchmarks and guides delivered directly to your inbox. Designed for finance leaders.</p>
              </div>
              <div className="w-full md:w-auto flex items-center gap-3">
                <Input type="email" placeholder="cfo@company.com" className="bg-surface-layer2 border-white/10 w-full md:w-64" />
                <Button className="bg-white text-brand-navy-900 hover:bg-neutral-200">Subscribe</Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}
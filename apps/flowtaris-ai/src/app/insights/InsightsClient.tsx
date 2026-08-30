'use client'

import { useState } from 'react'
import { Container, Badge, Button, Input } from '@repo/ui'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'

export default function InsightsClient({ insights, categories }: { insights: any[], categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredInsights = activeCategory === 'All' 
    ? insights 
    : insights.filter(i => i.category === activeCategory)

  const scrollToResearch = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const elem = document.getElementById('research')
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex flex-col flex-1 w-full bg-[#f6f4ff]">
      
      {/* 1. HERO SECTION (Asymmetric Split Design) */}
      <section className="relative w-full pt-32 pb-24 overflow-hidden border-b-2 border-black">
        {/* Subtle background glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white blur-[120px] opacity-70" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-[#c8b6ff] blur-[120px] opacity-50" />

        <Container size="xl" className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography targeting CFO */}
            <div className="lg:col-span-6 lg:pr-8">
              <div className="mb-6 inline-flex items-center rounded-full border-2 border-black bg-white px-4 py-1.5 text-sm font-bold text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5">
                Strategic Insights for Finance Leaders
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-[1.1] mb-6 tracking-tight">
                Empower Your <br />
                <span className="text-[#7e22ce]">Financial Strategy</span>
              </h1>
              <p className="text-lg md:text-xl text-black font-medium mb-8 max-w-lg leading-relaxed">
                Explore original research, benchmark data, and proven methodologies to navigate AI adoption and automation in enterprise finance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#7e22ce] hover:bg-[#6b21a8] text-white border-2 border-black rounded-full px-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none" asChild>
                  <a href="/assessment">
                    Take the Diagnostic
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="bg-white border-2 border-black text-black hover:bg-neutral-100 rounded-full px-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-none" onClick={scrollToResearch} asChild>
                  <a href="#research">
                    Explore Research
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column: Custom Animated SVG Graphic */}
            <div className="lg:col-span-6 relative h-[400px] sm:h-[500px] w-full flex items-center justify-center">
              
              {/* Outer Graphic Container */}
              <div className="relative w-full max-w-[500px] aspect-[4/3] bg-white border-4 border-black rounded-[80px] overflow-hidden flex items-center justify-end p-8 shadow-[12px_12px_0px_rgba(0,0,0,1)]">
                
                {/* Decorative Dots Pattern */}
                <div className="absolute left-8 bottom-8 w-24 h-24 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2" fill="#000" />
                      </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
                  </svg>
                </div>

                {/* Floating Circle */}
                <div className="absolute left-16 top-16 w-16 h-16 rounded-full bg-[#c084fc] border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-bounce" style={{ animationDuration: '3s' }} />

                {/* Inner Concentric Rings */}
                <div className="relative w-64 h-64 border-4 border-black rounded-full flex flex-col items-center justify-center gap-4 bg-[#f3e8ff]">
                  <div className="absolute inset-4 border-2 border-black/20 rounded-full" />
                  
                  {/* Floating Badges (Animated) */}
                  <div className="relative z-10 bg-white border-2 border-black px-6 py-2 rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] transform transition-transform animate-[bounce_4s_infinite]">
                    <span className="text-black font-bold">Compliance</span>
                  </div>
                  
                  <div className="relative z-10 bg-[#7e22ce] border-2 border-black px-8 py-3 rounded-full shadow-[6px_6px_0px_rgba(0,0,0,1)] transform transition-transform animate-[bounce_5s_infinite_1s]">
                    <span className="text-white font-black text-lg">ROI Data</span>
                  </div>
                  
                  <div className="relative z-10 bg-white border-2 border-black px-6 py-2 rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] transform transition-transform animate-[bounce_6s_infinite_0.5s]">
                    <span className="text-black font-bold">Research</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. CLEAN ASYMMETRICAL LIST LAYOUT */}
      <main className="flex-1 w-full relative" id="research">
        <section className="py-24 px-6">
          <Container size="xl">
            <div className="flex flex-col lg:flex-row gap-16">
              
              {/* Sticky Sidebar for Categories */}
              <aside className="w-full lg:w-1/4">
                <div className="sticky top-32">
                  <h3 className="text-2xl font-black text-black mb-6 border-b-2 border-black pb-4">Filter by Topic</h3>
                  <div className="flex flex-col gap-3">
                    {categories.map((category) => (
                      <button 
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`text-left px-5 py-3 rounded-xl transition-all duration-300 font-bold border-2 border-transparent ${
                          activeCategory === category 
                          ? 'bg-[#7e22ce] text-white border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] transform scale-[1.02]' 
                          : 'text-black hover:bg-white hover:border-black hover:shadow-[4px_4px_0px_rgba(0,0,0,1)]'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Minimalist Article List */}
              <div className="w-full lg:w-3/4 flex flex-col gap-12">
                {filteredInsights.length === 0 ? (
                  <div className="p-12 text-center bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                    <p className="text-xl font-bold text-black">No insights found for this category.</p>
                  </div>
                ) : (
                  filteredInsights.map((insight) => (
                    <article key={insight.slug} className="group relative flex flex-col bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_rgba(0,0,0,1)]">
                      <div className="flex items-start justify-between mb-4">
                        <div className="inline-flex items-center rounded-full border-2 border-black bg-[#f3e8ff] px-3 py-1 text-xs font-bold text-black uppercase tracking-wider">
                          {insight.category}
                        </div>
                        <span className="text-sm font-bold text-black flex items-center gap-1">
                          <Clock className="h-4 w-4" /> {insight.readTime}
                        </span>
                      </div>

                      <a href={`/insights/${insight.slug}`} className="block mb-4">
                        <h2 className="text-2xl md:text-3xl font-black text-black group-hover:text-[#7e22ce] transition-colors leading-snug">
                          {insight.title}
                        </h2>
                      </a>

                      <p className="text-black font-medium text-lg leading-relaxed mb-6 max-w-3xl">
                        {insight.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-black/10">
                        <div className="flex items-center gap-2 text-sm font-bold text-black">
                          <BookOpen className="h-4 w-4" />
                          <span>{insight.author}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(insight.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        
                        <a href={`/insights/${insight.slug}`} className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-black text-black group-hover:bg-[#7e22ce] group-hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px]">
                          <ArrowRight className="h-5 w-5" />
                        </a>
                      </div>
                    </article>
                  ))
                )}
              </div>

            </div>
          </Container>
        </section>

        {/* Minimal Newsletter CTA */}
        <section className="pb-24 px-6">
          <Container size="xl">
            <div className="bg-[#d8b4fe] border-4 border-black rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[12px_12px_0px_rgba(0,0,0,1)]">
              <div className="max-w-xl">
                <h3 className="text-3xl font-black text-black mb-4">Subscribe to our Research</h3>
                <p className="text-black font-bold text-lg">Get the latest benchmarks and guides delivered directly to your inbox. Designed for finance leaders.</p>
              </div>
              <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
                <Input type="email" placeholder="cfo@company.com" className="bg-white border-2 border-black text-black font-bold placeholder-neutral-500 focus:ring-0 focus:border-black w-full md:w-64 shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
                <Button className="bg-black text-white hover:bg-neutral-800 border-2 border-black w-full sm:w-auto shadow-[4px_4px_0px_rgba(0,0,0,1)] font-bold transition-transform hover:-translate-y-0.5">Subscribe</Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}

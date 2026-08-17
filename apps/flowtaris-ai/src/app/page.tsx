import { HeroPattern } from '@repo/ui'

// Trust signals data
const trustSignals = [
  { label: 'SOC 2 Type II', value: 'Certified' },
  { label: 'GDPR', value: 'Compliant' },
  { label: 'ISO 27001', value: 'Certified' },
  { label: '99.99%', value: 'Uptime SLA' },
  { label: '50M+', value: 'API Calls/Day' },
  { label: 'Fortune 500', value: 'Trusted By' },
]

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'Design Intelligence<br />Reimagined',
          animateOnMount: true,
        }}
        subheadline={{
          text: 'Where generative AI meets precision design—crafting interfaces that think, adapt, and evolve.',
          shape: 'wave',
        }}
        ctas={[
          { label: 'Get Started Free', variant: 'primary', href: '/assessment' },
          { label: 'View Documentation', variant: 'secondary', href: '/docs' },
        ]}
        stats={[
          { label: '99.9%', value: 'Uptime' },
          { label: '50ms', value: 'Latency' },
          { label: '10K+', value: 'Components' },
          { label: '99', value: 'Lighthouse' },
          { label: 'TypeScript', value: 'Native' },
          { label: 'WCAG AAA', value: 'Accessible' },
        ]}
        scrollIndicator={{ show: true }}
        vignette={{ show: true, intensity: 0.3 }}
        noise={{ show: true, opacity: 0.03 }}
      />

      {/* Trust Signals Bar - Step 45 */}
      <section
        className="border-t border-white/10 py-12 px-6"
        aria-labelledby="trust-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {trustSignals.map((signal, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 text-center glass-card p-4 md:p-6 min-w-[140px] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-cyan-500/10"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-number-lg font-display text-gradient-cyan tabular-nums">
                  {signal.value}
                </span>
                <span className="text-body-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  {signal.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content sections would go here */}
      <main className="flex-1 w-full">
        <section className="py-32 px-6" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-24">
              <h2 id="features-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                Built for Design Excellence
              </h2>
              <p className="text-headline-md text-neutral-400 max-w-2xl mx-auto text-balance">
                Every component crafted with precision, accessibility, and performance in mind.
              </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Design Tokens', desc: 'Colors, spacing, typography, motion, shadows, z-index, and breakpoints as TypeScript + CSS dual format.', icon: '🎨' },
                { title: '6 Epic Components', desc: 'ParallaxLayers, SplitText, ScrollTimeline, FloatingProduct, ClipPathReveal, IrisWindow — production-ready.', icon: '⚡' },
                { title: 'TypeScript Strict', desc: 'Zero `any`, strict null checks, exhaustive switch, full inference. Compile-time safety guaranteed.', icon: '🔒' },
                { title: 'Zero ESLint Warnings', desc: 'Clean codebase with consistent patterns, proper prop types, and modern React patterns throughout.', icon: '✨' },
                { title: 'Tailwind v4 + @theme', desc: 'Native CSS custom properties, zero config utility generation, seamless design token integration.', icon: '🎯' },
                { title: 'Accessibility First', desc: 'WCAG AAA compliant, reduced motion support, semantic HTML, ARIA attributes, focus management.', icon: '♿' },
              ].map((feature, i) => (
                <article key={i} className="glass-card group interactive relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block animate-float" style={{ animationDelay: `${i * 100}ms` }}>{feature.icon}</span>
                    <h3 className="text-headline-sm text-brand-navy-900 dark:text-brand-white mb-3">{feature.title}</h3>
                    <p className="text-body-md text-neutral-500 dark:text-neutral-400">{feature.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
            Built with Flowtaris AI Design System
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Documentation</a>
            <a href="#" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Components</a>
            <a href="#" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
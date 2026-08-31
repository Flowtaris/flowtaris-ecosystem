'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Grid, Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@repo/ui';
import { ArrowRight, Brain, Zap, Shield, Globe, Clock, CheckCircle2, XCircle, ChevronRight, Activity, Database, Lock, Server, TrendingUp, DollarSign, Users } from 'lucide-react';

// Intersection Observer Hook for scroll animations
function useInView(options = {}) {
  const [isIntersecting, setIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting] as const;
}

// Fade in up component
function FadeInUp({ children, delay = '0ms', className = '' }: { children: React.ReactNode, delay?: string, className?: string }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref as any}
      className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}

export default function AboutClient() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0B0F19] text-white">

      {/* ── Section 1: Hero ("The Conviction") ── */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about/hero.png"
            alt="Flowtaris AI Enterprise Finance"
            fill
            className="object-cover opacity-30 object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/60 to-[#0B0F19] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#38bdf8]/10 via-transparent to-transparent opacity-50" />
        </div>

        <Container size="xl" className="relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8">
            <FadeInUp>
              <Badge variant="info" className="text-body-sm font-bold tracking-widest uppercase mb-4 border-[#38bdf8] bg-[#38bdf8]/10 text-[#38bdf8]">
                The Conviction
              </Badge>
            </FadeInUp>

            <FadeInUp delay="100ms">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white mb-6">
                We didn't build another AI tool. <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] to-[#38bdf8]">
                  We built the intelligence layer enterprise finance was missing.
                </span>
              </h1>
            </FadeInUp>

            <FadeInUp delay="200ms">
              <p className="text-xl md:text-2xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
                Flowtaris AI is the R&D and product division of Flowtaris. Born from 5+ years inside the ERP trenches, we are automating what we used to do by hand.
              </p>
            </FadeInUp>

            <FadeInUp delay="300ms" className="w-full max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-black text-[#38bdf8]">99.5%+</span>
                <span className="text-sm text-neutral-400 font-bold uppercase tracking-wider">Document Accuracy</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-black text-[#38bdf8]">14,000+</span>
                <span className="text-sm text-neutral-400 font-bold uppercase tracking-wider">Hours Saved Annually</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-black text-[#38bdf8]">{'<90 Days'}</span>
                <span className="text-sm text-neutral-400 font-bold uppercase tracking-wider">Average Time-to-Value</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-black text-[#c084fc]">$21M+</span>
                <span className="text-sm text-neutral-400 font-bold uppercase tracking-wider">Client Savings Documented</span>
              </div>
            </FadeInUp>

            <FadeInUp delay="400ms" className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/assessment">
                <Button size="lg" className="bg-white text-[#0B0F19] hover:bg-neutral-200 h-14 px-8 text-lg font-bold">
                  See What We'd Automate <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/roi-calculator">
                <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10 h-14 px-8 text-lg text-white">
                  Calculate Your ROI
                </Button>
              </Link>
            </FadeInUp>
          </div>
        </Container>
      </section>

      {/* ── Section 2: "We Believe" (The Manifesto) ── */}
      <section className="py-32 px-6 border-t border-white/5 relative">
        <Container size="lg">
          <div className="flex flex-col gap-32">
            <FadeInUp>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="text-8xl font-black text-[#38bdf8]/20 leading-none">01</div>
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                    Every invoice should understand itself.
                  </h2>
                  <p className="text-2xl text-neutral-400 leading-relaxed max-w-3xl">
                    Not just extracted — understood. Context, intent, exceptions, nuance. That's the difference between legacy OCR and our GenAI models.
                  </p>
                  {/* Background image placeholder */}
                  <div className="absolute inset-0 z-0 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[url('/about/manifesto1.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
                </div>
              </div>
            </FadeInUp>

            <FadeInUp>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="text-8xl font-black text-[#c084fc]/20 leading-none">02</div>
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                    Your ERP should answer your questions.
                  </h2>
                  <p className="text-2xl text-neutral-400 leading-relaxed max-w-3xl">
                    Natural language to action. Ask your NetSuite or SAP a question in plain English, and get a verified, secure answer in seconds.
                  </p>
                  <div className="absolute inset-0 z-0 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[url('/about/manifesto2.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
                </div>
              </div>
            </FadeInUp>

            <FadeInUp>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="text-8xl font-black text-[#22c55e]/20 leading-none">03</div>
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                    The CFO's most powerful tool shouldn't be a spreadsheet.
                  </h2>
                  <p className="text-2xl text-neutral-400 leading-relaxed max-w-3xl">
                    Predictive cash flow, anomaly detection, real-time variance analysis — that's the new baseline.
                  </p>
                  <div className="absolute inset-0 z-0 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[url('/about/manifesto3.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
                </div>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </section>

      {/* ── Section 3: The Origin Story ── */}
      <section className="py-32 px-6 bg-[#080b12] border-t border-white/5">
        <Container size="xl">
          <FadeInUp className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">The Origin Story — From Consulting to Product</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">The genesis of Flowtaris AI wasn't a whitepaper. It was thousands of hours in the ERP trenches.</p>
          </FadeInUp>

          <div className="relative h-[400px]">
            {/* Progress bar */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white/20 transform -translate-x-1/2" />
            {/* Milestones */}
            <div className="absolute inset-0 flex items-start">
              {/* Milestone 1: 2019–2022 */}
              <div className="w-1/4 pl-4">
                <div className="relative">
                  <div className="absolute left-0 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-white/20 border-2 border-white" />
                  <div className="w-12 h-12 ml-2">
                    <h3 className="text-lg font-semibold text-white mb-2">2019–2022</h3>
                    <p className="font-mono text-sm text-white/70">The Trenches</p>
                    <p className="mt-2 text-white/90">
                      Flowtaris deployed 200+ ERP customizations across NetSuite, Coupa, SAP, Workday. We saw the same 4 problems in every engagement.
                    </p>
                  </div>
                </div>
              </div>
              {/* Milestone 2: 2023 */}
              <div className="w-1/4 pl-4">
                <div className="relative">
                  <div className="absolute left-0 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-white/20 border-2 border-white" />
                  <div className="w-12 h-12 ml-2">
                    <h3 className="text-lg font-semibold text-white mb-2">2023</h3>
                    <p className="font-mono text-sm text-white/70">The Pattern</p>
                    <p className="mt-2 text-white/90">
                      "We keep solving the same problems manually. What if we automated ourselves?" Internal R&D begins.
                    </p>
                  </div>
                </div>
              </div>
              {/* Milestone 3: 2024 */}
              <div className="w-1/4 pl-4">
                <div className="relative">
                  <div className="absolute left-0 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-white/20 border-2 border-white" />
                  <div className="w-12 h-12 ml-2">
                    <h3 className="text-lg font-semibold text-white mb-2">2024</h3>
                    <p className="font-mono text-sm text-white/70">The Lab</p>
                    <p className="mt-2 text-white/90">
                      First production models: GenAI Document Intelligence hits 99.5% accuracy. Conversational ERP prototype passes internal testing.
                    </p>
                  </div>
                </div>
              </div>
              {/* Milestone 4: 2025 */}
              <div className="w-1/4 pl-4">
                <div className="relative">
                  <div className="absolute left-0 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-white/20 border-2 border-white" />
                  <div className="w-12 h-12 ml-2">
                    <h3 className="text-lg font-semibold text-white mb-2">2025</h3>
                    <p className="font-mono text-sm text-white/70">The Platform</p>
                    <p className="mt-2 text-white/90">
                      Flowtaris AI launches. Enterprise-grade. Platform-agnostic. Backed by the delivery muscle of 20+ consultants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Current year pulse */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-cyan-400/50 animate-pulse" />
          </div>
        </Container>
      </section>

      {/* ── Section 4: The Unfair Advantage (Comparison) ── */}
      <section className="py-32 px-6 border-t border-white/5">
        <Container size="lg">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">The Unfair Advantage — Why Us, Not Them</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Why Flowtaris AI outperforms horizontal, generic AI vendors.</p>
          </FadeInUp>

          <FadeInUp className="w-full rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/50 uppercase tracking-wider"></th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                      Generic AI Vendor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                      Flowtaris AI
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/5">
                    <td className="px-6 py-4 text-left text-white/90 font-medium">ERP Knowledge</td>
                    <td className="px-6 py-4 text-left text-white/60">Read the API docs</td>
                    <td className="px-6 py-4 text-left text-white/90">Built 200+ customizations</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-6 py-4 text-left text-white/90 font-medium">Finance Understanding</td>
                    <td className="px-6 py-4 text-left text-white/60">Trained on public data</td>
                    <td className="px-6 py-4 text-left text-white/90">Built by former controllers & Big 4</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-6 py-4 text-left text-white/90 font-medium">Document Accuracy</td>
                    <td className="px-6 py-4 text-left text-white/60">70–85% (template OCR)</td>
                    <td className="px-6 py-4 text-left text-green-400 font-medium">99.5%+ (GenAI understanding)</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-6 py-4 text-left text-white/90 font-medium">Implementation</td>
                    <td className="px-6 py-4 text-left text-white/60">12–18 months</td>
                    <td className="px-6 py-4 text-left text-green-400 font-medium">{'<90 days to first value'}</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-6 py-4 text-left text-white/90 font-medium">Integration Depth</td>
                    <td className="px-6 py-4 text-left text-white/60">Surface-level connectors</td>
                    <td className="px-6 py-4 text-left text-white/90">Native NetSuite/Coupa/SAP/Workday</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-6 py-4 text-left text-white/90 font-medium">Governance</td>
                    <td className="px-6 py-4 text-left text-white/60">"We're working on it"</td>
                    <td className="px-6 py-4 text-left text-green-400 font-medium">EU AI Act ready, audit trails from day 1</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-6 py-4 text-left text-white/90 font-medium">Post-Go-Live</td>
                    <td className="px-6 py-4 text-left text-white/60">"Call support"</td>
                    <td className="px-6 py-4 text-left text-white/90">Same consultants who built it</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeInUp>
        </Container>
      </section>

      {/* ── Section 5: The Intelligence Architecture ── */}
      <section className="py-32 px-6 bg-[#080b12] border-t border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-40 z-0 mix-blend-screen pointer-events-none">
          <Image src="/about/architecture.png" alt="Data Architecture" fill className="object-cover object-left" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080b12] to-transparent" />
        </div>

        <Container size="xl" className="relative z-10">
          <div className="max-w-2xl">
            <FadeInUp>
              <Badge variant="info" className="mb-6 bg-[#c084fc]/10 text-[#c084fc] border-[#c084fc]">The Stack</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                An architecture built for zero-trust finance.
              </h2>
              <p className="text-xl text-neutral-400 mb-12 leading-relaxed">
                We don't send your data to public LLMs. We don't train models on your invoices. Our architecture is designed for security, auditability, and deterministic outcomes.
              </p>
            </FadeInUp>

            <FadeInUp delay="100ms" className="space-y-6">
              <div className="flex gap-4 items-start p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Database className="w-8 h-8 text-[#38bdf8] shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Ingestion Layer</h3>
                  <p className="text-neutral-400 text-sm">Native connectors to NetSuite, Coupa, SAP, Workday. Ingest via API, EDI, Email, or SFTP securely.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Brain className="w-8 h-8 text-[#c084fc] shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Intelligence Core</h3>
                  <p className="text-neutral-400 text-sm">Ensemble models (LLMs + deterministic logic) orchestrating GenAI Doc Intel, Predictive Finance, and Conversational ERP.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Lock className="w-8 h-8 text-[#22c55e] shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Action & Governance Layer</h3>
                  <p className="text-neutral-400 text-sm">Every action is RBAC-enforced, fully logged, and explainable before it posts back to your ERP.</p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </section>

      {/* ── Section 6: Design Principles ── */}
      <section className="py-32 px-6 border-t border-white/5">
        <Container size="xl">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">5 Non-Negotiable Principles</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">The engineering and product rules that govern every model we ship.</p>
          </FadeInUp>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Server, title: "Every Action Reversible", desc: "No black-box changes. Every AI action has an undo, every decision has an audit trail.", color: "#38bdf8" },
              { icon: Shield, title: "Zero Trust on Data", desc: "Row-level security, encrypted at rest/transit. No model training on client financial data. Ever.", color: "#22c55e" },
              { icon: Brain, title: "Explainability Mandatory", desc: "Every extraction, classification, and prediction comes with a confidence score and reasoning chain.", color: "#c084fc" },
              { icon: Clock, title: "Value in 90 Days", desc: "If you can't measure ROI in a quarter, we've failed. Quick Wins methodology built into every deployment.", color: "#fbbf24" },
              { icon: Activity, title: "Platform Native", desc: "One control plane. Not surface-level connectors, but native depth across NetSuite, Coupa, SAP, Workday.", color: "#4f46e5" },
            ]
            .map((p, i) => (
              <FadeInUp key={i} delay={`${i * 100}ms`}>
                <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <div className="flex items-start">
                    <div className="w-10 h-10 flex-shrink-0">
                      <p.icon className={`w-10 h-10 text-[${p.color}]`} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                      <p className="mt-2 text-white/90">{p.desc}</p>
                    </div>
                  </div>
                </div>
                </FadeInUp>
              ))}
          </div>
        </Container>
      </section>

      {/* ── Section 7: The Trust Architecture ── */}
      <section className="py-32 px-6 border-t border-white/5">
        <Container size="lg">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">The Trust Architecture</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Visual data flow showing exactly how client data moves through the system.</p>
          </FadeInUp>

          {/* Visual data flow diagram placeholder */}
          <FadeInUp className="relative h-[400mb-12]">
            <div className="absolute inset-0 bg-[url('/about/trust-diagram.png')] bg-contain bg-center" />
          </FadeInUp>

          {/* Certifications grid */}
          <FadeInUp className="mt-12">
            <h3 className="text-lg font-semibold text-white mb-6">Certifications</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Certification</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-4 py-3 text-left text-white/90">SOC2 Type II</td>
                    <td className="px-4 py-3 text-left text-white/60">In Progress</td>
                    <td className="px-4 py-3 text-left text-white/90">Q4 2025</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-left text-white/90">ISO 27001</td>
                    <td className="px-4 py-3 text-left text-white/60">Planned</td>
                    <td className="px-4 py-3 text-left text-white/90">H1 2026</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-left text-white/90">EU AI Act Compliance</td>
                    <td className="px-4 py-3 text-left text-white/60">Framework Ready</td>
                    <td className="px-4 py-3 text-left text-white/90">Ongoing</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-left text-white/90">GDPR</td>
                    <td className="px-4 py-3 text-left text-green-400 font-medium">Compliant</td>
                    <td className="px-4 py-3 text-left text-white/90">Current</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeInUp>
        </Container>
      </section>

      {/* ── Section 8: The Proof Wall ── */}
      <section className="py-32 px-6 border-t border-white/5">
        <Container size="xl">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">The Proof Wall — Numbers Don't Negotiate</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Live verified outcomes across our enterprise client base.</p>
          </FadeInUp>

          {/* Head-to-Head Benchmarks */}
          <FadeInUp className="mb-12">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Metric</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Industry Average</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Flowtaris AI</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-white/50 uppercase">Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/5">
                    <td className="px-4 py-3 text-left text-white/90 font-medium">Invoice Extraction Accuracy</td>
                    <td className="px-4 py-3 text-left text-white/60">72%</td>
                    <td className="px-4 py-3 text-left text-green-400 font-medium">99.5%</td>
                    <td className="px-4 py-3 text-left text-white/90">+38%</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-4 py-3 text-left text-white/90 font-medium">Processing Time per Invoice</td>
                    <td className="px-4 py-3 text-left text-white/60">4.2 min</td>
                    <td className="px-4 py-3 text-left text-green-400 font-medium">0.3 sec</td>
                    <td className="px-4 py-3 text-left text-white/90">840x faster</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-4 py-3 text-left text-white/90 font-medium">Implementation Timeline</td>
                    <td className="px-4 py-3 text-left text-white/60">14 months</td>
                    <td className="px-4 py-3 text-left text-green-400 font-medium">{'<90 days'}</td>
                    <td className="px-4 py-3 text-left text-white/90">5x faster</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-4 py-3 text-left text-white/90 font-medium">First-Year ROI</td>
                    <td className="px-4 py-3 text-left text-white/60">120%</td>
                    <td className="px-4 py-3 text-left text-green-400 font-medium">380%+</td>
                    <td className="px-4 py-3 text-left text-white/90">3x better</td>
                  </tr>
                  <tr className="hover:bg-white/5">
                    <td className="px-4 py-3 text-left text-white/90 font-medium">Straight-Through Processing</td>
                    <td className="px-4 py-3 text-left text-white/60">45%</td>
                    <td className="px-4 py-3 text-left text-green-400 font-medium">91%</td>
                    <td className="px-4 py-3 text-left text-white/90">2x better</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeInUp>

          {/* Live Counters */}
          <FadeInUp>
            <div className="grid gap-8 sm:grid-cols-3">
              <div className="text-center">
                <p className="text-4xl font-bold text-cyan-400">2.4M+</p>
                <p className="text-sm text-white/70">Documents Processed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-purple-400">14,000+</p>
                <p className="text-sm text-white/70">Hours Saved</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-400">$21M+</p>
                <p className="text-sm text-white/70">Client Savings</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-400">4</p>
                <p className="text-sm text-white/70">Platforms Connected</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-400">99.97%</p>
                <p className="text-sm text-white/70">Uptime</p>
              </div>
            </div>
          </FadeInUp>
        </Container>
      </section>

      {/* ── Section 9: The Research Engine ── */}
      <section className="py-32 px-6 border-t border-white/5">
        <Container size="lg">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">The Research Engine</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">A compact grid linking to existing research.</p>
          </FadeInUp>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Published Insights */}
            <FadeInUp>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0">
                    <span className="text-2xl text-blue-400">📄</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">Published Insights</h3>
                    <p className="mt-2 text-white/90">
                      12+ deep-dive articles → links to <a href="/insights" className="text-cyan-400 underline">/insights</a>
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
            {/* Case Studies */}
            <FadeInUp delay="100ms">
              <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0">
                    <span className="text-2xl text-purple-400">💼</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">Case Studies</h3>
                    <p className="mt-2 text-white/90">
                      3 verified enterprise deployments → links to <a href="/case-studies" className="text-cyan-400 underline">/case-studies</a>
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
            {/* Innovation Lab */}
            <FadeInUp delay="200ms">
              <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0">
                    <span className="text-2xl text-green-400">🔬</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">Innovation Lab</h3>
                    <p className="mt-2 text-white/90">
                      6 active research tracks → links to <a href="/innovation-lab" className="text-cyan-400 underline">/innovation-lab</a>
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
            {/* Benchmark Reports */}
            <FadeInUp delay="300ms">
              <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-start">
                  <div className="w-10 h-10 flex-shrink-0">
                    <span className="text-2xl text-yellow-400">📊</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">Benchmark Reports</h3>
                    <p className="mt-2 text-white/90">
                      AP Automation, GenAI vs OCR, EU AI Act → links to specific insights
                    </p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </section>

      {/* ── Section 10: The People Behind the Intelligence ── */}
      <section className="py-32 px-6 border-t border-white/5">
        <Container size="xl">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">The People Behind the Intelligence</h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">Not a full team page. Instead, 3 anonymized role profiles that establish credibility.</p>
          </FadeInUp>

          <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
            {/* Finance Architect */}
            <FadeInUp>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-start">
                  <div className="w-12 h-12 flex-shrink-0">
                    {/* Abstract avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white">FA</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">The Finance Architect</h3>
                    <p className="mt-2 text-white/90">
                      "12 years in Big 4. Led 30+ NetSuite transformations. Now building the AI that automates what they used to do manually."
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white/10 text-xs rounded">Big 4</span>
                      <span className="px-2 py-1 bg-white/10 text-xs rounded">NetSuite Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
            {/* ML Engineer */}
            <FadeInUp delay="100ms">
              <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-start">
                  <div className="w-12 h-12 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white">ME</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">The ML Engineer</h3>
                    <p className="mt-2 text-white/90">
                      "Former [Major Tech Co] research. Published in NeurIPS. Now applying transformer architectures to enterprise document understanding."
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white/10 text-xs rounded">NeurIPS</span>
                      <span className="px-2 py-1 bg-white/10 text-xs rounded">Transformer Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
            {/* Platform Engineer */}
            <FadeInUp delay="200ms">
              <div className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-start">
                  <div className="w-12 h-12 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white">PE</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-white">The Platform Engineer</h3>
                    <p className="mt-2 text-white/90">
                      "Built integrations processing $2B+ in annual transaction volume. Now designing the connective tissue between AI models and ERP systems."
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-white/10 text-xs rounded">ERP Integration</span>
                      <span className="px-2 py-1 bg-white/10 text-xs rounded">High Volume Systems</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </section>

      {/* ── Section 11: The Bridge — ".ai ↔ .com" ── */}
      <section className="py-32 px-6 border-t border-white/5">
        <Container size="lg" className="relative z-10 text-center">
          <FadeInUp>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Flowtaris AI is the intelligence engine of Flowtaris.
            </p>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Every model we ship is backed by the delivery muscle of an enterprise consulting team. Every deployment is supported by consultants who've lived inside NetSuite, Coupa, SAP, and Workday.
            </p>
            <a
              href="https://www.flowtaris.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-all"
            >
              Meet the full Flowtaris team at flowtaris.com →
              <span className="ml-2">
                {/* Arrow icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </FadeInUp>
        </Container>
      </section>

      {/* ── Section 12: Final CTA — "Your Move" ── */}
      <section className="py-32 px-6 border-t border-white/5">
        <Container size="lg">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-2xl font-bold text-white text-center mb-12">
              Your Move
            </h2>
          </FadeInUp>

          <div className="grid gap-8 sm:grid-cols-3">
            {/* Finance Leader */}
            <FadeInUp>
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center">
                <div className="w-14 h-14 mx-auto mb-4">
                  <span className="text-3xl text-cyan-400">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">I'm a Finance Leader</h3>
                <p className="text-white/90 mb-6">
                  Start with a free assessment to see exactly what we can automate for your finance operations.
                </p>
                <a
                  href="/assessment"
                  className="w-full btn btn-primary btn-lg px-6 py-3"
                >
                  Start Your Free Assessment
                </a>
              </div>
            </FadeInUp>
            {/* CTO/CIO */}
            <FadeInUp delay="100ms">
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center">
                <div className="w-14 h-14 mx-auto mb-4">
                  <span className="text-3xl text-purple-400">🏗️</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">I'm a CTO/CIO</h3>
                <p className="text-white/90 mb-6">
                  Dive deep into our architecture, security model, and integration patterns.
                </p>
                <a
                  href="/capabilities"
                  className="w-full btn btn-outline btn-lg px-6 py-3"
                >
                  Explore the Architecture
                </a>
              </div>
            </FadeInUp>
            {/* Want the Numbers */}
            <FadeInUp delay="200ms">
              <div className="relative p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center">
                <div className="w-14 h-14 mx-auto mb-4">
                  <span className="text-3xl text-green-400">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">I want the Numbers</h3>
                <p className="text-white/90 mb-6">
                  See the potential ROI for your specific use case with our interactive calculator.
                </p>
                <a
                  href="/roi-calculator"
                  className="w-full btn btn-outline btn-lg px-6 py-3"
                >
                  Calculate Your ROI
                </a>
              </div>
            </FadeInUp>
          </div>
        </Container>
      </section>
    </div>
  );
}
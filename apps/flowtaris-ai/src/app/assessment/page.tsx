import { Metadata } from 'next'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Label, RadioGroup, Radio, Progress, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@repo/ui'
import { ArrowRight, ChevronRight, Sparkles, Zap, Shield, BarChart3, CheckCircle, Loader2, ChartBar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | Flowtaris AI',
  description: 'Free 3-minute diagnostic to get your personalized AI automation roadmap. Identify quick wins, strategic initiatives, and innovation opportunities for your ERP.',
  openGraph: {
    title: 'AI Readiness Assessment | Flowtaris AI',
    description: 'Free 3-minute diagnostic for your personalized AI automation roadmap.',
    type: 'website',
  },
}

const steps = [
  {
    id: 1,
    title: 'ERP Platform',
    description: 'Which ERP platform(s) do you currently use?',
    type: 'radio' as const,
    options: [
      { value: 'netsuite', label: 'NetSuite', icon: '🔷', description: 'Oracle NetSuite ERP' },
      { value: 'coupa', label: 'Coupa', icon: '🟠', description: 'Coupa Business Spend Management' },
      { value: 'sap', label: 'SAP', icon: '🔵', description: 'SAP S/4HANA or ECC' },
      { value: 'workday', label: 'Workday', icon: '🟢', description: 'Workday Financial Management' },
      { value: 'multiple', label: 'Multiple Platforms', icon: '🔄', description: 'More than one ERP system' },
    ],
  },
  {
    id: 2,
    title: 'Pain Points',
    description: 'What are your top 3 operational pain points? (Select up to 3)',
    type: 'checkbox' as const,
    maxSelections: 3,
    options: [
      { value: 'manual-processing', label: 'Manual Invoice/PO Processing', icon: '📄', description: 'High volume of manual data entry', weight: 25 },
      { value: 'cash-flow', label: 'Cash Flow Visibility', icon: '💰', description: 'Poor forecasting and visibility', weight: 20 },
      { value: 'integration-issues', label: 'Integration Failures', icon: '🔗', description: 'Frequent iPaaS/API breakages', weight: 20 },
      { value: 'compliance-risk', label: 'Compliance & Audit Risk', icon: '⚖️', description: 'Regulatory pressure and audit findings', weight: 15 },
      { value: 'slow-close', label: 'Slow Financial Close', icon: '📊', description: 'Month-end close takes too long', weight: 10 },
      { value: 'vendor-disputes', label: 'Vendor Disputes', icon: '🤝', description: 'Payment delays and dispute resolution', weight: 10 },
    ],
  },
  {
    id: 3,
    title: 'Volume Metrics',
    description: 'Help us calculate your potential ROI with approximate volumes',
    type: 'number' as const,
    fields: [
      { id: 'invoicesPerMonth', label: 'Invoices/Month', placeholder: 'e.g., 5000', type: 'number', min: 0 },
      { id: 'employees', label: 'Finance Team Size (FTE)', placeholder: 'e.g., 15', type: 'number', min: 1 },
      { id: 'transactionsPerMonth', label: 'Transactions/Month', placeholder: 'e.g., 25000', type: 'number', min: 0 },
      { id: 'poLinesPerMonth', label: 'PO Lines/Month', placeholder: 'e.g., 3000', type: 'number', min: 0 },
    ],
  },
  {
    id: 4,
    title: 'Current State',
    description: 'How are you currently handling these processes?',
    type: 'radio' as const,
    options: [
      { value: 'manual', label: 'Fully Manual', icon: '✋', description: 'Spreadsheets, email, paper-based' },
      { value: 'partial', label: 'Partial Automation', icon: '⚙️', description: 'Some OCR/RPA but lots of exceptions' },
      { value: 'ipass', label: 'iPaaS Integration', icon: '☁️', description: 'MuleSoft, Boomi, Celigo, etc.' },
      { value: 'custom', label: 'Custom Development', icon: '💻', description: 'In-house built solutions' },
      { value: 'unknown', label: "Don't Know", icon: '❓', description: 'Not sure about current tech stack' },
    ],
  },
  {
    id: 5,
    title: 'Tech Maturity',
    description: 'How would you describe your organization\'s technology maturity?',
    type: 'radio' as const,
    options: [
      { value: 'legacy', label: 'Legacy Systems', icon: '🏛️', description: 'On-premise, older ERP versions' },
      { value: 'modern', label: 'Modern Cloud', icon: '☁️', description: 'Cloud-native, recent implementations' },
      { value: 'hybrid', label: 'Hybrid', icon: '🔀', description: 'Mix of legacy and cloud systems' },
      { value: 'ai-pilot', label: 'AI Pilot Active', icon: '🧪', description: 'Already running AI/ML experiments' },
    ],
  },
  {
    id: 6,
    title: 'Urgency',
    description: 'What\'s driving your evaluation timeline?',
    type: 'radio' as const,
    options: [
      { value: 'exploring', label: 'Exploring Options', icon: '🔍', description: 'Early research phase' },
      { value: 'budget-approved', label: 'Budget Approved', icon: '✅', description: 'Funding secured for this year' },
      { value: 'board-mandate', label: 'Board Mandate', icon: '🎯', description: 'Strategic directive from leadership' },
      { value: 'audit-driven', label: 'Audit/Compliance Driven', icon: '📋', description: 'Regulatory or audit requirement' },
    ],
  },
]

const quickWinCapabilities = [
  { name: 'GenAI Document Intelligence', timeline: '0-3 months', impact: '85% automation, 3-min processing', icon: '📄' },
  { name: 'Integration Health Monitoring', timeline: '1-2 months', impact: '99.9% uptime detection', icon: '🔍' },
]

const strategicCapabilities = [
  { name: 'Autonomous Workflow Engine', timeline: '3-6 months', impact: 'Self-healing workflows, 3-day impl', icon: '⚙️' },
  { name: 'Predictive Analytics', timeline: '4-9 months', impact: '92% forecast accuracy', icon: '📈' },
]

const innovationCapabilities = [
  { name: 'Conversational ERP Interface', timeline: '9-18 months', impact: 'Natural language → SQL', icon: '💬' },
  { name: 'AI Governance & Compliance', timeline: '6-12 months', impact: 'SOC2 + EU AI Act ready', icon: '🛡️' },
]

export default function AssessmentPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'AI Readiness<br />Assessment',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'Free 3-minute diagnostic → Personalized roadmap with Quick Wins (0-3mo), Strategic initiatives (3-9mo), and Innovation opportunities (9-18mo).',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        stats={[
          { label: 'Completion Time', value: '3 min' },
          { label: 'Questions', value: '6' },
          { label: 'Roadmap Columns', value: '3' },
          { label: 'No Cost', value: 'Free' },
        ]}
        scrollIndicator={{ show: true }}
        vignette={{ show: true, intensity: 0.3 }}
        noise={{ show: true, opacity: 0.03 }}
      />

      <main className="flex-1 w-full">
        <section className="py-24 px-6" aria-labelledby="assessment-heading">
          <Container size="lg">
            <Stack gap="2xl" className="w-full max-w-3xl mx-auto">
              <header className="text-center">
                <h2 id="assessment-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Your Personalized AI Automation Roadmap
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  Answer 6 questions to get capability recommendations tailored to your ERP, volume, and urgency.
                </p>
              </header>

              {/* Progress Indicator */}
              <div className="glass-strong rounded-2xl p-6">
                <Progress value={0} className="h-2 mb-4" />
                <div className="flex justify-between text-body-sm text-neutral-400">
                  <span>Step 1 of 6</span>
                  <span>0% Complete</span>
                </div>
              </div>

              {/* Step 1 - ERP Platform */}
              <Card className="glass-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="text-body-xs border-brand-cyan-400/50">
                      Step 1 of 6
                    </Badge>
                  </div>
                  <CardTitle className="text-headline-lg">Which ERP platform(s) do you use?</CardTitle>
                  <p className="text-body-md text-neutral-400">Select your primary ERP system</p>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const firstStep = steps[0]
                    if (!firstStep?.options) return null
                    return (
                      <RadioGroup
                        name="erpPlatform"
                        options={firstStep.options.map((opt) => ({
                          value: opt.value,
                          label: opt.label,
                          description: opt.description,
                        }))}
                        inline
                        size="md"
                      />
                    )
                  })()}
                </CardContent>
              </Card>

              {/* Steps 2-6 placeholders */}
              {steps.slice(1).map((step) => (
                <Card key={step.id} className="glass-card opacity-50 pointer-events-none">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-body-xs border-neutral-500/50">
                        Step {step.id} of 6
                      </Badge>
                    </div>
                    <CardTitle className="text-headline-lg">{step.title}</CardTitle>
                    <p className="text-body-md text-neutral-400">{step.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="glass rounded-xl p-8 text-center">
                      <p className="text-body-md text-neutral-400">Complete previous steps to unlock</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Results Section (placeholder) */}
              <Card className="glass-card border-brand-cyan-500/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="success" className="text-body-xs">Your Roadmap</Badge>
                  </div>
                  <CardTitle className="text-headline-lg">Assessment Complete</CardTitle>
                  <p className="text-body-md text-neutral-400">Your personalized AI automation roadmap is ready</p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="glass-strong p-6 rounded-xl border-l-4 border-brand-green-500">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">⚡</span>
                        <h4 className="text-headline-sm text-brand-green-400">Quick Wins (0-3mo)</h4>
                      </div>
                      <p className="text-body-sm text-neutral-400 mb-4">High-impact, low-effort capabilities ready for immediate implementation</p>
                      <ul className="space-y-2">
                        {quickWinCapabilities.map((cap) => (
                          <li key={cap.name} className="flex items-start gap-2 text-body-sm text-neutral-300">
                            <span className="text-lg">{cap.icon}</span>
                            <div>
                              <p className="font-medium">{cap.name}</p>
                              <p className="text-body-xs text-neutral-400">{cap.timeline} • {cap.impact}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass-strong p-6 rounded-xl border-l-4 border-brand-amber-500">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🎯</span>
                        <h4 className="text-headline-sm text-brand-amber-400">Strategic (3-9mo)</h4>
                      </div>
                      <p className="text-body-sm text-neutral-400 mb-4">Core capabilities requiring moderate investment for transformational impact</p>
                      <ul className="space-y-2">
                        {strategicCapabilities.map((cap) => (
                          <li key={cap.name} className="flex items-start gap-2 text-body-sm text-neutral-300">
                            <span className="text-lg">{cap.icon}</span>
                            <div>
                              <p className="font-medium">{cap.name}</p>
                              <p className="text-body-xs text-neutral-400">{cap.timeline} • {cap.impact}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass-strong p-6 rounded-xl border-l-4 border-brand-purple-500">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🚀</span>
                        <h4 className="text-headline-sm text-brand-purple-400">Innovation (9-18mo)</h4>
                      </div>
                      <p className="text-body-sm text-neutral-400 mb-4">Next-gen capabilities for competitive differentiation and future-proofing</p>
                      <ul className="space-y-2">
                        {innovationCapabilities.map((cap) => (
                          <li key={cap.name} className="flex items-start gap-2 text-body-sm text-neutral-300">
                            <span className="text-lg">{cap.icon}</span>
                            <div>
                              <p className="font-medium">{cap.name}</p>
                              <p className="text-body-xs text-neutral-400">{cap.timeline} • {cap.impact}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="/roi-calculator">
                        <Button size="lg" className="glass-strong px-8 py-3">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Calculate ROI for Recommendations
                        </Button>
                      </a>
                      <a href="/cost-of-inaction">
                        <Button variant="secondary" size="lg" className="glass px-8 py-3">
                          <Shield className="mr-2 h-4 w-4" />
                          Cost of Inaction Analysis
                        </Button>
                      </a>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <Label className="block text-body-sm text-neutral-400 mb-2">Get your roadmap emailed to you</Label>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="you@company.com"
                          className="flex-1 glass"
                        />
                        <a href="#email-capture">
                          <Button className="glass-strong">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                      <p className="text-body-xs text-neutral-500 mt-2 text-center">We'll never share your email. Unsubscribe anytime.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA to next tool */}
              <div className="glass-strong rounded-2xl p-8 text-center border border-brand-cyan-500/20">
                <h3 className="text-headline-lg text-white mb-3">Ready to See the Numbers?</h3>
                <p className="text-body-md text-neutral-400 mb-6 max-w-md mx-auto">
                  Take your top recommendation to the ROI Calculator for detailed projections with live data visualization.
                </p>
                <a href="/roi-calculator">
                  <Button size="lg" className="glass-strong px-10 py-4">
                    Open ROI Calculator
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </Stack>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-6">
        <Container size="xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
              Built with Flowtaris AI Design System
            </p>
            <div className="flex items-center gap-6">
              <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
              <a href="/roi-calculator" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">ROI Calculator</a>
              <a href="/cost-of-inaction" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Cost of Inaction</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
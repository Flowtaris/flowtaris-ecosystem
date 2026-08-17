import { Metadata } from 'next'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Label } from '@repo/ui'
import { ArrowRight, ChevronRight, Shield, AlertTriangle, TrendingDown, DollarSign, Clock, Users, Zap, TrendingUp, CheckCircle, Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cost of Inaction Calculator | Flowtaris AI',
  description: 'Calculate the cost of waiting. Monthly revenue leakage, annual compliance risk, 3-year competitive gap, and cost of 6-month delay.',
  openGraph: {
    title: 'Cost of Inaction Calculator | Flowtaris AI',
    description: 'Calculate the cost of waiting. Monthly revenue leakage, annual compliance risk, 3-year competitive gap.',
    type: 'website',
  },
}

const riskCategories = [
  { id: 'revenue-leakage', label: 'Revenue Leakage', icon: DollarSign, color: 'text-brand-red-400', bg: 'bg-brand-red-500/10' },
  { id: 'compliance-risk', label: 'Compliance Risk', icon: Shield, color: 'text-brand-amber-400', bg: 'bg-brand-amber-500/10' },
  { id: 'competitive-gap', label: 'Competitive Gap', icon: TrendingUp, color: 'text-brand-purple-400', bg: 'bg-brand-purple-500/10' },
  { id: 'operational-risk', label: 'Operational Risk', icon: AlertTriangle, color: 'text-brand-orange-400', bg: 'bg-brand-orange-500/10' },
]

const defaultInputs = {
  platform: 'netsuite',
  annualVolume: 60000,
  avgManualHours: 15,
  hourlyCost: 45,
  errorRate: 3,
  industry: 'saas',
  companySize: 'large',
  techMaturity: 'hybrid',
  regulatoryPressure: 'medium',
  competitiveIntensity: 'high',
}

const riskResults = {
  monthlyLeakage: 287500,
  annualComplianceRisk: 450000,
  competitiveGap3Year: 12000000,
  costOf6MonthDelay: 4500000,
  breakEvenMonths: 3.2,
}

export default function CostOfInactionPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'Cost of<br />Inaction',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'What does waiting cost you? Calculate monthly revenue leakage, annual compliance risk, 3-year competitive gap, and the cost of a 6-month delay.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        stats={{
          items: [
            { label: '$287K/mo', value: 'Revenue Leakage' },
            { label: '$450K/yr', value: 'Compliance Risk' },
            { label: '$12M', value: '3-Yr Comp. Gap' },
            { label: '$4.5M', value: '6-Mo Delay Cost' },
          ],
        }}
        scrollIndicator={true}
        vignette={true}
        noise={true}
      />

      <main className="flex-1 w-full">
        <section className="py-24 px-6" aria-labelledby="inaction-heading">
          <Container size="xl">
            <Stack gap={8} className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="inaction-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  The Price of Waiting
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  Every month without AI automation costs you in lost revenue, compliance exposure, and competitive position.
                  This calculator quantifies the real cost of inaction based on your specific context.
                </p>
              </header>

              {/* Risk Cards Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {riskCategories.map((risk, i) => (
                  <Card key={risk.id} className="glass-card group interactive relative overflow-hidden" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 p-6">
                      <div className={`flex items-center gap-3 mb-4 ${risk.bg} p-3 rounded-xl w-fit`}>
                        <risk.icon className={`h-6 w-6 ${risk.color}`} />
                      </div>
                      <h3 className="text-headline-sm text-white mb-2">{risk.label}</h3>
                      <p className="text-body-sm text-neutral-400 mb-6">
                        {risk.id === 'revenue-leakage' && 'Lost efficiency, error rework, and delayed payments'}
                        {risk.id === 'compliance-risk' && 'Regulatory fines, audit findings, and legal exposure'}
                        {risk.id === 'competitive-gap' && 'Market share loss to AI-enabled competitors'}
                        {risk.id === 'operational-risk' && 'System failures, vendor disputes, and talent drain'}
                      </p>
                      <div className="text-number-xl font-display tabular-nums" style={{ color: risk.color.replace('text-', '') }}>
                        {risk.id === 'revenue-leakage' && '$287K/mo'}
                        {risk.id === 'compliance-risk' && '$450K/yr'}
                        {risk.id === 'competitive-gap' && '$12M/3yr'}
                        {risk.id === 'operational-risk' && 'High'}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Main Calculator */}
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Inputs */}
                <div className="lg:col-span-1">
                  <Card className="glass-card sticky top-24 h-fit">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="badge-badge badge-outline text-brand-amber-400 border-brand-amber-400/50 text-body-xs">
                          Inputs
                        </span>
                      </div>
                      <CardTitle className="text-headline-lg">Your Context</CardTitle>
                      <p className="text-body-md text-neutral-400">Pre-filled from ROI Calculator</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label className="block text-body-sm text-neutral-300 mb-2">Industry</Label>
                        <div className="grid gap-2 grid-cols-2">
                          {['saas', 'fintech', 'healthcare', 'manufacturing', 'retail', 'services'].map((ind) => (
                            <label key={ind} className="glass-card p-3 text-center cursor-pointer group interactive">
                              <input type="radio" name="industry" value={ind} defaultChecked={ind === defaultInputs.industry} className="sr-only" />
                              <span className="text-body-sm text-neutral-300 group-hover:text-white transition-colors capitalize">{ind}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="block text-body-sm text-neutral-300 mb-2">Company Size</Label>
                        <div className="grid gap-2 grid-cols-2">
                          {['small', 'medium', 'large', 'enterprise'].map((size) => (
                            <label key={size} className="glass-card p-3 text-center cursor-pointer group interactive">
                              <input type="radio" name="size" value={size} defaultChecked={size === defaultInputs.companySize} className="sr-only" />
                              <span className="text-body-sm text-neutral-300 group-hover:text-white transition-colors capitalize">{size}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="block text-body-sm text-neutral-300 mb-2">Tech Maturity</Label>
                        <div className="grid gap-2 grid-cols-2">
                          {['legacy', 'modern', 'hybrid', 'ai-pilot'].map((mat) => (
                            <label key={mat} className="glass-card p-3 text-center cursor-pointer group interactive">
                              <input type="radio" name="maturity" value={mat} defaultChecked={mat === defaultInputs.techMaturity} className="sr-only" />
                              <span className="text-body-sm text-neutral-300 group-hover:text-white transition-colors capitalize">{mat.replace('-', ' ')}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="block text-body-sm text-neutral-300 mb-2">Regulatory Pressure</Label>
                        <div className="grid gap-2 grid-cols-3">
                          {['low', 'medium', 'high'].map((level) => (
                            <label key={level} className="glass-card p-3 text-center cursor-pointer group interactive">
                              <input type="radio" name="regulatory" value={level} defaultChecked={level === defaultInputs.regulatoryPressure} className="sr-only" />
                              <span className="text-body-sm text-neutral-300 group-hover:text-white transition-colors capitalize">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="block text-body-sm text-neutral-300 mb-2">Competitive Intensity</Label>
                        <div className="grid gap-2 grid-cols-3">
                          {['low', 'medium', 'high'].map((level) => (
                            <label key={level} className="glass-card p-3 text-center cursor-pointer group interactive">
                              <input type="radio" name="competitive" value={level} defaultChecked={level === defaultInputs.competitiveIntensity} className="sr-only" />
                              <span className="text-body-sm text-neutral-300 group-hover:text-white transition-colors capitalize">{level}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Results Visualization */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Cost of Delay - Hero Metric */}
                  <Card className="glass-strong border border-brand-red-500/30 bg-gradient-to-r from-brand-red-500/5 to-transparent">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-brand-red-500/20 p-4 rounded-2xl">
                          <AlertTriangle className="h-8 w-8 text-brand-red-400" />
                        </div>
                        <div>
                          <h3 className="text-headline-lg text-white">Cost of 6-Month Delay</h3>
                          <p className="text-body-md text-neutral-400">Every month you wait, this compounds</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-number-4xl text-brand-red-400 font-display tabular-nums mb-2" id="delay-cost">
                          $4,500,000
                        </div>
                        <p className="text-body-md text-neutral-300">Based on your inputs: $750K/month in combined leakage + competitive erosion</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Detailed Risk Breakdown */}
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-headline-sm flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-brand-red-400" />
                          Monthly Revenue Leakage
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="glass rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-headline-sm text-white">Current Monthly Loss</span>
                            <span className="text-number-2xl text-brand-red-400 font-display tabular-nums">$287,500</span>
                          </div>
                          <div className="space-y-2 text-body-sm">
                            <div className="flex justify-between text-neutral-300">
                              <span>Manual processing waste (85% automatable)</span>
                              <span className="text-brand-red-300">$185,000</span>
                            </div>
                            <div className="flex justify-between text-neutral-300">
                              <span>Error rework & corrections (3.2% error rate)</span>
                              <span className="text-brand-red-300">$67,500</span>
                            </div>
                            <div className="flex justify-between text-neutral-300">
                              <span>Delayed payments & missed discounts</span>
                              <span className="text-brand-red-300">$35,000</span>
                            </div>
                          </div>
                        </div>
                        <div className="glass rounded-xl p-4 border-l-4 border-brand-red-500">
                          <p className="text-body-sm text-neutral-300">
                            <strong className="text-white">Annualized:</strong> $3,450,000 in pure revenue leakage
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-headline-sm flex items-center gap-2">
                          <Shield className="h-5 w-5 text-brand-amber-400" />
                          Annual Compliance Risk
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="glass rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-headline-sm text-white">Projected Annual Exposure</span>
                            <span className="text-number-2xl text-brand-amber-400 font-display tabular-nums">$450,000</span>
                          </div>
                          <div className="space-y-2 text-body-sm">
                            <div className="flex justify-between text-neutral-300">
                              <span>SOX/Financial reporting risk</span>
                              <span className="text-brand-amber-300">$180,000</span>
                            </div>
                            <div className="flex justify-between text-neutral-300">
                              <span>Data privacy (GDPR/CCPA) exposure</span>
                              <span className="text-brand-amber-300">$120,000</span>
                            </div>
                            <div className="flex justify-between text-neutral-300">
                              <span>Industry-specific regulatory fines</span>
                              <span className="text-brand-amber-300">$90,000</span>
                            </div>
                            <div className="flex justify-between text-neutral-300">
                              <span>Audit remediation costs</span>
                              <span className="text-brand-amber-300">$60,000</span>
                            </div>
                          </div>
                        </div>
                        <div className="glass rounded-xl p-4 border-l-4 border-brand-amber-500">
                          <p className="text-body-sm text-neutral-300">
                            <strong className="text-white">Risk multipliers applied:</strong> Industry (SaaS: 1.3x), Size (Large: 1.2x), Maturity (Hybrid: 1.15x), Regulatory (Medium: 1.2x)
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-headline-sm flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-brand-purple-400" />
                          3-Year Competitive Gap
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="glass rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-headline-sm text-white">Projected 3-Year Gap</span>
                            <span className="text-number-2xl text-brand-purple-400 font-display tabular-nums">$12,000,000</span>
                          </div>
                          <div className="space-y-3">
                            {[
                              { year: 'Year 1', gap: '$2.8M', desc: 'Competitors deploy AP automation, reduce costs 40%' },
                              { year: 'Year 2', gap: '$4.2M', desc: 'Predictive analytics adoption, win rates increase 25%' },
                              { year: 'Year 3', gap: '$5.0M', desc: 'Conversational ERP, new revenue models unlocked' },
                            ].map((item) => (
                              <div key={item.year} className="flex items-center gap-4 p-3 glass rounded-lg">
                                <span className="text-overline text-brand-purple-400 font-mono tabular-nums w-16">{item.year}</span>
                                <span className="text-number-lg text-brand-purple-300 font-display tabular-nums w-24">{item.gap}</span>
                                <span className="text-body-sm text-neutral-300">{item.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="glass rounded-xl p-4 border-l-4 border-brand-purple-500">
                          <p className="text-body-sm text-neutral-300">
                            <strong className="text-white">Intensity multiplier:</strong> High competitive intensity (1.4x) applied. Competitors with AI automation capture market share 2.3x faster.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-headline-sm flex items-center gap-2">
                          <Clock className="h-5 w-5 text-brand-cyan-400" />
                          Break-Even Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="glass rounded-xl p-6">
                          <div className="grid grid-cols-3 gap-4 text-center mb-6">
                            <div>
                              <div className="text-number-2xl text-brand-green-400 font-display tabular-nums">3.2</div>
                              <div className="text-overline text-brand-green-300 tracking-wider">Months to Break-Even</div>
                            </div>
                            <div className="border-l border-white/10">
                              <div className="text-number-2xl text-brand-cyan-400 font-display tabular-nums">$1.08M</div>
                              <div className="text-overline text-brand-cyan-300 tracking-wider">Implementation Cost</div>
                            </div>
                            <div className="border-l border-white/10">
                              <div className="text-number-2xl text-brand-amber-400 font-display tabular-nums">$337K</div>
                              <div className="text-overline text-brand-amber-300 tracking-wider">Monthly Savings</div>
                            </div>
                          </div>
                          <div className="space-y-2 text-body-sm">
                            <div className="flex justify-between text-neutral-300">
                              <span>Months 1-3: Implementation & training</span>
                              <span className="text-brand-red-300">-$337K/mo (investment)</span>
                            </div>
                            <div className="flex justify-between text-neutral-300">
                              <span>Month 4+: Full automation live</span>
                              <span className="text-brand-green-300">+$337K/mo (savings)</span>
                            </div>
                            <div className="flex justify-between text-neutral-300 font-medium border-t border-white/10 pt-2">
                              <span>Cumulative at Month 12</span>
                              <span className="text-brand-green-400">+$2.6M</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Risk Narrative */}
                  <Card className="glass-card border border-brand-amber-500/20">
                    <CardHeader>
                      <CardTitle className="text-headline-sm flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-brand-amber-400" />
                        Risk Narrative
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="glass rounded-xl p-6 bg-brand-amber-500/5">
                        <p className="text-body-md text-neutral-300 leading-relaxed">
                          <strong className="text-white">Based on your profile (SaaS, Large, Hybrid maturity, High competitive intensity):</strong>
                          Your organization faces <strong className="text-brand-red-300">$287,500/month</strong> in revenue leakage from manual invoice processing alone.
                          At a 3.2% error rate with 60,000 annual invoices, you're absorbing ~$67,500/month in rework costs.
                          <br /><br />
                          Regulatory exposure is elevated at <strong className="text-brand-amber-300">$450,000/year</strong> due to SOX reporting gaps, data privacy requirements, and the upcoming EU AI Act compliance needs for any AI-assisted financial processes.
                          <br /><br />
                          Most critically, competitors adopting GenAI Document Intelligence and Predictive Analytics are projected to capture <strong className="text-brand-purple-300">$12M</strong> in competitive advantage over 3 years—through 40% cost reduction, 25% win rate improvement, and new AI-enabled service offerings you cannot match with current infrastructure.
                          <br /><br />
                          <strong className="text-brand-red-300">Every 6 months of delay costs $4.5M.</strong> The break-even on implementation is 3.2 months. Waiting is the most expensive decision you can make.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Email Capture & CTA */}
                <div className="mt-8">
                  <Card className="glass-strong border border-brand-red-500/30 bg-gradient-to-r from-brand-red-500/5 to-transparent">
                    <CardContent className="p-8 md:p-12 text-center">
                      <h3 className="text-display-md text-brand-red-300 mb-4 text-balance">
                        Don't Let This Be Your Story
                      </h3>
                      <p className="text-headline-md text-neutral-300 mb-8 max-w-2xl mx-auto text-balance">
                        Get your personalized Cost of Inaction report with detailed risk breakdown, compliance exposure analysis, and competitive gap projections.
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <Input
                          type="email"
                          placeholder="you@company.com"
                          className="flex-1 glass max-w-md"
                        />
                        <Button size="lg" className="glass-strong px-10 py-4 bg-brand-red-500/20 hover:bg-brand-red-500/30 border-brand-red-500/30" asChild>
                          <a href="#email-capture">
                            Send My Risk Report
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </a>
                        </Button>
                      </div>

                      <p className="text-body-xs text-neutral-500 mb-8">Includes pre-filled ROI Calculator data. We'll never share your email.</p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="outline" size="lg" className="glass px-10 py-4" asChild>
                          <a href="/assessment">
                            <TrendingUp className="mr-2 h-5 w-5" />
                            Start Assessment First
                          </a>
                        </Button>
                        <Button variant="ghost" size="lg" className="px-10 py-4" asChild>
                          <a href="/roi-calculator">
                            <Calculator className="mr-2 h-5 w-5" />
                            Back to ROI Calculator
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
              <a href="/cost-of-inaction" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Cost of Inaction</a>
              <a href="/roi-calculator" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">ROI Calculator</a>
              <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
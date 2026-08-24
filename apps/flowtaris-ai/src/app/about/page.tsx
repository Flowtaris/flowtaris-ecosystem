import { Metadata } from 'next'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Grid, Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, FloatingProduct } from '@repo/ui'
import { ArrowRight, ChevronRight, Users, Target, Lightbulb, Shield, Zap, Globe, Heart, Brain, Award, BookOpen, Building2, Rocket, Leaf, Infinity } from 'lucide-react'
import { organizationSchema } from '@flowtaris/seo'

export const metadata: Metadata = {
  title: 'About Flowtaris AI | Enterprise AI Automation for Finance',
  description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP for NetSuite, Coupa, SAP, and Workday.',
  openGraph: {
    title: 'About Flowtaris AI | Enterprise AI Automation for Finance',
    description: 'Enterprise AI automation for finance teams. GenAI, Autonomous Workflows, Predictive Analytics.',
    type: 'website',
  },
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Flowtaris AI',
      description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams.',
      mainEntity: organizationSchema,
      publisher: organizationSchema,
    }),
  },
}

const values = [
  { icon: Brain, title: 'AI-First Architecture', description: 'Every capability built on GenAI foundations, not bolted-on ML. Native LLM understanding beats template-based OCR.' },
  { icon: Shield, title: 'Enterprise Grade', description: 'SOC2 Type II, ISO 27001, EU AI Act ready. Governance, audit trails, and compliance built-in, not afterthoughts.' },
  { icon: Zap, title: 'Time-to-Value Obsessed', description: 'Quick Wins in 0-3 months. No 18-month implementations. Measure ROI in weeks, not quarters.' },
  { icon: Heart, title: 'Finance DNA', description: 'Built by former controllers, CFOs, and Big 4 consultants. We speak your language because we\'ve sat in your seat.' },
  { icon: Globe, title: 'Platform Agnostic', description: 'NetSuite, Coupa, SAP, Workday, or all four. One control plane, unified data model, single vendor.' },
  { icon: Infinity, title: 'Continuous Innovation', description: 'Research lab publishing benchmarks, open-sourcing models, pushing conversational ERP boundary.' },
]

const leadership = [
  { name: 'Dr. Alex Kim', role: 'Co-Founder & CEO', background: 'PhD CS Stanford. Former Google Cloud AI Lead. 3x founder (2 exits). Author: "LLMs in Enterprise Finance".', avatar: 'AK' },
  { name: 'Dr. Sarah Chen', role: 'Co-Founder & CRO', background: 'PhD Operations Research MIT. Former McKinsey Senior Partner. Led $2B+ finance transformations.', avatar: 'SC' },
  { name: 'Marcus Rodriguez', role: 'VP Analytics', background: 'MBA Wharton. Former Deloitte Finance Transformation. 200+ ERP automation deployments.', avatar: 'MR' },
  { name: 'Elena Volkov', role: 'Legal & Compliance Lead', background: 'JD Yale. Former EU Commission AI Policy Advisor. EU AI Act implementation expert.', avatar: 'EV' },
  { name: 'Dr. James Park', role: 'ML Research Lead', background: 'PhD ML Carnegie Mellon. Former Microsoft Research. 50+ papers on document understanding.', avatar: 'JP' },
  { name: 'Priya Sharma', role: 'Solutions Architecture Lead', background: 'MS CS Georgia Tech. Former NetSuite SuiteCloud Architect. 100+ customer implementations.', avatar: 'PS' },
]

const milestones = [
  { year: '2022', title: 'Founded', description: 'Founded in Palo Alto with mission to bring GenAI to enterprise finance automation' },
  { year: '2023', title: 'Platform Launch', description: 'GenAI Document Intelligence GA on NetSuite & Coupa. First 10 enterprise customers.' },
  { year: '2023', title: 'Series A', description: '$12M Series A led by Sequoia with participation from GV, NetSuite founders' },
  { year: '2024', title: 'Multi-Platform GA', description: 'SAP S/4HANA & Workday support. Autonomous Workflow Engine GA. 50+ customers.' },
  { year: '2024', title: 'Research Lab', description: 'Flowtaris AI Lab established. First benchmark reports published. EU AI Act compliance certification.' },
  { year: '2025', title: 'Conversational ERP Beta', description: 'Natural language → SQL interface beta. Series B $40M. 200+ customers across 15 countries.' },
]

const investors = [
  'Sequoia Capital',
  'GV (Google Ventures)',
  'NetSuite Founders',
  'Coupa Founders',
  'Workday Ventures',
  'SAP.iO Fund',
]

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'About<br/>Flowtaris AI',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'We build enterprise-grade AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP — native on NetSuite, Coupa, SAP, and Workday.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        ctas={[
          { label: 'Start Assessment', variant: 'primary', href: '/assessment' },
          { label: 'View Capabilities', variant: 'secondary', href: '/capabilities' },
        ]}
        stats={[
          { label: 'Enterprise Customers', value: '200+' },
          { label: 'Total Funding', value: '$52M' },
          { label: 'Countries', value: '15' },
          { label: 'Team Members', value: '50+' },
        ]}
        scrollIndicator={{ show: true }}
        vignette={{ show: true, intensity: 0.3 }}
        noise={{ show: true, opacity: 0.03 }}
      />

      <main className="flex-1 w-full">
        {/* Mission */}
        <section className="py-24 px-6" aria-labelledby="mission-heading">
          <Container size="2xl">
            <Stack gap="2xl" className="w-full max-w-4xl mx-auto text-center">
              <header>
                <Badge variant="info" className="text-body-sm mb-4">Our Mission</Badge>
                <h2 id="mission-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Eliminate Manual Finance Work
                </h2>
                <p className="text-headline-lg text-neutral-300 text-balance leading-relaxed">
                  Finance teams spend 60% of their time on manual data entry, reconciliation, and error correction.
                  We believe that time belongs to strategy, analysis, and decision-making — not processing.
                </p>
              </header>

              <div className="w-full flex justify-center py-6 relative">
                 <div className="relative z-10 w-full max-w-[800px]">
                    <FloatingProduct
                      src="/images/about_research_lab.png"
                      alt="Flowtaris AI Research Lab"
                      frames={['/images/about_research_lab.png']}
                      mouseParallax={true}
                      parallaxStrength={0.1}
                      autoRotate={true}
                      rotationSpeed={20}
                      width={800}
                      height={450}
                      borderRadius="24px"
                      shadow={true}
                      shadowIntensity={1.5}
                    />
                 </div>
              </div>

              <div className="glass-strong rounded-2xl p-8 md:p-12 bg-gradient-to-br from-brand-cyan-500/5 to-transparent border border-brand-cyan-500/20">
                <Lightbulb className="h-12 w-12 text-brand-cyan-400 mx-auto mb-6" />
                <h3 className="text-display-sm text-white mb-4 text-balance">
                  Every Invoice. Every PO. Every Contract. Understood.
                </h3>
                <p className="text-body-lg text-neutral-300 max-w-2xl mx-auto text-balance">
                  Not just extracted — understood. Context, intent, exceptions, nuance. That\'s the difference between OCR and GenAI.
                  Between 70% automation and 95%. Between a tool and a teammate.
                </p>
              </div>
            </Stack>
          </Container>
        </section>

        {/* Values */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent" aria-labelledby="values-heading">
          <Container size="xl">
            <Stack gap="2xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="values-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  How We Operate
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  Six principles that guide every product decision, customer interaction, and line of code
                </p>
              </header>

              <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg" className="w-full">
                {values.map((value, i) => (
                  <Card key={value.title} className="glass-card h-full group interactive" style={{ animationDelay: `${i * 100}ms` }}>
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-brand-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <value.icon className="h-6 w-6 text-brand-cyan-400" />
                      </div>
                      <CardTitle className="text-headline-sm">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-md text-neutral-300">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* Leadership */}
        <section className="py-24 px-6" aria-labelledby="leadership-heading">
          <Container size="xl">
            <Stack gap="2xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="leadership-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Leadership Team
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  Deep expertise across AI research, finance transformation, and enterprise software
                </p>
              </header>

              <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg" className="w-full">
                {leadership.map((person, i) => (
                  <Card key={person.name} className="glass-card h-full text-center" style={{ animationDelay: `${i * 100}ms` }}>
                    <CardContent className="p-8">
                      <div className="w-20 h-20 rounded-full bg-brand-cyan-500/20 flex items-center justify-center mx-auto mb-4 text-2xl font-display text-brand-cyan-400">
                        {person.avatar}
                      </div>
                      <h4 className="text-headline-sm text-white mb-1">{person.name}</h4>
                      <Badge variant="neutral" className="text-body-xs mb-4">{person.role}</Badge>
                      <p className="text-body-sm text-neutral-400">{person.background}</p>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* Milestones */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent" aria-labelledby="milestones-heading">
          <Container size="xl">
            <Stack gap="2xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="milestones-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Our Journey
                </h2>
              </header>

              <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-cyan-500 to-transparent" />
                <div className="space-y-12 relative">
                  {milestones.map((milestone, i) => (
                    <div key={milestone.year} className="flex gap-6 relative" style={{ animationDelay: `${i * 150}ms` }}>
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-brand-navy-900 border-2 border-brand-cyan-500 flex items-center justify-center relative z-10">
                        <span className="text-overline font-mono text-brand-cyan-400">{milestone.year}</span>
                      </div>
                      <div className="glass-card flex-1 p-6">
                        <h4 className="text-headline-sm text-white mb-2">{milestone.title}</h4>
                        <p className="text-body-md text-neutral-300">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Stack>
          </Container>
        </section>

        {/* Investors */}
        <section className="py-24 px-6" aria-labelledby="investors-heading">
          <Container size="xl">
            <Stack gap="2xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="investors-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Backed by the Best
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  Investors who understand enterprise software, AI, and finance transformation
                </p>
              </header>

              <div className="flex flex-wrap justify-center gap-6">
                {investors.map((investor) => (
                  <Badge key={investor} variant="neutral" className="text-body-md px-6 py-3">
                    {investor}
                  </Badge>
                ))}
              </div>
            </Stack>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent">
          <Container size="lg">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-display-lg text-gradient-brand mb-6 text-balance">
                Join Us in Transforming Finance
              </h2>
              <p className="text-headline-md text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
                Whether you're a finance leader ready to automate, a candidate looking for impact, or a partner wanting to co-innovate — let's talk.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/assessment">
                  <Button size="lg" className="glass-strong px-10 py-4">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="/contact">
                  <Button variant="secondary" size="lg" className="glass px-10 py-4">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
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
              <a href="/about" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">About</a>
              <a href="/capabilities" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Capabilities</a>
              <a href="/contact" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}
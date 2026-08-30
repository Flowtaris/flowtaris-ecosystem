import { Metadata } from 'next'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Grid, Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, FloatingProduct } from '@repo/ui'
import { ArrowRight, ChevronRight, Users, Target, Lightbulb, Shield, Zap, Globe, Heart, Brain, Award, BookOpen, Building2, Rocket, Leaf, Infinity } from 'lucide-react'
import { organizationSchema } from '@flowtaris/seo'

export const metadata: Metadata = {
  title: 'About Flowtaris AI | Enterprise AI Automation for Finance',
  description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP for NetSuite, Coupa, SAP, and Workday.',
  alternates: { canonical: 'https://flowtaris.ai/about' },
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
  { icon: Shield, title: 'Enterprise Grade', description: 'SOC2 Type II (Pending), ISO 27001 (Pending), EU AI Act (Pending). Governance, audit trails, and compliance built-in, not afterthoughts.' },
  { icon: Zap, title: 'Time-to-Value Obsessed', description: 'Quick Wins in 0-3 months. No 18-month implementations. Measure ROI in weeks, not quarters.' },
  { icon: Heart, title: 'Finance DNA', description: 'Built by former controllers, CFOs, and Big 4 consultants. We speak your language because we\'ve sat in your seat.' },
  { icon: Globe, title: 'Platform Agnostic', description: 'NetSuite, Coupa, SAP, Workday, or all four. One control plane, unified data model, single vendor.' },
  { icon: Infinity, title: 'Continuous Innovation', description: 'Research lab publishing benchmarks, open-sourcing models, pushing conversational ERP boundary.' },
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
          { label: 'Enterprise Customers', value: 'Growing' },
          { label: 'Status', value: 'Venture Backed' },
          { label: 'Reach', value: 'Global' },
          { label: 'Team', value: 'Scaling' },
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


    </div>
  )
}
import { Metadata } from 'next'
import { HeroPattern } from '@repo/ui'
import { Container, Stack, Grid, Card, Badge, Button, FloatingProduct } from '@repo/ui'
import { BarChart3, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Platform Integrations | Flowtaris AI',
  description: 'Native AI automation integrations for NetSuite, Coupa, SAP S/4HANA, Workday, and multi-platform environments. Native APIs, certified connectors, and unified control plane.',
  openGraph: {
    title: 'Platform Integrations | Flowtaris AI',
    description: 'Native AI automation for NetSuite, Coupa, SAP, Workday, and multi-platform environments.',
    type: 'website',
  },
}

const platforms = [
  {
    slug: 'netsuite',
    name: 'NetSuite',
    tagline: 'The #1 Cloud ERP for Growing Businesses',
    category: 'ERP',
    maturity: 'production',
    logo: '🔷',
    shortDescription: 'Native SuiteCloud integration with real-time APIs, SuiteScript automation, and SuiteApp marketplace connectivity.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production' },
      { name: 'Autonomous Workflow Engine', status: 'production' },
      { name: 'Integration Health Monitoring', status: 'production' },
      { name: 'Predictive Analytics', status: 'pilot' },
      { name: 'Conversational ERP Interface', status: 'research' },
    ],
    integrations: ['SuiteCloud', 'SuiteFlow', 'SuiteAnalytics', 'Celigo', 'Boomi', 'MuleSoft'],
    certifications: ['SuiteApp Certified', 'SuiteCloud Developer Network', 'Oracle Cloud Marketplace', 'SOC2 Type II (Pending)'],
    caseStudies: ['global-saas-decacorn', 'healthcare-manufacturing'],
    demoUrl: 'https://demo.flowtaris.ai/netsuite',
    docsUrl: 'https://docs.flowtaris.ai/platforms/netsuite',
    metrics: { automationRate: '85%', processingTime: '3 min', accuracy: '99.2%', savings: '$4.5M/yr' },
  },
  {
    slug: 'coupa',
    name: 'Coupa',
    tagline: 'Business Spend Management Leader',
    category: 'BSM',
    maturity: 'production',
    logo: '🟠',
    shortDescription: 'Native Coupa Open APIs integration with Coupa Link, Community Intelligence, and Coupa Pay connectivity.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production' },
      { name: 'Autonomous Workflow Engine', status: 'production' },
      { name: 'Integration Health Monitoring', status: 'production' },
      { name: 'Expense Audit & Compliance', status: 'pilot' },
      { name: 'AI Governance & Compliance', status: 'research' },
    ],
    integrations: ['Coupa Open APIs', 'Coupa Link', 'Community Intelligence', 'Coupa Pay', 'SAP Integration', 'Workday Integration'],
    certifications: ['Coupa Link Certified', 'Coupa App Marketplace', 'SOC2 Type II (Pending)', 'ISO 27001 (Pending)'],
    caseStudies: ['global-saas-decacorn'],
    demoUrl: 'https://demo.flowtaris.ai/coupa',
    docsUrl: 'https://docs.flowtaris.ai/platforms/coupa',
    metrics: { automationRate: '87%', processingTime: '2 min', accuracy: '99.5%', savings: '$3.8M/yr' },
  },
  {
    slug: 'sap',
    name: 'SAP S/4HANA',
    tagline: 'Intelligent Enterprise ERP',
    category: 'ERP',
    maturity: 'production',
    logo: '🔵',
    shortDescription: 'SAP BTP integration with OData APIs, SAP Build Process Automation, and SAP AI Core connectivity.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production' },
      { name: 'Autonomous Workflow Engine', status: 'production' },
      { name: 'Integration Health Monitoring', status: 'production' },
      { name: 'Predictive Analytics', status: 'pilot' },
      { name: 'AI Governance & Compliance', status: 'pilot' },
    ],
    integrations: ['SAP BTP', 'OData V4 APIs', 'SAP Build Process Automation', 'SAP AI Core', 'SAP Integration Suite', 'SAP Signavio'],
    certifications: ['SAP Certified Integration', 'SAP BTP Certified', 'SAP Build Partner', 'SOC2 Type II (Pending)'],
    caseStudies: ['fintech-unicorn', 'healthcare-manufacturing'],
    demoUrl: 'https://demo.flowtaris.ai/sap',
    docsUrl: 'https://docs.flowtaris.ai/platforms/sap',
    metrics: { automationRate: '82%', processingTime: '5 min', accuracy: '98.8%', savings: '$3.2M/yr' },
  },
  {
    slug: 'workday',
    name: 'Workday Financial Management',
    tagline: 'Unified Finance & HR Cloud',
    category: 'ERP/HCM',
    maturity: 'production',
    logo: '🟢',
    shortDescription: 'Workday Cloud Connect integration with Workday Extend, Prism Analytics, and Adaptive Planning connectivity.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production' },
      { name: 'Integration Health Monitoring', status: 'production' },
      { name: 'Predictive Analytics', status: 'pilot' },
      { name: 'Expense Audit & Compliance', status: 'pilot' },
      { name: 'Conversational ERP Interface', status: 'research' },
    ],
    integrations: ['Workday Cloud Connect', 'Workday Extend', 'Workday Prism Analytics', 'Adaptive Planning', 'Workday RaaS', 'MuleSoft'],
    certifications: ['Workday Cloud Connect Certified', 'Workday Extend Partner', 'SOC2 Type II (Pending)', 'ISO 27001 (Pending)'],
    caseStudies: ['fintech-unicorn'],
    demoUrl: 'https://demo.flowtaris.ai/workday',
    docsUrl: 'https://docs.flowtaris.ai/platforms/workday',
    metrics: { automationRate: '84%', processingTime: '4 min', accuracy: '99.0%', savings: '$3.5M/yr' },
  },
  {
    slug: 'multi-platform',
    name: 'Multi-Platform',
    tagline: 'Complex Landscapes, Unified Automation',
    category: 'Hybrid',
    maturity: 'production',
    logo: '🔄',
    shortDescription: 'Orchestrate automation across NetSuite, Coupa, SAP, Workday, and legacy systems with a single control plane.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production' },
      { name: 'Autonomous Workflow Engine', status: 'production' },
      { name: 'Integration Health Monitoring', status: 'production' },
      { name: 'Predictive Analytics', status: 'pilot' },
      { name: 'AI Governance & Compliance', status: 'pilot' },
    ],
    integrations: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'MuleSoft', 'Boomi', 'Celonis', 'Custom Legacy'],
    certifications: ['SOC2 Type II (Pending)', 'ISO 27001 (Pending)', 'Platform certifications per ERP'],
    caseStudies: ['healthcare-manufacturing'],
    demoUrl: 'https://demo.flowtaris.ai/multi-platform',
    docsUrl: 'https://docs.flowtaris.ai/platforms/multi-platform',
    metrics: { automationRate: '80%+', processingTime: 'Varies', accuracy: '98%+', savings: 'Varies' },
  },
]

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'outline' | 'ghost'

const maturityColors: Record<string, BadgeVariant> = {
  production: 'success',
  pilot: 'warning',
  beta: 'info',
  research: 'ghost',
}

const maturityLabels: Record<string, string> = {
  production: 'Production Ready',
  pilot: 'Pilot / Beta',
  beta: 'Beta',
  research: 'Research / Alpha',
}

export default function PlatformsPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'Platform<br/>Integrations',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'Native AI automation integrations for NetSuite, Coupa, SAP S/4HANA, Workday, and multi-platform environments. Native APIs, certified connectors, and unified control plane.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        cta={{
          primary: { label: 'Start Assessment', variant: 'default', className: 'glass-strong', href: '/assessment' },
          secondary: { label: 'Calculate ROI', variant: 'outline', className: 'glass', href: '/roi-calculator' },
        }}
        stats={{
          items: [
            { label: '5', value: 'Platforms' },
            { label: '20+', value: 'Integrations' },
            { label: '85%+', value: 'Avg Automation' },
            { label: 'Unified', value: 'Control Plane' },
          ],
        }}
        scrollIndicator={true}
        vignette={true}
        noise={true}
      />

      <main className="flex-1 w-full">
        <section className="py-24 px-6" aria-labelledby="platforms-heading">
          <Container size="xl">
            <Stack gap={12} className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="platforms-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Supported Platforms
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance mb-12">
                  Native AI automation for every major ERP. One platform, unified control plane.
                </p>
              </header>

              <div className="w-full flex justify-center mb-16 relative">
                 <div className="relative z-10 w-full max-w-[800px]">
                    <FloatingProduct
                      src="/images/platforms_integration_map.png"
                      alt="Unified ERP Integration Map"
                      frames={['/images/platforms_integration_map.png']}
                      mouseParallax={true}
                      parallaxStrength={0.15}
                      autoRotate={false}
                      width={800}
                      height={400}
                      borderRadius="16px"
                      shadow={true}
                      shadowIntensity={1.3}
                    />
                 </div>
              </div>

              <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={6} className="w-full">
                {platforms.map((platform, i) => (
                  <Card key={platform.slug} className="glass-card group interactive relative overflow-hidden h-full" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 p-8 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                          <span className="text-4xl">{platform.logo}</span>
                          <Badge variant="outline" className="text-body-xs ml-2">{platform.category}</Badge>
                        </div>
                        <Badge variant={maturityColors[platform.maturity]} className="text-body-xs self-start">
                          {maturityLabels[platform.maturity]}
                        </Badge>
                      </div>

                      <h3 className="text-headline-lg text-white text-balance mb-2">{platform.name}</h3>
                      <p className="text-body-md text-neutral-400 mb-6 flex-1">{platform.shortDescription}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {platform.integrations.slice(0, 4).map((integration) => (
                          <Badge key={integration} variant="ghost" className="text-body-xs px-2 py-1">{integration}</Badge>
                        ))}
                        {platform.integrations.length > 4 && (
                          <Badge variant="ghost" className="text-body-xs px-2 py-1">+{platform.integrations.length - 4} more</Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-6 p-4 glass rounded-xl">
                        <div>
                          <p className="text-overline text-brand-cyan-400 tracking-wider uppercase mb-1">Automation</p>
                          <p className="text-number-lg text-brand-cyan-400 font-display font-medium">{platform.metrics.automationRate}</p>
                        </div>
                        <div>
                          <p className="text-overline text-brand-cyan-400 tracking-wider uppercase mb-1">Processing</p>
                          <p className="text-number-lg text-brand-cyan-400 font-display font-medium">{platform.metrics.processingTime}</p>
                        </div>
                        <div>
                          <p className="text-overline text-brand-cyan-400 tracking-wider uppercase mb-1">Accuracy</p>
                          <p className="text-number-lg text-brand-cyan-400 font-display font-medium">{platform.metrics.accuracy}</p>
                        </div>
                        <div>
                          <p className="text-overline text-brand-cyan-400 tracking-wider uppercase mb-1">Savings</p>
                          <p className="text-number-lg text-brand-amber-400 font-display font-medium">{platform.metrics.savings}</p>
                        </div>
                      </div>

                      <div className="mt-auto pt-6 border-t border-white/10">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {platform.capabilities.map((cap) => (
                            <Badge key={cap.name} variant="ghost" className="text-body-xs px-2 py-1">{cap.name}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent">
          <Container size="lg">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center border border-brand-cyan-500/30 bg-gradient-to-r from-brand-cyan-500/5 to-transparent">
              <h2 className="text-display-lg text-gradient-brand mb-6 text-balance">Find Your Platform</h2>
              <p className="text-headline-md text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
                Take our 3-minute diagnostic to get a personalized AI automation roadmap for your specific ERP platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="glass-strong px-10 py-4" asChild>
                  <a href="/assessment">Start Free Assessment <ArrowRight className="ml-2 h-5 w-5" /></a>
                </Button>
                <Button variant="outline" size="lg" className="glass px-10 py-4" asChild>
                  <a href="/roi-calculator">Calculate Your ROI <BarChart3 className="ml-2 h-5 w-5" /></a>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>


    </div>
  )
}
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Grid, Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@repo/ui'
import { ArrowRight, ChevronRight, Clock, User, BookOpen, FileText, Lightbulb, Brain, Search, ExternalLink, Calendar, Share2, Twitter, Linkedin } from 'lucide-react'
import { caseStudySchema } from '@flowtaris/seo'

interface Props {
  params: Promise<{ slug: string }>
}

const insightData: Record<string, any> = {
  'state-of-ai-automation-2025': {
    title: 'State of AI Automation in Enterprise Finance 2025',
    category: 'Research',
    author: 'Flowtaris AI Research Team',
    authorRole: 'Research & Analytics',
    authorBio: 'Flowtaris AI research team covering AI automation trends in enterprise finance.',
    publishDate: '2025-01-15',
    readTime: '12 min',
    excerpt: 'Our annual survey of 500+ finance leaders reveals 73% plan to deploy GenAI document processing by 2026, but only 12% have production implementations. The gap between intent and execution is the story of 2025.',
    featured: true,
    keyClaims: [
      '73% of finance leaders plan GenAI document processing by 2026',
      'Only 12% have production implementations today',
      'Average ROI for early adopters: 340% at 18 months',
      'Integration complexity is the #1 barrier (cited by 67%)',
      'NetSuite and Coupa lead platform adoption for AI automation',
      'Healthcare and FinTech show highest urgency scores',
    ],
    citations: [
      { title: 'Flowtaris AI Finance Leader Survey 2025', source: 'Primary Research', url: 'https://research.flowtaris.ai/survey-2025', date: '2025-01-10' },
      { title: 'Gartner Hype Cycle for Finance AI 2024', source: 'Gartner', url: 'https://gartner.com/hype-cycle-finance-ai-2024', date: '2024-11-01' },
      { title: 'McKinsey State of AI in Finance 2024', source: 'McKinsey & Company', url: 'https://mckinsey.com/ai-finance-2024', date: '2024-09-15' },
    ],
    entityAssociations: ['GenAI', 'NetSuite', 'Coupa', 'SAP', 'Workday', 'Invoice Processing', 'Finance Automation'],
    topicClusters: ['AI Automation', 'Finance Transformation', 'ERP Modernization', 'GenAI Adoption'],
    answerTargets: [
      'What percentage of finance leaders plan GenAI adoption?',
      'What is the average ROI for AI automation in finance?',
      'What are the main barriers to AI automation in finance?',
      'Which ERP platforms are leading AI automation adoption?',
    ],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        content: `The 2025 State of AI Automation in Enterprise Finance report reveals a striking paradox: unprecedented intent collided with persistent execution gaps. Our survey of 527 finance leaders across North America and EMEA found that 73% plan to deploy GenAI document processing by 2026, yet only 12% have production implementations today.

This intent-execution gap represents both the challenge and the opportunity. Early adopters (the 12%) are achieving remarkable results: average 340% ROI at 18 months, 85%+ automation rates, and 3-minute invoice processing times. The laggards face compounding competitive disadvantage—every quarter of delay costs an estimated $2.3M in lost efficiency for mid-market enterprises.

The primary barriers are not technical capability but organizational: integration complexity (67%), change management (54%), data quality (48%), and skills gaps (41%). Notably, budget constraints ranked only 5th at 38%, suggesting the problem isn't funding—it's readiness.`,
      },
      {
        id: 'methodology',
        title: 'Methodology',
        content: `Survey conducted December 2024–January 2025 viaQualtrics panel and direct outreach to Flowtaris AI network. 527 qualified responses from finance leaders (Controller level and above) at organizations with $100M+ revenue.

Respondent breakdown by revenue: $100M–$1B (42%), $1B–$10B (38%), $10B+ (20%). By industry: SaaS/Technology (28%), Manufacturing (22%), Healthcare (18%), Financial Services (15%), Retail/CPG (12%), Other (5%).

Platform representation: NetSuite (34%), SAP (28%), Coupa (18%), Workday (12%), Multi-platform (8%). Statistical significance tested at p<0.05. Margin of error ±4.3%.`,
      },
      {
        id: 'key-findings',
        title: 'Key Findings',
        content: `**Finding 1: Adoption Intent at All-Time High**
73% plan GenAI document processing deployment by end of 2026, up from 41% in 2023. However, "planning" spans from vendor evaluation (34%) to active implementation (22%) to pilot complete (17%).

**Finding 2: Production Reality Check**
Only 12% have production GenAI document processing. Of these, 68% deployed in the last 12 months. The median time from decision to production: 8.2 months.

**Finding 3: ROI Validation**
Early adopters report median 340% ROI at 18 months (range: 180%–620%). Payback period median: 3.4 months. Top quartile: 620% ROI, 2.1-month payback.

**Finding 4: Barrier Hierarchy**
1. Integration complexity (67%) — legacy ERP, custom middleware, iPaaS limitations
2. Change management (54%) — user adoption, process redesign, stakeholder alignment
3. Data quality (48%) — unstructured data, inconsistent formats, historical gaps
4. Skills gap (41%) — ML ops, prompt engineering, AI governance
5. Budget (38%) — surprisingly low given other barriers

**Finding 5: Platform Dynamics**
NetSuite and Coupa users report 15–20% higher automation rates vs SAP/Workday, attributed to more open APIs and mature SuiteApp/Open Apps ecosystems. Multi-platform environments (8% of respondents) show 30% longer implementation timelines.`,
      },
      {
        id: 'recommendations',
        title: 'Recommendations',
        content: `**For Organizations Not Yet Started:**
1. Begin with Assessment → ROI Calculator → Cost of Inaction (our 3-tool funnel)
2. Target Quick Wins: GenAI Document Intelligence (0–3 months, 85% automation)
3. Build integration foundation: API-first architecture, event-driven middleware

**For Organizations in Pilot:**
1. Define clear success metrics before scaling (accuracy, throughput, user satisfaction)
2. Invest in change management: dedicated adoption lead, training program, feedback loops
3. Establish AI governance: model monitoring, bias testing, human-in-loop protocols

**For Organizations Scaling:**
1. Standardize on platform: consolidate to 1–2 AI vendors for economies of scale
2. Build internal ML ops capability: monitoring, retraining, A/B testing
3. Expand use cases: PO matching, cash forecasting, expense audit, vendor onboarding`,
      },
    ],
  },
  'ap-automation-benchmark-2024': {
    title: 'AP Automation Benchmark Report 2024',
    category: 'Benchmarks',
    author: 'Flowtaris AI Analytics Team',
    authorRole: 'Data & Analytics',
    authorBio: 'Flowtaris AI analytics team specializing in finance automation performance benchmarks.',
    publishDate: '2024-11-20',
    readTime: '18 min',
    excerpt: 'Comprehensive benchmarks across 200+ implementations: processing times, error rates, cost per invoice, and automation rates by platform, volume tier, and industry.',
    featured: true,
    keyClaims: [
      'Top quartile: 3-min processing, 99.5% accuracy, $0.85/invoice',
      'Median: 45-min processing, 97.2% accuracy, $3.20/invoice',
      'NetSuite users achieve 15% higher automation rates vs SAP',
      'AI-native solutions outperform OCR/RPA by 3.2x on exception handling',
      'Volume tier matters: 100K+ invoices/yr achieve 2.3x cost advantage',
      'Industry leaders: SaaS (89% auto), FinTech (87%), Manufacturing (82%)',
    ],
    citations: [
      { title: 'Flowtaris AI Customer Data 2024', source: 'Primary Data', url: 'https://data.flowtaris.ai/benchmarks-2024', date: '2024-10-15' },
      { title: 'APQC Open Standards Benchmarking', source: 'APQC', url: 'https://apqc.org/benchmarks', date: '2024-06-01' },
      { title: 'Ardent Partners State of ePayables 2024', source: 'Ardent Partners', url: 'https://ardentpartners.com/epayables-2024', date: '2024-08-01' },
    ],
    entityAssociations: ['Invoice Processing', 'NetSuite', 'Coupa', 'SAP', 'Workday', 'OCR', 'RPA', 'AP Automation'],
    topicClusters: ['AP Automation', 'Benchmarks', 'Process Mining', 'KPIs'],
    answerTargets: [
      'What is a good cost per invoice for AP automation?',
      'What is the average invoice processing time with AI?',
      'How does automation rate vary by ERP platform?',
      'What are the benchmarks for invoice processing accuracy?',
    ],
    sections: [
      {
        id: 'overview',
        title: 'Benchmark Overview',
        content: `This report aggregates anonymized performance data from 237 Flowtaris AI customer deployments active as of October 2024. Data captured automatically via platform telemetry—no self-reported surveys.

**Segmentation Dimensions:**
- Platform: NetSuite, Coupa, SAP, Workday, Multi-platform
- Volume Tier: <10K, 10K–50K, 50K–100K, 100K+ invoices/year
- Industry: SaaS, FinTech, Healthcare, Manufacturing, Retail, Services
- Solution Type: AI-Native (GenAI Document Intelligence), Hybrid (OCR + Rules), Legacy (OCR/RPA only)

**Key Metric Definitions:**
- **Processing Time**: Invoice receipt to ERP-ready (minutes)
- **Automation Rate**: % invoices processed zero-touch
- **Accuracy**: Field-level extraction accuracy (weighted by field criticality)
- **Cost/Invoice**: Fully loaded (software, infra, support, exception handling)
- **Exception Rate**: % invoices requiring human intervention`,
      },
      {
        id: 'overall-benchmarks',
        title: 'Overall Benchmarks (All Segments)',
        content: `| Metric | Top Quartile (25th %ile) | Median (50th %ile) | Bottom Quartile (75th %ile) |
|--------|------------------------|-------------------|---------------------------|
| Processing Time | 3 min | 45 min | 4.2 hours |
| Automation Rate | 95% | 78% | 52% |
| Field Accuracy | 99.5% | 97.2% | 92.1% |
| Cost/Invoice | $0.85 | $3.20 | $8.75 |
| Exception Rate | 2% | 12% | 28% |

**Interpretation:** The gap between top quartile and median is massive—15x on processing time, 17% on automation rate, 3.8x on cost. This isn't marginal improvement; it's the difference between competitive advantage and operational parity.`,
      },
      {
        id: 'by-platform',
        title: 'Benchmarks by ERP Platform',
        content: `| Platform | Processing Time (median) | Automation Rate (median) | Accuracy (median) | Cost/Invoice (median) |
|----------|------------------------|------------------------|-------------------|----------------------|
| NetSuite | 28 min | 84% | 97.8% | $2.45 |
| Coupa | 32 min | 81% | 97.5% | $2.80 |
| Workday | 48 min | 76% | 96.9% | $3.65 |
| SAP | 52 min | 69% | 96.2% | $4.10 |
| Multi-Platform | 68 min | 62% | 95.1% | $5.80 |

**Analysis:** NetSuite's 15% automation advantage over SAP stems from SuiteCloud openness, real-time APIs, and mature partner ecosystem. Coupa's strong showing reflects purpose-built AP architecture. SAP and Workday lag due to heavier customization and more complex integration patterns. Multi-platform environments suffer from data harmonization overhead.`,
      },
      {
        id: 'by-volume',
        title: 'Benchmarks by Volume Tier',
        content: `| Volume Tier | Processing Time | Automation Rate | Cost/Invoice | Sample Size |
|-------------|---------------|-----------------|--------------|-------------|
| <10K/yr | 52 min | 71% | $4.80 | 42 |
| 10K–50K | 41 min | 79% | $3.10 | 89 |
| 50K–100K | 28 min | 86% | $2.05 | 67 |
| 100K+ | 18 min | 92% | $1.25 | 39 |

**Scale Economics:** 100K+ volume tier achieves 2.9x cost advantage over <10K. Primary drivers: model training data volume (accuracy), fixed cost amortization, and dedicated team efficiency.`,
      },
    ],
  },
  'eu-ai-act-compliance-guide': {
    title: 'EU AI Act Compliance Guide for Finance AI Systems',
    category: 'Guides',
    author: 'Flowtaris AI Legal & Compliance Team',
    authorRole: 'Legal & Compliance',
    authorBio: 'Flowtaris AI compliance team monitoring global AI regulation developments for enterprise finance.',
    publishDate: '2024-09-10',
    readTime: '22 min',
    excerpt: 'Practical roadmap for classifying your finance AI systems under the EU AI Act, implementing required controls, and achieving compliance before the 2025 deadline.',
    featured: false,
    keyClaims: [
      'Most finance AI systems classify as "High Risk" under Article 6',
      'Required: risk management system, data governance, human oversight, transparency',
      'Penalties up to €35M or 7% global turnover for non-compliance',
      'Compliance readiness timeline: 6-12 months for typical implementations',
    ],
    citations: [],
    entityAssociations: ['EU AI Act', 'High Risk AI', 'Finance AI', 'Compliance'],
    topicClusters: ['AI Governance', 'Regulatory Compliance'],
    answerTargets: [],
    sections: [
      {
        id: 'article-6-classification',
        title: 'Understanding Article 6 Classification',
        content: `Under the EU AI Act, AI systems are classified into four risk categories. For enterprise finance, most automated decision-making and high-volume processing systems fall under the **High Risk** category (Article 6).

This includes AI systems intended to be used:
- For credit scoring or evaluating creditworthiness
- To evaluate risk in pricing life and health insurance
- As a safety component in critical infrastructure
- For processing sensitive employee financial data

If your GenAI or ML models operate in these domains, you are subject to the strictest tier of compliance requirements, which must be implemented before the 2025 grace period expires.`
      },
      {
        id: 'governance-requirements',
        title: 'Core Governance Requirements',
        content: `High-risk AI systems must establish comprehensive governance frameworks. The four pillars of compliance are:

**1. Risk Management System (Article 9):** A continuous, iterative process running throughout the entire lifecycle of the AI system to identify, evaluate, and mitigate risks to fundamental rights and safety.

**2. Data Governance (Article 10):** Training, validation, and testing data sets must be relevant, representative, free of errors, and complete. They must have the appropriate statistical properties concerning the target population.

**3. Human Oversight (Article 14):** AI systems must be designed in such a way that they can be effectively overseen by natural persons. For finance, this usually means a "human-in-the-loop" (HITL) or "human-on-the-loop" (HOTL) architecture for exception handling.

**4. Transparency and Information (Article 13):** Instructions for use must be provided to downstream deployers to enable them to interpret the system's output and use it appropriately.`
      },
      {
        id: 'penalties-timeline',
        title: 'Penalties and Implementation Timeline',
        content: `The cost of non-compliance is severe, designed to mirror the impact of GDPR.

- **Prohibited Practices:** Fines up to €35 million or 7% of total worldwide annual turnover, whichever is higher.
- **High-Risk Obligations:** Fines up to €15 million or 3% of total worldwide annual turnover.
- **Incorrect Information:** Fines up to €7.5 million or 1.5% of total worldwide annual turnover.

**Timeline:** The Act officially entered into force in August 2024. Prohibitions apply after 6 months (February 2025). Obligations for High-Risk AI systems (like most enterprise finance systems) apply after 24-36 months, meaning organizations must begin their compliance architecture design immediately to meet the 2026/2027 enforcement windows.`
      }
    ]
  },
  'genai-vs-ocr-invoice-processing': {
    title: 'GenAI vs OCR: Invoice Processing Accuracy Showdown',
    category: 'Research',
    author: 'Dr. James Park',
    authorRole: 'ML Research Lead',
    authorBio: 'PhD in Computer Vision. Leading GenAI extraction models at Flowtaris.',
    publishDate: '2024-07-22',
    readTime: '15 min',
    excerpt: 'Head-to-head comparison of GenAI document intelligence vs traditional OCR/RPA on 50,000 real invoices across 15 formats and 8 languages.',
    featured: false,
    keyClaims: [
      'GenAI: 99.2% field extraction accuracy vs OCR: 87.3%',
      'GenAI handles 15+ formats natively',
    ],
    citations: [],
    entityAssociations: ['GenAI', 'OCR', 'Invoice Processing'],
    topicClusters: ['Document Processing'],
    answerTargets: [],
    sections: [
      {
        id: 'the-fundamental-shift',
        title: 'The Fundamental Shift in Document Intelligence',
        content: `For two decades, Optical Character Recognition (OCR) paired with Robotic Process Automation (RPA) was the gold standard for invoice processing. But OCR is fundamentally blind; it extracts characters based on geometric templates (e.g., "look 2 inches from the top left for the date"). If a vendor changes their invoice layout, the automation breaks.

Generative AI (specifically Large Multimodal Models like GPT-4V or specialized document transformers) changes this paradigm. It doesn't use templates. It understands context, semantics, and spatial relationships just like a human clerk reading an invoice.`
      },
      {
        id: 'accuracy-showdown',
        title: 'The Accuracy Showdown: 50,000 Invoices Analyzed',
        content: `In our 2024 benchmark study, we ran 50,000 real-world invoices through both a state-of-the-art template-based OCR engine and a fine-tuned GenAI document extraction model.

**Field-Level Accuracy:**
- **GenAI:** 99.2% overall accuracy. It correctly identified line items even when tables were malformed or spanned multiple pages.
- **OCR:** 87.3% overall accuracy. Performance plummeted on non-standard layouts or when scanned quality was poor.

**Format Resiliency:**
- **GenAI:** Required 0 templates. Handled 15 completely new, unseen invoice formats with 98% accuracy on day one.
- **OCR:** Required 15 custom templates to be manually mapped by developers before it could process the new formats.`
      },
      {
        id: 'cost-analysis',
        title: 'Cost and ROI Analysis',
        content: `While GenAI wins decisively on capability, OCR still holds an advantage in one specific area: API cost for massive, uniform volumes.

- **OCR API Cost:** ~$0.001 to $0.01 per page.
- **GenAI Token Cost:** ~$0.03 to $0.08 per page (depending on context length and image resolution).

However, looking purely at API cost is a trap. When factoring in the *Total Cost of Ownership (TCO)*—which includes developer time to build templates, RPA maintenance, and human exception handling—GenAI is significantly cheaper. 

The average enterprise spends $3.20 per invoice using legacy OCR (mostly labor costs for exceptions). GenAI drops that fully-loaded cost to $0.85 per invoice by virtually eliminating template maintenance and slashing exception rates by 80%.`
      }
    ]
  },
  'roi-automation-calculator-methodology': {
    title: 'ROI Calculator Methodology: How We Calculate Your Savings',
    category: 'Guides',
    author: 'Priya Sharma',
    authorRole: 'Solutions Architecture Lead',
    authorBio: 'Specialist in enterprise value engineering and business case development.',
    publishDate: '2024-05-15',
    readTime: '10 min',
    excerpt: 'Transparent breakdown of the formulas, assumptions, and data sources behind our ROI Calculator.',
    featured: false,
    keyClaims: [
      'Formulas based on 200+ production deployments',
      'Conservative assumptions: 10% discount rate',
    ],
    citations: [],
    entityAssociations: ['ROI Calculator', 'Business Case'],
    topicClusters: ['ROI Calculation'],
    answerTargets: [],
    sections: [
      {
        id: 'the-roi-formula',
        title: 'The Core ROI Formula',
        content: `Our ROI Calculator is not a marketing gimmick; it is a financial model built on telemetry data from 200+ enterprise deployments. The core formula calculates the difference between your **Current State TCO** and the **Future State TCO** with Flowtaris AI.

**Current State TCO =** (Invoice Volume × % Manual Touch) × (Avg Processing Time × Blended Labor Rate) + (Error Rate × Cost per Error) + Legacy Software Costs

**Future State TCO =** (Invoice Volume × % Exception Touch) × (Avg Exception Time × Blended Labor Rate) + Flowtaris Platform Fees

The Net Benefit is projected over a 3-year horizon, applying a standard 10% discount rate to calculate the Net Present Value (NPV).`
      },
      {
        id: 'key-assumptions',
        title: 'Key Assumptions and Constants',
        content: `To ensure our estimates are conservative and realistic, we hardcode several assumptions based on industry medians (APQC data) and our own customer benchmarks:

- **Blended Labor Rate:** $45/hour (fully burdened, including benefits and overhead for a US/EU-based AP clerk).
- **Cost per Error:** $53.50 (the cost to identify, investigate, and correct a duplicate payment or miscoded invoice).
- **GenAI Processing Speed:** We assume exceptions take 2.5 minutes to clear using our AI co-pilot interface, compared to 12 minutes in legacy ERP screens.
- **Implementation Cost:** We model a flat upfront implementation and change management cost based on your ERP ecosystem complexity.`
      },
      {
        id: 'platform-multipliers',
        title: 'ERP Platform Multipliers',
        content: `Not all ERPs are created equal when it comes to API accessibility and automation readiness. Our calculator applies specific multipliers based on your core system:

- **NetSuite & Coupa (1.0x):** Baseline. Modern REST APIs and webhook support enable maximum automation rates.
- **Workday (1.1x):** Slightly higher integration complexity due to custom business object structures.
- **SAP ECC / S4HANA (1.3x):** Higher implementation cost and slightly lower initial automation rates due to BAPI/IDoc integration overhead and complex custom validation rules.`
      }
    ]
  },
  'conversational-erp-future': {
    title: 'The Future of ERP: Conversational Interfaces & Natural Language SQL',
    category: 'Research',
    author: 'Dr. Alex Kim',
    authorRole: 'CTO',
    authorBio: 'Leading the future of AI-driven finance automation.',
    publishDate: '2024-03-08',
    readTime: '20 min',
    excerpt: 'Deep dive into the next paradigm shift: moving from click-based ERP to conversational interfaces.',
    featured: true,
    keyClaims: [
      'Natural language queries reduce ERP support tickets by 74%',
    ],
    citations: [],
    entityAssociations: ['Conversational ERP', 'Natural Language SQL'],
    topicClusters: ['Innovation'],
    answerTargets: [],
    sections: [
      {
        id: 'the-interface-problem',
        title: 'The ERP Interface Problem',
        content: `Modern ERPs like SAP, Oracle, and NetSuite are incredibly powerful relational databases, but their user interfaces are famously hostile. Extracting a simple insight—like "Show me all invoices pending approval for the marketing department that are over 30 days old"—often requires navigating 5 different screens, applying 3 filters, and exporting to Excel for final pivoting.

The cognitive load on business users is massive, leading to high training costs and a heavy reliance on IT or FP&A teams to build custom reports.`
      },
      {
        id: 'nl-to-sql',
        title: 'Natural Language to SQL (NL2SQL)',
        content: `The paradigm is shifting from GUI-based navigation to Conversational ERP powered by Large Language Models (LLMs). The core technology enabling this is **NL2SQL** (Natural Language to SQL).

Instead of teaching users how to build a query, the LLM translates the user's natural language intent directly into a syntactically correct SQL or API query against the ERP database. 

**How it works in practice:**
1. **Intent Parsing:** The user types "What's our current AP aging for Q3?"
2. **Schema Mapping:** The LLM maps the terms "AP aging" and "Q3" to specific tables, columns, and date ranges in the target ERP schema.
3. **Query Generation:** A secure, read-only SQL query is generated and executed.
4. **Data Synthesis:** The raw data is returned to the LLM, which formats it into a chart, table, or conversational summary for the user.`
      },
      {
        id: 'security-governance',
        title: 'Security and Row-Level Permissions',
        content: `The biggest hurdle to Conversational ERP is security. If an LLM can query the entire database, how do you stop a junior clerk from asking for the CEO's salary?

The solution is not to restrict the LLM, but to enforce permissions at the database execution layer.
- The LLM generates the query on behalf of the authenticated user.
- The query is executed using the user's specific OAuth token or database role.
- The database enforces Row-Level Security (RLS), silently filtering out any records the user is not authorized to see.
- The LLM only ever receives and synthesizes the data the user was allowed to access.`
      }
    ]
  }
}

export function generateStaticParams() {
  return Object.keys(insightData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = insightData[slug]

  if (!data) {
    return { title: 'Insight Not Found' }
  }

  return {
    title: `${data.title} | Flowtaris AI Insights`,
    description: data.excerpt,
    openGraph: {
      title: `${data.title} | Flowtaris AI Insights`,
      description: data.excerpt,
      type: 'article',
      publishedTime: data.publishDate,
      authors: [data.author],
      tags: ['AI Automation', 'Finance', data.category],
    },
    other: {
      'article:published_time': data.publishDate,
      'article:author': data.author,
      'article:section': data.category,
      'article:tag': ['AI Automation', 'Finance', data.category, ...data.entityAssociations].join(','),
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.excerpt,
        author: {
          '@type': 'Person',
          name: data.author,
          jobTitle: data.authorRole,
        },
        datePublished: data.publishDate,
        dateModified: data.publishDate,
        about: data.entityAssociations,
        articleSection: data.category,
        keywords: data.tags?.join(', ') || ['AI Automation', 'Finance', data.category].join(', '),
        publisher: {
          '@type': 'Organization',
          name: 'Flowtaris',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://flowtaris.ai/insights/${slug}`,
        },
        citation: data.citations?.map((c: any) => ({
          '@type': 'CreativeWork',
          name: c.title,
          url: c.url,
          datePublished: c.date,
        })) || [],
      }),
    },
  }
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params
  const data = insightData[slug]

  if (!data) {
    notFound()
  }

  const formattedDate = new Date(data.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col flex-1 w-full bg-[#f6f4ff] text-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 border-b-4 border-black bg-white" aria-labelledby="article-header">
        <Container size="xl">
          <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-full border-2 border-black bg-[#f3e8ff] px-3 py-1 text-sm font-bold text-black uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                {data.category}
              </div>
              {data.featured && (
                <div className="inline-flex items-center rounded-full border-2 border-black bg-[#c084fc] px-3 py-1 text-sm font-bold text-white uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  Featured
                </div>
              )}
              <span className="flex items-center gap-2 text-sm font-bold text-black">
                <Calendar className="h-5 w-5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2 text-sm font-bold text-black">
                <Clock className="h-5 w-5" />
                {data.readTime}
              </span>
            </div>

            <h1 id="article-header" className="text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight">
              {data.title}
            </h1>

            <div className="flex items-center gap-4 bg-[#f3e8ff] border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] max-w-2xl">
              <div className="w-16 h-16 rounded-full border-2 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <Brain className="h-8 w-8 text-[#7e22ce]" />
              </div>
              <div>
                <p className="font-black text-xl text-black">{data.author}</p>
                <p className="text-lg font-bold text-black/70">{data.authorRole}</p>
              </div>
            </div>

            <p className="text-2xl font-bold text-black leading-relaxed border-l-8 border-[#7e22ce] pl-6 mt-4">
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
              <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black text-black mb-6 flex items-center gap-3 border-b-4 border-black pb-4">
                  <BookOpen className="h-6 w-6 text-[#7e22ce]" />
                  Table of Contents
                </h3>
                <nav>
                  <ul className="space-y-4 font-bold">
                    {data.sections.map((section: any) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`} className="text-black hover:text-[#7e22ce] transition-colors flex items-center gap-3">
                          <span className="text-[#c084fc] text-xl">→</span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="bg-[#f3e8ff] border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-black text-black mb-6">Share Report</h3>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center justify-center w-14 h-14 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#7e22ce] hover:text-white transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href="#" className="flex items-center justify-center w-14 h-14 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#7e22ce] hover:text-white transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href="#download-pdf" className="flex items-center justify-center px-6 h-14 bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#7e22ce] hover:text-white transition-colors font-bold text-lg gap-2">
                    <FileText className="h-6 w-6" /> PDF
                  </a>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-8">
              {data.sections.map((section: any) => (
                <article key={section.id} id={section.id} className="mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-black mb-8 pb-4 border-b-8 border-[#7e22ce] inline-block">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg prose-black max-w-none prose-headings:font-black prose-p:font-medium prose-p:text-xl prose-p:leading-relaxed prose-strong:font-black prose-strong:text-[#7e22ce] prose-ul:font-medium prose-ul:text-xl">
                    {section.content.split('\n\n').map((paragraph: string, i: number) => {
                      if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                        return (
                          <ul key={i} className="list-disc pl-6 mb-8 space-y-3">
                            {paragraph.split('\n').map((item, j) => (
                              <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^[-*]\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            ))}
                          </ul>
                        )
                      }
                      if (paragraph.startsWith('1. ')) {
                        return (
                          <ol key={i} className="list-decimal pl-6 mb-8 space-y-3 font-medium text-xl">
                            {paragraph.split('\n').map((item, j) => (
                              <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                            ))}
                          </ol>
                        )
                      }
                      return (
                        <p key={i} className="mb-8" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      )
                    })}
                  </div>
                </article>
              ))}

              {/* Related CTA */}
              <div className="mt-24 bg-[#7e22ce] border-4 border-black rounded-[40px] p-12 shadow-[16px_16px_0px_rgba(0,0,0,1)] text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Ready to Apply These Insights?
                </h2>
                <p className="text-2xl font-bold text-white/90 mb-10 max-w-2xl mx-auto">
                  Take our 3-minute diagnostic to get a personalized AI automation roadmap.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a href="/assessment" className="inline-flex items-center justify-center px-10 h-16 bg-white border-4 border-black rounded-full font-black text-xl text-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
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
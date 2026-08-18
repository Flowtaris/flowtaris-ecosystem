# Flowtaris Brand Ecosystem — Unified Master Plan
**Domains:** flowtaris.ai • flowtaris.net • flowtaris.co  
**Prepared:** 2026-08-10 | **Status:** Strategic Planning Phase  
**Client:** Flowtaris (via Pixenox Solutions) | **Engagement:** 3-domain digital transformation

---

## 1. ECOSYSTEM STRATEGY — THE "WHY"

### 1.1 Three Domains, One Brand Promise

| Domain | Role | Audience | Core Promise |
|--------|------|----------|--------------|
| **flowtaris.ai** | **Innovation Flagship** | Tech buyers, CTOs, AI/ML leaders, innovation heads | "See what's possible" — Live proof of AI capabilities, automation products, innovation initiatives |
| **flowtaris.net** | **Client Platform (Phased)** | Existing clients, procurement, operations, IT | "Your Flowtaris command center" — Resources, docs, support, service info, future authenticated portal |
| **flowtaris.co** | **Corporate Authority** | Investors, partners, board, media, institutional stakeholders | "The credible enterprise partner" — Corporate comms, thought leadership, governance, ESG, financial signals |

### 1.2 Unified Brand Narrative
> **"Software organized the work. Flowtaris automates it."** — This is the through-line across all three properties.

| Domain | Narrative Extension |
|--------|---------------------|
| .ai | "...with intelligence. From RPA to GenAI, we turn ERP data into autonomous workflows." |
| .net | "...for you. Your implementation, your timeline, your success metrics — all in one place." |
| .co | "...at scale. Governance, compliance, and continuity for the enterprise that can't afford downtime." |

### 1.3 Cross-Domain Value Flow
```
        ┌─────────────────────────────────────┐
        │         FLOWTARIS BRAND             │
        │   "The Science of Business Flow"    │
        └──────────────┬──────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
   ┌─────────┐     ┌─────────┐     ┌─────────┐
   │  .ai    │     │  .net   │     │  .co    │
   │INNOVATE │     │ ENGAGE  │     │ AUTHORI-│
   │         │     │         │     │   TY    │
   └────┬────┘     └────┬────┘     └────┬────┘
        │               │               │
        └───────────────┼───────────────┘
                        ▼
              ┌─────────────────┐
              │  TRUST → PIPELINE│
              │  REVENUE GROWTH  │
              └─────────────────┘
```

---

## 2. DOMAIN ARCHITECTURE — TECHNICAL UNITY

### 2.1 Recommended Architecture: Monorepo with Domain Workspaces

```
flowtaris-ecosystem/
├── apps/
│   ├── flowtaris-ai/      # Next.js 14 (App Router) - Cinematic, AI showcase
│   ├── flowtaris-net/     # Next.js 14 - Client platform (Phased)
│   └── flowtaris-co/      # Next.js 14 - Corporate site
├── packages/
│   ├── ui/                # Shared design system (Tailwind + custom components)
│   ├── cms-client/        # Unified Sanity/Contentful client
│   ├── seo/               # Shared SEO/GEO/AEO/AIO utilities
│   ├── analytics/         # Unified tracking (GA4 + custom events)
│   └── eslint-config/     # Shared linting
├── turbo.json             # Turborepo config
└── package.json
```

**Why this works:**
- Single deploy pipeline (Vercel monorepo support)
- Shared design system = consistent brand, faster dev
- Independent deployments per domain
- Type-safe cross-package imports
- Client team owns one repo, three deployments

### 2.2 Shared Design System (Package: `@flowtaris/ui`)

| Layer | Contents | Shared Across |
|-------|----------|---------------|
| **Tokens** | Colors, spacing, typography, motion, shadows, z-index | All 3 domains |
| **Primitives** | Button, Card, Input, Modal, Tooltip, Accordion, Table | All 3 domains |
| **Patterns** | Hero, Section, Grid, Stack, Container, ScrollReveal | All 3 domains |
| **Epic Components** | ParallaxLayers, SplitText, ScrollTimeline, FloatingProduct, ClipPathReveal | .ai (primary), .co (selective) |
| **DataViz** | StatTile, BarChart, LineChart, BeforeAfter, ROICalculator | .ai (case studies), .net (dashboards) |
| **Layout** | Header, Footer, Nav, Breadcrumbs, Sidebar | All 3 (configured per domain) |

### 2.3 Domain-Specific Configuration

```typescript
// apps/flowtaris-ai/config/domain.ts
export const domainConfig = {
  domain: 'flowtaris.ai',
  name: 'Flowtaris AI',
  tagline: 'Intelligence that automates the enterprise',
  theme: 'innovation', // affects color accents, motion intensity
  epicEnabled: true,    // full cinematic effects
  dataVizDensity: 'high',
  cmsTypes: ['caseStudy', 'aiCapability', 'innovationPost', 'roiCalculator'],
  navigation: ['Capabilities', 'Case Studies', 'Innovation Lab', 'ROI Calculator', 'Contact'],
  schemaOrg: ['SoftwareApplication', 'Service', 'Organization', 'FAQPage'],
};

// apps/flowtaris-net/config/domain.ts
export const domainConfig = {
  domain: 'flowtaris.net',
  name: 'Flowtaris Client Platform',
  tagline: 'Your implementation, transparent',
  theme: 'client',
  epicEnabled: false,   // reduced motion, functional focus
  dataVizDensity: 'medium',
  cmsTypes: ['resource', 'documentation', 'serviceInfo', 'contactForm', 'ticketStatus'],
  navigation: ['Resources', 'Documentation', 'Services', 'Support', 'My Account'],
  schemaOrg: ['WebSite', 'Service', 'FAQPage', 'HowTo'],
};

// apps/flowtaris-co/config/domain.ts
export const domainConfig = {
  domain: 'flowtaris.co',
  name: 'Flowtaris Corporate',
  tagline: 'Enterprise governance. Proven delivery.',
  theme: 'corporate',
  epicEnabled: 'selective', // premium feel, restrained motion
  dataVizDensity: 'low',
  cmsTypes: ['leadership', 'pressRelease', 'esgReport', 'governanceDoc', 'career'],
  navigation: ['About', 'Leadership', 'Insights', 'Governance', 'Careers', 'Contact'],
  schemaOrg: ['Corporation', 'NewsArticle', 'Person', 'JobPosting', 'EducationalOrganization'],
};
```

---

## 3. CONTENT MODEL — UNIFIED CMS STRATEGY

### 3.1 Recommended CMS: **Sanity.io** (Single Studio, Three Frontends)

**Why Sanity:**
- Real-time collaboration for client's content team
- Customizable studio per domain (desk structure)
- GROQ queries = type-safe, performant
- Vercel integration native
- Scales to authenticated portal later (.net Phase 2+)

### 3.2 Shared Content Types (Cross-Domain)

```typescript
// Shared - used by all three
interface BaseContent {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  seo: SEOFields;
  publishedAt: string;
  domains: ('ai' | 'net' | 'co')[]; // which domain(s) display this
}

interface SEOFields {
  metaTitle: string;
  metaDescription: string;
  ogImage: SanityImage;
  ogType: 'website' | 'article';
  twitterCard: 'summary_large_image';
  structuredData: StructuredData[];
  geoSignals: GEOSignals;  // NEW: GEO/AEO/AIO fields
}

interface GEOSignals {
  // Generative Engine Optimization
  keyClaims: string[];           // Factual claims for AI citation
  citations: Citation[];         // Sources backing claims
  faqItems: FAQItem[];           // Q&A for answer engines
  entityAssociations: string[];  // Entities: NetSuite, Coupa, SAP, etc.
  topicClusters: string[];       // Topics: "ERP automation", "AI in procurement"
  answerTargets: AnswerTarget[]; // Direct answers for featured snippets
}

// Domain-specific extensions
interface AICapability extends BaseContent {
  _type: 'aiCapability';
  category: 'genai' | 'ml' | 'rpa' | 'document-processing' | 'workflow-orchestration';
  platform: ('NetSuite' | 'Coupa' | 'SAP' | 'Workday' | 'Salesforce')[];
  maturity: 'production' | 'pilot' | 'research';
  metrics: Metric[];           // Before/after, ROI, accuracy
  technicalDetails: string;    // For technical buyers
  demoVideo?: SanityFile;
}

interface CaseStudy extends BaseContent {
  _type: 'caseStudy';
  client: ClientReference;     // Anonymous or named
  industry: string;
  platforms: string[];
  challenge: string;
  solution: string;
  results: ResultMetric[];     // Quantified outcomes
  timeline: string;
  testimonial?: Testimonial;
  domains: ('ai' | 'net' | 'co')[]; // Likely all three
}
```

### 3.3 Content Governance

| Role | .ai Access | .net Access | .co Access |
|------|------------|-------------|------------|
| **Marketing Lead** | Full | Full | Full |
| **AI Practice Lead** | Full | Read | Read |
| **Client Success** | Read | Full | Read |
| **Corporate Comms** | Read | Read | Full |
| **Leadership** | Approve | Approve | Approve |

---

## 4. SEO / GEO / AEO / AIO — UNIFIED STRATEGY

### 4.1 Keyword Architecture (Three-Tier)

| Tier | .ai Keywords | .net Keywords | .co Keywords |
|------|--------------|---------------|--------------|
| **Core** | enterprise AI consulting, NetSuite AI automation, Coupa AI integration, ERP AI transformation | NetSuite implementation partner, Coupa consulting services, ERP managed support, enterprise integration platform | Flowtaris company, ERP consulting firm, enterprise software partners |
| **Long-tail** | GenAI for procure-to-pay, document processing AI NetSuite, AI workflow automation Coupa, ml demand forecasting ERP | NetSuite SuiteScript development, Coupa BSM implementation, Workday NetSuite integration, Celigo vs Workato | Flowtaris leadership team, Flowtaris Hyderabad, ERP consulting careers India |
| **Geo/AEO** | "How does AI automate NetSuite?", "What is Coupa AI integration?", "ERP automation ROI", "best AI for procurement" | "NetSuite implementation timeline", "Coupa certification partners", "ERP migration zero downtime", "managed NetSuite support" | "Flowtaris company profile", "Flowtaris case studies", "enterprise ERP consulting partners" |

### 4.2 GEO (Generative Engine Optimization) — Technical Implementation

**Every page must include these AI-readable signals:**

```json
// Embedded in page <head> as application/ld+json + HTML meta
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Flowtaris",
      "url": "https://flowtaris.ai",
      "logo": "https://flowtaris.ai/logo.svg",
      "sameAs": [
        "https://flowtaris.net",
        "https://flowtaris.co",
        "https://linkedin.com/company/flowtaris"
      ],
      "knowAbout": [
        "NetSuite", "Coupa", "SAP", "Workday", "Enterprise AI",
        "Business Process Automation", "ERP Integration"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "Oracle NetSuite Solution Provider",
        "recognizedBy": "Oracle"
      }
    },
    {
      "@type": "Service",
      "serviceType": "Enterprise AI Consulting",
      "provider": {"@id": "#organization"},
      "areaServed": "Worldwide",
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://flowtaris.ai/contact"
      },
      "knowsAbout": ["Generative AI", "Machine Learning", "RPA", "Document Processing"]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question", "name": "How does Flowtaris use AI to automate NetSuite?", "acceptedAnswer": {"@type": "Answer", "text": "..."}},
        {"@type": "Question", "name": "What ROI can I expect from Coupa AI integration?", "acceptedAnswer": {"@type": "Answer", "text": "..."}}
      ]
    }
  ]
}
```

### 4.3 AEO (Answer Engine Optimization) — Content Patterns

**Every capability/case study page must answer:**
1. **What** — One-sentence definition (for snippets)
2. **How** — 3-step process (for "how to" queries)
3. **Proof** — Quantified metric (for credibility)
4. **Who** — Client type/industry (for relevance)
5. **Next** — Clear CTA (for conversion)

```markdown
## AI-Powered Invoice Processing for NetSuite

**What:** Autonomous 3-way matching using computer vision + LLMs, reducing manual review from 4 days to 3 minutes.

**How it works:**
1. **Ingest** — Emails, PDFs, EDI flow into NetSuite via Celigo/Make
2. **Extract** — Vision transformer reads line items, validates against POs
3. **Reconcile** — Confidence-scored matches auto-post; exceptions route to queue

**Proof:** SaaS Decacorn client — 4 days → 3 minutes, $4.5M revenue leakage recovered, 0 manual touchpoints.

**Who it's for:** Finance teams processing 500+ invoices/month in NetSuite OneWorld.

**Next:** [Calculate your ROI →] [See technical architecture →]
```

### 4.4 AIO (AI Optimization) — Knowledge Graph & Entity Strategy

| Action | Implementation | Domains |
|--------|----------------|---------|
| **Entity Home Pages** | Dedicated pages for NetSuite, Coupa, SAP, Workday with `sameAs` to Wikidata | All |
| **Author Profiles** | Leadership pages with `Person` schema, `worksFor`, `knowsAbout` | .co (primary), .ai (practice leads) |
| **Case Study Graph** | Each case = `CaseStudy` schema linking `Organization` (client), `Product` (platforms), `Service` (capability) | All |
| **Topic Clusters** | Pillar pages: "ERP AI Transformation", "Procurement Automation", "HCM Integration" with cluster content | .ai (deep), .co (executive) |
| **Claim Verification** | Every metric backed by `citation` property linking to client-approved source | All |

### 4.5 Technical SEO Foundation (All Domains)

| Requirement | Implementation |
|-------------|----------------|
| **Core Web Vitals** | LCP < 2.5s, INP < 200ms, CLS < 0.1 — enforced in CI |
| **Crawl Budget** | Dynamic sitemap generation per domain, `lastmod` from CMS |
| **Index Control** | `noindex` on auth pages, thank-you pages, staging |
| **International** | hreflang for future US/UK/EU subdirectories |
| **Security** | CSP, HSTS, COOP/COEP headers via Next.js middleware |
| **Structured Data** | Automated validation in build pipeline (Schema.org validator) |

---

## 5. EPIC DESIGN — CINEMATIC EXPERIENCE (.ai PRIMARY)

### 5.1 Depth System Application (Per Domain)

| Depth | .ai (Full Epic) | .net (Functional) | .co (Selective Premium) |
|-------|-----------------|-------------------|-------------------------|
| **0** | Animated gradient mesh, particle field | Subtle brand gradient | Slow ambient gradient |
| **1** | Glow blobs orbiting hero | None | Subtle vignette |
| **2** | Floating platform icons (NetSuite, Coupa, SAP) | Card hover lift | Leadership photo parallax |
| **3** | **Hero product** — AI automation canvas | Dashboard screenshot | Hero stat tiles |
| **4** | Headlines (split converge), CTAs | All content | All content |
| **5** | Cursor-following particles, sparkle trail | Tooltip layer | Minimal |

### 5.2 .ai — Signature Sections (Epic Techniques)

| Section | Technique | Purpose |
|---------|-----------|---------|
| **Hero** | 6-layer parallax + Split Converge text + Floating Product (AI Canvas) | Immediate "this is different" signal |
| **Capabilities** | Cascading Card Stack + Clip-Path Birth Reveal | Each capability "born" on scroll |
| **Case Studies** | Inter-Section Floating Product (metric cards persist) + DJI Scale-In Pin | Metrics travel with user |
| **Innovation Lab** | Window Pane Iris + Scrub Timeline | "Peek into future" interaction |
| **ROI Calculator** | Real-time data viz + Variable Font Wave on result | Live computation feel |
| **CTA Band** | Curtain Panel Roll-Up + Bleed Typography | Dramatic close |

### 5.3 Motion Budget (Performance Guardrails)

```typescript
// packages/ui/src/motion/budget.ts
export const motionBudget = {
  // Maximum simultaneous animated elements
  maxConcurrentAnimations: 12,
  // GPU layer limit
  maxWillChangeElements: 8,
  // Reduced motion thresholds
  prefersReducedMotion: {
    disableParallax: true,
    disableFloatLoop: true,
    disableScrubTimeline: true,
    simplifyTo: 'fade-only',
  },
  // Mobile (pointer: coarse)
  mobile: {
    reduceParallaxDepth: 0.5,
    disableFloatLoop: true,
    disableParticleSystems: true,
    useIntersectionObserver: true,
  },
};
```

---

## 6. DATA VISUALIZATION — EXECUTIVE-READY CHARTS

### 6.1 Chart Inventory by Domain

| Chart Type | .ai Use Case | .net Use Case | .co Use Case |
|------------|--------------|---------------|--------------|
| **Stat Tile** | Hero metrics (4 days → 3 mins) | SLA uptime, ticket resolution | Revenue, headcount, clients |
| **Before/After Bar** | Process time, cost, accuracy | Migration timeline | Year-over-year growth |
| **ROI Calculator** | Interactive: inputs → projection | Client-specific calc | Investor projection |
| **Platform Matrix** | Capability × Platform heatmap | Integration status | Partner ecosystem |
| **Timeline** | Innovation roadmap | Implementation phases | Company milestones |
| **Sankey** | Data flow: ERP → AI → Outcome | Ticket flow | N/A |

### 6.2 Visual Language (Consistent Across Domains)

```css
/* packages/ui/src/dataviz/tokens.css */
:root {
  /* Categorical - Fixed order, never cycled */
  --viz-cat-1: #0066CC;  /* Flowtaris Primary Blue */
  --viz-cat-2: #00A36C;  /* Success Green */
  --viz-cat-3: #FF8C00;  /* Warning Amber */
  --viz-cat-4: #D93D3D;  /* Critical Red */
  --viz-cat-5: #6B4EFF;  /* Innovation Purple */
  --viz-cat-6: #00C9B1;  /* Teal Accent */

  /* Sequential (Magnitude) - Single hue, light→dark */
  --viz-seq-blue-100: #E8F2FF;
  --viz-seq-blue-300: #99C2FF;
  --viz-seq-blue-500: #0066CC;
  --viz-seq-blue-700: #004499;
  --viz-seq-blue-900: #002266;

  /* Diverging (Polarity) - Two hues + neutral midpoint */
  --viz-div-neg: #D93D3D;
  --viz-div-mid: #F5F5F5;
  --viz-div-pos: #00A36C;

  /* Status - Reserved, never reused for series */
  --viz-status-good: #00A36C;
  --viz-status-warn: #FF8C00;
  --viz-status-serious: #E67E22;
  --viz-status-critical: #D93D3D;

  /* Surfaces */
  --viz-surface-light: #FFFFFF;
  --viz-surface-dark: #0A0F1A;
  --viz-grid-light: #E8ECF1;
  --viz-grid-dark: #1E2A3A;
}
```

### 6.3 Case Study Metric Visualization (The Crown Jewels)

```typescript
// Hero stat tiles for .ai — each case study gets this treatment
const caseStudyMetrics = [
  {
    client: 'SaaS Decacorn',
    integration: 'Salesforce CPQ + NetSuite (Celigo)',
    metrics: [
      { label: 'Processing Time', before: '4 days', after: '3 mins', improvement: '99.5%', type: 'time' },
      { label: 'Revenue Recovered', value: '$4.5M', type: 'currency' },
      { label: 'Manual Touchpoints', before: '100%', after: '0%', improvement: '100%', type: 'percentage' },
    ],
    vizType: 'beforeAfterTile', // Custom: large numbers, animated counter
  },
  {
    client: 'Global Investment Bank',
    integration: 'Workday → Active Directory (Boomi/Okta)',
    metrics: [
      { label: 'Termination Revocation', value: '< 30 sec', type: 'time' },
      { label: 'Audit Findings', value: '0', type: 'count' },
    ],
    vizType: 'statTile',
  },
  // ... etc
];
```

---

## 7. DEVELOPMENT PHASING — PRAGMATIC ROADMAP

### 7.1 Phase 0: Foundation (Weeks 1-2)
| Task | Owner | Deliverable |
|------|-------|-------------|
| Monorepo setup (Turborepo + Next.js 14) | Dev Lead | Running `turbo dev` with 3 apps |
| Shared UI package (`@flowtaris/ui`) | Frontend | Storybook with primitives |
| Sanity Studio schema + desk structure | CMS Lead | Content model deployed |
| Design tokens (colors, spacing, motion) | Design | Figma → code sync |
| CI/CD pipeline (Vercel + GitHub Actions) | DevOps | Preview + prod per domain |

### 7.2 Phase 1: .ai MVP — Innovation Flagship (Weeks 3-6)
| Sprint | Focus | Key Deliverables |
|--------|-------|------------------|
| 1 | Hero + Capabilities | Cinematic hero, 6 capabilities cards, scroll animations |
| 2 | Case Studies + Metrics | 3 case studies with animated data viz, ROI calculator v1 |
| 3 | Innovation Lab + CTA | Future capabilities preview, contact form, GEO schema |
| 4 | Polish + Performance | Lighthouse > 90, reduced motion, cross-browser, launch |

**Phase 1 Scope:** 8-10 pages, full epic design, Sanity-connected, Vercel-deployed

### 7.3 Phase 2: .net Phase 1 — Client Platform (Weeks 7-10)
| Sprint | Focus | Key Deliverables |
|--------|-------|------------------|
| 1 | Resources + Documentation | Searchable resource center, versioned docs, download tracking |
| 2 | Services + Contact | Service detail pages, structured enquiry forms, routing |
| 3 | Client Portal Foundation | Auth scaffolding (NextAuth), dashboard layout, API routes |
| 4 | Launch + Feedback | Client beta, analytics, iteration |

### 7.4 Phase 3: .co — Corporate Platform (Weeks 11-14)
| Sprint | Focus | Key Deliverables |
|--------|-------|------------------|
| 1 | Leadership + About | Executive profiles, governance pages, ESG |
| 2 | Insights + Careers | Thought leadership blog, job listings, application flow |
| 3 | Press + Investor | Newsroom, financial signals, contact routing |
| 4 | Launch | Unified analytics, cross-domain tracking |

### 7.5 Phase 4: Unified Optimization (Weeks 15-16)
- Cross-domain journey analysis
- GEO/AEO performance audit
- Conversion rate optimization
- Client handoff + training

---

## 8. ANALYTICS & MEASUREMENT — UNIFIED TRACKING

### 8.1 Event Taxonomy (Shared)

```typescript
// packages/analytics/src/events.ts
export const events = {
  // Engagement
  'hero_cta_click': { domain: 'all', params: ['cta_label', 'section'] },
  'case_study_view': { domain: 'all', params: ['client_slug', 'metric_viewed'] },
  'roi_calculator_submit': { domain: 'ai', params: ['inputs', 'projected_roi'] },
  'resource_download': { domain: 'net', params: ['resource_type', 'resource_id'] },
  'contact_form_submit': { domain: 'all', params: ['form_type', 'domain'] },
  
  // Conversion
  'demo_request': { domain: 'ai', params: ['capability_interest'] },
  'support_ticket_create': { domain: 'net', params: ['category', 'priority'] },
  'career_apply': { domain: 'co', params: ['role_id', 'source'] },
  
  // GEO/AEO Signals
  'faq_expand': { domain: 'all', params: ['question_id', 'answer_viewed'] },
  'schema_impression': { domain: 'all', params: ['schema_type', 'page'] },
};
```

### 8.2 Success Metrics by Domain

| Domain | Primary KPI | Secondary KPIs | GEO/AEO KPIs |
|--------|-------------|----------------|--------------|
| **.ai** | Demo requests / month | Time on case studies, ROI calc completions | AI citation appearances, featured snippet capture |
| **.net** | Resource downloads, ticket deflection | Return visitor rate, doc search success | "How to" query rankings, support FAQ clicks |
| **.co** | Press mentions, investor inquiries | Leadership page views, career applications | Brand entity recognition, knowledge panel presence |

---

## 9. BUDGET & RESOURCE ALLOCATION

### 9.1 Estimated Investment (INR)

| Phase | Effort | Budget Range | Notes |
|-------|--------|--------------|-------|
| **Phase 0: Foundation** | 2 weeks × 3 devs | ₹8-12L | Reusable across all domains |
| **Phase 1: .ai MVP** | 4 weeks × 4 devs | ₹18-25L | Highest design/dev complexity |
| **Phase 2: .net Phase 1** | 4 weeks × 3 devs | ₹12-16L | Functional focus, less epic |
| **Phase 3: .co** | 4 weeks × 3 devs | ₹10-14L | Content-heavy, selective epic |
| **Phase 4: Optimization** | 2 weeks × 2 devs | ₹4-6L | Analytics, CRO, handoff |
| **Total** | **16 weeks** | **₹52-73L** | Includes design, dev, CMS, deploy |

**Ongoing (Monthly):**
- Vercel Pro (3 projects): ~₹15K/mo
- Sanity Growth: ~₹25K/mo
- Analytics/Monitoring: ~₹10K/mo
- **Total: ~₹50K/mo**

---

## 10. RISK MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Epic design performance on mobile** | High | High | Mobile-first budgets, `pointer: coarse` detection, progressive enhancement |
| **Client CMS adoption** | Medium | High | Sanity Studio customization, training sessions, documented workflows |
| **GEO/AEO measurement ambiguity** | Medium | Medium | Proxy metrics (search console, AI citation tracking tools), quarterly audits |
| **Scope creep across 3 domains** | High | High | Fixed-phase contracts, change request process, shared component library reduces rework |
| **Vercel function limits (ISR/Edge)** | Low | Medium | Monitor usage, optimize bundle, consider Cloudflare Workers for edge logic |
| **Brand consistency drift** | Medium | Medium | Design system governance, Figma-library-as-source, PR design review gate |

---

## 11. IMMEDIATE NEXT STEPS

### Week 1 Actions (You + Team)
1. **Confirm stack decision** — Next.js 14 + Sanity + Vercel (or alternatives)
2. **Audit existing assets** — Brand guidelines, logos, photography, diagrams
3. **Set up monorepo** — Initialize Turborepo, 3 Next.js apps, shared packages
4. **Configure Sanity Studio** — Deploy schema, configure desk per domain
5. **Design system kickoff** — Token extraction from flowtaris.com, epic component spec

### Decisions Needed This Week
- [ ] **Tech stack confirmation** (Next.js vs Astro vs Remix)
- [ ] **CMS confirmation** (Sanity vs Contentful vs Strapi)
- [ ] **Asset inventory** — What exists vs what needs creation
- [ ] **Phase 1 scope lock** — Which .ai sections are must-have vs nice-to-have
- [ ] **Team assignments** — Who owns design, frontend, CMS, DevOps

---

## 12. APPENDIX: FLOWTARIS.AI SECTION BLUEPRINT

### 12.1 Page Map (Phase 1 MVP)

```
/                                    → Hero + Capabilities preview
/capabilities                        → All 6 capabilities (cinematic cards)
/capabilities/[slug]                 → Deep dive: tech, metrics, demo
/case-studies                        → Grid with metric highlights
/case-studies/[slug]                 → Full study + interactive metrics
/innovation-lab                      → Future capabilities (iris window)
/roi-calculator                      → Interactive calculator + results
/about                               → Practice leads, methodology, partners
/contact                             → Multi-type form (demo, partner, career)
/insights                            → Blog/technical articles (SEO/GEO)
/platforms/netsuite                  → Entity page (GEO/AIO)
/platforms/coupa                     → Entity page
/platforms/sap                       → Entity page
/platforms/workday                   → Entity page
```

### 12.2 Capability Categories (For .ai)

1. **GenAI Document Intelligence** — Invoice/PO/contract extraction, classification
2. **Predictive ERP Analytics** — Cash flow forecasting, demand planning, anomaly detection
3. **Autonomous Workflow Orchestration** — Make/Workato/Celigo + AI decision nodes
4. **Conversational ERP Interfaces** — Slack/Teams bots for NetSuite/Coupa actions
5. **Intelligent Integration Monitoring** — Self-healing integrations, drift detection
6. **AI Governance & Compliance** — Audit trails, bias monitoring, explainability

---

*End of Master Plan — Ready for team review and scope confirmation*
# FLOWTARIS.AI — PROJECT HANDOFF DOCUMENT
**Single Source of Truth | Resume Any Session Instantly | Zero Context Loss**

---

## 🎯 PROJECT IDENTITY

| Field | Value |
|-------|-------|
| **Project** | flowtaris.ai — AI & Innovation Platform for Flowtaris |
| **Client** | Flowtaris (via Pixenox Solutions) |
| **Domain** | flowtaris.ai (new) — complements flowtaris.com (live) |
| **Role** | Innovation Flagship: Showcases AI/automation capabilities for enterprise ERP buyers |
| **Stack** | Next.js 14 (App Router) + TypeScript + Tailwind + GSAP/Framer Motion + Recharts |
| **CMS** | Sanity.io (Free Tier) — visual editor, GROQ, real-time preview |
| **Backend/DB/Auth** | Supabase (Free Tier) — PostgreSQL, Auth, Realtime, Edge Functions |
| **Email** | Resend (Free Tier) — 3K emails/mo |
| **Hosting** | Vercel (Hobby → Pro at Month 4) — ISR, Edge, custom domains |
| **CI/CD** | GitHub Actions (Free) → Vercel preview/prod |
| **Repo** | `flowtaris-ecosystem` (private, Turborepo monorepo) |
| **Location** | `D:\flowtarisai\flowtaris-ecosystem` |

---

## 🧠 STRATEGIC CONTEXT (Why This Exists)

**flowtaris.com (LIVE)** = "Who we are & what we do" — services, industries, team, contact
**flowtaris.ai (NEW)** = "What we've built & where we're going" — capabilities, proof, innovation, tools

**Together:** Complete digital funnel — Awareness (.com) → Proof (.ai) → Conversation → Client Portal (.net) → Partnership

**Target Buyer:** CTOs, VPs Engineering, Heads of Innovation at companies running NetSuite, Coupa, SAP, Workday
**Differentiation:** Not a brochure. Interactive proof-of-capability. Cinematic experience. Self-serve diagnostic tools. GEO/AEO/AIO engineered.

---

## 🎪 WHAT WE'RE BUILDING — 12 PAGES + 3 TOOLS

### Pages (Priority Order)
1. **Home (/)** — Cinematic hero (6-layer parallax), 3 capability previews, trust signals
2. **Capabilities (/capabilities)** — All 6 in cascading card stack with clip-path birth
3. **Capability Detail (/capabilities/[slug])** — Deep dive: tech, metrics, demo video
4. **Case Studies (/case-studies)** — Filterable grid with animated metric highlights
5. **Case Study Detail (/case-studies/[slug])** — Full story + living before/after metrics (DJI pin, inter-section float)
6. **Innovation Lab (/innovation-lab)** — Iris window reveal of pilot capabilities + maturity timeline
7. **ROI Calculator (/roi-calculator)** — Live sliders → animated projection → lead capture
8. **Assessment (/assessment)** — **NEW: 3-min diagnostic → personalized roadmap (Quick/Strategic/Innovation)**
9. **Cost of Inaction (/cost-of-inaction)** — **NEW: Revenue leakage + compliance risk + competitive gap**
10. **About (/about)** — Practice leads, methodology, partners
11. **Insights (/insights)** — GEO-optimized technical articles
12. **Platform Pages (/platforms/netsuite\|coupa\|sap\|workday)** — Entity pages for AI search dominance
13. **Contact (/contact)** — Multi-type form (demo, partner, career)

### The 3-Tool Funnel (Core Lead Engine)
| Tool | Stage | Input | Output | Lead Value |
|------|-------|-------|--------|------------|
| **Assessment** | Discovery | 6 questions (ERP, pains, volume, state, maturity, urgency) | Personalized roadmap: Quick Win (0-3mo) / Strategic (3-9mo) / Innovation (9-18mo) | Top-funnel: Context-rich lead with ERP, volume, quick-win identified |
| **ROI Calculator** | Evaluation | Volume, platform, use case (pre-filled from assessment) | $ savings, payback, FTE freed + live data viz | Mid-funnel: Business case ready for proposal |
| **Cost of Inaction** | Urgency | Same inputs | Monthly leakage, annual risk, competitive gap | Bottom-funnel: Urgency signal → direct to demo |

**Conversion Path:** Assessment → Roadmap → "See Numbers" → ROI Calculator (pre-filled) → "What If I Wait?" → Cost of Inaction → Demo Request

---

## 🏗️ ARCHITECTURE — TURBOREPO MONOREPO

```
flowtaris-ecosystem/
├── apps/
│   └── flowtaris-ai/                    # Next.js 14 - ONLY APP FOR NOW
├── packages/
│   ├── ui/                              # Shared design system
│   │   ├── tokens/                      # Colors, spacing, typography, motion, shadows
│   │   ├── primitives/                  # Button, Card, Input, Modal, Tooltip, Accordion, Table, Badge, Avatar
│   │   ├── patterns/                    # Hero, Section, Grid, Stack, Container, ScrollReveal, StickySidebar
│   │   ├── epic/                        # ParallaxLayers, SplitText, ScrollTimeline, FloatingProduct, ClipPathReveal, IrisWindow
│   │   ├── dataviz/                     # StatTile, BeforeAfterBar, ROICalculator, PlatformMatrix, Timeline
│   │   └── layout/                      # Header, Footer, Nav, Breadcrumbs, CookieBanner
│   ├── cms-client/                      # Sanity client + GROQ queries + typegen
│   ├── supabase-client/                 # Supabase client + types + helpers
│   ├── seo/                             # Schema.org generators, meta tags, sitemap
│   ├── analytics/                       # GA4 events, custom event taxonomy
│   ├── assessment-engine/               # Rule-based recommendation engine (shared logic)
│   ├── roi-engine/                      # ROI calculation logic (shared)
│   ├── inaction-engine/                 # Cost of inaction logic (shared)
│   └── eslint-config/                   # Shared linting
├── turbo.json
├── package.json
└── tsconfig.json
```

---

## 🎨 DESIGN SYSTEM — EPIC DESIGN SPEC

### Depth System (Non-Negotiable)
| Depth | Role | Parallax | Blur | Scale | .ai Usage |
|-------|------|----------|------|-------|-----------|
| 0 | Far background | 0.10x | 8px | 0.70 | Animated gradient mesh, particle field |
| 1 | Glow/atmosphere | 0.25x | 4px | 0.85 | Orbital glow blobs |
| 2 | Mid decorations | 0.50x | 0px | 1.00 | Floating platform icons (NetSuite, Coupa, SAP, Workday) |
| 3 | **Hero product** | 0.80x | 0px | 1.05 | **AI Automation Canvas** (floats with elastic physics) |
| 4 | UI / Text | 1.00x | 0px | 1.00 | Headlines (split converge), CTAs, all content |
| 5 | Foreground FX | 1.20x | 0px | 1.10 | Cursor-following particles, sparkle trail |

### Signature Components (Build Once, Use Everywhere)
| Component | Technique | Pages Using |
|-----------|-----------|-------------|
| **ParallaxLayers** | 6-layer depth with GSAP ScrollTrigger | Home, Capabilities, Case Studies |
| **SplitText** | Split converge / word-by-word lighting | Home hero, Capability headers, CTA band |
| **ScrollTimeline** | Scrub-linked animations | Case study metrics, Innovation Lab |
| **FloatingProduct** | Elastic float loop (6-14s) + scatter on exit | Home hero (AI Canvas), Case study metric cards |
| **ClipPathReveal** | Top-down birth (inset 0 0 100% 0 → 0) | Capability cards, Case study entries |
| **IrisWindow** | Circular clip-path expand on hover/scroll | Innovation Lab |
| **CascadingCardStack** | Perspective stack + elastic expand on hover | Capabilities page |

### Data Viz Palette (CVD-Safe, Validated)
```css
:root {
  --viz-cat-1: #0066CC;  /* Primary Blue */
  --viz-cat-2: #00A36C;  /* Success Green */
  --viz-cat-3: #FF8C00;  /* Warning Amber */
  --viz-cat-4: #D93D3D;  /* Critical Red */
  --viz-cat-5: #6B4EFF;  /* Innovation Purple */
  --viz-cat-6: #00C9B1;  /* Teal Accent */
  --viz-seq-blue: #0066CC;  /* Sequential base */
  --viz-div-neg: #D93D3D;   /* Diverging negative */
  --viz-div-mid: #F5F5F5;   /* Diverging midpoint */
  --viz-div-pos: #00A36C;   /* Diverging positive */
  --viz-status-good: #00A36C;
  --viz-status-warn: #FF8C00;
  --viz-status-critical: #D93D3D;
}
```

---

## 📊 SANITY CONTENT MODEL (7 Document Types)

```typescript
// 1. AI Capability (6 docs)
aiCapability: {
  title, category: 'genai'|'ml'|'rpa'|'doc-processing'|'workflow'|'governance',
  platforms: ('NetSuite'|'Coupa'|'SAP'|'Workday'|'Salesforce')[],
  maturity: 'production'|'pilot'|'research',
  metrics: Metric[], technicalDetails, demoVideo, seo, geoSignals
}

// 2. Case Study (8 docs)
caseStudy: {
  client, industry, platforms[], challenge, solution,
  results: ResultMetric[], timeline, testimonial, seo, geoSignals
}

// 3. Assessment Config (1 doc - DRIVES THE WIZARD)
assessmentConfig: {
  questions: Question[],
  recommendationRules: Rule[],
  capabilityMapping: Map<string, CapabilityRef>
}

// 4. ROI Config (1 doc - DRIVES CALCULATOR)
roiConfig: {
  assumptions, formulas, benchmarks, platformMultipliers
}

// 5. Insight/Article (6-10 docs)
insight: { title, author, richText, topicClusters[], faqItems[], citations[], seo, geoSignals }

// 6. Platform Page (4 docs - NetSuite, Coupa, SAP, Workday)
platformPage: { platform, overview, capabilities[], integrations[], certifications, faq[], seo, geoSignals }

// 7. Site Config (1 doc)
siteConfig: { navigation, footer, socialLinks, schemaOrg, defaults }
```

### GEO Signals (Every Document)
```typescript
geoSignals: {
  keyClaims: string[],           // Factual claims for AI citation
  citations: Citation[],         // Sources backing claims
  faqItems: FAQItem[],           // Q&A for answer engines
  entityAssociations: string[],  // NetSuite, Coupa, SAP, Workday, etc.
  topicClusters: string[],       // "ERP automation", "AI in procurement"
  answerTargets: AnswerTarget[]  // Direct answers for featured snippets
}
```

---

## 🗄️ SUPABASE SCHEMA (3 Tables)

```sql
-- Assessment leads with full context
CREATE TABLE assessment_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answers JSONB NOT NULL,
  recommendations TEXT[] NOT NULL,
  lead_score INT NOT NULL,
  routed_to TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROI calculations (linkable to assessment)
CREATE TABLE roi_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inputs JSONB NOT NULL,
  outputs JSONB NOT NULL,
  email VARCHAR(255),
  assessment_id UUID REFERENCES assessment_leads(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cost of inaction (linkable to ROI)
CREATE TABLE inaction_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inputs JSONB NOT NULL,
  outputs JSONB NOT NULL,
  email VARCHAR(255),
  roi_calc_id UUID REFERENCES roi_calculations(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public insert, authenticated read
ALTER TABLE assessment_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inaction_calculations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_insert" ON assessment_leads FOR INSERT TO anon WITH CHECK (true);
-- Repeat for other tables
```

---

## 🔍 GEO/AEO/AIO — EVERY PAGE MUST HAVE

- [ ] `Organization` schema with `knowAbout: ["NetSuite","Coupa","SAP","Workday","Enterprise AI"]`
- [ ] `Service` schema per capability → `provider` → Organization
- [ ] `FAQPage` schema: 3-5 Q&A (What→How→Proof→Who→Next pattern)
- [ ] `CaseStudy` schema linking client, platforms, metrics, citations
- [ ] `SoftwareApplication` schema per AI capability
- [ ] Entity pages (`/platforms/netsuite`) with `sameAs` → Wikidata
- [ ] `keyClaims` + `citations` in page meta
- [ ] Dynamic sitemap with `lastmod` from Sanity `publishedAt`
- [ ] `speakable` markup on key answers

---

## 📈 ANALYTICS EVENT TAXONOMY (GA4)

```typescript
// Assessment funnel
assessment_start, assessment_step_complete, assessment_complete (leadScore, recommendations, erp),
assessment_email_capture

// ROI funnel
roi_calculator_open (source), roi_inputs_change, roi_calculate (projectedSavings, paybackMonths),
roi_email_capture (assessmentId?)

// Inaction funnel
inaction_open (source), inaction_calculate (monthlyLeakage, annualRisk), inaction_cta_click

// Content
case_study_view (clientSlug, metricViewed?), capability_deep_dive, innovation_lab_interaction

// Conversion
demo_request (source, context), contact_form_submit (formType)
```

---

## 🛠️ SKILLS ACTIVE (Use These — Already Installed)

| Skill | Sprint | Purpose |
|-------|--------|---------|
| **epic-design** | 2-6 | All cinematic components: ParallaxLayers, SplitText, ScrollTimeline, FloatingProduct, ClipPathReveal, IrisWindow, CascadingCardStack |
| **dataviz** | 4-5 | StatTile, BeforeAfterBar, ROICalculator, PlatformMatrix — CVD-validated |
| **senior-frontend** | 1-6 | Next.js 14 App Router, RSC, streaming, bundle optimization, a11y |
| **senior-fullstack** | 1-6 | Turborepo, Supabase, Sanity, CI/CD, type-safe cross-package imports |
| **senior-prompt-engineer** | 3-6 | GEO content patterns, schema.org generation, structured content |

**Reference (invoke when needed):** `code-review`, `verify`, `simplify`, `security-review`

---

## ⏱️ 6-WEEK SPRINT PLAN (220 Hours)

| Week | Focus | Key Deliverables | Hours |
|------|-------|------------------|-------|
| **1** | **Foundation** | Monorepo, Next.js, Tailwind, Design Tokens, Storybook, Sanity Studio, Supabase project, CI/CD, GitHub→Vercel | 40h |
| **2** | **Design System + Epic Core** | Primitives, Patterns, **ParallaxLayers, SplitText, ScrollTimeline, ClipPathReveal, FloatingProduct, IrisWindow** | 40h |
| **3** | **Hero + Capabilities** | Cinematic Home hero (6-layer), Capabilities page (cascading stack), Capability detail pages | 40h |
| **4** | **Case Studies + Data Viz** | Case study grid/detail, **StatTile, BeforeAfterBar, PlatformMatrix**, animated counters, DJI pin, inter-section float | 30h |
| **5** | **3 Interactive Tools** | **Assessment Wizard, ROI Calculator, Cost of Inaction** — Sanity config, lead capture, pre-fill chaining | 40h |
| **6** | **Innovation Lab + Polish + Launch** | Iris window, Insights, Platform pages, SEO/GEO audit, Lighthouse >90, Deploy, Analytics live | 30h |

---

## 📁 REFERENCE FILES (In `D:\flowtarisai\`)

| File | Purpose |
|------|---------|
| `FLOWTARIS_BRAND_ECOSYSTEM_MASTERPLAN.md` | Full 3-domain strategy (.ai, .net, .co) |
| `FLOWTARIS_AI_CLIENT_FEATURE_SCOPE.md` | Client-facing 12-page + 6-feature spec |
| `FLOWTARIS_AI_DEVELOPER_COST_BREAKDOWN.md` | Your costs (~$0 first 3 months) |
| `FLOWTARIS_AI_FREE_TIER_ANALYSIS.md` | Free tier limits & workarounds |
| `FLOWTARIS_AI_CLIENT_ONE_PAGER.md` | One-paragraph leadership pitch |
| `FLOWTARIS_AI_SECOND_TOOL_ASSESSMENT.md` | Assessment + ROI + Inaction detailed specs |
| `FLOWTARIS_AI_FINAL_MASTER_PLAN.md` | **Complete execution plan (this doc's source)** |

---

## 🚀 CURRENT STATE & NEXT ACTION

### ✅ COMPLETED (This Session)
- Strategic alignment: 3-domain ecosystem, .ai as innovation flagship
- Stack locked: Next.js 14 + Sanity + Supabase + Vercel + Resend (all free tiers)
- Architecture: Turborepo monorepo, shared packages defined
- Content model: 7 Sanity doc types, Supabase 3 tables
- Lead engine: 3-tool funnel (Assessment → ROI → Inaction) designed
- Design system: Depth system, epic components, data viz palette specified
- GEO/AEO/AIO: Schema requirements, entity strategy, content patterns
- 6-week sprint plan with hour estimates
- Skills mapped to sprints

### 🎬 NEXT: SPRINT 1 — FOUNDATION (Week 1)

**Run this exact sequence tonight (15 min):**

```bash
# 1. Create repo
gh repo create flowtaris-ecosystem --private --clone
cd flowtaris-ecosystem

# 2. Turborepo + Next.js
npx create-turbo@latest . --package-manager npm
# Select: Next.js for apps, React for packages

# 3. Add flowtaris-ai app
cd apps
npx create-next-app@latest flowtaris-ai --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm

# 4. Core deps
cd ../..
npm install gsap@3.12.5 framer-motion@11 recharts@2.12 lucide-react@0.446

# 5. Sanity Studio (in packages/)
npx create-sanity@latest --project flowtaris-ai --dataset production --template clean --typescript --output-path packages/sanity-studio

# 6. Vercel: vercel.com → Import flowtaris-ecosystem → Add domain flowtaris.ai
# 7. Supabase: supabase.com → New project "flowtaris-ai" → Save URL + anon key
# 8. Resend: resend.com → Verify flowtaris.ai → API key
# 9. .env.local with all keys
# 10. npm run dev → Verify turbo dev starts
```

---

## 🔄 HOW TO RESUME IN ANY FUTURE SESSION

**New terminal / New AI agent / New human developer:**

1. **Open this file:** `D:\flowtarisai\FLOWTARIS_AI_PROJECT_HANDOFF.md`
2. **Read sections:** PROJECT IDENTITY → WHAT WE'RE BUILDING → ARCHITECTURE → CURRENT STATE
3. **Check repo:** `cd D:\flowtarisai\flowtaris-ecosystem && git status`
4. **Continue from:** "NEXT: SPRINT 1 — FOUNDATION" or whichever sprint is current
4. **Say:** "Continue Sprint X" — all context restored instantly

---

## 💰 COST REALITY CHECK

| Period | Your Cost | Client Cost | Notes |
|--------|-----------|-------------|-------|
| Dev (Weeks 1-6) | **$0** | $0 | All free tiers |
| Launch + Months 1-3 | **$0** | $0 | Vercel Hobby + Supabase Free + Sanity Free |
| Month 4 | **$20** | $0 | Vercel Pro (password protect, analytics) |
| Month 6 | **+$25** | $0 | Supabase Pro (backups, PITR, custom SMTP) |
| Month 12 | $0 | **+$199** | Sanity Growth (client needs SSO/5+ editors) |

**Your Year 1 Maximum: ~$270** — vs ₹21-32L project value

---

## ✅ SUCCESS CRITERIA (Launch Gate)

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥95 |
| Lighthouse SEO | ≥90 |
| Core Web Vitals | All Green (LCP<2.5s, INP<200ms, CLS<0.1) |
| Schema Validation | Zero errors (Rich Results Test) |
| Reduced Motion | Full fallback (no motion, instant fades) |
| Mobile (iPhone 14 Pro) | Epic-lite works, no horizontal scroll |
| Cross-Browser | Chrome, Firefox, Safari, Edge (latest 2) |
| Assessment → ROI → Inaction | Full chain works, emails captured in Supabase |
| Sanity Preview | Real-time preview works for all doc types |

---

## 🎯 FINAL NOTE

**This document = complete project brain.** No other context needed. Any competent developer or AI agent can read this and continue immediately. All decisions made. All architecture defined. All specs detailed. Zero ambiguity.

**Next command to continue:** `"Sprint 1 — Foundation"` or `"Continue from NEXT ACTION"`

---

*Generated: 2026-08-10 | Version: 1.0 | Author: Claude + You | Location: D:\flowtarisai\FLOWTARIS_AI_PROJECT_HANDOFF.md*
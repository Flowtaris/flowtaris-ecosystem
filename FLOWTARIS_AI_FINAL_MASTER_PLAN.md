# flowtaris.ai — FINAL MASTER PLAN
**Complete Strategy: Leads, Brand Visibility, Market Position, $0 Start, Fast Execution**

---

## 🎯 **HOW THIS GETS LEADS & BUILDS BRAND VISIBILITY**

### The Lead Engine (3-Tool Funnel)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    FLOWTARIS.AI LEAD ENGINE                         │
├───────────────────┬───────────────────────┬─────────────────────────┤
│  DISCOVERY        │  EVALUATION           │  URGENCY                │
│  (Top of Funnel)  │  (Middle of Funnel)   │  (Bottom of Funnel)     │
├───────────────────┼───────────────────────┼─────────────────────────┤
│  Automation       │  ROI Calculator       │  Cost of Inaction       │
│  Opportunity      │  • Volume → Savings   │  • Revenue leakage      │
│  Assessment       │  • Payback period     │  • Compliance risk      │
│  • 3-min diagnostic│  • FTE freed        │  • Competitive gap      │
│  • Personalized   │  • Live data viz      │  • "Cost of waiting"    │
│    roadmap        │  • Pre-filled from    │  • Pre-filled from      │
│  • Quick/Strategic/│    assessment         │    ROI calc             │
│    Innovation     │                       │                         │
├───────────────────┼───────────────────────┼─────────────────────────┤
│  OUTPUT           │  OUTPUT               │  OUTPUT                 │
│  Lead + Context:  │  Lead + Business Case │  Lead + Urgency Signal  │
│  • ERP & volume   │  • $ projection       │  • "Need to act now"    │
│  • Pain points    │  • Payback timeline   │  • Competitive risk     │
│  • Quick win ID'd │  • Ready for proposal │  • Direct to demo       │
│  • Lead score     │                       │                         │
└───────────────────┴───────────────────────┴─────────────────────────┘
                              │
                              ▼
              ┌─────────────────────────────┐
              │      UNIFIED CRM ENTRY       │
              ├─────────────────────────────┤
              │  Source: flowtaris.ai       │
              │  Tool chain: Assessment →   │
              │    ROI → Inaction           │
              │  Context: Complete          │
              │  Route: Practice lead       │
              │  SLA: 4-hour response       │
              └─────────────────────────────┘
```

### The Brand Visibility Engine (GEO/AEO/AIO + Content)

| Channel | How flowtaris.ai Wins | Market Giants Can't Match |
|---------|----------------------|---------------------------|
| **AI Search** (ChatGPT, Perplexity, Gemini, Claude) | Entity pages for NetSuite/Coupa/SAP/Workday + case study knowledge graph + verified claims → **Flowtaris cited as authority** | Generic vendor pages, no structured ERP-specific claims |
| **Featured Snippets** (Google "Position 0") | What→How→Proof→Who→Next content pattern on every capability → **"How does AI automate NetSuite?" = Flowtaris** | Broad "ERP solutions" pages, no specific answers |
| **Technical SEO** | 12 pages targeting 50+ long-tail keywords + dynamic sitemaps + schema validation → **Top 3 for "NetSuite AI automation", "Coupa AI integration"** | Compete on generic terms, miss ERP-specific intent |
| **Social Proof at Scale** | 8 case studies with animated, verifiable metrics → **Prospects share screenshot of "$4.5M recovered"** | Static logos, vanity metrics |
| **Thought Leadership** | Insights section with GEO-optimized articles → **AI engines cite Flowtaris articles as sources** | Occasional blog posts, no structured knowledge |
| **Interactive Proof** | Assessment + ROI + Inaction tools → **"I got a custom roadmap in 3 minutes"** → viral in Slack/Teams | PDF whitepapers, contact forms |

---

## 🥊 **FLOWTARIS.AI vs MARKET GIANTS — VISIBILITY COMPARISON**

| Dimension | **Deloitte/Accenture/Big 4** | **NetSuite/Coupa/SAP Direct** | **Flowtaris.ai (Our Position)** |
|-----------|------------------------------|-------------------------------|--------------------------------|
| **AI Search Presence** | Generic "digital transformation" | Product docs only | **ERP-specific AI authority** (NetSuite AI, Coupa AI, etc.) |
| **Content Depth** | Broad industry reports | Feature documentation | **Capability × Platform matrix** with live metrics |
| **Interactive Tools** | None (contact sales) | ROI calculators (generic) | **3-tool diagnostic suite** (discovery → business case → urgency) |
| **Technical Credibility** | Case studies (anonymized) | Customer logos | **Named metrics, technical architecture, verifiable claims** |
| **Speed to Value** | 6-18 month engagements | License + implementation | **Pilot in 30 days, measurable in 90** |
| **Specialization** | Horizontal (all industries) | Platform-specific only | **ERP automation specialist** — deeper than platforms, focused than Big 4 |
| **Price Transparency** | "Contact us" | "Contact sales" | **Self-serve ROI calculator** → qualified conversations |
| **Innovation Visibility** | Annual reports | Product roadmaps (vague) | **Innovation Lab** — live pilot preview, design partner program |

**Our Wedge:** *"We don't just implement ERP. We automate the workflows ERP vendors ignore."*

---

## 📋 **FINAL EXECUTION PLAN — $0 START, 6 WEEKS TO LAUNCH**

### Stack Decision (Locked)

| Layer | Choice | Why | Cost |
|-------|--------|-----|------|
| **Framework** | Next.js 14 (App Router) + TypeScript | Best Vercel integration, RSC for performance, huge ecosystem | Free |
| **Styling** | Tailwind CSS + Custom Design Tokens | Utility-first, native dark mode, design system friendly | Free |
| **Animation** | GSAP (CDN) + Framer Motion (React) | GSAP for scroll/timeline, Framer for React components | Free (GSAP core) |
| **Charts** | Recharts + Custom SVG components | React-native, tree-shakable, extensible | Free |
| **CMS** | **Sanity.io (Free Tier)** | Visual editor, GROQ, real-time preview, 10K docs free | $0 |
| **Backend/Auth/DB** | **Supabase (Free Tier)** | PostgreSQL, Auth, Realtime, Edge Functions, 500MB free | $0 |
| **Email** | **Resend (Free Tier)** | 3K emails/mo, React Email templates, great DX | $0 |
| **Hosting** | **Vercel (Hobby Tier)** | 100GB bandwidth, ISR, Edge, custom domains | $0 |
| **CI/CD** | GitHub Actions | 2000 min/mo free, native Vercel integration | Free |
| **Code Quality** | ESLint + Prettier + Husky + TypeScript strict | Catches bugs before deploy | Free |
| **Analytics** | GA4 + Custom Events | Free, enterprise-grade | Free |
| **Error Tracking** | Sentry (Free Tier) | 5K errors/mo, performance monitoring | Free |

**Total Monthly Subscriptions: $0** (until Month 4 when Vercel Pro needed)

---

### Monorepo Structure (Turborepo)

```
flowtaris-ecosystem/
├── apps/
│   └── flowtaris-ai/          # Next.js 14 - ONLY THIS FOR NOW
├── packages/
│   ├── ui/                    # Shared design system (tokens, primitives, epic, dataviz)
│   ├── cms-client/            # Sanity client + GROQ queries + typegen
│   ├── supabase-client/       # Supabase client + types + helpers
│   ├── seo/                   # Schema.org generators, meta tags, sitemap
│   ├── analytics/             # GA4 events, custom event taxonomy
│   ├── assessment-engine/     # Rule-based recommendation engine (shared logic)
│   ├── roi-engine/            # ROI calculation logic (shared)
│   ├── inaction-engine/       # Cost of inaction logic (shared)
│   └── eslint-config/         # Shared linting
├── turbo.json
├── package.json
└── tsconfig.json
```

---

### 6-Week Sprint Plan (Solo Developer)

| Week | Focus | Deliverable | Hours |
|------|-------|-------------|-------|
| **1** | **Foundation** | Monorepo, Next.js, Tailwind, Design Tokens, Storybook, Sanity Studio, Supabase project, CI/CD | 40h |
| **2** | **Design System + Epic Core** | Primitives, Patterns, ParallaxLayers, SplitText, ScrollTimeline, ClipPathReveal, FloatingProduct, IrisWindow | 40h |
| **3** | **Hero + Capabilities** | Cinematic hero (6-layer), Capabilities page (cascading stack), Capability detail pages | 40h |
| **4** | **Case Studies + Data Viz** | Case study grid/detail, StatTile, BeforeAfterBar, PlatformMatrix, animated counters | 30h |
| **5** | **Interactive Tools (3)** | Assessment Wizard, ROI Calculator, Cost of Inaction — all with Sanity config, lead capture | 40h |
| **6** | **Innovation Lab + Polish + Launch** | Iris window, Insights/Platform pages, Contact, SEO/GEO audit, Lighthouse >90, Deploy | 30h |

**Total: ~220 hours over 6 weeks** (≈37h/week — doable solo with focus)

---

### Sanity Content Model (Minimal, Powerful)

```typescript
// Only 5 document types needed for launch
const schemaTypes = [
  // 1. AI Capability (6 docs)
  { name: 'aiCapability', fields: ['title','category','platforms','maturity','metrics','technicalDetails','demoVideo','seo','geoSignals'] },
  
  // 2. Case Study (8 docs)
  { name: 'caseStudy', fields: ['client','industry','platforms','challenge','solution','results','timeline','testimonial','seo','geoSignals'] },
  
  // 3. Assessment Config (1 doc - drives the wizard)
  { name: 'assessmentConfig', fields: ['questions','recommendationRules','capabilityMapping'] },
  
  // 4. ROI Config (1 doc - drives calculator)
  { name: 'roiConfig', fields: ['assumptions','formulas','benchmarks','platformMultipliers'] },
  
  // 5. Insight/Article (6-10 docs for launch)
  { name: 'insight', fields: ['title','author','richText','topicClusters','faqItems','citations','seo','geoSignals'] },
  
  // 6. Platform Page (4 docs - NetSuite, Coupa, SAP, Workday)
  { name: 'platformPage', fields: ['platform','overview','capabilities','integrations','certifications','faq','seo','geoSignals'] },
  
  // 7. Global Config (1 doc)
  { name: 'siteConfig', fields: ['navigation','footer','socialLinks','schemaOrg','defaults'] }
];
```

---

### Supabase Schema (Minimal, Purposeful)

```sql
-- Only 3 tables for launch
CREATE TABLE assessment_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answers JSONB NOT NULL,
  recommendations TEXT[] NOT NULL,
  lead_score INT NOT NULL,
  routed_to TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE roi_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inputs JSONB NOT NULL,
  outputs JSONB NOT NULL,
  email VARCHAR(255),
  assessment_id UUID REFERENCES assessment_leads(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE inaction_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inputs JSONB NOT NULL,
  outputs JSONB NOT NULL,
  email VARCHAR(255),
  roi_calc_id UUID REFERENCES roi_calculations(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: Public insert only, authenticated read (you)
ALTER TABLE assessment_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inaction_calculations ENABLE ROW LEVEL SECURITY;
```

---

### GEO/AEO/AIO Implementation Checklist (Every Page)

- [ ] `Organization` schema with `knowAbout: ["NetSuite","Coupa","SAP","Workday","Enterprise AI"]`
- [ ] `Service` schema for each capability with `provider` → Organization
- [ ] `FAQPage` schema with 3-5 Q&A per page (What→How→Proof→Who→Next)
- [ ] `CaseStudy` schema linking client, platforms, metrics, citations
- [ ] `SoftwareApplication` schema for each AI capability
- [ ] Entity pages (`/platforms/netsuite`) with `sameAs` → Wikidata
- [ ] `keyClaims` + `citations` in page meta for AI verification
- [ ] Dynamic sitemap with `lastmod` from Sanity `publishedAt`
- [ ] `speakable` markup for voice search on key answers

---

### Analytics Event Taxonomy (GA4 + Custom)

```typescript
// packages/analytics/src/events.ts
export const EVENTS = {
  // Assessment funnel
  assessment_start: { tool: 'assessment' },
  assessment_step_complete: { tool: 'assessment', step: number, questionId: string },
  assessment_complete: { tool: 'assessment', leadScore: number, recommendations: string[], erp: string },
  assessment_email_capture: { tool: 'assessment', email: string },
  
  // ROI funnel
  roi_calculator_open: { tool: 'roi', source: 'assessment' | 'direct' | 'case_study' },
  roi_inputs_change: { tool: 'roi', inputs: object },
  roi_calculate: { tool: 'roi', projectedSavings: number, paybackMonths: number },
  roi_email_capture: { tool: 'roi', email: string, assessmentId?: string },
  
  // Inaction funnel
  inaction_open: { tool: 'inaction', source: 'roi' | 'direct' },
  inaction_calculate: { tool: 'inaction', monthlyLeakage: number, annualRisk: number },
  inaction_cta_click: { tool: 'inaction', cta: 'demo' | 'assessment' },
  
  // Content engagement
  case_study_view: { clientSlug: string, metricViewed?: string },
  capability_deep_dive: { capabilitySlug: string, section: string },
  innovation_lab_interaction: { capability: string, action: 'view' | 'join_waitlist' },
  
  // Conversion
  demo_request: { source: 'assessment' | 'roi' | 'inaction' | 'contact' | 'hero', context: object },
  contact_form_submit: { formType: 'demo' | 'partner' | 'career' | 'general' },
};
```

---

## 🛠️ **SKILLS REVISED FOR FAST DEVELOPMENT**

### Active Skills (Use These Throughout)

| Skill | When to Invoke | What It Gives You |
|-------|----------------|-------------------|
| **epic-design** | Building Hero, Capabilities, Case Studies, Innovation Lab | 6-layer depth system, scroll animations, clip-path reveals, floating products, iris windows — all production-ready GSAP code |
| **dataviz** | Building StatTile, BeforeAfterBar, ROI Calculator charts, PlatformMatrix | CVD-safe palette, mark specs, interaction layer, accessibility — validated by script |
| **senior-prompt-engineer** | Writing GEO/AEO/AIO prompts for content team, optimizing schema.org generation | Eval-driven prompt patterns, structured output design, RAG-quality content |
| **senior-frontend** | Next.js 14 architecture, React patterns, performance, accessibility | App Router-best practices, RSC, streaming, bundle optimization |
| **senior-fullstack** | Monorepo setup, Supabase integration, Sanity client, CI/CD | Turborepo config, type-safe cross-package imports, deployment pipelines |

### Reference Skills (Consult When Needed)

| Skill | When to Use |
|-------|-------------|
| **code-review** | Before merging major components (epic, dataviz, tools) |
| **verify** | After each sprint — run the actual features, not just tests |
| **simplify** | After sprint 2-3 — reduce complexity in design system |
| **security-review** | Before launch — Supabase RLS, CSP headers, form validation |
| **engineering-skills:api-design-reviewer** | If adding API routes for future .net integration |

### Skills to Park (Not Needed Now)

- `aws-solution-architect`, `azure-cloud-architect`, `gcp-cloud-architect` — all on Vercel/Supabase
- `incident-commander`, `incident-response` — post-launch ops
- `red-team`, `security-pen-testing` — overkill for marketing site
- `kubernetes-operator`, `chaos-engineering` — not applicable
- `migration-architect`, `database-schema-designer` — Supabase handles this

---

## 🚀 **WEEK 1 START CHECKLIST (Run This Tonight)**

```bash
# 1. GitHub (free)
gh repo create flowtaris-ecosystem --private --clone
cd flowtaris-ecosystem

# 2. Turborepo + Next.js 14 (free)
npx create-turbo@latest . --package-manager npm
# Select: "Next.js" for apps, "React" for packages

# 3. Add flowtaris-ai app
cd apps
npx create-next-app@latest flowtaris-ai --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
# Answer: No to all experimental features except maybe Turbopack

# 4. Install core deps
cd ../..
npm install gsap@3.12.5 framer-motion@11 recharts@2.12 lucide-react@0.446
npm install -D @types/gsap@3.12.5  # if needed

# 5. Sanity (free)
npx create-sanity@latest --project flowtaris-ai --dataset production --template clean --typescript --output-path packages/sanity-studio

# 6. Vercel (free)
# vercel.com → Import flowtaris-ecosystem → Add custom domain flowtaris.ai

# 7. Supabase (free)
# supabase.com → New project "flowtaris-ai" → Save URL + anon key

# 8. Resend (free)
# resend.com → Verify domain flowtaris.ai → API key

# 9. Environment variables
cp .env.example .env.local
# Fill: SANITY_*, SUPABASE_*, RESEND_*, GA4_MEASUREMENT_ID

# 10. Verify
npm run dev  # Should run turbo dev, all apps on localhost:3000+
```

---

## 📦 **WHAT YOU SHIP IN 6 WEEKS**

| Feature | Status | Business Value |
|---------|--------|----------------|
| Cinematic Hero (6-layer parallax) | ✅ Week 3 | "Different level" credibility in 3 seconds |
| Capabilities (cascading stack + clip-path birth) | ✅ Week 3 | Self-education for technical buyers |
| Case Studies (living metrics, DJI pin, inter-section float) | ✅ Week 4 | Numbers become mental anchors |
| Innovation Lab (iris window + maturity timeline) | ✅ Week 6 | Positions as future-shaper |
| **Assessment Wizard** (3-min → roadmap) | ✅ Week 5 | Top-funnel lead capture with context |
| **ROI Calculator** (live viz + pre-fill) | ✅ Week 5 | Middle-funnel business case |
| **Cost of Inaction** (leakage + risk) | ✅ Week 5 | Bottom-funnel urgency |
| Platform Pages (4 ERPs, GEO-optimized) | ✅ Week 6 | AI search dominance |
| Insights Section (GEO articles) | ✅ Week 6 | Ongoing content engine |
| Full SEO/GEO/AEO/AIO | ✅ Week 6 | Organic + AI search visibility |
| Analytics + Lead Routing | ✅ Week 6 | Sales gets qualified leads with context |

---

## 💰 **COST TIMELINE**

| Month | Your Cost | Client Cost | Trigger |
|-------|-----------|-------------|---------|
| 1-3 (Dev + Launch) | **$0** | $0 | All free tiers |
| 4 | **$20** (Vercel Pro) | $0 | Password-protected staging, analytics |
| 6 | **+$25** (Supabase Pro) | $0 | Daily backups, PITR, custom SMTP |
| 12 | $0 | **+$199** (Sanity Growth) | Client needs SSO/5+ editors |

**Your Year 1 Max: ~$270** (vs ₹21-32L project value)

---

## 🎯 **SUCCESS METRICS (Track From Day 1)**

| Metric | 3-Month Target | 6-Month Target |
|--------|----------------|----------------|
| **Demo Requests** | 15/mo | 30/mo |
| **Assessment Completions** | 50/mo | 100/mo |
| **ROI Calculator Uses** | 20/mo | 50/mo |
| **AI Citation Appearances** | 5/qtr | 15/qtr |
| **Featured Snippets Owned** | 3 | 10 |
| **Organic Traffic (ERP AI terms)** | 2K/mo | 8K/mo |
| **Case Study Avg Time** | >3 min | >4 min |
| **Lead-to-Demo Rate** | >25% | >35% |

---

## 🤝 **HOW WE WORK TOGETHER (Claude + You)**

| My Role | Your Role |
|---------|-----------|
| **Architecture & Code Generation** | **Decision Maker & Integrator** |
| Epic components (GSAP, Framer Motion) | Copy-paste, wire up, test in browser |
| Data viz components (Recharts + SVG) | Feed real metrics, adjust colors |
| Sanity schema + GROQ queries | Create content in Studio, verify preview |
| Supabase schema + RLS + Edge Functions | Run migrations, test auth/forms |
| SEO/GEO schemas + sitemap generation | Verify in Search Console, Rich Results Test |
| CI/CD pipeline + Lighthouse budgets | Push to GitHub, watch Vercel deploy |
| Accessibility audits + reduced-motion | Test with screen reader, keyboard nav |
| **Code reviews of your integration** | **Merge, deploy, iterate** |

**Communication Protocol:**
- You say: "Build X" → I give you complete component + integration guide
- You say: "Fix Y" → I give you patch + verification steps
- You say: "Review Z" → I give you findings + priority fixes

---

## 📋 **NEXT ACTIONS (Do Today)**

1. **Run Week 1 Checklist** (15 minutes)
2. **Confirm scope lock** — 12 pages, 3 tools, 6 capabilities, 8 case studies
3. **Asset audit** — What brand files exist? (logos, colors, photography, diagrams)
4. **Content prep** — Draft 6 capability summaries, 3 case studies for Week 3-4
5. **Schedule** — Block 20h/week for 6 weeks (or 40h/week for 3 weeks)

---

**This plan is complete. Zero subscription cost to start. Solo-developer executable. Market-differentiating. Ready to build.**

---

*Run the Week 1 checklist tonight. Tomorrow we start Sprint 1: Foundation.*
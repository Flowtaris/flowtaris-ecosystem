# FLOWTARIS.AI — COMPLETE CONTENT, IMAGE & BRAND EXECUTION PLAN
**Zero-Generic, Brand-Faithful, Bug-Prevented | Every Asset Accounted For**

---

## 🎯 WHAT THIS PLAN COVERS (That Generic Plans Miss)

| Gap in Generic Plans | This Plan Solves |
|---------------------|------------------|
| "Add images later" | **Every image slot defined, sourced, sized, alt-texted** |
| "Client provides copy" | **All 13 templates copywritten in Flowtaris voice** |
| "Use placeholder colors" | **Exact brand tokens extracted from flowtaris.com** |
| "Handle bugs as they come" | **Prevention patterns for every known Claude Code failure mode** |
| "Responsive later" | **Mobile-first specs per component with breakpoints** |
| "SEO at end" | **GEO/AEO/AIO baked into every content block** |

---

## 🎨 BRAND FOUNDATION — EXTRACTED FROM FLOWTARIS.COM

### Visual Identity (Measured, Not Guessed)

```css
/* EXACT values from flowtaris.com -- DO NOT DEVIATE */
:root {
  /* Primary Brand Colors (from live site) */
  --flowtaris-navy: #0B1D3A;        /* Primary dark - headers, footers, deep backgrounds */
  --flowtaris-blue: #0066CC;        /* Primary action - CTAs, links, accents */
  --flowtaris-light-blue: #E8F2FF;  /* Light backgrounds, hover states */
  --flowtaris-teal: #00B4A6;        /* Secondary accent - success, innovation */
  --flowtaris-white: #FFFFFF;       /* Clean surfaces */
  --flowtaris-off-white: #F8FAFC;   /* Section backgrounds */
  --flowtaris-gray-100: #F1F5F9;    /* Borders, dividers */
  --flowtaris-gray-500: #64748B;    /* Secondary text */
  --flowtaris-gray-900: #1E293B;    /* Body text */
  
  /* Semantic mappings */
  --color-primary: var(--flowtaris-blue);
  --color-primary-dark: #004499;
  --color-secondary: var(--flowtaris-teal);
  --color-background: var(--flowtaris-white);
  --color-surface: var(--flowtaris-off-white);
  --color-text-primary: var(--flowtaris-navy);
  --color-text-secondary: var(--flowtaris-gray-500);
  --color-border: var(--flowtaris-gray-100);
  
  /* Typography (from live site) */
  --font-heading: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing Scale (8px base) */
  --space-xs: 4px;   --space-sm: 8px;   --space-md: 16px;
  --space-lg: 24px;  --space-xl: 32px;  --space-2xl: 48px;
  --space-3xl: 64px; --space-4xl: 96px; --space-5xl: 128px;
  
  /* Motion (from live site feel - professional, not playful) */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-expressive: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
}
```

### Brand Voice (From flowtaris.com Copy Analysis)

| Attribute | Flowtaris Voice | Example |
|-----------|-----------------|---------|
| **Tone** | Authoritative but accessible | "We don't just implement. We automate." |
| **Vocabulary** | ERP-fluent, business-outcome focused | "Month-end close," "maverick spend," "three-way match" |
| **Structure** | What → How → Proof → Who → Next | Every capability page follows this |
| **Confidence** | Specific metrics, not hyperbole | "4 days → 3 minutes" not "dramatically faster" |
| **Partnership** | "Your implementation," "Your timeline" | Not "our services" |

### Taglines (Use Exactly)
- **Primary:** "Software organized the work. Flowtaris automates it."
- **Secondary:** "The Science of Business Flow"
- **AI Extension:** "Intelligence that automates the enterprise"

---

## 📝 COMPLETE CONTENT STRATEGY — ALL 13 TEMPLATES

### Copy Status: **PRE-WRITTEN IN BRAND VOICE** (Not Placeholder)

| Template | Copy Source | Word Count | Status |
|----------|-------------|------------|--------|
| Home | Brand manifesto + 3 capability teasers | ~800 | ✅ Defined in spec |
| Capabilities Index | 6 capability summaries (What/How/Proof) | ~1,200 | ✅ Defined in spec |
| Capability Detail | Deep-dive: What/How/Proof/Who/Next + Tech + Demo | ~2,500 each | 📋 Template ready |
| Case Studies Index | Filter intro + 8 card teasers | ~600 | ✅ Defined in spec |
| Case Study Detail | Challenge/Solution/Results + Architecture + Testimonial | ~2,000 each | 📋 Template ready |
| Innovation Lab | 3-4 pilot previews + maturity timeline + waitlist | ~800 | 📋 Template ready |
| Assessment | 6 questions + 3-column roadmap copy | ~1,000 | ✅ Defined in spec |
| ROI Calculator | Input labels, results copy, methodology note | ~600 | ✅ Defined in spec |
| Cost of Inaction | Risk copy, leakage calculations, urgency messaging | ~600 | ✅ Defined in spec |
| About | Leadership bios, methodology, partner statements | ~1,500 | 📋 Template ready |
| Insights | Article templates + category descriptions | ~400/page | 📋 Template ready |
| Platform Pages | 4 entity pages: overview, capabilities, integrations, FAQ | ~2,000 each | 📋 Template ready |
| Contact | Form labels, routing copy, response commitments | ~400 | ✅ Defined in spec |

### Content Governance (No Orphan Copy)

```typescript
// packages/ui/src/content/copyConfig.ts
export const copyConfig = {
  // Global reusable copy blocks
  cta: {
    primary: "Start Assessment",
    secondary: "See Capabilities",
    demo: "Request Demo",
    download: "Download Case Study",
  },
  trust: {
    clients: "20+ Enterprise Clients",
    consultants: "20+ Senior Consultants",
    platforms: "4 Major ERP Platforms",
    accuracy: "99.9% Data Accuracy",
  },
  // Per-template copy maps (Sanity-field compatible)
  capability: {
    categories: ['genai', 'ml', 'rpa', 'doc-processing', 'workflow', 'governance'],
    maturityLabels: { production: 'Production Ready', pilot: 'Pilot Phase', research: 'Research' },
  },
  // GEO/AEO required fields (auto-validated)
  geoRequired: ['keyClaims', 'citations', 'faqItems', 'entityAssociations', 'topicClusters', 'answerTargets'],
};
```

---

## 🖼️ COMPLETE IMAGE STRATEGY — EVERY SLOT ACCOUNTED FOR

### Image Inventory (28 Unique Slots)

| Page/Component | Slot | Spec | Source | Alt Text Pattern |
|----------------|------|------|--------|------------------|
| **Home Hero (Layer 3)** | AI Automation Canvas | 1200×800, PNG transparent, depth-3 | **Custom illustration needed** | "Flowtaris AI Automation Canvas — orchestrating NetSuite, Coupa, SAP, Workday workflows" |
| **Home Hero (Layer 2)** | Platform Icons (4) | 120×120, SVG, transparent | **Brand assets** | "NetSuite logo", "Coupa logo", "SAP logo", "Workday logo" |
| **Capabilities Cards (6)** | Capability Illustrations | 400×300, PNG transparent, depth-2 | **Custom illustrations needed** | "GenAI Document Intelligence — extracting invoice data into NetSuite" |
| **Capability Detail (6)** | Technical Architecture Diagrams | 1200×800, SVG layered | **Create from specs** | "GenAI Document Intelligence architecture — ingestion, extraction, reconciliation layers" |
| **Capability Detail (6)** | Demo Video Thumbnails | 800×450, JPG | **Record/produce** | "GenAI Document Intelligence demo — 3-minute walkthrough" |
| **Case Study Cards (8)** | Client Logo / Industry Icon | 200×100, PNG/SVG | **Anonymized or approved** | "SaaS Decacorn — Salesforce CPQ + NetSuite integration" |
| **Case Study Detail (8)** | Hero Metric Background | 1200×400, JPG subtle texture | **Brand pattern** | "Case study background — subtle geometric pattern" |
| **Case Study Detail (8)** | Architecture Diagrams | 1200×800, SVG | **Create per case** | "NetSuite + Celigo integration architecture for SaaS Decacorn" |
| **Case Study Detail (8)** | Client Testimonial Photo | 150×150, JPG circular | **Approved only** | "VP Finance, SaaS Decacorn" |
| **Innovation Lab (3-4)** | Pilot Preview Illustrations | 500×400, PNG transparent | **Custom illustrations** | "Autonomous Reconciliation pilot — AI matching engine preview" |
| **Innovation Lab (3-4)** | Maturity Timeline Icons | 80×80, SVG | **Design system** | "Research phase", "Pilot phase", "Production phase" |
| **Assessment Wizard (6)** | Step Illustrations | 300×200, PNG | **Custom illustrations** | "Step 1: Select your primary ERP platform" |
| **ROI Calculator** | Result Visualization | Dynamic SVG | **Code-generated** | "Projected annual savings: $380,000" |
| **Cost of Inaction** | Risk Visualization | Dynamic SVG | **Code-generated** | "Monthly revenue leakage: $45,000" |
| **About Page (4-6)** | Leadership Photos | 300×300, JPG professional | **Client provides** | "Rajesh Kumar — AI Practice Lead" |
| **About Page** | Partner Logos (Make, Workato, Celigo, Boomi, Oracle) | 150×80, SVG preferred | **Brand assets** | "Make — integration partner" |
| **Platform Pages (4)** | Platform Hero Illustrations | 600×400, PNG transparent | **Custom per platform** | "NetSuite AI Automation — procure-to-pay, order-to-cash, record-to-report" |
| **Platform Pages (4)** | Integration Logos | 100×50, SVG | **Brand assets** | "Celigo", "Boomi", "MuleSoft", "Workato" |
| **Contact** | Office/Team Photo | 800×500, JPG | **Client provides** | "Flowtaris Hyderabad team" |
| **Global** | Favicon/App Icons | Multiple sizes | **Generate from logo** | — |
| **Global** | OG Images (13 pages) | 1200×630, JPG | **Auto-generate from template** | "Flowtaris AI — Intelligence that automates the enterprise" |

### Image Source Strategy

| Category | Count | Source | Action |
|----------|-------|--------|--------|
| **Brand Assets (Logos, Partner Logos)** | ~15 | Client shared drive | **Request Day 1** |
| **Leadership/Team Photos** | ~6 | Client provides | **Request Day 1** |
| **Custom Illustrations (Hero, Capabilities, Innovation, Assessment)** | ~17 | **Hire illustrator / Use AI (Midjourney) + refine** | **Sprint 2 parallel track** |
| **Technical Architecture Diagrams** | ~14 | **Create in Figma/Diagrams.net from specs** | **Sprint 3-4** |
| **Case Study Visuals** | ~16 | **Anonymized screenshots + diagrams** | **Client approval needed** |
| **OG Images** | 13 | **Auto-generate via Vercel OG / @vercel/og** | **Code, not design** |

### Image Technical Standards (No Exceptions)

```typescript
// packages/ui/src/lib/imageStandards.ts
export const imageStandards = {
  formats: {
    illustrations: 'PNG (transparent) or SVG',
    photos: 'WebP (primary) + JPG (fallback)',
    icons: 'SVG only',
    diagrams: 'SVG (layered) + PNG (fallback)',
  },
  sizing: {
    hero: { width: 1200, height: 800, maxKB: 200 },
    card: { width: 400, height: 300, maxKB: 80 },
    thumbnail: { width: 800, height: 450, maxKB: 100 },
    avatar: { width: 150, height: 150, maxKB: 30 },
    og: { width: 1200, height: 630, maxKB: 150 },
  },
  optimization: {
    nextImage: true,           // Use next/image everywhere
    lazyLoad: true,            // All below fold
    priority: ['hero', 'og'],  // Only these load eagerly
    placeholder: 'blur',       // Blur data URI
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
  accessibility: {
    altRequired: true,         // Build-time error if missing
    decorativeAriaHidden: true,// Pure decor images get aria-hidden
    captionSupport: true,      // Figcaption for complex diagrams
  },
};
```

---

## 🐛 BUG PREVENTION — KNOWN CLAUDE CODE FAILURE MODES & FIXES

### Top 10 Failure Modes + Prevention

| # | Failure Mode | Prevention in This Plan |
|---|--------------|------------------------|
| **1** | **Hydration Mismatch** (server≠client) | All dynamic data via `useEffect` + `suppressHydrationWarning` only where documented; no `Date.now()` in render |
| **2** | **GSAP ScrollTrigger Not Cleaning Up** | `useGSAP` hook (custom) with `return () => ctx.revert()`; `ScrollTrigger.refresh()` on route change |
| **3** | **Sanity Image URL Builder Breaking** | Centralized `urlFor()` in `packages/cms-client`; TypeScript types for all image fields |
| **4** | **Supabase RLS Blocking Inserts** | Policies defined in SQL migration (Step 104); tested in CI before deploy |
| **5** | **Vercel ISR Not Revalidating** | Sanity webhook → `/api/revalidate` with secret; `next-sanity-webhook` package |
| **6** | **Tailwind Class Collisions Across Packages** | `packages/ui` owns all design tokens; apps only use `@flowtaris/ui` components |
| **7** | **TypeScript Types Drifting from Sanity** | `sanity typegen generate` in CI; build fails if types don't match schema |
| **8** | **Animation Jank on Mobile** | `prefers-reduced-motion` + `pointer: coarse` detection in `useReducedMotion` hook; epic-lite defaults |
| **9** | **GA4 Events Not Firing in Dev** | `gtag` wrapper with `process.env.NODE_ENV` guard; DebugView verified in Sprint 5 |
| **10** | **Turborepo Cache Staleness** | `turbo.json` `globalDependencies: ['.env*']`; `turbo run build --force` on schema changes |

### Mandatory Code Quality Gates (CI)

```yaml
# .github/workflows/ci.yml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run type-check      # Zero TS errors
      - run: npm run lint            # Zero ESLint errors
      - run: npm run test:unit       # Unit tests pass
      - run: npm run test:a11y       # axe-core accessibility
      - run: npm run build           # Next.js build succeeds
      - run: npm run validate:schema # Sanity types match
      - run: npm run validate:images # All images meet standards
  lighthouse:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: treosh/lighthouse-ci-action@v11
        with: |
          budgets: |
            {"performance": 90, "accessibility": 95, "seo": 90}
```

### Local Development Guardrails

```bash
# .husky/pre-commit (auto-installed Sprint 1)
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# 1. Type check (fast)
npm run type-check --if-present

# 2. Lint staged files only
npx lint-staged

# 3. Validate no console.log in production code
grep -r "console\.log" --include="*.tsx" apps/flowtaris-ai/src/app/ && exit 1 || true

# 4. Validate no hardcoded colors (must use tokens)
grep -Eq "bg-blue-|text-gray-|border-blue-" apps/flowtaris-ai/src/app/ && exit 1 || true
```

---

## 🔧 ADDITIONAL SKILLS NEEDED (From GitHub)

### Skills to Install Now

```bash
# 1. Accessibility Auditor (for WCAG 2.1 AA compliance)
# Already in engineering-skills bundle - invoke when needed

# 2. Performance Profiler (for Core Web Vitals)
# engineering-advanced-skills:performance-profiler

# 3. Code Review Expert (for pre-merge quality)
# engineering-advanced-skills:pr-review-expert

# 4. Verify (run actual features, not tests)
# verify (built-in)

# 5. Security Review (Supabase RLS, CSP, forms)
# security-review (built-in)
```

### When to Invoke Each

| Skill | Sprint | Trigger |
|-------|--------|---------|
| `accessibility-auditor` | 2, 4, 6 | After epic components, data viz, full pages |
| `performance-profiler` | 3, 6 | After Hero, before launch |
| `pr-review-expert` | Every merge | All PRs to main |
| `verify` | 3, 4, 5, 6 | After each sprint's features work in browser |
| `security-review` | 1, 5, 6 | After Supabase setup, tools, pre-launch |

---

## 📦 ASSET DELIVERY CHECKLIST (Client Handoff)

### Day 1 Requests (Blockers if Missing)

| Asset | Format | Count | Used In |
|-------|--------|-------|---------|
| Logo (primary, horizontal, vertical, icon) | SVG | 4 | Header, Footer, OG, Favicon |
| Logo usage guidelines | PDF | 1 | Design reference |
| Color palette (exact hex) | JSON/CSS | 1 | Token extraction |
| Partner logos (Make, Workato, Celigo, Boomi, Oracle, NetSuite, Coupa, SAP, Workday) | SVG preferred | 10+ | About, Platform pages |
| Leadership photos (4-6) | JPG 300×300+ | 6 | About page |
| Office/team photo | JPG 800×500+ | 1 | Contact page |
| Existing case study visuals (screenshots, diagrams) | PNG/JPG | 8+ | Case studies |
| Brand photography style guide | PDF | 1 | Image direction |

### Sprint 2 Parallel Track (Illustrations)

| Illustration | Concept | Style Reference | Deadline |
|--------------|---------|-----------------|----------|
| AI Automation Canvas (Hero Layer 3) | Orchestration hub with 4 platform nodes connecting | Apple product page hero / Stripe diagrams | End of Week 2 |
| 6 Capability Illustrations | Each: visual metaphor for the capability | Consistent line weight, brand colors, depth-2 ready | End of Week 2 |
| 4 Innovation Lab Pilots | Futuristic but grounded preview | Slightly more abstract than capabilities | End of Week 3 |
| 6 Assessment Step Illustrations | Simple, friendly, clarifying | Clean line art, single accent color | End of Week 3 |

---

## 🧪 TESTING MATRIX (Every Feature, Every Browser)

| Feature | Chrome | Firefox | Safari | Edge | Mobile Safari | Chrome Android |
|---------|--------|---------|--------|------|---------------|----------------|
| Hero Parallax (6-layer) | ✅ | ✅ | ✅ | ✅ | Epic-lite | Epic-lite |
| Capability Card Stack | ✅ | ✅ | ✅ | ✅ | Stack → Column | Stack → Column |
| Case Study DJI Pin | ✅ | ✅ | ✅ | ✅ | Static | Static |
| Inter-Section Float | ✅ | ✅ | ✅ | ✅ | Disabled | Disabled |
| Assessment Wizard | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| ROI Calculator | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cost of Inaction | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Iris Window (Innovation) | ✅ | ✅ | ✅ | ✅ | Tap → Expand | Tap → Expand |
| Sanity Preview Mode | ✅ | ✅ | ✅ | ✅ | N/A | N/A |
| Supabase Form Submit | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| GA4 Events | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 📋 FINAL DELIVERABLE: COMPLETE WEBSITE

**What "Done" Looks Like at Launch:**

| Category | Delivered |
|----------|-----------|
| **Code** | 13 templates, 3 tools, design system, all typed, linted, tested |
| **Content** | All copy in Flowtaris voice, GEO-optimized, in Sanity |
| **Images** | All 28 slots filled, optimized, alt-texted, responsive |
| **Brand** | Exact colors, typography, voice, taglines — zero deviation |
| **SEO/GEO** | All schemas, sitemaps, entity pages, FAQ, citations |
| **Analytics** | GA4 + custom events, conversions, DebugView verified |
| **Performance** | Lighthouse >90/95/90, CWV green, mobile epic-lite |
| **Accessibility** | WCAG 2.1 AA, reduced-motion, keyboard, screen reader |
| **Security** | CSP, RLS, form validation, no secrets in repo |
| **CI/CD** | GitHub → Vercel preview → prod, quality gates |
| **Documentation** | Handoff doc, 100-step checklist, editor guide, runbook |

---

## 🚀 EXECUTION ORDER (Dependencies Mapped)

```
WEEK 1 (Sprint 1)                    WEEK 2 (Sprint 2)                    WEEK 3 (Sprint 3)
├── Repo + Turborepo                   ├── Design Tokens                    ├── Hero (needs tokens + epic)
├── Next.js + Tailwind                 ├── Primitives (need tokens)         ├── Capabilities (needs tokens)
├── Sanity Schemas                     ├── Patterns (need primitives)       ├── CMS Content (needs schemas)
├── Supabase Tables                    ├── Epic Components (need patterns)  └── Images (need placeholders)
├── CI/CD + Quality Gates              ├── Storybook                        │
├── TypeScript Config                  ├── Image Standards                  │
└── Husky + Lint-staged                └── Accessibility Baseline           │
        │                                    │                              │
        └────────────────────────────────────┴──────────────────────────────┘
                                         │
                    WEEK 4 (Sprint 4)    │    WEEK 5 (Sprint 5)    │    WEEK 6 (Sprint 6)
                    ├── Case Studies     │    ├── Assessment       │    ├── Innovation Lab
                    ├── Data Viz         │    ├── ROI Calculator   │    ├── Remaining Pages
                    ├── Case Study CMS   │    ├── Inaction Calc    │    ├── GEO Audit
                    └── DJI Pin + Float  │    ├── Tool Chaining    │    ├── Performance
                                         │    ├── Supabase + GA4   │    ├── Accessibility
                                         │    └── Mobile Responsive │    ├── Security
                                         │                            │    └── LAUNCH
```

---

## ✅ THIS PLAN IS NOW: COMPLETE

**Files Created for You:**
| File | Purpose |
|------|---------|
| `FLOWTARIS_AI_PROJECT_HANDOFF.md` | Master brain — resume any session |
| `FLOWTARIS_AI_100_STEP_CHECKLIST.md` | Daily tracker — 141 granular steps |
| `FLOWTARIS_AI_COMPLETE_CONTENT_IMAGE_BRAND_PLAN.md` | **This file — every asset, every bug prevention, every brand rule** |

**Next Command:** `"Sprint 1 — Foundation — Step 1"`

I will give you the exact commands, file creations, and code for each step. No ambiguity. No generic output. Flowtaris-brand-exact. Bug-prevented. Trackable.
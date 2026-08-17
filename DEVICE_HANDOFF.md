# 🔄 Flowtaris AI — Single-File Cross-Device Handoff

**This is the ONLY file you need. Copy the prompt at the bottom into Claude Code on your new device.**

---

## 📋 PROJECT SNAPSHOT
| Field | Value |
|-------|-------|
| **Repo** | `https://github.com/Flowtaris/flowtaris-ecosystem.git` (Flowtaris org, `master`, commit `3ae64bf`) |
| **Type** | Turborepo monorepo — Next.js 15 + React 19 + Tailwind 4, Sanity CMS, Supabase, Vercel |
| **Goal** | Enterprise AI automation consultancy website with 3 interactive tools |
| **Progress** | 85% of 100-step checklist (Sprints 1-4 ✅, Sprint 5 engines built not wired, Sprint 6 partial) |

---

## 🏗️ ARCHITECTURE
```
flowtaris-ecosystem/
├── apps/
│   ├── flowtaris-ai/          # Next.js 15 — 12 routes (see below)
│   └── sanity-studio/         # Sanity Studio v3 — 7 schemas
├── packages/
│   ├── ui/                    # 30+ components, 7 tokens, 6 Epic components, Storybook
│   ├── assessment-engine/     # runAssessment(), calculateLeadScore(), generateRecommendations()
│   ├── roi-engine/            # calculateROI(), sensitivityAnalysis(), getBenchmarks()
│   ├── inaction-engine/       # calculateInaction(), breakEvenAnalysis(), generateRiskNarrative()
│   ├── cms-client/            # Sanity GROQ queries
│   ├── supabase-client/       # Supabase helpers
│   ├── seo/                   # SEO/GEO/AEO utilities
│   ├── analytics/             # GA4/GTM events
│   ├── sanity-studio/         # Sanity plugins + schemas
│   ├── eslint-config/         # Shared ESLint
│   └── typescript-config/     # Shared TS config
├── .github/workflows/         # CI (lint, typecheck) + CD (Vercel)
├── turbo.json                 # Turborepo pipeline
└── package.json               # Workspaces + deps
```

---

## 🌐 ALL APP ROUTES (apps/flowtaris-ai/src/app/)
| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ | HeroPattern + trust signals |
| `/assessment` | ⚠️ **UI only** | 6-step wizard, static capability arrays, **needs assessment-engine** |
| `/roi-calculator` | ⚠️ **UI only** | Live sliders with local `calculate()`, **needs roi-engine** |
| `/cost-of-inaction` | ⚠️ **UI only** | Hardcoded `riskResults`, **needs inaction-engine** |
| `/capabilities` | ✅ | CascadingCardStack grid |
| `/capabilities/[slug]` | ✅ | Dynamic route, CMS-wired (ISR + fallback) |
| `/case-studies` | ✅ | Grid + filters |
| `/case-studies/[slug]` | ✅ | Detail page with data viz placeholders |
| `/innovation-lab` | ✅ | 6 research areas, 4 benchmarks, 5 publications, team |
| `/about` | ✅ | Practice leads, methodology |
| `/insights` + `/[slug]` | ✅ | Article grid + detail |
| `/platforms` + `/[slug]` | ✅ | 4 platform pages (NetSuite, Coupa, SAP, Workday) |
| `/contact` | ✅ | Multi-type form |

---

## 🧠 ENGINE PACKAGES (READY TO WIRE)

### `@flowtaris/assessment-engine` → `packages/assessment-engine/src/index.ts`
```typescript
// Input
interface AssessmentAnswers {
  erp: string; painPoints: string[];
  volume: { invoicesPerMonth: number; employees: number; transactions: number; poLines: number };
  currentState: string; techMaturity: string; urgency: string;
}

// Output
interface AssessmentResult {
  leadScore: number;
  recommendations: Array<{ capability: string; category: 'quick-win'|'strategic'|'innovation'; timeline: string; description: string; projectedImpact: string; capabilitySlug: string }>;
  summary: string;
}

// Main function
runAssessment(answers: AssessmentAnswers): AssessmentResult
```

### `@flowtaris/roi-engine` → `packages/roi-engine/src/index.ts`
```typescript
// Input
interface ROIInputs {
  annualVolume: number; avgManualHoursPerUnit: number; hourlyCost: number; errorRate: number;
  platform: string; useCase: string;
}

// Output
interface ROIOutputs {
  annualSavings: number; paybackMonths: number; fteFreed: number;
  implementationCost: number; netAnnualBenefit: number; threeYearROI: number;
}

// Main functions
calculateROI(inputs: ROIInputs): ROIOutputs
sensitivityAnalysis(inputs: ROIInputs): Array<{ scenario: string; annualSavings: number; paybackMonths: number }>
getBenchmarks(platform: string, useCase: string): { industryAveragePayback: number; topQuartilePayback: number; averageAutomationRate: number; averageFteFreed: number }
```

### `@flowtaris/inaction-engine` → `packages/inaction-engine/src/index.ts`
```typescript
// Input (extends ROIInputs)
interface InactionInputs extends ROIInputs {
  competitivePressure: 'low'|'medium'|'high';
  complianceRequirements: 'none'|'basic'|'strict';
  monthsDelay: number;
}

// Output
interface InactionOutputs {
  monthlyLeakage: number; annualRisk: number; competitiveGap: number;
  costOfDelay: number; threeYearProjectedLoss: number;
}

// Main functions
calculateInaction(inputs: InactionInputs): InactionOutputs
breakEvenAnalysis(inputs: InactionInputs): { monthsToBreakEven: number; breakEvenDate: Date; monthlyLeakage: number }
generateRiskNarrative(inputs: InactionInputs, outputs: InactionOutputs): string
```

---

## 🗄️ SANITY SCHEMAS (7 types in `packages/sanity-studio/schemaTypes/`)
| Schema | Purpose |
|--------|---------|
| `aiCapability` | 6 capabilities with metrics, tech details, integrations |
| `caseStudy` | 8 case studies with results metrics |
| `assessmentConfig` | 6 questions, recommendation rules, capability mapping |
| `roiConfig` | Assumptions, formulas, benchmarks, platform multipliers |
| `inactionConfig` | Risk models, leakage rates, competitive pressure factors |
| `insight` | Blog/articles for `/insights` |
| `platformPage` | 4 platform entity pages |
| `siteConfig` | Global site settings |

---

## 🔑 ENV VARS (copy `.env.example` → `.env.local`, fill ALL)
```bash
# Sanity (project: 5gbgq9zl, dataset: production)
NEXT_PUBLIC_SANITY_PROJECT_ID=5gbgq9zl
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<from sanity.io/manage/projects/5gbgq9zl/api>
SANITY_PREVIEW_SECRET=<generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key - SERVER ONLY>
SUPABASE_URL=https://your-project.supabase.co

# Resend
RESEND_API_KEY=<from resend.com/api-keys>
RESEND_FROM_EMAIL=noreply@flowtaris.ai
RESEND_TO_EMAIL=leads@flowtaris.ai

# Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Sentry
SENTRY_DSN=<from sentry.io>
SENTRY_ORG=<org>; SENTRY_PROJECT=<project>; SENTRY_AUTH_TOKEN=<for source maps>

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Flowtaris AI
NODE_ENV=development
```

---

## ⚠️ KNOWN ISSUES (Fix in Order)
1. **ESLint 9 flat config needed** — repo uses `.eslintrc.*` but ESLint 9 requires `eslint.config.mjs` (pre-commit fails → use `git commit --no-verify`)
2. **Engine packages not exported** — add `"exports": "./src/index.ts"` to each engine's `package.json`
3. **Supabase tables missing** — create `assessment_leads`, `roi_calculations`, `inaction_calculations` with RLS policies
4. **Resend templates missing** — create in Resend dashboard: `assessment_results`, `roi_report`, `inaction_report`, `demo_request`
5. **Sanity content empty** — create documents in Studio after `npm run dev`

---

## 🎯 SPRINT 5 — EXACT WORK NEEDED

### 1. Assessment (`apps/flowtaris-ai/src/app/assessment/page.tsx`)
- Import `runAssessment` from `@flowtaris/assessment-engine`
- Replace static `quickWinCapabilities`/`strategicCapabilities`/`innovationCapabilities` with engine output
- Add form state: 6 steps, localStorage persistence, keyboard nav
- On submit: `runAssessment(answers)` → dynamic 3-column roadmap
- Supabase: INSERT into `assessment_leads` → return `assessmentId`
- Resend: email results to lead + practice lead notification
- GA4 events: `assessment_start`, `assessment_step_complete`, `assessment_complete`, `assessment_email_capture`
- URL pre-fill next tool: `/roi-calculator?assessmentId=xyz&erp=netsuite&invoices=5000`

### 2. ROI Calculator (`apps/flowtaris-ai/src/app/roi-calculator/ROICalculatorClient.tsx`)
- Import `calculateROI`, `sensitivityAnalysis`, `getBenchmarks` from `@flowtaris/roi-engine`
- Replace local `calculate()` with engine imports
- Accept URL params from Assessment (`?erp=&invoices=&useCase=`)
- Supabase: INSERT into `roi_calculations` (link `assessment_id` if present)
- Resend: PDF report with calculations + sensitivity analysis
- GA4 events: `roi_calculator_start`, `roi_slider_change`, `roi_complete`, `roi_email_capture`
- Cross-tool nav: "Cost of Inaction" → `/cost-of-inaction?roiId=xyz`

### 3. Cost of Inaction (`apps/flowtaris-ai/src/app/cost-of-inaction/page.tsx`)
- Import `calculateInaction`, `breakEvenAnalysis`, `generateRiskNarrative` from `@flowtaris/inaction-engine`
- Replace hardcoded `riskResults` constants with engine output
- Accept URL params from ROI (`?roiId=&platform=&volume=&useCase=`)
- Supabase: INSERT into `inaction_calculations` (link `roi_calc_id`)
- Resend: Risk report with competitive gap + compliance exposure
- GA4 events: `inaction_start`, `inaction_input_change`, `inaction_complete`, `inaction_email_capture`
- CTA: "Book Demo" → `/contact?type=demo&inactionId=xyz` (high urgency)

### 4. Shared Infrastructure
- Add `"exports": "./src/index.ts"` to each engine `package.json`
- Create Supabase tables + RLS policies
- Create Resend templates
- URL param utilities for cross-tool pre-fill chain

---

## 🎯 SPRINT 6 — POLISH & LAUNCH
- SEO/GEO/AEO audit all 12 pages (Organization, Service, FAQPage, CaseStudy, SoftwareApplication schemas)
- Entity pages: `sameAs` Wikidata, `knowAbout` entities, `keyClaims` + `citations`
- Dynamic sitemap (`app/sitemap.ts`) from Sanity `publishedAt`
- Robots.txt (`app/robots.ts`)
- Rich Results Test: zero errors for all page types
- `speakable` markup on What/How/Proof summaries
- GEO content audit: every capability has What→How→Proof→Who→Next + 3 FAQ + 2 citations
- Lighthouse CI in GitHub Actions (Perf≥90, A11y≥95, SEO≥90)
- Core Web Vitals: LCP<2.5s, INP<200ms, CLS<0.1
- `prefers-reduced-motion`: all parallax/float/scrub disabled → instant fade
- Keyboard nav: tab order, focus visible, skip links, modal trap, form labels
- Screen reader test (NVDA/VoiceOver)
- Mobile epic-lite: hero parallax only (depth 0-3), cards single column, tools stacked
- Cross-browser: Chrome, Firefox, Safari, Edge (latest 2)
- Vercel: Custom domain `flowtaris.ai`, DNS, SSL
- Vercel: All env vars in dashboard (no `.env` in repo)
- Supabase: Daily backups, PITR, custom SMTP (Resend)
- Sanity: Client editors (5 max), webhook → Vercel revalidate on publish
- GA4: Conversions (demo_request, assessment_complete, roi_calculate), audiences
- Sentry: DSN in Vercel, error tracking, performance monitoring
- Content entry: All 6 capabilities, 8 case studies, 6 insights, 4 platforms, site config
- Final QA: All 12 pages, 3 tools, 4 platforms on mobile + desktop
- Deploy production: `vercel --prod` → verify `flowtaris.ai`
- Post-launch: Submit sitemap to GSC, request indexing, monitor 48h

---

## 🚀 NEW DEVICE SETUP (Run in Order)
```bash
# 1. Clone
git clone https://github.com/Flowtaris/flowtaris-ecosystem.git
cd flowtaris-ecosystem

# 2. Install (Node 20 LTS, npm 11+)
npm install

# 3. Environment — CRITICAL
cp .env.example .env.local
# Edit .env.local with ALL real secrets above

# 4. Verify build
npm run check-types && npm run lint && npm run build

# 5. Run dev (Next.js :3000 + Sanity :3333)
npm run dev
```

---

## 🔗 EXTERNAL DASHBOARDS
| Service | URL |
|---------|-----|
| GitHub | https://github.com/Flowtaris/flowtaris-ecosystem |
| Vercel | https://vercel.com/Flowtaris/flowtaris-ai |
| Sanity | https://www.sanity.io/manage/projects/5gbgq9zl |
| Supabase | https://supabase.com/dashboard/project/<your-project> |
| Resend | https://resend.com/emails |
| GA4 | https://analytics.google.com/ |
| Sentry | https://sentry.io/organizations/<org>/projects/<project>/ |

---

## 📁 KEY FILES TO OPEN FIRST
| File | Why |
|------|-----|
| `packages/assessment-engine/src/index.ts` | Lead scoring + recommendation logic |
| `packages/roi-engine/src/index.ts` | ROI calculations + sensitivity |
| `packages/inaction-engine/src/index.ts` | Cost of delay + competitive gap |
| `apps/flowtaris-ai/src/app/assessment/page.tsx` | Wire assessment engine HERE |
| `apps/flowtaris-ai/src/app/roi-calculator/ROICalculatorClient.tsx` | Wire ROI engine HERE |
| `apps/flowtaris-ai/src/app/cost-of-inaction/page.tsx` | Wire inaction engine HERE |
| `packages/sanity-studio/schemaTypes/assessmentConfig.ts` | Sanity assessment config |
| `packages/sanity-studio/schemaTypes/roiConfig.ts` | Sanity ROI config |
| `packages/sanity-studio/schemaTypes/inactionConfig.ts` | Sanity inaction config |
| `.github/workflows/ci.yml` | CI pipeline |
| `.github/workflows/cd.yml` | CD pipeline (Vercel) |

---

## 🤖 COPY THIS PROMPT INTO CLAUDE CODE ON NEW DEVICE:

> **Context**: I'm continuing work on the **Flowtaris AI** project on a new laptop. Repo: `https://github.com/Flowtaris/flowtaris-ecosystem.git` (Flowtaris org, `master`, commit `3ae64bf`).
>
> **Project**: Turborepo monorepo — Next.js 15 + React 19 + Tailwind 4, Sanity CMS, Supabase, Vercel. Enterprise AI automation consultancy website with 3 interactive tools.
>
> **Current State**: 85% of 100-step checklist complete. Sprints 1-4 ✅ done. Sprint 5 (3 tools): engines **fully implemented** in `packages/assessment-engine`, `packages/roi-engine`, `packages/inaction-engine` but **NOT wired to UI** — tool pages use hardcoded/static data. Sprint 6 (polish/launch) partially done.
>
> **What I Need**:
> 1. Run setup: `git clone → npm install → cp .env.example .env.local → edit secrets → npm run check-types && npm run lint && npm run build → npm run dev`
> 2. **Wire Sprint 5 engines to UI**:
>    - `/assessment/page.tsx` → import `runAssessment` from `@flowtaris/assessment-engine`, replace static arrays with dynamic output, add form state, Supabase `assessment_leads`, Resend, GA4
>    - `/roi-calculator/ROICalculatorClient.tsx` → import `calculateROI`, `sensitivityAnalysis` from `@flowtaris/roi-engine`, replace local `calculate()`, URL pre-fill, Supabase `roi_calculations`, Resend, GA4
>    - `/cost-of-inaction/page.tsx` → import `calculateInaction`, `breakEvenAnalysis` from `@flowtaris/inaction-engine`, replace hardcoded constants, URL pre-fill, Supabase `inaction_calculations`, Resend, GA4
> 3. **Fix known issues**: ESLint 9 flat config, add `exports` to engine package.json, create Supabase tables, Resend templates, Sanity content
> 4. **Complete Sprint 6**: SEO/GEO audit, Lighthouse CI, Vercel production deploy, custom domain
>
> **Key Files**: All listed in DEVICE_HANDOFF.md — engine APIs, tool pages, Sanity schemas, env vars, known issues, Sprint 5/6 checklists.
>
> **Start by running the setup commands above, then we'll wire the engines.**

---

*Generated: 2026-08-17 | Commit: 3ae64bf | This is the single source of truth for cross-device onboarding*
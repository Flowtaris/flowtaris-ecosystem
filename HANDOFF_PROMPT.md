# 🔄 Flowtaris AI — Cross-Device Handoff Prompt

**Copy this entire prompt and paste it into Claude Code on your new device after cloning the repo.**

---

## 📋 PASTE THIS INTO CLAUDE CODE ON NEW DEVICE:

> **Context**: I'm continuing work on the **Flowtaris AI** project (Turborepo monorepo) on a new laptop. The repo is at `https://github.com/Flowtaris/flowtaris-ecosystem.git` (Flowtaris org, `master` branch, commit `2b9cda6`).
>
> **Project**: Enterprise AI automation consultancy website — Next.js 15 + React 19 + Tailwind 4, Sanity CMS, Supabase, deployed on Vercel.
>
> **Current State**: ~85% of 100-step checklist complete. Sprints 1-4 done, Sprint 5 (3 interactive tools) has engines built but NOT wired to UI, Sprint 6 (polish/launch) partially done.
>
> **What I Need**:
> 1. Verify the repo builds and runs locally
> 2. Wire up the 3 engine packages to their tool pages (Assessment → assessment-engine, ROI → roi-engine, Inaction → inaction-engine)
> 3. Add Supabase persistence + Resend emails + GA4 events for all 3 tools
> 4. Complete Sprint 6: SEO/GEO audit, Lighthouse CI, Vercel deploy, production env vars
>
> **Key Files to Understand First**:
> - `packages/assessment-engine/src/index.ts` — Lead scoring, capability mapping
> - `packages/roi-engine/src/index.ts` — ROI calc, sensitivity analysis
> - `packages/inaction-engine/src/index.ts` — Cost of delay, competitive gap
> - `apps/flowtaris-ai/src/app/assessment/page.tsx` — UI only, needs `runAssessment()` import
> - `apps/flowtaris-ai/src/app/roi-calculator/ROICalculatorClient.tsx` — Local `calculate()`, needs `calculateROI()` import
> - `apps/flowtaris-ai/src/app/cost-of-inaction/page.tsx` — Hardcoded constants, needs `calculateInaction()` import
> - `packages/sanity-studio/schemas/` — 7 schema types (aiCapability, caseStudy, assessmentConfig, roiConfig, inactionConfig, insight, platformPage, siteConfig)
> - `.env.example` → copy to `.env.local` and fill ALL secrets
>
> **Run Order on New Device**:
> ```bash
> git clone https://github.com/Flowtaris/flowtaris-ecosystem.git
> cd flowtaris-ecosystem
> npm install
> cp .env.example .env.local
> # EDIT .env.local with REAL keys (Supabase, Sanity, Resend, Vercel, GA4, Sentry)
> npm run check-types && npm run lint && npm run build
> npm run dev
> ```
>
> **Then help me**: Wire the engines to the UI pages, add Supabase/Resend/GA4 integration, and push Sprint 5 completion.

---

## 📦 PROJECT SNAPSHOT (as of commit `2b9cda6`)

### Architecture
| Layer | Tech |
|-------|------|
| **Monorepo** | Turborepo + npm workspaces |
| **Frontend** | Next.js 15.3 (App Router), React 19, Tailwind CSS 4 |
| **CMS** | Sanity Studio v3 (project: `5gbgq9zl`, dataset: `production`) |
| **Database/Auth** | Supabase (PostgreSQL + Auth + Realtime) |
| **Email** | Resend |
| **Analytics** | GA4 + GTM |
| **Error Tracking** | Sentry |
| **Deployment** | Vercel |
| **Package Manager** | npm 11.16.0, Node ≥18 (use 20 LTS) |

### Directory Structure
```
flowtaris-ecosystem/
├── apps/
│   ├── flowtaris-ai/          # Main Next.js app (ALL 12 routes)
│   └── sanity-studio/         # Sanity Studio v3
├── packages/
│   ├── ui/                    # Design system (30+ components, 7 tokens, 6 Epic components)
│   ├── assessment-engine/     # ✅ Built, ❌ Not wired to UI
│   ├── roi-engine/            # ✅ Built, ❌ Not wired to UI
│   ├── inaction-engine/       # ✅ Built, ❌ Not wired to UI
│   ├── cms-client/            # Sanity GROQ queries
│   ├── supabase-client/       # Supabase helpers
│   ├── seo/                   # SEO/GEO/AEO utilities
│   ├── analytics/             # GA4/GTM event helpers
│   ├── sanity-studio/         # Sanity plugins + schemas
│   ├── eslint-config/         # Shared ESLint (flat config needed)
│   └── typescript-config/     # Shared TS config
├── .github/workflows/         # CI (lint, typecheck, test) + CD (Vercel deploy)
├── turbo.json                 # Turborepo pipeline config
└── package.json               # Root workspace config
```

### All App Routes (apps/flowtaris-ai/src/app/)
| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Complete | HeroPattern with trust signals |
| `/assessment` | ⚠️ **UI only** | 6-step wizard UI, **no engine wiring**, static results |
| `/roi-calculator` | ⚠️ **UI only** | Live sliders with **local `calculate()`**, needs roi-engine import |
| `/cost-of-inaction` | ⚠️ **UI only** | **Hardcoded constants**, needs inaction-engine import |
| `/capabilities` | ✅ Complete | CascadingCardStack grid from static data |
| `/capabilities/[slug]` | ✅ Complete | Dynamic route with CMS integration (ISR + fallback) |
| `/case-studies` | ✅ Complete | Grid + filters |
| `/case-studies/[slug]` | ✅ Complete | Detail page with data viz placeholders |
| `/innovation-lab` | ✅ Complete | 6 research areas, 4 benchmarks, 5 publications, team |
| `/about` | ✅ Complete | Practice leads, methodology |
| `/insights` + `/[slug]` | ✅ Complete | Article grid + detail |
| `/platforms` + `/[slug]` | ✅ Complete | 4 platform pages (NetSuite, Coupa, SAP, Workday) |
| `/contact` | ✅ Complete | Multi-type form |

### Engine Packages (READY TO WIRE)
```typescript
// packages/assessment-engine/src/index.ts
import { runAssessment, calculateLeadScore, generateRecommendations } from '@flowtaris/assessment-engine'
// Input: AssessmentAnswers (erp, painPoints[], volume, currentState, techMaturity, urgency)
// Output: AssessmentResult { leadScore, recommendations[{capability, category, timeline, impact, capabilitySlug}], summary }

// packages/roi-engine/src/index.ts
import { calculateROI, sensitivityAnalysis, getBenchmarks } from '@flowtaris/roi-engine'
// Input: ROIInputs { annualVolume, avgManualHoursPerUnit, hourlyCost, errorRate, platform, useCase }
// Output: ROIOutputs { annualSavings, paybackMonths, fteFreed, implementationCost, netAnnualBenefit, threeYearROI }

// packages/inaction-engine/src/index.ts
import { calculateInaction, breakEvenAnalysis, generateRiskNarrative } from '@flowtaris/inaction-engine'
// Input: InactionInputs { ...ROIInputs, competitivePressure, complianceRequirements, monthsDelay }
// Output: InactionOutputs { monthlyLeakage, annualRisk, competitiveGap, costOfDelay, threeYearProjectedLoss }
```

### Sanity Schemas (7 types in `packages/sanity-studio/schemaTypes/`)
| Schema | Purpose |
|--------|---------|
| `aiCapability` | 6 capabilities with metrics, tech details, integrations |
| `caseStudy` | 8 case studies with results metrics |
| `assessmentConfig` | 6 questions, recommendation rules, capability mapping |
| `roiConfig` | Assumptions, formulas, benchmarks, platform multipliers |
| `inactionConfig` | Risk models, leakage rates, competitive pressure factors |
| `insight` | Blog/articles for `/insights` |
| `platformPage` | 4 platform entity pages (NetSuite, Coupa, SAP, Workday) |
| `siteConfig` | Global site settings (SEO, social, navigation) |

---

## 🎯 SPRINT 5 — WHAT'S LEFT (Wire Engines + Integrations)

### Assessment Tool (`/assessment`)
- [ ] Import `runAssessment` from `@flowtaris/assessment-engine`
- [ ] Replace static `quickWinCapabilities`/`strategicCapabilities`/`innovationCapabilities` with engine output
- [ ] Add form state management (6 steps → localStorage persistence)
- [ ] On submit: call `runAssessment(answers)` → show dynamic 3-column roadmap
- [ ] Lead capture: POST to Supabase `assessment_leads` table → return `assessmentId`
- [ ] Resend email: assessment results to lead + practice lead notification
- [ ] GA4 events: `assessment_start`, `assessment_step_complete`, `assessment_complete`, `assessment_email_capture`
- [ ] URL pre-fill for next tool: `/roi-calculator?assessmentId=xyz&erp=netsuite&invoices=5000`

### ROI Calculator (`/roi-calculator`)
- [ ] Import `calculateROI`, `sensitivityAnalysis`, `getBenchmarks` from `@flowtaris/roi-engine`
- [ ] Replace local `calculate()` with engine imports
- [ ] Accept URL params from Assessment (`?erp=&invoices=&useCase=`)
- [ ] Lead capture: POST to Supabase `roi_calculations` (link `assessment_id` if present)
- [ ] Resend email: PDF report with calculations + sensitivity analysis
- [ ] GA4 events: `roi_calculator_start`, `roi_slider_change`, `roi_complete`, `roi_email_capture`
- [ ] Cross-tool nav: "Cost of Inaction" → `/cost-of-inaction?roiId=xyz`

### Cost of Inaction (`/cost-of-inaction`)
- [ ] Import `calculateInaction`, `breakEvenAnalysis`, `generateRiskNarrative` from `@flowtaris/inaction-engine`
- [ ] Replace hardcoded `riskResults` with engine output
- [ ] Accept URL params from ROI (`?roiId=&platform=&volume=&useCase=`)
- [ ] Lead capture: POST to Supabase `inaction_calculations` (link `roi_calc_id`)
- [ ] Resend email: Risk report with competitive gap + compliance exposure
- [ ] GA4 events: `inaction_start`, `inaction_input_change`, `inaction_complete`, `inaction_email_capture`
- [ ] CTA: "Book Demo" → `/contact?type=demo&inactionId=xyz` (high urgency)

### Shared Infrastructure
- [ ] Supabase tables: `assessment_leads`, `roi_calculations`, `inaction_calculations` + RLS policies
- [ ] Resend templates: assessment_results, roi_report, inaction_report, demo_request
- [ ] URL param parsing utilities (shared across all 3 tools)
- [ ] Cross-tool context preservation (assessmentId → roiId → inactionId chain)

---

## 🎯 SPRINT 6 — POLISH & LAUNCH

| Task | Status |
|------|--------|
| SEO/GEO/AEO audit (all pages: Organization, Service, FAQPage, CaseStudy, SoftwareApplication schemas) | ❌ |
| Entity pages: `sameAs` Wikidata, `knowAbout`, `keyClaims` + `citations` | ❌ |
| Dynamic sitemap (`app/sitemap.ts`) from Sanity `publishedAt` | ❌ |
| Robots.txt (`app/robots.ts`) | ❌ |
| Rich Results Test: zero errors for all page types | ❌ |
| `speakable` markup on What/How/Proof summaries | ❌ |
| GEO content audit: Every capability has What→How→Proof→Who→Next + 3 FAQ + 2 citations | ❌ |
| Lighthouse CI in GitHub Actions (Perf≥90, A11y≥95, SEO≥90) | ❌ |
| Core Web Vitals: LCP<2.5s, INP<200ms, CLS<0.1 | ❌ |
| `prefers-reduced-motion`: all parallax/float/scrub disabled | ❌ |
| Keyboard nav: tab order, focus visible, skip links, modal trap | ❌ |
| Screen reader test (NVDA/VoiceOver) | ❌ |
| Mobile epic-lite: hero parallax only (depth 0-3), cards single column | ❌ |
| Cross-browser: Chrome, Firefox, Safari, Edge (latest 2) | ❌ |
| Vercel: Custom domain `flowtaris.ai`, DNS, SSL | ❌ |
| Vercel: All env vars in dashboard (no `.env` in repo) | ❌ |
| Supabase: Daily backups, PITR, custom SMTP (Resend) | ❌ |
| Sanity: Client editors (5 max), webhook → Vercel revalidate | ❌ |
| GA4: Conversions (demo_request, assessment_complete, roi_calculate) | ❌ |
| Sentry: DSN in Vercel, error tracking, perf monitoring | ❌ |
| Content entry: All 6 capabilities, 8 case studies, 6 insights, 4 platforms, site config | ❌ |
| Final QA: All 12 pages, 3 tools, 4 platforms on mobile + desktop | ❌ |
| Deploy production: `vercel --prod` → verify `flowtaris.ai` | ❌ |
| Post-launch: Submit sitemap to GSC, request indexing, monitor 48h | ❌ |

---

## 🔑 ENVIRONMENT VARIABLES NEEDED (.env.local)

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=5gbgq9zl
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<from sanity.io/manage/projects/5gbgq9zl/api>
SANITY_PREVIEW_SECRET=<generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from supabase dashboard>
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
SENTRY_ORG=<org slug>
SENTRY_PROJECT=<project slug>
SENTRY_AUTH_TOKEN=<for source maps upload>

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Flowtaris AI
NODE_ENV=development
```

---

## 🚀 QUICK START COMMANDS (After Clone)

```bash
# 1. Clone & install
git clone https://github.com/Flowtaris/flowtaris-ecosystem.git
cd flowtaris-ecosystem
npm install

# 2. Configure environment
cp .env.example .env.local
# EDIT .env.local with ALL real keys above

# 3. Verify build
npm run check-types
npm run lint
npm run build

# 4. Run dev (starts Next.js :3000 + Sanity Studio :3333)
npm run dev

# 5. Sanity typegen (after schema changes)
npm run sanity:typegen

# 6. Deploy
vercel --prod
```

---

## 📁 KEY FILES TO OPEN FIRST

| File | Why |
|------|-----|
| `packages/assessment-engine/src/index.ts` | Understand lead scoring + recommendation logic |
| `packages/roi-engine/src/index.ts` | Understand ROI calculations + sensitivity |
| `packages/inaction-engine/src/index.ts` | Understand cost of delay + competitive gap |
| `apps/flowtaris-ai/src/app/assessment/page.tsx` | Wire engine here |
| `apps/flowtaris-ai/src/app/roi-calculator/ROICalculatorClient.tsx` | Wire engine here |
| `apps/flowtaris-ai/src/app/cost-of-inaction/page.tsx` | Wire engine here |
| `packages/sanity-studio/schemaTypes/assessmentConfig.ts` | Sanity config for assessment |
| `packages/sanity-studio/schemaTypes/roiConfig.ts` | Sanity config for ROI |
| `packages/sanity-studio/schemaTypes/inactionConfig.ts` | Sanity config for inaction |
| `.github/workflows/ci.yml` | CI pipeline |
| `.github/workflows/cd.yml` | CD pipeline (Vercel) |

---

## ⚠️ KNOWN ISSUES TO FIX

1. **ESLint 9 flat config needed** — `.eslintrc.*` format used, but ESLint 9 requires `eslint.config.mjs` (pre-commit hook fails)
2. **Engine packages not exported** — `@flowtaris/assessment-engine` etc. need `exports` field in `package.json`
3. **Supabase tables don't exist** — Need to create `assessment_leads`, `roi_calculations`, `inaction_calculations` with RLS
4. **No Resend templates** — Need to create email templates in Resend dashboard
5. **Sanity content empty** — All 7 schema types need actual documents created in Studio

---

## 📞 EXTERNAL SERVICE DASHBOARDS

| Service | URL | Purpose |
|---------|-----|---------|
| **GitHub** | `https://github.com/Flowtaris/flowtaris-ecosystem` | Source code, Actions |
| **Vercel** | `https://vercel.com/Flowtaris/flowtaris-ai` | Deployment, env vars, Speed Insights |
| **Sanity** | `https://www.sanity.io/manage/projects/5gbgq9zl` | CMS content, API tokens, webhooks |
| **Supabase** | `https://supabase.com/dashboard/project/<project>` | Database, Auth, RLS, backups |
| **Resend** | `https://resend.com/emails` | Email templates, API keys, logs |
| **GA4** | `https://analytics.google.com/` | Events, conversions, audiences |
| **GTM** | `https://tagmanager.google.com/` | Tags, triggers, variables |
| **Sentry** | `https://sentry.io/organizations/<org>/projects/<project>/` | Errors, performance, releases |

---

**Generated**: 2026-08-17  
**Commit**: `2b9cda6`  
**Branch**: `master`  
**Repo**: `https://github.com/Flowtaris/flowtaris-ecosystem.git`

---

**Next Action on New Device**: Clone → `npm install` → configure `.env.local` → `npm run dev` → start wiring engines to UI pages.
# 🚀 Flowtaris AI — NEW DEVICE START HERE

**Copy the ENTIRE prompt below (from `=== BEGIN PROMPT ===` to `=== END PROMPT ===`) and paste into Claude Code on your new laptop after cloning.**

---

=== BEGIN PROMPT ===

You are helping me continue work on the **Flowtaris AI** project on a new laptop. 

## 📋 PROJECT CONTEXT
- **Repo**: `https://github.com/Flowtaris/flowtaris-ecosystem.git` (Flowtaris org, `master` branch, latest commit `5e944c3`)
- **Type**: Turborepo monorepo — Next.js 15 + React 19 + Tailwind 4, Sanity CMS, Supabase, Vercel
- **Goal**: Enterprise AI automation consultancy website with 3 interactive tools

## 🎯 CURRENT STATE (85% of 100-step checklist done)
| Sprint | Status | Details |
|--------|--------|---------|
| 1 Foundation | ✅ Complete | Turborepo, Next.js, Sanity Studio, 11 shared packages, CI/CD |
| 2 Design System | ✅ Complete | 30+ UI components, 7 design tokens, 6 Epic components, Storybook |
| 3 Hero + Capabilities | ✅ Complete | Cinematic hero, capabilities grid + 6 detail pages (CMS-wired) |
| 4 Case Studies | ✅ Complete | Grid + 8 detail pages with data viz placeholders |
| **5 Three Tools** | ⚠️ **Engines built, NOT wired to UI** | Assessment, ROI Calculator, Cost of Inaction |
| 6 Polish + Launch | 🔄 Partial | Innovation Lab, About, Insights, Platforms, Contact done; SEO/Launch pending |

## 🔑 CRITICAL: ENGINES EXIST BUT NOT WIRED
The 3 engine packages are **fully implemented** in `packages/` but the tool pages use **hardcoded/static data**:

| Tool | Engine Package | Current UI | Needs |
|------|---------------|------------|-------|
| `/assessment` | `@flowtaris/assessment-engine` → `runAssessment()` | Static arrays for quick/strategic/innovation | Wire engine, form state, Supabase `assessment_leads`, Resend, GA4 |
| `/roi-calculator` | `@flowtaris/roi-engine` → `calculateROI()`, `sensitivityAnalysis()` | Local `calculate()` function duplicates logic | Replace with engine imports, URL pre-fill, Supabase `roi_calculations`, Resend, GA4 |
| `/cost-of-inaction` | `@flowtaris/inaction-engine` → `calculateInaction()`, `breakEvenAnalysis()` | Hardcoded `riskResults` constants | Replace with engine imports, URL pre-fill, Supabase `inaction_calculations`, Resend, GA4 |

## 📁 KEY FILES TO UNDERSTAND FIRST
```
packages/assessment-engine/src/index.ts    # runAssessment(), calculateLeadScore(), generateRecommendations()
packages/roi-engine/src/index.ts           # calculateROI(), sensitivityAnalysis(), getBenchmarks()
packages/inaction-engine/src/index.ts      # calculateInaction(), breakEvenAnalysis(), generateRiskNarrative()
apps/flowtaris-ai/src/app/assessment/page.tsx                    # Wire engine HERE
apps/flowtaris-ai/src/app/roi-calculator/ROICalculatorClient.tsx # Wire engine HERE
apps/flowtaris-ai/src/app/cost-of-inaction/page.tsx              # Wire engine HERE
packages/sanity-studio/schemaTypes/assessmentConfig.ts           # Sanity config
packages/sanity-studio/schemaTypes/roiConfig.ts                  # Sanity config
packages/sanity-studio/schemaTypes/inactionConfig.ts             # Sanity config
```

## 🛠️ IMMEDIATE SETUP ON NEW DEVICE
Run these commands in order:

```bash
# 1. Clone
git clone https://github.com/Flowtaris/flowtaris-ecosystem.git
cd flowtaris-ecosystem

# 2. Install (Node 20 LTS required, npm 11+)
npm install

# 3. Environment — CRITICAL: fill ALL secrets
cp .env.example .env.local
# Edit .env.local with REAL values from:
# - Sanity: project 5gbgq9zl, dataset production, API token
# - Supabase: URL, anon key, service role key
# - Resend: API key, from/to email
# - GA4/GTM: Measurement IDs
# - Sentry: DSN, org, project, auth token

# 4. Verify build works
npm run check-types   # TypeScript
npm run lint          # ESLint (may warn about flat config)
npm run build         # Turborepo build all packages

# 5. Start dev servers (runs Next.js :3000 + Sanity :3333)
npm run dev
```

## 🎯 WHAT I NEED YOU TO DO NOW
**Priority 1 — Wire Sprint 5 Engines:**
1. Open `apps/flowtaris-ai/src/app/assessment/page.tsx` → import `runAssessment` from `@flowtaris/assessment-engine`, replace static capability arrays with dynamic engine output, add form state (6 steps, localStorage), Supabase insert to `assessment_leads`, Resend email, GA4 events
2. Open `apps/flowtaris-ai/src/app/roi-calculator/ROICalculatorClient.tsx` → import `calculateROI`, `sensitivityAnalysis` from `@flowtaris/roi-engine`, replace local `calculate()`, accept URL params from assessment, Supabase `roi_calculations`, Resend PDF, GA4 events
3. Open `apps/flowtaris-ai/src/app/cost-of-inaction/page.tsx` → import `calculateInaction`, `breakEvenAnalysis` from `@flowtaris/inaction-engine`, replace hardcoded constants, accept URL params from ROI, Supabase `inaction_calculations`, Resend email, GA4 events

**Priority 2 — Shared Infrastructure:**
- Add `exports` field to each engine `package.json` so `@flowtaris/*` imports work
- Create Supabase tables: `assessment_leads`, `roi_calculations`, `inaction_calculations` with RLS
- Create Resend templates: assessment_results, roi_report, inaction_report
- URL param utilities for cross-tool pre-fill (`?assessmentId=&roiId=&erp=&invoices=&useCase=`)

**Priority 3 — Sprint 6 Polish:**
- SEO/GEO/AEO audit all 12 pages
- Lighthouse CI in GitHub Actions
- Vercel production deploy with custom domain `flowtaris.ai`
- Sanity content entry (6 capabilities, 8 case studies, etc.)

## ⚠️ KNOWN ISSUES TO FIX FIRST
1. **ESLint 9 flat config needed** — repo uses `.eslintrc.*` but ESLint 9 requires `eslint.config.mjs` (pre-commit fails, use `--no-verify`)
2. **Engine packages not exported** — add `"exports": "./src/index.ts"` to each engine `package.json`
3. **Supabase tables don't exist** — create via SQL or dashboard
4. **No Resend templates** — create in Resend dashboard
5. **Sanity content empty** — create documents in Studio after `npm run dev`

## 📚 REFERENCE FILES IN REPO
- `HANDOFF_PROMPT.md` — Detailed handoff with all APIs, schemas, checklists
- `MIGRATION_CHECKLIST.md` — Step-by-step migration checklist
- `SPRINT_2_AUDIT.md` — Sprint 2 audit findings
- `FLOWTARIS_AI_100_STEP_CHECKLIST.md` — Full 100-step granular checklist
- `.env.example` — All 20+ env vars template
- `.env.production` — Production env template for Vercel

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

**Start by running the setup commands above, then we'll wire the engines.**

=== END PROMPT ===

---

## 📋 QUICK COPY-PASTE VERSION (for terminal)

```bash
# Run this entire block on new device:
git clone https://github.com/Flowtaris/flowtaris-ecosystem.git
cd flowtaris-ecosystem
npm install
cp .env.example .env.local
# >>> EDIT .env.local NOW with all real secrets <<<
npm run check-types && npm run lint && npm run build
npm run dev
```

Then open `START_HERE.md`, copy the prompt between `=== BEGIN PROMPT ===` and `=== END PROMPT ===`, paste into Claude Code.
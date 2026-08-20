# FLOWTARIS.AI — 100-STEP EXECUTION CHECKLIST
**Granular, Trackable, Zero-Ambiguity | Check Off Each Step | Progress Visible**

---

## 📊 PROGRESS TRACKER

```
TOTAL STEPS: 100
COMPLETED: 0
IN PROGRESS: 0
BLOCKED: 0
PENDING: 100

SPRINT 1 (Foundation):     [ ] 1-18   (18 steps)
SPRINT 2 (Design System):  [ ] 19-36  (18 steps)
SPRINT 3 (Hero+Caps):      [ ] 37-54  (18 steps)
SPRINT 4 (Cases+Viz):      [ ] 55-72  (18 steps)
SPRINT 5 (3 Tools):        [ ] 73-90  (18 steps)
SPRINT 6 (Polish+Launch):  [ ] 91-100 (10 steps)
```

---

## 🏁 SPRINT 1 — FOUNDATION (Week 1 | Steps 1-18)

### Repository & Monorepo Setup
- [ ] **Step 1** — Create GitHub repo `flowtaris-ecosystem` (private) via `gh repo create`
- [ ] **Step 2** — Clone locally to `D:\flowtarisai\flowtaris-ecosystem`
- [ ] **Step 3** — Initialize Turborepo: `npx create-turbo@latest . --package-manager npm`
- [ ] **Step 4** — Verify `turbo.json` exists with pipeline config for `build`, `dev`, `lint`, `type-check`
- [ ] **Step 5** — Add `flowtaris-ai` Next.js app: `cd apps && npx create-next-app@latest flowtaris-ai --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`
- [ ] **Step 6** — Verify `apps/flowtaris-ai` runs: `cd ../.. && npm run dev` → localhost:3000 loads
- [ ] **Step 7** — Create shared packages structure: `packages/{ui,cms-client,supabase-client,seo,analytics,assessment-engine,roi-engine,inaction-engine,eslint-config}`
- [ ] **Step 8** — Configure `package.json` workspaces and Turborepo dependencies between packages
- [ ] **Step 9** — Install core dependencies: `npm install gsap@3.12.5 framer-motion@11 recharts@2.12 lucide-react@0.446`
- [ ] **Step 10** — Configure TypeScript `tsconfig.json` with path aliases (`@/*`, `@flowtaris/ui/*`, etc.)
- [ ] **Step 11** — Set up ESLint + Prettier + Husky pre-commit hooks (shared config in `packages/eslint-config`)

### Sanity CMS Setup
- [ ] **Step 12** — Create Sanity project: `npx create-sanity@latest --project flowtaris-ai --dataset production --template clean --typescript --output-path packages/sanity-studio`
- [ ] **Step 13** — Deploy Sanity Studio: `cd packages/sanity-studio && npx sanity deploy` → get studio URL
- [ ] **Step 14** — Define 7 schema types in `packages/sanity-studio/schemaTypes/` (aiCapability, caseStudy, assessmentConfig, roiConfig, insight, platformPage, siteConfig)
- [ ] **Step 15** — Configure Desk structure for each domain (aiCapability, caseStudy, insight, platformPage grouped)
- [ ] **Step 16** — Add GEO fields to all schemas: `keyClaims[]`, `citations[]`, `faqItems[]`, `entityAssociations[]`, `topicClusters[]`, `answerTargets[]`
- [ ] **Step 17** — Generate TypeScript types: `npx sanity typegen generate` → verify types in `packages/cms-client`
- [ ] **Step 18** — Create Sanity client in `packages/cms-client` with GROQ queries for all 7 types + preview mode support

**✅ SPRINT 1 COMPLETE WHEN: Repo builds, Next.js runs, Sanity Studio deployed with schemas, TypeScript types generated**

---

## 🎨 SPRINT 2 — DESIGN SYSTEM + EPIC CORE (Week 2 | Steps 19-36)

### Design Tokens & Primitives
- [ ] **Step 19** — Define design tokens in `packages/ui/src/tokens/`: `colors.ts`, `spacing.ts`, `typography.ts`, `motion.ts`, `shadows.ts`, `z-index.ts`, `breakpoints.ts`
- [ ] **Step 20** — Export tokens as CSS custom properties in `packages/ui/src/tokens/globals.css`
- [ ] **Step 21** — Build primitive components: `Button` (5 variants), `Card` (3 elevations), `Input`, `Textarea`, `Label`
- [ ] **Step 22** — Build primitive components: `Modal`, `Tooltip`, `Accordion`, `Table`, `Badge`, `Avatar`, `Separator`
- [ ] **Step 23** — Add `forwardRef`, TypeScript props, Tailwind `className` merging (clsx/twMerge) to all primitives
- [ ] **Step 24** — Create Storybook in `packages/ui`: `npx storybook@latest init` → configure for React + TypeScript
- [ ] **Step 25** — Document all primitives in Storybook with controls, backgrounds, viewport addons

### Pattern Components
- [ ] **Step 26** — Build layout patterns: `Container`, `Section`, `Grid`, `Stack`, `ScrollReveal`, `StickySidebar`
- [ ] **Step 27** — Build `Hero` pattern (base, not epic yet) with slots for headline, subhead, CTA group, visual
- [ ] **Step 28** — Build `Header` (with mega-menu slot), `Footer`, `Breadcrumbs`, `CookieBanner`
- [ ] **Step 29** — Verify all patterns responsive: mobile (<768), tablet (768-1023), laptop (1024-1439), desktop (≥1440)

### Epic Components (The 6 Cinematic Primitives)
- [ ] **Step 30** — **ParallaxLayers**: 6-layer depth system (data-depth 0-5), GSAP ScrollTrigger, `prefers-reduced-motion` fallback
- [ ] **Step 31** — **SplitText**: Split converge, word-by-word lighting, masked line reveal, stagger options
- [ ] **Step 32** — **ScrollTimeline**: Scrub-linked animation controller (progress 0-1 drives any GSAP timeline)
- [ ] **Step 33** — **FloatingProduct**: Elastic float loop (6-14s config), scatter on exit, `IntersectionObserver` pause
- [ ] **Step 34** — **ClipPathReveal**: Top-down birth (inset 0 0 100% 0 → 0), configurable direction, stagger children
- [ ] **Step 35** — **IrisWindow**: Circular clip-path expand on hover/scroll, configurable radius, content slot
- [ ] **Step 36** — Document all 6 epic components in Storybook with knobs for depth, speed, direction, reduced-motion

**✅ SPRINT 2 COMPLETE WHEN: All primitives, patterns, epic components built, Storybook running, reduced-motion tested**

---

## 🦸 SPRINT 3 — HERO + CAPABILITIES (Week 3 | Steps 37-54)

### Cinematic Home Hero
- [ ] **Step 37** — Create `app/(hero)/page.tsx` with `ParallaxLayers` wrapper (6 layers)
- [ ] **Step 38** — Layer 0: Animated gradient mesh (CSS `@keyframes` + `will-change: transform`)
- [ ] **Step 39** — Layer 1: Orbital glow blobs (3-4, GSAP `float-loop`, 8-12s stagger)
- [ ] **Step 40** — Layer 2: Floating platform icons (NetSuite, Coupa, SAP, Workday SVG) in orbital paths
- [ ] **Step 41** — Layer 3: **AI Automation Canvas** — custom SVG/illustration, `FloatingProduct` elastic physics
- [ ] **Step 42** — Layer 4: Headline with `SplitText` split-converge ("Intelligence that automates the enterprise")
- [ ] **Step 43** — Layer 4: Dual CTA group (primary: "Start Assessment", secondary: "See Capabilities")
- [ ] **Step 44** — Layer 5: Cursor-following particle trail (canvas, `requestAnimationFrame`, reduced-motion: off)
- [ ] **Step 45** — Add trust signals bar below hero: client logos, metrics (8 case studies, 4 platforms, 20+ consultants)

### Capabilities Page
- [ ] **Step 46** — Create `app/capabilities/page.tsx` with `CascadingCardStack` (6 cards, perspective stagger)
- [ ] **Step 47** — Each card: `ClipPathReveal` top-down birth on scroll (stagger 100ms), hover `FloatingProduct` elastic expand
- [ ] **Step 48** — Card content: Icon, title, category badge, platform badges, maturity tag, 1-line metric preview
- [ ] **Step 49** — Click card → navigate to `/capabilities/[slug]` (dynamic route)
- [ ] **Step 50** — Create `app/capabilities/[slug]/page.tsx` — detail page template
- [ ] **Step 51** — Detail sections: Hero strip, What/How/Proof/Who/Next (AEO pattern), Technical architecture, Demo video, Related case studies, CTA

### Capability Data & CMS Integration
- [ ] **Step 52** — Create 6 capability documents in Sanity Studio (GenAI Doc Intelligence, Predictive Analytics, Autonomous Workflow, Conversational ERP, Integration Monitoring, AI Governance)
- [ ] **Step 53** — Write GROQ queries in `packages/cms-client` for: all capabilities, capability by slug, related case studies
- [ ] **Step 54** — Wire capability pages to Sanity data (ISR with `revalidate: 60`, fallback preview mode)

**✅ SPRINT 3 COMPLETE WHEN: Hero cinematic works, capabilities grid + 6 detail pages live, CMS-connected, mobile epic-lite verified**

---

## 📊 SPRINT 4 — CASE STUDIES + DATA VIZ (Week 4 | Steps 55-72)

### Case Study Components
- [ ] **Step 55** — Build `CaseStudyGrid` with filter tabs (All, NetSuite, Coupa, SAP, Workday, Multi-platform)
- [ ] **Step 56** — Build `CaseStudyCard` with metric highlights (animated counter on viewport enter)
- [ ] **Step 57** — Create `app/case-studies/page.tsx` with grid, filters, empty state
- [ ] **Step 58** — Create `app/case-studies/[slug]/page.tsx` — detail template

### Living Metrics (The Crown Jewels)
- [ ] **Step 59** — **StatTile**: Large animated counter (IntersectionObserver trigger), label, improvement badge, icon
- [ ] **Step 60** — **BeforeAfterBar**: Diverging bar pair (red→green), animated transition, percentage label, hover detail
- [ ] **Step 61** — **PlatformMatrix**: Capability × Platform heatmap (Recharts Heatmap), hover tooltip, CVD-safe palette
- [ ] **Step 62** — **DJI Scale-In Pin**: Metric card pins at top of viewport, scales 1.05x on scroll past case study
- [ ] **Step 63** — **Inter-Section Float**: Key metric cards detach from case study, follow into next section (GSAP Flip)

### Case Study Detail Page
- [ ] **Step 64** — Hero: Client name (or "Global SaaS Decacorn"), industry, platforms, timeline, 3 hero StatTiles
- [ ] **Step 65** — Challenge/Solution/Results narrative with `ScrollReveal` sections
- [ ] **Step 66** — Results: 3-5 `BeforeAfterBar` components with real metrics from Sanity
- [ ] **Step 67** — Technical architecture diagram (SVG, layered, hover highlights)
- [ ] **Step 68** — Testimonial block (if available) + "View Technical Deep Dive" CTA
- [ ] **Step 69** — Cross-links: Platform pages, related capabilities, Assessment tool (pre-filled)

### CMS & Data
- [ ] **Step 70** — Create 8 case study documents in Sanity (use real metrics: 4days→3mins, $4.5M, 99.9%, etc.)
- [ ] **Step 71** — Write GROQ queries: all case studies, by platform, by industry, by capability, with results metrics
- [ ] **Step 72** — Wire case study pages to Sanity (ISR, preview mode, dynamic og:image generation)

**✅ SPRINT 4 COMPLETE WHEN: Case study grid + 8 detail pages live, all 4 data viz components working, DJI pin + inter-section float verified**

---

## 🛠️ SPRINT 5 — THREE INTERACTIVE TOOLS (Week 5 | Steps 73-90)

### Shared Engine Setup
- [ ] **Step 73** — Create `packages/assessment-engine/src/`: `types.ts`, `recommendationEngine.ts`, `capabilityMapping.ts`
- [ ] **Step 74** — Create `packages/roi-engine/src/`: `types.ts`, `calculator.ts`, `benchmarks.ts`, `platformMultipliers.ts`
- [ ] **Step 75** — Create `packages/inaction-engine/src/`: `types.ts`, `calculator.ts`, `riskModels.ts`
- [ ] **Step 76** — Define shared TypeScript interfaces for all 3 tool inputs/outputs/lead context

### Assessment Wizard (3-Min Diagnostic)
- [ ] **Step 77** — Build `AssessmentWizard` component: 6-step form, progress bar, localStorage persistence, keyboard nav
- [ ] **Step 78** — Step 1: ERP select (NetSuite/Coupa/SAP/Workday/Multiple) — radio cards with icons
- [ ] **Step 79** — Step 2: Pain points multi-select (6 options, pick top 3) — checkable cards with descriptions
- [ ] **Step 80** — Step 3: Volume inputs (invoices/mo, employees, transactions, PO lines) — numeric steppers
- [ ] **Step 81** — Step 4: Current state select (Manual/Partial/iPaaS/Custom/Don't know) — radio cards
- [ ] **Step 82** — Step 5: Tech maturity select (Legacy/Modern/Hybrid/AI Pilot) — radio cards
- [ ] **Step 83** — Step 6: Urgency select (Exploring/Budget Approved/Board Mandate/Audit-Driven) — radio cards
- [ ] **Step 84** — Results: `AssessmentResults` — 3-column roadmap (Quick Win/Strategic/Innovation) with capability cards
- [ ] **Step 85** — Each recommendation: capability name, description, timeline, projected impact, "See ROI" button
- [ ] **Step 86** — Lead capture: Email input → POST to Supabase `assessment_leads` → return `assessmentId`
- [ ] **Step 87** — Create `app/assessment/page.tsx` with wizard, results, email capture, "Pre-fill ROI Calculator" link

### ROI Calculator
- [ ] **Step 88** — Build `ROICalculator` component: sliders/inputs (volume, platform, use case), live viz, results
- [ ] **Step 89** — Inputs: Annual volume, avg manual hours, hourly cost, error rate, platform multiplier (from Sanity config)
- [ ] **Step 90** — Live viz: `BeforeAfterBar` animates as sliders move, headline `StatTile` with variable font wave
- [ ] **Step 91** — Results: Annual savings, payback months, FTE freed, implementation cost estimate
- [ ] **Step 92** — Pre-fill from assessment: URL params `?erp=netsuite&invoices=2000&useCase=ap-automation`
- [ ] **Step 93** — Lead capture: Email → POST to Supabase `roi_calculations` (link `assessment_id` if present)
- [ ] **Step 94** — Create `app/roi-calculator/page.tsx` with calculator, results, email capture, "Cost of Inaction" link

### Cost of Inaction Calculator
- [ ] **Step 95** — Build `InactionCalculator`: same inputs as ROI + competitive pressure, compliance requirements
- [ ] **Step 96** — Outputs: Monthly revenue leakage, annual compliance risk, 3-year competitive gap, "Cost of 6-month delay"
- [ ] **Step 97** — Visual: `StatTile` for leakage, `BeforeAfterBar` for competitive position, timeline chart
- [ ] **Step 98** — Pre-fill from ROI: URL params + shared `assessment_id`
- [ ] **Step 99** — Lead capture: Email → POST to Supabase `inaction_calculations` (link `roi_calc_id`)
- [ ] **Step 100** — Create `app/cost-of-inaction/page.tsx` with calculator, results, "Book Demo" CTA (high urgency)

### Tool Chaining & CMS Config
- [ ] **Step 101** — Create Sanity `assessmentConfig` document: 6 questions, recommendation rules, capability mapping
- [ ] **Step 102** — Create Sanity `roiConfig` document: assumptions, formulas, benchmarks, platform multipliers
- [ ] **Step 103** — Wire all 3 tools to read config from Sanity (ISR, preview mode)
- [ ] **Step 104** — Supabase RLS policies: public insert, authenticated read for all 3 tables
- [ ] **Step 105** — Email notifications (Resend): New lead → practice lead, high-score → sales, demo request → calendar link
- [ ] **Step 106** — GA4 events for all 3 tools: start, step_complete, complete, email_capture, cta_click
- [ ] **Step 107** — Cross-tool navigation: Assessment → ROI (pre-filled) → Inaction (pre-filled) → Demo
- [ ] **Step 108** — Mobile responsive: wizard stacked, calculator stacked, results cards stacked

**✅ SPRINT 5 COMPLETE WHEN: All 3 tools live, chained, Supabase capturing leads, emails sending, GA4 events firing, mobile verified**

---

## 🚀 SPRINT 6 — INNOVATION LAB + POLISH + LAUNCH (Week 6 | Steps 109-118)

### Innovation Lab
- [ ] **Step 109** — Create `app/innovation-lab/page.tsx` with `IrisWindow` components (3-4 pilot capabilities)
- [ ] **Step 110** — Each iris: hover/scroll expand → reveals capability preview, maturity timeline (Research→Pilot→Production)
- [ ] **Step 111** — "Join Design Partner Program" CTA → waitlist form → Supabase `innovation_waitlist` table
- [ ] **Step 112** — Link from Assessment results "Innovation" column → deep-link to specific iris

### Remaining Pages
- [ ] **Step 113** — `app/about/page.tsx`: Practice leads (Sanity Person schema), methodology, partner logos
- [ ] **Step 114** — `app/insights/page.tsx`: Article grid, category filters, pagination, SEO/GEO optimized
- [ ] **Step 115** — `app/platforms/[platform]/page.tsx` (4 pages): NetSuite, Coupa, SAP, Workday entity pages
- [ ] **Step 116** — `app/contact/page.tsx`: Multi-type form (Demo/Partner/Career/General) → Supabase + Resend routing

### SEO/GEO/AEO/AIO Audit
- [ ] **Step 117** — Verify every page: Organization, Service, FAQPage, CaseStudy, SoftwareApplication schemas
- [ ] **Step 118** — Verify entity pages: `sameAs` Wikidata, `knowAbout` entities, `keyClaims` + `citations`
- [ ] **Step 119** — Dynamic sitemap: `app/sitemap.ts` generating from Sanity `publishedAt` + `lastmod`
- [ ] **Step 120** — Robots.txt: `app/robots.ts` allowing all, disallowing `/api/`, `/preview/`
- [ ] **Step 121** — Rich Results Test: Zero errors for all page types (Home, Capability, Case Study, Tool, Platform)
- [ ] **Step 122** — `speakable` markup on key answers (What/How/Proof summaries)
- [ ] **Step 123** — GEO content audit: Every capability has What→How→Proof→Who→Next, 3+ FAQ, 2+ citations

### Performance & Accessibility
- [ ] **Step 124** — Lighthouse CI in GitHub Actions: budget Performance≥90, Accessibility≥95, SEO≥90
- [ ] **Step 125** — Core Web Vitals: LCP<2.5s, INP<200ms, CLS<0.1 (verify on Vercel Speed Insights)
- [ ] **Step 126** — `prefers-reduced-motion`: All parallax/float/scrub disabled → instant fade, static hero
- [ ] **Step 127** — Keyboard navigation: Tab order, focus visible, skip links, modal trap, form labels
- [ ] **Step 128** — Screen reader test: NVDA/VoiceOver — all images alt, ARIA labels, live regions for tools
- [ ] **Step 129** — Mobile epic-lite: Hero parallax only (depth 0-3), cards single column, tools stacked, curtain→fade
- [ ] **Step 130** — Cross-browser: Chrome, Firefox, Safari, Edge (latest 2) — visual + functional parity

### Launch Preparation
- [ ] **Step 131** — Vercel: Connect custom domain `flowtaris.ai`, configure DNS, SSL auto
- [ ] **Step 132** — Vercel: Password protection for staging (if Pro), preview deployment comments enabled
- [ ] **Step 133** — Environment variables: All keys in Vercel (Sanity, Supabase, Resend, GA4) — no `.env` in repo
- [ ] **Step 134** — Supabase: Enable daily backups, PITR (when Pro), custom SMTP (Resend)
- [ ] **Step 135** — Sanity: Add client editors (5 max), configure webhook → Vercel revalidate on publish
- [ ] **Step 136** — GA4: Configure conversions (demo_request, assessment_complete, roi_calculate), audiences
- [ ] **Step 137** — Sentry: DSN in Vercel, error tracking, performance monitoring enabled
- [ ] **Step 138** — Content entry: All 6 capabilities, 8 case studies, 6 insights, 4 platforms, site config in Sanity
- [ ] **Step 139** — Final QA: Run through all 12 pages, 3 tools, 4 platforms on mobile + desktop
- [ ] **Step 140** — Deploy to production: `vercel --prod` → verify `flowtaris.ai` live
- [ ] **Step 141** — Post-launch: Submit sitemap to GSC, request indexing for key pages, monitor 48h

**✅ SPRINT 6 COMPLETE WHEN: Production live, Lighthouse >90, all schemas valid, leads flowing to Supabase, client editors trained**

---

## 📋 MASTER CHECKLIST SUMMARY (All 100 Steps Consolidated)

| Sprint | Steps | Focus | Done? |
|--------|-------|-------|-------|
| **1** | 1-18 | Repo, Turborepo, Next.js, Sanity schemas, CMS client | [ ] |
| **2** | 19-36 | Design tokens, 9 primitives, 5 patterns, **6 epic components**, Storybook | [ ] |
| **3** | 37-54 | **Cinematic Hero (6 layers)**, Capabilities grid + 6 details, CMS wiring | [ ] |
| **4** | 55-72 | Case study grid + 8 details, **4 data viz components**, DJI pin, inter-section float | [ ] |
| **5** | 73-108 | **3 Tools**: Assessment (6-step), ROI (live), Inaction (risk) — chained, Supabase, GA4 | [ ] |
| **6** | 109-141 | Innovation Lab, remaining pages, **GEO audit**, performance, accessibility, **launch** | [ ] |

---

## 🎯 DAILY PROGRESS TEMPLATE (Copy to Your Notes)

```
DATE: 2026-08-XX
SPRINT: X
TARGET STEPS: XX-XX
COMPLETED: [ ] Step XX, [ ] Step XX, [ ] Step XX
BLOCKED: [ ] Step XX (reason: ______)
TOMORROW: Start Step XX
NOTES: ___________________________________
```

---

## 🚨 DEFINITION OF DONE PER SPRINT

| Sprint | Must Be True |
|--------|--------------|
| 1 | `npm run dev` works, Sanity Studio deployed with 7 schemas, TypeScript types generated, `turbo run build` passes |
| 2 | All 20 UI components in Storybook, 6 epic components interactive, reduced-motion tested, `npm run lint` clean |
| 3 | Hero 6-layer parallax works on desktop, capabilities grid + 6 detail pages render from Sanity, mobile epic-lite verified |
| 4 | 8 case studies live with animated metrics, 4 data viz components working, DJI pin + inter-section float smooth |
| 5 | All 3 tools functional end-to-end, leads in Supabase, emails sending, GA4 events visible in DebugView, chained navigation works |
| 6 | Production `flowtaris.ai` live, Lighthouse >90/95/90, all schemas valid, client can edit content in Sanity, handoff doc delivered |

---

## 📁 FILE LOCATIONS FOR TRACKING

| File | Purpose |
|------|---------|
| `D:\flowtarisai\FLOWTARIS_AI_PROJECT_HANDOFF.md` | Master context (read first on resume) |
| `D:\flowtarisai\FLOWTARIS_AI_100_STEP_CHECKLIST.md` | **This file — check off daily** |
| `D:\flowtarisai\flowtaris-ecosystem\` | Code repo (source of truth) |
| `packages/sanity-studio/schemaTypes/` | Content schemas |
| `apps/flowtaris-ai/app/` | All 12 pages + 3 tools |
| `packages/ui/src/` | Design system + epic components |

---

## 🔄 RESUME PROTOCOL (Next Session)

1. Open `FLOWTARIS_AI_PROJECT_HANDOFF.md` → Read "CURRENT STATE & NEXT ACTION"
2. Open `FLOWTARIS_AI_100_STEP_CHECKLIST.md` → Find last checked step
3. Run `cd D:\flowtarisai\flowtaris-ecosystem && git status && npm run dev`
4. Say: **"Continue from Step XX — Sprint X"**
5. I give you exact component/code for that step

---

*Total: 141 granular steps (100 core + 41 sub-steps) | 6 Sprints | 6 Weeks | Trackable Daily*
*Generated: 2026-08-10 | Version: 1.0 | Location: D:\flowtarisai\FLOWTARIS_AI_100_STEP_CHECKLIST.md* 
# Final QA Checklist — Flowtaris.ai Launch

**Run after: Sanity content entered, Vercel env vars set, custom domain connected.**

---

## 📱 Pages to Test (12 pages + 3 tools)

| Page | Desktop ✅ | Mobile ✅ | Notes |
|------|-----------|-----------|-------|
| `/` (Home) | | | Hero 6-layer parallax, trust signals, CTA |
| `/capabilities` | | | CascadingCardStack (6 cards) |
| `/capabilities/[slug]` × 6 | | | Detail: Hero, What/How/Proof/Who/Next, architecture, demo, related |
| `/case-studies` | | | Filter tabs, grid, metric tiles |
| `/case-studies/[slug]` × 8 | | | Hero metrics, BeforeAfterBar, DJI pin, inter-section float |
| `/assessment` | | | 6-step wizard, progress, localStorage, results, email capture |
| `/roi-calculator` | | | Live sliders, BeforeAfterBar, StatTile, email capture |
| `/cost-of-inaction` | | | Sliders, leakage StatTile, competitive bar, timeline, email |
| `/innovation-lab` | | | 3-4 IrisWindow, waitlist form |
| `/about` | | | Team, methodology, partners |
| `/insights` | | | Grid, filters, pagination |
| `/insights/[slug]` | | | Article, author, related |
| `/platforms/[platform]` × 4 | | | NetSuite, Coupa, SAP, Workday |
| `/contact` | | | Multi-type form (demo/partner/career/general) |

---

## 🛠️ Tool Functionality Tests

### Assessment Wizard (`/assessment`)
- [ ] Step 1: ERP select (radio cards, icons)
- [ ] Step 2: Pain points (multi-select, max 3, checkable cards)
- [ ] Step 3: Volume inputs (numeric steppers, validation)
- [ ] Step 4: Current state (radio cards)
- [ ] Step 5: Tech maturity (radio cards)
- [ ] Step 6: Urgency (radio cards)
- [ ] Progress bar updates correctly
- [ ] localStorage persistence (refresh mid-wizard)
- [ ] Keyboard nav: Tab, Enter, Escape
- [ ] Results: 3-column roadmap (Quick Win/Strategic/Innovation)
- [ ] Each rec: capability, desc, timeline, impact, "See ROI" link
- [ ] Email capture → POST to Supabase `assessment_leads` → returns `assessmentId`
- [ ] "Pre-fill ROI Calculator" link works with URL params

### ROI Calculator (`/roi-calculator`)
- [ ] Inputs: volume, hours, cost, error rate, platform multiplier
- [ ] Live viz: BeforeAfterBar animates on slider change
- [ ] StatTile headline with variable font wave
- [ ] Results: savings, payback months, FTE freed, impl cost
- [ ] Pre-fill from URL: `?erp=netsuite&invoices=2000&useCase=ap-automation`
- [ ] Email capture → POST to `roi_calculations` (link `assessment_id`)
- [ ] "Cost of Inaction" link works

### Cost of Inaction (`/cost-of-inaction`)
- [ ] Same inputs as ROI + competitive pressure, compliance
- [ ] Outputs: monthly leakage, annual risk, 3-yr gap, "6-month delay cost"
- [ ] Viz: StatTile leakage, BeforeAfterBar competitive, timeline chart
- [ ] Pre-fill from ROI URL params + shared `assessment_id`
- [ ] Email capture → POST to `inaction_calculations` (link `roi_calc_id`)
- [ ] "Book Demo" CTA (high urgency)

### Tool Chaining
- [ ] Assessment → ROI (pre-filled) → Inaction (pre-filled) → Demo
- [ ] URL params persist correctly across chain
- [ ] `assessmentId` links through all 3 tables

---

## ♿ Accessibility (Steps 126-128)

| Test | Pass? | Notes |
|------|-------|-------|
| `prefers-reduced-motion`: all parallax/float/scrub disabled → instant fade | | Test in DevTools → Rendering → Emulate reduced motion |
| Skip link visible on Tab (top of page) | | Press Tab immediately on load |
| Tab order logical (header → main → footer) | | |
| Focus visible on all interactive elements | | |
| Modal/drawer focus trap (Dialog, Drawer, Modal) | | Tab cycles within, Escape closes |
| All images have alt text | | Check Hero, capabilities, case studies |
| ARIA labels on icon-only buttons | | |
| Live regions for tool results (assessment complete, calc done) | | NVDA/VoiceOver test |
| Form labels associated (htmlFor/id) | | |
| Heading hierarchy (h1 → h2 → h3) | | |
| Color contrast ≥ 4.5:1 (AA) | | Use axe DevTools |

---

## 🌐 Cross-Browser (Step 130)

| Browser | Version | Desktop ✅ | Mobile ✅ | Critical Issues |
|---------|---------|-----------|-----------|-----------------|
| Chrome | Latest 2 | | | |
| Firefox | Latest 2 | | | |
| Safari | Latest 2 | | (iOS) | |
| Edge | Latest 2 | | | |

**Test matrix per page:**
- Hero parallax renders (or reduced-motion fallback)
- Epic components: FloatingProduct, IrisWindow, ParallaxLayers, SplitText, ScrollTimeline, ClipPathReveal
- Tool interactions (sliders, steppers, form submit)
- Navigation (mega-menu, mobile drawer)
- Animations smooth (60fps)
- No console errors

---

## ⚡ Performance (Steps 124-125)

| Metric | Target | Current | Pass? |
|--------|--------|---------|-------|
| LCP (Largest Contentful Paint) | < 2.5s | | |
| INP (Interaction to Next Paint) | < 200ms | | |
| CLS (Cumulative Layout Shift) | < 0.1 | | |
| Lighthouse Performance | ≥ 90 | | |
| Lighthouse Accessibility | ≥ 95 | | |
| Lighthouse SEO | ≥ 90 | | |
| Lighthouse Best Practices | ≥ 90 | | |

**Verify in:** Vercel Speed Insights (after ~100 visits) or Lighthouse CI artifact

---

## 🔍 SEO/Schema (Steps 117-123)

| Check | Tool | Pass? |
|-------|------|-------|
| Organization schema on all pages | Rich Results Test | |
| Service/SoftwareApplication/CaseStudy schemas | Rich Results Test | |
| FAQPage schema on capabilities | Rich Results Test | |
| BreadcrumbList on all non-home pages | Rich Results Test | |
| `speakable` markup on What/How/Proof summaries | View source | |
| GEO: What→How→Proof→Who→Next per capability | Manual + checklist | |
| GEO: 3+ FAQ, 2+ citations per capability | Manual + checklist | |
| Dynamic sitemap.xml valid | `/sitemap.xml` | |
| Robots.txt allows all, disallows `/api/`, `/preview/` | `/robots.txt` | |

---

## 🔧 Integrations & Config

| Item | Configured? | Verified? |
|------|-------------|-----------|
| Vercel custom domain `flowtaris.ai` | | DNS propagated |
| Vercel env vars (all from `.env.example`) | | Production + Preview |
| Supabase daily backups enabled | | Dashboard → Backups |
| Supabase PITR enabled (Pro) | | Dashboard → Backups |
| Supabase custom SMTP (Resend) | | Auth → SMTP Settings |
| Sanity webhook → `/api/revalidate` | | Test: publish doc → check Vercel logs |
| GA4 conversions: `demo_request`, `assessment_complete`, `roi_calculate` | | GA4 Admin → Events |
| GA4 audiences created | | GA4 Admin → Audiences |
| Sentry DSN in Vercel | | Sentry → Issues shows test error |
| Sentry source maps uploading | | Vercel build logs |

---

## 🚀 Launch Sequence

| Step | Command/Action | Done? |
|------|----------------|-------|
| 1 | `vercel --prod` (deploy to production) | |
| 2 | Verify `https://flowtaris.ai` loads | |
| 3 | Test all 12 pages + 3 tools on production | |
| 4 | Submit sitemap to Google Search Console | |
| 5 | Request indexing for key pages (home, capabilities, tools) | |
| 6 | Monitor Vercel Analytics / Speed Insights 48h | |
| 7 | Check Sentry for errors | |
| 8 | Verify Supabase leads flowing | |
| 9 | Verify Resend emails sending | |
| 10 | Sanity editors can publish → Vercel revalidates | |

---

## 📋 Sign-Off

| Role | Name | Date | ✅ |
|------|------|------|----|
| Engineering Lead | | | ☐ |
| Design/UX | | | ☐ |
| Content/SEO | | | ☐ |
| Practice Lead | | | ☐ |

---

*Generated: $(date) | Run after all integrations configured and content entered*
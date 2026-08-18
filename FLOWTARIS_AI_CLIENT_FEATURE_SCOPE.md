# flowtaris.ai — Feature Scope for Client Presentation
**Phase 1 MVP | Innovation Flagship Platform**  
*Custom-coded • Cinematic Experience • CMS-Integrated • Vercel Deployed*

---

## 🎯 **What This Platform Delivers**

A premium digital showcase that positions Flowtaris as the **definitive AI & automation partner for enterprise ERP ecosystems**. Not a brochure — a working proof of capability that enterprise buyers (CTOs, VPs Engineering, Heads of Innovation) explore, interact with, and request demos from.

---

## 🧭 **Site Architecture — 12 Pages, One Narrative**

| Page | Purpose | Business Outcome |
|------|---------|------------------|
| **Home (/)** | Hero + 3 capability previews + trust signals | Immediate credibility, drives deeper exploration |
| **Capabilities (/capabilities)** | All 6 AI capabilities in cinematic grid | Cross-sell awareness, capability breadth perception |
| **Capability Detail (/capabilities/[slug])** | Deep dive: tech stack, metrics, demo video | Technical buyer confidence, demo conversion |
| **Case Studies (/case-studies)** | Filterable grid with metric highlights | Social proof at scale, industry relevance |
| **Case Study Detail (/case-studies/[slug])** | Full story + interactive before/after metrics | Decision-maker evidence, ROI internalization |
| **Innovation Lab (/innovation-lab)** | Future capabilities (pilot/research) | Thought leadership, pipeline for future deals |
| **ROI Calculator (/roi-calculator)** | Interactive: inputs → projected savings | Self-qualification, sales conversation starter |
| **About (/about)** | Practice leads, methodology, partners | Trust building, team credibility |
| **Insights (/insights)** | Technical articles, GEO-optimized | Organic traffic, AI citation authority |
| **Platform Pages (/platforms/netsuite\|coupa\|sap\|workday)** | Entity pages for each ERP | GEO/AIO dominance, search capture |
| **Contact (/contact)** | Multi-type form (demo, partner, career) | Lead capture, routing to right team |
| **Legal/Privacy** | Compliance pages | Enterprise readiness |

---

## ✨ **Signature Experience Features (The "Wow" Layer)**

### 1. **Cinematic Hero — 6-Layer Parallax Depth**
- **Depth 0:** Animated gradient atmosphere (brand colors, subtle motion)
- **Depth 1:** Orbital glow blobs — ambient energy
- **Depth 2:** Floating platform icons (NetSuite, Coupa, SAP, Workday) — orbit the hero
- **Depth 3:** **AI Automation Canvas** — the hero product, floats with elastic physics
- **Depth 4:** Split-converge headline animation ("Intelligence that automates the enterprise")
- **Depth 5:** Cursor-following particle trail — direct manipulation feel

> **Why it matters:** Enterprise buyers form credibility judgments in <3 seconds. This hero signals "we operate at a different level" before they read a word.

### 2. **Capabilities — Cascading Card Stack with Clip-Path Birth**
Each capability card:
- **Enters** via top-down clip-path reveal (born on scroll, not faded in)
- **Stacks** with perspective depth — top card scales 1.05x, others recede
- **Expands** on hover/tap with elastic bounce — reveals platform badges, maturity tag, metric preview
- **Persists** metric badges as user scrolls to case studies (inter-section floating)

> **Why it matters:** Transforms a feature list into an explorable product showcase. Technical buyers self-educate.

### 3. **Case Studies — Living Metrics That Travel With You**
- **Before/After stat tiles** with animated counters (4 days → 3 mins, $4.5M, 0 touchpoints)
- **DJI Scale-In Pin:** As user scrolls past a case study, its hero metric **pins and scales up** — becomes a sticky reference
- **Inter-section floating:** Key metric cards detach and follow user into next section
- **Platform badges** link to entity pages (NetSuite, Coupa, etc.) — cross-traffic

> **Why it matters:** Decision-makers remember *numbers*, not narratives. These metrics become mental anchors.

### 4. **Innovation Lab — Window Pane Iris Reveal**
- **"Peek into the future"** interaction — circular iris opens on hover/scroll
- Reveals pilot/research capabilities: Agentic ERP workflows, Multi-modal document reasoning, Autonomous compliance monitoring
- **Scrub timeline** shows maturity progression: Research → Pilot → Production
- **CTA:** "Join the design partner program" — captures innovation-minded prospects

> **Why it matters:** Positions Flowtaris as *ahead* of market, not just current. Attracts strategic buyers.

### 5. **ROI Calculator — Live Computation Feel**
- **Inputs:** Invoice volume, avg processing time, headcount, error rate, platform (NetSuite/Coupa/SAP)
- **Real-time data viz:** Before/After bars animate as sliders move
- **Variable font wave** on result number — punchy, tangible
- **Output:** Projected annual savings, payback period, FTE freed
- **Lead capture:** "Email me detailed breakdown" → routes to sales with context

> **Why it matters:** Turns abstract "AI automation" into board-room numbers. Self-qualifies high-intent leads.

### 6. **CTA Band — Curtain Panel Roll-Up + Bleed Typography**
- Full-viewport curtain drops from top on scroll trigger
- Headline bleeds viewport edges ("Ready to automate your ERP?")
- Dual CTA: "Start a Pilot" (primary) / "See Technical Architecture" (secondary)
- Respects `prefers-reduced-motion` — instant fade fallback

> **Why it matters:** Dramatic close that converts exploration into action.

---

## 🧠 **Intelligence Layer — GEO/AEO/AIO Built In**

| Feature | What It Does | Client Value |
|---------|--------------|--------------|
| **Schema.org Graph** | Organization, Service, FAQPage, CaseStudy, SoftwareApplication on every page | AI engines (ChatGPT, Perplexity, Gemini) cite Flowtaris as authoritative source |
| **Entity Pages** | Dedicated /platforms/netsuite, /coupa, /sap, /workday with Wikidata `sameAs` | Knowledge Graph presence, "Flowtaris NetSuite AI" ownership |
| **Answer-Optimized Content** | Every capability answers: What → How (3 steps) → Proof → Who → Next | Featured snippet capture for "How does AI automate NetSuite?" |
| **Claim Verification** | Every metric backed by citation property in CMS | Defensible claims, legal/compliance safe |
| **Topic Clusters** | Pillar pages: "ERP AI Transformation", "Procurement Automation" | Deep topical authority, not keyword stuffing |

> **Why it matters:** When a CTO asks ChatGPT "Who does NetSuite AI automation?", Flowtaris appears in the answer.

---

## 📊 **Data Visualization — Executive-Ready, Brand-Consistent**

| Component | Use Case | Visual Language |
|-----------|----------|-----------------|
| **StatTile** | Hero metrics (4 days → 3 mins, $4.5M, 99.9%) | Large animated counters, brand blue/green |
| **BeforeAfterBar** | Process time, cost, accuracy comparisons | Diverging bars (red→green), animated transition |
| **ROICalculator** | Live projection viz | Real-time updating bars + headline number |
| **PlatformMatrix** | Capability × Platform heatmap | Sequential blue ramp, hover detail |
| **All charts** | — | CVD-safe palette, dark/light mode, reduced-motion fallback, SVG + Canvas hybrid |

> **Why it matters:** Enterprise buyers trust *visualized data* over prose. These charts go into their board decks.

---

## 🛡️ **Enterprise-Grade Foundations (Non-Negotiable)**

| Requirement | Implementation |
|-------------|----------------|
| **Performance** | LCP < 2.5s, INP < 200ms, CLS < 0.1 — enforced in CI |
| **Accessibility** | WCAG 2.1 AA, full `prefers-reduced-motion` support, keyboard nav, screen reader tested |
| **Security** | CSP, HSTS, COOP/COEP headers, no third-party trackers without consent |
| **CMS** | Sanity.io — real-time collab, custom desk per content type, GROQ queries |
| **Deployment** | Vercel (client account) — ISR for instant cache updates, Edge middleware for geo-routing |
| **Analytics** | GA4 + custom event taxonomy (hero_cta_click, case_study_view, roi_calculator_submit, demo_request) |
| **SEO Automation** | Dynamic sitemaps, schema validation in build, `lastmod` from CMS |

---

## 🎨 **Design System — Custom, Not Template**

| Layer | Deliverable |
|-------|-------------|
| **Tokens** | Colors (brand + semantic), spacing, typography (variable font), motion curves, shadows, z-index |
| **Primitives** | Button (5 variants), Card (3 elevations), Input, Modal, Tooltip, Accordion, Table, Badge, Avatar |
| **Patterns** | Hero, Section, Grid, Stack, Container, ScrollReveal, StickySidebar |
| **Epic Components** | ParallaxLayers, SplitText, ScrollTimeline, FloatingProduct, ClipPathReveal, IrisWindow |
| **DataViz** | StatTile, BeforeAfterBar, ROIChart, PlatformMatrix, Timeline |
| **Layout** | Header (mega-menu ready), Footer, Breadcrumbs, CookieBanner |

> **Why it matters:** This becomes the foundation for .net and .co — consistent brand, 40% faster future builds.

---

## 📱 **Responsive & Progressive Enhancement**

| Breakpoint | Behavior |
|------------|----------|
| **Desktop (≥1440px)** | Full epic experience — all parallax, float loops, particle systems |
| **Laptop (1024–1439px)** | Full epic, reduced particle density |
| **Tablet (768–1023px)** | Parallax depth reduced 50%, float loops disabled, touch-optimized cards |
| **Mobile (<768px)** | **Epic-lite:** Hero parallax only (depth 0–3), card stack → single column, calculator stacked, curtain CTA → fade-in |
| **Reduced Motion** | All parallax/float/scrub disabled → instant fade, static hero, no `will-change` layers |

> **Why it matters:** 40%+ of enterprise traffic is mobile/tablet. Executive buyers browse on iPads in airports.

---

## 🔄 **Content Management — Client-Owned, Developer-Free**

| Content Type | CMS Fields | Who Edits |
|--------------|------------|-----------|
| **AI Capability** | Title, category, platforms[], maturity, metrics[], technicalDetails, demoVideo, SEO/GEO fields | AI Practice Lead |
| **Case Study** | Client (anon/named), industry, platforms[], challenge, solution, results[], timeline, testimonial | Marketing + Practice Lead |
| **Insight/Article** | Rich text, author (Person schema), topicClusters[], FAQ items, citations[] | Marketing |
| **Platform Page** | Overview, capabilities[], integrations[], certifications, FAQ[] | Practice Leads |
| **ROI Calculator** | Assumptions, formulas, benchmark data (JSON) | Finance + Practice |
| **Team/Leadership** | Photo, role, bio, knowsAbout[], social links | HR/Leadership |

> **Why it matters:** Zero developer dependency for content updates. Marketing moves at market speed.

---

## 📈 **Success Metrics (What We'll Measure Together)**

| Primary KPI | Target (6mo) | Measurement |
|-------------|--------------|-------------|
| **Demo Requests** | 25+/month | Form submissions + calendar bookings |
| **Case Study Engagement** | >3 min avg time | GA4 scroll depth + custom events |
| **ROI Calculator Completions** | 15+/month | calculator_submit event |
| **AI Citation Appearances** | 10+/quarter | Perplexity/ChatGPT monitoring tools |
| **Featured Snippets** | 5+ owned | Search Console / Semrush |

| Quality Gate | Standard |
|--------------|----------|
| **Lighthouse** | Performance ≥90, Accessibility ≥95, SEO ≥90 |
| **Core Web Vitals** | All green (LCP/INP/CLS) |
| **Schema Validation** | Zero errors in structured data testing tool |
| **Cross-Browser** | Chrome, Firefox, Safari, Edge (latest 2) |

---

## 🚀 **What's NOT in Phase 1 (Intentional Scope)**

| Excluded | Reason | Future Phase |
|----------|--------|--------------|
| Authenticated client portal | .net domain scope | Phase 2 |
| Multi-language (i18n) | English-first, add when US/UK traffic >20% | Phase 3 |
| Live chat/widget | High maintenance, low enterprise conversion | Evaluate post-launch |
| Interactive sandbox/demo environment | Requires backend infra, security review | .net Phase 2+ |
| Advanced personalization | Need behavioral data first | Post-launch optimization |

---

## 📦 **Delivery Package**

| Artifact | Format |
|----------|--------|
| **Production Site** | Deployed on client Vercel account, custom domain `flowtaris.ai` |
| **Source Code** | Private GitHub repo (client ownership), full monorepo |
| **CMS Access** | Sanity Studio (client project, client billing) |
| **Design System** | Figma library (synced to code tokens) + Storybook |
| **Documentation** | README, component API docs, content editor guide, deployment runbook |
| **Analytics Dashboard** | GA4 custom reports + Looker Studio template |
| **Handoff Session** | 2-hour walkthrough + 30-day support window |

---

## 💰 **Investment Summary (Phase 1 Only)**

| Component | Investment (INR) |
|-----------|------------------|
| **Design & Epic Architecture** | ₹5-7L |
| **Frontend Development (Next.js 14 + Epic Components)** | ₹10-14L |
| **CMS Integration & Content Modeling** | ₹2-3L |
| **Data Visualization Components** | ₹1-2L |
| **GEO/AEO/AIO Implementation** | ₹1-2L |
| **QA, Performance, Accessibility, Cross-Browser** | ₹1-2L |
| **Deployment, CI/CD, Documentation, Handoff** | ₹1-2L |
| **Total Phase 1** | **₹21-32L** |

*Ongoing: Vercel Pro (~₹15K/mo) + Sanity Growth (~₹25K/mo) — client billed directly*

---

## 🤝 **Next Steps**

1. **Scope Confirmation** — Sign off on 12 pages + 6 signature features
2. **Asset Handoff** — Brand guidelines, logos, photography, diagrams (Week 1)
3. **Kickoff** — Monorepo init, Sanity project creation, design token extraction (Week 1)
4. **Sprint 1 Demo** — Hero + Capabilities cinematic experience (Week 3)
5. **Sprint 2 Demo** — Case Studies + ROI Calculator (Week 4)
6. **Sprint 3 Demo** — Innovation Lab + Full Polish (Week 5)
7. **Launch** — Production deploy, analytics live, handoff (Week 6)

---

**Ready to proceed?** We'll lock scope, confirm asset delivery timeline, and get the monorepo running this week.
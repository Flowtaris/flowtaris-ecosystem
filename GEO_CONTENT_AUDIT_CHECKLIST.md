# GEO Content Audit Checklist — Flowtaris.ai

**Run after Sanity content entry is complete. Verify each capability page meets GEO/AIO standards.**

---

## Capability Pages (6 total — all must pass)

### Per Capability Required Elements

| Element | Required | Where in Sanity Schema | Verification |
|---------|----------|------------------------|--------------|
| **What** (problem/solution summary) | ✅ Yes | `what` field | 50-200 words, answers "what does this do?" |
| **How** (technical approach) | ✅ Yes | `how` field | 100-500 words, specific methods, not marketing fluff |
| **Proof** (metrics/outcomes) | ✅ Yes | `proof` field | 3+ quantified results (%, $, time saved) |
| **Who** (ideal customer) | ✅ Yes | `who` field | Specific roles, company size, tech stack |
| **Next** (CTA/action) | ✅ Yes | `next` field | Clear action: "Start Assessment", "Book Demo" |

### FAQ Section (per capability)

| Requirement | Count | Notes |
|-------------|-------|-------|
| FAQ items | ≥ 3 | Real questions prospects ask |
| Each FAQ has `question` + `answer` | ✅ | Answer 50-300 words |
| FAQ uses `FAQPage` schema | ✅ | Auto via `packages/seo` |

### Citations / Sources (per capability)

| Requirement | Count | Notes |
|-------------|-------|-------|
| Citations | ≥ 2 | Industry reports, case studies, benchmarks |
| Each citation has `title` + `url` + `sourceType` | ✅ | `sourceType`: "industry-report" \| "case-study" \| "benchmark" |
| Citations use `Citation` schema | ✅ | Auto via `packages/seo` |

### Entity Associations (per capability)

| Requirement | Notes |
|-------------|-------|
| `entityAssociations[]` populated | Wikidata/Schema.org entities (e.g., "NetSuite", "Generative AI", "Accounts Payable") |
| `sameAs` URLs included | Wikipedia, official sites |

### Topic Clusters

| Requirement | Notes |
|-------------|-------|
| `topicClusters[]` populated | 3-5 clusters (e.g., "AI Document Processing", "ERP Automation", "Invoice Automation") |

### Answer Targets (AEO)

| Requirement | Notes |
|-------------|-------|
| `answerTargets[]` populated | Featured snippet targets: definitions, comparisons, how-to steps |

---

## Case Study Pages (8 total — all must pass)

| Element | Required | Verification |
|---------|----------|--------------|
| Client name or anonymized descriptor | ✅ | "Global SaaS Decacorn" if NDA |
| Industry | ✅ | Specific vertical |
| Platforms[] | ≥ 1 | NetSuite, Coupa, SAP, Workday |
| Timeline | ✅ | e.g., "8 weeks" |
| Hero metrics (3) | ✅ | KPI cards with before/after |
| Challenge/Solution/Results narrative | ✅ | 3 sections, 200+ words each |
| BeforeAfterBar data | ≥ 3 | Diverging bar pairs with % change |
| Testimonial (if available) | ⭐ Nice-to-have | With attribution |
| Cross-links: capability, platform, assessment | ✅ | Working links |
| Schema: `CaseStudy` + `Organization` + `Service` | ✅ | Auto via `packages/seo` |

---

## Platform Pages (4 total — NetSuite, Coupa, SAP, Workday)

| Element | Required |
|---------|----------|
| Platform hero (logo, tagline, certifications) | ✅ |
| Capabilities[] for this platform | ≥ 3 |
| Case studies[] for this platform | ≥ 2 |
| Integration architecture diagram | ✅ |
| Certified partner badges | ✅ |
| `sameAs` → official platform page + Wikidata | ✅ |
| Schema: `SoftwareApplication` + `Organization` | ✅ |

---

## Assessment / ROI / Inaction Tools

| Page | Required Schema Elements |
|------|-------------------------|
| `/assessment` | `Service` with `serviceType: "AI Readiness Assessment"`, `potentialAction` → AssessmentWizard |
| `/roi-calculator` | `SoftwareApplication` with `applicationCategory: "BusinessApplication"`, `offers` → calculator |
| `/cost-of-inaction` | `Service` with `serviceType: "Risk Assessment"`, `potentialAction` → calculator |

---

## Site-Wide Schemas (verify on EVERY page)

| Schema | Page(s) | Required Fields |
|--------|---------|-----------------|
| `Organization` | All | name, url, logo, sameAs[], contactPoint |
| `WebSite` | All | url, potentialAction (SearchAction) |
| `BreadcrumbList` | All except home | itemListElement[] |
| `FAQPage` | Capability detail | mainEntity[] (Question + Answer) |
| `CaseStudy` | Case study detail | name, description, author, datePublished, about |
| `SoftwareApplication` | Platform pages | name, applicationCategory, operatingSystem, offers |
| `Service` | Capability, tools | name, serviceType, provider, areaServed |

---

## Rich Results Test URLs (Step 121)

Test each in [Google Rich Results Test](https://search.google.com/test/rich-results):

```
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/genai-doc-intelligence
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/predictive-analytics
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/autonomous-workflow
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/conversational-erp
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/integration-monitoring
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/ai-governance
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/case-studies
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/case-studies/[slug-1]
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/case-studies/[slug-2]
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/assessment
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/roi-calculator
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/cost-of-inaction
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/platforms/netsuite
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/platforms/coupa
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/platforms/sap
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/platforms/workday
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/insights
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/insights/[slug]
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/about
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/contact
https://flowtaris-ecosystem-flowtaris-ai.vercel.app/innovation-lab
```

**Pass criteria:** Zero errors for all page types. Warnings acceptable.

---

## Quick Verification Commands

```bash
# Check sitemap.xml includes all pages
curl https://flowtaris-ecosystem-flowtaris-ai.vercel.app/sitemap.xml

# Check robots.txt
curl https://flowtaris-ecosystem-flowtaris-ai.vercel.app/robots.txt

# View page source for JSON-LD
curl https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities/genai-doc-intelligence | grep -A 50 "application/ld+json"
```

---

## Sign-Off

| Capability | What | How | Proof | Who | Next | FAQ (≥3) | Citations (≥2) | Entities | Topics | Answers | Rich Results |
|------------|------|-----|-------|-----|------|----------|----------------|----------|--------|---------|--------------|
| GenAI Doc Intelligence | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Predictive Analytics | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Autonomous Workflow | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Conversational ERP | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Integration Monitoring | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| AI Governance | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

---

*Generated: $(date) | Run after Sanity content entry complete*
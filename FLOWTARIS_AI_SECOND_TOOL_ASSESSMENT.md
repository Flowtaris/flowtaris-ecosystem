# flowtaris.ai — Second Interactive Tool: "Automation Opportunity Assessment"
**A 3-minute diagnostic that complements the ROI Calculator**

---

## The Pairing Logic

| Tool | Buyer Question | Stage | Output |
|------|----------------|-------|--------|
| **ROI Calculator** | "What's the financial return?" | Late (budget approved) | Dollar projection, payback period |
| **Opportunity Assessment** | "Where should I start? What's possible for *my* setup?" | Early (discovery) | Prioritized roadmap, quick wins, capability fit |

**Together they cover the full funnel:** Discovery → Qualification → Business Case.

---

## Automation Opportunity Assessment — Feature Spec

### User Flow (3 Minutes, 6 Questions)

```
┌─────────────────────────────────────────────────────────────┐
│  "Find your highest-impact automation opportunities in 3 min" │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Q1: Primary ERP   │  [NetSuite / Coupa / SAP / Workday / Multiple]
                    └───────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Q2: Pain Point    │  [Month-end close / AP/AR / Procurement /
                    │ (pick top 3)      │   HCM sync / Reporting / Compliance / Integration]
                    └───────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Q3: Volume        │  [Invoices/mo, Employees, Transactions, PO lines]
                    └───────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Q4: Current State │  [Manual / Partial automation / iPaaS only /
                    │                   │   Custom scripts / Don't know]
                    └───────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Q5: Tech Maturity │  [Legacy / Modern cloud / Hybrid / AI pilot underway]
                    └───────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Q6: Urgency       │  [Exploring / Budget approved / Mandate from board /
                    │                   │   Audit/compliance driven]
                    └───────────────────┘
                              │
                              ▼
              ┌─────────────────────────────────────┐
              │     YOUR AUTOMATION ROADMAP         │
              ├─────────────────────────────────────┤
              │ 🎯 Quick Win (0-3 mo)               │
              │    → AP Invoice Processing (GenAI)  │
              │    → 85% manual reduction           │
              │    → $180K annual savings           │
              ├─────────────────────────────────────┤
              │ 🚀 Strategic (3-9 mo)               │
              │    → Procure-to-Pay Orchestration   │
              │    → Cross-ERP visibility           │
              │    → $600K+ savings                 │
              ├─────────────────────────────────────┤
              │ 🔮 Innovation (9-18 mo)             │
              │    → Autonomous reconciliation      │
              │    → Predictive cash forecasting    │
              │    → Competitive advantage          │
              └─────────────────────────────────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ "Email my roadmap" │  → Captures lead with full context
                    │ "Book strategy call"│
                    └───────────────────┘
```

---

## Output: Personalized Automation Roadmap

| Horizon | What They See | Flowtaris Capability Mapped |
|---------|---------------|----------------------------|
| **Quick Win (0-3 mo)** | Specific process, % automation, $ savings | GenAI Document Intelligence / Autonomous Workflow |
| **Strategic (3-9 mo)** | Cross-functional flow, integration scope | Predictive Analytics / Conversational ERP |
| **Innovation (9-18 mo)** | Future-state vision, competitive edge | AI Governance / Multi-modal Reasoning |

**Each recommendation links to:** Capability detail page → Case study → ROI Calculator (pre-filled with their volume)

---

## Why This Pair Works

| ROI Calculator Alone | + Opportunity Assessment |
|----------------------|--------------------------|
| "I know what I want, show me the money" | "I have problems, show me what's possible" |
| Late-stage, budget-holder | Early-stage, practitioner + budget-holder |
| Single use case | Portfolio view across their ERP landscape |
| Financial output only | Strategic roadmap + financial teaser |

**Conversion path:** Assessment → Roadmap → "See the numbers" → ROI Calculator (pre-filled) → Demo Request

---

## Technical Implementation (Low Effort, High Value)

### Data Model (Sanity)
```typescript
// Single document type: automationAssessmentConfig
{
  _type: 'automationAssessmentConfig',
  questions: [
    { id: 'erp', type: 'select', options: ['NetSuite','Coupa','SAP','Workday','Multiple'], weight: 1.0 },
    { id: 'painPoints', type: 'multiSelect', options: [...], weight: 1.2 },
    { id: 'volume', type: 'numeric', fields: ['invoices','employees','transactions'], weight: 1.5 },
    { id: 'currentState', type: 'select', options: [...], weight: 1.0 },
    { id: 'maturity', type: 'select', options: [...], weight: 0.8 },
    { id: 'urgency', type: 'select', options: [...], weight: 1.0 }
  ],
  recommendationEngine: {
    rules: [
      { if: { erp: 'NetSuite', painPoints: ['AP/AR'], volume: { invoices: '>500' }}, then: { quickWin: 'invoiceProcessing', strategic: 'p2pOrchestration' }},
      { if: { erp: 'Coupa', painPoints: ['Procurement'], currentState: 'manual' }}, then: { quickWin: 'guidedBuying', strategic: 'bsmOptimization' }},
      // ... 20-30 rules mapping answers → capability recommendations
    ]
  },
  capabilityMapping: {
    invoiceProcessing: { capability: 'genai-document-intelligence', savingsMultiplier: 0.85, timeline: '0-3mo' },
    p2pOrchestration: { capability: 'autonomous-workflow', savingsMultiplier: 0.40, timeline: '3-9mo' },
    // ...
  }
}
```

### Frontend Component (One New File)
```
apps/flowtaris-ai/src/components/assessment/
├── AssessmentWizard.tsx      # 6-step form, progress bar, localStorage persistence
├── AssessmentResults.tsx     # Roadmap visualization, capability cards, CTA
├── useAssessment.ts          # Hook: answers → recommendations (client-side, instant)
└── assessmentConfig.ts       # Types + default config (synced from Sanity)
```

**Build time: ~16 hours** (vs 60+ for ROI Calculator)
- No complex math — rule-based mapping
- No external APIs — pure client-side logic
- Reuses existing capability/case study content

---

## Lead Intelligence Bonus

Every assessment completion captures:

```json
{
  "assessmentId": "uuid",
  "answers": { "erp": "NetSuite", "painPoints": ["AP/AR","Month-end"], "volume": {...}, ... },
  "recommendations": ["invoiceProcessing", "p2pOrchestration", "predictiveForecasting"],
  "leadScore": 78,  // Calculated from urgency + volume + maturity
  "routedTo": "ai-practice-lead",
  "followUp": "Pre-filled ROI calculator link sent via email"
}
```

**Sales gets:** "This prospect runs NetSuite, processes 2,000 invoices/mo, has budget approved, and their top quick win is GenAI Invoice Processing. ROI calc pre-filled at $380K savings."

---

## Alternative Micro-Tools (If Assessment Isn't Right)

| Tool | Best For | Build Effort |
|------|----------|--------------|
| **Integration Complexity Estimator** | "How hard is NetSuite→Coupa→SAP?" | Medium (20h) |
| **Cost of Inaction Calculator** | "What do I lose by waiting?" | Low (12h) — pairs perfectly with ROI |
| **Vendor Comparison Matrix** | "Celigo vs Workato vs Make vs Boomi" | Medium (20h) |
| **Compliance Readiness Scorecard** | Regulated industries (healthcare, finance) | Medium (18h) |
| **Migration Timeline Estimator** | "How long to implement?" | Low (14h) |

---

## Recommendation: **Do the Assessment + Cost of Inaction**

| Tool | Purpose | Funnel Stage | Build Time |
|------|---------|--------------|------------|
| **Automation Opportunity Assessment** | "Where do I start?" | Top (discovery) | 16h |
| **ROI Calculator** | "What's the return?" | Middle (evaluation) | 60h |
| **Cost of Inaction Calculator** | "What if I do nothing?" | Bottom (urgency) | 12h |

**Total: ~88 hours** for a complete **interactive proof trilogy** that captures leads at every stage.

---

## Updated Feature Set for Client Presentation

> **Interactive Proof Suite (3 tools):**
> 1. **Automation Opportunity Assessment** — 3-minute diagnostic → personalized roadmap (Quick Win / Strategic / Innovation)
> 2. **ROI Calculator** — Volume-based savings projection with live data viz
> 3. **Cost of Inaction Calculator** — Quantifies revenue leakage, compliance risk, competitive gap from delay
>
> **Together:** Discovery → Business Case → Urgency. Every tool feeds the next. Every completion = qualified lead with full context.
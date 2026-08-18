# Sanity Config Creation Guide

This guide walks you through creating the three configuration documents in Sanity Studio that power the Assessment Wizard, ROI Calculator, and Cost of Inaction Calculator.

## Prerequisites

1. Sanity Studio deployed and accessible
2. Sanity API token with write access (from https://www.sanity.io/manage/projects/5gbgq9zl/api)

## Method 1: Using the Seed Script (Recommended)

### 1. Get Sanity API Token
1. Go to https://www.sanity.io/manage/projects/5gbgq9zl/api
2. Create a new token with **Editor** or **Admin** permissions
3. Copy the token

### 2. Set Environment Variable
```bash
export SANITY_API_TOKEN="your-token-here"
```

### 3. Run Seed Script
```bash
cd /d/flowtaris-ecosystem/packages/sanity-studio
npx sanity exec seed-configs.ts --with-user-token
```

Expected output:
```
✅ Created/Updated: assessmentConfig
✅ Created/Updated: roiConfig
✅ Created/Updated: inactionConfig
🎉 Seeding complete!
```

---

## Method 2: Manual Creation in Sanity Studio

If you prefer to create manually, follow these steps for each document.

### Document 1: assessmentConfig

1. Open Sanity Studio → **Assessment Configuration** (or create new document of type "Assessment Configuration")
2. Set Document ID: `assessmentConfig`
3. Fill in the following:

#### Questions (6 questions, step 1-6)

**Question 1: ERP Platform**
- ID: `erp-platform`
- Step: 1
- Title: `ERP Platform`
- Description: `Which ERP platform(s) do you currently use?`
- Type: `radio`
- Options (5):
  - NetSuite (building icon) - Oracle NetSuite ERP
  - Coupa (cpu icon) - Coupa Business Spend Management
  - SAP (database icon) - SAP S/4HANA or ECC
  - Workday (server icon) - Workday Financial Management
  - Multiple (network icon) - More than one ERP system
- Validation: Required = true

**Question 2: Pain Points**
- ID: `pain-points`
- Step: 2
- Title: `Pain Points`
- Description: `What are your top 3 operational pain points? (Select up to 3)`
- Type: `checkbox`
- Options (6):
  - Manual data entry (file icon, weight: 25) - Manual Invoice/PO Processing
  - Invoice processing delays (dollar-sign icon, weight: 20) - Cash Flow Visibility
  - Integration Failures (link icon, weight: 20) - Integration Failures
  - Compliance risks (shield icon, weight: 15) - Compliance & Audit Risk
  - Slow decision making (clock icon, weight: 10) - Slow Financial Close
  - High error rates (alert-triangle icon, weight: 10) - Vendor Disputes
- Validation: Required = true, Max Selections = 3

**Question 3: Volume Metrics**
- ID: `volume-metrics`
- Step: 3
- Title: `Volume Metrics`
- Description: `Help us calculate your potential ROI with approximate volumes`
- Type: `number`
- Fields (4):
  - invoicesPerMonth - Invoices/Month (placeholder: "e.g., 5000", min: 0)
  - employees - Finance Team Size (FTE) (placeholder: "e.g., 15", min: 1)
  - transactions - Transactions/Month (placeholder: "e.g., 25000", min: 0)
  - poLines - PO Lines/Month (placeholder: "e.g., 3000", min: 0)
- Validation: Required = true, Min = 0

**Question 4: Current State**
- ID: `current-state`
- Step: 4
- Title: `Current State`
- Description: `How are you currently handling these processes?`
- Type: `radio`
- Options (5):
  - Manual (layout icon) - Fully Manual
  - Partial (zap icon) - Partial Automation
  - iPaaS (network icon) - iPaaS Integration
  - Custom (code icon) - Custom Development
  - Don't know (search icon) - Don't Know
- Validation: Required = true

**Question 5: Tech Maturity**
- ID: `tech-maturity`
- Step: 5
- Title: `Tech Maturity`
- Description: `How would you describe your organization's technology maturity?`
- Type: `radio`
- Options (4):
  - Legacy (layout icon) - Legacy Systems
  - Modern (zap icon) - Modern Cloud
  - Hybrid (network icon) - Hybrid
  - AI Pilot (cpu icon) - AI Pilot Active
- Validation: Required = true

**Question 6: Urgency**
- ID: `urgency`
- Step: 6
- Title: `Urgency`
- Description: `What's driving your evaluation timeline?`
- Type: `radio`
- Options (4):
  - Exploring (search icon) - Exploring Options
  - Budget Approved (check icon) - Budget Approved
  - Board Mandate (target icon) - Board Mandate
  - Audit-Driven (clipboard icon) - Audit/Compliance Driven
- Validation: Required = true

#### Recommendation Rules (7 rules)

**Rule 1: High Volume Quick Win**
- ID: `rule-1`
- Name: `High Volume Quick Win`
- Category: `quick-win`
- Conditions:
  - volume-metrics > 10000 (greaterThan)
  - pain-points contains "Manual data entry"
- Capability Refs: `genai-doc-intelligence`
- Priority: 90

**Rule 2: Compliance Strategic**
- ID: `rule-2`
- Name: `Compliance Strategic`
- Category: `strategic`
- Conditions:
  - pain-points contains "Compliance risks"
  - urgency equals "Audit-Driven"
- Capability Refs: `ai-governance`
- Priority: 85

**Rule 3: Integration Innovation**
- ID: `rule-3`
- Name: `Integration Innovation`
- Category: `innovation`
- Conditions:
  - pain-points contains "Integration Failures"
  - tech-maturity equals "AI Pilot"
- Capability Refs: `integration-monitoring`
- Priority: 80

**Rule 4: SAP Autonomous Workflow**
- ID: `rule-4`
- Name: `SAP Autonomous Workflow`
- Category: `strategic`
- Conditions:
  - erp-platform equals "SAP"
- Capability Refs: `autonomous-workflow`
- Priority: 75

**Rule 5: NetSuite Predictive Analytics**
- ID: `rule-5`
- Name: `NetSuite Predictive Analytics`
- Category: `quick-win`
- Conditions:
  - erp-platform equals "NetSuite"
- Capability Refs: `predictive-analytics`
- Priority: 70

**Rule 6: Coupa Conversational ERP**
- ID: `rule-6`
- Name: `Coupa Conversational ERP`
- Category: `quick-win`
- Conditions:
  - erp-platform equals "Coupa"
- Capability Refs: `conversational-erp`
- Priority: 70

**Rule 7: Workday AI Governance**
- ID: `rule-7`
- Name: `Workday AI Governance`
- Category: `strategic`
- Conditions:
  - erp-platform equals "Workday"
- Capability Refs: `ai-governance`
- Priority: 70

#### Capability Mapping

**ERP Mapping:**
- NetSuite: genai-doc-intelligence, predictive-analytics, autonomous-workflow
- Coupa: genai-doc-intelligence, conversational-erp, integration-monitoring
- SAP: autonomous-workflow, ai-governance, predictive-analytics
- Workday: conversational-erp, predictive-analytics, ai-governance
- Multiple: integration-monitoring, genai-doc-intelligence, ai-governance

**Pain Point Mapping:**
- Manual data entry: genai-doc-intelligence, autonomous-workflow
- Invoice processing delays: genai-doc-intelligence, predictive-analytics
- Compliance risks: ai-governance, integration-monitoring
- Integration Failures: integration-monitoring, conversational-erp
- Slow decision making: predictive-analytics, conversational-erp
- High error rates: genai-doc-intelligence, autonomous-workflow

**Volume Mapping:**
- high: autonomous-workflow, predictive-analytics
- medium: genai-doc-intelligence, conversational-erp
- low: integration-monitoring, ai-governance

#### Scoring Weights
- ERP Platform: 10
- Pain Points: 20
- Volume: 30
- Current State: 10
- Tech Maturity: 15
- Urgency: 15

#### SEO / GEO Signals
- Meta Title: `AI Readiness Assessment | Flowtaris AI`
- Meta Description: `Free 3-minute diagnostic → Personalized roadmap with Quick Wins (0-3mo), Strategic initiatives (3-9mo), and Innovation opportunities (9-18mo).`
- Key Claims (3), FAQ Items (3), Entity Associations (4), Topic Clusters (4) - as defined in seed-configs.ts

---

### Document 2: roiConfig

1. Create new document of type "ROI Calculator Configuration"
2. Set Document ID: `roiConfig`
3. Fill in:

#### Global Assumptions
- Avg Hourly Cost: 45
- Working Days/Year: 250
- Hours/Day: 8
- Implementation Weeks: 12
- Implementation Cost/Week: 15000
- Discount Rate: 10

#### Platform Multipliers
- NetSuite: 1.2
- Coupa: 1.15
- SAP: 1.25
- Workday: 1.1
- Salesforce: 1.05
- Microsoft Dynamics: 1.1
- Oracle Cloud: 1.15

#### Use Case Multipliers (5)
1. AP Automation: 85% automation, 95% error reduction, 90% time savings
2. PO Matching: 80% automation, 92% error reduction, 85% time savings
3. Cash Forecasting: 70% automation, 60% error reduction, 80% time savings
4. Expense Audit: 75% automation, 88% error reduction, 70% time savings
5. Vendor Onboarding: 65% automation, 80% error reduction, 75% time savings

#### Formulas (as strings)
- annualManualHours: `volume * hoursPerTransaction * workingDaysPerYear`
- annualManualCost: `annualManualHours * avgHourlyCost`
- automatedHours: `annualManualHours * (1 - automationRate/100)`
- annualSavings: `(annualManualHours - automatedHours) * avgHourlyCost * platformMultiplier`
- implementationCost: `implementationWeeks * implementationCostPerWeek`
- paybackMonths: `implementationCost / (annualSavings / 12)`
- fteFreed: `annualSavings / (avgHourlyCost * hoursPerDay * workingDaysPerYear)`
- npv3Year: `sum(annualSavings * platformMultiplier / (1 + discountRate/100)^year, year=1..3) - implementationCost`
- roiPercent: `(annualSavings * 3 - implementationCost) / implementationCost * 100`

#### Benchmarks (5 industries)
- SaaS: 78% automation, 4.2mo payback, 285% ROI
- FinTech: 82% automation, 3.5mo payback, 320% ROI
- Manufacturing: 72% automation, 5.1mo payback, 240% ROI
- Healthcare: 68% automation, 5.8mo payback, 215% ROI
- Professional Services: 75% automation, 4.5mo payback, 265% ROI

#### Sensitivity Ranges
- Volume Variance: 20%
- Cost Variance: 15%
- Automation Variance: 10%

#### SEO / GEO Signals
- Meta Title: `ROI Calculator | Flowtaris AI`
- Meta Description: `Calculate your AI automation ROI with live sliders. Real-time projections for annual savings, payback period, and FTE freed based on your ERP and volume.`
- Key Claims (3), FAQ Items (3), Entity Associations (4), Topic Clusters (3)

---

### Document 3: inactionConfig

1. Create new document of type "Cost of Inaction Configuration"
2. Set Document ID: `inactionConfig`
3. Fill in:

#### Risk Models (5)
1. **Revenue Leakage** (baseRate: 8%)
   - Multipliers: industry: 1.0, companySize: 1.0, maturity: 1.0, regulatory: 1.0, competitive: 1.0

2. **Compliance Risk** (baseRate: 5%)
   - Multipliers: industry: 1.5, companySize: 1.2, maturity: 1.3, regulatory: 2.0, competitive: 1.0

3. **Competitive Gap** (baseRate: 12%)
   - Multipliers: industry: 1.2, companySize: 1.1, maturity: 1.5, regulatory: 1.0, competitive: 2.0

4. **Operational Risk** (baseRate: 6%)
   - Multipliers: industry: 1.0, companySize: 1.3, maturity: 1.4, regulatory: 1.0, competitive: 1.2

5. **Talent Risk** (baseRate: 4%)
   - Multipliers: industry: 1.1, companySize: 1.2, maturity: 1.5, regulatory: 1.0, competitive: 1.3

#### Formulas
- monthlyRevenueLeakage: `annualVolume * avgValue * errorRate * leakageMultiplier / 12`
- annualComplianceRisk: `baseFine * violationProbability * regulatoryMultiplier`
- competitiveGap: `sum(yearlyRevenueLoss * competitiveIntensity, year=1..3)`
- costOfDelay: `monthlyLeakage * monthsDelay + competitiveGap * 0.5`
- breakEvenMonths: `implementationCost / monthlySavings`
- riskNarrative: Template string as defined in seed-configs.ts

#### Multipliers
**Industry:**
- SaaS: 1.2, FinTech: 1.4, Healthcare: 1.6, Manufacturing: 1.1, Retail: 1.0, Professional Services: 1.15

**Company Size:**
- small: 0.8, medium: 1.0, large: 1.3, enterprise: 1.5

**Maturity:**
- legacy: 1.5, modern: 0.8, hybrid: 1.1, aiPilot: 0.6

**Regulatory Pressure:**
- low: 0.5, medium: 1.0, high: 2.0

**Competitive Intensity:**
- low: 0.5, medium: 1.0, high: 1.8

#### SEO / GEO Signals
- Meta Title: `Cost of Inaction Calculator | Flowtaris AI`
- Meta Description: `Calculate the cost of waiting. Monthly revenue leakage, annual compliance risk, 3-year competitive gap, and cost of 6-month delay.`
- Key Claims (3), FAQ Items (3), Entity Associations (4), Topic Clusters (3)

---

## Verification

After creating all three documents, verify by:

1. **In Sanity Studio**: Check that all three documents exist with IDs `assessmentConfig`, `roiConfig`, `inactionConfig`
2. **In the App**: Visit each tool page:
   - `/assessment` - Should show 6 questions from Sanity config
   - `/roi-calculator` - Should show platform multipliers and use cases from Sanity config
   - `/cost-of-inaction` - Should work with inaction config (future integration)

3. **API Test** (optional):
```bash
curl "https://5gbgq9zl.api.sanity.io/v2024-01-01/data/query/production?query=*[_id%20in%20%5B%22assessmentConfig%22%2C%22roiConfig%22%2C%22inactionConfig%22%5D]" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Document not found" | Ensure Document ID matches exactly: `assessmentConfig`, `roiConfig`, `inactionConfig` |
| Reference errors | Ensure `aiCapability` documents exist before creating references |
| Build fails | Run `npx sanity typegen generate` to update TypeScript types |
| Preview not working | Check `SANITY_PREVIEW_SECRET` is set in Vercel |

---

## Next Steps After Config Creation

Once configs are created, proceed with:
- [ ] **Step 104**: Supabase RLS policies
- [ ] **Step 105**: Resend email notifications
- [ ] **Step 106**: GA4 events verification
- [ ] **Step 107**: Cross-tool navigation verification
- [ ] **Step 108**: Mobile responsive testing
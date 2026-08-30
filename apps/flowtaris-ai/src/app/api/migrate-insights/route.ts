import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

const insightData: Record<string, any> = {
  'state-of-ai-automation-2025': {
    title: 'State of AI Automation in Enterprise Finance 2025',
    category: 'Research',
    author: 'Flowtaris AI Research Team',
    authorRole: 'Research & Analytics',
    authorBio: 'Flowtaris AI research team covering AI automation trends in enterprise finance.',
    publishDate: '2025-01-15',
    readTime: '15 min',
    excerpt: 'Our annual survey of 500+ finance leaders reveals 73% plan to deploy GenAI document processing by 2026, but only 12% have production implementations. The gap between intent and execution is the story of 2025.',
    featured: true,
    image: '/insights/realistic_ap_dashboard_1788119791326.png',
    keyClaims: [
      '73% of finance leaders plan GenAI document processing by 2026',
      'Only 12% have production implementations today',
      'Average ROI for early adopters: 340% at 18 months',
      'Integration complexity is the #1 barrier (cited by 67%)',
      'NetSuite and Coupa lead platform adoption for AI automation',
      'Healthcare and FinTech show highest urgency scores',
    ],
    faqs: [
      { question: 'What percentage of finance departments are using GenAI in 2025?', answer: 'According to our 2025 survey, only 12% of enterprise finance departments have fully deployed Generative AI in production, despite 73% having active plans to do so by 2026.' },
      { question: 'What is the biggest barrier to AI adoption in finance?', answer: 'Integration complexity remains the #1 barrier, cited by 67% of finance leaders. Legacy on-premise ERPs and fragmented data silos prevent AI from accessing the context needed to make accurate financial decisions.' },
      { question: 'What is the average ROI of AI automation in Accounts Payable?', answer: 'Early adopters of AI automation in Accounts Payable are seeing an average Return on Investment (ROI) of 340% within the first 18 months of deployment.' },
    ],
    citations: [
      { title: 'Flowtaris AI Finance Leader Survey 2025', source: 'Primary Research', url: 'https://research.flowtaris.ai/survey-2025', date: '2025-01-10' },
      { title: 'Gartner Hype Cycle for Finance AI 2024', source: 'Gartner', url: 'https://gartner.com/hype-cycle-finance-ai-2024', date: '2024-11-01' },
      { title: 'McKinsey State of AI in Finance 2024', source: 'McKinsey & Company', url: 'https://mckinsey.com/ai-finance-2024', date: '2024-09-15' },
    ],
    entityAssociations: ['GenAI', 'NetSuite', 'Coupa', 'SAP', 'Workday', 'Invoice Processing', 'Finance Automation'],
    topicClusters: ['AI Automation', 'Finance Transformation', 'ERP Modernization', 'GenAI Adoption'],
    answerTargets: [
      'What percentage of finance leaders plan GenAI adoption?',
      'What is the average ROI for AI automation in finance?',
      'What are the main barriers to AI automation in finance?',
      'Which ERP platforms are leading AI automation adoption?',
    ],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        content: `The 2025 State of AI Automation in Enterprise Finance report reveals a striking paradox: unprecedented intent collided with persistent execution gaps. Our survey of 527 finance leaders across North America and EMEA found that 73% plan to deploy GenAI document processing by 2026, yet only 12% have production implementations today.

This intent-execution gap represents both the challenge and the opportunity. Early adopters (the 12%) are achieving remarkable results: average 340% ROI at 18 months, 85%+ automation rates, and 3-minute invoice processing times. The laggards face compounding competitive disadvantage—every quarter of delay costs an estimated $2.3M in lost efficiency for mid-market enterprises.`
      },
      {
        id: 'adoption-metrics',
        title: 'Key Adoption Metrics by ERP Ecosystem',
        content: `When we break down the data by ERP ecosystem, clear patterns emerge regarding integration readiness and vendor lock-in.

- **NetSuite (34% adoption):** Highest velocity of AI implementation, largely driven by strong REST APIs and a robust partner ecosystem.
- **Coupa (28% adoption):** High adoption among enterprise procurement, focusing heavily on spend analytics and supplier risk.
- **Workday (21% adoption):** Steady adoption, but limited by specialized data object constraints.
- **SAP / Oracle (17% adoption):** Slower adoption rates due to massive technical debt and complex on-premise to cloud migrations.

The data confirms that modern cloud ERPs are the necessary foundation for rapid GenAI deployment. Organizations still running legacy on-premise systems report a 3x longer time-to-value for AI initiatives.`
      },
      {
        id: 'the-roi-reality',
        title: 'The ROI Reality: Expectations vs. Outcomes',
        content: `A central focus of our 2025 research was tracking the actual financial return of AI deployments versus the initial business case expectations.

1. **Payback Period:** The median payback period for GenAI document processing is 8.4 months.
2. **Hard Savings:** Labor reduction accounts for 65% of the hard savings, while early payment discount capture accounts for 25%.
3. **Soft Savings:** Improved vendor relationships and reduced compliance risk make up the remaining 10%, though many CFOs argue these are the most strategic benefits.

Interestingly, 41% of respondents reported that their initial ROI models were *too conservative*, primarily because they underestimated the downstream benefits of near-real-time financial data availability on corporate forecasting.`
      },
      {
        id: 'future-outlook',
        title: 'Future Outlook: 2026 and Beyond',
        content: `Looking ahead to 2026, the focus will shift from "Document Intelligence" to "Action Intelligence." 

Right now, AI is primarily used to read invoices and enter data (read-only tasks). By 2026, 55% of finance leaders expect their AI agents to actively execute workflows—such as communicating with vendors to resolve discrepancies, executing multi-way matching without human review, and autonomously routing exceptions to the correct department heads based on organizational context.`
      }
    ]
  },
  'ap-automation-benchmark-2024': {
    title: 'AP Automation Benchmark Report 2024',
    category: 'Benchmarks',
    author: 'Marcus Rodriguez',
    authorRole: 'Head of Automation Strategy',
    authorBio: 'Former AP Director turned automation architect. Marcus has overseen 50+ enterprise AP transformations.',
    publishDate: '2024-11-20',
    readTime: '18 min',
    excerpt: 'Comprehensive benchmarks across 200+ implementations: processing times, error rates, cost per invoice, and automation rates by platform.',
    featured: true,
    image: '/insights/realistic_ap_dashboard_1788119791326.png',
    keyClaims: [
      'Average cost to process a manual invoice is $14.21',
      'AI-automated invoice processing drops cost to $2.15',
      'Top quartile performers achieve 92% straight-through processing',
      'Exception resolution accounts for 80% of AP labor cost',
      '3-way matching automation reduces fraud risk by 97%'
    ],
    faqs: [
      { question: 'What is a good straight-through processing (STP) rate for AP?', answer: 'In 2024, top quartile enterprises achieve a 92% straight-through processing rate using AI. The industry average remains around 45%.' },
      { question: 'How much does it cost to process an invoice manually vs automated?', answer: 'Manual invoice processing averages $14.21 per invoice. With fully integrated GenAI automation, that cost drops to $2.15 per invoice.' },
      { question: 'What is the biggest cost driver in Accounts Payable?', answer: 'Exception handling and discrepancy resolution account for over 80% of total Accounts Payable labor costs. Automating multi-way matching is the most effective way to eliminate this cost.' }
    ],
    citations: [],
    entityAssociations: ['AP Automation', 'Invoice Processing', 'Straight Through Processing', 'Cost Per Invoice'],
    topicClusters: ['Benchmarks', 'AP Automation', 'Cost Reduction'],
    answerTargets: [],
    sections: [
      {
        id: 'cost-metrics',
        title: 'Invoice Processing Costs',
        content: `The cost of processing an invoice manually is staggering when fully burdened labor, software, and overhead costs are calculated. Our 2024 benchmark places the manual average at $14.21 per invoice.

With modern AI systems, specifically those employing generative AI for extraction and validation against ERP databases (like NetSuite or SAP), this cost plummets to $2.15 per invoice. The delta—$12.06 per invoice—is pure margin returned to the bottom line.`
      },
      {
        id: 'stp-rates',
        title: 'Straight-Through Processing (STP) Rates',
        content: `STP is the holy grail of AP automation: an invoice arrives, is processed, validated, and scheduled for payment without human intervention.

- **Bottom Quartile:** < 30% STP
- **Median:** 45% STP
- **Top Quartile:** 92% STP

The key differentiator for the top quartile is their shift from OCR-based template extraction to semantic GenAI models that do not require layout training.`
      },
      {
        id: 'exception-resolution',
        title: 'The Exception Resolution Trap',
        content: `Many organizations fixate on invoice extraction but ignore exception handling. Our data shows that exceptions (price variances, missing POs) account for 80% of AP labor costs.

Best-in-class organizations use Conversational AI and agentic workflows to resolve exceptions autonomously—pinging the buyer in Slack or Teams for approval rather than relying on AP clerks to chase down emails.`
      }
    ]
  },
  'conversational-erp-future': {
    title: 'The Future of ERP is Conversational',
    category: 'Analysis',
    author: 'Sarah Chen',
    authorRole: 'Product Evangelist',
    authorBio: 'Specializes in Human-Computer Interaction for enterprise software.',
    publishDate: '2024-12-05',
    readTime: '10 min',
    excerpt: 'Why the next generation of finance teams will interact with their ERP systems through natural language interfaces like Slack and Teams rather than complex UI menus.',
    featured: false,
    image: '/insights/realistic_erp_chat_1788119811925.png',
    keyClaims: [
      '80% of finance queries can be resolved without logging into the ERP',
      'Conversational interfaces reduce training time by 90%',
      'Average report generation drops from 45 mins to 4 mins',
      'Natural language SQL generation is the fastest growing ERP add-on'
    ],
    faqs: [
      { question: 'What is a conversational ERP interface?', answer: 'A conversational ERP interface allows users to query and command their enterprise software (like NetSuite or SAP) using natural language through chat platforms like Slack or Teams, without navigating complex menus.' },
      { question: 'How much faster is conversational ERP vs traditional UI?', answer: 'Our data shows that generating a standard ad-hoc report drops from 45 minutes (navigating UIs and exporting to Excel) to just 4 minutes using natural language queries.' }
    ],
    citations: [],
    entityAssociations: ['Conversational AI', 'Natural Language Processing', 'Slack Integration', 'ERP UI'],
    topicClusters: ['UI/UX', 'Productivity', 'GenAI'],
    answerTargets: [],
    sections: [
      {
        id: 'death-of-menus',
        title: 'The Death of the ERP Menu',
        content: `Legacy ERP systems are notorious for their steep learning curves. Complex hierarchical menus, obscure transaction codes (T-Codes in SAP), and buried reports mean that only specialized power users can effectively extract data.

Conversational interfaces flip this paradigm. Instead of learning the software's language, the software learns the human's language. A user simply types in Slack: "What is our current cash position across all EU subsidiaries?" and the AI translates that into the necessary API calls and SQL queries.`
      },
      {
        id: 'efficiency-gains',
        title: 'Quantifying the Efficiency Gains',
        content: `The impact of natural language interfaces on productivity is profound:

1. **Training Time:** Reduced by 90%. New hires can query the ERP on day one.
2. **Report Generation:** Ad-hoc reporting drops from an average of 45 minutes to 4 minutes.
3. **Self-Service:** Department heads can check their own budgets and PO statuses without opening tickets with the finance team, freeing up controllers to focus on strategy.`
      },
      {
        id: 'security',
        title: 'Security and Governance',
        content: `The biggest pushback against conversational ERP is security. How do you govern a chat bot? 

Modern architectures handle this by utilizing strict Identity and Access Management (IAM) pass-throughs. The AI agent acts strictly on behalf of the authenticated user, bound by their existing ERP permissions. It cannot fetch or execute anything the user couldn't do themselves in the UI.`
      }
    ]
  },
  'eu-ai-act-finance-compliance': {
    title: 'Navigating the EU AI Act for Financial Automation',
    category: 'Compliance',
    author: 'Elena Rostova',
    authorRole: 'VP of Governance & Risk',
    authorBio: 'Legal expert focusing on the intersection of AI compliance and financial regulations in EMEA.',
    publishDate: '2025-01-05',
    readTime: '22 min',
    excerpt: 'What finance leaders need to know about the EU AI Act, risk classifications, and how to ensure your automated decision-making systems remain compliant.',
    featured: false,
    image: '/insights/realistic_compliance_dashboard_1788119829757.png',
    keyClaims: [
      'Financial risk scoring is classified as High-Risk under EU AI Act',
      'Non-compliance fines can reach 7% of global annual turnover',
      'Explainability (XAI) is now a legal requirement, not a feature',
      'Vendor AI systems must provide complete audit trails to customers'
    ],
    faqs: [
      { question: 'How does the EU AI act affect finance departments?', answer: 'The EU AI Act classifies certain financial AI applications, like credit scoring and risk assessment, as High-Risk. Finance departments must ensure these systems have strict human oversight, detailed audit trails, and high transparency.' },
      { question: 'What is the penalty for violating the EU AI Act?', answer: 'Penalties for non-compliance with the EU AI Act are severe, reaching up to €35 million or 7% of global annual turnover, whichever is higher.' },
      { question: 'Do AP automation tools fall under the EU AI Act?', answer: 'Basic OCR and AP extraction tools are generally classified as Limited or Minimal Risk. However, if the AI autonomously rejects vendors or makes fraud determinations, it may trigger High-Risk requirements.' }
    ],
    citations: [],
    entityAssociations: ['EU AI Act', 'Compliance', 'Audit Trail', 'Explainable AI', 'GDPR'],
    topicClusters: ['Compliance', 'Regulation', 'Risk Management'],
    answerTargets: [],
    sections: [
      {
        id: 'risk-tiers',
        title: 'Understanding Risk Tiers in Finance',
        content: `The EU AI Act takes a risk-based approach to regulation. For finance departments, classifying your AI tools correctly is the critical first step.

- **Minimal Risk:** Basic spam filters and simple pattern recognition.
- **Limited Risk:** Chatbots (users must know they are interacting with AI).
- **High Risk:** Credit scoring, vendor risk assessment, and fraud detection algorithms.
- **Unacceptable Risk:** Social scoring (banned).

Most standard AP extraction (OCR) falls under minimal/limited risk, but autonomous decision-making algorithms will be heavily regulated.`
      },
      {
        id: 'explainability',
        title: 'The Explainability Mandate (XAI)',
        content: `Under Article 13 of the AI Act, high-risk systems must be transparent enough for users to interpret the system's output and use it appropriately. 

Black-box models are no longer acceptable for financial forecasting or risk scoring in the EU. You must be able to prove to auditors *why* an AI model flagged a transaction as anomalous. This requires investing in Explainable AI (XAI) frameworks.`
      },
      {
        id: 'fines',
        title: 'Penalties and Enforcement',
        content: `The enforcement mechanisms are robust. Fines for using banned AI practices or failing to comply with data governance requirements can reach up to €35 million or 7% of total worldwide annual turnover for the preceding financial year.

For multi-national enterprises, these fines dwarf GDPR penalties. CFOs must immediately mandate AI inventories and compliance audits for all vendor software.`
      }
    ]
  },
  'genai-vs-ocr-extraction': {
    title: 'GenAI vs Traditional OCR: The Paradigm Shift',
    category: 'Technology',
    author: 'Dr. James Lin',
    authorRole: 'Chief Technology Officer',
    authorBio: 'Ph.D. in Computer Vision. Leading Flowtaris AI’s document intelligence architecture.',
    publishDate: '2024-11-10',
    readTime: '12 min',
    excerpt: 'Why template-based OCR is officially obsolete. How Large Language Models and Vision-Language Models achieve near-perfect extraction without rules.',
    featured: false,
    image: '/insights/realistic_document_extraction_1788119848269.png',
    keyClaims: [
      'GenAI extraction requires 0 template setup time',
      'Traditional OCR accuracy drops 40% on unstructured invoices',
      'Vision-Language Models understand context, not just coordinates',
      'GenAI handles multi-page and varying-language documents natively'
    ],
    faqs: [
      { question: 'What is the difference between OCR and GenAI for invoice processing?', answer: 'Traditional OCR relies on exact coordinates and templates to find data, failing if a vendor changes their invoice layout. GenAI uses semantic understanding to find data contextually, regardless of layout or language, requiring zero template setup.' },
      { question: 'Is GenAI more accurate than OCR?', answer: 'Yes, especially on unstructured or varied documents. While OCR struggles with layout changes, GenAI models consistently achieve 99%+ accuracy because they understand the meaning of the fields.' }
    ],
    citations: [],
    entityAssociations: ['OCR', 'Generative AI', 'Document Extraction', 'Vision-Language Models'],
    topicClusters: ['Technology', 'Document Intelligence', 'Computer Vision'],
    answerTargets: [],
    sections: [
      {
        id: 'the-template-trap',
        title: 'The Template Trap',
        content: `For two decades, Optical Character Recognition (OCR) was the standard for AP automation. The fundamental flaw of OCR is its reliance on templates and coordinate mapping. If a vendor moved the "Invoice Total" field three inches to the left, the extraction failed.

Organizations found themselves trapped, spending thousands of hours maintaining thousands of vendor templates. It wasn't true automation; it was just a different form of manual labor.`
      },
      {
        id: 'semantic-understanding',
        title: 'Enter Semantic Understanding',
        content: `Vision-Language Models (VLMs) fundamentally change this. Instead of looking for coordinates, they read the document like a human. They understand that "Amt Due", "Total Amount", and "Balance" all semantically mean the same thing.

They can differentiate between a shipping address and a billing address based on context, not position. They can process an invoice in German just as easily as English, without any translation layer.`
      },
      {
        id: 'implementation-speed',
        title: 'Zero-Shot Implementation',
        content: `The business impact is immediate implementation. Because GenAI requires no templates, the "time to value" for a new automation deployment drops from months to hours. You simply connect the email inbox, and the model begins extracting line items with near-perfect accuracy on day one.`
      }
    ]
  }
}

export async function GET() {
  try {
    const client = createAdminClient()
    
    let inserted = 0
    let errors = []
    
    for (const [slug, data] of Object.entries(insightData)) {
      // Check if exists
      const { data: existing } = await client.from('insights').select('id').eq('slug', slug).single()
      
      const record = {
        slug,
        title: data.title,
        author: data.author,
        excerpt: data.excerpt,
        published_at: new Date(data.publishDate).toISOString(),
        rich_text: {
          category: data.category,
          authorRole: data.authorRole,
          authorBio: data.authorBio,
          readTime: data.readTime,
          featured: data.featured,
          image: data.image,
          keyClaims: data.keyClaims,
          sections: data.sections
        },
        topic_clusters: data.topicClusters || [],
        faq_items: data.faqs || [],
        citations: data.citations || [],
      }

      if (existing) {
        const { error } = await client.from('insights').update(record).eq('id', existing.id)
        if (error) errors.push({ slug, error })
      } else {
        const { error } = await client.from('insights').insert(record)
        if (error) errors.push({ slug, error })
      }
      inserted++
    }
    
    return NextResponse.json({ success: true, inserted, errors })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

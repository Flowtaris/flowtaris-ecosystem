import type { Meta, StoryObj } from '@storybook/react'
import { CascadingCardStack } from './cascading-card-stack'
import { Zap, DollarSign, CheckCircle, TrendingUp, Shield, Cpu } from 'lucide-react'

const meta: Meta<typeof CascadingCardStack> = {
  title: 'Epic/CascadingCardStack',
  component: CascadingCardStack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Perspective card stack with elastic hover physics, typed Icon components, ClipPathReveal entrances, and keyboard accessible expand/collapse.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    perspective: { control: 'number', min: 500, max: 2000 },
    staggerDelay: { control: 'number', min: 0, max: 500 },
    maxRotation: { control: 'number', min: 0, max: 30 },
    hoverLift: { control: 'number', min: 0, max: 100 },
    hoverScale: { control: 'number', min: 1, max: 1.2, step: 0.01 },
    initialSpread: { control: 'number', min: 0, max: 500 },
    gestureEnabled: { control: 'boolean' },
    reducedMotion: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof CascadingCardStack>

const sampleCards = [
  {
    id: '1',
    title: 'Predictive Analytics Engine',
    description: 'Forecast demand, detect anomalies, and optimize decisions with AutoML-powered predictions. Turn historical ERP data into actionable foresight across finance, supply chain, and operations.',
    category: 'Machine Learning',
    icon: Zap,
    metrics: [
      { label: 'Forecast Accuracy (MAPE)', value: '8.5%' },
      { label: 'Anomaly Detection F1', value: '0.94' },
      { label: 'Model Training Time', value: '< 4 hours' },
      { label: 'Prediction Latency', value: '< 50ms' },
    ],
    techStack: ['H2O.ai', 'Optuna', 'MLflow', 'KServe', 'SHAP'],
    cta: { label: 'Learn More', href: '/capabilities/predictive-analytics-engine' },
  },
  {
    id: '2',
    title: 'Conversational ERP Interface',
    description: 'Natural language interface for ERP operations. Query data, create records, and execute workflows through conversational AI with context awareness and multi-turn dialogue support.',
    category: 'GenAI',
    icon: Cpu,
    metrics: [
      { label: 'Intent Accuracy', value: '96.2%' },
      { label: 'Response Time', value: '< 800ms' },
      { label: 'Supported Languages', value: '12' },
      { label: 'User Adoption', value: '78%' },
    ],
    techStack: ['LLaMA 3 70B', 'RAG', 'Function Calling', 'Embeddings'],
    cta: { label: 'Learn More', href: '/capabilities/conversational-erp-interface' },
  },
  {
    id: '3',
    title: 'Real-time Integration Monitoring',
    description: 'End-to-end observability for ERP integrations. Detect failures, measure latency, and auto-remediate common issues across NetSuite, Coupa, SAP, and Workday connections.',
    category: 'Integration',
    icon: TrendingUp,
    metrics: [
      { label: 'Uptime Detection', value: '99.99%' },
      { label: 'Mean Time to Detect', value: '< 30s' },
      { label: 'Auto-Remediation Rate', value: '67%' },
      { label: 'Integration Coverage', value: '500+' },
    ],
    techStack: ['OpenTelemetry', 'Jaeger', 'Prometheus', 'Grafana', 'eBPF'],
    cta: { label: 'Learn More', href: '/capabilities/realtime-integration-monitoring' },
  },
  {
    id: '4',
    title: 'GenAI Document Intelligence',
    description: 'Automate invoice, PO, and contract processing with LLMs that understand context, not just keywords. Extract, classify, and validate documents at scale.',
    category: 'GenAI',
    icon: DollarSign,
    metrics: [
      { label: 'Automation Rate', value: '85%' },
      { label: 'Processing Time', value: '4 days → 3 min' },
      { label: 'Field Extraction Accuracy', value: '99.2%' },
      { label: 'Cost Reduction', value: '$4.5M/yr' },
    ],
    techStack:['AWS Textract', 'LLaMA 3 70B', 'BERT Classifier', 'Rule Engine'],
    cta: { label: 'Learn More', href: '/capabilities/genai-document-intelligence' },
  },
  {
    id: '5',
    title: 'Autonomous Workflow Orchestration',
    description: 'Self-healing workflows that adapt to changing conditions. Define business logic once, let AI handle exceptions, retries, and optimization automatically.',
    category: 'Automation',
    icon: CheckCircle,
    metrics: [
      { label: 'Workflow Success Rate', value: '99.5%' },
      { label: 'Manual Intervention', value: '< 2%' },
      { label: 'Optimization Cycles', value: 'Continuous' },
      { label: 'Time to Deploy', value: 'Minutes' },
    ],
    techStack: ['Temporal', 'DSL Engine', 'Policy-as-Code', 'AI Optimizer'],
    cta: { label: 'Learn More', href: '/capabilities/autonomous-workflow-orchestration' },
  },
  {
    id: '6',
    title: 'AI Governance & Compliance',
    description: 'Built-in compliance for regulated industries. Audit trails, model cards, bias monitoring, and automated policy enforcement for SOC 2, GDPR, and ISO 27001.',
    category: 'Governance',
    icon: Shield,
    metrics: [
      { label: 'Compliance Frameworks', value: '12+' },
      { label: 'Audit Trail Coverage', value: '100%' },
      { label: 'Bias Detection', value: 'Real-time' },
      { label: 'Policy Enforcement', value: 'Automated' },
    ],
    techStack: ['OPA', 'OpenTelemetry', 'Data Lineage', 'Model Registry'],
    cta: { label: 'Learn More', href: '/capabilities/ai-governance-compliance' },
  },
]

export const Default: Story = {
  args: {
    cards: sampleCards,
    perspective: 1000,
    staggerDelay: 120,
    maxRotation: 12,
    hoverLift: 40,
    hoverScale: 1.08,
    initialSpread: 24,
    gestureEnabled: true,
  },
}

export const Compact: Story = {
  args: {
    ...Default.args,
    cards: sampleCards.slice(0, 3),
    perspective: 800,
    staggerDelay: 80,
    maxRotation: 8,
    hoverLift: 24,
    hoverScale: 1.04,
    initialSpread: 16,
  },
}

export const DramaticPerspective: Story = {
  args: {
    ...Default.args,
    perspective: 1600,
    maxRotation: 18,
    hoverLift: 60,
    hoverScale: 1.12,
    initialSpread: 40,
  },
}

export const ShallowPerspective: Story = {
  args: {
    ...Default.args,
    perspective: 600,
    maxRotation: 6,
    hoverLift: 16,
    hoverScale: 1.02,
    initialSpread: 8,
  },
}

export const NoStagger: Story = {
  args: {
    ...Default.args,
    staggerDelay: 0,
  },
}

export const SlowStagger: Story = {
  args: {
    ...Default.args,
    staggerDelay: 200,
  },
}

export const NoGesture: Story = {
  args: {
    ...Default.args,
    gestureEnabled: false,
  },
}

export const WithReducedMotion: Story = {
  args: {
    ...Default.args,
    reducedMotion: true,
  },
}

export const ThreeCards: Story = {
  args: {
    ...Default.args,
    cards: sampleCards.slice(0, 3),
  },
}

export const FourCards: Story = {
  args: {
    ...Default.args,
    cards: sampleCards.slice(0, 4),
  },
}

export const FiveCards: Story = {
  args: {
    ...Default.args,
    cards: sampleCards.slice(0, 5),
  },
}

export const AllSixCards: Story = {
  args: {
    ...Default.args,
    cards: sampleCards,
  },
}
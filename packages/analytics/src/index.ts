// @flowtaris/analytics - GA4 event taxonomy and helpers

// Event names - matches GA4 event taxonomy in project handoff
export const Events = {
  // Assessment funnel
  ASSESSMENT_START: 'assessment_start',
  ASSESSMENT_STEP_COMPLETE: 'assessment_step_complete',
  ASSESSMENT_COMPLETE: 'assessment_complete',
  ASSESSMENT_EMAIL_CAPTURE: 'assessment_email_capture',

  // ROI funnel
  ROI_CALCULATOR_OPEN: 'roi_calculator_open',
  ROI_INPUTS_CHANGE: 'roi_inputs_change',
  ROI_CALCULATE: 'roi_calculate',
  ROI_EMAIL_CAPTURE: 'roi_email_capture',

  // Inaction funnel
  INACTION_OPEN: 'inaction_open',
  INACTION_CALCULATE: 'inaction_calculate',
  INACTION_CTA_CLICK: 'inaction_cta_click',

  // Content
  CASE_STUDY_VIEW: 'case_study_view',
  CAPABILITY_DEEP_DIVE: 'capability_deep_dive',
  INNOVATION_LAB_INTERACTION: 'innovation_lab_interaction',

  // Conversion
  DEMO_REQUEST: 'demo_request',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
} as const

// Event parameter types for type safety
export type AssessmentStartParams = {
  source: string
}

export type AssessmentStepCompleteParams = {
  step: number
  stepName: string
  erp?: string
}

export type AssessmentCompleteParams = {
  leadScore: number
  recommendations: string[]
  erp: string
}

export type AssessmentEmailCaptureParams = {
  email: string
  leadScore: number
  recommendations: string[]
}

export type ROICalculatorOpenParams = {
  source: string
  prefilled?: {
    erp?: string
    invoices?: number
    useCase?: string
  }
}

export type ROIInputsChangeParams = {
  field: string
  value: string | number
}

export type ROICalculateParams = {
  projectedSavings: number
  paybackMonths: number
  fteFreed: number
  assessmentId?: string
}

export type ROIEmailCaptureParams = {
  email: string
  assessmentId?: string
  projectedSavings: number
}

export type InactionOpenParams = {
  source: string
}

export type InactionCalculateParams = {
  monthlyLeakage: number
  annualRisk: number
  competitiveGap: number
}

export type InactionCTAClickParams = {
  ctaType: 'demo' | 'assessment' | 'roi'
}

export type CaseStudyViewParams = {
  clientSlug: string
  metricViewed?: string
}

export type CapabilityDeepDiveParams = {
  capabilitySlug: string
  section?: string
}

export type InnovationLabInteractionParams = {
  irisId: string
  action: 'hover' | 'expand' | 'cta_click'
}

export type DemoRequestParams = {
  source: string
  context: string
}

export type ContactFormSubmitParams = {
  formType: 'demo' | 'partner' | 'career' | 'general'
}

// Analytics helper (client-side only)
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export function trackEvent<
  T extends Record<string, unknown>
>(eventName: string, params: T) {
  if (typeof window !== 'undefined' && (window as Window & { gtag?: typeof window.gtag }).gtag) {
    (window as Window & { gtag: typeof window.gtag }).gtag('event', eventName, params)
  }
}

// Convenience functions matching event taxonomy
export const analytics = {
  assessment: {
    start: (params: AssessmentStartParams) => trackEvent(Events.ASSESSMENT_START, params),
    stepComplete: (params: AssessmentStepCompleteParams) => trackEvent(Events.ASSESSMENT_STEP_COMPLETE, params),
    complete: (params: AssessmentCompleteParams) => trackEvent(Events.ASSESSMENT_COMPLETE, params),
    emailCapture: (params: AssessmentEmailCaptureParams) => trackEvent(Events.ASSESSMENT_EMAIL_CAPTURE, params),
  },
  roi: {
    open: (params: ROICalculatorOpenParams) => trackEvent(Events.ROI_CALCULATOR_OPEN, params),
    inputsChange: (params: ROIInputsChangeParams) => trackEvent(Events.ROI_INPUTS_CHANGE, params),
    calculate: (params: ROICalculateParams) => trackEvent(Events.ROI_CALCULATE, params),
    emailCapture: (params: ROIEmailCaptureParams) => trackEvent(Events.ROI_EMAIL_CAPTURE, params),
  },
  inaction: {
    open: (params: InactionOpenParams) => trackEvent(Events.INACTION_OPEN, params),
    calculate: (params: InactionCalculateParams) => trackEvent(Events.INACTION_CALCULATE, params),
    ctaClick: (params: InactionCTAClickParams) => trackEvent(Events.INACTION_CTA_CLICK, params),
  },
  content: {
    caseStudyView: (params: CaseStudyViewParams) => trackEvent(Events.CASE_STUDY_VIEW, params),
    capabilityDeepDive: (params: CapabilityDeepDiveParams) => trackEvent(Events.CAPABILITY_DEEP_DIVE, params),
    innovationLabInteraction: (params: InnovationLabInteractionParams) => trackEvent(Events.INNOVATION_LAB_INTERACTION, params),
  },
  conversion: {
    demoRequest: (params: DemoRequestParams) => trackEvent(Events.DEMO_REQUEST, params),
    contactFormSubmit: (params: ContactFormSubmitParams) => trackEvent(Events.CONTACT_FORM_SUBMIT, params),
  },
}
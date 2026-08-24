// @flowtaris/cms-client - Stub (Sanity removed, using custom admin panel)
// All CMS functionality is now handled via Supabase + custom admin panel

// Mock client that returns null for all queries (no Sanity configured)
const mockClient = {
  fetch: async () => null,
}

export const previewClient = mockClient
export const client = mockClient

export function getClient(_preview = false) {
  return mockClient
}

export function hasSanityConfig(): boolean {
  return false
}

// Stub groq tag (no-op)
function groq(strings: TemplateStringsArray, ...values: unknown[]): string {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')
}

// Stub queries - return empty templates
export const queries = {
  siteConfig: groq``,
  allCapabilities: groq``,
  capabilityBySlug: groq``,
  allCaseStudies: groq``,
  caseStudyBySlug: groq``,
  caseStudiesByPlatform: groq``,
  assessmentConfig: groq``,
  roiConfig: groq``,
  inactionConfig: groq``,
  allInsights: groq``,
  insightBySlug: groq``,
  allPlatformPages: groq``,
  platformPageBySlug: groq``,
} as const

// Stub types for backwards compatibility
export type SanityClient = typeof mockClient
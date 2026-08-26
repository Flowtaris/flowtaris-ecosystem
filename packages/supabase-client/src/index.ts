// @flowtaris/supabase-client - Supabase client with types and helpers

import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Mock client for build time when env vars are not available
function createMockClient(): SupabaseClient {
  const mockResponse = async () => ({ data: null, error: { message: 'Mock client - no Supabase config' } })
  const mockQuery = {
    insert: () => ({ select: () => ({ single: mockResponse }) }),
    select: () => ({ 
      eq: () => ({ single: mockResponse }),
      single: mockResponse 
    }),
  }
  return {
    from: () => mockQuery,
  } as unknown as SupabaseClient
}

export const supabase: SupabaseClient = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()

// Server-side client with service role (for admin operations)
export function createServerClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return createMockClient()
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Type definitions matching Supabase schema
export interface AssessmentLead {
  id: string
  answers: Record<string, unknown>
  recommendations: string[]
  lead_score: number
  routed_to: string | null
  email: string | null
  created_at: string
}

export interface AssessmentLeadInsert extends Omit<AssessmentLead, 'id' | 'created_at' | 'email'> {
  email?: string | null
}

export interface InnovationWaitlist {
  id: string
  email: string
  capability_slug: string | null
  source: string
  created_at: string
}

export interface ROICalculation {
  id: string
  inputs: Record<string, unknown>
  outputs: Record<string, unknown>
  email: string | null
  assessment_id: string | null
  created_at: string
}

export interface InactionCalculation {
  id: string
  inputs: Record<string, unknown>
  outputs: Record<string, unknown>
  email: string | null
  roi_calc_id: string | null
  created_at: string
}

// Insert helpers
export async function insertAssessmentLead(data: AssessmentLeadInsert) {
  return supabase.from('assessment_leads').insert(data).select().single()
}

export async function insertROICalculation(data: Omit<ROICalculation, 'id' | 'created_at'>) {
  return supabase.from('roi_calculations').insert(data).select().single()
}

export async function insertInactionCalculation(data: Omit<InactionCalculation, 'id' | 'created_at'>) {
  return supabase.from('inaction_calculations').insert(data).select().single()
}

export async function insertInnovationWaitlist(data: Omit<InnovationWaitlist, 'id' | 'created_at'>) {
  return supabase.from('innovation_waitlist').insert(data).select().single()
}

// Read helpers (authenticated)
export async function getAssessmentLead(id: string) {
  return supabase.from('assessment_leads').select('*').eq('id', id).single()
}

export async function getROICalculation(id: string) {
  return supabase.from('roi_calculations').select('*').eq('id', id).single()
}

export async function getInactionCalculation(id: string) {
  return supabase.from('inaction_calculations').select('*').eq('id', id).single()
}

// Config/CMS helpers (public read)
export async function getROICConfig() {
  const { data, error } = await supabase.from('roi_config').select('*').single()
  if (error) {
    console.error("Error fetching ROI Config:", error)
    return null
  }
  return data
}

export async function getAssessmentConfig() {
  const { data, error } = await supabase.from('assessment_config').select('*').single()
  if (error) {
    console.error("Error fetching Assessment Config:", error)
    return null
  }
  return data
}
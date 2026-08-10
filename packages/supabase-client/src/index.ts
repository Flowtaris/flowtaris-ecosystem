// @flowtaris/supabase-client - Supabase client with types and helpers

import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (for admin operations)
export function createServerClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

// Type definitions matching Supabase schema
export interface AssessmentLead {
  id: string
  answers: Record<string, unknown>
  recommendations: string[]
  lead_score: number
  routed_to: string | null
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
export async function insertAssessmentLead(data: Omit<AssessmentLead, 'id' | 'created_at'>) {
  return supabase.from('assessment_leads').insert(data).select().single()
}

export async function insertROICalculation(data: Omit<ROICalculation, 'id' | 'created_at'>) {
  return supabase.from('roi_calculations').insert(data).select().single()
}

export async function insertInactionCalculation(data: Omit<InactionCalculation, 'id' | 'created_at'>) {
  return supabase.from('inaction_calculations').insert(data).select().single()
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
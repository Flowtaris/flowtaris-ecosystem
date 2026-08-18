-- Flowtaris AI - Supabase Tables and RLS Policies
-- Migration: 20240101000001
-- Matches the types in packages/supabase-client/src/index.ts

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: assessment_leads
-- ============================================================================
CREATE TABLE assessment_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    answers JSONB NOT NULL,
    recommendations TEXT[] NOT NULL DEFAULT '{}',
    lead_score INTEGER NOT NULL DEFAULT 0,
    routed_to TEXT CHECK (routed_to IN ('sales', 'nurture', 'partner')),
    email TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_assessment_leads_routed_to ON assessment_leads(routed_to);
CREATE INDEX idx_assessment_leads_lead_score ON assessment_leads(lead_score);
CREATE INDEX idx_assessment_leads_created_at ON assessment_leads(created_at);
CREATE INDEX idx_assessment_leads_email ON assessment_leads(email) WHERE email IS NOT NULL;

-- ============================================================================
-- TABLE: roi_calculations
-- ============================================================================
CREATE TABLE roi_calculations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inputs JSONB NOT NULL,
    outputs JSONB NOT NULL,
    email TEXT,
    assessment_id UUID REFERENCES assessment_leads(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_roi_calculations_assessment_id ON roi_calculations(assessment_id);
CREATE INDEX idx_roi_calculations_email ON roi_calculations(email) WHERE email IS NOT NULL;
CREATE INDEX idx_roi_calculations_created_at ON roi_calculations(created_at);

-- ============================================================================
-- TABLE: inaction_calculations
-- ============================================================================
CREATE TABLE inaction_calculations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inputs JSONB NOT NULL,
    outputs JSONB NOT NULL,
    email TEXT,
    roi_calc_id UUID REFERENCES roi_calculations(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_inaction_calculations_roi_calc_id ON inaction_calculations(roi_calc_id);
CREATE INDEX idx_inaction_calculations_email ON inaction_calculations(email) WHERE email IS NOT NULL;
CREATE INDEX idx_inaction_calculations_created_at ON inaction_calculations(created_at);

-- ============================================================================
-- TABLE: innovation_waitlist (for Sprint 6)
-- ============================================================================
CREATE TABLE innovation_waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    capability_slug TEXT,
    source TEXT DEFAULT 'innovation-lab',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_innovation_waitlist_email ON innovation_waitlist(email);
CREATE INDEX idx_innovation_waitlist_capability ON innovation_waitlist(capability_slug);

-- ============================================================================
-- TABLE: contacts (for contact form - Sprint 6)
-- ============================================================================
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('demo', 'partner', 'career', 'general')),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contacts_type ON contacts(type);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE assessment_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inaction_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE innovation_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- POLICY: Public INSERT (anonymous users can submit leads)
-- ============================================================================
-- Assessment leads - anyone can insert (lead capture)
CREATE POLICY "Public can insert assessment leads"
    ON assessment_leads FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- ROI calculations - anyone can insert
CREATE POLICY "Public can insert ROI calculations"
    ON roi_calculations FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Inaction calculations - anyone can insert
CREATE POLICY "Public can insert inaction calculations"
    ON inaction_calculations FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Innovation waitlist - anyone can insert
CREATE POLICY "Public can insert innovation waitlist"
    ON innovation_waitlist FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Contacts - anyone can insert
CREATE POLICY "Public can insert contacts"
    ON contacts FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- ============================================================================
-- POLICY: Authenticated SELECT (team members can read)
-- ============================================================================
-- Assessment leads - authenticated users can read
CREATE POLICY "Authenticated can read assessment leads"
    ON assessment_leads FOR SELECT
    TO authenticated
    USING (true);

-- ROI calculations - authenticated users can read
CREATE POLICY "Authenticated can read ROI calculations"
    ON roi_calculations FOR SELECT
    TO authenticated
    USING (true);

-- Inaction calculations - authenticated users can read
CREATE POLICY "Authenticated can read inaction calculations"
    ON inaction_calculations FOR SELECT
    TO authenticated
    USING (true);

-- Innovation waitlist - authenticated users can read
CREATE POLICY "Authenticated can read innovation waitlist"
    ON innovation_waitlist FOR SELECT
    TO authenticated
    USING (true);

-- Contacts - authenticated users can read
CREATE POLICY "Authenticated can read contacts"
    ON contacts FOR SELECT
    TO authenticated
    USING (true);

-- ============================================================================
-- POLICY: Service role full access (for server-side operations)
-- ============================================================================
-- The service role key bypasses RLS entirely, but we add explicit policies for clarity

CREATE POLICY "Service role full access assessment_leads"
    ON assessment_leads FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role full access roi_calculations"
    ON roi_calculations FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role full access inaction_calculations"
    ON inaction_calculations FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role full access innovation_waitlist"
    ON innovation_waitlist FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Service role full access contacts"
    ON contacts FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================
-- Grant necessary permissions to anon and authenticated roles

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

GRANT INSERT ON assessment_leads TO anon, authenticated;
GRANT INSERT ON roi_calculations TO anon, authenticated;
GRANT INSERT ON inaction_calculations TO anon, authenticated;
GRANT INSERT ON innovation_waitlist TO anon, authenticated;
GRANT INSERT ON contacts TO anon, authenticated;

GRANT SELECT ON assessment_leads TO authenticated;
GRANT SELECT ON roi_calculations TO authenticated;
GRANT SELECT ON inaction_calculations TO authenticated;
GRANT SELECT ON innovation_waitlist TO authenticated;
GRANT SELECT ON contacts TO authenticated;

-- Service role gets all permissions (bypasses RLS anyway)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to update lead with email (called from API route)
CREATE OR REPLACE FUNCTION update_assessment_lead_email(
    p_id UUID,
    p_email TEXT
) RETURNS VOID AS $$
BEGIN
    UPDATE assessment_leads
    SET email = p_email
    WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update ROI calculation with email
CREATE OR REPLACE FUNCTION update_roi_calculation_email(
    p_id UUID,
    p_email TEXT
) RETURNS VOID AS $$
BEGIN
    UPDATE roi_calculations
    SET email = p_email
    WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update inaction calculation with email
CREATE OR REPLACE FUNCTION update_inaction_calculation_email(
    p_id UUID,
    p_email TEXT
) RETURNS VOID AS $$
BEGIN
    UPDATE inaction_calculations
    SET email = p_email
    WHERE id = p_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute on helper functions
GRANT EXECUTE ON FUNCTION update_assessment_lead_email(UUID, TEXT) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION update_roi_calculation_email(UUID, TEXT) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION update_inaction_calculation_email(UUID, TEXT) TO authenticated, service_role;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these to verify policies work:

-- Test insert as anon (should work):
-- INSERT INTO assessment_leads (answers, recommendations, lead_score, routed_to)
-- VALUES ('{}', '{}', 50, 'nurture');

-- Test select as anon (should fail - no policy):
-- SELECT * FROM assessment_leads;

-- Test select as authenticated (should work):
-- SELECT * FROM assessment_leads;

-- Test service role (should work for everything):
-- SELECT * FROM assessment_leads;
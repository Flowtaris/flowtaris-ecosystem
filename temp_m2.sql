CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE site_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name VARCHAR(255) NOT NULL DEFAULT 'Flowtaris AI',
    site_url TEXT,
    tagline TEXT,
    logo_url TEXT,  -- Will store image URL from Vercel Blob or similar
    favicon_url TEXT,
    navigation JSONB DEFAULT '[]'::jsonb,  -- Store navigation structure
    social_links JSONB DEFAULT '{}'::jsonb,  -- Store social media links
    contact_email TEXT,
    support_email TEXT,
    privacy_policy_url TEXT,
    terms_of_service_url TEXT,
    cookie_policy_url TEXT,
    analytics JSONB DEFAULT '{}'::jsonb,  -- GA4, GTM, etc.
    seo JSONB DEFAULT '{}'::jsonb,  -- Default SEO settings
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_site_config_single ON site_config(id);  -- Ensure only one row
CREATE TABLE platform_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tagline TEXT,
    category VARCHAR(50) CHECK (category IN ('ERP', 'BSM', 'ERP/HCM', 'Hybrid')),
    maturity VARCHAR(20) CHECK (maturity IN ('production', 'pilot', 'beta', 'research')) DEFAULT 'production',
    logo_emoji VARCHAR(10),
    short_description TEXT,
    description TEXT,
    capabilities JSONB DEFAULT '[]'::jsonb,  -- Array of capability objects
    integrations JSONB DEFAULT '[]'::jsonb,  -- Array of integration objects
    certifications JSONB DEFAULT '[]'::jsonb,  -- Array of strings
    case_study_ids UUID[] DEFAULT '{}'::uuid[],  -- References to case_studies table
    demo_url TEXT,
    docs_url TEXT,
    metrics JSONB DEFAULT '{}'::jsonb,  -- Key metrics object
    faq JSONB DEFAULT '[]'::jsonb,  -- Array of {q, a} objects
    architecture JSONB DEFAULT '[]'::jsonb,  -- Array of {layer, tech, detail} objects
    seo JSONB DEFAULT '{}'::jsonb,  -- SEO override
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_platform_pages_slug ON platform_pages(slug);
CREATE INDEX idx_platform_pages_category ON platform_pages(category);
CREATE INDEX idx_platform_pages_maturity ON platform_pages(maturity);
CREATE TABLE ai_capabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) CHECK (category IN ('Document Intelligence', 'Workflow Automation', 'Analytics & Forecasting', 'Governance & Compliance', 'Integration & Monitoring')),
    maturity VARCHAR(20) CHECK (maturity IN ('production', 'pilot', 'beta', 'research')) DEFAULT 'production',
    short_description TEXT,
    description TEXT,
    icon VARCHAR(50),  -- Emoji or Lucide icon name
    key_metrics JSONB DEFAULT '[]'::jsonb,  -- Array of {label, value} objects
    features JSONB DEFAULT '[]'::jsonb,  -- Array of strings
    use_cases JSONB DEFAULT '[]'::jsonb,  -- Array of strings
    supported_platform_ids UUID[] DEFAULT '{}'::uuid[],  -- References to platform_pages
    timeline TEXT,
    prerequisites JSONB DEFAULT '[]'::jsonb,  -- Array of strings
    demo_url TEXT,
    docs_url TEXT,
    related_capability_ids UUID[] DEFAULT '{}'::uuid[],  -- Self-referencing to ai_capabilities
    case_study_ids UUID[] DEFAULT '{}'::uuid[],  -- References to case_studies
    seo JSONB DEFAULT '{}'::jsonb,  -- SEO override
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_ai_capabilities_slug ON ai_capabilities(slug);
CREATE INDEX idx_ai_capabilities_category ON ai_capabilities(category);
CREATE INDEX idx_ai_capabilities_maturity ON ai_capabilities(maturity);
CREATE TABLE case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    client VARCHAR(255) NOT NULL,
    industry TEXT,
    platforms JSONB DEFAULT '[]'::jsonb,  -- Array of strings
    challenge TEXT,
    solution TEXT,
    results JSONB DEFAULT '[]'::jsonb,  -- Array of result objects
    timeline TEXT,
    testimonial TEXT,
    hero_image_url TEXT,  -- Will store image URL
    seo JSONB DEFAULT '{}'::jsonb,  -- SEO settings
    geo_signals JSONB DEFAULT '{}'::jsonb,  -- GEO signals
    related_capability_ids UUID[] DEFAULT '{}'::uuid[],  -- References to ai_capabilities
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_case_studies_slug ON case_studies(slug);
CREATE INDEX idx_case_studies_client ON case_studies(client);
CREATE INDEX idx_case_studies_industry ON case_studies(industry);
CREATE TABLE insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    excerpt TEXT,
    rich_text JSONB,  -- Portable text content
    topic_clusters JSONB DEFAULT '[]'::jsonb,  -- Array of strings
    faq_items JSONB DEFAULT '[]'::jsonb,  -- Array of FAQ objects
    citations JSONB DEFAULT '[]'::jsonb,  -- Array of citation objects
    related_capability_ids UUID[] DEFAULT '{}'::uuid[],  -- References to ai_capabilities
    published_at TIMESTAMPTZ,
    seo JSONB DEFAULT '{}'::jsonb,  -- SEO settings
    geo_signals JSONB DEFAULT '{}'::jsonb,  -- GEO signals
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_insights_slug ON insights(slug);
CREATE INDEX idx_insights_published_at ON insights(published_at);
CREATE INDEX idx_insights_author ON insights(author);
CREATE TABLE assessment_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    questions JSONB NOT NULL,  -- Array of assessment question objects
    recommendation_rules JSONB NOT NULL,  -- Array of rule objects
    capability_mapping JSONB NOT NULL,  -- Maps scores to capabilities
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_assessment_config_single ON assessment_config(id);
CREATE TABLE roi_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assumptions JSONB NOT NULL,
    formulas JSONB NOT NULL,
    benchmarks JSONB NOT NULL,
    platform_multipliers JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_roi_config_single ON roi_config(id);
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site config"
    ON site_config FOR SELECT
    USING (true);
CREATE POLICY "Public can read platform pages"
    ON platform_pages FOR SELECT
    USING (true);
CREATE POLICY "Public can read AI capabilities"
    ON ai_capabilities FOR SELECT
    USING (true);
CREATE POLICY "Public can read case studies"
    ON case_studies FOR SELECT
    USING (true);
CREATE POLICY "Public can read insights"
    ON insights FOR SELECT
    USING (true);
CREATE POLICY "Public can read assessment config"
    ON assessment_config FOR SELECT
    USING (true);
CREATE POLICY "Public can read ROI config"
    ON roi_config FOR SELECT
    USING (true);
CREATE POLICY "Authenticated full access site config"
    ON site_config FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
CREATE POLICY "Authenticated full access platform pages"
    ON platform_pages FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
CREATE POLICY "Authenticated full access AI capabilities"
    ON ai_capabilities FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
CREATE POLICY "Authenticated full access case studies"
    ON case_studies FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
CREATE POLICY "Authenticated full access insights"
    ON insights FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
CREATE POLICY "Authenticated full access assessment config"
    ON assessment_config FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
CREATE POLICY "Authenticated full access ROI config"
    ON roi_config FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
DO $$
DECLARE
    tables TEXT[] := ARRAY['site_config', 'platform_pages', 'ai_capabilities', 'case_studies', 'insights', 'assessment_config', 'roi_config'];
    table TEXT;
BEGIN
    FOREACH table IN ARRAY tables LOOP
        EXECUTE format($f$
            CREATE POLICY "Service role full access %s"
                ON %s FOR ALL
                TO service_role
                USING (true)
                WITH CHECK (true);
        $f$, table, table);
    END LOOP;
END $$;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT SELECT ON site_config TO anon, authenticated;
GRANT SELECT ON platform_pages TO anon, authenticated;
GRANT SELECT ON ai_capabilities TO anon, authenticated;
GRANT SELECT ON case_studies TO anon, authenticated;
GRANT SELECT ON insights TO anon, authenticated;
GRANT SELECT ON assessment_config TO anon, authenticated;
GRANT SELECT ON roi_config TO anon, authenticated;
GRANT ALL ON site_config TO authenticated;
GRANT ALL ON platform_pages TO authenticated;
GRANT ALL ON ai_capabilities TO authenticated;
GRANT ALL ON case_studies TO authenticated;
GRANT ALL ON insights TO authenticated;
GRANT ALL ON assessment_config TO authenticated;
GRANT ALL ON roi_config TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
DO $$
DECLARE
    tables TEXT[] := ARRAY['site_config', 'platform_pages', 'ai_capabilities', 'case_studies', 'insights', 'assessment_config', 'roi_config'];
    table TEXT;
BEGIN
    FOREACH table IN ARRAY tables LOOP
        EXECUTE format('
            CREATE TRIGGER update_%I_updated_at BEFORE UPDATE
            ON %I FOR EACH ROW
            EXECUTE PROCEDURE update_updated_at_column();', table, table);
    END LOOP;
END $$;
INSERT INTO site_config (id, site_name, site_url, tagline)
SELECT
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Flowtaris AI',
    'https://flowtaris.ai',
    'Enterprise AI Automation for Finance Teams'
WHERE NOT EXISTS (SELECT 1 FROM site_config);
INSERT INTO assessment_config (id, questions, recommendation_rules, capability_mapping)
SELECT
    '00000000-0000-0000-0000-000000000002'::uuid,
    '[]'::jsonb,
    '[]'::jsonb,
    '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM assessment_config);
INSERT INTO roi_config (id, assumptions, formulas, benchmarks, platform_multipliers)
SELECT
    '00000000-0000-0000-0000-000000000003'::uuid,
    '{}'::jsonb,
    '{}'::jsonb,
    '{}'::jsonb,
    '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM roi_config);

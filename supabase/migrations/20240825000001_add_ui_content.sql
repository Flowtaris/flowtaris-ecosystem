-- Migration: 20240825000001
-- Description: Add ui_content column to site_config, roi_config, and assessment_config to support CMS-driven text.

ALTER TABLE site_config 
ADD COLUMN IF NOT EXISTS ui_content JSONB DEFAULT '{}'::jsonb;

ALTER TABLE roi_config 
ADD COLUMN IF NOT EXISTS ui_content JSONB DEFAULT '{}'::jsonb;

ALTER TABLE assessment_config 
ADD COLUMN IF NOT EXISTS ui_content JSONB DEFAULT '{}'::jsonb;

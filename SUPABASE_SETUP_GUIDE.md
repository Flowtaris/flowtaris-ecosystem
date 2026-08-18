# Supabase Setup Guide

This guide covers setting up the Supabase database with tables, RLS policies, and deploying the migration.

## Quick Start

### 1. Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Create new project: `flowtaris-ai`
3. Save the credentials:
   - Project URL
   - Anon (public) key
   - Service role key (secret!)

### 2. Run Migration
In Supabase Dashboard → SQL Editor, paste and run the contents of:
```
/d/flowtaris-ecosystem/supabase/migrations/20240101000001_create_tables_and_rls.sql
```

Or use CLI:
```bash
cd /d/flowtaris-ecosystem
supabase db push
```

### 3. Add Environment Variables
Add to `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Add to Vercel Project Settings → Environment Variables.

### 4. Verify Tables Exist
In Supabase Dashboard → Table Editor, you should see:
- `assessment_leads`
- `roi_calculations`
- `inaction_calculations`
- `innovation_waitlist`
- `contacts`

### 5. Test RLS Policies
In SQL Editor, run:
```sql
-- Test anon insert (should work)
INSERT INTO assessment_leads (answers, recommendations, lead_score, routed_to)
VALUES ('{"test": true}', '{"genai-doc-intelligence"}', 50, 'nurture');

-- Test anon select (should return 0 rows - no policy for anon SELECT)
SELECT * FROM assessment_leads;

-- Test authenticated select (login first in dashboard, then run)
-- Should return the row
```

## Table Schema Reference

### assessment_leads
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| answers | JSONB | Full assessment answers |
| recommendations | TEXT[] | Recommended capability slugs |
| lead_score | INTEGER | 0-100 score |
| routed_to | TEXT | 'sales' \| 'nurture' \| 'partner' |
| email | TEXT | Optional email (added after capture) |
| created_at | TIMESTAMPTZ | Auto timestamp |

### roi_calculations
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| inputs | JSONB | Calculator inputs |
| outputs | JSONB | Calculated results |
| email | TEXT | Optional email |
| assessment_id | UUID | FK to assessment_leads |
| created_at | TIMESTAMPTZ | Auto timestamp |

### inaction_calculations
| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| inputs | JSONB | Calculator inputs |
| outputs | JSONB | Calculated results |
| email | TEXT | Optional email |
| roi_calc_id | UUID | FK to roi_calculations |
| created_at | TIMESTAMPTZ | Auto timestamp |

## RLS Policy Summary

| Table | anon | authenticated | service_role |
|-------|------|---------------|--------------|
| assessment_leads | INSERT | SELECT | ALL |
| roi_calculations | INSERT | SELECT | ALL |
| inaction_calculations | INSERT | SELECT | ALL |
| innovation_waitlist | INSERT | SELECT | ALL |
| contacts | INSERT | SELECT | ALL |

## API Routes for Server-Side Operations

Create these API routes in `apps/flowtaris-ai/src/app/api/`:

### `/api/leads/assessment/email` - Update assessment lead with email
```typescript
// POST { id, email }
```

### `/api/leads/roi/email` - Update ROI calculation with email
```typescript
// POST { id, email }
```

### `/api/leads/inaction/email` - Update inaction calculation with email
```typescript
// POST { id, email }
```

These use the service role key and helper functions from the migration.

## Dashboard Queries for Team

### High-Value Leads (score > 70)
```sql
SELECT * FROM assessment_leads
WHERE lead_score > 70
ORDER BY created_at DESC;
```

### Recent ROI Calculations
```sql
SELECT r.*, a.email as assessment_email
FROM roi_calculations r
LEFT JOIN assessment_leads a ON r.assessment_id = a.id
ORDER BY r.created_at DESC
LIMIT 50;
```

### Conversion Funnel
```sql
SELECT
    (SELECT COUNT(*) FROM assessment_leads) as assessments,
    (SELECT COUNT(*) FROM roi_calculations) as roi_calcs,
    (SELECT COUNT(*) FROM inaction_calculations) as inaction_calcs,
    (SELECT COUNT(*) FROM assessment_leads WHERE email IS NOT NULL) as with_email;
```

## Production Checklist

- [ ] Migration applied to production Supabase project
- [ ] Environment variables set in Vercel (production)
- [ ] Service role key stored securely (never in client bundle)
- [ ] RLS policies verified working
- [ ] Daily backups enabled (Supabase Pro)
- [ ] PITR enabled (Supabase Pro)
- [ ] Custom SMTP configured (Resend)
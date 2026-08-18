# flowtaris.ai — Developer Cost Breakdown (GitHub + Vercel + Supabase)
**Your out-of-pocket investment to build, host, and run this project**

---

## 💰 **Monthly Recurring Costs (Your Pocket)**

| Service | Tier | Monthly Cost | What You Get | Verdict |
|---------|------|--------------|--------------|---------|
| **GitHub** | Free | $0 | Unlimited private repos, 2000 CI/min/mo, 500MB Packages | ✅ **Use Free** |
| | Pro | $4/mo | 3000 CI/min, 2GB Packages, protected branches | Only if CI exceeds 2000min |
| **Vercel** | Hobby | $0 | 100GB bandwidth, 100GB-hours serverless, ISR, Edge, custom domains | ✅ **Start Here** |
| | Pro | **$20/mo** | 1TB bandwidth, 1000GB-hours, password protection, team seats, analytics | **Likely needed at launch** |
| | Enterprise | Custom | SSO, DDoS, dedicated support, SLA | Client buys later |
| **Supabase** | Free | $0 | 500MB DB, 1GB file storage, 2GB bandwidth, 50K MAU, Auth, Realtime, Edge Functions | ✅ **Start Here** |
| | Pro | **$25/mo** | 8GB DB, 100GB file storage, 250GB bandwidth, 100K MAU, daily backups, PITR | **Likely needed at launch** |
| | Team | $599/mo | Multiple projects, SSO, compliance | Overkill |

---

## 📊 **Realistic Launch-Month Projection**

| Scenario | Vercel | Supabase | GitHub | **Total/Month** |
|----------|--------|----------|--------|-----------------|
| **Development (localhost)** | $0 (Hobby) | $0 (Free) | $0 | **$0** |
| **Staging/Preview deploys** | $0 (Hobby) | $0 (Free) | $0 | **$0** |
| **Launch (production traffic)** | **$20 (Pro)** | **$25 (Pro)** | $0 | **$45/mo** |
| **Growth (6-12 months)** | $20 (Pro) | $25 (Pro) | $4 (Pro) | **$49/mo** |

---

## ⚠️ **Critical: Supabase ≠ Sanity (CMS Decision)**

You mentioned **Supabase** instead of **Sanity**. This is a **major architectural choice**:

### **Option A: Supabase as Backend + Build Your Own CMS**
| Aspect | Reality |
|--------|---------|
| **What Supabase gives you** | PostgreSQL, Auth, Realtime, Storage, Edge Functions, Auto-generated REST/GraphQL APIs |
| **What it DOESN'T give you** | Visual content editor, block-based page builder, media library, preview mode, publishing workflow, SEO fields UI, content modeling UI |
| **What you must build** | **Entire CMS layer** — Admin dashboard, rich text editor (TipTap/Slate), image upload/crop, slug management, SEO fields, content versioning, preview links, role-based access |
| **Dev time to build CMS** | **4-6 weeks** of pure frontend/backend work |
| **Ongoing maintenance** | You own bugs, upgrades, editor requests, content migration tools |

### **Option B: Sanity.io (Headless CMS) + Supabase for Auth/Data**
| Aspect | Reality |
|--------|---------|
| **Sanity Free tier** | Unlimited projects, 10K docs, 1M API requests/mo, 5 users — **$0** |
| **Sanity Growth** | $199/mo — 100K docs, 5M requests, 10 users, SSO — client buys |
| **What you get** | Visual editor, custom desk, GROQ queries, real-time preview, image pipeline, webhooks, CLI, TypeScript types generated |
| **Dev time to integrate** | **2-3 days** (schema + client + GROQ queries) |
| **Content team autonomy** | Marketing edits without you — zero dev dependency |

### **Option C: Supabase Only (No Traditional CMS)**
| Works if | Content is highly structured, few editors, you're OK building admin UI |
|----------|---------------------------------------------------------------------|
| Fails if | Marketing needs rich text, page composition, visual preview, SEO workflow |

---

## 💡 **My Recommendation: Hybrid Approach**

```
┌─────────────────────────────────────────────────────────────┐
│                     flowtaris.ai                            │
├─────────────────────────────────────────────────────────────┤
│  FRONTEND (Next.js 14 on Vercel)                           │
├──────────────────┬──────────────────────────────────────────┤
│  CONTENT LAYER   │  APPLICATION LAYER                        │
│  (Sanity.io)     │  (Supabase)                               │
│  • Case studies  │  • Auth (magic link/SSO for future       │
│  • Capabilities  │    client portal)                         │
│  • Insights/blog │  • ROI calculator submissions             │
│  • Platform pages│  • Contact form → database                │
│  • SEO/GEO fields│  • Analytics events                       │
│  • Visual editor │  • Email capture → waitlist               │
│  • Preview mode  │  • Future: user preferences, dashboards   │
└──────────────────┴──────────────────────────────────────────┘
```

**Your cost with this hybrid:**
| Service | Tier | Monthly |
|---------|------|---------|
| Vercel | Pro | $20 |
| Supabase | Free → Pro at launch | $0 → $25 |
| Sanity | Free (dev) → Growth (client) | $0 (you) |
| GitHub | Free | $0 |
| **Total (you, at launch)** | | **$45/mo** |
| **Total (client, ongoing)** | | **$224/mo** (Vercel Pro + Supabase Pro + Sanity Growth) |

---

## 🛠️ **One-Time Setup Costs (Your Time, Not Money)**

| Task | Hours | Notes |
|------|-------|-------|
| Monorepo + Next.js 14 + TypeScript + Tailwind | 8-16h | Turborepo, ESLint, Prettier, Husky |
| Design system (tokens, primitives, Storybook) | 24-40h | Reusable for .net/.co |
| Epic components (parallax, split-text, scroll-timeline, floating product, clip-path reveal, iris window) | 60-100h | The "cinematic" layer |
| Data viz components (StatTile, BeforeAfterBar, ROICalculator, PlatformMatrix) | 20-30h | Chart.js / Recharts / custom SVG |
| Sanity schema + desk structure + GROQ queries | 12-20h | Content modeling |
| Supabase setup (auth, tables, RLS, edge functions) | 8-16h | Minimal — just app data |
| SEO/GEO/AIO implementation (schema, sitemaps, meta) | 12-20h | Automated in build |
| CI/CD (GitHub Actions → Vercel preview + prod) | 8-12h | Lighthouse budgets, schema validation |
| QA (cross-browser, accessibility, performance, reduced-motion) | 16-24h | Manual + automated |
| Content entry (case studies, capabilities, insights) | 8-16h | You or client |
| **Total dev hours** | **196-314h** | **5-8 weeks solo** |

---

## 💸 **Bottom Line: Your Cash Investment**

| Phase | Your Cash Outlay |
|-------|------------------|
| **Development (6-8 weeks)** | **$0** (all free tiers) |
| **Launch month** | **$45** (Vercel Pro + Supabase Pro) |
| **Months 2-12** | **$45-49/mo** |
| **Year 1 total** | **~$540-590** |

**Compare to client quote: ₹21-32L (~$25-38K)**
- Your infrastructure cost: **<2% of project value**
- Your time investment: **500-800 hours** (the real cost)

---

## 🎯 **Action Items This Week**

1. **Create GitHub org** (free) → `flowtaris-ecosystem`
2. **Create Vercel account** → connect GitHub, import repo when ready
3. **Create Supabase project** → `flowtaris-ai` (free tier)
4. **Create Sanity project** → `flowtaris-ai` (free tier) — **do this even if you're unsure**; schema design takes 2 days and costs $0
5. **Decide CMS strategy** — Sanity (recommended) vs build-your-own-on-Supabase
6. **Initialize monorepo** → `npx create-turbo@latest` → add 3 Next.js apps

---

## ❓ **FAQ**

**Q: Can I use Supabase for everything and skip Sanity?**
A: Yes, but you'll spend 4-6 weeks building a CMS instead of building the cinematic frontend. The epic design work (parallax, scroll animations, data viz) is what differentiates this project — that's where your 196-314 hours should go.

**Q: What if client refuses to pay for Sanity Growth ($199/mo)?**
A: Sanity Free tier handles 10K documents and 1M API requests/month. flowtaris.ai will have ~200-500 documents. Free tier lasts **years**. Client only upgrades for SSO/team seats.

**Q: Vercel Hobby enough for launch?**
A: 100GB bandwidth + 100GB-hours serverless. For a B2B site with 5-10K visits/month: **yes for 3-6 months**. Upgrade to Pro when bandwidth >80GB or you need password protection for staging.

**Q: Supabase Free enough for launch?**
A: 500MB DB, 2GB bandwidth, 50K MAU. For auth + form submissions + calculator leads: **yes for 12+ months**. Upgrade when DB >400MB or bandwidth >1.5GB.

**Q: Should I use Supabase Auth or NextAuth?**
A: **Supabase Auth** — built-in magic links, OAuth providers, RLS integration, session management. NextAuth adds complexity without benefit here.

---

*All prices in USD. INR equivalent ~₹3,700/mo at launch (₹83/USD).*
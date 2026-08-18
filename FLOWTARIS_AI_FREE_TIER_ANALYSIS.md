# flowtaris.ai — Can You Run This 100% Free Forever?

**Short answer: Yes for development. No for production launch — not sustainably.**

---

## 🆓 **What's Free Forever (No Credit Card)**

| Service | Free Tier Limits | Sufficient For |
|---------|------------------|----------------|
| **GitHub** | Unlimited private repos, 2000 CI min/mo, 500MB packages | ✅ All development, CI/CD |
| **Vercel Hobby** | 100GB bandwidth/mo, 100GB-hrs serverless, ISR, Edge, custom domains | ✅ Dev, staging, **low-traffic production** |
| **Supabase Free** | 500MB DB, 1GB file storage, 2GB bandwidth, 50K MAU, Auth, Realtime, Edge Functions | ✅ Dev, staging, **low-traffic production** |
| **Sanity Free** | Unlimited projects, 10K docs, 1M API requests/mo, 5 users, CDN | ✅ All content needs for this project |

---

## 📊 **The Math: When Free Breaks**

### Vercel Hobby Limits
| Metric | Limit | flowtaris.ai Reality |
|--------|-------|---------------------|
| **Bandwidth** | 100 GB/mo | ~50GB at 10K visits (5MB/page) |
| **Serverless execution** | 100 GB-hrs/mo | ~20 GB-hrs at 10K visits |
| **Function timeout** | 10s (Hobby) vs 60s (Pro) | ROI calculator may hit 10s |
| **Password protection** | ❌ Not available | Needed for client staging review |
| **Analytics** | Basic only | No Web Vitals, no custom events |
| **Team seats** | 1 | You + client = 2 minimum |

**Breaks at:** ~15-20K visits/month OR need for password-protected staging

### Supabase Free Limits
| Metric | Limit | flowtaris.ai Reality |
|--------|-------|---------------------|
| **Database** | 500 MB | ~50MB for auth + forms + calculator leads (years of headroom) |
| **Bandwidth** | 2 GB/mo | ~500MB at 10K visits (API calls) |
| **File storage** | 1 GB | 0 GB (images in Sanity/CDN) |
| **MAU** | 50,000 | ~2,000 MAU at 10K visits |
| **Backups** | ❌ No daily backups, no PITR | **Risk: no point-in-time recovery** |
| **Custom SMTP** | ❌ Not available | Needed for transactional emails |

**Breaks at:** Need for backups/PITR OR custom email OR >50K MAU

### Sanity Free Limits
| Metric | Limit | flowtaris.ai Reality |
|--------|-------|---------------------|
| **Documents** | 10,000 | ~500 for this project |
| **API requests** | 1M/mo | ~200K at 10K visits |
| **Users** | 5 | You + 4 client editors = tight |
| **SSO** | ❌ Not available | Client IT policy may require |

**Breaks at:** >5 editors OR SSO requirement

---

## 🎯 **Realistic Free-Tier Timeline**

```
Month 0-2 (Dev)          Month 3 (Launch)        Month 4-6           Month 6+
├── All free ✅          ├── Vercel Hobby OK     ├── Bandwidth 80%+    ├── Must upgrade
├── Supabase Free ✅     ├── Supabase Free OK    ├── No backups = risk ├── Vercel Pro $20
├── Sanity Free ✅       ├── Sanity Free OK      ├── 5th editor added  ├── Supabase Pro $25
└── $0/month             └── $0/month            └── Password protect  └── Sanity Growth $199
                                                 needed for client
```

---

## 🛠️ **Workarounds to Extend Free Tier**

### Vercel Hobby Stretch Tactics
| Tactic | Savings | Effort |
|--------|---------|--------|
| **Static export + CDN** | Zero serverless usage | Medium (loses ISR, dynamic routes) |
| **Aggressive caching** | 50-70% bandwidth reduction | Low (Cache-Control headers) |
| **Image optimization off** | Saves bandwidth | Low (next.config.js) |
| **Edge middleware → client-side** | Saves execution | Medium (auth, geo-routing) |
| **Client-side analytics** | No Vercel Analytics cost | Low (GA4 only) |

### Supabase Free Stretch Tactics
| Tactic | Savings | Effort |
|--------|---------|--------|
| **pg_dump to GitHub weekly** | Backup strategy | Low (GitHub Action) |
| **Resend/EmailJS free tier** | Transactional email | Low (3K emails/mo free) |
| **Local auth only (no SSO)** | Avoids Pro requirement | None |

---

## ⚠️ **The "Client Review" Problem**

**This is where free tier fails first:**

| Need | Free Tier | Workaround |
|------|-----------|------------|
| **Password-protected staging** for client review | ❌ Vercel Hobby: No | Deploy to separate `staging.flowtaris.ai` on Netlify (free password protect) |
| **Client edits in Sanity** with 5-user limit | ⚠️ Tight (you + 4 editors) | Rotate access, or you publish for them |
| **Custom domain SSL** | ✅ Vercel Hobby: Yes | Works |
| **Form submissions → email** | ❌ Supabase: No custom SMTP | Use Resend free tier (3K/mo) or Formspree free |

---

## 💰 **Honest Assessment: Minimum Viable Spend**

| If You Accept... | Monthly Cost | What You Give Up |
|------------------|--------------|------------------|
| **Password-protected staging on Netlify (free)** | $0 | Two deploy targets (Vercel prod + Netlify staging) |
| **Manual pg_dump backups to GitHub** | $0 | No point-in-time recovery, manual restore |
| **Resend free tier for emails** | $0 | 3K emails/mo limit |
| **You publish content for client** | $0 | Client can't edit directly |
| **GA4 only (no Vercel Analytics)** | $0 | No Web Vitals dashboard |

**Total: $0/month — but operational burden on YOU**

---

## 🚨 **When You'll Regret $0 Strategy**

| Scenario | Pain |
|----------|------|
| Client needs urgent content change at 10pm | You must do it (no editor access) |
| Staging deploy breaks, client demo tomorrow | No password protect, public sees broken build |
| Database corruption | No PITR — manual pg_dump restore, data loss |
| Traffic spikes (PR hit, conference) | Vercel throttles, site goes down |
| Client IT demands SSO | Sanity forces $199/mo upgrade |
| You get hit by a bus | No team seats, no handoff path |

---

## 🎯 **My Recommendation: $0 Dev → $45 Launch**

```
Phase           | Your Cost | Strategy
----------------|-----------|---------------------------------------
Weeks 1-6 (Dev) | $0        | All free tiers, localhost + Vercel preview
Week 6 (Launch) | $0        | Vercel Hobby + Supabase Free + Sanity Free
Month 2-3       | $0        | Monitor usage, pg_dump weekly, Resend free
Month 4         | $20       | Vercel Pro (password protect + analytics)
Month 6         | +$25      | Supabase Pro (backups + PITR + custom SMTP)
Month 12        | +$199*    | Sanity Growth (client pays, not you)
```

*Pivot: Client pays Sanity Growth when they need SSO/5+ editors. You never pay this.

**Your max out-of-pocket: $45/mo starting month 4. $0 for first 3 months.**

---

## 🛑 **Hard Stops: You Cannot Avoid These**

| If this happens | You MUST pay |
|-----------------|--------------|
| Client requires password-protected staging | Vercel Pro $20 OR Netlify (free) + dual deploy |
| Client requires daily automated DB backups | Supabase Pro $25 |
| Client requires transactional email at scale | Resend Pro $20 OR Supabase Pro $25 |
| Traffic exceeds 15K visits/mo | Vercel Pro $20 |
| Client IT mandates SSO | Sanity Growth $199 (client pays) |

---

## ✅ **Start 100% Free This Week**

```bash
# 1. GitHub - always free
gh repo create flowtaris-ecosystem --private

# 2. Vercel - Hobby free forever
# vercel.com → Import GitHub repo → Add custom domain flowtaris.ai

# 3. Supabase - Free tier
# supabase.com → New project "flowtaris-ai" → Save keys

# 4. Sanity - Free tier
# sanity.io → New project "flowtaris-ai" → npm create sanity@latest

# 5. Resend - Free tier (3K emails/mo)
# resend.com → Verify domain → API key

# 6. Start coding
npx create-turbo@latest flowtaris-ecosystem
```

---

## 📋 **Decision Matrix**

| Your Priority | Recommended Path |
|---------------|------------------|
| **$0 at all costs, I'll do manual work** | Free forever + Netlify staging + pg_dump + you publish content |
| **Professional handoff, client autonomy** | Free dev → $45/mo at month 4 (Vercel + Supabase Pro) |
| **Client pays everything from day 1** | Client creates Vercel/Supabase/Sanity on their cards, you deploy to their projects |

---

**Bottom line:** You **can** launch on $0. But you become the **ops team** — manual backups, no staging passwords, no client editing autonomy, no PITR. At $45/mo (month 4+), you buy professional infrastructure and your time back.

**Start free. Decide at month 3 based on real traffic.**
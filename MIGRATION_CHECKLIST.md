# Flowtaris AI - Complete Migration Checklist for New Laptop

> **Project**: flowtarisai  
> **Type**: Turborepo Monorepo (Next.js 15+ app + Sanity Studio + Shared Packages)  
> **Node Version**: >=18 (recommend Node 20+ LTS)  
> **Package Manager**: npm 11.16.0  
> **Last Updated**: 2026-08-17  

---

## 📦 Project Structure Overview

```
flowtarisai/
├── flowtaris-ecosystem/           # Main Turborepo monorepo
│   ├── apps/
│   │   ├── flowtaris-ai/          # Next.js 15+ App (Main Website)
│   │   └── sanity-studio/         # Sanity CMS Studio
│   ├── packages/                  # Shared internal packages (11 packages)
│   │   ├── analytics/
│   │   ├── assessment-engine/
│   │   ├── cms-client/
│   │   ├── eslint-config/
│   │   ├── inaction-engine/
│   │   ├── roi-engine/
│   │   ├── sanity-studio/
│   │   ├── seo/
│   │   ├── supabase-client/
│   │   ├── typescript-config/
│   │   └── ui/
│   ├── .env.local                 # Local dev secrets (NOT committed)
│   ├── .env.example               # Template for env vars
│   ├── .env.production            # Production env template (for Vercel)
│   ├── turbo.json                 # Turborepo config
│   └── package.json               # Root package.json with workspaces
├── .claude/                       # Claude Code configuration
├── .storybook/                    # Storybook config (root level)
├── stories/                       # Storybook stories
├── node_modules/                  # Root node_modules (dev dependencies)
└── Various .md docs               # Project documentation
```

---

## ✅ Phase 1: Prerequisites on New Laptop

### Required Software Installation
- [ ] **Node.js 20+ LTS** - Download from [nodejs.org](https://nodejs.org/)
  - Verify: `node --version` (should be v20.x.x or higher)
  - Verify: `npm --version` (should be 10.x.x or higher)
- [ ] **Git** - Download from [git-scm.com](https://git-scm.com/)
  - Configure: `git config --global user.name "Your Name"`
  - Configure: `git config --global user.email "your@email.com"`
- [ ] **VS Code** (recommended) - Download from [code.visualstudio.com](https://code.visualstudio.com/)
  - Recommended Extensions:
    - ESLint
    - Prettier
    - TypeScript Vue Plugin (Volar)
    - Tailwind CSS IntelliSense
    - Turbo Console Log
- [ ] **GitHub CLI** (optional but recommended) - `winget install GitHub.cli` or download
- [ ] **Vercel CLI** - `npm i -g vercel@latest`
- [ ] **Sanity CLI** - `npm i -g @sanity/cli@latest`

### Development Accounts Setup
- [ ] **GitHub** - Access to repository
- [ ] **Vercel** - Project deployment access
- [ ] **Sanity.io** - Project ID: `5gbgq9zl`, dataset: `production`
- [ ] **Supabase** - Project access for database/auth
- [ ] **Resend** - Email API access
- [ ] **Google Analytics / GTM** - Measurement IDs
- [ ] **Sentry** - Error tracking project access

---

## ✅ Phase 2: Repository Clone & Initial Setup

### Clone the Repository
```bash
# Option 1: HTTPS
git clone https://github.com/YOUR_ORG/flowtarisai.git

# Option 2: SSH (if you have SSH keys set up)
git clone git@github.com:YOUR_ORG/flowtarisai.git

cd flowtarisai
```

### Verify Git History
```bash
git log --oneline -10
git status
```

---

## ✅ Phase 3: Environment Variables Setup

### 3.1 Root Level (.env.local in flowtaris-ecosystem)
```bash
cd flowtaris-ecosystem
cp .env.example .env.local
```

**Edit `.env.local` with your actual values:**

| Variable | Source | Required |
|----------|--------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity Dashboard | ✅ Yes (5gbgq9zl) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity Dashboard | ✅ Yes (production) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity Dashboard | ✅ Yes (2024-01-01) |
| `SANITY_API_TOKEN` | Sanity API Settings | ✅ For preview mode |
| `SANITY_PREVIEW_SECRET` | Generate random string | ✅ For preview mode |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard | ✅ Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard | ✅ Server-side only |
| `SUPABASE_URL` | Supabase Dashboard | ✅ Yes |
| `RESEND_API_KEY` | Resend Dashboard | ✅ Email features |
| `RESEND_FROM_EMAIL` | Your verified domain | ✅ Email features |
| `RESEND_TO_EMAIL` | Your leads email | ✅ Email features |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics | Optional |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | Optional |
| `SENTRY_DSN` | Sentry Dashboard | Optional |
| `SENTRY_ORG` | Sentry Dashboard | Optional |
| `SENTRY_PROJECT` | Sentry Dashboard | Optional |
| `SENTRY_AUTH_TOKEN` | Sentry Dashboard | Optional |
| `NEXT_PUBLIC_APP_URL` | Local: http://localhost:3000 | ✅ Yes |
| `NEXT_PUBLIC_APP_NAME` | Flowtaris AI | ✅ Yes |
| `NODE_ENV` | development | ✅ Yes |

### 3.2 Flowtaris AI App (.env.local)
```bash
cd apps/flowtaris-ai
# Check if .env.local exists, create if needed
ls -la .env.local
```

### 3.3 Sanity Studio
```bash
cd ../sanity-studio
# Sanity uses its own config, typically no .env.local needed
# But verify sanity.cli.ts or sanity.config.ts for any env requirements
```

### 3.4 Generate Secure Secrets
```bash
# Generate SANITY_PREVIEW_SECRET (run in terminal)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate any other needed secrets
```

---

## ✅ Phase 4: Dependency Installation

### 4.1 Install Root Dependencies
```bash
cd flowtaris-ecosystem
npm install
```

### 4.2 Install Workspace Dependencies (Turborepo handles this)
```bash
# This installs all workspace packages
npm install
```

### 4.3 Verify Package Installation
```bash
# Check that all packages have node_modules
ls apps/flowtaris-ai/node_modules
ls apps/sanity-studio/node_modules
ls packages/*/node_modules
```

### 4.4 Install Global Tools (if needed)
```bash
npm install -g turbo@latest
npm install -g vercel@latest
npm install -g @sanity/cli@latest
```

---

## ✅ Phase 5: Build Verification

### 5.1 Type Checking
```bash
cd flowtaris-ecosystem
npm run check-types
```

### 5.2 Linting
```bash
npm run lint
```

### 5.3 Build All Packages
```bash
npm run build
```

### 5.4 Verify Individual App Builds
```bash
# Build Next.js app
cd apps/flowtaris-ai
npm run build

# Build Sanity Studio
cd ../sanity-studio
npm run build
```

---

## ✅ Phase 6: Development Server Testing

### 6.1 Start All Dev Servers (Turborepo)
```bash
cd flowtaris-ecosystem
npm run dev
```

This should start:
- **Next.js app** at http://localhost:3000
- **Sanity Studio** at http://localhost:3333 (or configured port)

### 6.2 Test Individual Apps
```bash
# Terminal 1: Next.js App
cd apps/flowtaris-ai
npm run dev

# Terminal 2: Sanity Studio  
cd apps/sanity-studio
npm run dev
```

### 6.3 Verify Features Work
- [ ] Next.js app loads at localhost:3000
- [ ] Sanity Studio loads and connects to project
- [ ] Supabase connection works (check auth, database)
- [ ] Environment variables load correctly
- [ ] No console errors in browser dev tools

---

## ✅ Phase 7: External Services Configuration

### 7.1 Sanity CMS
- [ ] Log into [sanity.io/manage](https://www.sanity.io/manage)
- [ ] Verify project `5gbgq9zl` exists
- [ ] Add new laptop's IP to CORS origins if needed
- [ ] Verify API tokens are valid
- [ ] Run typegen: `cd packages/sanity-studio && npm run typegen`

### 7.2 Supabase
- [ ] Log into [supabase.com/dashboard](https://supabase.com/dashboard)
- [ ] Verify project exists and is active
- [ ] Check API keys match .env.local
- [ ] Verify database migrations are up to date
- [ ] Check RLS policies

### 7.3 Vercel
- [ ] Log into [vercel.com](https://vercel.com)
- [ ] Import/verify project
- [ ] Add all production environment variables to Vercel dashboard
- [ ] Verify preview deployments work

### 7.4 Resend
- [ ] Verify domain `flowtaris.ai` is verified
- [ ] Check API key in .env.local
- [ ] Test email sending

### 7.5 Analytics & Monitoring
- [ ] Google Analytics 4 - verify measurement ID
- [ ] Google Tag Manager - verify container ID
- [ ] Sentry - verify DSN and project

---

## ✅ Phase 8: Git & CI/CD Verification

### 8.1 Git Hooks
```bash
cd flowtaris-ecosystem
npm run prepare  # Installs husky hooks
```

### 8.2 Test Pre-commit Hooks
```bash
# Make a small change and try to commit
git add .
git commit -m "test: verify husky hooks work"
```

### 8.3 GitHub Actions (if applicable)
- [ ] Check `.github/workflows/` for CI pipelines
- [ ] Verify secrets are set in GitHub repo settings
- [ ] Trigger a test workflow run

---

## ✅ Phase 9: Documentation & Knowledge Transfer

### 9.1 Key Documentation Files (Already in Repo)
- [ ] `FLOWTARIS_AI_FINAL_MASTER_PLAN.md` - Master project plan
- [ ] `FLOWTARIS_AI_PROJECT_HANDOFF.md` - Handoff documentation
- [ ] `FLOWTARIS_AI_100_STEP_CHECKLIST.md` - Detailed checklist
- [ ] `FLOWTARIS_BRAND_ECOSYSTEM_MASTERPLAN.md` - Brand guidelines
- [ ] `SPRINT_2_AUDIT.md` - Sprint audit findings
- [ ] `AGENTS.md` in apps/flowtaris-ai/ - AI agent instructions
- [ ] `CLAUDE.md` in apps/flowtaris-ai/ - Claude Code config

### 9.2 Architecture Overview
- **Frontend**: Next.js 15+ with App Router, React 19, Tailwind CSS 4
- **CMS**: Sanity Studio v3
- **Database/Auth**: Supabase (PostgreSQL)
- **Email**: Resend
- **Deployment**: Vercel
- **Monitoring**: Sentry
- **Analytics**: GA4 + GTM
- **Package Manager**: npm with Turborepo
- **Styling**: Tailwind CSS 4, CSS Modules
- **Animation**: GSAP, Framer Motion
- **Charts**: Recharts

---

## ✅ Phase 10: Troubleshooting Common Issues

### Issue: "Module not found" errors
```bash
# Clear all node_modules and reinstall
cd flowtaris-ecosystem
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
npm install
```

### Issue: Turbo cache issues
```bash
cd flowtaris-ecosystem
npx turbo clean
npm run build
```

### Issue: TypeScript errors after Node upgrade
```bash
# Ensure types match Node version
npm run check-types
```

### Issue: Sanity Studio won't connect
- Verify `SANITY_API_TOKEN` has correct permissions
- Check CORS settings in Sanity dashboard
- Verify project ID and dataset

### Issue: Supabase connection fails
- Verify URL and keys in .env.local
- Check if Supabase project is paused (free tier)
- Verify network/firewall allows connections

### Issue: Next.js 15 App Router issues
- Check `next.config.ts` for any custom config
- Verify React 19 compatibility
- Clear `.next` folder: `rm -rf apps/flowtaris-ai/.next`

---

## ✅ Phase 11: Final Verification Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Repository cloned | ☐ | |
| Node.js 20+ installed | ☐ | |
| All dependencies installed | ☐ | |
| `.env.local` configured | ☐ | |
| TypeScript compiles | ☐ | |
| Linting passes | ☐ | |
| All packages build | ☐ | |
| Next.js dev server runs | ☐ | |
| Sanity Studio runs | ☐ | |
| Supabase connects | ☐ | |
| Sanity CMS accessible | ☐ | |
| Vercel CLI authenticated | ☐ | |
| Git hooks working | ☐ | |
| Can deploy to Vercel preview | ☐ | |
| Documentation reviewed | ☐ | |

---

## 🚀 Quick Start Commands (After Migration)

```bash
# Navigate to project
cd flowtarisai/flowtaris-ecosystem

# Install everything
npm install

# Start development
npm run dev

# Build for production
npm run build

# Deploy to Vercel (from root)
vercel --prod

# Deploy Sanity Studio
cd apps/sanity-studio && npx sanity deploy
```

---

## 📞 Support Contacts

- **Repository**: [GitHub URL]
- **Vercel Project**: [Vercel Dashboard URL]
- **Sanity Project**: https://www.sanity.io/manage/projects/5gbgq9zl
- **Supabase Project**: [Supabase Dashboard URL]
- **Resend**: [Resend Dashboard URL]

---

## 📝 Notes for Future Reference

1. **Node Version**: Project requires Node >=18, recommend 20 LTS
2. **Package Manager**: Uses npm 11.16.0 (specified in devEngines)
3. **Turborepo**: Manages builds across all workspaces
4. **Environment Files**: Never commit `.env.local` or `.env.production` with real secrets
5. **Sanity Typegen**: Run after schema changes: `npm run sanity:typegen`
6. **Husky Hooks**: Pre-commit runs lint-staged on staged files
6. **Next.js Version**: Currently on 16.3.0 (bleeding edge)
7. **React Version**: Currently on 19.2.8 (bleeding edge)

---

*Migration checklist created: 2026-08-17*
*Project: flowtarisai*
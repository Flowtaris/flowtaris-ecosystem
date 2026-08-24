import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flowtaris AI | Enterprise AI Automation for Finance',
  description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP for NetSuite, Coupa, SAP, and Workday.',
  openGraph: {
    title: 'Flowtaris AI | Enterprise AI Automation for Finance',
    description: 'Enterprise AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics.',
    type: 'website',
  },
}

const trustSignals = [
  { label: 'Certified', value: 'SOC 2' },
  { label: 'Compliant', value: 'GDPR' },
  { label: 'Certified', value: 'ISO 27001' },
  { label: 'Uptime SLA', value: '99.99%' },
  { label: 'API Calls/Day', value: '50M+' },
  { label: 'Trusted By', value: 'Fortune 500' },
]

const capabilities = [
  { name: 'GenAI Document Intelligence', category: 'Document Processing', icon: '⚡', desc: 'Automatically extract, classify, and validate financial documents with 99.8% accuracy.', platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'] },
  { name: 'Autonomous Workflow Engine', category: 'Process Automation', icon: '🔄', desc: 'Self-healing workflows that adapt to exceptions without human intervention.', platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'] },
  { name: 'Predictive Analytics', category: 'Finance Intelligence', icon: '📊', desc: 'Forecast cash flow, detect anomalies, and surface actionable insights in real time.', platforms: ['NetSuite', 'SAP', 'Workday'] },
  { name: 'Conversational ERP Interface', category: 'Human-Computer Interaction', icon: '💬', desc: 'Ask your ERP anything in plain English. Get instant answers, run approvals, update records.', platforms: ['NetSuite', 'Workday'] },
  { name: 'Integration Health Monitoring', category: 'Observability', icon: '🛡️', desc: 'Real-time visibility into every integration, with automated alerting and self-healing.', platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'] },
  { name: 'AI Governance & Compliance', category: 'Risk & Compliance', icon: '✅', desc: 'Full audit trail, explainable AI, and regulatory controls built into every workflow.', platforms: ['SAP', 'Coupa'] },
]

const stats = [
  { value: '200+', label: 'Enterprise Customers' },
  { value: '95%', label: 'Automation Rate' },
  { value: '$50M+', label: 'Annual Savings' },
  { value: '4', label: 'ERP Platforms' },
]

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #05050a 0%, #0d0d1a 50%, #05050a 100%)', color: '#ffffff', fontFamily: "'Inter', sans-serif" }}>

      {/* ===== HERO SECTION ===== */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', overflow: 'hidden', textAlign: 'center' }}>

        {/* Background orbs */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '20%', left: '15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,184,219,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(83,91,159,0.08) 0%, transparent 60%)', filter: 'blur(100px)' }} />
          {/* Grid */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }} viewBox="0 0 1920 1080" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, border: '1px solid rgba(0,184,219,0.35)', background: 'rgba(0,184,219,0.08)', marginBottom: 32, fontSize: 13, color: '#00b8db', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#00b8db', display: 'inline-block', boxShadow: '0 0 8px #00b8db' }} />
          Enterprise-Grade AI for Finance Teams
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: 900, margin: '0 auto 28px', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
          <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #a0aec0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            AI Automation
          </span>
          <br />
          <span style={{ background: 'linear-gradient(135deg, #00b8db 0%, #535b9f 60%, #f59e0b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            for Enterprise Finance
          </span>
        </h1>

        {/* Subheadline */}
        <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: 'rgba(255,255,255,0.65)', maxWidth: 700, margin: '0 auto 52px', lineHeight: 1.65, fontWeight: 400 }}>
          GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP — native on NetSuite, Coupa, SAP, and Workday.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 72 }}>
          <a href="/assessment" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', borderRadius: 99, background: 'linear-gradient(135deg, #00b8db 0%, #0096b3 100%)', color: '#05050a', fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 0 30px rgba(0,184,219,0.35)', letterSpacing: '-0.01em', transition: 'all 0.2s' }}>
            Start Free Assessment →
          </a>
          <a href="/roi-calculator" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', color: '#ffffff', fontWeight: 600, fontSize: 16, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', letterSpacing: '-0.01em' }}>
            Calculate Your ROI
          </a>
        </div>

        {/* Stats bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px 48px', justifyContent: 'center', padding: '28px 48px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', maxWidth: 700, width: '100%' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, background: 'linear-gradient(135deg, #00b8db, #7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500, marginTop: 4, letterSpacing: '0.03em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.3)', fontSize: 12, letterSpacing: '0.1em' }}>
          <span>SCROLL</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ animation: 'bounce 2s infinite' }}>
            <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ===== TRUST SIGNALS ===== */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '56px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 12, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 36 }}>Compliance & Reliability</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px 24px' }}>
            {trustSignals.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '20px 28px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', minWidth: 120 }}>
                <span style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg, #00b8db, #7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {s.value}
                </span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT SHOWCASE ===== */}
      <section style={{ padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 64, alignItems: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: 700 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, background: 'linear-gradient(135deg, #ffffff 0%, #a0aec0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: "'Space Grotesk', sans-serif" }}>
              Intelligence you can see and interact with
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Experience the power of our conversational ERP interface and predictive analytics engines.
              Our platform doesn't just process data — it visualizes it, predicts trends, and answers your questions in real-time.
            </p>
          </div>

          {/* Dashboard mock */}
          <div style={{ width: '100%', maxWidth: 900, borderRadius: 24, overflow: 'hidden', border: '1px solid rgba(0,184,219,0.2)', boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,184,219,0.08)', background: 'rgba(10,10,20,0.95)' }}>
            {/* Window chrome */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 20px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: 16, fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>Flowtaris AI — Finance Intelligence Dashboard</span>
            </div>
            {/* Dashboard content */}
            <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              {[
                { label: 'Invoices Processed Today', value: '12,847', change: '+14%', color: '#00b8db' },
                { label: 'Automation Rate', value: '97.3%', change: '+2.1%', color: '#28c840' },
                { label: 'Exceptions Flagged', value: '23', change: '-68%', color: '#f59e0b' },
              ].map((metric, i) => (
                <div key={i} style={{ padding: '20px 20px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{metric.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: metric.color, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>{metric.value}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>{metric.change} vs last week</div>
                </div>
              ))}
            </div>
            {/* Chart area */}
            <div style={{ margin: '0 28px 28px', padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', height: 140 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Processing Volume — Last 7 Days</div>
              <svg viewBox="0 0 800 80" style={{ width: '100%', height: 80 }} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00b8db" />
                    <stop offset="100%" stopColor="#535b9f" />
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00b8db" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#00b8db" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,60 C100,55 150,20 200,25 C250,30 300,40 350,15 C400,0 450,10 500,20 C550,30 600,5 650,10 C700,15 750,25 800,20" fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" />
                <path d="M0,60 C100,55 150,20 200,25 C250,30 300,40 350,15 C400,0 450,10 500,20 C550,30 600,5 650,10 C700,15 750,25 800,20 L800,80 L0,80 Z" fill="url(#areaGrad)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section style={{ padding: '96px 24px', background: 'rgba(255,255,255,0.01)' }} aria-labelledby="capabilities-heading">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <h2 id="capabilities-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, background: 'linear-gradient(135deg, #00b8db 0%, #535b9f 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontFamily: "'Space Grotesk', sans-serif" }}>
              Six Production-Grade Capabilities
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              Covering the full finance automation lifecycle — from document ingestion to governance.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {capabilities.map((cap, i) => (
              <article key={i} style={{ padding: '32px 28px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.3s', cursor: 'default' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{cap.icon}</div>
                <div style={{ fontSize: 11, color: '#00b8db', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: 10 }}>{cap.category}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginBottom: 12, letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>{cap.name}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, marginBottom: 20 }}>{cap.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {cap.platforms.map((p) => (
                    <span key={p} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 99, background: 'rgba(0,184,219,0.08)', border: '1px solid rgba(0,184,219,0.2)', color: '#00b8db', fontWeight: 500 }}>{p}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '72px 48px', borderRadius: 32, background: 'linear-gradient(135deg, rgba(0,184,219,0.12) 0%, rgba(83,91,159,0.12) 100%)', border: '1px solid rgba(0,184,219,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,184,219,0.15) 0%, transparent 70%)' }} />
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#ffffff', marginBottom: 16, letterSpacing: '-0.03em', fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to automate your finance operations?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', marginBottom: 40, lineHeight: 1.6 }}>
            Get a free AI readiness assessment and personalized roadmap in 3 minutes.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <a href="/assessment" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', borderRadius: 99, background: 'linear-gradient(135deg, #00b8db, #0096b3)', color: '#05050a', fontWeight: 700, fontSize: 16, textDecoration: 'none', boxShadow: '0 0 30px rgba(0,184,219,0.4)' }}>
              Start Free Assessment →
            </a>
            <a href="/roi-calculator" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 36px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', color: '#ffffff', fontWeight: 600, fontSize: 16, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
              Calculate ROI
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {['Capabilities', 'Case Studies', 'Assessment', 'ROI Calculator', 'Insights', 'About', 'Contact'].map((link) => (
              <a key={link} href={`/${link.toLowerCase().replace(/ /g, '-')}`} style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}>
                {link}
              </a>
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>© 2024 Flowtaris AI. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        a:hover { opacity: 0.85; }
      `}</style>
    </div>
  )
}
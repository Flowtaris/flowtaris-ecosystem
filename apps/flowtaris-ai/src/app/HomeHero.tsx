'use client'

// HomeHero — Pure CSS animated hero, guaranteed to render.
// Uses CSS variables from @repo/ui/tokens + CSS @keyframes, no JS animation timers.

const stats = [
  { value: '200+', label: 'Enterprise Customers' },
  { value: '95%', label: 'Automation Rate' },
  { value: '$50M+', label: 'Annual Savings' },
  { value: '4', label: 'ERP Platforms' },
]

const platforms = ['NetSuite', 'Coupa', 'SAP', 'Workday']

export function HomeHero() {
  return (
    <>
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-orb-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(24px, -18px) scale(1.05); }
          66%       { transform: translate(-16px, 14px) scale(0.97); }
        }
        @keyframes hero-ring-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes hero-ring-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes hero-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }
        @keyframes hero-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes hero-pulse-glow {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }

        .hero-fade-up-1 { animation: hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .hero-fade-up-2 { animation: hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s both; }
        .hero-fade-up-3 { animation: hero-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.45s both; }
        .hero-fade-up-4 { animation: hero-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s both; }
        .hero-fade-up-5 { animation: hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.85s both; }
      `}</style>

      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '120px 24px 80px',
          background: 'linear-gradient(180deg, #05050a 0%, #0a0a14 60%, #05050a 100%)',
        }}
      >
        {/* ── Background Layer: Gradient orbs ── */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '18%', left: '12%',
            width: 700, height: 700, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,184,219,0.13) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'hero-orb-drift 10s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', bottom: '15%', right: '8%',
            width: 600, height: 600, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'hero-orb-drift 14s ease-in-out infinite reverse',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 900, height: 900, borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(83,91,159,0.08) 0%, transparent 60%)',
            filter: 'blur(120px)',
            animation: 'hero-orb-drift 18s ease-in-out infinite',
          }} />
        </div>

        {/* ── Background Layer: Dot/grid ── */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.045 }}
               viewBox="0 0 1920 1080" preserveAspectRatio="none">
            <defs>
              <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* ── Background Layer: Rotating decorative rings ── */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '8%', left: '-6%',
            width: 500, height: 500, borderRadius: '50%',
            border: '1px solid rgba(0,184,219,0.18)',
            animation: 'hero-ring-spin 35s linear infinite',
            transformOrigin: 'center',
          }} />
          <div style={{
            position: 'absolute', top: '5%', left: '-9%',
            width: 560, height: 560, borderRadius: '50%',
            border: '1px solid rgba(0,184,219,0.08)',
            animation: 'hero-ring-spin 50s linear infinite reverse',
            transformOrigin: 'center',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-5%',
            width: 600, height: 600, borderRadius: '50%',
            border: '1px solid rgba(245,158,11,0.15)',
            animation: 'hero-ring-spin-rev 40s linear infinite',
            transformOrigin: 'center',
          }} />
          <div style={{
            position: 'absolute', top: '45%', right: '5%',
            width: 160, height: 160, borderRadius: '12px',
            border: '1px solid rgba(83,91,159,0.2)',
            transform: 'rotate(45deg)',
            animation: 'hero-pulse-glow 4s ease-in-out infinite',
          }} />
        </div>

        {/* ── Content ── */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 900, textAlign: 'center' }}>

          {/* Badge */}
          <div className="hero-fade-up-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 18px', borderRadius: 99, marginBottom: 36,
            border: '1px solid rgba(0,184,219,0.35)',
            background: 'rgba(0,184,219,0.08)',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#00b8db',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#00b8db', display: 'inline-block',
              boxShadow: '0 0 8px #00b8db',
              animation: 'hero-pulse-glow 2s ease-in-out infinite',
            }} />
            Enterprise-Grade AI for Finance Teams
          </div>

          {/* Headline */}
          <h1 className="hero-fade-up-2" style={{
            fontSize: 'clamp(3rem, 9vw, 7.5rem)',
            fontWeight: 800, lineHeight: 1.04,
            letterSpacing: '-0.035em',
            margin: '0 auto 28px',
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #c7d2e8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              AI Automation
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #00b8db 0%, #535b9f 55%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              for Enterprise Finance
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-fade-up-3" style={{
            fontSize: 'clamp(1rem, 2.4vw, 1.3rem)',
            color: 'rgba(255,255,255,0.58)',
            maxWidth: 680, margin: '0 auto 52px',
            lineHeight: 1.7, fontWeight: 400,
          }}>
            GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics,
            and Conversational ERP — native on{' '}
            {platforms.map((p, i) => (
              <span key={p}>
                <span style={{ color: '#00b8db', fontWeight: 500 }}>{p}</span>
                {i < platforms.length - 1 ? (i === platforms.length - 2 ? ', and ' : ', ') : '.'}
              </span>
            ))}
          </p>

          {/* CTA Buttons */}
          <div className="hero-fade-up-4" style={{
            display: 'flex', flexWrap: 'wrap', gap: 16,
            justifyContent: 'center', marginBottom: 72,
          }}>
            <a href="/assessment" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 38px', borderRadius: 99,
              background: 'linear-gradient(135deg, #00b8db 0%, #0096b3 100%)',
              color: '#05050a', fontWeight: 700, fontSize: 16, textDecoration: 'none',
              boxShadow: '0 0 40px rgba(0,184,219,0.40), 0 4px 20px rgba(0,0,0,0.4)',
              letterSpacing: '-0.01em', transition: 'transform 0.2s, box-shadow 0.2s',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >
              Start Free Assessment →
            </a>
            <a href="/roi-calculator" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 38px', borderRadius: 99,
              background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.9)',
              fontWeight: 600, fontSize: 16, textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)', letterSpacing: '-0.01em',
              transition: 'transform 0.2s',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >
              Calculate Your ROI
            </a>
          </div>

          {/* Stats */}
          <div className="hero-fade-up-5" style={{
            display: 'flex', flexWrap: 'wrap', gap: '24px 40px',
            justifyContent: 'center',
            padding: '28px 40px', borderRadius: 20,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)', maxWidth: 720, margin: '0 auto',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', minWidth: 120 }}>
                <div style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800,
                  background: 'linear-gradient(135deg, #00b8db, #62e4fa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  letterSpacing: '-0.03em', lineHeight: 1.1,
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 11, color: 'rgba(255,255,255,0.4)',
                  fontWeight: 500, marginTop: 5, letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll Indicator ── */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 36, left: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: 'rgba(255,255,255,0.25)', fontSize: 11, letterSpacing: '0.12em',
          fontFamily: "'Inter', system-ui, sans-serif",
          animation: 'hero-bounce 2.2s ease-in-out infinite',
        }}>
          <span>SCROLL</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 4v14M5 12l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* ── Vignette ── */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          boxShadow: 'inset 0 0 220px rgba(0,0,0,0.45)',
        }} />
      </section>
    </>
  )
}

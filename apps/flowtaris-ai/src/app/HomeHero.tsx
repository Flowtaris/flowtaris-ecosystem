'use client'

// HomeHero — Dual-Vision split hero with floating UI mockup background image.
// Left: Flowtaris.com long-term vision | Right: Flowtaris.ai AI-native vision

const stats = [
  { value: '200+', label: 'Enterprise Customers' },
  { value: '95%',  label: 'Automation Rate' },
  { value: '$50M+',label: 'Annual Savings' },
  { value: '4',    label: 'ERP Platforms' },
]

export function HomeHero() {
  return (
    <>
      <style>{`
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes hero-pulse-glow {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1; }
        }
        @keyframes hero-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes badge-dot-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,71,0.7); }
          50%       { box-shadow: 0 0 0 5px rgba(212,168,71,0); }
        }

        .hh-1 { animation: hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .hh-2 { animation: hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s  both; }
        .hh-3 { animation: hero-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
        .hh-4 { animation: hero-fade-up 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s  both; }
        .hh-5 { animation: hero-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) 0.65s both; }

        .hh-divider-line {
          position: absolute;
          inset: 0;
          left: 50%;
          width: 1px;
          background: linear-gradient(to bottom, transparent 0%, rgba(212,168,71,0.5) 25%, rgba(212,168,71,0.8) 50%, rgba(212,168,71,0.5) 75%, transparent 100%);
          pointer-events: none;
        }

        .hh-cta-primary:hover  { transform: translateY(-2px); box-shadow: 0 0 50px rgba(212,168,71,0.55), 0 8px 30px rgba(0,0,0,0.5) !important; }
        .hh-cta-secondary:hover { transform: translateY(-2px); background: rgba(255,255,255,0.1) !important; border-color: rgba(255,255,255,0.35) !important; }
        .hh-cta-primary, .hh-cta-secondary { transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
      `}</style>

      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '120px 0 80px',
          background: '#05050a',
        }}
        aria-label="Flowtaris AI — Dual Vision Hero"
      >
        {/* ── Background: Floating UI mockup image ── */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* The generated floating screens image — visible at high opacity */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.55,
          }} />

          {/* Lighter dark overlay — just enough to keep text readable */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(5,5,10,0.60) 0%, rgba(5,5,10,0.42) 40%, rgba(5,5,10,0.70) 100%)',
          }} />

          {/* Left side: very subtle cool tint */}
          <div style={{
            position: 'absolute', inset: 0, right: '50%',
            background: 'linear-gradient(90deg, rgba(5,5,10,0.35) 0%, transparent 100%)',
          }} />

          {/* Right side: very subtle warm tint */}
          <div style={{
            position: 'absolute', inset: 0, left: '50%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(10,8,3,0.25) 100%)',
          }} />

          {/* Center gold glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400, height: '130%',
            background: 'radial-gradient(ellipse, rgba(212,168,71,0.18) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }} />
        </div>

        {/* ── Vertical split divider line ── */}
        <div className="hh-divider-line" aria-hidden="true" />

        {/* ── Main Content: Two-column split ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 0, padding: '0 48px',
        }}>

          {/* ─── LEFT: Flowtaris.com vision ─── */}
          <div className="hh-1" style={{
            paddingRight: 56, paddingLeft: 0,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
          }}>
            {/* Label */}
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase',
              marginBottom: 22, fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              flowtaris.com
            </p>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
              fontWeight: 800, lineHeight: 1.06,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #b0bcd8 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                The Enterprise
              </span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.42)', fontWeight: 700 }}>
                Operations Platform
              </span>
            </h1>

            <p style={{
              fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.75, fontWeight: 400,
              maxWidth: 420, marginBottom: 36,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              A global finance operations platform built for the long game — world-class
              ERP implementations, strategic automation, and enterprise-grade governance
              trusted across NetSuite, SAP, Workday, and Coupa.
            </p>

            {/* CTA */}
            <a
              href="https://flowtaris.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hh-cta-secondary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 30px', borderRadius: 99,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 600, fontSize: 14, textDecoration: 'none',
                letterSpacing: '-0.01em', width: 'fit-content',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Visit Flowtaris.com
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* ─── RIGHT: Flowtaris AI vision ─── */}
          <div className="hh-2" style={{
            paddingLeft: 56, paddingRight: 0,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
          }}>
            {/* Label */}
            <p style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
              color: 'rgba(212,168,71,0.55)', textTransform: 'uppercase',
              marginBottom: 22, fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              flowtaris.ai
            </p>

            {/* Headline */}
            <h2 style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
              fontWeight: 800, lineHeight: 1.06,
              letterSpacing: '-0.03em',
              margin: '0 0 24px',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #f5d98c 0%, #D4A847 50%, #b3852b 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                The AI-Native
              </span>
              <br />
              <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>
                Finance Intelligence
              </span>
            </h2>

            <p style={{
              fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.75, fontWeight: 400,
              maxWidth: 420, marginBottom: 36,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              Autonomous AI agents that read, decide, and act inside your ERP.
              GenAI Document Intelligence, self-healing workflows, and predictive
              analytics — eliminating manual effort from every finance cycle.
            </p>

            {/* CTA */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="/assessment"
                className="hh-cta-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 30px', borderRadius: 99,
                  background: 'linear-gradient(135deg, #D4A847 0%, #b3852b 100%)',
                  color: '#05050a',
                  fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  boxShadow: '0 0 30px rgba(212,168,71,0.35), 0 4px 20px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.01em', width: 'fit-content',
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Start AI Assessment
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="/roi-calculator"
                className="hh-cta-secondary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 28px', borderRadius: 99,
                  background: 'rgba(212,168,71,0.07)',
                  border: '1px solid rgba(212,168,71,0.25)',
                  color: '#f0c97a',
                  fontWeight: 600, fontSize: 14, textDecoration: 'none',
                  letterSpacing: '-0.01em', width: 'fit-content',
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Calculate ROI
              </a>
            </div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div className="hh-5" style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: 1280, margin: '56px auto 0',
          padding: '0 48px',
        }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '1px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, overflow: 'hidden',
            backdropFilter: 'blur(24px)',
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                flex: '1 1 120px', textAlign: 'center',
                padding: '22px 24px',
                background: 'rgba(5,5,10,0.4)',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800,
                  background: i % 2 === 0
                    ? 'linear-gradient(135deg, #ffffff, #c0cce0)'
                    : 'linear-gradient(135deg, #f5d98c, #D4A847)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  letterSpacing: '-0.03em', lineHeight: 1.1,
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                }}>{s.value}</div>
                <div style={{
                  fontSize: 10, color: 'rgba(255,255,255,0.35)',
                  fontWeight: 600, marginTop: 5,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 32, left: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          color: 'rgba(255,255,255,0.2)', fontSize: 10, letterSpacing: '0.14em',
          fontFamily: "'Inter', system-ui, sans-serif",
          animation: 'hero-bounce 2.2s ease-in-out infinite',
        }}>
          <span>SCROLL</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 3v14M4 11l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Vignette */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          boxShadow: 'inset 0 0 260px rgba(0,0,0,0.5)',
        }} />
      </section>
    </>
  )
}

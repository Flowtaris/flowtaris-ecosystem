'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const TERMINAL_LINES = [
  { text: '> connection established: Flowtaris AI Core', delay: 400 },
  { text: '> scanning enterprise finance workflows...', delay: 1200 },
  { text: '> analyzing AP/AR bottlenecks...', delay: 800 },
  { text: '> 14 automation opportunities identified.', delay: 1500 },
  { text: '> action_required: initiate_assessment', delay: 600 },
]

export default function CtaTerminalSection() {
  const [linesVisible, setLinesVisible] = useState(0)
  const [showButtons, setShowButtons] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let currentTimeout: NodeJS.Timeout
    let cumulativeDelay = 0

    TERMINAL_LINES.forEach((line, index) => {
      cumulativeDelay += line.delay
      setTimeout(() => {
        setLinesVisible(index + 1)
        if (index === TERMINAL_LINES.length - 1) {
          setTimeout(() => setShowButtons(true), 800)
        }
      }, cumulativeDelay)
    })

    return () => clearTimeout(currentTimeout)
  }, [hasStarted])

  return (
    <section ref={sectionRef} style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        
        {/* The Terminal Window */}
        <div 
          className="glass-card" 
          style={{ 
            borderRadius: 16, 
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
            background: 'linear-gradient(180deg, rgba(15,15,20,0.95) 0%, rgba(5,5,10,0.95) 100%)',
          }}
        >
          {/* Mac window header */}
          <div style={{ 
            padding: '16px 20px', 
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.02)'
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            <div style={{ flex: 1, textAlign: 'center', fontSize: 13, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', marginRight: 48 }}>
              flowtaris-ai-core — bash — 80x24
            </div>
          </div>

          {/* Terminal Body */}
          <div style={{ padding: '40px 40px 60px', minHeight: 360, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, fontFamily: 'monospace', fontSize: 16, lineHeight: 1.8, color: '#00b8db' }}>
              {TERMINAL_LINES.map((line, i) => (
                <div 
                  key={i} 
                  style={{ 
                    opacity: i < linesVisible ? 1 : 0, 
                    transform: i < linesVisible ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'all 0.3s ease',
                    color: i === TERMINAL_LINES.length - 1 ? '#10b981' : 'rgba(255,255,255,0.7)',
                    fontWeight: i === TERMINAL_LINES.length - 1 ? 700 : 400
                  }}
                >
                  {line.text}
                </div>
              ))}
              
              {/* Blinking Cursor */}
              {linesVisible < TERMINAL_LINES.length && hasStarted && (
                <div style={{ 
                  display: 'inline-block', 
                  width: 10, 
                  height: 20, 
                  background: '#00b8db', 
                  animation: 'blink 1s step-end infinite',
                  marginTop: 4,
                  verticalAlign: 'middle'
                }} />
              )}
            </div>

            {/* The Actions (fade in last) */}
            <div 
              style={{ 
                marginTop: 40,
                opacity: showButtons ? 1 : 0,
                transform: showButtons ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap'
              }}
            >
              <Link href="/assessment" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 32px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#10b981',
                fontFamily: 'monospace',
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 4,
                textDecoration: 'none',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <span style={{ opacity: 0.5 }}>$</span> ./run_assessment.sh
              </Link>
              
              <Link href="/roi-calculator" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 32px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'monospace',
                fontSize: 15,
                fontWeight: 600,
                borderRadius: 4,
                textDecoration: 'none',
                transition: 'all 0.2s',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              }}
              >
                <span style={{ opacity: 0.5 }}>$</span> calc_roi --full
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}} />
    </section>
  )
}
'use client'

import React, { useState, useEffect, useRef, useMemo, FormEvent } from 'react'
import { calculateROI, type ROIInputs, sensitivityAnalysis } from '@flowtaris/roi-engine'
import { insertROICalculation } from '@flowtaris/supabase-client'
import { analytics } from '@flowtaris/analytics'

// ─── Constants ──────────────────────────────────────────────────────────────
const PLATFORMS = ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Salesforce']
const USE_CASES = [
  { id: 'ap-automation', label: 'AP Automation' },
  { id: 'po-matching', label: 'PO Matching' },
  { id: 'expense-audit', label: 'Expense Audit' },
]
const SIZES = [
  { id: 'small', label: '5-25 (Small)', vol: 12000, hrs: 15, hrRate: 45, err: 4.2, attr: 18, rec: 22000, comp: 35000 },
  { id: 'mid', label: '25-100 (Mid)', vol: 65000, hrs: 12, hrRate: 55, err: 3.5, attr: 15, rec: 35000, comp: 120000 },
  { id: 'large', label: '100-500 (Enterprise)', vol: 180000, hrs: 10, hrRate: 65, err: 2.8, attr: 12, rec: 50000, comp: 280000 },
  { id: 'xl', label: '500+ (Global)', vol: 420000, hrs: 8, hrRate: 75, err: 2.2, attr: 10, rec: 65000, comp: 500000 },
]

// ─── Typewriter Effect ──────────────────────────────────────────────────────
function Typewriter({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [disp, setDisp] = useState('')
  const [done, setDone] = useState(false)
  
  useEffect(() => {
    setDisp('')
    setDone(false)
    let i = 0
    const t = setInterval(() => {
      setDisp(text.substring(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(t)
        setDone(true)
        if (onComplete) onComplete()
      }
    }, speed)
    return () => clearInterval(t)
  }, [text, speed, onComplete])

  return <span>{disp}{!done && <span style={{ animation: 'blink 1s step-end infinite', marginLeft: 2 }}>█</span>}</span>
}

// ─── Blueprint Node Component ───────────────────────────────────────────────
function BlueprintNode({ x, y, label, state, value, delay = 0 }: { x: number, y: number, label: string, state: 'idle' | 'bottleneck' | 'ai', value?: string, delay?: number }) {
  const colors = {
    idle: { stroke: 'rgba(255,255,255,0.2)', fill: 'rgba(255,255,255,0.02)', text: 'rgba(255,255,255,0.4)' },
    bottleneck: { stroke: '#ef4444', fill: 'rgba(239,68,68,0.1)', text: '#ef4444' },
    ai: { stroke: '#06b6d4', fill: 'rgba(6,182,212,0.1)', text: '#06b6d4' }
  }
  const c = colors[state]

  return (
    <g transform={`translate(${x}, ${y})`} style={{ transition: 'all 0.5s ease-in-out', transitionDelay: `${delay}ms` }}>
      {state === 'bottleneck' && (
        <rect x={-80} y={-30} width={160} height={60} rx={4} fill="none" stroke="#ef4444" strokeWidth={1} strokeDasharray="4 4" style={{ animation: 'spin 10s linear infinite', opacity: 0.5 }} />
      )}
      <rect x={-75} y={-25} width={150} height={50} rx={2} fill={c.fill} stroke={c.stroke} strokeWidth={1.5} />
      {/* Circuit lines */}
      <path d="M -75 -15 L -85 -15 M -75 15 L -85 15 M 75 -15 L 85 -15 M 75 15 L 85 15" stroke={c.stroke} strokeWidth={1} opacity={0.5} />
      
      <text x={0} y={value ? -4 : 4} textAnchor="middle" fill={c.text} fontSize={11} fontFamily="'Geist_Mono', monospace" fontWeight={600} letterSpacing="0.05em">
        {label.toUpperCase()}
      </text>
      {value && (
        <text x={0} y={12} textAnchor="middle" fill="#fff" fontSize={13} fontFamily="'Geist_Mono', monospace" fontWeight={700}>
          {value}
        </text>
      )}
    </g>
  )
}

function BlueprintLine({ start, end, state, delay = 0 }: { start: [number, number], end: [number, number], state: 'idle' | 'bottleneck' | 'ai', delay?: number }) {
  const c = state === 'ai' ? '#06b6d4' : state === 'bottleneck' ? '#ef4444' : 'rgba(255,255,255,0.1)'
  const w = state === 'ai' ? 2 : 1
  
  // Create an orthogonal path
  const midX = start[0] + (end[0] - start[0]) / 2
  const path = `M ${start[0]} ${start[1]} L ${midX} ${start[1]} L ${midX} ${end[1]} L ${end[0]} ${end[1]}`
  
  return (
    <g style={{ transition: 'all 0.5s', transitionDelay: `${delay}ms` }}>
      <path d={path} fill="none" stroke={c} strokeWidth={w} />
      {state === 'ai' && (
        <circle r={3} fill="#fff">
          <animateMotion dur="2s" repeatCount="indefinite" path={path} />
        </circle>
      )}
    </g>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function ROICalculatorClient({ initialConfig }: { initialConfig: any }) {
  const [step, setStep] = useState(0) // 0=init, 1=erp, 2=usecase, 3=size, 4=ready, 5=executed, 6=lead
  const [logs, setLogs] = useState<React.ReactNode[]>([])
  
  const [erp, setErp] = useState('')
  const [useCase, setUseCase] = useState('')
  const [sizeId, setSizeId] = useState('')
  const [email, setEmail] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  // Initial boot sequence
  useEffect(() => {
    if (step === 0) {
      const boot = async () => {
        await new Promise(r => setTimeout(r, 500))
        setLogs(prev => [...prev, <div key="boot1" className="text-brand-cyan-400"># SYSTEM BOOT...</div>])
        await new Promise(r => setTimeout(r, 600))
        setLogs(prev => [...prev, <div key="boot2" className="text-brand-cyan-400"># INITIALIZING FINANCIAL X-RAY PROTOCOL v2.4.1</div>])
        await new Promise(r => setTimeout(r, 800))
        setStep(1)
      }
      boot()
    }
  }, [step])

  // Step triggers
  useEffect(() => {
    if (step === 1) {
      setLogs(prev => [...prev, 
        <div key="s1" className="mt-6 text-neutral-300">
          <span className="text-brand-cyan-400">❯</span> <Typewriter text="TARGET ERP SYSTEM:" speed={20} />
        </div>
      ])
    } else if (step === 2) {
      setLogs(prev => [...prev, 
        <div key="s2a" className="text-brand-green-400 mt-2">✓ LINK ESTABLISHED: {erp.toUpperCase()}</div>,
        <div key="s2b" className="mt-6 text-neutral-300">
          <span className="text-brand-cyan-400">❯</span> <Typewriter text="PRIMARY AUTOMATION VECTOR:" speed={20} />
        </div>
      ])
    } else if (step === 3) {
      setLogs(prev => [...prev, 
        <div key="s3a" className="text-brand-green-400 mt-2">✓ VECTOR LOCKED: {USE_CASES.find(u=>u.id===useCase)?.label.toUpperCase()}</div>,
        <div key="s3b" className="mt-6 text-neutral-300">
          <span className="text-brand-cyan-400">❯</span> <Typewriter text="INPUT FINANCE ORG SIZE TO INJECT BENCHMARKS:" speed={20} />
        </div>
      ])
    } else if (step === 4) {
      setLogs(prev => [...prev, 
        <div key="s4a" className="text-brand-green-400 mt-2">✓ BENCHMARKS INJECTED.</div>,
        <div key="s4b" className="mt-6 text-neutral-300">
          <span className="text-brand-cyan-400">❯</span> <Typewriter text="ANALYZING CURRENT MANUAL BOTTLENECKS..." speed={20} onComplete={() => {
            setTimeout(() => setStep(4.5), 1500)
          }} />
        </div>
      ])
    } else if (step === 4.5) {
      setLogs(prev => [...prev, 
        <div key="s4c" className="text-brand-red-400 mt-2">! SEVERE INEFFICIENCIES DETECTED IN WORKFLOW.</div>,
        <div key="s4d" className="mt-6 text-neutral-300">
          <span className="text-brand-cyan-400">❯</span> <Typewriter text="AWAITING COMMAND TO DEPLOY FLOWTARIS AI..." speed={20} />
        </div>
      ])
    } else if (step === 5) {
      setLogs(prev => [...prev, 
        <div key="s5a" className="text-brand-cyan-400 mt-2 font-bold">✓ EXECUTING FLOWTARIS OVERRIDE.</div>,
        <div key="s5b" className="mt-6 text-neutral-300">
          <span className="text-brand-cyan-400">❯</span> <Typewriter text="CALCULATING 3-YEAR ROI PROJECTIONS..." speed={20} onComplete={() => {
            setTimeout(() => setStep(6), 2000)
          }}/>
        </div>
      ])
    } else if (step === 6) {
      setLogs(prev => [...prev, 
        <div key="s6a" className="text-brand-green-400 mt-2">✓ PROJECTIONS FINALIZED.</div>,
        <div key="s6b" className="mt-6 text-neutral-300">
          <span className="text-brand-cyan-400">❯</span> <Typewriter text="INPUT EMAIL TO TRANSMIT EXECUTIVE BUSINESS CASE:" speed={20} />
        </div>
      ])
    }
  }, [step])

  // ─── Math ───────────────────────────────────────────────────────────────────
  const activeSize = SIZES.find(s => s.id === sizeId)
  
  const diagnosis = useMemo(() => {
    if (!activeSize) return null
    const v = activeSize.vol
    const h = activeSize.hrs / 60
    const hr = activeSize.hrRate
    const err = activeSize.err / 100
    
    const manCost = Math.round(v * h * hr)
    const errCost = Math.round(v * err * h * hr * 3)
    const attrCost = Math.round((v * h / 1920) * (activeSize.attr / 100) * 0.3 * activeSize.rec)
    const compCost = activeSize.comp
    return { manCost, errCost, attrCost, compCost, total: manCost + errCost + attrCost + compCost }
  }, [activeSize])

  const fix = useMemo(() => {
    if (!activeSize) return null
    const result = calculateROI({
      annualVolume: activeSize.vol, avgManualHoursPerUnit: activeSize.hrs / 60, hourlyCost: activeSize.hrRate,
      errorRate: activeSize.err / 100, platform: erp || 'NetSuite', useCase: useCase || 'ap-automation',
      attritionRate: activeSize.attr / 100, avgRecruitmentCost: activeSize.rec, complianceFinesPerYear: activeSize.comp
    })
    return result
  }, [activeSize, erp, useCase])

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`

  // ─── Blueprint States ───────────────────────────────────────────────────────
  // Depending on step, nodes are idle, bottleneck, or ai
  const nodeState = step >= 5 ? 'ai' : step >= 4.5 ? 'bottleneck' : 'idle'

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0a0a0f] text-neutral-300 font-mono text-sm">
      
      {/* ═════════════════════════════════════════════════════════════════════════
          LEFT PANE: TERMINAL
      ═════════════════════════════════════════════════════════════════════════ */}
      <div className="w-full md:w-[35%] lg:w-[30%] border-b md:border-b-0 md:border-r border-white/10 flex flex-col h-[50vh] md:h-screen relative z-10 bg-[#0a0a0f]">
        
        {/* Terminal Header */}
        <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-black/40">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-brand-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-brand-amber-500/50" />
            <div className="w-3 h-3 rounded-full bg-brand-green-500/50" />
          </div>
          <div className="text-xs text-neutral-500 tracking-widest font-semibold uppercase">sys.terminal</div>
        </div>

        {/* Terminal Output */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-2 scroll-smooth">
          {logs}
          
          {/* Inputs */}
          {step === 1 && (
            <div className="mt-4 flex flex-wrap gap-2 animate-in fade-in duration-500 delay-500 fill-mode-both">
              {PLATFORMS.map(p => (
                <button key={p} onClick={() => { setErp(p); setStep(2) }} className="px-4 py-2 border border-brand-cyan-500/30 text-brand-cyan-400 hover:bg-brand-cyan-500/10 transition-colors">
                  {p}
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="mt-4 flex flex-col gap-2 animate-in fade-in duration-500 delay-500 fill-mode-both">
              {USE_CASES.map(u => (
                <button key={u.id} onClick={() => { setUseCase(u.id); setStep(3) }} className="px-4 py-3 border border-brand-cyan-500/30 text-brand-cyan-400 hover:bg-brand-cyan-500/10 text-left transition-colors">
                  {u.label}
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="mt-4 flex flex-col gap-2 animate-in fade-in duration-500 delay-500 fill-mode-both">
              {SIZES.map(s => (
                <button key={s.id} onClick={() => { setSizeId(s.id); setStep(4) }} className="px-4 py-3 border border-brand-cyan-500/30 text-brand-cyan-400 hover:bg-brand-cyan-500/10 text-left flex justify-between transition-colors">
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          )}

          {step === 4.5 && (
            <div className="mt-8 animate-in fade-in duration-500 delay-500 fill-mode-both">
              <button onClick={() => setStep(5)} className="w-full py-4 bg-brand-cyan-500 text-[#0a0a0f] font-bold tracking-widest hover:bg-brand-cyan-400 transition-colors uppercase">
                Execute Flowtaris AI
              </button>
            </div>
          )}

          {step >= 6 && !email && (
            <form onSubmit={e => { e.preventDefault(); setEmail((e.target as any).email.value) }} className="mt-4 flex gap-2 animate-in fade-in duration-500 delay-500 fill-mode-both">
              <span className="text-brand-cyan-400 py-2">❯</span>
              <input name="email" type="email" placeholder="CFO@company.com" required className="flex-1 bg-transparent border-b border-brand-cyan-500/50 text-white outline-none focus:border-brand-cyan-400 py-2" />
              <button type="submit" className="px-4 py-2 bg-brand-cyan-500/20 text-brand-cyan-400 border border-brand-cyan-500/50 hover:bg-brand-cyan-500/30">SEND</button>
            </form>
          )}

          {step >= 6 && email && (
            <div className="mt-4 text-brand-green-400">
              ✓ BUSINESS CASE TRANSMITTED TO {email.toUpperCase()}
            </div>
          )}
          
          <div className="h-8" />
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════
          RIGHT PANE: INTERACTIVE BLUEPRINT
      ═════════════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 relative bg-[#050508] overflow-hidden flex flex-col h-[50vh] md:h-screen">
        
        {/* Blueprint Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Header HUD */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20 pointer-events-none">
          <div>
            <div className="text-[10px] text-brand-cyan-400 tracking-[0.2em] uppercase mb-1">Architecture State</div>
            <div className="text-xl text-white font-bold tracking-widest">{nodeState === 'ai' ? 'OPTIMIZED' : nodeState === 'bottleneck' ? 'CRITICAL BLEED' : 'AWAITING INPUTS'}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-brand-cyan-400 tracking-[0.2em] uppercase mb-1">Total Annual Bleed</div>
            <div className={`text-3xl font-bold font-mono transition-colors duration-1000 ${nodeState === 'bottleneck' ? 'text-brand-red-500' : 'text-neutral-500'}`}>
              {diagnosis ? fmt(diagnosis.total) : '$---,---'}
            </div>
          </div>
        </div>

        {/* The SVG Canvas */}
        <div className="flex-1 w-full h-full relative z-10">
          <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Lines */}
            <BlueprintLine start={[200, 200]} end={[350, 200]} state={nodeState} delay={100} />
            <BlueprintLine start={[500, 200]} end={[650, 200]} state={nodeState} delay={200} />
            <BlueprintLine start={[800, 200]} end={[800, 350]} state={nodeState} delay={300} />
            <BlueprintLine start={[800, 350]} end={[650, 350]} state={nodeState} delay={400} />
            <BlueprintLine start={[500, 350]} end={[350, 350]} state={nodeState} delay={500} />

            {/* Nodes */}
            <BlueprintNode x={200} y={200} label="Ingestion / Intake" state={step >= 4 ? (nodeState==='ai'?'ai':'idle') : 'idle'} />
            
            <BlueprintNode x={500} y={200} label="Manual Validation" state={nodeState} delay={100} value={diagnosis ? `Cost: ${fmt(diagnosis.manCost)}` : undefined} />
            
            <BlueprintNode x={800} y={200} label="Exception Handling" state={nodeState} delay={200} value={diagnosis ? `Error Tax: ${fmt(diagnosis.errCost)}` : undefined} />
            
            <BlueprintNode x={800} y={350} label="Compliance / Audit" state={nodeState} delay={300} value={diagnosis ? `Exposure: ${fmt(diagnosis.compCost)}` : undefined} />
            
            <BlueprintNode x={500} y={350} label="ERP Sync" state={step >= 4 ? (nodeState==='ai'?'ai':'idle') : 'idle'} delay={400} />

            {/* Giant ROI Overlays (Only visible when AI deployed) */}
            {step >= 5 && fix && (
              <g className="animate-in fade-in zoom-in duration-1000 delay-1000" style={{ transformOrigin: '200px 400px' }}>
                <rect x={100} y={400} width={300} height={120} fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth={1} rx={8} filter="url(#glow)" />
                <text x={250} y={440} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={12} letterSpacing="0.1em">NET ANNUAL SAVINGS</text>
                <text x={250} y={490} textAnchor="middle" fill="#06b6d4" fontSize={42} fontWeight={800} letterSpacing="-0.02em">{fmt(fix.annualSavings)}</text>
              </g>
            )}

            {step >= 5 && fix && (
              <g className="animate-in fade-in zoom-in duration-1000 delay-1500" style={{ transformOrigin: '550px 450px' }}>
                <rect x={450} y={420} width={200} height={100} fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth={1} rx={8} filter="url(#glow)" />
                <text x={550} y={455} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} letterSpacing="0.1em">PAYBACK PERIOD</text>
                <text x={550} y={495} textAnchor="middle" fill="#10b981" fontSize={32} fontWeight={800}>{fix.paybackMonths.toFixed(1)} MO</text>
              </g>
            )}

             {step >= 5 && fix && (
              <g className="animate-in fade-in zoom-in duration-1000 delay-2000" style={{ transformOrigin: '780px 450px' }}>
                <rect x={680} y={420} width={200} height={100} fill="rgba(99,102,241,0.1)" stroke="#6366f1" strokeWidth={1} rx={8} filter="url(#glow)" />
                <text x={780} y={455} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={11} letterSpacing="0.1em">FTE CAPACITY FREED</text>
                <text x={780} y={495} textAnchor="middle" fill="#6366f1" fontSize={32} fontWeight={800}>{fix.fteFreed.toFixed(1)}</text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}

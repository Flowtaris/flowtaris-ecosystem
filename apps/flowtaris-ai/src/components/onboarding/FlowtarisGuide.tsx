'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Zap, X, ArrowRight, ChevronLeft, Play } from 'lucide-react'

// ─── Tour step definition ────────────────────────────────────────────────────
interface TourStep {
  elementId: string          // DOM element to spotlight
  title: string
  message: string
  placement: 'top' | 'bottom' | 'left' | 'right'  // tooltip side
}

// ─── Page-specific tour definitions ──────────────────────────────────────────
const PAGE_TOURS: Record<string, TourStep[]> = {
  '/roi-calculator': [
    {
      elementId: 'tour-currency',
      title: '🌍 Global Currency Support',
      message: 'Flowtaris serves clients worldwide. Select your local currency — all projections will instantly convert.',
      placement: 'right',
    },
    {
      elementId: 'tour-erp',
      title: '⚙️ Select Your ERP Platform',
      message: 'We tailor multipliers per platform. NetSuite, SAP, Workday, Coupa — each has different automation leverage.',
      placement: 'right',
    },
    {
      elementId: 'tour-calculate',
      title: '🚀 Calculate Your ROI',
      message: 'Once you set your baseline metrics, hit Calculate. The engine runs live projections using your exact numbers — no generic defaults.',
      placement: 'top',
    },
    {
      elementId: 'tour-stats',
      title: '📊 Your Live Impact Metrics',
      message: 'Annual savings, payback period, and FTE freed — computed in real time from your inputs. Every number is yours.',
      placement: 'top',
    },
    {
      elementId: 'tour-report',
      title: '📩 Get Your ROI Report',
      message: 'Enter your email to receive a full PDF with projections, attrition savings, compliance savings, and capability-specific breakdowns.',
      placement: 'top',
    },
  ],

  '/assessment': [
    {
      elementId: 'tour-progress',
      title: '🗺️ Your 6-Step Roadmap',
      message: 'This 3-minute assessment is tailored to your ERP and finance operations. We use your answers to build a prioritized AI roadmap.',
      placement: 'bottom',
    },
    {
      elementId: 'tour-step',
      title: '🔷 Choose Your ERP Platform',
      message: 'Select the ERP platform your finance team runs on. This is the single biggest factor in determining which AI capabilities will have the highest immediate impact.',
      placement: 'right',
    },
    {
      elementId: 'tour-nav',
      title: '⬅️ ➡️ Navigate the Assessment',
      message: 'Use Next and Back to move through the 6 steps. You can also use your keyboard arrow keys.',
      placement: 'top',
    },
  ],
}

// ─── Padding around spotlight cutout ─────────────────────────────────────────
const SPOTLIGHT_PADDING = 12

// ─── Tooltip position calculation ────────────────────────────────────────────
function getTooltipStyle(
  rect: DOMRect,
  placement: TourStep['placement'],
  tooltipRef: React.RefObject<HTMLDivElement | null>
): React.CSSProperties {
  const PAD = 16
  const tooltipW = tooltipRef.current?.offsetWidth || 320
  const tooltipH = tooltipRef.current?.offsetHeight || 200
  const vw = window.innerWidth
  const vh = window.innerHeight

  let top = 0, left = 0

  switch (placement) {
    case 'bottom':
      top = rect.bottom + PAD
      left = rect.left + rect.width / 2 - tooltipW / 2
      break
    case 'top':
      top = rect.top - tooltipH - PAD
      left = rect.left + rect.width / 2 - tooltipW / 2
      break
    case 'left':
      top = rect.top + rect.height / 2 - tooltipH / 2
      left = rect.left - tooltipW - PAD
      break
    case 'right':
    default:
      top = rect.top + rect.height / 2 - tooltipH / 2
      left = rect.right + PAD
      break
  }

  // Keep inside viewport
  left = Math.max(PAD, Math.min(left, vw - tooltipW - PAD))
  top = Math.max(PAD, Math.min(top, vh - tooltipH - PAD))

  return { position: 'fixed', top, left, width: tooltipW, zIndex: 110 }
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FlowtarisGuide() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [tourSteps, setTourSteps] = useState<TourStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [spotlight, setSpotlight] = useState<DOMRect | null>(null)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const [hasSeenTour, setHasSeenTour] = useState(true) // default true to prevent flash
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  // Detect page and load the relevant tour steps
  useEffect(() => {
    setMounted(true)
    const steps = PAGE_TOURS[pathname] || []
    setTourSteps(steps)
    if (steps.length === 0) return

    const key = `flowtaris_tour_${pathname.replace(/\//g, '_')}`
    const seen = localStorage.getItem(key)
    setHasSeenTour(!!seen)
  }, [pathname])

  // Position spotlight and tooltip for the current step
  const positionStep = useCallback((stepIndex: number, steps: TourStep[]) => {
    if (stepIndex >= steps.length) return
    const step = steps[stepIndex]
    const el = document.getElementById(step.elementId)
    if (!el) return

    // Scroll element into view, centered
    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })

    // Small delay to let scroll settle
    setTimeout(() => {
      const rect = el.getBoundingClientRect()
      setSpotlight(rect)
      if (tooltipRef.current) {
        setTooltipStyle(getTooltipStyle(rect, step.placement, tooltipRef))
      }
    }, 350)
  }, [])

  // Re-position on resize or scroll
  useEffect(() => {
    if (!isActive) return
    const handler = () => positionStep(currentStep, tourSteps)
    window.addEventListener('resize', handler)
    window.addEventListener('scroll', handler, true)
    return () => {
      window.removeEventListener('resize', handler)
      window.removeEventListener('scroll', handler, true)
    }
  }, [isActive, currentStep, tourSteps, positionStep])

  // Compute tooltip position after render when tooltipRef changes size
  useEffect(() => {
    if (isActive && spotlight) {
      setTooltipStyle(getTooltipStyle(spotlight, tourSteps[currentStep]?.placement || 'bottom', tooltipRef))
    }
  }, [isActive, spotlight, currentStep, tourSteps])

  if (!mounted) return null

  const startTour = () => {
    setCurrentStep(0)
    setIsActive(true)
    positionStep(0, tourSteps)
  }

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      const next = currentStep + 1
      setCurrentStep(next)
      positionStep(next, tourSteps)
    } else {
      endTour(true)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1
      setCurrentStep(prev)
      positionStep(prev, tourSteps)
    }
  }

  const endTour = (completed = false) => {
    setIsActive(false)
    setSpotlight(null)
    if (completed || !hasSeenTour) {
      const key = `flowtaris_tour_${pathname.replace(/\//g, '_')}`
      localStorage.setItem(key, 'true')
      setHasSeenTour(true)
    }
  }

  // Don't render anything if no tour for this page
  if (tourSteps.length === 0) return null

  const step = tourSteps[currentStep]

  return (
    <>
      {/* ── Spotlight Overlay ─────────────────────────────────────────────── */}
      {isActive && spotlight && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          {/* Dark overlay with spotlight cutout using box-shadow technique */}
          <div
            className="absolute rounded-xl pointer-events-none transition-all duration-300"
            style={{
              top: spotlight.top - SPOTLIGHT_PADDING,
              left: spotlight.left - SPOTLIGHT_PADDING,
              width: spotlight.width + SPOTLIGHT_PADDING * 2,
              height: spotlight.height + SPOTLIGHT_PADDING * 2,
              boxShadow: '0 0 0 9999px rgba(0,0,0,0.72)',
              border: '2px solid rgba(6, 182, 212, 0.7)',
              boxSizing: 'border-box',
            }}
          />
          {/* Pulsing ring around spotlight */}
          <div
            className="absolute rounded-xl pointer-events-none animate-ping"
            style={{
              top: spotlight.top - SPOTLIGHT_PADDING - 4,
              left: spotlight.left - SPOTLIGHT_PADDING - 4,
              width: spotlight.width + SPOTLIGHT_PADDING * 2 + 8,
              height: spotlight.height + SPOTLIGHT_PADDING * 2 + 8,
              border: '2px solid rgba(6, 182, 212, 0.3)',
              animationDuration: '2s',
            }}
          />
        </div>
      )}

      {/* ── Overlay click-to-close area ───────────────────────────────────── */}
      {isActive && (
        <div
          className="fixed inset-0 z-[101] cursor-pointer"
          onClick={() => endTour(false)}
        />
      )}

      {/* ── Floating Tooltip Card ─────────────────────────────────────────── */}
      {isActive && step && (
        <div
          ref={tooltipRef}
          className="z-[110] w-80 pointer-events-auto"
          style={tooltipStyle}
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-[#0a0f1a]/95 backdrop-blur-xl border border-brand-cyan-500/30 rounded-2xl shadow-2xl shadow-brand-cyan-500/20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-brand-cyan-500 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs text-brand-cyan-300 font-medium tracking-wide uppercase">Flowtaris Guide</span>
              </div>
              <button
                onClick={() => endTour(false)}
                className="text-neutral-500 hover:text-white transition-colors"
                aria-label="Close tour"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4">
              <h4 className="text-white font-semibold text-sm mb-1.5">{step.title}</h4>
              <p className="text-neutral-400 text-xs leading-relaxed">{step.message}</p>
            </div>

            {/* Footer */}
            <div className="px-5 pb-4 flex items-center justify-between">
              {/* Progress dots */}
              <div className="flex gap-1">
                {tourSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentStep ? 'w-4 bg-brand-cyan-400' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors px-2 py-1"
                  >
                    <ChevronLeft className="h-3 w-3" /> Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 text-xs bg-brand-cyan-500 hover:bg-brand-cyan-400 text-white px-3 py-1.5 rounded-lg transition-colors font-medium shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                >
                  {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Skip link */}
            <div className="px-5 pb-3 text-center">
              <button
                onClick={() => endTour(false)}
                className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors"
              >
                Skip tour
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Launcher Button (bottom-right) ────────────────────────────────── */}
      {!isActive && (
        <div className="fixed bottom-6 right-6 z-[99]">
          <button
            onClick={startTour}
            className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-cyan-500/10 backdrop-blur-md border border-brand-cyan-400/30 hover:bg-brand-cyan-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
            aria-label="Start guided tour"
          >
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-brand-cyan-400" style={{ animationDuration: '3s' }} />
            <Zap className="h-4 w-4 text-brand-cyan-300 drop-shadow-[0_0_6px_rgba(103,232,249,0.8)]" />
            <span className="text-xs text-brand-cyan-200 font-medium pr-1">
              {hasSeenTour ? 'Replay Tour' : 'Take a Tour'}
            </span>
          </button>
        </div>
      )}
    </>
  )
}

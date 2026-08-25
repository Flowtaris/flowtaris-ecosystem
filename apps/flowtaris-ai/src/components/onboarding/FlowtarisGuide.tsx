'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@repo/ui'
import { Zap, X, ArrowRight, Play, CheckCircle } from 'lucide-react'

// Tour narrative steps
const TOUR_STEPS = [
  {
    title: "The Intelligence Engine",
    message: "Welcome. I am Flowtaris, the intelligence engine behind your financial automation. Let me show you what we can achieve together.",
    path: "/",
    cta: "Start Tour",
  },
  {
    title: "Calculate Your Impact",
    message: "We don't do guesswork. Let's project your exact ROI, FTE freed, and compliance savings based on your specific ERP volume.",
    path: "/roi-calculator",
    cta: "See ROI Calculator",
  },
  {
    title: "Your Custom Roadmap",
    message: "Not sure where to start? Take a 2-minute assessment and I will map out the exact AI capabilities you need.",
    path: "/assessment",
    cta: "View Assessment",
  },
  {
    title: "The Cost of Waiting",
    message: "Doing nothing is expensive. See how manual errors and employee attrition compound over time if you delay automation.",
    path: "/cost-of-inaction",
    cta: "Finish Tour",
  }
]

export default function FlowtarisGuide() {
  const [mounted, setMounted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasCompleted, setHasCompleted] = useState(true) // Default to true to prevent flash
  
  const router = useRouter()
  const pathname = usePathname()

  // Initialize from local storage
  useEffect(() => {
    setMounted(true)
    const seen = localStorage.getItem('flowtaris_tour_completed')
    if (!seen) {
      setHasCompleted(false)
      // Only auto-expand if they are on the home page for the first time
      if (pathname === '/') {
        setTimeout(() => setIsExpanded(true), 1500)
      }
    }
  }, [pathname])

  if (!mounted) return null

  const handleSkip = () => {
    setIsExpanded(false)
    setHasCompleted(true)
    localStorage.setItem('flowtaris_tour_completed', 'true')
  }

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      router.push(TOUR_STEPS[nextStep].path)
    } else {
      handleSkip() // Finish
    }
  }

  const toggleOrb = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {/* Background Overlay when expanded */}
      {isExpanded && !hasCompleted && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]" 
          onClick={handleSkip}
          aria-hidden="true"
        />
      )}

      {/* The Orb / Modal Container */}
      <div 
        className={`fixed z-[100] transition-all duration-700 ease-in-out ${
          isExpanded 
            ? !hasCompleted 
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md' // Center large modal
              : 'bottom-6 right-6 w-80' // Bottom right expanded menu
            : 'bottom-6 right-6 w-14 h-14' // Collapsed orb
        }`}
      >
        {isExpanded ? (
          <div className="glass-card overflow-hidden shadow-2xl shadow-brand-cyan-500/20 rounded-2xl border border-white/10 animate-in zoom-in-95 duration-300 bg-black/40 backdrop-blur-xl">
            {/* Header/Header Glow */}
            <div className="relative h-24 bg-gradient-to-br from-brand-purple-900/40 to-brand-cyan-900/40 flex items-center px-6 border-b border-white/10">
              <div className="absolute inset-0 opacity-20 mix-blend-overlay"></div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-display font-medium">Flowtaris AI</h3>
                  <p className="text-brand-cyan-300 text-xs">Intelligence Engine</p>
                </div>
              </div>
              <button 
                onClick={toggleOrb}
                className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6">
              <h4 className="text-lg font-medium text-white mb-2">
                {!hasCompleted ? TOUR_STEPS[currentStep].title : "How can I help?"}
              </h4>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                {!hasCompleted ? TOUR_STEPS[currentStep].message : "Access our key tools below to see the impact of AI on your workflows."}
              </p>

              {/* Progress dots */}
              {!hasCompleted && (
                <div className="flex gap-1.5 mb-6 justify-center">
                  {TOUR_STEPS.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentStep ? 'w-6 bg-brand-cyan-400' : 'w-1.5 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3">
                {!hasCompleted && currentStep === 0 ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="flex-1 glass text-white hover:text-brand-cyan-300 border-white/20"
                      onClick={handleSkip}
                    >
                      I'll explore myself
                    </Button>
                    <Button 
                      className="flex-1 bg-brand-cyan-500 hover:bg-brand-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      onClick={handleNext}
                    >
                      <Play className="h-4 w-4 mr-2 fill-current" />
                      Start Tour
                    </Button>
                  </>
                ) : !hasCompleted ? (
                   <>
                    <Button 
                      variant="ghost" 
                      className="text-neutral-400 hover:text-white"
                      onClick={handleSkip}
                    >
                      Skip
                    </Button>
                    <Button 
                      className="flex-1 bg-brand-cyan-500 hover:bg-brand-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      onClick={handleNext}
                    >
                      {currentStep === TOUR_STEPS.length - 1 ? (
                        <><CheckCircle className="h-4 w-4 mr-2" /> Finish Tour</>
                      ) : (
                        <>{TOUR_STEPS[currentStep].cta} <ArrowRight className="h-4 w-4 ml-2" /></>
                      )}
                    </Button>
                  </>
                ) : (
                   <div className="flex flex-col gap-2 w-full">
                     <Button variant="outline" className="w-full glass justify-start border-white/20 hover:bg-white/5" onClick={() => { router.push('/roi-calculator'); toggleOrb(); }}>
                       <Zap className="h-4 w-4 mr-3 text-brand-cyan-400" /> Calculate ROI
                     </Button>
                     <Button variant="outline" className="w-full glass justify-start border-white/20 hover:bg-white/5" onClick={() => { router.push('/assessment'); toggleOrb(); }}>
                       <CheckCircle className="h-4 w-4 mr-3 text-brand-purple-400" /> AI Assessment
                     </Button>
                   </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleOrb}
            className="group relative h-14 w-14 rounded-full bg-brand-cyan-500/10 backdrop-blur-md border border-brand-cyan-400/30 flex items-center justify-center hover:bg-brand-cyan-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]"
            aria-label="Open Flowtaris Assistant"
          >
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-brand-cyan-400"></div>
            <Zap className="h-6 w-6 text-brand-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)] group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>
    </>
  )
}

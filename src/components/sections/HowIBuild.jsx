import React, { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

// ─── Process steps ─────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'idea',
    index: '01',
    label: 'Idea',
    description:
      'Something clicks — a friction point, a weird possibility, a question worth answering with code. The idea doesn\'t have to be fully formed. It just has to be real enough to start.',
    marker: '◦',
  },
  {
    id: 'prototype',
    index: '02',
    label: 'Prototype',
    description:
      'Get something working as fast as possible. No architecture, no cleanup. The goal is a proof that the idea is solvable — even if the code is rough and the interface barely exists.',
    marker: '◦',
  },
  {
    id: 'build',
    index: '03',
    label: 'Build',
    description:
      'Now it becomes real. Structure the code, add the features that matter, make it actually usable. This is where most of the learning happens.',
    marker: '◦',
  },
  {
    id: 'break',
    index: '04',
    label: 'Break',
    description:
      'Use it wrong. Push it to the edge. Find the cases it doesn\'t handle. Every bug is information — what the system assumed, and where reality disagreed.',
    marker: '◦',
  },
  {
    id: 'refine',
    index: '05',
    label: 'Refine',
    description:
      'Remove what doesn\'t need to be there. Fix what actually breaks in practice, not what looks bad in theory. Make it quieter and more capable at the same time.',
    marker: '●',
  },
]

export function HowIBuild() {
  const ref = useReveal()
  const [activeStep, setActiveStep] = useState('idea')

  const active = STEPS.find((s) => s.id === activeStep)

  return (
    <section
      id="how-i-build"
      aria-label="How I Build"
      className="w-full border-t border-[#222228]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">

        {/* Section index */}
        <div className="reveal flex items-center gap-4 mb-16 sm:mb-20">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#3E3D45]">
            06 / Process
          </span>
          <div className="flex-1 h-px bg-[#1A1A1F]" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Header */}
          <div className="lg:col-span-5">
            <div className="reveal reveal-delay-1">
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.025em] text-[#EDEAE4]">
                How I build.
              </h2>
              <p className="mt-5 text-[14px] text-[#7A7880] leading-relaxed max-w-sm">
                Not a methodology. Just how it actually goes — every time,
                for every project.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive step visualizer */}
        <div className="reveal reveal-delay-2 mt-16 sm:mt-20">

          {/* ── Desktop: horizontal step row + expanding panel ── */}
          <div className="hidden md:block">
            {/* Step tabs */}
            <div className="flex border-b border-[#222228]">
              {STEPS.map((step, i) => {
                const isActive = activeStep === step.id
                const isPast = STEPS.findIndex((s) => s.id === activeStep) > i
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(step.id)}
                    className={`group flex-1 flex flex-col items-start px-6 py-5 text-left transition-all duration-200 border-r border-[#1A1A1F] last:border-r-0 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-[#C9A96E] ${
                      isActive ? 'bg-[#0D0D0F]' : 'hover:bg-[#0D0D0F]/50'
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Step ${step.index}: ${step.label}`}
                  >
                    <span
                      className={`font-mono text-[9px] uppercase tracking-widest mb-2 transition-colors duration-200 ${
                        isActive ? 'text-[#C9A96E]' : isPast ? 'text-[#3E3D45]' : 'text-[#3E3D45] group-hover:text-[#7A7880]'
                      }`}
                    >
                      {step.index}
                    </span>
                    <span
                      className={`text-sm font-normal transition-colors duration-200 ${
                        isActive ? 'text-[#EDEAE4]' : isPast ? 'text-[#3E3D45]' : 'text-[#7A7880] group-hover:text-[#EDEAE4]'
                      }`}
                    >
                      {step.label}
                    </span>
                    {/* Active indicator */}
                    <div
                      className={`mt-4 h-px w-full transition-all duration-300 ${
                        isActive ? 'bg-[#C9A96E]' : isPast ? 'bg-[#3E3D45]' : 'bg-transparent'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>

            {/* Expanding description */}
            <div
              className="bg-[#0D0D0F] border-b border-l border-r border-[#222228] px-8 py-8 transition-all duration-300"
              aria-live="polite"
            >
              <div className="grid grid-cols-12 gap-8 items-center">
                <div className="col-span-1">
                  <span className="font-mono text-[#C9A96E] text-2xl" aria-hidden="true">
                    {active.marker}
                  </span>
                </div>
                <div className="col-span-8">
                  <h3 className="text-lg font-normal text-[#EDEAE4] mb-3">
                    {active.label}
                  </h3>
                  <p className="text-[14px] text-[#7A7880] leading-relaxed">
                    {active.description}
                  </p>
                </div>
                <div className="col-span-3 flex justify-end">
                  <span className="font-mono text-[4rem] font-light text-[#1A1A1F] leading-none select-none" aria-hidden="true">
                    {active.index}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Mobile: stacked steps ── */}
          <div className="md:hidden space-y-0 border border-[#1A1A1F]">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className="border-b border-[#1A1A1F] last:border-0 px-5 py-6"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[9px] text-[#3E3D45] uppercase tracking-widest mt-1 shrink-0">
                    {step.index}
                  </span>
                  <div>
                    <p className="text-sm font-normal text-[#EDEAE4] mb-2">{step.label}</p>
                    <p className="text-[13px] text-[#7A7880] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing thought */}
        <div className="reveal reveal-delay-3 mt-14 sm:mt-16 pt-10 border-t border-[#1A1A1F]">
          <p className="text-[clamp(1rem,2vw,1.2rem)] font-light text-[#7A7880] leading-relaxed max-w-2xl italic">
            "The best way to understand a system is to build one that breaks."
          </p>
        </div>

      </div>
    </section>
  )
}

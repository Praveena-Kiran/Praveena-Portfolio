import React, { useState, useEffect, useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

// ─── Gesture-to-action feed items ─────────────────────────────────────────
// These represent real LensFlow capabilities — not invented
const GESTURE_FEED = [
  { gesture: 'Open palm', action: 'Pause media playback', category: 'Media' },
  { gesture: 'Swipe left', action: 'Advance slide', category: 'Presentation' },
  { gesture: 'Swipe right', action: 'Previous slide', category: 'Presentation' },
  { gesture: 'Index point up', action: 'Launch application', category: 'Launch' },
  { gesture: 'Pinch close', action: 'Trigger custom event', category: 'Automation' },
  { gesture: 'Two-finger swipe', action: 'Open website', category: 'Launch' },
  { gesture: 'Fist hold', action: 'Execute automation flow', category: 'Automation' },
]

// ─── Capability pillars ────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    id: 'vision',
    label: 'Computer Vision',
    detail: 'Real-time hand landmark detection via MediaPipe Hands, processed frame-by-frame through an OpenCV pipeline.',
  },
  {
    id: 'gestures',
    label: 'Gesture Recognition',
    detail: 'Custom gesture classifier maps landmark positions and movement vectors to defined trigger conditions.',
  },
  {
    id: 'flows',
    label: 'Automation Flows',
    detail: 'Each recognized gesture maps to a configurable flow — launching apps, files, websites, or custom system events.',
  },
  {
    id: 'powerpoint',
    label: 'Presentation Control',
    detail: 'Dedicated gesture bindings for PowerPoint navigation — advance, rewind, and control slides hands-free.',
  },
  {
    id: 'interface',
    label: 'Desktop Interface',
    detail: 'Built with PySide6 for a native desktop experience — configure flows, test gestures, and manage triggers visually.',
  },
]

// ─── Animated gesture feed ────────────────────────────────────────────────
function GestureFeed() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setActive((prev) => (prev + 1) % GESTURE_FEED.length)
        setVisible(true)
      }, 280)
    }, 2400)
    return () => clearInterval(interval)
  }, [])

  const item = GESTURE_FEED[active]

  return (
    <div
      className="font-mono text-[11px]"
      role="log"
      aria-label="LensFlow gesture feed"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Terminal-style header */}
      <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#1A1A1F]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" aria-hidden="true" />
        <span className="text-[#3E3D45] uppercase tracking-widest text-[9px]">lensflow / gesture stream</span>
        <span className="cursor-blink text-[#3E3D45] ml-auto">█</span>
      </div>

      {/* Feed history — last 4 items faded */}
      <div className="space-y-2 mb-4 opacity-30" aria-hidden="true">
        {[3, 2, 1].map((offset) => {
          const idx = (active - offset + GESTURE_FEED.length) % GESTURE_FEED.length
          const past = GESTURE_FEED[idx]
          return (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-[#3E3D45] w-28 truncate">{past.gesture}</span>
              <span className="text-[#3E3D45]">→</span>
              <span className="text-[#3E3D45] truncate">{past.action}</span>
            </div>
          )
        })}
      </div>

      {/* Active item */}
      <div
        className="flex items-center gap-4 transition-opacity duration-280"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span className="text-[#7A7880] w-28 truncate">{item.gesture}</span>
        <span className="text-[#C9A96E]">→</span>
        <span className="text-[#EDEAE4] truncate flex-1">{item.action}</span>
        <span className="text-[#3E3D45] uppercase tracking-wider text-[9px] hidden sm:block shrink-0">
          {item.category}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-5 h-px bg-[#1A1A1F] relative overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-[#C9A96E]/50"
          style={{
            width: `${((active + 1) / GESTURE_FEED.length) * 100}%`,
            transition: 'width 2.4s linear',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

// ─── Capability accordion item ─────────────────────────────────────────────
function CapabilityItem({ item, isOpen, onClick }) {
  const bodyRef = useRef(null)

  return (
    <div className="border-b border-[#1A1A1F] last:border-0">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 text-left group focus-visible:outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-[13px] font-normal transition-colors duration-200 ${isOpen ? 'text-[#EDEAE4]' : 'text-[#7A7880] group-hover:text-[#EDEAE4]'}`}>
          {item.label}
        </span>
        <span
          className={`font-mono text-[10px] text-[#3E3D45] transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        ref={bodyRef}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? '160px' : '0px' }}
      >
        <p className="pb-4 text-[13px] text-[#7A7880] leading-relaxed">
          {item.detail}
        </p>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────
export function LensFlowShowcase() {
  const ref = useReveal()
  const [openCap, setOpenCap] = useState('vision')

  const toggleCap = (id) => setOpenCap((prev) => (prev === id ? null : id))

  return (
    <section
      id="lensflow"
      aria-label="LensFlow — Gesture Automation"
      className="w-full border-t border-[#222228]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32">

        {/* Section index */}
        <div className="reveal flex items-center gap-4 mb-16 sm:mb-20">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#3E3D45]">
            04 / LensFlow
          </span>
          <div className="flex-1 h-px bg-[#1A1A1F]" aria-hidden="true" />
        </div>

        {/* Main split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left — identity + gesture feed */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="reveal reveal-delay-1">
              {/* Private badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#C9A96E] border border-[#C9A96E]/20 px-2.5 py-1">
                  Private Project
                </span>
              </div>

              <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.05] tracking-[-0.03em] text-[#EDEAE4] mb-5">
                LensFlow
              </h2>
              <p className="text-[15px] text-[#7A7880] leading-relaxed">
                A desktop application that makes your hands the interface.
                Point a webcam at your hands — LensFlow recognizes your gestures
                and maps them to system-level automation flows in real time.
              </p>
            </div>

            {/* Tech stack pills */}
            <div className="reveal reveal-delay-2 flex flex-wrap gap-2">
              {['Python', 'OpenCV', 'MediaPipe', 'PySide6'].map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] uppercase tracking-wider text-[#7A7880] border border-[#222228] px-3 py-1.5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Gesture feed widget */}
            <div className="reveal reveal-delay-3 border border-[#222228] bg-[#0D0D0F] p-6">
              <GestureFeed />
            </div>
          </div>

          {/* Right — capabilities accordion */}
          <div className="lg:col-span-6 lg:col-start-7 reveal reveal-delay-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#3E3D45] mb-8">
              How it works
            </p>

            <div className="border-t border-[#1A1A1F]">
              {CAPABILITIES.map((cap) => (
                <CapabilityItem
                  key={cap.id}
                  item={cap}
                  isOpen={openCap === cap.id}
                  onClick={() => toggleCap(cap.id)}
                />
              ))}
            </div>

            {/* Private note */}
            <div className="mt-12 pt-8 border-t border-[#1A1A1F]">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#3E3D45] mb-2">
                Availability
              </p>
              <p className="text-[13px] text-[#7A7880] leading-relaxed">
                LensFlow is a private project. The source code is not publicly available.
                If you're interested in collaborating or discussing the technical approach,
                feel free to reach out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

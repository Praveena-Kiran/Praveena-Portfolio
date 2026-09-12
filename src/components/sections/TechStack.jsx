import React, { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'

// Each tech gets a contextual description shown on hover
const TECH_NOTES = {
  Python:          'Used for automation, computer vision, and system tools.',
  Java:            'Used for object-oriented systems and coursework projects.',
  JavaScript:      'Used for web interfaces and interactive UI.',
  SQL:             'Used for relational database queries and data management.',
  React:           'Used to build this portfolio and web application UIs.',
  HTML:            'Structure layer for all web projects.',
  CSS:             'Styling and layout — including this site.',
  OpenCV:          'Used in LensFlow for real-time computer vision pipelines.',
  MediaPipe:       'Used in LensFlow for hand landmark detection and gesture recognition.',
  TensorFlow:      'Used for building and experimenting with ML models.',
  PyTorch:         'Used for deep learning experimentation.',
  Linux:           'Daily development environment; used in LinuxMonitor.',
  Git:             'Version control across all projects.',
  GitHub:          'Hosting and collaboration for open-source work.',
  AWS:             'Cloud infrastructure and deployment.',
  MySQL:           'Relational database used in web applications.',
  MongoDB:         'Document database used for flexible data storage.',
}

const CATEGORIES = [
  {
    id: 'lang',
    index: '01',
    label: 'Languages',
    note: 'What I write in.',
    items: ['Python', 'Java', 'JavaScript', 'SQL'],
    dir: 'l', dur: '30s',
  },
  {
    id: 'web',
    index: '02',
    label: 'Web',
    note: 'How I build interfaces.',
    items: ['React', 'HTML', 'CSS'],
    dir: 'r', dur: '22s',
  },
  {
    id: 'ai',
    index: '03',
    label: 'AI / Vision',
    note: 'Core of LensFlow and Trace.',
    items: ['OpenCV', 'MediaPipe', 'TensorFlow', 'PyTorch'],
    dir: 'l', dur: '28s',
  },
  {
    id: 'sys',
    index: '04',
    label: 'Systems & Data',
    note: 'Infrastructure, monitoring, storage.',
    items: ['Linux', 'Git', 'GitHub', 'AWS', 'MySQL', 'MongoDB'],
    dir: 'r', dur: '34s',
  },
]

function TechItem({ name }) {
  return (
    <span className="inline-flex items-center mx-8 sm:mx-12 whitespace-nowrap select-none">
      <span className="mr-8 sm:mr-12 text-[#2C2924] text-xs" aria-hidden="true">×</span>
      <span className="tech-tooltip-wrap">
        <span
          className="text-[#E9E4D9] hover:text-[#C47A2C] transition-colors duration-200 cursor-default"
          style={{
            fontFamily: 'Sora, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)',
          }}
        >
          {name}
        </span>
        {TECH_NOTES[name] && (
          <span className="tech-tooltip" role="tooltip">
            {TECH_NOTES[name]}
          </span>
        )}
      </span>
    </span>
  )
}

function TickerRow({ label, index, note, items, dir, dur }) {
  const doubled = [...items, ...items]
  const animClass = dir === 'l' ? 'tick-l' : 'tick-r'

  return (
    <div className="ticker-wrap group/row">
      {/* Category label */}
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[9px] text-[#3D3A34]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {index}
          </span>
          <span className="s-label group-hover/row:text-[#E9E4D9] transition-colors duration-200">
            {label}
          </span>
        </div>
        <span
          className="s-label text-[#C47A2C] italic opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hidden sm:block normal-case tracking-normal"
          style={{ fontSize: '11px', letterSpacing: '0.02em', textTransform: 'none', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 400 }}
        >
          {note}
        </span>
      </div>

      {/* Scrolling track */}
      <div
        className="overflow-hidden w-full py-1"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
        aria-label={`${label}: ${items.join(', ')}`}
      >
        <div
          className={`inline-flex items-center ${animClass} will-change-transform`}
          style={{ '--dur': dur }}
          aria-hidden="true"
        >
          {doubled.map((name, i) => (
            <TechItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TechStack() {
  const ref = useReveal()

  return (
    <section
      id="stack"
      aria-label="Technology Stack"
      className="w-full overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-10">
        <div className="reveal flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="s-label mb-4">02 / Stack</p>
            <h2
              className="text-[#E9E4D9] leading-[1.05] tracking-[-0.025em]"
              style={{
                fontFamily: 'Sora, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              }}
            >
              Tools I build with.
            </h2>
          </div>
          <p
            className="reveal reveal-d2 text-[#A09A8E] leading-relaxed max-w-xs text-right hidden sm:block"
            style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '13px' }}
          >
            Hover a name for context. Hover a row to pause.
          </p>
        </div>
      </div>

      <div className="pb-20 sm:pb-28 space-y-2 border-t border-[#2C2924]">
        {CATEGORIES.map((cat) => (
          <TickerRow key={cat.id} {...cat} />
        ))}
      </div>
    </section>
  )
}

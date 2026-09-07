import React from 'react'

// Simple Icons from react-icons (where available)
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss,
  SiOpencv,
  SiTensorflow,
  SiPytorch,
  SiLinux,
  SiGit,
  SiGithub,
  SiMysql,
  SiMongodb,
  SiMediapipe,
} from 'react-icons/si'

// Lucide fallbacks for technologies without Simple Icons
import { Cpu, Cloud, Database } from 'lucide-react'

// ─── Technology Rows ──────────────────────────────────────────────────────────
// Each item appears EXACTLY ONCE. No duplication.

const ROWS = [
  {
    id: 'languages',
    label: 'LANGUAGES',
    index: '01',
    direction: 'left',
    duration: '30s',
    items: [
      { name: 'Python',      icon: SiPython },
      { name: 'Java',        icon: Cpu },         // No SI icon — Lucide fallback
      { name: 'JavaScript',  icon: SiJavascript },
      { name: 'SQL',         icon: Database },    // No SI icon — Lucide fallback
    ],
  },
  {
    id: 'web',
    label: 'WEB',
    index: '02',
    direction: 'right',
    duration: '24s',
    items: [
      { name: 'React',       icon: SiReact },
      { name: 'HTML',        icon: SiHtml5 },
      { name: 'CSS',         icon: SiCss },
    ],
  },
  {
    id: 'ai-vision',
    label: 'AI / VISION',
    index: '03',
    direction: 'left',
    duration: '34s',
    items: [
      { name: 'OpenCV',      icon: SiOpencv },
      { name: 'MediaPipe',   icon: SiMediapipe },
      { name: 'TensorFlow',  icon: SiTensorflow },
      { name: 'PyTorch',     icon: SiPytorch },
    ],
  },
  {
    id: 'systems-data',
    label: 'SYSTEMS / DATA',
    index: '04',
    direction: 'right',
    duration: '38s',
    items: [
      { name: 'Linux',       icon: SiLinux },
      { name: 'Git',         icon: SiGit },
      { name: 'GitHub',      icon: SiGithub },
      { name: 'AWS',         icon: Cloud },       // No SI icon — Lucide fallback
      { name: 'MySQL',       icon: SiMysql },
      { name: 'MongoDB',     icon: SiMongodb },
    ],
  },
]

// ─── TechItem ─────────────────────────────────────────────────────────────────

function TechItem({ name, icon: Icon }) {
  return (
    <span
      className="group/item inline-flex items-center gap-2.5 cursor-default select-none flex-shrink-0 mx-8 sm:mx-12"
    >
      {/* Monochrome icon */}
      <Icon
        className="h-4 w-4 sm:h-5 sm:w-5 text-[#8B93A7] group-hover/item:text-[#C9C5BE] transition-colors duration-200 flex-shrink-0"
        aria-hidden="true"
      />

      {/* Technology name */}
      <span
        className="text-base sm:text-lg font-medium tracking-tight text-[#D8D4CE] group-hover/item:text-[#EEECE8] transition-colors duration-200 whitespace-nowrap"
      >
        {name}
      </span>
    </span>
  )
}

// ─── TechTickerRow ────────────────────────────────────────────────────────────

function TechTickerRow({ label, index, items, direction, duration }) {
  const animClass = direction === 'left' ? 'animate-ticker-left' : 'animate-ticker-right'

  return (
    <div className="ticker-row group">
      {/* Category label + rule — stays in the page margin */}
      <div className="flex items-center gap-3 mb-3 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8B93A7]/60 whitespace-nowrap select-none">
          {index} / {label}
        </span>
        <div className="flex-1 h-px bg-[#252936]/60" aria-hidden="true" />
      </div>

      {/* Full-width ticker track — overflows internally, never causes page scroll */}
      <div
        className="overflow-hidden w-full py-2"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
        }}
      >
        {/* Single, unduplicated sequence animated across the full viewport */}
        <div
          className={`inline-flex items-center ${animClass} will-change-transform`}
          style={{ '--ticker-duration': duration }}
          role="list"
          aria-label={`${label} technologies`}
        >
          {items.map((tech) => (
            <TechItem key={tech.name} name={tech.name} icon={tech.icon} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-label="Technology Stack"
      className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 overflow-hidden"
    >
      {/* Section header — inside the page container */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto mb-10 sm:mb-14">
        <div className="max-w-xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8B93A7]">
            02 / STACK
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl md:text-[2.75rem] font-normal tracking-[-0.03em] text-[#F5F5F7] leading-tight">
            Tools I build with.
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#8B93A7] font-normal leading-relaxed">
            The languages, frameworks, and tools behind my projects.
          </p>
        </div>
      </div>

      {/* Four ticker rows — full viewport width, compact vertical rhythm */}
      <div className="space-y-3 sm:space-y-4">
        {ROWS.map((row) => (
          <TechTickerRow
            key={row.id}
            label={row.label}
            index={row.index}
            items={row.items}
            direction={row.direction}
            duration={row.duration}
          />
        ))}
      </div>
    </section>
  )
}

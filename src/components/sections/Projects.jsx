import React, { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import imgLensFlow from '@/assets/lensflow_sc.jpg'
import imgLinux    from '@/assets/linux_sc.jpg'
import imgTrace    from '@/assets/trace_sc.jpg'
import imgLaundry  from '@/assets/laundry_sc.jpg'

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT SCREENSHOT PREVIEWS
───────────────────────────────────────────────────────────────────────────── */
const PREVIEWS = {
  lensflow:     <img src={imgLensFlow} alt="LensFlow application screenshot"      loading="lazy" decoding="async" className="w-full h-auto block" />,
  linuxmonitor: <img src={imgLinux}    alt="LinuxMonitor terminal screenshot"      loading="lazy" decoding="async" className="w-full h-auto block" />,
  trace:        <img src={imgTrace}    alt="Trace application screenshot"          loading="lazy" decoding="async" className="w-full h-auto block" />,
  smartlaundry: <img src={imgLaundry}  alt="Smart Laundry application screenshot" loading="lazy" decoding="async" className="w-full h-auto block" />,
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'lensflow',
    index: '01',
    name: 'LensFlow',
    year: '2026',
    type: 'Desktop Application',
    tagline: 'AI-powered gesture automation.',
    description:
      'A desktop application that turns hand gestures into system-level automation. Uses computer vision and gesture recognition to trigger configurable actions — launching apps, controlling files and websites, navigating presentations — without touching a keyboard.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PySide6'],
    link: 'https://github.com/Praveena-Kiran/LensFlow',
    linkLabel: 'GitHub →',
    note: null,
    color: '#C47A2C',
  },
  {
    id: 'linuxmonitor',
    index: '02',
    name: 'LinuxMonitor',
    year: '2026',
    type: 'CLI Tool',
    tagline: 'System monitoring from the terminal.',
    description:
      'A Bash-based system monitor for Linux and WSL2 environments. Tracks CPU, memory, disk, load, processes, network connectivity, and service health — with configurable NORMAL / WARNING / CRITICAL thresholds directly in the terminal.',
    tags: ['Bash', 'Linux', 'WSL2', 'Git'],
    link: 'https://github.com/Praveena-Kiran/LinuxMonitor',
    linkLabel: 'GitHub →',
    note: null,
    color: '#6B8E6B',
  },
  {
    id: 'trace',
    index: '03',
    name: 'Trace',
    year: '2025',
    type: 'Web Application',
    tagline: 'Image recognition for lost & found.',
    description:
      'A lost-and-found system built around Google Cloud Vision API. Explores how image recognition can match and identify lost item reports through computer vision rather than manual text search.',
    tags: ['Python', 'Google Vision API'],
    link: 'https://github.com/Rudranshhhhh/Wox-Hack-2nd-year',
    linkLabel: 'GitHub →',
    note: null,
    color: '#7A7880',
  },
  {
    id: 'smartlaundry',
    index: '04',
    name: 'Smart Laundry',
    year: '2025',
    type: 'Campus Application',
    tagline: 'Smarter shared washing machines.',
    description:
      'A laundry management application designed to help students use shared washing machines more efficiently — see machine availability, reduce unnecessary waiting, and turn a common campus friction point into a noticeably smoother experience.',
    tags: ['Software Development'],
    link: 'https://github.com/Rudranshhhhh/laundry-web',
    linkLabel: 'GitHub →',
    note: null,
    color: '#8A7464',
  },
]

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT ROW / STAGE
───────────────────────────────────────────────────────────────────────────── */
function ProjectStage({ project, isActive, isDimmed, onActivate }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onActivate()
    }
  }

  const stageClass = [
    'proj-stage relative border-b border-[#2C2924] last:border-0',
    isActive ? 'is-active' : '',
    isDimmed ? 'is-dimmed' : '',
  ].filter(Boolean).join(' ')

  return (
    <article
      className={stageClass}
      aria-expanded={isActive}
      aria-label={`Project: ${project.name}${isActive ? ', expanded' : ''}`}
    >
      {/* Accent line */}
      <div className="proj-line" aria-hidden="true" />

      {/* ── Always-visible header row ──────────────────────────────────── */}
      <div
        className="pl-6 sm:pl-10 lg:pl-12 pr-5 sm:pr-8 lg:pr-12 pt-7 sm:pt-9 pb-5 sm:pb-6 cursor-pointer select-none"
        onClick={onActivate}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`${isActive ? 'Collapse' : 'Expand'} ${project.name}`}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            {/* Meta row */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="font-mono text-[9px] text-[#3D3A34]"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {project.index}
              </span>
              <span
                className="font-mono text-[10px] text-[#3D3A34] uppercase tracking-wider"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {project.type}
              </span>
              <span
                className="font-mono text-[10px] text-[#C8C2B6] ml-auto"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {project.year}
              </span>
            </div>

            {/* Title + tagline */}
            <h3
              className="proj-title leading-[0.95] tracking-[-0.025em] mb-2"
              style={{
                fontFamily: 'Sora, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
                color: isActive ? project.color : '#E9E4D9',
                transition: 'color 0.3s ease',
              }}
            >
              {project.name}
            </h3>
            <p
              className="leading-snug"
              style={{
                fontFamily: 'Manrope, system-ui, sans-serif',
                fontSize: '13px',
                color: isActive ? '#E9E4D9' : '#A09A8E',
                transition: 'color 0.3s ease',
              }}
            >
              {project.tagline}
            </p>
          </div>

          {/* Expand indicator */}
          <div
            className="shrink-0 flex items-center justify-center w-8 h-8 border border-[#5A5650] mt-1"
            style={{
              borderColor: isActive ? 'rgba(196,122,44,0.5)' : undefined,
              transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease',
            }}
            aria-hidden="true"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 1v8M1 5h8" stroke={isActive ? '#C47A2C' : '#8A8478'} strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── Expandable body ────────────────────────────────────────────── */}
      <div className="proj-body" aria-hidden={!isActive}>
        <div className="pl-6 sm:pl-10 lg:pl-12 pr-5 sm:pr-8 lg:pr-12 pb-9 sm:pb-11">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-2">

            {/* Left: description + tags + link */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <p
                className="leading-[1.85] text-[#E9E4D9]"
                style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '15px' }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>

              {/* GitHub link */}
              <div className="flex flex-wrap items-center gap-4 mt-1">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-view-link inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#A09A8E] border border-[#2C2924] px-4 py-2 hover:border-[#C47A2C]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C47A2C]"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  aria-label={`View ${project.name} on GitHub`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {project.linkLabel}
                  <svg className="proj-view-arrow w-3 h-3" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: real screenshot */}
            <div className="proj-inline-preview lg:col-span-6 lg:col-start-7">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C47A2C]"
                aria-label={`View ${project.name} on GitHub`}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="border border-[#2C2924] overflow-hidden hover:border-[#C47A2C]/40 transition-colors duration-300"
                  style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}
                >
                  {PREVIEWS[project.id]}
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SECTION
───────────────────────────────────────────────────────────────────────────── */
export function Projects() {
  const ref = useReveal()
  const [activeId, setActiveId] = useState(null)

  const toggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="w-full bg-[#1A1815]"
      ref={ref}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28">
        <div className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <p className="s-label mb-4">03 / Projects</p>
            <h2
              className="text-[#E9E4D9] leading-[1.05] tracking-[-0.025em]"
              style={{
                fontFamily: 'Sora, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              }}
            >
              Things I've built.
            </h2>
          </div>
          <p
            className="reveal reveal-d2 text-[#A09A8E] leading-relaxed max-w-xs sm:text-right"
            style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '13px' }}
          >
            Select a project to expand it.
          </p>
        </div>
      </div>

      {/* Project list */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28">
        <div className="reveal reveal-d2 border-t border-[#2C2924]">
          {PROJECTS.map((p) => (
            <ProjectStage
              key={p.id}
              project={p}
              isActive={activeId === p.id}
              isDimmed={activeId !== null && activeId !== p.id}
              onActivate={() => toggle(p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

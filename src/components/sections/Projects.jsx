import React, { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import imgWield    from '@/assets/wield_sc.jpg'
import imgLinux    from '@/assets/linux_sc.jpg'
import imgTrace    from '@/assets/trace_sc.jpg'
import imgLaundry  from '@/assets/laundry_sc.jpg'

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT SCREENSHOT PREVIEWS
───────────────────────────────────────────────────────────────────────────── */
const PREVIEWS = {
  wield:        <img src={imgWield}    alt="Wield application screenshot"      loading="lazy" decoding="async" className="w-full h-auto block" />,
  linuxmonitor: <img src={imgLinux}    alt="LinuxMonitor terminal screenshot"      loading="lazy" decoding="async" className="w-full h-auto block" />,
  trace:        <img src={imgTrace}    alt="Trace application screenshot"          loading="lazy" decoding="async" className="w-full h-auto block" />,
  smartlaundry: <img src={imgLaundry}  alt="Smart Laundry application screenshot" loading="lazy" decoding="async" className="w-full h-auto block" />,
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'phoenix',
    index: '01',
    name: 'Phoenix',
    year: '2026',
    type: 'AI / Systems',
    tagline: 'Software that diagnoses and repairs itself.',
    description:
      'A self-healing software system that detects production incidents and fixes them automatically. I built the LLM engine: it reads incident evidence, diagnoses the root cause, generates multi-file code patches, and validates each patch in a sandbox before it is applied — with fallback patches, API error handling, and an evaluation harness to measure accuracy.',
    role: 'Team project · I built the LLM diagnosis & patch engine (~4,400 lines, incl. tests)',
    highlights: [
      'Root-cause diagnosis from logs and incident evidence',
      'Multi-file patch generation, validated in a sandbox',
      'Evaluation harness + Pytest suite for reliability',
    ],
    tags: ['Python', 'LLMs', 'Groq API', 'Pytest', 'Docker'],
    link: 'https://github.com/Rudranshhhhh/Phoenix-Self-Healing-Software-System',
    linkLabel: 'GitHub →',
    note: null,
    color: '#D9653B',
  },
  {
    id: 'wield',
    index: '02',
    name: 'Wield',
    year: '2026',
    type: 'Desktop Application · v1.0.0',
    tagline: 'Control your computer with gestures and your voice.',
    description:
      'A Windows accessibility app, released as v1.0.0, that lets you use your computer and PowerPoint hands-free. Show a hand gesture, draw a motion in the air, or say "Hey Wield, next slide" — and choose which of these triggers each action, so it fits the way you move. Voice runs fully offline, and the camera and microphone stay off until you press Start.',
    role: 'Lead developer · built the gesture, motion and voice engines, the desktop UI and the release pipeline',
    highlights: [
      'Real-time hand tracking with confidence-based recognition and a confirm gesture to cut false triggers',
      'Record your own gestures and motions, matched with DTW over fingertip or palm paths',
      'Offline "Hey Wield" voice commands (Vosk), plus sound cues and an on-screen overlay',
      '172 automated tests and GitHub Actions CI that builds and self-tests every release',
    ],
    tags: ['Python', 'OpenCV', 'MediaPipe', 'PySide6', 'Vosk', 'GitHub Actions'],
    link: 'https://github.com/Praveena-Kiran/Wield',
    linkLabel: 'GitHub →',
    live: 'https://praveena-kiran.github.io/Wield/',
    liveLabel: 'Live site · Download →',
    note: null,
    color: '#C47A2C',
  },
  {
    id: 'linuxmonitor',
    index: '03',
    name: 'LinuxMonitor',
    year: '2026',
    type: 'CLI Tool',
    tagline: 'System monitoring from the terminal.',
    description:
      'A Bash-based system monitor for Linux and WSL2 environments. Tracks CPU, memory, disk, load, processes, network connectivity, and service health — with configurable NORMAL / WARNING / CRITICAL thresholds directly in the terminal.',
    role: 'Solo project',
    highlights: [
      'Live CPU, memory, disk, load and process tracking',
      'NORMAL / WARNING / CRITICAL thresholds',
      'Service health and connectivity checks',
    ],
    tags: ['Bash', 'Linux', 'WSL2', 'Git'],
    link: 'https://github.com/Praveena-Kiran/LinuxMonitor',
    linkLabel: 'GitHub →',
    note: null,
    color: '#6B8E6B',
  },
  {
    id: 'trace',
    index: '04',
    name: 'Trace',
    year: '2025',
    type: 'Web Application',
    tagline: 'Image recognition for lost & found.',
    description:
      'A full-stack campus lost-and-found platform. Students report and browse items, and Google Cloud Vision matches lost-item photos to found reports instead of relying on manual text search.',
    role: 'Hackathon team project · I built the Flask backend, data models, and the React login, sign-up, report and browse pages',
    highlights: null,
    tags: ['React', 'Flask', 'MongoDB', 'Google Cloud Vision', 'JWT auth'],
    link: 'https://github.com/Rudranshhhhh/Wox-Hack-2nd-year',
    linkLabel: 'GitHub →',
    note: null,
    color: '#7A7880',
  },
  {
    id: 'smartlaundry',
    index: '05',
    name: 'Smart Laundry',
    year: '2025',
    type: 'Campus Application',
    tagline: 'Smarter shared washing machines.',
    description:
      'A laundry management application designed to help students use shared washing machines more efficiently — see machine availability, reduce unnecessary waiting, and turn a common campus friction point into a noticeably smoother experience.',
    role: 'Team project',
    highlights: null,
    tags: ['Web App', 'Frontend + Backend'],
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

              {/* My role */}
              {project.role && (
                <p
                  className="text-[11px] uppercase tracking-wider text-[#C47A2C]"
                  style={{ fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.6 }}
                >
                  {project.role}
                </p>
              )}

              {/* Highlights */}
              {project.highlights && (
                <ul className="flex flex-col gap-1.5">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-3 text-[#A09A8E] leading-snug"
                      style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '14px' }}
                    >
                      <span className="text-[#C47A2C] shrink-0" aria-hidden="true">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

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
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-view-link inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#C47A2C] border border-[#C47A2C]/50 px-4 py-2 hover:border-[#C47A2C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C47A2C]"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    aria-label={`Open the ${project.name} website`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.liveLabel}
                    <svg className="proj-view-arrow w-3 h-3" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Right: real screenshot (skipped when a project has none yet) */}
            {PREVIEWS[project.id] && (
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
            )}
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

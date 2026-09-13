import React from 'react'
import { useReveal } from '@/hooks/useReveal'

const INTERESTS = [
  'AI', 'Computer Vision', 'Automation', 'Software Development',
  'Linux / Systems', 'Robotics', 'Web Development', 'Japan',
]

export function About() {
  const ref = useReveal()

  return (
    <section
      id="about"
      aria-label="About"
      className="w-full bg-[#1A1815]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">

        {/* ── Heading + paragraphs ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 mb-16 sm:mb-20">

          <div className="lg:col-span-6 reveal">
            <p className="s-label mb-5">01 / About</p>
            <h2
              className="text-[#E9E4D9] leading-[1.06] tracking-[-0.025em]"
              style={{
                fontFamily: 'Sora, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              }}
            >
              Builder.
              <br />
              <span className="text-[#C47A2C]">Student.</span>
              <br />
              <span className="text-[#A09A8E]">Japan enthusiast.</span>
            </h2>
            <div className="mt-7 w-12 h-0.5 bg-[#C47A2C]" aria-hidden="true" />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 reveal reveal-d2 flex flex-col gap-5">
            <p
              className="text-[#E9E4D9] leading-[1.8]"
              style={{
                fontFamily: 'Manrope, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
              }}
            >
              I'm a third-year Computer Science Engineering student at Woxsen
              University, interested in the intersection of software, AI, and
              real-world systems. I like building things that are useful outside
              of a classroom — from computer-vision pipelines and gesture
              automation to Linux monitoring tools and everyday applications.
            </p>
            <p
              className="text-[#E9E4D9] leading-[1.8]"
              style={{
                fontFamily: 'Manrope, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
              }}
            >
              I'm also deeply interested in Japan — its technology ecosystem,
              engineering culture, and language. I've passed{' '}
              <span className="text-[#C47A2C] font-medium">JLPT N3</span>, and as
              President of the{' '}
              <span className="text-[#C47A2C] font-medium">
                Woxsen Japan Centre
              </span>
              , I explore that interest through leadership, cultural exchange, and
              building connections between students and industry. 
            </p>
          </div>
        </div>

        {/* ── Interests grid ───────────────────────────────────────────────── */}
        <div className="reveal reveal-d3 border-t border-[#2C2924] pt-10">
          <p className="s-label mb-8">Areas of interest</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {INTERESTS.map((item, i) => (
              <div
                key={item}
              className="group flex items-center gap-3 p-3 sm:p-4 bg-[#1B1915] border border-[#2C2924] hover:border-[#C47A2C]/40 transition-all duration-200 cursor-default"
              >
                <span
                  className="font-mono text-[9px] text-[#3D3A34] group-hover:text-[#C47A2C] transition-colors shrink-0"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-[13px] text-[#A09A8E] group-hover:text-[#E9E4D9] transition-colors leading-tight font-medium"
                  style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Language line — sits quietly below the grid */}
          <div className="mt-8 pt-6 border-t border-[#2C2924] flex flex-wrap items-baseline gap-x-6 gap-y-1">
            <span
              className="font-mono text-[10px] text-[#3D3A34] uppercase tracking-widest shrink-0"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Languages
            </span>
            <span
              className="text-[13px] text-[#A09A8E]"
              style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500 }}
            >
              Japanese · English · Telugu · Hindi
            </span>
            <span
              className="text-[12px] text-[#3D3A34]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              JLPT N3 — Passed
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}

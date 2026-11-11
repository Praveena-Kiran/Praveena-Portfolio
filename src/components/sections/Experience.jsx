import React from 'react'
import { useReveal } from '@/hooks/useReveal'

const STATS = [
  { value: '200+',    label: 'Active Members' },
  { value: '1,000+',  label: 'Students Engaged' },
  { value: '15+',     label: 'International Delegations' },
  { value: 'N4 & N5', label: 'Japanese Language Initiatives' },
]

export function Experience() {
  const ref = useReveal()

  return (
    <section
      id="experience"
      aria-label="Leadership"
      className="w-full"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">

        {/* ── Section label + title row ──────────────────────────────────── */}
        <div className="reveal mb-12 sm:mb-14">
          <p className="s-label mb-5">04 / Leadership</p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 items-baseline">
            <h2
              className="lg:col-span-7 text-[#E9E4D9] leading-[1.05] tracking-[-0.025em]"
              style={{
                fontFamily: 'Sora, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
              }}
            >
              Woxsen Japan Centre
            </h2>
            <p
              className="lg:col-span-4 lg:col-start-9 text-[#C47A2C] lg:text-right"
              style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 600, fontSize: '14px' }}
            >
              President · Woxsen University
            </p>
          </div>
        </div>

        {/* ── Stats as editorial typography with thin rules ─────────────── */}
        <div className="reveal reveal-d1 border-t border-[#2C2924] mb-14 sm:mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`py-8 sm:py-10 pr-6 sm:pr-10 ${
                  i < 3 ? 'border-r border-[#2C2924]' : ''
                } ${i >= 1 ? 'pl-6 sm:pl-10' : ''}`}
              >
                {/* Large editorial number */}
                <p
                  className="text-[#E9E4D9] leading-none mb-3"
                  style={{
                    fontFamily: 'Sora, system-ui, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {value}
                </p>
                {/* Muted label beneath */}
                <p
                  className="text-[#A09A8E]"
                  style={{
                    fontFamily: 'Manrope, system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: 1.5,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Description — full width at bottom ───────────────────────── */}
        <div className="reveal reveal-d2 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16">
          <p
            className="lg:col-span-5 text-[#E9E4D9] leading-[1.6]"
            style={{
              fontFamily: 'Sora, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
              letterSpacing: '-0.01em',
            }}
          >
            I oversee and coordinate the Centre's work connecting students with Japan.
          </p>
          <ul className="lg:col-span-6 lg:col-start-7 flex flex-col gap-3">
            {[
              'Oversee activities for a 200+ member student community',
              'Coordinated a 120-hour JLPT N5 programme with NaRa Japan Hub for 90+ students',
              'Coordinate visits from 15+ delegations from Japanese universities, organisations and companies',
              'Helped deliver Kizuna Matsuri with The Japan Foundation and Toshiba T&D (India)',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[#E9E4D9] leading-[1.7]"
                style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '15px' }}
              >
                <span className="text-[#C47A2C] shrink-0" aria-hidden="true">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}

import React, { useEffect, useRef, useCallback, useState } from 'react'
import portraitSrc from '@/assets/ferris_wheel.jpg'

const AREAS = [
  'AI', 'Computer Vision', 'Automation',
  'Linux / Systems', 'Robotics', 'Japan',
]

// ─── InteractiveName ─────────────────────────────────────────────────────────
function InteractiveName({ text, className, style }) {
  const wrapRef = useRef(null)

  const triggerLetter = useCallback((spans, idx) => {
    const len = spans.length
    spans.forEach((s) => s.classList.remove('letter-active', 'letter-near'))
    if (idx >= 0 && idx < len) spans[idx].classList.add('letter-active')
    if (idx - 1 >= 0) spans[idx - 1].classList.add('letter-near')
    if (idx + 1 < len) spans[idx + 1].classList.add('letter-near')
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const spans = Array.from(el.querySelectorAll('.letter'))

    const onEnter = (e) => {
      const span = e.target.closest('.letter')
      if (!span) return
      triggerLetter(spans, spans.indexOf(span))
    }
    const onEnd = (e) => e.target.classList.remove('letter-active', 'letter-near')
    const onTouch = () => {
      spans.forEach((s, i) => {
        setTimeout(() => {
          s.classList.remove('letter-active')
          void s.offsetWidth
          s.classList.add('letter-active')
        }, i * 45)
      })
    }

    el.addEventListener('mouseover', onEnter)
    spans.forEach((s) => s.addEventListener('animationend', onEnd))
    el.addEventListener('touchstart', onTouch, { passive: true })
    return () => {
      el.removeEventListener('mouseover', onEnter)
      spans.forEach((s) => s.removeEventListener('animationend', onEnd))
      el.removeEventListener('touchstart', onTouch)
    }
  }, [triggerLetter])

  return (
    <span ref={wrapRef} className={className} style={style} aria-label={text}>
      {text.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} className="inline-block">&nbsp;</span>
        ) : (
          <span key={i} className="letter" aria-hidden="true">{char}</span>
        )
      )}
    </span>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const lineRef     = useRef(null)
  const nameRef     = useRef(null)   // wrapper around h1 — drives portrait
  const portraitRef = useRef(null)
  const rafRef      = useRef(null)
  const [nameHovered, setNameHovered] = useState(false)

  // Expanding rule animation
  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const t = setTimeout(() => {
      el.style.transition = 'width 1.8s cubic-bezier(0.16,1,0.3,1)'
      el.style.width = '100%'
    }, 420)
    return () => clearTimeout(t)
  }, [])

  // Parallax — mouse position relative to the name block
  // rect is cached on mouseenter and invalidated on resize to avoid
  // getBoundingClientRect() inside every mousemove rAF callback.
  const rectCache = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const el = portraitRef.current
      if (!el || !rectCache.current) return

      const rect = rectCache.current
      const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
      const tx = nx * 12
      const ty = ny * 8
      el.style.transform = `translate(${tx}px, ${ty}px)`
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    // Cache rect once on enter — avoids forced layout on every mousemove
    if (nameRef.current) {
      rectCache.current = nameRef.current.getBoundingClientRect()
    }
    setNameHovered(true)
    if (portraitRef.current) portraitRef.current.style.transform = 'translate(0px, 0px)'
  }, [])

  const handleMouseLeave = useCallback(() => {
    setNameHovered(false)
    rectCache.current = null
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    if (portraitRef.current) portraitRef.current.style.transform = 'translate(0px, 0px)'
  }, [])

  const nameStyle = {
    fontFamily: 'Sora, system-ui, sans-serif',
    fontWeight: 800,
    fontSize: 'clamp(3rem, 10.5vw, 10rem)',
    lineHeight: 0.88,
    letterSpacing: '-0.03em',
    display: 'block',
  }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative w-full flex flex-col"
      style={{ minHeight: 'calc(100svh - 3.5rem)', paddingTop: '3.5rem' }}
    >
      {/* ── Status strip ─────────────────────────────────────────────────── */}
      <div
        className="h-enter px-5 sm:px-8 lg:px-12 pt-7 sm:pt-9"
        style={{ animationDelay: '60ms' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#2C2924]">
          <span className="s-label">CSE · Woxsen University</span>
          <span className="s-label flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C47A2C] animate-pulse inline-block" aria-hidden="true" />
            Currently building
          </span>
        </div>
      </div>

      {/* ── Name + content ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-12 py-7 sm:py-10 max-w-7xl mx-auto w-full">

        {/*
          Name block — `relative overflow-hidden` so the portrait is clipped
          to the name bounding box and never causes layout shift or overflow.
          Portrait sits at z-0, letters at z-10.
        */}
        <div
          ref={nameRef}
          className="h-enter relative mb-0"
          style={{ animationDelay: '160ms' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {/* ── Portrait layer — behind the name ─────────────────────────
              absolute, right-anchored so it sits behind/under "Kiran".
              Overflow is clipped by the parent. pointer-events:none so
              it never interferes with the letter hover events.
              CSS filter: grayscale + sepia gives it a warm cream tone
              that blends with the portfolio palette.
          ─────────────────────────────────────────────────────────────── */}
          <div
            className="absolute inset-y-0 right-0 pointer-events-none select-none"
            style={{
              // Width: occupies roughly the right 55% of the name block
              // so the face appears from behind the name text
              width: '55%',
              zIndex: 0,
            }}
            aria-hidden="true"
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                // Fade revealed: opacity 0 → 0.52, translateY 20px → 0
                opacity: nameHovered ? 0.52 : 0,
                transform: nameHovered ? 'translateY(0)' : 'translateY(20px)',
                transition: nameHovered
                  ? 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1)'
                  : 'opacity 0.4s ease, transform 0.4s ease',
              }}
            >
              {/* Inner div gets the parallax transform — separate from fade */}
              <div
                ref={portraitRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transition: nameHovered
                    ? 'transform 0.12s linear'
                    : 'transform 0.5s ease',
                }}
              >
                <img
                  src={portraitSrc}
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                  loading="eager"
                  decoding="async"
                  style={{
                    position: 'absolute',
                    // Anchor bottom-right — the face rises from the name baseline
                    bottom: '-10%',
                    right: 0,
                    height: '140%',
                    width: 'auto',
                    maxWidth: 'none',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    // Warm desaturated treatment: grayscale + slight sepia warmth
                    filter: 'grayscale(100%) sepia(20%) brightness(0.68) contrast(1.05)',
                    // Gradient mask: fades into the background on all edges
                    maskImage: [
                      'linear-gradient(to bottom, transparent 0%, black 18%, black 72%, transparent 100%)',
                      'linear-gradient(to left,   transparent 0%, black 22%, black 100%)',
                      'linear-gradient(to right,  transparent 0%, black 30%, black 100%)',
                    ].join(', '),
                    WebkitMaskImage: [
                      'linear-gradient(to bottom, transparent 0%, black 18%, black 72%, transparent 100%)',
                      'linear-gradient(to left,   transparent 0%, black 22%, black 100%)',
                      'linear-gradient(to right,  transparent 0%, black 30%, black 100%)',
                    ].join(', '),
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Name — sits above portrait at z-10 */}
          <h1 className="select-none relative" style={{ zIndex: 10 }} aria-label="Praveena Kiran">
            <InteractiveName
              text="Praveena"
              className="block text-[#E9E4D9]"
              style={nameStyle}
            />
            <InteractiveName
              text="Kiran"
              className="block text-[#C47A2C]"
              style={nameStyle}
            />
          </h1>
        </div>

        {/* Expanding rule */}
        <div className="mt-6 sm:mt-8 mb-6 sm:mb-8">
          <div
            ref={lineRef}
            style={{ width: '0%', height: '1px', background: '#2C2924' }}
            aria-hidden="true"
          />
        </div>

        {/* Statement + sidebar */}
        <div
          className="h-enter grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14"
          style={{ animationDelay: '360ms' }}
        >
          {/* Left: statement + desc + CTAs */}
          <div className="lg:col-span-7">
            <p
              className="text-[#E9E4D9] leading-[1.14] tracking-[-0.02em] mb-5"
              style={{
                fontFamily: 'Sora, system-ui, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 2.3vw, 2rem)',
              }}
            >
              I build systems that make technology
              feel less{' '}
              <em className="not-italic text-[#C47A2C]">complicated.</em>
            </p>

            <p
              className="text-[#A09A8E] leading-relaxed mb-7 max-w-lg"
              style={{
                fontFamily: 'Manrope, system-ui, sans-serif',
                fontWeight: 400,
                fontSize: '15px',
              }}
            >
              Computer Science Engineering student building AI-powered software,
              automation tools, and computer-vision systems — practical things
              that actually work.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C47A2C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1915]"
              >
                See Work
              </a>
              <a
                href="https://github.com/Praveena-Kiran"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C47A2C]"
              >
                GitHub
                <svg className="btn-arrow w-3.5 h-3.5" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: interests */}
          <div className="lg:col-span-4 flex flex-col justify-end gap-3">
            <p className="s-label mb-1">Interests</p>
            {AREAS.map((a, i) => (
              <div key={a} className="flex items-center gap-3 group cursor-default">
                <span
                  className="font-mono text-[9px] text-[#3D3A34] group-hover:text-[#C47A2C] transition-colors shrink-0"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-[13px] text-[#A09A8E] group-hover:text-[#E9E4D9] transition-colors"
                  style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500 }}
                >
                  {a}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ───────────────────────────────────────────────────── */}
      <div
        className="h-enter-flat px-5 sm:px-8 lg:px-12 pb-7"
        style={{ animationDelay: '700ms' }}
      >
        <a
          href="#about"
          className="flex items-center gap-3 text-[#3D3A34] hover:text-[#A09A8E] transition-colors w-fit focus-visible:outline-none"
          aria-label="Scroll to About"
        >
          <svg className="animate-bob w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 2v12M2 10l6 6 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="s-label">Scroll</span>
        </a>
      </div>
    </section>
  )
}

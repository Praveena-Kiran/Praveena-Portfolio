import React, { useState, useEffect, useRef } from 'react'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Stack',      href: '#stack' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Leadership', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  // rAF ref — prevents queuing more than one frame per scroll burst
  const rafRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return               // already a frame queued
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        // Only trigger a React re-render when the boolean actually changes
        const isScrolled = window.scrollY > 20
        setScrolled((prev) => (prev === isScrolled ? prev : isScrolled))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1B1915]/93 backdrop-blur-md border-b border-[#2C2924]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#hero"
            className="text-[#E9E4D9] hover:text-[#C47A2C] transition-colors duration-200 focus-visible:outline-none"
            style={{ fontFamily: 'Sora, system-ui, sans-serif', fontWeight: 800, fontSize: '15px' }}
          >
            PK
          </a>

          <nav className="hidden md:flex items-center gap-9" aria-label="Main navigation">
            {LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="cu-line text-[#A09A8E] hover:text-[#E9E4D9] transition-colors duration-200 focus-visible:outline-none"
                style={{
                  fontFamily: 'Manrope, system-ui, sans-serif',
                  fontWeight: 600,
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] group"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="block w-5 h-px bg-[#A09A8E] group-hover:bg-[#E9E4D9] transition-colors" />
            <span className="block w-3.5 h-px bg-[#A09A8E] group-hover:bg-[#E9E4D9] transition-colors self-start" />
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-[#1B1915]/70 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-64 bg-[#1A1815] border-l border-[#2C2924] flex flex-col transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        <div className="flex items-center justify-between px-6 h-14 border-b border-[#2C2924]">
          <span style={{ fontFamily: 'Sora, system-ui, sans-serif', fontWeight: 800, fontSize: '14px', color: '#E9E4D9' }}>
            PK
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-[#A09A8E] hover:text-[#E9E4D9] transition-colors"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-8" aria-label="Mobile navigation">
          {LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 py-4 border-b border-[#2C2924] last:border-0 group"
            >
              <span
                className="font-mono text-[9px] text-[#3D3A34] group-hover:text-[#C47A2C] transition-colors"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                0{i + 1}
              </span>
              <span
                className="text-[#A09A8E] group-hover:text-[#E9E4D9] transition-colors"
                style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 600, fontSize: '13px' }}
              >
                {label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

import React, { useState, useEffect, useRef } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import { ScrollProgress, useActiveSection } from '@/components/fx'

const SECTION_IDS = ['about', 'stack', 'projects', 'experience', 'contact']

const COPY = {
  en: {
    links: [
      { label: 'About',      href: '#about' },
      { label: 'Stack',      href: '#stack' },
      { label: 'Projects',   href: '#projects' },
      { label: 'Leadership', href: '#experience' },
      { label: 'Contact',    href: '#contact' },
    ],
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    navigation: 'Navigation',
    langLabel: 'Language',
  },
  ja: {
    links: [
      { label: 'プロフィール',   href: '#about' },
      { label: '技術',           href: '#stack' },
      { label: 'プロジェクト',   href: '#projects' },
      { label: 'リーダーシップ', href: '#experience' },
      { label: '連絡先',         href: '#contact' },
    ],
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    mainNav: 'メインナビゲーション',
    mobileNav: 'モバイルナビゲーション',
    navigation: 'ナビゲーション',
    langLabel: '言語',
  },
}

// ─── EN | 日本語 switch ──────────────────────────────────────────────────────
function LanguageToggle({ label }) {
  const { lang, setLang } = useLang()
  const options = [
    { code: 'en', text: 'EN',     title: 'English' },
    { code: 'ja', text: '日本語', title: '日本語' },
  ]

  return (
    <div
      className="flex items-center border border-[#2C2924] rounded-full p-0.5"
      role="group"
      aria-label={`${label} / Language`}
    >
      {options.map(({ code, text, title }) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            lang={code}
            title={title}
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={`px-2.5 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C47A2C] ${
              active
                ? 'bg-[#C47A2C] text-[#1B1915]'
                : 'text-[#A09A8E] hover:text-[#E9E4D9]'
            }`}
            style={{
              fontFamily: code === 'ja'
                ? 'system-ui, sans-serif'
                : 'Manrope, system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: code === 'ja' ? '0.02em' : '0.08em',
            }}
          >
            {text}
          </button>
        )
      })}
    </div>
  )
}

export function Navbar() {
  const { lang } = useLang()
  const c = COPY[lang]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const activeSection           = useActiveSection(SECTION_IDS)
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

          <div className="flex items-center gap-4 md:gap-9">
            <nav className="hidden md:flex items-center gap-9" aria-label={c.mainNav}>
              {c.links.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  aria-current={activeSection === href.slice(1) ? 'location' : undefined}
                  className={`cu-line ${activeSection === href.slice(1) ? 'is-current text-[#E9E4D9]' : 'text-[#A09A8E]'} hover:text-[#E9E4D9] transition-colors duration-200 focus-visible:outline-none`}
                  style={{
                    fontFamily: 'Manrope, system-ui, sans-serif',
                    fontWeight: 600,
                    fontSize: lang === 'ja' ? '12px' : '11px',
                    letterSpacing: lang === 'ja' ? '0.04em' : '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>

            <LanguageToggle label={c.langLabel} />

            <button
              type="button"
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] group"
              onClick={() => setOpen(true)}
              aria-label={c.openMenu}
              aria-expanded={open}
            >
              <span className="block w-5 h-px bg-[#A09A8E] group-hover:bg-[#E9E4D9] transition-colors" />
              <span className="block w-3.5 h-px bg-[#A09A8E] group-hover:bg-[#E9E4D9] transition-colors self-start" />
            </button>
          </div>
        </div>
        <ScrollProgress />
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
        aria-label={c.navigation}
      >
        <div className="flex items-center justify-between px-6 h-14 border-b border-[#2C2924]">
          <span style={{ fontFamily: 'Sora, system-ui, sans-serif', fontWeight: 800, fontSize: '14px', color: '#E9E4D9' }}>
            PK
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-[#A09A8E] hover:text-[#E9E4D9] transition-colors"
            aria-label={c.closeMenu}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-8" aria-label={c.mobileNav}>
          {c.links.map(({ label, href }, i) => (
            <a
              key={href}
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

import React from 'react'
import { useReveal } from '@/hooks/useReveal'
import { useLang } from '@/i18n/LanguageContext'
import { Kanji } from '@/components/fx'

const COPY = {
  en: {
    sectionLabel: 'Contact',
    eyebrow: '05 / Contact',
    headingBefore: "Let's build something ",
    headingAccent: 'worth building.',
    labels: { Email: 'Email', Resume: 'Resume' },
    resumeMeta: 'PDF · 1 page',
  },
  ja: {
    sectionLabel: '連絡先',
    eyebrow: '05 / 連絡先',
    headingBefore: '価値あるものを、',
    headingAccent: '一緒につくりましょう。',
    labels: { Email: 'メール', Resume: 'レジュメ' },
    resumeMeta: 'PDF · 1ページ（英語）',
  },
}

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Praveena-Kiran',
    meta: 'github.com/Praveena-Kiran',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/praveena-kiran-a8791b2b9',
    meta: 'https://www.linkedin.com/in/praveena-kiran-a8791b2b9',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:hipraveenakiran@gmail.com',
    meta: 'hipraveenakiran@gmail.com',
    external: false,
  },
  {
    label: 'Resume',
    href: '/Praveena_Kiran_Resume.pdf',
    meta: 'PDF · 1 page',
    external: true,
  },
]

export function Contact() {
  const ref = useReveal()
  const { lang } = useLang()
  const c = COPY[lang]

  return (
    <section
      id="contact"
      aria-label={c.sectionLabel}
      className="has-kanji relative overflow-hidden w-full bg-[#1A1815]"
      ref={ref}
    >
      <Kanji className="right-[-2vw] top-10">縁</Kanji>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">

        {/* Closing headline */}
        <div className="reveal mb-14 sm:mb-16">
          <p className="s-label mb-5">{c.eyebrow}</p>
          <h2
            className="text-[#E9E4D9] leading-[1.0] tracking-[-0.03em] max-w-3xl"
            style={{
              fontFamily: 'Sora, system-ui, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
            }}
          >
            {c.headingBefore}
            <span className="text-[#C47A2C]">{c.headingAccent}</span>
          </h2>
        </div>

        {/* Link list */}
        <div className="reveal reveal-d2 border-t border-[#2C2924]">
          {LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="contact-row group relative flex items-center justify-between py-6 sm:py-7 border-b border-[#2C2924] -mx-2 px-2 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-[#C47A2C]"
            >
              <div className="contact-row-label flex items-center gap-5 sm:gap-8">
                <span
                  className="font-mono text-[9px] text-[#3D3A34] group-hover:text-[#C47A2C] transition-colors"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-[#A09A8E] group-hover:text-[#E9E4D9] transition-colors duration-200 leading-none tracking-tight"
                  style={{
                    fontFamily: 'Sora, system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)',
                  }}
                >
                  {c.labels[link.label] ?? link.label}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <span
                  className="hidden sm:block font-mono text-[10px] text-[#3D3A34] group-hover:text-[#A09A8E] transition-colors"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {link.label === 'Resume' ? c.resumeMeta : link.meta}
                </span>
                <svg
                  className="w-4 h-4 text-[#3D3A34] group-hover:text-[#C47A2C] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200"
                  viewBox="0 0 10 10" fill="none" aria-hidden="true"
                >
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}

import React from 'react'
import { useReveal } from '@/hooks/useReveal'
import { useLang } from '@/i18n/LanguageContext'

// Paragraph text is split into segments so highlighted words ({ hl: true })
// keep their accent colour in both languages.
const COPY = {
  en: {
    sectionLabel: 'About',
    eyebrow: '01 / About',
    heading: ['Builder.', 'Student.', 'Japan enthusiast.'],
    p1: [
      { t: "I'm a third-year Computer Science Engineering student at Woxsen University, interested in the intersection of software, AI, and real-world systems. I like building things that are useful outside of a classroom — from computer-vision pipelines and gesture automation to Linux monitoring tools and everyday applications." },
    ],
    p2: [
      { t: "I'm also deeply interested in Japan — its technology ecosystem, engineering culture, and language. I've passed " },
      { t: 'JLPT N3', hl: true },
      { t: ', and as President of the ' },
      { t: 'Woxsen Japan Centre', hl: true },
      { t: ', I explore that interest through leadership, cultural exchange, and building connections between students and industry.' },
    ],
    interestsLabel: 'Areas of interest',
    interests: [
      'AI', 'Computer Vision', 'Automation', 'Software Development',
      'Linux / Systems', 'Robotics', 'Web Development', 'Japan',
    ],
    languagesLabel: 'Languages',
    languages: 'Japanese · English · Telugu · Hindi',
    jlpt: 'JLPT N3 — Passed',
  },
  ja: {
    sectionLabel: 'プロフィール',
    eyebrow: '01 / プロフィール',
    heading: ['つくる人。', '学ぶ人。', '日本とつながる人。'],
    p1: [
      { t: 'Woxsen大学のコンピュータサイエンス工学科に在籍する3年生です。ソフトウェア、AI、そして現実のシステムが交わる領域に関心があります。コンピュータビジョンのパイプラインやジェスチャーによる自動化から、Linuxの監視ツールや日常で使うアプリケーションまで、教室の外でも役に立つものをつくるのが好きです。' },
    ],
    p2: [
      { t: '日本のテクノロジー業界やエンジニアリング文化、そして日本語にも強い関心があります。' },
      { t: 'JLPT N3', hl: true },
      { t: 'に合格しており、' },
      { t: 'Woxsen Japan Centre', hl: true },
      { t: 'のプレジデントとして、リーダーシップや文化交流、学生と企業をつなぐ活動に取り組んでいます。' },
    ],
    interestsLabel: '関心分野',
    interests: [
      'AI', 'コンピュータビジョン', '自動化', 'ソフトウェア開発',
      'Linux／システム', 'ロボティクス', 'Web開発', '日本',
    ],
    languagesLabel: '言語',
    languages: '日本語 · 英語 · テルグ語 · ヒンディー語',
    jlpt: 'JLPT N3 合格',
  },
}

const paraStyle = {
  fontFamily: 'Manrope, system-ui, sans-serif',
  fontWeight: 400,
  fontSize: '15px',
}

function Segments({ parts }) {
  return parts.map((part, i) =>
    part.hl ? (
      <span key={i} className="text-[#C47A2C] font-medium">{part.t}</span>
    ) : (
      <React.Fragment key={i}>{part.t}</React.Fragment>
    )
  )
}

export function About() {
  const ref = useReveal()
  const { lang } = useLang()
  const c = COPY[lang]

  return (
    <section
      id="about"
      aria-label={c.sectionLabel}
      className="w-full bg-[#1A1815]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">

        {/* ── Heading + paragraphs ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 mb-16 sm:mb-20">

          <div className="lg:col-span-6 reveal">
            <p className="s-label mb-5">{c.eyebrow}</p>
            <h2
              className="text-[#E9E4D9] leading-[1.06] tracking-[-0.025em]"
              style={{
                fontFamily: 'Sora, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              }}
            >
              {c.heading[0]}
              <br />
              <span className="text-[#C47A2C]">{c.heading[1]}</span>
              <br />
              <span className="text-[#A09A8E]">{c.heading[2]}</span>
            </h2>
            <div className="mt-7 w-12 h-0.5 bg-[#C47A2C]" aria-hidden="true" />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 reveal reveal-d2 flex flex-col gap-5">
            <p className="text-[#E9E4D9] leading-[1.8]" style={paraStyle}>
              <Segments parts={c.p1} />
            </p>
            <p className="text-[#E9E4D9] leading-[1.8]" style={paraStyle}>
              <Segments parts={c.p2} />
            </p>
          </div>
        </div>

        {/* ── Interests grid ───────────────────────────────────────────────── */}
        <div className="reveal reveal-d3 border-t border-[#2C2924] pt-10">
          <p className="s-label mb-8">{c.interestsLabel}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {c.interests.map((item, i) => (
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
              {c.languagesLabel}
            </span>
            <span
              className="text-[13px] text-[#A09A8E]"
              style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500 }}
            >
              {c.languages}
            </span>
            <span
              className="text-[12px] text-[#3D3A34]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {c.jlpt}
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}

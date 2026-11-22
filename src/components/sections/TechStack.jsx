import React, { useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { useLang } from '@/i18n/LanguageContext'

const COPY = {
  en: {
    sectionLabel: 'Technology Stack',
    eyebrow: '02 / Stack',
    heading: 'Tools I build with.',
    hint: 'Hover a name for context. Hover a row to pause.',
    categories: {
      lang: { label: 'Languages',      note: 'What I write in.' },
      web:  { label: 'Web & Apps',     note: 'How I build interfaces and backends.' },
      ai:   { label: 'AI / Vision',    note: 'Core of Phoenix, Wield and Trace.' },
      sys:  { label: 'Systems & Data', note: 'Infrastructure, monitoring, storage.' },
    },
  },
  ja: {
    sectionLabel: '技術スタック',
    eyebrow: '02 / 技術スタック',
    heading: '使っている技術。',
    hint: '名前にカーソルを合わせると説明を表示、行に合わせると停止します。',
    categories: {
      lang: { label: '言語',             note: '普段使っているプログラミング言語。' },
      web:  { label: 'Web・アプリ',      note: 'UIとバックエンドの構築に。' },
      ai:   { label: 'AI・ビジョン',     note: 'Phoenix、Wield、Traceの中核技術。' },
      sys:  { label: 'システム・データ', note: 'インフラ、監視、データ保存。' },
    },
  },
}

const TECH_NOTES_JA = {
  Python:          '自動化、コンピュータビジョン、システムツールに使用。',
  Java:            'オブジェクト指向のシステムや授業のプロジェクトに使用。',
  JavaScript:      'WebインターフェースやインタラクティブなUIに使用。',
  SQL:             'リレーショナルデータベースのクエリとデータ管理に使用。',
  Bash:            'ターミナル用システムモニター「LinuxMonitor」の開発に使用。',
  React:           'このポートフォリオとWebアプリ「Trace」の開発に使用。',
  Flask:           'TraceのバックエンドのREST API、認証、データモデルに使用。',
  'HTML / CSS':    'このサイトを含む、すべてのWebプロジェクトの構造とデザインに。',
  PySide6:         'Wieldのデスクトップ画面に使用。',
  OpenCV:          'Wieldのリアルタイム画像処理パイプラインに使用。',
  MediaPipe:       'Wieldの手のランドマーク検出とジェスチャー認識に使用。',
  Vosk:            'Wieldのオフライン音声コマンド「Hey Wield」に使用。',
  'GitHub Actions': 'Wieldのテスト、ビルド、リリースを行うCIに使用。',
  'LLM APIs':      'Phoenix（Groq）で原因診断とコードパッチ生成に使用。',
  'Google Vision': 'Traceで落とし物の写真照合に使用。',
  Pytest:          'PhoenixのLLMエンジンのテストと評価に使用。',
  Linux:           '日常の開発環境。LinuxMonitorにも使用。',
  Git:             'すべてのプロジェクトのバージョン管理に。',
  GitHub:          'チームプロジェクトのホスティングと共同開発に。',
  AWS:             'クラウドコンピューティングの基礎（Udemy講座修了）。',
  MySQL:           'Webアプリで使うリレーショナルデータベース。',
  MongoDB:         '柔軟なデータ保存に使うドキュメント型データベース。',
}

// Each tech gets a contextual description shown on hover
const TECH_NOTES = {
  Python:          'Used for automation, computer vision, and system tools.',
  Java:            'Used for object-oriented systems and coursework projects.',
  JavaScript:      'Used for web interfaces and interactive UI.',
  SQL:             'Used for relational database queries and data management.',
  Bash:            'Used to build LinuxMonitor, a live terminal system monitor.',
  React:           'Used to build this portfolio and the Trace web app.',
  Flask:           'Used for the Trace backend: REST API, auth and data models.',
  'HTML / CSS':    'Structure and styling for all web projects — including this site.',
  PySide6:         'Used for the Wield desktop interface.',
  OpenCV:          'Used in Wield for real-time computer vision pipelines.',
  MediaPipe:       'Used in Wield for hand landmark detection and gesture recognition.',
  Vosk:            'Used in Wield for offline "Hey Wield" voice commands.',
  'LLM APIs':      'Used in Phoenix (Groq) for root-cause diagnosis and code patch generation.',
  'Google Vision': 'Used in Trace to match lost-item photos.',
  Pytest:          'Used to test and evaluate the Phoenix LLM engine.',
  'GitHub Actions': 'CI that tests, builds and releases Wield.',
  Linux:           'Daily development environment; used in LinuxMonitor.',
  Git:             'Version control across all projects.',
  GitHub:          'Hosting and collaboration for team projects.',
  AWS:             'Cloud computing fundamentals (certified, Udemy).',
  MySQL:           'Relational database used in web applications.',
  MongoDB:         'Document database used for flexible data storage.',
}

const CATEGORIES = [
  {
    id: 'lang',
    index: '01',
    label: 'Languages',
    note: 'What I write in.',
    items: ['Python', 'Java', 'JavaScript', 'SQL', 'Bash'],
    dir: 'l', dur: '30s',
  },
  {
    id: 'web',
    index: '02',
    label: 'Web & Apps',
    note: 'How I build interfaces and backends.',
    items: ['React', 'Flask', 'HTML / CSS', 'PySide6'],
    dir: 'r', dur: '24s',
  },
  {
    id: 'ai',
    index: '03',
    label: 'AI / Vision',
    note: 'Core of Phoenix, Wield and Trace.',
    items: ['OpenCV', 'MediaPipe', 'Vosk', 'LLM APIs', 'Google Vision', 'Pytest'],
    dir: 'l', dur: '28s',
  },
  {
    id: 'sys',
    index: '04',
    label: 'Systems & Data',
    note: 'Infrastructure, monitoring, storage.',
    items: ['Linux', 'Git', 'GitHub', 'GitHub Actions', 'AWS', 'MySQL', 'MongoDB'],
    dir: 'r', dur: '34s',
  },
]

function TechItem({ name }) {
  const { lang } = useLang()
  const note = (lang === 'ja' ? TECH_NOTES_JA : TECH_NOTES)[name]
  return (
    <span className="inline-flex items-center mx-8 sm:mx-12 whitespace-nowrap select-none">
      <span className="mr-8 sm:mr-12 text-[#2C2924] text-xs" aria-hidden="true">×</span>
      <span className="tech-tooltip-wrap">
        <span
          className="text-[#E9E4D9] hover:text-[#C47A2C] transition-colors duration-200 cursor-default"
          style={{
            fontFamily: 'Sora, system-ui, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)',
          }}
        >
          {name}
        </span>
        {note && (
          <span className="tech-tooltip" role="tooltip">
            {note}
          </span>
        )}
      </span>
    </span>
  )
}

function TickerRow({ label, index, note, items, dir, dur }) {
  const doubled = [...items, ...items]
  const animClass = dir === 'l' ? 'tick-l' : 'tick-r'

  return (
    <div className="ticker-wrap group/row">
      {/* Category label */}
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-12 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[9px] text-[#3D3A34]"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {index}
          </span>
          <span className="s-label group-hover/row:text-[#E9E4D9] transition-colors duration-200">
            {label}
          </span>
        </div>
        <span
          className="s-label text-[#C47A2C] italic opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 hidden sm:block normal-case tracking-normal"
          style={{ fontSize: '11px', letterSpacing: '0.02em', textTransform: 'none', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 400 }}
        >
          {note}
        </span>
      </div>

      {/* Scrolling track */}
      <div
        className="overflow-hidden w-full py-1"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        {/* Screen readers get one clean list; the looping visual copy is hidden */}
        <span className="sr-only">{`${label}: ${items.join(', ')}`}</span>
        <div
          className={`inline-flex items-center ${animClass} will-change-transform`}
          style={{ '--dur': dur }}
          aria-hidden="true"
        >
          {doubled.map((name, i) => (
            <TechItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TechStack() {
  const ref = useReveal()
  const { lang } = useLang()
  const c = COPY[lang]

  return (
    <section
      id="stack"
      aria-label={c.sectionLabel}
      className="w-full overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-10">
        <div className="reveal flex items-end justify-between gap-6 mb-12">
          <div>
            <p className="s-label mb-4">{c.eyebrow}</p>
            <h2
              className="text-[#E9E4D9] leading-[1.05] tracking-[-0.025em]"
              style={{
                fontFamily: 'Sora, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              }}
            >
              {c.heading}
            </h2>
          </div>
          <p
            className="reveal reveal-d2 text-[#A09A8E] leading-relaxed max-w-xs text-right hidden sm:block"
            style={{ fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '13px' }}
          >
            {c.hint}
          </p>
        </div>
      </div>

      <div className="pb-20 sm:pb-28 space-y-2 border-t border-[#2C2924]">
        {CATEGORIES.map((cat) => (
          <TickerRow key={cat.id} {...cat} {...c.categories[cat.id]} />
        ))}
      </div>
    </section>
  )
}

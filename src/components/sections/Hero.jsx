import React, { useState } from 'react'
import { ArrowUpRight, ArrowDown } from 'lucide-react'

const STATUS_ITEMS = [
  'CURRENTLY BUILDING / LENSFLOW',
  'BUILD STATUS / ACTIVE',
  'SYS.SPEC / APPLIED AI & SYSTEMS',
  'DISPATCH / HYD [IST] · TKYO [JST]',
]

export function Hero() {
  const [statusIndex, setStatusIndex] = useState(0)

  const cycleStatus = () => {
    setStatusIndex((prev) => (prev + 1) % STATUS_ITEMS.length)
  }

  return (
    <section
      id="hero"
      aria-label="Introduction and Overview"
      className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* 1. TOP EDITORIAL METADATA ROW */}
      <div
        className="animate-hero-reveal border-b border-border/40 pb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-[11px] uppercase tracking-[0.18em] font-mono text-text-muted"
        style={{ animationDelay: '100ms' }}
      >
        <div>
          <span className="block text-text font-medium">Praveena Kiran</span>
          <span className="block mt-0.5 text-text-muted/80">CSE / Woxsen University</span>
        </div>

        <div>
          <span className="block text-text font-medium">AI · Software · Automation</span>
          <span className="block mt-0.5 text-text-muted/80">India / Japan</span>
        </div>

        <div className="hidden md:block">
          <span className="block text-text-muted/60">Core Focus</span>
          <span className="block mt-0.5 text-text">Intelligent Systems &amp; Dev</span>
        </div>

        {/* Optional Experimental Interactive Interface Detail (Oumahi-inspired) */}
        <div className="flex sm:justify-end items-start">
          <button
            type="button"
            onClick={cycleStatus}
            aria-label="Cycle system telemetry status"
            title="Click to cycle status telemetry"
            className="group inline-flex items-center gap-2 rounded border border-border/60 bg-surface/60 px-2.5 py-1 text-[11px] font-mono tracking-[0.14em] text-text-muted hover:text-text hover:border-border hover:bg-surface transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary select-none cursor-pointer"
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary/90 group-hover:bg-primary transition-colors animate-pulse"
              aria-hidden="true"
            />
            <span className="truncate max-w-[210px] sm:max-w-none">
              {STATUS_ITEMS[statusIndex]}
            </span>
          </button>
        </div>
      </div>

      {/* 2. MIDDLE EDITORIAL HEADLINE & ASYMMETRIC SUPPORTING BLOCK */}
      <div className="my-auto py-10 sm:py-14 md:py-16 lg:py-20 flex flex-col justify-center">
        {/* Large Editorial Headline */}
        <h1
          className="animate-hero-reveal text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem] xl:text-[5.75rem] font-normal leading-[1.08] sm:leading-[1.03] tracking-[-0.03em] sm:tracking-[-0.04em] text-[#F5F5F7] max-w-5xl"
          style={{ animationDelay: '250ms' }}
        >
          I build systems that make technology feel less complicated.
        </h1>

        {/* Asymmetric layout for Supporting Copy and CTAs */}
        <div className="mt-8 sm:mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-7 lg:col-span-6 md:col-start-6 lg:col-start-6">
            <p
              className="animate-hero-reveal text-sm sm:text-base lg:text-[17px] leading-relaxed text-text-muted font-normal max-w-xl"
              style={{ animationDelay: '400ms' }}
            >
              Computer Science Engineering student building software, AI-powered tools,
              automation systems, and things that are slightly weird but actually useful.
            </p>

            {/* Action CTAs */}
            <div
              className="animate-hero-reveal mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
              style={{ animationDelay: '550ms' }}
            >
              {/* Primary CTA */}
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded border border-border bg-surface px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-text transition-all duration-200 hover:border-primary/80 hover:bg-surface-hover hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary active:scale-[0.99]"
              >
                EXPLORE WORK
              </a>

              {/* Secondary CTA */}
              <a
                href="https://github.com/Praveena-Kiran"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded border border-transparent px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-text-muted transition-all duration-200 hover:border-border/80 hover:bg-surface/50 hover:text-text focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary active:scale-[0.99]"
              >
                <span>GITHUB</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-text-muted group-hover:text-text"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM SCROLL CUE AND ARCHITECTURAL METADATA */}
      <div
        className="animate-hero-reveal pt-6 border-t border-border/30 flex items-center justify-between text-xs font-mono uppercase tracking-[0.18em] text-text-muted"
        style={{ animationDelay: '700ms' }}
      >
        <a
          href="#projects"
          className="group inline-flex items-center gap-2.5 text-text-muted hover:text-text transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          <span className="text-[11px] tracking-[0.2em]">SCROLL TO EXPLORE</span>
          <ArrowDown
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5 animate-subtle-scroll"
            aria-hidden="true"
          />
        </a>

        <div className="hidden sm:flex items-center gap-3 text-[11px] text-text-muted/60">
          <span>PORTFOLIO // V1.0</span>
          <span>·</span>
          <span>2026 EDITION</span>
        </div>
      </div>
    </section>
  )
}

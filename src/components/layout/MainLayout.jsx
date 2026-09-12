import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function MainLayout({ children }) {
  return (
    <div className="relative flex min-h-svh flex-col bg-[#1B1915] text-[#E9E4D9]">
      {/* ── Ambient background blobs ──────────────────────────────────────
          Fixed layer beneath all content. Pure CSS transforms/opacity —
          no JS, no layout thrash. Blobs are barely visible (opacity 0.055)
          and drift extremely slowly so they read as atmosphere, not effect.
      ───────────────────────────────────────────────────────────────────── */}
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* All page content sits above the blob layer (z-index baseline) */}
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}

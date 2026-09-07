import React from 'react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-[#08090D]/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-surface border border-border group-hover:border-primary/50 transition-colors">
            <span className="text-xs font-semibold tracking-wider text-text">PK</span>
          </div>
          <span className="text-sm font-medium tracking-tight text-text">Praveena</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-text-muted">
          <a href="#about" className="hover:text-text transition-colors">About</a>
          <a href="#tech-stack" className="hover:text-text transition-colors">Stack</a>
          <a href="#projects" className="hover:text-text transition-colors">Projects</a>
          <a href="#experience" className="hover:text-text transition-colors">Experience</a>
          <a href="#contact" className="hover:text-text transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  )
}

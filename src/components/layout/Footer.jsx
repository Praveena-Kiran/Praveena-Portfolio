import React from 'react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/40 bg-canvas py-8 transition-colors">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-text-muted sm:flex-row sm:px-6 lg:px-8">
        <p>&copy; {currentYear} Praveena. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Praveena-Kiran"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="hover:text-text transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}

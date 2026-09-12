import React from 'react'

export function Footer() {
  return (
    <footer className="w-full border-t border-[#2C2924]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: 'Sora, system-ui, sans-serif', fontWeight: 800, fontSize: '13px', color: '#E9E4D9' }}>
            PK
          </span>
          <span className="text-[#2C2924]" aria-hidden="true">·</span>
          <span
            className="font-mono text-[10px] text-[#3D3A34] uppercase tracking-widest"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Praveena Kiran
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Praveena-Kiran"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-[#3D3A34] uppercase tracking-widest hover:text-[#A09A8E] transition-colors"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            GitHub
          </a>
          <a
            href="#contact"
            className="font-mono text-[10px] text-[#3D3A34] uppercase tracking-widest hover:text-[#A09A8E] transition-colors"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Contact
          </a>
          <span
            className="font-mono text-[10px] text-[#3D3A34] uppercase tracking-widest"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}

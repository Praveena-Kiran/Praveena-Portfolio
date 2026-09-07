import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export function MainLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-canvas text-text">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

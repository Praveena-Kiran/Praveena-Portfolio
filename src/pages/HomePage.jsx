import React from 'react'
import { MainLayout } from '@/components/layout'
import { Hero, About, TechStack, Projects, Experience, Contact } from '@/components/sections'

export function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Contact />
    </MainLayout>
  )
}

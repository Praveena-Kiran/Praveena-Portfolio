import React from 'react'
import { MainLayout } from '@/components/layout'
import {
  Hero,
  About,
  TechStack,
  Projects,
  LensFlowShowcase,
  HowIBuild,
  Experience,
  Contact,
} from '@/components/sections'

export function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <LensFlowShowcase />
      <HowIBuild />
      <Experience />
      <Contact />
    </MainLayout>
  )
}

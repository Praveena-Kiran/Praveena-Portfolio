import React from 'react'
import { HomePage } from '@/pages/HomePage'
import { LanguageProvider } from '@/i18n/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  )
}

export default App

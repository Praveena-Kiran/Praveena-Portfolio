import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   Site language (English / Japanese)

   Priority on first load:
     1. ?lang=ja in the URL  — a link you can send straight to a recruiter
     2. the visitor's last choice (localStorage)
     3. the browser language (Japanese browsers open in Japanese)
   Each component keeps its own { en, ja } copy and reads `lang` from here.
───────────────────────────────────────────────────────────────────────────── */

export const LANGS = ['en', 'ja']
const STORAGE_KEY = 'pk-lang'

const TITLES = {
  en: 'Praveena Kiran — Builder',
  ja: 'Praveena Kiran — ポートフォリオ',
}

function getInitialLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (LANGS.includes(fromUrl)) return fromUrl
  } catch { /* ignore */ }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(saved)) return saved
  } catch { /* storage blocked */ }
  const browser = (navigator.language || '').toLowerCase()
  return browser.startsWith('ja') ? 'ja' : 'en'
}

const LanguageContext = createContext({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = TITLES[lang]
    try { window.localStorage.setItem(STORAGE_KEY, lang) } catch { /* storage blocked */ }

    // Keep the URL shareable: ?lang=ja for Japanese, clean URL for English
    const url = new URL(window.location.href)
    if (lang === 'ja') url.searchParams.set('lang', 'ja')
    else url.searchParams.delete('lang')
    window.history.replaceState(window.history.state, '', url.toString())
  }, [lang])

  const setLang = useCallback((next) => {
    if (LANGS.includes(next)) setLangState(next)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

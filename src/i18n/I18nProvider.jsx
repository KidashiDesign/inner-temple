import { createContext, useContext, useEffect, useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'
import { CONTENT } from './content.js'
import { DEFAULT_LANG, LANGS, ROUTES, langFromPath, routePath } from './routes.js'

const I18nContext = createContext(null)

/** Ersetzt {name}-Platzhalter in einem Text. */
export const fmt = (text, vars = {}) => text.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '')

/** Alt-Texte liegen als { de, en } vor, einzelne Stellen übergeben einen fertigen String. */
export const pickAlt = (alt, lang) => (typeof alt === 'string' ? alt : alt?.[lang] ?? '')

/**
 * Pfad derselben Seite in einer anderen Sprache, oder null, wenn die aktuelle URL keine bekannte Seite ist (404).
 * Lehrenden-Profile werden über ihre Position in der Liste zugeordnet (beide Sprachen haben dieselbe Reihenfolge).
 */
function alternatePath(pathname, from, to) {
  for (const key of Object.keys(ROUTES)) {
    const match = matchPath({ path: ROUTES[key][from], end: true }, pathname)
    if (!match) continue
    if (key === 'teamDetail') {
      const index = CONTENT[from].instructors.findIndex((p) => p.slug === match.params.slug)
      const target = CONTENT[to].instructors[index]
      return target ? routePath(key, to, { slug: target.slug }) : null
    }
    return routePath(key, to)
  }
  return null
}

export function I18nProvider({ children }) {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)

  const value = useMemo(() => {
    const alternates = {}
    for (const l of LANGS) alternates[l] = l === lang ? pathname : alternatePath(pathname, lang, l)
    return {
      lang,
      ...CONTENT[lang],
      path: (key, params) => routePath(key, lang, params),
      // Ziel des Sprachumschalters; auf unbekannten Seiten (404) die Startseite der Zielsprache.
      switchPath: (l) => alternates[l] ?? routePath('home', l),
      alternates,
    }
  }, [lang, pathname])

  useEffect(() => { document.documentElement.lang = lang }, [lang])

  // hreflang-Verweise auf die jeweils andere Sprachfassung der aktuellen Seite.
  useEffect(() => {
    if (LANGS.some((l) => !value.alternates[l])) return
    const entries = [...LANGS.map((l) => [l, value.alternates[l]]), ['x-default', value.alternates[DEFAULT_LANG]]]
    const links = entries.map(([hreflang, href]) => {
      const el = document.createElement('link')
      el.rel = 'alternate'
      el.hreflang = hreflang
      el.href = new URL(href, window.location.origin).href
      document.head.appendChild(el)
      return el
    })
    return () => links.forEach((el) => el.remove())
  }, [value])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)

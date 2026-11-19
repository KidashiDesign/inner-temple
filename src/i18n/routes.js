// Sprachen und URL-Schema. Deutsch (Standard) liegt unter den bisherigen URLs,
// Englisch unter dem Präfix /en. Die Sprache wird allein aus der URL abgeleitet.
export const LANGS = ['de', 'en']
export const DEFAULT_LANG = 'de'

// Routen-Schlüssel → Pfad je Sprache. `:slug` steht für den Slug eines Lehrenden.
export const ROUTES = {
  home: { de: '/', en: '/en' },
  about: { de: '/ueber-uns', en: '/en/about' },
  classes: { de: '/kurse', en: '/en/classes' },
  team: { de: '/team', en: '/en/team' },
  teamDetail: { de: '/team/:slug', en: '/en/team/:slug' },
  contact: { de: '/kontakt', en: '/en/contact' },
}

export const langFromPath = (pathname) => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LANG)

export const routePath = (key, lang, params = {}) =>
  ROUTES[key][lang].replace(/:(\w+)/g, (_, name) => params[name] ?? '')

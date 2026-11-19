import { useEffect } from 'react'

/** Setzt <title>, Meta-Description und og:image für die aktuelle Seite und stellt die Werte beim Verlassen wieder her. */
export function useDocumentMeta({ title, description, image }) {
  useEffect(() => {
    const prevTitle = document.title
    const upsert = (attr, key, content) => {
      if (!content) return () => {}
      let el = document.head.querySelector(`meta[${attr}="${key}"]`)
      const created = !el
      const prev = el?.getAttribute('content')
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el) }
      el.setAttribute('content', content)
      return () => (created ? el.remove() : el.setAttribute('content', prev ?? ''))
    }
    if (title) document.title = title
    const undo = [
      upsert('name', 'description', description),
      upsert('property', 'og:title', title),
      upsert('property', 'og:description', description),
      upsert('property', 'og:image', image ? new URL(image, window.location.origin).href : null),
    ]
    return () => { document.title = prevTitle; undo.forEach((f) => f()) }
  }, [title, description, image])
}

// Prüft, dass src/data/de und src/data/en dieselbe Struktur haben und nichts in der Übersetzung fehlt.
// Aufruf: npm run check:i18n  (Exit-Code 1 bei Fehlern, Hinweise auf mögliche unübersetzte Texte sind nur Warnungen)
import { readdirSync, readFileSync } from 'node:fs'
import { IMG } from '../src/data/images.js'

const root = new URL('../src/data/', import.meta.url)
const load = (lang, file) => JSON.parse(readFileSync(new URL(`${lang}/${file}`, root), 'utf8'))
const files = (lang) => readdirSync(new URL(`${lang}/`, root)).filter((f) => f.endsWith('.json')).sort()

// Felder, die in beiden Sprachen identisch sein müssen (Bilder, Kontaktdaten, Routen). Gilt nicht für ui.json.
const NEUTRAL = new Set(['image', 'email', 'phone', 'href', 'route', 'featured'])
// Leere Strings sind hier erlaubt (z. B. kein Text nach dem Akzentwort einer Überschrift).
const MAY_BE_EMPTY = new Set(['after'])

const errors = []
const warnings = []
const kind = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v)

function compare(de, en, path, file) {
  const here = `${file}:${path || '(root)'}`
  if (kind(de) !== kind(en)) return errors.push(`${here} – Typ ${kind(de)} (de) ≠ ${kind(en)} (en)`)
  if (kind(de) === 'array') {
    if (de.length !== en.length) errors.push(`${here} – ${de.length} Einträge (de) ≠ ${en.length} (en)`)
    for (let i = 0; i < Math.min(de.length, en.length); i++) compare(de[i], en[i], `${path}[${i}]`, file)
  } else if (kind(de) === 'object') {
    for (const key of new Set([...Object.keys(de), ...Object.keys(en)])) {
      if (!(key in en)) errors.push(`${here}.${key} – fehlt in en`)
      else if (!(key in de)) errors.push(`${here}.${key} – fehlt in de`)
      else compare(de[key], en[key], path ? `${path}.${key}` : key, file)
    }
  } else {
    const key = path.split(/[.[]/).pop().replace(']', '')
    if (file !== 'ui.json' && NEUTRAL.has(key) && de !== en) errors.push(`${here} – muss in beiden Sprachen gleich sein ("${de}" ≠ "${en}")`)
    if (kind(en) === 'string' && en.trim() === '' && !MAY_BE_EMPTY.has(key)) errors.push(`${here} – englischer Text ist leer`)
    if (kind(en) === 'string' && en === de && en.length > 12 && !NEUTRAL.has(key)) warnings.push(`${here} – identisch mit Deutsch: "${en.slice(0, 60)}"`)
  }
}

const deFiles = files('de')
const enFiles = files('en')
for (const f of deFiles) if (!enFiles.includes(f)) errors.push(`${f} – fehlt in src/data/en`)
for (const f of enFiles) if (!deFiles.includes(f)) errors.push(`${f} – fehlt in src/data/de`)
for (const f of deFiles.filter((x) => enFiles.includes(x))) compare(load('de', f), load('en', f), '', f)

// Namen der Lehrenden und der Site sind nicht übersetzt; Slugs müssen je Sprache eindeutig sein.
const de = { instructors: load('de', 'instructors.json'), site: load('de', 'site.json') }
const en = { instructors: load('en', 'instructors.json'), site: load('en', 'site.json') }
if (de.site.name !== en.site.name) errors.push('site.json:name – unterschiedlich')
de.instructors.forEach((p, i) => { if (en.instructors[i] && p.name !== en.instructors[i].name) errors.push(`instructors.json[${i}].name – "${p.name}" ≠ "${en.instructors[i].name}"`) })
for (const [lang, list] of [['de', de.instructors], ['en', en.instructors]]) {
  const slugs = list.map((p) => p.slug)
  if (new Set(slugs).size !== slugs.length) errors.push(`instructors.json (${lang}) – Slugs nicht eindeutig`)
}

// Bild-Alt-Texte in images.js
for (const [name, img] of Object.entries(IMG)) {
  for (const lang of ['de', 'en']) if (!img.alt?.[lang]?.trim()) errors.push(`images.js:${name} – alt.${lang} fehlt`)
}

if (warnings.length) console.warn(`Hinweise (${warnings.length}):\n  ${warnings.join('\n  ')}\n`)
if (errors.length) {
  console.error(`Fehler (${errors.length}):\n  ${errors.join('\n  ')}`)
  process.exit(1)
}
console.log(`i18n ok: ${deFiles.length} Dateien, Struktur de = en, ${Object.keys(IMG).length} Bild-Alt-Texte in beiden Sprachen.`)

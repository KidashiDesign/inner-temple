// Alle Inhalte je Sprache. Beide Ordner (src/data/de, src/data/en) müssen dieselbe Struktur haben;
// `npm run check:i18n` prüft das.
import deUi from '../data/de/ui.json'
import deSite from '../data/de/site.json'
import deHome from '../data/de/home.json'
import deFaq from '../data/de/faq.json'
import deClasses from '../data/de/classes.json'
import deInstructors from '../data/de/instructors.json'
import deDefaults from '../data/de/instructorDefaults.json'
import enUi from '../data/en/ui.json'
import enSite from '../data/en/site.json'
import enHome from '../data/en/home.json'
import enFaq from '../data/en/faq.json'
import enClasses from '../data/en/classes.json'
import enInstructors from '../data/en/instructors.json'
import enDefaults from '../data/en/instructorDefaults.json'

export const CONTENT = {
  de: { ui: deUi, site: deSite, home: deHome, faq: deFaq, classes: deClasses, instructors: deInstructors, defaults: deDefaults },
  en: { ui: enUi, site: enSite, home: enHome, faq: enFaq, classes: enClasses, instructors: enInstructors, defaults: enDefaults },
}

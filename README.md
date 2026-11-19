# Inner Temple Yoga Retreat – Demo-Website

Vite, React, React Router, GSAP (ScrollTrigger) und Lenis.

```bash
npm install
npm run dev
```

- Seiten: `/`, `/ueber-uns`, `/kurse`, `/team`, `/team/:slug`, `/kontakt`
- Inhalte: `src/data/*.json` (derzeit Platzhalter)
- Farben, Schriften, Abstände: `src/styles/tokens.css`
- Bilder: Feld `image` in den Daten bzw. `src` an `<Media>`; ohne Angabe erscheint eine Platzhalterfläche
- Spezifikation der Vorlage: `referenz/sitemap.md`, `referenz/inventar.md`

## Beispielinhalte (vor dem Livegang ersetzen)

- Namen, Rollen und Biografien der 8 Lehrenden (`src/data/instructors.json`) sind frei erfunden.
- Adresse, Telefon, E-Mail, Öffnungszeiten und Social-Links (`src/data/site.json`) sind Dummy-Werte.
- Kurse, Zeiten und Dauer (`src/data/classes.json`) sind Beispiele; Zahlen auf den Seiten werden daraus abgeleitet.
- Porträts der Lehrenden fehlen noch (`image: null` zeigt eine Platzhalterfläche).
- Bilder sind in `src/data/images.js` als KI-generiert gekennzeichnet (`ai`-Flag), siehe dortigen Kommentar.

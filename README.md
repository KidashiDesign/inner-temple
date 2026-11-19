# Inner Temple Yoga Retreat – Demo-Website

Vite, React, React Router, GSAP (ScrollTrigger) und Lenis. Die Seite ist zweisprachig (Deutsch und Englisch).

```bash
npm install
npm run dev
npm run check:i18n   # prüft, dass Deutsch und Englisch vollständig und gleich aufgebaut sind
```

## Seiten und Sprachen

| Seite | Deutsch (Standard) | Englisch |
|---|---|---|
| Start | `/` | `/en` |
| Über uns | `/ueber-uns` | `/en/about` |
| Kurse | `/kurse` | `/en/classes` |
| Team | `/team` | `/en/team` |
| Profil | `/team/lehrperson-1` … | `/en/team/instructor-1` … |
| Kontakt | `/kontakt` | `/en/contact` |

- Die Sprache ergibt sich aus der URL (Präfix `/en`). Der Umschalter „DE / EN“ in der Navigation führt zur selben Seite in der anderen Sprache; ein Profil wird über seine Position in der Liste zugeordnet.
- Pfade stehen in `src/i18n/routes.js`, neue Seiten dort für beide Sprachen eintragen.
- `<html lang>`, Seitentitel, Meta-Description und `hreflang`-Verweise werden je Sprache gesetzt.

## Inhalte

Alle Texte liegen je Sprache in `src/data/de/` und `src/data/en/`. Beide Ordner haben dieselben Dateien mit derselben Struktur:

- `ui.json`: Überschriften, Buttons, Labels, Formulartexte, Seitentitel, Barrierefreiheits-Texte
- `site.json`: Name, Navigation, Kontaktdaten, Öffnungszeiten, Social-Links, Stilliste
- `home.json`, `faq.json`, `classes.json`, `instructors.json`, `instructorDefaults.json`

Beim Ändern eines Textes immer beide Sprachen anpassen und danach `npm run check:i18n` ausführen. Das Skript meldet fehlende Schlüssel, unterschiedliche Listenlängen und Felder, die in beiden Sprachen gleich sein müssen (Bilder, E-Mail, Telefon, Links, Routen).

- Platzhalter in Texten: `{name}`, `{levels}` usw. (in beiden Sprachen beibehalten)
- Alt-Texte der Bilder: `alt: { de, en }` in `src/data/images.js`; Alt-Texte der Lehrenden in `instructors.json` (`imageAlt`)
- Zeiten und Zahlen auf den Seiten werden aus `classes.json` abgeleitet; Englisch nutzt die 24-Stunden-Zeit ohne „Uhr“
- Englische Texte sind in amerikanischem Englisch geschrieben

## Weiteres

- Farben, Schriften, Abstände: `src/styles/tokens.css`
- Bilder: Feld `image` in den Daten bzw. `src` an `<Media>`; ohne Angabe erscheint eine Platzhalterfläche
- Spezifikation der Vorlage: `referenz/sitemap.md`, `referenz/inventar.md`

## Beispielinhalte (vor dem Livegang ersetzen)

- Namen, Rollen und Biografien der 8 Lehrenden (`src/data/*/instructors.json`) sind frei erfunden.
- Adresse, Telefon, E-Mail, Öffnungszeiten und Social-Links (`src/data/*/site.json`) sind Dummy-Werte.
- Kurse, Zeiten und Dauer (`src/data/*/classes.json`) sind Beispiele; Zahlen auf den Seiten werden daraus abgeleitet.
- Bilder sind in `src/data/images.js` als KI-generiert gekennzeichnet (`ai`-Flag), siehe dortigen Kommentar.

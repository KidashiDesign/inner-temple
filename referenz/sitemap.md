# Sitemap der Referenz-Vorlage

Quelle: HTML aller abgerufenen Seiten unter `auravell.webflow.io` (Abruf 2026-11-16, Stand der Vorlage laut HTML-Kommentar: 2026-09-22).
`/sitemap.xml` liefert 404, `/robots.txt` ist leer (HTTP 200, 0 Byte). Die Seitenliste stammt deshalb ausschließlich aus Navigation, Footer und Seiteninhalt.

Prioritäten: **P1** Pflicht für die Demo · **P2** Pläne, Events, Blog · **P3** Utility und Varianten.

## 1. Umfang

| Kennzahl | Wert |
|---|---|
| Gefundene interne URLs | 33 |
| Davon eigenständige Seiten/Templates | 18 (15 statische Seiten + 3 CMS-Detail-Templates) |
| CMS-Einträge gesamt (nur verlinkt gezählt) | 8 Instructors, 4 Events, 6 Blog-Posts |
| Abgerufene HTML-Seiten | 19 (alle statischen Seiten, je 1–2 Beispiele pro CMS-Typ) |
| Abgerufene Assets | 1 CSS, 15 JS-Chunks (liegen in `referenz/raw/`) |

Hinweis zum Stop-Kriterium „mehr als 30 Seiten“: 33 URLs, aber nur 18 Templates; 15 der URLs sind weitere Einträge derselben drei CMS-Templates und wurden nicht abgerufen.

## 2. Seitenbaum

### 2.1 Hauptnavigation (Desktop, sichtbar)

| Nav-Eintrag (Typ) | URL | Seitentyp | Prio |
|---|---|---|---|
| Link 1 | `/` | Startseiten-Variante 1 | P1 |
| Link 2 | `/about` | statische Innenseite | P1 |
| Dropdown „Seiten“ (Mega-Menü) | – (kein eigenes Ziel) | – | – |
| Link 4 | `/blog` | CMS-Listenseite | P2 |
| Link 5 | `/contact` | statische Innenseite | P1 |
| CTA-Button rechts | `/contact` | – | – |

### 2.2 Mega-Menü (Inhalt des Dropdowns)

| Spalte | Eintrag | URL | Seitentyp | Prio |
|---|---|---|---|---|
| Links: Startseiten | Variante 1 | `/` | Startseiten-Variante | P1 |
| | Variante 2 | `/home-two` | Startseiten-Variante | P3 |
| | Variante 3 | `/home-three` | Startseiten-Variante | P3 |
| Links unten | Social-Links (3, extern) | – | – | – |
| Mitte: Innenseiten | Über uns | `/about` | statisch | P1 |
| | Kurse | `/our-classes` | statisch (kein CMS, siehe Inventar 6) | P1 |
| | Kontakt | `/contact` | statisch | P1 |
| | Untermenü Instruktoren → Liste | `/instructors` | CMS-Listenseite | P1 |
| | Untermenü Instruktoren → Detail-Beispiel | `/instructor/{slug}` | CMS-Detailseite | P1 |
| | Pläne | `/plans` | statisch (kein CMS) | P2 |
| | Untermenü Events → Liste | `/event` | CMS-Listenseite | P2 |
| | Untermenü Events → Detail-Beispiel | `/events/{slug}` | CMS-Detailseite | P2 |
| | Untermenü Blog → Liste | `/blog` | CMS-Listenseite | P2 |
| | Untermenü Blog → Detail-Beispiel | `/blog-post/{slug}` | CMS-Detailseite | P2 |
| Rechts (nur ≥ 992 px) | Promo-Karte: Logo, Text, Video, Text – ohne Link | – | – | – |

Im mobilen Menü (≤ 991 px) erscheinen dieselben Links als einspaltige Liste, zusätzlich unten Telefon-, E-Mail-Link und CTA-Button.

### 2.3 Footer

| Bereich | Eintrag | URL | Seitentyp | Prio |
|---|---|---|---|---|
| CTA-Block | Button | `/contact` | – | – |
| Linkliste 1 | 5 Links | `/`, `/about`, `/our-classes`, `/contact`, `/instructors` | siehe oben | – |
| Linkliste 2 | 5 Links | `/plans`, `/blog`, `/event`, `/401`, `/404` | siehe oben/unten | – |
| Social | 4 Links (extern) | – | – | – |
| Bottom-Bar | Lizenzen | `/licenses` | Utility | P3 |
| | Style-Guide | `/style-guide` | Utility | P3 |
| | Changelog | `/changelog` | Utility | P3 |
| | Passwortseite | `/401` | Utility (nur als Seitentyp erfasst) | P3 |
| | Fehlerseite | `/404` | Utility | P3 |

### 2.4 Nur über Seiteninhalt erreichbar

| URL-Muster | Verlinkt von | Seitentyp | Prio |
|---|---|---|---|
| `/instructor/{slug}` (8 Einträge) | `/`, `/about`, `/instructors` (Karten) | CMS-Detailseite | P1 |
| `/events/{slug}` (4 Einträge) | `/event` (Zeilen), Event-Detail („weitere Events“) | CMS-Detailseite | P2 |
| `/blog-post/{slug}` (6 Einträge) | `/blog`, `/home-two` (Blog-Teaser), Blog-Detail | CMS-Detailseite | P2 |
| `#team` (Anker) | `/` (Scroll-Button in der Benefits-Sektion) | Ankerlink | – |

## 3. Alle Seiten nach Typ

| # | URL | Seitentyp | Prio | abgerufen |
|---|---|---|---|---|
| 1 | `/` | Startseiten-Variante 1 | P1 | ja |
| 2 | `/home-two` | Startseiten-Variante 2 | P3 | ja |
| 3 | `/home-three` | Startseiten-Variante 3 | P3 | ja |
| 4 | `/about` | statische Innenseite | P1 | ja |
| 5 | `/our-classes` | statische Innenseite (Tabs + Karten) | P1 | ja |
| 6 | `/instructors` | CMS-Listenseite | P1 | ja |
| 7 | `/instructor/{slug}` | CMS-Detailseite (Template) | P1 | 2 Beispiele |
| 8 | `/contact` | statische Innenseite (Formular) | P1 | ja |
| 9 | `/plans` | statische Innenseite (Tabs, Preistabelle) | P2 | ja |
| 10 | `/event` | CMS-Listenseite | P2 | ja |
| 11 | `/events/{slug}` | CMS-Detailseite (Template) | P2 | 1 Beispiel |
| 12 | `/blog` | CMS-Listenseite | P2 | ja |
| 13 | `/blog-post/{slug}` | CMS-Detailseite (Template) | P2 | 1 Beispiel |
| 14 | `/licenses` | Utility | P3 | ja |
| 15 | `/style-guide` | Utility | P3 | ja |
| 16 | `/changelog` | Utility | P3 | ja |
| 17 | `/404` | Utility (Fehlerseite) | P3 | ja |
| 18 | `/401` | Utility (Passwortseite) | P3 | nur öffentliche Hülle, keine Eingabe |

Hinweis zu URL-Inkonsistenzen der Vorlage (HTML): Liste `/event` (Singular) vs. Detail `/events/{slug}` (Plural); Liste `/instructors` vs. Detail `/instructor/{slug}`; Liste `/blog` vs. Detail `/blog-post/{slug}`.

## 4. Geteilte Templates

| Template / Layout | Seiten | Beleg |
|---|---|---|
| Standard-Layout (fixe Navbar + Inhalt + Footer mit CTA) | alle außer `/401`, `/404` | HTML: `rt-nav-section-v1` + `section.rt-footer` |
| Layout ohne Footer (Navbar + Vollbild-Video) | `/404` | HTML |
| Layout ohne Navbar und Footer | `/401` | HTML |
| Vollbild-Bild-Hero (dunkel, Hintergrundlinien, zentrierte Headline) | `/about`, `/our-classes`, `/event` | HTML: `rt-about-hero-main` |
| Text-Hero ohne Bild (großes Top-Padding) | `/plans`, `/blog`, `/blog-post/*`, `/events/*`, `/instructor/*`, `/instructors`, `/contact` | HTML: `rt-blog-hero` / `rt-instructors-hero` / `rt-contact-hero` |
| Utility-Hero (dunkel, Bild + Overlay, H1 + Absatz) | `/licenses`, `/changelog`, `/style-guide` | HTML: `rt-utility-hero` |
| Instructor-Detail | alle 8 `/instructor/{slug}` | identische `data-wf-page`-ID in beiden Beispielen |
| Event-Detail | alle 4 `/events/{slug}` | CMS-Template (1 Beispiel geprüft) |
| Blog-Detail | alle 6 `/blog-post/{slug}` | CMS-Template (1 Beispiel geprüft) |
| Instruktoren-Raster (4 Spalten) | `/about` (4 Einträge), `/instructors` (8 Einträge) | HTML: `rt-instructors-grid-v1` |
| Instruktoren-Raster versetzt (4 Spalten, alternierend) | `/` | HTML: `rt-instructor-card-wrapper` |
| Kontaktformular (inline) | `/contact`, `/events/*` | HTML: gleiche Feldnamen |
| Kontaktformular (Modal) | `/home-two`, `/home-three`, `/about` | HTML: `rt-floating-form` |

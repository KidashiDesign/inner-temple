# Inventar der Referenz-Vorlage

Grundlage: 19 HTML-Seiten, 1 CSS-Datei, 15 JS-Chunks in `referenz/raw/` (nur gelesen).
Quellenkürzel: **CSS** = Stylesheet · **HTML** = Markup/Attribute · **JS-inline** = `<script>`-Blöcke im HTML (handgeschriebenes GSAP) · **IX3** = Webflow-Interactions-Daten in den `webflow.*.js`-Chunks (GSAP-basiert) · **WF** = Webflow-Standardkomponente (Nav, Dropdown, Slider, Tabs, Background-Video).
Texte, Bilder und Namen der Vorlage sind nicht übernommen; Inhalte sind nur nach Typ benannt. Klassennamen/Attribute der Vorlage dienen nur als Fundstellen-Verweis, nicht als Vorgabe für den Nachbau.

Die Bildschirmaufnahme `referenz/screenrecording.mov` liegt nicht im Repository; es gab keine Gegenprüfung per Video.

---

## 1. Globale Eigenschaften

### 1.1 Technik der Vorlage

| Thema | Befund | Quelle |
|---|---|---|
| Animations-Bibliothek | GSAP 3.15.0 + ScrollTrigger 3.15.0 | HTML (`<script src>`) |
| Smooth Scroll | Lenis 1.2.3, `lerp: 0.1`, `smoothWheel: true`, `wheelMultiplier: 1`; an `gsap.ticker` gekoppelt, `lagSmoothing(0)`; `ScrollTrigger.update` bei jedem Lenis-Scroll | JS-inline |
| Interaktions-System | Webflow IX3 (34 Interaktionen, davon 17 site-weit registriert) plus 30 Inline-Skripte | IX3, JS-inline |
| Refresh-Strategie | `lenis.resize()` + `ScrollTrigger.refresh()` bei load (+300/1000/2000 ms), resize, `document.fonts.ready`, ResizeObserver auf `body` | JS-inline |
| FOUC-Schutz | Elemente mit Startzuständen sind per `visibility:hidden` versteckt, bis IX3 geladen ist | HTML (`<style>` im Head) |
| Formulare | Webflow-Formulare mit Cloudflare-Turnstile-Attribut | HTML |
| jQuery | 3.5.1 (nur für Webflow-Komponenten) | HTML |

### 1.2 Schriften

| Rolle | Familie | Gewichte/Stile | Verwendung | Quelle |
|---|---|---|---|---|
| Primär (Headlines) | Playfair Display | 400 | h1–h6, Subtext/Eyebrow, Tabs, Zitate | CSS-Variable, HTML (Google-Fonts-Loader lädt nur 400) |
| Sekundär (Fließtext) | „Interdisplay“ (selbst gehostet, vermutlich Inter Display) | 400 belegt; weitere Schnitte nicht geprüft | body, p, Buttons, Nav-Links, Formularfelder | CSS (`@font-face`) |
| Tertiär (Akzent) | Lora Variable | 400–700, nur kursiv | hervorgehobenes Wort in Headlines, große Zierschrift, Zahlen/Preise, Uhrzeiten | CSS (`@font-face`, `font-style: italic`) |

Typisches Muster: Headline in Playfair, darin ein `<span>` in Lora kursiv und Akzentfarbe.

### 1.3 Typografie-Skala

| Stil | Basis (992–1279 px) | ≥ 1280 px | ≤ 991 px | ≤ 479 px | Zeilenhöhe | Laufweite (Basis) |
|---|---|---|---|---|---|---|
| h1 | 3.75rem | 4.5rem | 2.625rem | 2.375rem | 110 % | −0.125rem |
| h2 | 2.875rem | 3.5rem | 2rem | 1.875rem | 120 % | −0.125rem |
| h3 | 2.5rem | – | 1.75rem | 1.25rem | 125 % | −0.09375rem |
| h4 | 2rem | – | 1.5625rem | 1.375rem | 130 % | −0.0625rem |
| h5 | 1.5rem | – | 1.375rem | 1.25rem | 140 % | 0 |
| h6 | 1.25rem | – | 1.125rem | 1.0625rem | 140 % | 0 |
| Body | 1rem | 1.125rem | – | – | 140 % | −0.0056rem |
| Button / Menü | 1rem | 1.125rem | – | – | 110 % | −0.0056rem / 0 |
| Subtext (Eyebrow) | 1.125rem | – | 1rem | 1rem | 110 % | +0.0625rem |
| Small | 0.75rem | – | – | – | 140 % | +0.0225rem |
| Big Text (fluid) | `clamp(2.3125rem, 5.208vw, 6.25rem)` | | | | 100 % | −0.125rem |
| Large Text (fluid) | `clamp(2.3125rem, 10.4167vw, 12.5rem)` | | | | 100 % | `clamp(-.125rem, -.1042vw, -.0625rem)` |

Quelle: CSS-Variablen auf `body` je Media Query. Fluid Typography gibt es nur bei Big/Large Text; alle anderen Größen springen stufenweise. Alle Gewichte: 400.

### 1.4 Farben

| Token (Rolle) | Hex | Verwendung |
|---|---|---|
| Neutral 100 | `#ffffff` | Text auf dunkel, Navbar-Fläche, Karten |
| Neutral 200 | `#fef9ef` | Seitenhintergrund (primär) |
| Neutral 300 | `#d7d2c8` | Rahmen (Preistabelle) |
| Neutral 400 | `#5e6068` | Fließtext |
| Neutral 500 | `#2a2b2f` | Headlines, Primärtext |
| Neutral 600 | `#17181a` | dunkle Flächen (Hero, Footer, 404), Button-Hover-Overlay |
| Akzent 100 | `#99582a` | Buttons, Akzent-Schrift, aktive Zustände, Linien |
| Akzent 200 | `#f5ede1` | Sekundär-Hintergrund, Karten |
| Tints | `#17181a80`, `#17181a99`, `#17181acc`, `#0003`, `#0000001a` | Overlays, gestrichelte Linien, Schatten |
| Hintergrundlinien Hero | `#ffffff26` | 1 px breite vertikale Linien |
| In JS fest verdrahtet | `#99582A`, `#2A2B2F`, `#F5EDE1`, `#54666D`, `#ffffff` | Hover-Zustände der Karten (JS-inline) |

Quelle: CSS-Variablen; letzte Zeile JS-inline. Hinweis: `#54666D` (Absatzfarbe in Service-Karten) weicht vom CSS-Token `#5e6068` ab.

### 1.5 Abstände, Radien, Raster

| Thema | Wert | Quelle |
|---|---|---|
| Container | `max-width: 101.5rem`, seitliches Padding 2rem (≤ 767 px: 1.25rem) | CSS |
| Sektions-Abstand | 10.25rem oben und/oder unten (≤ 991 px: 4.375rem) – drei Varianten: nur oben, nur unten, beides | CSS |
| Gap Kopfbereich → Inhalt | 4rem (≤ 991 px: 2.25rem) | CSS |
| Gap zwischen Spalten (2-Spalter) | 2.5rem | CSS |
| Gap in Karten-Rastern | 1.5rem | CSS |
| Gap Eyebrow/Headline/Text | 1.5rem (≤ 991 px: 1.25rem) | CSS |
| Abstands-Skala | 59 Stufen von 0 bis 16rem (Variablen `spacing-1…59`) | CSS |
| Radius klein (Standard) | 0.5rem – Bilder, Karten, Buttons | CSS |
| Radius mittel | 1rem – Hero-Karte, Video-Block | CSS |
| Radius Pille | 31.25rem bzw. 4rem (Badges) | CSS |
| Spaltenbreiten-Token | 12er-Raster als feste Breiten: col-3 = 23.25rem, col-4 = 31.5rem, col-5 = 39.75rem, col-6 = 48rem, col-7 = 56.25rem, col-12 = 97.5rem | CSS |
| Linienstil | 1 px gestrichelt (`dashed`) in Schwarz 20 % bzw. Akzent gepunktet im Footer | CSS |
| z-index | Navbar 50, Modal 101 | CSS |

### 1.6 Breakpoints

| Name | Bedingung | Wirkung |
|---|---|---|
| Groß | ≥ 1920 px, ≥ 1440 px | einzelne Abstands-Anpassungen |
| Desktop groß | ≥ 1280 px | größere h1/h2/Body |
| Desktop (Basis) | 992–1279 px | – |
| Tablet | ≤ 991 px | Burger-Menü, 4-Spalter → 2-Spalter, sticky/100vh-Sektionen werden statisch, viele Desktop-Animationen aus |
| Mobil quer | ≤ 767 px | 2-Spalter stapeln, Container-Padding 1.25rem |
| Mobil hoch | ≤ 479 px | Karten-Raster werden durch Slider ersetzt |

Quelle: CSS (`@media`). In JS ist die Grenze überall 992 px / 991 px (`matchMedia`).

### 1.7 Button-Varianten

| Variante | Aufbau | Ruhezustand | Hover | Quelle |
|---|---|---|---|---|
| Primär | Icon links (versteckt) · Text · Icon rechts; dahinter Overlay-Fläche | Fläche `#99582a`, Text weiß, Radius 0.5rem, Padding 1rem 1.25rem | Overlay `#17181a` fährt von links ein, Icons tauschen, Text rückt nach rechts (Animation G06) | CSS, IX3 |
| Hell (Footer-CTA) | wie Primär | Fläche weiß, Text `#99582a` | Overlay `#99582a`, Text/Icon weiß (G07) | CSS, IX3 |
| Volle Breite | wie Primär, `width: 100%` | – | – | CSS |
| Formular-Submit / Modal-Öffner | natives `<input type=submit>` unsichtbar über einem Primär-Button ohne Pointer-Events | wie Primär | wie Primär (G08) | HTML, IX3 |
| Pfeil-Link (rund/quadratisch) | Icon-Fläche in Blog-Karten | `#2a2b2f` | `#99582a` (B-01) | IX3 |
| Video-Steuerung | runder Play/Pause-Button | – | – | WF |

### 1.8 Karten-Varianten

| Karte | Aufbau | Seiten |
|---|---|---|
| Programm-Karte | gestrichelte Oberlinie, darüber Akzent-Linie (animiert), Icon, Titel, Text | `/` |
| Bild-Karte mit Overlay-Text | Bild vollflächig, Label oben, Text fährt von unten ein | `/` (Angebote) |
| Benefit-Karte (dunkles Overlay) | Bild, Overlay mit Text und zwei Zierlinien, Titel darunter | `/home-two` |
| Experience-Karte | Icon, Linie mit Füll-Linie, Titel + Pfeil | `/home-two` |
| Service-Karte (Bildtausch) | helle Karte mit Icon/Titel/Text; Bild-Ebene fährt von oben darüber | `/home-three` |
| Session-Karte | Bild (Hover-Zoom), Titel, Text | `/about`, `/home-three` (Variante mit Rahmen) |
| Instruktoren-Karte | Hochformat-Bild mit Overlay und Eckrahmen, Name, Rolle | `/`, `/about`, `/instructors` |
| Kurs-Karte | Bild mit Hover-Overlay + Button, Titel + Uhrzeit, Text, 2 Badges | `/our-classes` |
| Preis-Karte | Icon, Name, Text, Feature-Liste mit Häkchen, Preis, Button, optional Tag | `/plans` |
| Blog-Karte horizontal | Bild links, rechts Meta-Zeile, Linie, Titel, Kurztext, Pfeil | `/blog` |
| Blog-Karte vertikal | Bild + Meta + Titel, Reihenfolge alternierend | `/home-two` |
| Event-Zeile | Bild und Textspalte nebeneinander, alternierende Seite, 5 Meta-Zeilen | `/event` |
| Event-Karte klein | Bild, Titel, Text | `/events/*` |
| Zähler-Kachel | große Zahl (Lora), Text | `/home-three`, `/instructors`, `/about` (als Overlay auf Bild) |
| Badge/Pille | Punkt + Text, 3 Farbvarianten (weiß, Outline, Akzent) | mehrere |

---

## 2. Gemeinsame Layouts

### 2.1 Navigation

**Desktop (≥ 992 px)** – Quelle: CSS, IX3
- Fixiert oben, `z-index: 50`, 1.5rem Abstand zum oberen Rand, im Container.
- Weiße Leiste mit Radius 0.5rem: Logo links · 5 Einträge (4 Links, 1 Dropdown) mit 2.1875rem Abstand · CTA-Button rechts.
- Dahinter eine zweite weiße Fläche („Overlay“) mit Schatten `0 4px 30px #0000001a`, Startbreite 50 %, zentriert.
- **Scroll-Verhalten (G02):** direkt beim ersten Scrollen (Scroll-Strecke 0 → 0,5 % der Seitenhöhe, scrub 1) geht der obere Abstand auf 0, die Innen-Paddings auf 0, der Radius auf 0 und die Overlay-Fläche auf 100 % Breite. Ergebnis: Die schwebende Pille wird zur vollbreiten Leiste. Kein Ein-/Ausblenden beim Scrollen.
- Link-Hover: Farbe `#99582a` + Unterstreichung (CSS).

**Dropdown / Mega-Menü** – Quelle: HTML, CSS, IX3
- Öffnet bei Hover (`data-hover=true`, Schließ-Verzögerung 500 ms, WF).
- Panel über die volle Breite direkt unter der Leiste, weiß, unten 0.25rem Akzent-Linie.
- Öffnen: Höhe 0 → auto, Pfeil-Icon dreht 180° (G03).
- Inhalt 3 Spalten: links 3 Startseiten-Links + Social-Zeile · Mitte Innenseiten-Liste (einige mit Unter-Dropdown, 2 Einträge je Untermenü) · rechts Promo-Karte (Akzentfläche, Logo, Kurztext, Video in Pillenform, Text).
- Zeilen im Menü: Text links, Pfeil rechts, 1 px Linie unten; Hover: Akzent-Linie 0 → 100 % Breite, Pfeil dreht 45° und wird Akzentfarbe (G04).

**Tablet/Mobil (≤ 991 px)** – Quelle: CSS, HTML, JS-inline
- Leiste vollbreit ohne Radius und ohne oberen Abstand; Burger rechts (3 Linien, unterste kürzer).
- Menü klappt unter der Leiste auf (WF-Nav, `data-collapse=medium`, 400 ms, ease), max. Höhe `100vh − 60px`, scrollbar.
- Inhalt: einspaltige Linkliste (eigene Markup-Kopie), Unter-Dropdowns per Tap, unten Telefon, E-Mail, CTA-Button.
- Burger → X (G05). Promo-Karte und CTA der Leiste sind ausgeblendet.

### 2.2 Footer

Quelle: HTML, CSS
- Dunkle Fläche `#17181a` mit vollflächigem Hintergrundbild und Verlauf von unten (deckend) nach oben (30 %).
- Block 1 (zentriert, max. 39.75rem): H2 + heller Button → `/contact`.
- Block 2 (3 Spalten): Logo + Kurztext + Öffnungszeiten · Überschrift + 2 Linklisten à 5 Links · Standort-Icon + Adresse + Social-Links.
- Bottom-Bar: gepunktete Akzent-Linie oben; links Copyright/Credits, rechts 3 Utility-Links.
- ≤ 767 px: Block 2 als 2-spaltiges Raster, Bottom-Bar gestapelt; ≤ 479 px einspaltig.
- Link-Hover: Akzentfarbe (CSS). Keine wirksame Scroll-Animation (siehe 7).

### 2.3 Seitenübergänge, Preloader, Cursor

| Mechanik | Befund | Quelle |
|---|---|---|
| Seitenübergänge | keine; normale Seitenwechsel mit vollem Reload | HTML/JS (kein Transition-Code, keine View-Transitions-Regeln) |
| Preloader | keiner | HTML/CSS |
| Cursor-Effekte | keine | HTML/CSS/JS |
| Ladeeffekt je Seite | Hero-Inhalte blenden gestaffelt ein (G12), Hero-Bild zoomt aus (G11), Hero-Linien wachsen (G10) – wirkt als Ersatz für einen Übergang | JS-inline |
| Smooth Scroll | Lenis auf allen Seiten inkl. 401/404 | JS-inline |

### 2.4 Modal-Formular

Quelle: HTML, CSS, IX3 – auf `/home-two`, `/home-three`, `/about`
- Fixierte Ebene `z-index: 101`, Hintergrund halbtransparent mit `backdrop-filter: blur(5px)`.
- Karte max. 39.75rem, Fläche `#f5ede1`, Schließen-Icon oben rechts.
- Inhalt: Titel, Kurztext, Felder Name, Telefon, E-Mail, Auswahl, Nachricht, Submit, Fußzeile mit Icon + Text; Erfolgs- und Fehlermeldung.
- Öffnen/Schließen: G09.

---

## 3. Komponenten-Liste

| Komponente | Beschreibung | Seiten |
|---|---|---|
| `Navbar` | 2.1 | alle außer `/401` |
| `MegaMenu` | 2.1 | alle außer `/401` |
| `Footer` (inkl. CTA) | 2.2 | alle außer `/401`, `/404` |
| `Button` (primär, hell, volle Breite, Submit) | 1.7 | alle |
| `SectionHeader` | Eyebrow + H2 (mit Akzent-Span) + optional Absatz; links oder zentriert | fast alle Sektionen |
| `Badge` | 1.8 | `/`, `/home-two`, `/home-three`, `/about`, `/our-classes` |
| `ImageReveal` | Bild-Container mit Einblend- und Skalierungs-Effekt (G14 + G15) | alle Seiten mit Inhaltsbildern |
| `HeroImage` (Vollbild, dunkel, Linien) | 4.x | `/about`, `/our-classes`, `/event`; Abwandlung auf `/` |
| `HeroText` | Text-Hero ohne Bild | `/plans`, `/blog`, `/instructors`, Detailseiten |
| `HeroUtility` | H1 + Absatz auf dunklem Bild | `/licenses`, `/changelog`, `/style-guide` |
| `BackgroundLines` | 3 vertikale Linien im Hero | `/`, `/home-three`, `/about`, `/our-classes`, `/event` |
| `LogoMarquee` | Endlos-Laufband (G19); Variante hell mit Label links, Variante „Glas“ am unteren Rand dunkler Sektionen | `/` (hell), `/home-two`, `/about`, `/our-classes` (Glas) |
| `InstructorCard` + Raster | 1.8 | `/`, `/about`, `/instructors` |
| `CounterRow` | 4 Zähler-Kacheln (G18) | `/home-three`, `/instructors`; Einzelzähler `/about` |
| `FaqSection` (umrandete Einträge) | links H2 + Text, rechts 5 Einträge mit Nummer, Frage, Plus-Icon (G21) | `/home-two`, `/about`, `/contact` |
| `FaqInline` (linierte Einträge) | 4 Einträge, einer immer offen (A-01) | `/about` |
| `TestimonialSlider` | 4 Slides, Zähler „aktuell / gesamt“, Pfeile (G20) | `/home-three`, `/events/*` |
| `QuoteBlock` | Stern-Icon + zentrierter Text mit Hervorhebung | `/`, `/home-three` |
| `ContactForm` (inline) | 2×2-Feldraster + Textarea + Checkbox + Submit | `/contact`, `/events/*` |
| `FloatingForm` (Modal) | 2.4 | `/home-two`, `/home-three`, `/about` |
| `MobileSlider` | ersetzt Karten-Raster bei ≤ 479 px (WF-Slider, Autoplay) | `/`, `/home-two`, `/home-three`, `/about`, `/instructors` |
| `Tabs` | Reiterleiste + Panels ohne Übergang | `/our-classes`, `/plans` (2×) |
| `SplitSection` | 2-Spalter Bild/Text, Bild max. 48rem, Seiten wechselnd | `/`, `/home-two`, `/home-three`, `/about` |
| `VideoBlock` | Hintergrundvideo mit Play/Pause-Button | `/` (2×), `/home-two`, `/home-three` (2×), `/404`, Mega-Menü |
| `RichText` | CMS-Fließtext mit h3–h6, p, ul | Detailseiten |
| `MetaList` | Zeilen „Label : Wert“ mit gestrichelter Linie | `/event`, `/events/*`, `/instructor/*` |
| `BlogCard` (horizontal/vertikal) | 1.8 | `/blog`, `/home-two`, `/blog-post/*` (nur Titel-Link) |
| `EventRow` / `EventCard` | 1.8 | `/event`, `/events/*` |

---

## 4. Sektionen pro Seite

Animations-IDs verweisen auf Abschnitt 5. „Standard-Reveals“ bedeutet: Texte mit G13, Bilder mit G14 + G15.

### 4.1 `/` – Startseite Variante 1

| # | Sektion | Layout | Inhalt | Animationen |
|---|---|---|---|---|
| 1 | Hero | `position: sticky; top: 0`, 100vh, dunkel; Inhalt unten ausgerichtet; nachfolgende Sektionen schieben sich darüber. Links Textspalte, rechts Karte (max. 23.25rem, Radius 1rem, helle Fläche). Hintergrund: Bild 120 % Höhe, diagonaler Verlauf 60°, 3 Linien | Eyebrow, H1 mit Akzent-Span, Absatz; Karte: Video mit Play/Pause, Label, Titel, 3 Icon-Punkte, Badge | G10, G11, G12, H1-01, H1-02 |
| 2 | Programme | Header zentriert; Raster 4 Spalten (≤ 991: 2, ≤ 479: Slider, Autoplay 4 s) | 4 Programm-Karten | G13, G16, H1-03 |
| 3 | Video-Band | Block 39.25rem hoch, Radius 1rem, zentriert | Hintergrundvideo, Play/Pause + Label | H1-04 |
| 4 | Angebote | Header 2-spaltig (links Eyebrow + H2, rechts Absatz); 3 Bild-Karten mit `perspective: 3000px` (≤ 479: Slider, 2 s); darunter Zitat-Block | 3 Karten, Zitat | G13, G17, H1-05, (mobil G23) |
| 5 | Warum wir | Hintergrund `#f5ede1`; 2-Spalter: Bild mit Badge links, rechts Eyebrow, H2, Text, Button, 3 Feature-Zeilen (Icon + H3 + Text) | – | Standard-Reveals |
| 6 | Benefits | Bild 100vh sticky als Hintergrund, große Zeile (Big Text) zentriert darüber, Scroll-Button → `#team`; darunter 3-Spalten-Raster: Bild · Karte mit Text, Statistik, Avatar-Reihe · Karte mit Text + 2 Badges und Bild | – | G13, H1-06 |
| 7 | Partner-Laufband | Label-Block links (max. 31.5rem) + Laufband rechts | 6 Logos | G19, H1-07 |
| 8 | Praxis | Header links; 2-Spalter: Bildstapel links (5 Bilder übereinander, 1 sichtbar), rechts 5 Zeilen (Icon + Titel, gestrichelte Linie) + Button | – | G13, H1-08, H1-09 |
| 9 | Stundenplan | Header links; 3 Zeilen mit gestrichelten Linien: links große Uhrzeit (kursiv) + 2 Detail-Punkte · Mitte H3, Text, Button · rechts Bildpaar (schmal + breit, Reihenfolge wechselnd) | 3 Einträge (statisch) | G13, H1-10, H1-11 |
| 10 | Instruktoren (`#team`) | Header zentriert; 4 Spalten, Karten 2 und 4 um 4.25rem nach unten versetzt; 16rem Abstand unten | 4 Karten (CMS) | G13, G22, H1-12 |
| 11 | Footer | 2.2 | | |

### 4.2 `/home-two` – Variante 2

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero | Heller Hintergrund; oben Eyebrow + H1 linksbündig und Zeile mit 2 Kurztexten; darunter Bildband 50.5625rem hoch mit zentrierter Slider-Karte (max. 48rem): 2 Thumbnails, Textbereich (2 Slides), 2 Fortschrittslinien, 2 Nummern | G11, G12, H2-01, H2-02 |
| 2 | Experience | Icon + H2 zentriert; 3 Experience-Karten | G13, G16, H2-03 |
| 3 | Mitgliedschaft | 2-Spalter: links Header + 3 Zeilen (Titel + Preis, Text) + Button (öffnet Modal), rechts Bild | Standard-Reveals, G08, G09 |
| 4 | Stärken | 2-Spalter: Bild links; rechts Absatz, Reihe aus 5 schmalen Bildern, 5 Akkordeon-Einträge (Nummer, Titel, Text) | Standard-Reveals, H2-04 |
| 5 | Video-Zoom | Wrapper mit zusätzlicher Scroll-Höhe; innen 100vh sticky: Hintergrundvideo, davor große Maske (Bild mit Text-Ausschnitt, 82vw) + Absatz + Titel; unten Logo-Laufband (Glas) | G19, H2-05 |
| 6 | Zitat | Hintergrund `#f5ede1`; 2-Spalter: Bild · Label (kursiv, unterstrichen), Zitat in h3-Größe, Quelle | Standard-Reveals |
| 7 | Sessions | Header zentriert; 3 Benefit-Karten (≤ 479: Slider, 2,5 s) | G13, G16, H2-06 |
| 8 | Recovery | 2-Spalter: links Header, Text, Button, 2 Check-Punkte, dunkle Deko-Karte (Badge, 4 kleine überlappende Bilder, 2 Textzeilen); rechts Bild mit Verlauf + Badge | G13, G14 |
| 9 | Blog-Teaser | H2 links; 4 Spalten: 3 vertikale Blog-Karten (Bild/Text-Reihenfolge wechselnd) + CTA-Karte (Bild, Text, Button) | G13, G14, G15, G16 |
| 10 | FAQ | `FaqSection` | G13, G21 |
| 11 | Modal + Footer | 2.4, 2.2 | G09 |

### 4.3 `/home-three` – Variante 3

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero | 100vh, zentriertes Hintergrundvideo (Start 65 % × 65vh, Radius 1rem) mit Overlay; zentriert Eyebrow, H1, Button + Play/Pause mit Label; 3 Linien | G10, G12, H3-01 |
| 2 | Praxis | 2-Spalter: links Header + Text, 3 Zeilen (zwei Werte je Zeile), Kurztext + Button; rechts Bild | Standard-Reveals |
| 3 | Zähler | Header links; `CounterRow` (≤ 479: Slider) | G13, G16, G18 |
| 4 | Sessions | Icon + lange H2 zentriert; 2 Bild-Karten mit Rahmen und Bildunterschrift; Button volle Breite (öffnet Modal) | G13, G17, H3-05, G09 |
| 5 | Services | Header links; 4 Service-Karten (≤ 479: Slider); Zitat-Block | G13, G16, H3-02 |
| 6 | Galerie | 100vh, 3 überlappende Panels (je 60vw, negative Margins −34vw/−35vw): Bild · Video mit Play-Button · Bild; ≤ 991: 31.5rem hoch, nur Mitte | H3-03 |
| 7 | Praxis-Liste | Large Text als Titel; 2 Zeilen: links Bild mit Glas-Overlay (Logo), rechts Nummer + Titel (h3) und Mini-Karte (Bild, Titel, Text, Linie) | G13, H3-04 |
| 8 | Angebot | 2-Spalter: links Header + 3 Zeilen (Icon, Titel, Text); rechts Bild mit Badge | Standard-Reveals |
| 9 | Testimonials | `TestimonialSlider` | G13, G20 |
| 10 | Modal + Footer | | |

### 4.4 `/about`

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero | `HeroImage`: Vollbild dunkel, Eyebrow, H1, Absatz, 3 Linien | G10, G11, G12 |
| 2 | Schritte | Hintergrund `#f5ede1`; 2-Spalter: Bild mit Badge; rechts Header, Text, Button, `FaqInline` (4 Einträge) | Standard-Reveals, A-01 |
| 3 | Sessions | Header links; 3 Session-Karten (≤ 479: Slider) | G13, G14, G15, G16, G23 |
| 4 | Expertise | Header zentriert; 4 Zeilen (Icon, Titel h4, Text) (≤ 479: Slider) | G13 |
| 5 | Feature-Band | zentrierter dunkler Block (Start 50 % Breite, Radius 1rem) mit Bild, Overlay, Icon + H2, unten Logo-Laufband (Glas) | G13, G19, A-02 |
| 6 | Kurszeiten | 2-Spalter: links Header + Tabelle (Kopfzeile, 3 Gruppen mit je 2–3 Zeitzeilen) + Button (Modal); rechts Bild mit Zähler-Karte | Standard-Reveals, G18, G09 |
| 7 | Instruktoren | Header zentriert; Raster 4 Spalten, 4 Karten (CMS) mit Füll-Linie unter jeder Karte | G13, G16, G22 |
| 8 | FAQ | `FaqSection` | G13, G21 |
| 9 | Modal + Footer | | |

### 4.5 `/our-classes`

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero | `HeroImage` zentriert (Eyebrow, H1), Logo-Laufband (Glas) am unteren Rand | G10, G11, G12, G19 |
| 2 | Kursliste | Header 2-spaltig (links Eyebrow + H2, rechts Absatz); Tab-Leiste mit 4 Reitern (Trennzeichen zwischen den Reitern, aktiver Reiter Akzentfarbe); je Panel Raster 3 Spalten (≤ 991: 2, ≤ 479: 1) | G13, G14, G15, G16 (nur erstes Panel), C-01 |
| 3 | Footer | | |

Filter: Tabs „Alle“ + 3 Stufen; Panels sind statisch befüllt (9 / 3 / 4 / 3 Karten), kein CMS-Filter, kein Übergang (`data-duration-in/out = 0`). Karten haben keine Detailseite; der Hover-Button führt zu `/contact`.

### 4.6 `/instructors` und `/instructor/{slug}`

**Liste**

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero + Raster | Eyebrow + H1 zentriert; Raster 4 Spalten (≤ 991: 2), 8 Karten | G12 (ganzes Raster als ein Block), G22 |
| 2 | Zähler | Header links, `CounterRow` | G13, G16, G18 |

Keine Filter, keine Sortier-UI, keine Pagination. Hover: G22 (kein Bildwechsel, Zoom desselben Bildes).

**Detail**

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero | Name als Big Text (H1); darunter 2-Spalter: Porträt · Zitat-Karte (Icon oben, Zitat in h3-Größe, Rollenzeile, Icon unten) | G11, G12, G14 |
| 2 | Info | 2-Spalter: links H2 + Kurzbio, 3 Meta-Zeilen, Rich-Text „Philosophie“, Rich-Text „Benefits“ mit Liste; rechts 5 Meta-Zeilen (eine mit E-Mail-Link), Telefon-Block, Absatz + Button zurück zur Liste | G12 |

### 4.7 `/plans`

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero + Preis-Karten | Eyebrow + H1 zentriert; Tab-Leiste mit 3 Reitern (Pillen mit Akzent-Rahmen, aktiv gefüllt); je Panel 3 Preis-Karten, mittlere mit Tag | G06 |
| 2 | Vergleichstabelle | Header links; Tab-Leiste (3 Laufzeiten); Raster 4 Spalten (`1.5fr 1fr 1fr 1fr`): Kopfzeile + 8 Feature-Zeilen mit Häkchen/Kreuz-Icons | G13 |

Statisch, kein CMS. Keine Scroll-Reveals im Hero (Texte ohne Blur-Attribut).

### 4.8 `/event` und `/events/{slug}`

**Liste**

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero | `HeroImage` zentriert | G10, G11, G12 |
| 2 | Event-Zeilen | 4 Zeilen untereinander, ganze Zeile ist Link; Bild (max. 48rem) und Textspalte, Seite alternierend; Text: Laufnummer, H2, Absatz, 5 Meta-Zeilen | erste Zeile G12, weitere G13; G14, G15, G23 |

Keine Filter, keine Pagination. Reihenfolge fest (jede Zeile ist eine eigene CMS-Liste mit 1 Eintrag).

**Detail**

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero | Laufnummer, H1, Absatz zentriert; großes Bild | G11, G12, G14 |
| 2 | Details | 2-Spalter: links 5 Meta-Zeilen; rechts Rich-Text + zweiter Block mit Titel und Rich-Text | G13 |
| 3 | Weitere Events | H2; 2 Event-Karten | G13, G14, G15, G16 |
| 4 | Formular | Titel + `ContactForm` | G12, G08 |
| 5 | Testimonials | `TestimonialSlider` | G20 |

### 4.9 `/blog` und `/blog-post/{slug}`

**Liste**

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero + Raster | Eyebrow + H1 links; Raster 2 Spalten (≤ 991: 1), 6 horizontale Blog-Karten | G11 (auf Kartenbildern), G12, G14, B-01 |

Keine Kategorie-Filter, keine Suche, keine Pagination (kein `w-pagination` im HTML).

**Detail**

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Kopf | Meta-Zeile (Kategorie, Trenner, Datum), H1 | G12 |
| 2 | Inhalt | 2-Spalter: linke Spalte `position: sticky; top: 6.25rem`, max. 23.25rem: Autor (Label, Name, Kurztext, Bild), Block „nächster Beitrag“ (Titel-Link) + Button zur Liste; rechte Spalte: Titelbild, Rich-Text 1, 2 Bilder nebeneinander, Rich-Text 2 | G11, G12, G13, G14, G15 |

### 4.10 `/contact`

| # | Sektion | Layout | Animationen |
|---|---|---|---|
| 1 | Hero | Large Text als H1; Zeile: links Titel + Adresse, Telefon + E-Mail; rechts Social-Links + Absatz; Deko-Grafik oben rechts als Hintergrund | G12 |
| 2 | Bild | Bild volle Containerbreite | G11 |
| 3 | Formular | `ContactForm`: Name, Telefon, E-Mail, Auswahl (4 Optionen), Nachricht, Checkbox, Submit; Felder nur mit gestrichelter Unterlinie, 4rem hoch | G12, G08 |
| 4 | FAQ | Hintergrund `#f5ede1`, `FaqSection` | G13, G21 |

### 4.11 Utility-Seiten

| Seite | Aufbau | Animationen |
|---|---|---|
| `/404` | Vollbild-Hintergrundvideo, zentriert: Grafik, H1, Absatz, Button zur Startseite, Play/Pause; mit Navbar, ohne Footer | G06 |
| `/401` | Vollbild-Bild mit Overlay, zentriert: Icon, H1, Passwortfeld, Submit, Fehlermeldung; ohne Navbar/Footer (nur als Seitentyp erfasst) | G08 |
| `/licenses` | `HeroUtility`; 3 Blöcke je 2-spaltig (H2 links, rechts Text + Linkliste: Schriften, Bilder, Icons) | G11 |
| `/changelog` | `HeroUtility`; zentrierter Block: Grafik, H2, Datum/Version, Button | G11 |
| `/style-guide` | `HeroUtility`; Übersicht der Design-Tokens (nicht im Detail erfasst) | – |

---

## 5. Animations-Katalog

Spalten: Dauer in Sekunden. „scrub“ = an Scroll-Position gekoppelt. Schwierigkeit: 1 leicht · 2 mittel · 3 aufwendig.
IX3-Ease-Index wurde über die Ease-Tabelle im Runtime-Chunk aufgelöst (0 = none, 6 = power2.inOut, 8 = power3.out). Wo IX3 keine Dauer oder kein Easing angibt, steht „Standard“ (siehe 7).

### 5.1 Global

| ID | Seite | Sektion | Auslöser | Eigenschaften | Dauer | Easing | scrub | Schw. | Quelle |
|---|---|---|---|---|---|---|---|---|---|
| G01 | alle | Seite | Wheel/Touch | Lenis Smooth Scroll, lerp 0.1 | – | – | – | 1 | JS-inline |
| G02 | alle (nur ≥ 992 px) | Navbar | Scroll, `body` top top → top −0,5 % | Abstand oben 1.5rem → 0 (Anteil 0–0.3); Innen-Padding 1.75rem/0.5rem → 0, Radius 0.5rem → 0, Hintergrundfläche Breite 50 % → 100 % (Anteil 0.3–0.9) | – | none | ja (1) | 2 | IX3 |
| G03 | alle | Nav-Eintrag/Dropdown | Hover (rein/raus = vor/zurück) | Dropdown-Höhe 0 → auto; Pfeil-Icon 0° → 180°; Linie unter Eintrag Breite 0 → 100 % (≤ 991 px ausgeblendet) | Standard | Standard | nein | 2 | IX3 |
| G04 | alle | Mega-Menü-Zeile | Hover | Akzent-Linie Breite 0 → 100 %; Pfeil 0° → 45°, Farbe Grau 30 % → `#99582a` | Standard | Standard | nein | 1 | IX3 |
| G05 | alle (≤ 991 px) | Burger | Klick (Klassenwechsel am Nav-Button) | Linie 1: y +½ Abstand, 45°; Linie 2: y −½ Abstand, −45°; Linie 3: scaleX 0, opacity 0 | 0.45 (Linie 3: 0.3) | power3.inOut | nein | 2 | JS-inline |
| G06 | alle | Button primär | Hover | Overlay Breite 0 → 100 % (power3.out); Icon links scale 0 → 1, x 0 → 0.5rem; Icon rechts scale 1 → 0; Text x −0.5rem → +0.5rem | 0.4 | power3.out (Overlay), sonst Standard | nein | 1 | IX3 |
| G07 | alle | Button hell (Footer) | Hover | wie G06, Overlay 0 → 110 %, Text- und Icon-Farbe `#99582a` → weiß | 0.4 | power3.out / Standard | nein | 1 | IX3 |
| G08 | Seiten mit Formular/Modal-Öffner | Submit-Button | Hover | wie G06 (Auslöser ist der umschließende Wrapper) | 0.4 | power3.out / Standard | nein | 1 | IX3 |
| G09 | `/home-two`, `/home-three`, `/about` | Modal | Klick Öffner / Klick Schließen (rückwärts) | Hintergrund opacity 0 → 1; Karte opacity 0 → 1, y 3rem → 0; `display` per Klassenwechsel | 0.3 | Standard | nein | 2 | IX3 |
| G10 | Seiten mit Hero-Linien | Hero | Load | Linien-Höhe 0 % → 100 %, stagger 0.15 | 2 | power2.out | nein | 1 | JS-inline |
| G11 | alle mit Hero-/Titelbild | Hero | Load | Bild scale 1.2 → 1 | 1.4 | power2.out | nein | 1 | JS-inline |
| G12 | alle | Hero-Inhalte | Load | opacity 0 → 1, y 80 → 0, blur 20px → 0, stagger 0.2 | 0.8 | power2.out | nein | 1 | JS-inline |
| G13 | alle | Texte/Blöcke im Inhalt | Scroll, Element top 90 % → top 95 % (≥ 992 px); top 90 % (≤ 991 px) | opacity 0 → 1, y 80 → 0, blur 20px → 0 | Desktop: scrub; Mobil: 0.8 | Desktop none; Mobil power3.out | Desktop ja (1), Mobil nein | 2 | JS-inline |
| G14 | alle | Bild-Container | Scroll, top 90 %, einmalig | opacity 0 → 1, y 50 → 0, delay 0.4 | 0.6 | power3.out | nein | 1 | JS-inline |
| G15 | alle | Bild im Container | Scroll, top 90 %, einmalig abspielen | scale 1.25 → 1 | 1.2 | none | nein | 1 | IX3 |
| G16 | mehrere | Karten-Gruppen | Scroll, Gruppe top 90 % → top 60 % | ≥ 992 px: y 200 → 0, stagger 0.35; ≤ 991 px: opacity 0 → 1, y 80 → 0, blur 20px → 0, stagger 0.35 | – | none | ja (1) | 2 | JS-inline |
| G17 | `/`, `/home-three` | Bild-Karten | Sichtbarkeit (IntersectionObserver, Schwelle 0), einmalig | rotationX −90° → 0, Ursprung Mitte, delay Index × 0.2; Eltern `perspective: 3000px` | 1.1 | power2.out | nein | 2 | JS-inline, CSS |
| G18 | `/home-three`, `/instructors`, `/about` | Zähler | Scroll, top 85 %, einmalig | Zahl 0 → Zielwert (ganzzahlig, Suffix bleibt) | 2 | power1.out | nein | 1 | JS-inline |
| G19 | `/`, `/home-two`, `/about`, `/our-classes` | Logo-Laufband | Load, Endlosschleife | Inhalt 3× dupliziert, x um eine Satzbreite, modulo; Richtung per Attribut; optional Pause bei Hover (Attribut in der Vorlage nicht gesetzt) | 30 je Durchlauf | none | nein | 2 | JS-inline |
| G20 | `/home-three`, `/events/*` | Testimonials | Klick Pfeile | aktueller Slide xPercent 0 → ∓100 + ausblenden; neuer ±100 → 0 + einblenden; Zähler aktualisieren; Endlos; Sperre während Animation | 0.7 | power3.inOut | nein | 2 | JS-inline |
| G21 | `/home-two`, `/about`, `/contact` | FAQ | Klick (Toggle vor/zurück, mehrere gleichzeitig offen möglich) | Antwort Höhe 0 → auto; Icon 0° → 45° | Standard | Standard | nein | 1 | IX3 |
| G22 | `/`, `/about`, `/instructors` | Instruktoren-Karte | Hover | Bild scale 1 → 1.1, −2°; Overlay opacity 0 → 1; Eckrahmen scale 0.5 → 1, opacity 0 → 1 (alle power2.inOut); Name `#17181a` → Akzent; Rolle Grau → Akzent; Füll-Linie Breite 0 → 100 % (nur `/about`) | Standard | power2.inOut / Standard | nein | 2 | IX3 |
| G23 | `/` (nur Slider-Karten), `/about`, `/event` | Bild in Karte | Hover | scale 1 → 1.12, −2° | Standard | power3.out | nein | 1 | IX3 |

### 5.2 `/` – Startseite Variante 1

| ID | Sektion | Auslöser | Eigenschaften | Dauer | Easing | scrub | Schw. | Quelle |
|---|---|---|---|---|---|---|---|---|
| H1-01 | Hero-Karte | Load | y 200 → 0, scale 1.1 → 1 | 1 | power3.out | nein | 1 | JS-inline |
| H1-02 | Hero-Bild | Scroll, `body` top 85 % → bottom bottom (ganze Seite) | y −10 % → +10 % (Parallax; Bild ist 120 % hoch) | – | none | ja (1) | 1 | IX3 |
| H1-03 | Programm-Karten | Hover; beim Verlassen des Rasters zurück auf Karte 2 | aktive Karte: Rahmenfarbe → transparent (0.35, power2.out), Akzent-Linie scaleX 0 → 1 von links (0.5, power3.out), Icon → Akzent (0.3); vorherige: scaleX → 0 (0.4, power3.inOut) | 0.3–0.5 | power2.out / power3.out / power3.inOut | nein | 2 | JS-inline |
| H1-04 | Video-Band (nur ≥ 992 px) | Scroll, Sektion top 60 % → bottom bottom | Blockbreite → 97.5rem; Radius 1rem → 31.25rem; Video y +6 % → −5 % | – | none | ja (0.8) | 2 | IX3 |
| H1-05 | Angebots-Karten | Hover; beim Verlassen zurück auf Karte 2 | Textfläche yPercent 100 → 0 (vorherige 0 → 100); Bild scale 1 → 1.15 (vorheriges zurück) | 0.65 | power3.out | nein | 2 | JS-inline |
| H1-06 | Benefits-Raster | Scroll, Raster top 90 % → top 40 % | 4 Elemente y 200 → 0, stagger 0.6 | – | none | ja (1) | 2 | JS-inline |
| H1-07 | Laufband-Label | Scroll, Label top 85 %, abspielen | Akzent-Fläche Breite 0 → 100 %; Icon und Text dunkel → weiß | 0.7 | Standard | nein | 1 | IX3 |
| H1-08 | Praxis-Bildspalte | Scroll, Eintritt in den Viewport, abspielen | opacity 0 → 1, y 200px → 0, scale 0.4 → 1, rotationY 100° → 0 | 0.8 | Standard | nein | 2 | IX3 |
| H1-09 | Praxis-Zeilen | Hover (bleibt auf letzter Zeile; Start: Zeile 3) | Text → Akzent, x 0 → 15px (nur ≥ 992 px) (0.3, power2.out); Linie scaleX 0 → 1 von links (0.4, power2.inOut); neues Bild yPercent ∓100 → 0 über dem alten, Richtung nach Index (0.65, power3.out) | 0.25–0.65 | power2.out / power2.inOut / power3.out | nein | 3 | JS-inline |
| H1-10 | Stundenplan-Zeile | Scroll, Zeile top 90 %, einmalig | Zeile scale 0.6 → 1, opacity 0 → 1 (0.6, power2.out); danach überlappend (−0.4) Bilder `clip-path: inset(0 100% 0 0)` → `inset(0 0% 0 0)` (1, power2.out, stagger 0.05) | 0.6 + 1 | power2.out | nein | 2 | JS-inline |
| H1-11 | Stundenplan-Zeile | Hover | Uhrzeit-Farbe `#17181a` → Akzent | Standard | Standard | nein | 1 | IX3 |
| H1-12 | Instruktoren-Karten (nur ≥ 992 px) | Scroll, Karte top 90 % → top 40 % | Karten 1/3: y 0 → 6.25rem; Karten 2/4: y 4.25rem → 0 (gegenläufig) | – | none | ja (1) | 2 | JS-inline |

### 5.3 `/home-two`

| ID | Sektion | Auslöser | Eigenschaften | Dauer | Easing | scrub | Schw. | Quelle |
|---|---|---|---|---|---|---|---|---|
| H2-01 | Hero-Slider | Load, Endlosschleife | Phase 1 (1.8 s): aktives Thumbnail scale 1 → 1.2, nächstes 1.2 → 1 (sine.inOut), `mix-blend-mode` wechselt, Fortschrittslinie Breite 0 → 100 % (none). Phase 2: Overlays tauschen opacity (0.4, power2.inOut); Text raus: opacity → 0, blur 5px, y 12 (0.35, power2.inOut); danach Text rein (0.6, power2.out); Nummernfarbe Akzent/Dunkel (0.4) | 1.8 + ca. 0.95 je Slide | sine.inOut / none / power2 | nein | 3 | JS-inline |
| H2-02 | Hero-Bild | Scroll, Hero top 0 % → bottom bottom | y −5 % → +5 % | – | none | ja (1) | 1 | IX3 |
| H2-03 | Experience-Karten | Hover; beim Verlassen zurück auf Karte 2 | Füll-Linie Breite 0 → 100 %; Pfeil 0° → 45°, opacity 0.3 → 1; Textfarbe | 0.45 | power3.out | nein | 1 | JS-inline |
| H2-04 | Stärken-Akkordeon | Klick (immer genau einer offen; Start: Eintrag 3) | Nummer + Titel → Akzent (0.6); Text Höhe 0 → auto (0.5, power3.out); zugehöriges Bild scale 1.15 → 0.85 (0.85, power3.out); Bild-Overlay opacity 0.6 → 0 (0.8) | 0.5–0.85 | power3.out | nein | 2 | JS-inline |
| H2-05 | Video-Zoom (nur ≥ 992 px) | Scroll, Wrapper top top → bottom bottom, Sektion sticky 100vh | Maske Breite 82vw → 1000vw (Anteil 0–0.42), Maske opacity 1 → 0 (0.37–0.43), Zusatztext opacity 1 → 0 (0–0.15), Play-Button opacity 0 → 1 + scale 0.5 → 1 (0.32–0.53), Logo-Laufband y 100 % → 0 (0.42–0.47) | – | none | ja (1) | 3 | IX3, CSS |
| H2-06 | Benefit-Karten | Hover; beim Verlassen zurück auf Karte 2 | Overlay yPercent 100 → 0 (0.5); Text opacity 0 → 1, y 10 → 0 (delay 0.2); Zierlinien fahren ein (xPercent 500 → 0, yPercent −1500 → 0, delay 0.2); zusätzlich Bild scale 1 → 1.2 (0.6, power2.out) | 0.5–0.6 | power3.out / power2.out | nein | 2 | JS-inline |

### 5.4 `/home-three`

| ID | Sektion | Auslöser | Eigenschaften | Dauer | Easing | scrub | Schw. | Quelle |
|---|---|---|---|---|---|---|---|---|
| H3-01 | Hero-Video | Load | Breite 65 % → 100 %, Höhe 65vh → 100vh, Radius 1rem → 0 | 1.4 | power3.inOut | nein | 1 | JS-inline |
| H3-02 | Service-Karten | Hover (bleibt auf letzter Karte; Start: Karte 3) | Bild-Ebene yPercent −103 → 0 (0.4, power2.out); Bild scale 1.08 → 1 (0.5); Bild-Beschriftung opacity 0 → 1, yPercent 100 → 0 (0.4); Kartenfläche `#F5EDE1` → transparent; Zierlinien fahren aus (xPercent 0 → 500, yPercent 0 → 200); Icon/Titel/Text → weiß (0.25); vorherige Karte jeweils zurück | 0.25–0.5 | power2.out (Ausblenden Beschriftung: power2.in, 0.3) | nein | 3 | JS-inline |
| H3-03 | Galerie (nur ≥ 992 px) | Scroll, Sektion top 65 % → bottom bottom | Bild 1 x 0 → 10vw; Video x 0 → 20vw; Bild 3 x 0 → 27vw (Panels fächern auf) | – | none | ja (1) | 2 | IX3 |
| H3-04 | Praxis-Liste | Scroll, Sektion top 55 % → bottom bottom | je Zeile: Glas-Overlay Breite 100 % → 0, Bild scale 1.2 → 1, Linie Breite 0 → 100 %; Zeile 1 bei Position 0.52, Zeile 2 bei 1.33 (je Länge 0.38) | – | none | ja (1) | 2 | IX3 |
| H3-05 | Session-Bild | Hover | Rahmen opacity 0 → 1, scale 0 → 1; Bild scale 1 → 1.12 | Standard | Standard | nein | 1 | IX3 |

### 5.5 Innenseiten

| ID | Seite | Sektion | Auslöser | Eigenschaften | Dauer | Easing | scrub | Schw. | Quelle |
|---|---|---|---|---|---|---|---|---|---|
| A-01 | `/about` | `FaqInline` | Klick (immer genau einer offen; Start: Eintrag 3) | Antwort Höhe 0 → Inhaltshöhe; Icon 0° → 45°; Rahmenfarbe Schwarz 50 % → `#99582A` | 0.5 | power3.out | nein | 2 | JS-inline |
| A-02 | `/about` (nur ≥ 992 px) | Feature-Band | Scroll, Sektion top 65 % → bottom 100 % | Block Breite 50 % → 100 %, Höhe 50rem → 61.25rem, Radius 1rem → 0; Logo-Laufband y 100 % → 0 (Anteil 0.56–1.0) | – | none | ja (1) | 2 | IX3 |
| B-01 | `/blog` | Blog-Karte | Hover | Bild scale 1 → 1.15; Pfeil-Fläche `#2a2b2f` → `#99582a` | Standard | Standard | nein | 1 | IX3 |
| C-01 | `/our-classes` | Kurs-Karte | Hover | Overlay (dunkel 60 %, mit Button) opacity 0 → 1, scale 0.5 → 1 | Standard | Standard | nein | 1 | IX3 |

**Summe: 50 Animationen** (23 global, 12 Startseite 1, 6 Variante 2, 5 Variante 3, 4 Innenseiten).

### 5.6 Webflow-Standardkomponenten (keine eigenen Animationen)

| Komponente | Verhalten | Quelle |
|---|---|---|
| Nav-Collapse | Aufklappen 400 ms, `ease`, ab ≤ 991 px | HTML (`data-collapse`, `data-duration`) |
| Dropdown | Hover-gesteuert, Schließ-Verzögerung 500 ms | HTML |
| Mobil-Slider | nur ≤ 479 px sichtbar; Slide-Übergang 500 ms `ease`, Autoplay 2000/2500/4000 ms je nach Sektion, endlos, Pfeile + Punkte, Swipe | HTML, CSS |
| Tabs | Panelwechsel ohne Übergang (0 ms) | HTML |
| Background-Video | autoplay, loop, muted, playsinline, Poster; Play/Pause-Button | HTML |

---

## 6. CMS-Datenmodell

Nur Feldtypen, abgeleitet aus der Template-Struktur (HTML). Bezeichner sind Vorschläge für die JSON-Ablage.

### 6.1 Instructor (CMS, 8 Einträge)

| Feld | Typ | Verwendung |
|---|---|---|
| `slug` | Text (URL) | Route |
| `name` | Text | Karte, Detail-H1 |
| `role` | Text (kurz) | Karte, Detail |
| `photo` | Bild (Hochformat ca. 309:402) | Karte, Detail-Hero |
| `quote` | Text (lang) | Detail-Zitatkarte |
| `bioTitle` | Text | Detail-H2 |
| `shortBio` | Text (lang) | Detail |
| `specialty` | Text | Meta-Zeile |
| `certifications` | Text | Meta-Zeile |
| `workingDays` | Text | Meta-Zeile |
| `designation` | Text | Meta-Zeile |
| `bioSummary` | Text (mittel) | Meta-Zeile |
| `experience` | Text | Meta-Zeile |
| `teachingStyle` | Text | Meta-Zeile |
| `email` | E-Mail | Meta-Zeile (Link) |
| `phone` | Telefon | Kontakt-Block |
| `philosophy` | Rich Text | Detail |
| `benefits` | Rich Text (mit Liste) | Detail |
| `closingText` | Text (lang) | Detail, über dem Button |
| `featured` / `order` | Boolean / Zahl | Auswahl der 4 Karten auf `/` und `/about` (geschätzt; Auswahlkriterium nicht ermittelbar) |

### 6.2 Event (CMS, 4 Einträge)

| Feld | Typ | Verwendung |
|---|---|---|
| `slug` | Text (URL) | Route |
| `label` | Text (Laufnummer/Kennung) | Liste, Detail |
| `title` | Text | Liste, Detail-H1, Karte |
| `summary` | Text (lang) | Liste, Detail, Karte |
| `image` | Bild (Querformat) | Liste, Detail, Karte |
| `date` | Datum | Meta-Zeile |
| `time` | Text (Zeitspanne) | Meta-Zeile |
| `location` | Text | Meta-Zeile |
| `duration` | Text | Meta-Zeile |
| `price` | Text/Zahl mit Währung | Meta-Zeile |
| `body` | Rich Text | Detail |
| `benefitsTitle` | Text | Detail, zweiter Block |
| `benefits` | Rich Text | Detail, zweiter Block |

### 6.3 Blog-Post (CMS, 6 Einträge)

| Feld | Typ | Verwendung |
|---|---|---|
| `slug` | Text (URL) | Route |
| `title` | Text | Karte, Detail-H1 |
| `category` | Text (ob Referenz auf eigene Collection: nicht ermittelbar; keine Kategorie-Seiten verlinkt) | Meta-Zeile |
| `date` | Datum | Meta-Zeile |
| `excerpt` | Text (kurz) | Karte |
| `coverImage` | Bild | Karte, Detail |
| `authorName` | Text | Detail |
| `authorBio` | Text (kurz) | Detail |
| `authorImage` | Bild | Detail |
| `body1` | Rich Text | Detail |
| `galleryImages` | 2 Bilder | Detail, zwischen den Textblöcken |
| `body2` | Rich Text | Detail |

### 6.4 Statische Bereiche (in der Vorlage kein CMS, für die Demo trotzdem als Daten sinnvoll)

| Typ | Felder | Quelle |
|---|---|---|
| Kurs (`/our-classes`, 9 Karten) | `title` Text · `time` Text · `description` Text · `image` Bild · `level` Auswahl (3 Stufen, steuert Tab) · `tags` 2 Texte | HTML |
| Plan (`/plans`, 3 Pläne × 3 Reiter) | `name` Text · `description` Text · `icon` Bild/SVG · `featuresTitle` Text · `features` Liste (5 Texte) · `price` Text · `priceUnit` Text · `highlightTag` Text (optional) | HTML |
| Preistabelle (`/plans`) | `duration` Auswahl (3) · `rows`: `feature` Text + 3 Booleans | HTML |
| Stundenplan-Eintrag (`/`) | `time` Text · `details` 2 Texte (u. a. Lehrperson) · `title` Text · `description` Text · `images` 2 Bilder | HTML |
| Kurszeiten-Tabelle (`/about`) | Gruppe Text · Zeilen: Zeit Text + Kurs Text | HTML |
| Testimonial | `name` Text · `location` Text · `avatar` Bild · `quote` Text | HTML |
| FAQ | `question` Text · `answer` Text | HTML |
| Partner-Logo | `image` Bild | HTML |

---

## 7. Unklar / nicht ermittelbar

| Punkt | Stand |
|---|---|
| Videoabgleich | `referenz/screenrecording.mov` fehlt; alle Angaben stammen aus Code, nichts wurde visuell geprüft |
| IX3-Standardwerte | Wo IX3 keine Dauer/kein Easing nennt („Standard“), ist der Runtime-Standard gemeint. Wert im minifizierten Code nicht eindeutig lesbar; GSAP-üblich wären 0.5 s / power1.out (geschätzt) |
| G02 Navbar | Reihenfolge und Endwerte sind belegt; der optische Eindruck (insb. Zusammenspiel Padding/Overlay) ist ohne Video nicht bestätigt |
| H1-04 Video-Band | Endradius 31.25rem und Zielbreite 97.5rem sind belegt; ob der Block optisch zur Pille wird oder nur stark abgerundet, ist ohne Video nicht bestätigt |
| H3-04 Zeitpositionen | Position 1.33 liegt außerhalb einer auf 1 normierten Zeitleiste; tatsächliche Scroll-Anteile der beiden Zeilen nicht sicher |
| H2-05 Scroll-Länge | Höhe des Zusatz-Wrappers (bestimmt die Scroll-Strecke) nicht ausgelesen |
| Registrierte Interaktionen ohne Ziel im Markup | Parallax des Benefits-Bildes und zweite Karten-Animation (Auslöser-Attribut fehlt im HTML); Hover auf „page-link“, „megamenu-inne-box“, „button-white“; pulsierende Menü-Schleife (Skalierung/Deckkraft, endlos); Scroll-Verschiebung „scroll-target“; Footer-Scroll-Auslöser und Formular-Klick mit leerer Zeitleiste. Im Katalog nicht gezählt, da ohne sichtbare Wirkung |
| Doppelte Skripte | H3-02 ist zweimal fast identisch eingebunden (zwei Listener pro Karte); H2-06 enthält Debug-Ausgaben. Für den Nachbau nur einmal umsetzen |
| G13 Scroll-Bereich | Start „top 90 %“, Ende „top 95 %“ – das Ende liegt vor dem Start; faktisch springt die Animation mit scrub-Glättung von 1 s durch. Als „Einblenden bei 90 %“ nachbauen |
| Sortierung/Limit der CMS-Listen | Reihenfolge und Auswahl (z. B. 4 von 8 Instructors) sind im Designer festgelegt und im HTML nicht sichtbar |
| Blog-Kategorie | Text oder Referenz – nicht ermittelbar |
| „Interdisplay“ | Herkunft/Lizenz der Schriftdatei nicht geprüft; Lizenzseite nennt drei Schriftquellen |
| Formular-Versand | Ziel/Verarbeitung serverseitig bei Webflow, nicht einsehbar |
| `/style-guide` | nur als Seitentyp erfasst, Inhalt nicht im Detail inventarisiert |
| `/401` | nur die öffentliche Hülle betrachtet |
| Hover-Bildwechsel in Listen | keiner gefunden; alle Listen-Hover skalieren dasselbe Bild. Der einzige echte Bildwechsel ist H1-09 (Startseite, kein CMS) |

---

## 8. Technik-Empfehlung

1. **Routing:** `createBrowserRouter` mit einem `RootLayout` (Navbar, `<Outlet>`, Footer, Lenis-Provider). Routen: `/`, `/about`, `/classes`, `/instructors`, `/instructors/:slug`, `/contact` (P1); `/plans`, `/events`, `/events/:slug`, `/blog`, `/blog/:slug` (P2); `*` → 404. URL-Schema vereinheitlichen statt der Singular/Plural-Mischung der Vorlage.
2. **Layouts:** `RootLayout`, `BareLayout` (404 ohne Footer). Hero als drei Komponenten (`HeroImage`, `HeroText`, `HeroHome`).
3. **Daten:** `src/data/*.json` je Typ aus Abschnitt 6 (instructors, events, posts, classes, plans, faq, testimonials, schedule). Rich Text als Markdown-String oder Block-Array. Bilder unter `src/assets`, Pfade im JSON.
4. **Tokens:** CSS-Variablen aus 1.3–1.5 in einer `tokens.css`; Farbwerte gegen das Kunden-Branding tauschen, Skala und Abstände beibehalten.
5. **GSAP-Basis:** `useGSAP` + `gsap.context` pro Komponente, `gsap.matchMedia` mit der Grenze 992 px wie in der Vorlage. Lenis einmal im Root, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add`, `lagSmoothing(0)`.
6. **Reveal-Hooks:** `useBlurReveal` (G12/G13), `useImageReveal` (G14/G15), `useCardGroup` (G16), `useCounter` (G18) als wiederverwendbare Hooks oder Wrapper-Komponenten statt Attribut-Selektoren.
7. **Hover-Gruppen** (H1-03, H1-05, H1-09, H2-03, H2-06, H3-02): ein generischer Hook `useActiveItem(defaultIndex, resetOnLeave)`, der den aktiven Index hält und pro Karte eine Timeline vor/zurück spielt.
8. **Scrub-Sektionen** (G02, H1-04, H2-05, H3-03, H3-04, A-02): je eine ScrollTrigger-Timeline mit `scrub: 1`; sticky-Verhalten per CSS (`position: sticky`) wie in der Vorlage, kein `pin` nötig.
9. **Buttons/FAQ/Slider:** Button-Hover als pausierte Timeline (`play`/`reverse`); FAQ mit Höhe `0 → auto`; Testimonial-Slider nach G20; Mobil-Slider erst bei Bedarf (z. B. Embla) – für die Demo reicht ein einspaltiges Raster.
10. **Seitenübergänge:** Die Vorlage hat keine. Empfehlung: beim Routenwechsel `window.scrollTo(0, 0)` über Lenis (`immediate: true`), `ScrollTrigger.refresh()` nach Mount, Hero-Ladeanimation (G10–G12) als Einstieg. Optional ein kurzer Fade über `useLocation` – als bewusste Ergänzung, nicht als Nachbau.
11. **Aufräumen:** Alle Trigger im `gsap.context` zurückbauen (`revert`), sonst bleiben ScrollTrigger nach Routenwechsel aktiv.
12. **Barrierefreiheit:** `prefers-reduced-motion` in `matchMedia` aufnehmen (Reveals sofort sichtbar, Laufband/Slider aus) – fehlt in der Vorlage.
13. **Reihenfolge:** Tokens + Layout → Startseite 1 → About → Classes → Instructors (Liste/Detail) → Contact → P2-Seiten.

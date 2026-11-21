// Bildquellen (Magnific-Lizenzbilder, als WebP in public/images). Alt-Texte beschreiben das Motiv
// und liegen je Sprache vor: `alt: { de, en }` (siehe components/Media.jsx und i18n/).
//
// KI-KENNZEICHNUNG (Transparenzpflicht für KI-Inhalte, Art. 50 KI-Verordnung (EU) 2024/1689):
// - Das verbleibende Objektbild (`p(...)`, Steinschrein) ist KI-generiert: `ai: true` setzt im HTML
//   `data-ai-generated="true"` und ergänzt den Alt-Text um den Hinweis „KI-generiertes Bild“
//   bzw. „AI-generated image“ (siehe components/Media.jsx, Texte in data/<sprache>/ui.json).
// - Die Yoga-Bilder mit Menschen (`real(...)`) sind echte Fotos von echten Menschen
//   (Magnific-Stockfotos, in der Bibliothek als „nicht KI-generiert“ geführt) und werden nicht gekennzeichnet.
const AI_GENERATED = true
const p = (name, de, en) => ({ src: `/images/${name}.webp`, alt: { de, en }, ai: AI_GENERATED })
const real = (name, de, en) => ({ src: `/images/${name}.webp`, alt: { de, en }, ai: false })

export const IMG = {
  hero: real('yoga-retreat-tempel-rote-torbogen-pagode',
    'Roter Tempelgang mit verzierten Bögen und Blick auf eine Pagode',
    'Red temple corridor with ornate arches and a view of a pagoda'),
  tempelInnen: real('yoga-frau-lotussitz-gebetshaltung-kueste',
    'Lächelnde Frau im Lotussitz mit Händen in Gebetshaltung vor dem Meer',
    'Smiling woman in lotus position with hands in prayer pose in front of the sea'),
  palasttuer: real('historische-steinarkaden-palmen-retreat',
    'Historische Steinarkaden mit Blick auf Palmen',
    'Historic stone arcades with a view of palm trees'),
  schrein: p('tempelschrein-opfergaben',
    'Steinschrein mit Rauch, Glocke und Kerzen',
    'Stone shrine with smoke, a bell and candles'),
  oellampen: real('meditation-frau-felshoehle-yogamatte',
    'Frau meditiert im Schneidersitz auf einer Yogamatte vor einer Felswand',
    'Woman meditating cross-legged on a yoga mat in front of a rock wall'),
  gong: real('yoga-gruppe-vorwaertsbeuge-outdoor-matten',
    'Yoga-Gruppe in der Vorwärtsbeuge auf Matten im Freien',
    'Yoga group in a forward fold on mats outdoors'),
  morgenlicht: real('yoga-weite-vorbeuge-mann-wiese',
    'Mann in einer weiten Vorbeuge auf einer Yogamatte im Park',
    'Man in a wide-legged forward fold on a yoga mat in a park'),
  retreatGruppe: real('yoga-paar-kindhaltung-park',
    'Zwei Menschen üben gemeinsam die Kindhaltung auf einer Wiese',
    'Two people practice child\'s pose together on a lawn'),
  namaste: real('yoga-gruppe-krieger-pose-holzstudio',
    'Yoga-Gruppe in der Krieger-Pose in einem Studio mit Holzboden',
    'Yoga group in warrior pose in a studio with a wooden floor'),
  kurs: real('meditation-gruppe-yogastudio-holzboden',
    'Yoga-Kurs sitzt meditierend auf Matten in einem Studio mit Holzboden',
    'Yoga class sitting in meditation on mats in a studio with a wooden floor'),
  atem: real('yoga-spagat-frau-terrasse-reisfelder',
    'Frau im Spagat mit Händen vor der Brust auf einer Terrasse vor Reisfeldern',
    'Woman in a split with hands at her chest on a terrace in front of rice fields'),
  berge: real('yoga-gruppe-bergpose-felsen-meer',
    'Vier Frauen stehen in der Bergpose mit erhobenen Armen auf Felsen am Meer',
    'Four women stand in mountain pose with raised arms on rocks by the sea'),
}

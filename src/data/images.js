// Bildquellen (Magnific-Lizenzbilder, als WebP in public/images). Alt-Texte beschreiben das Motiv
// und liegen je Sprache vor: `alt: { de, en }` (siehe components/Media.jsx und i18n/).
//
// KI-KENNZEICHNUNG (Transparenzpflicht für KI-Inhalte, Art. 50 KI-Verordnung (EU) 2024/1689):
// - Die Tempel-/Objektbilder (`p(...)`) sind KI-generiert: `ai: true` setzt im HTML
//   `data-ai-generated="true"` und ergänzt den Alt-Text um den Hinweis „KI-generiertes Bild“
//   bzw. „AI-generated image“ (siehe components/Media.jsx, Texte in data/<sprache>/ui.json).
// - Die Yoga-Bilder mit Menschen (`real(...)`) sind echte Fotos von echten Menschen
//   (Magnific-Stockfotos, in der Bibliothek als „nicht KI-generiert“ geführt) und werden nicht gekennzeichnet.
const AI_GENERATED = true
const p = (name, de, en) => ({ src: `/images/${name}.webp`, alt: { de, en }, ai: AI_GENERATED })
const real = (name, de, en) => ({ src: `/images/${name}.webp`, alt: { de, en }, ai: false })

export const IMG = {
  hero: p('hero-tempelsaeulen-sonnenlicht',
    'Sonnenlicht fällt durch geschnitzte Säulen eines Tempelgangs',
    'Sunlight falls through carved pillars of a temple corridor'),
  tempelInnen: p('indischer-tempel-innenraum-oellampen',
    'Tempelraum mit goldenen Vorhängen, Blumengirlanden und Öllampen',
    'Temple room with golden curtains, flower garlands and oil lamps'),
  palasttuer: p('indische-palasttuer-schnitzereien',
    'Reich verzierte Tempeltür zwischen geschnitzten Säulen',
    'Richly decorated temple door between carved pillars'),
  schrein: p('tempelschrein-opfergaben',
    'Steinschrein mit Rauch, Glocke und Kerzen',
    'Stone shrine with smoke, a bell and candles'),
  oellampen: p('kerala-oellampen-daemmerung',
    'Messing-Öllampen und Blumenmuster in der Dämmerung',
    'Brass oil lamps and flower patterns at dusk'),
  gong: p('klanggong-holzrahmen',
    'Klanggong im verzierten Holzrahmen',
    'Sound gong in an ornate wooden frame'),
  morgenlicht: real('yoga-drehdreieck-pose-terrasse-bergblick',
    'Mann in der Yoga-Pose Drehdreieck auf einer Terrasse vor Bergen',
    'Man in the yoga pose revolved triangle on a terrace in front of mountains'),
  retreatGruppe: real('yoga-retreat-posen-strand-paar',
    'Zwei Menschen in weißer Kleidung üben Yoga-Posen am Sandstrand',
    'Two people in white clothing practice yoga poses on a sandy beach'),
  namaste: real('yoga-gruppe-krieger-pose-studio',
    'Yoga-Gruppe in der Krieger-Pose in einem hellen Studio',
    'Yoga group in warrior pose in a bright studio'),
  kurs: real('yoga-kurs-baum-pose-studio',
    'Frau und Mann stehen im Yoga-Kurs in der Baum-Pose auf ihren Matten',
    'A woman and a man stand in tree pose on their mats in a yoga class'),
  atem: real('yoga-ausfallschritt-wiese-see',
    'Frau im Ausfallschritt mit erhobenem Arm auf einer Wiese am See',
    'Woman in a lunge with a raised arm on a meadow by a lake'),
  berge: real('yoga-armbalance-pose-wiese-berge',
    'Frau in einer Armbalance-Pose auf der Yogamatte in einer Bergwiese',
    'Woman in an arm balance pose on a yoga mat in a mountain meadow'),
}

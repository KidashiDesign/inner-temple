// Bildquellen (Magnific-Lizenzbilder, als WebP in public/images). Alt-Texte beschreiben das Motiv.
//
// KI-KENNZEICHNUNG (Transparenzpflicht für KI-Inhalte, Art. 50 KI-Verordnung (EU) 2024/1689):
// - Die Tempel-/Objektbilder (`p(...)`) sind KI-generiert: `ai: true` setzt im HTML
//   `data-ai-generated="true"` und ergänzt den Alt-Text um „(KI-generiertes Bild)“
//   (siehe components/Media.jsx).
// - Die Yoga-Bilder mit Menschen (`real(...)`) sind echte Fotos von echten Menschen
//   (Magnific-Stockfotos, in der Bibliothek als „nicht KI-generiert“ geführt) und werden nicht gekennzeichnet.
const AI_GENERATED = true
const p = (name, alt) => ({ src: `/images/${name}.webp`, alt, ai: AI_GENERATED })
const real = (name, alt) => ({ src: `/images/${name}.webp`, alt, ai: false })

export const IMG = {
  hero: p('hero-tempelsaeulen-sonnenlicht', 'Sonnenlicht fällt durch geschnitzte Säulen eines Tempelgangs'),
  tempelInnen: p('indischer-tempel-innenraum-oellampen', 'Tempelraum mit goldenen Vorhängen, Blumengirlanden und Öllampen'),
  palasttuer: p('indische-palasttuer-schnitzereien', 'Reich verzierte Tempeltür zwischen geschnitzten Säulen'),
  schrein: p('tempelschrein-opfergaben', 'Steinschrein mit Rauch, Glocke und Kerzen'),
  oellampen: p('kerala-oellampen-daemmerung', 'Messing-Öllampen und Blumenmuster in der Dämmerung'),
  gong: p('klanggong-holzrahmen', 'Klanggong im verzierten Holzrahmen'),
  morgenlicht: real('yoga-drehdreieck-pose-terrasse-bergblick', 'Mann in der Yoga-Pose Drehdreieck auf einer Terrasse vor Bergen'),
  retreatGruppe: real('yoga-retreat-posen-strand-paar', 'Zwei Menschen in weißer Kleidung üben Yoga-Posen am Sandstrand'),
  namaste: real('yoga-gruppe-krieger-pose-studio', 'Yoga-Gruppe in der Krieger-Pose in einem hellen Studio'),
  kurs: real('yoga-kurs-baum-pose-studio', 'Frau und Mann stehen im Yoga-Kurs in der Baum-Pose auf ihren Matten'),
  atem: real('yoga-ausfallschritt-wiese-see', 'Frau im Ausfallschritt mit erhobenem Arm auf einer Wiese am See'),
  berge: real('yoga-armbalance-pose-wiese-berge', 'Frau in einer Armbalance-Pose auf der Yogamatte in einer Bergwiese'),
}

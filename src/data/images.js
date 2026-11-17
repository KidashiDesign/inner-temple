// Bildquellen (Magnific-Lizenzbilder, als WebP in public/images). Alt-Texte beschreiben das Motiv.
//
// KI-KENNZEICHNUNG: Alle Bilder dieser Website werden als KI-generiert gekennzeichnet
// (Transparenzpflicht für KI-Inhalte, Art. 50 KI-Verordnung (EU) 2024/1689).
// - `ai: true` setzt im HTML `data-ai-generated="true"` und ergänzt den Alt-Text um
//   „(KI-generiertes Bild)“ (siehe components/Media.jsx).
// - Der sichtbare Hinweis steht im Footer (components/Footer.jsx).
// - Ist ein Bild nachweislich ein echtes Foto, hier `ai: false` setzen. Die Stock-Metadaten
//   der Bibliothek führen alle 12 Bilder derzeit als „nicht KI-generiert“; die Kennzeichnung
//   beruht auf der Angabe des Auftraggebers und sollte vor dem Livegang geprüft werden.
const AI_GENERATED = true
const p = (name, alt) => ({ src: `/images/${name}.webp`, alt, ai: AI_GENERATED })

export const IMG = {
  hero: p('hero-tempelsaeulen-sonnenlicht', 'Sonnenlicht fällt durch geschnitzte Säulen eines Tempelgangs'),
  tempelInnen: p('indischer-tempel-innenraum-oellampen', 'Tempelraum mit goldenen Vorhängen, Blumengirlanden und Öllampen'),
  palasttuer: p('indische-palasttuer-schnitzereien', 'Reich verzierte Tempeltür zwischen geschnitzten Säulen'),
  schrein: p('tempelschrein-opfergaben', 'Steinschrein mit Rauch, Glocke und Kerzen'),
  oellampen: p('kerala-oellampen-daemmerung', 'Messing-Öllampen und Blumenmuster in der Dämmerung'),
  gong: p('klanggong-holzrahmen', 'Klanggong im verzierten Holzrahmen'),
  morgenlicht: p('yoga-morgenlicht-innenraum', 'Meditation im Morgenlicht in einem Raum mit Pflanzen'),
  retreatGruppe: p('yoga-retreat-gruppe-sonnenuntergang', 'Meditierende Gruppe am Strand bei Sonnenuntergang'),
  namaste: p('yoga-gruppe-namaste-studio', 'Yoga-Gruppe mit Händen in Namaste-Haltung'),
  kurs: p('yoga-kurs-frauen-studio', 'Yoga-Kurs in einem hellen Studio'),
  atem: p('atemuebung-wasser-sonnenaufgang', 'Atemübung am See bei Sonnenaufgang'),
  berge: p('yoga-berge-tropen-sonnenaufgang', 'Yoga-Praxis mit Blick auf tropische Berge bei Sonnenaufgang'),
}

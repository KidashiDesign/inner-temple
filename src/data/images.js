// Bildquellen (Magnific-Lizenzfotos, als WebP in public/images). Alt-Texte beschreiben das Motiv.
const p = (name, alt) => ({ src: `/images/${name}.webp`, alt })

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

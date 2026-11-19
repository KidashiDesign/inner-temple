import { useRef } from 'react'
import { gsap, useGSAP, MQ, token } from '../lib/gsap.js'
import { activeGroup, hoverTimeline } from '../lib/interactions.js'
import Page from '../components/Page.jsx'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import Media from '../components/Media.jsx'
import { IMG } from '../data/images.js'
import Badge from '../components/Badge.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import InstructorCard from '../components/InstructorCard.jsx'
import Faq from '../components/Faq.jsx'
import { Lotus, Plus } from '../components/Icons.jsx'
import site from '../data/site.json'
import instructors from '../data/instructors.json'
import classes from '../data/classes.json'

const steps = [
  { title: 'Ankommen', text: 'Sie melden sich zu einer Probestunde an, wir klären kurz Ihre Wünsche und eventuelle Beschwerden. Mehr braucht es zum Start nicht.' },
  { title: 'Üben', text: 'In kleinen Gruppen lernen Sie die Grundhaltungen und den Atem kennen. Die Lehrenden zeigen Varianten für jeden Körper.' },
  { title: 'Vertiefen', text: 'Mit der Zeit kommen längere Sequenzen, Meditation und Atemübungen dazu – in Ihrem Tempo.' },
  { title: 'Mitnehmen', text: 'Sie nehmen kleine Übungen mit in den Alltag, die sich auch zu Hause oder im Büro umsetzen lassen.' },
]
const sessions = [
  { title: 'Einzelstunde', text: 'Ganz auf Sie abgestimmt: Wir üben, was Ihr Körper und Ihr Alltag gerade brauchen.' },
  { title: 'Gruppenkurs', text: 'Gemeinsam in kleinen Gruppen üben, mit festen Terminen und klarer Anleitung.' },
  { title: 'Retreat', text: 'Ein Wochenende nur für Sie: Yoga, Meditation und Zeit zum Ankommen.' },
]
const SESSION_IMGS = [IMG.atem, IMG.kurs, IMG.berge]
const expertise = [
  { title: 'Fundierte Ausbildung', text: 'Unsere Lehrenden haben mehrjährige Ausbildungen durchlaufen und bilden sich laufend weiter.' },
  { title: 'Individuelle Anpassung', text: 'Jede Haltung lässt sich verändern. Wir zeigen Ihnen Varianten, die zu Ihrem Körper passen.' },
  { title: 'Ruhige Umgebung', text: 'Gedämpftes Licht und wenig Ablenkung schaffen Raum zum Abschalten.' },
  { title: 'Langfristige Begleitung', text: 'Wir begleiten Sie über Wochen und Monate und passen die Praxis an, wenn sich Ihr Alltag ändert.' },
]

// Kurszeiten kommen aus classes.json, damit sie mit der Kursseite übereinstimmen.
const DAYPARTS = [['Morgens', (h) => h < 11], ['Mittags', (h) => h >= 11 && h < 15], ['Abends', (h) => h >= 15]]
const timetable = DAYPARTS.map(([group, test]) => ({
  group,
  rows: classes.items
    .filter((c) => test(parseInt(c.time, 10)))
    .sort((a, b) => a.time.localeCompare(b.time))
    .map((c) => [`${c.time} · ${c.tags[1]}`, c.title]),
}))

function useAboutAnimations(scope) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope)
      const ac = new AbortController()
      const accent = token('--c-accent')

      // Inline accordion: exactly one entry is open.
      activeGroup(q('.steps__item'), {
        initial: 2, event: 'click', signal: ac.signal,
        apply: (el, i, on, animate) => {
          const o = { duration: animate ? 0.5 : 0, ease: 'power3.out', overwrite: 'auto' }
          gsap.to(el.querySelector('.steps__answer'), { height: on ? 'auto' : 0, ...o })
          gsap.to(el.querySelector('.steps__icon'), { rotation: on ? 45 : 0, ...o })
          gsap.to(el, { borderBottomColor: on ? accent : 'rgba(0,0,0,0.5)', ...o })
          el.querySelector('button').setAttribute('aria-expanded', on)
        },
      })

      // Session cards: image zooms and tilts slightly on hover.
      q('.scard__media').forEach((el) => hoverTimeline(el, (tl) => {
        tl.to(el.querySelector('.media'), { scale: 1.12, rotation: -2, duration: 0.5, ease: 'power3.out' })
      }, ac.signal))

      // Feature band grows from a centred block to full width while scrolling.
      const mm = gsap.matchMedia()
      mm.add(`${MQ.desktop} and (prefers-reduced-motion: no-preference)`, () => {
        gsap.timeline({ scrollTrigger: { trigger: '.band', start: 'top 65%', end: 'bottom bottom', scrub: 1 }, defaults: { ease: 'none' } })
          .fromTo('.band__box', { width: '50%', height: '50rem', borderRadius: '1rem' }, { width: '100%', height: '61.25rem', borderRadius: '0rem', duration: 1 }, 0)
          .fromTo('.band .marquee', { yPercent: 100 }, { yPercent: 0, duration: 0.44 }, 0.56)
      })

      return () => ac.abort()
    },
    { scope },
  )
}

export default function About() {
  const ref = useRef(null)
  useAboutAnimations(ref)
  const team = instructors.filter((p) => p.featured)

  return (
    <div ref={ref}>
      <Page>
        <PageHero image={IMG.hero} eyebrow="Über uns" title="Ein Ort mit" accent="Haltung" text={`${site.name} ist ein Ort zum Üben und Ankommen. Wir verbinden klassische Yoga-Praxis mit Atemarbeit und Meditation – ohne Leistungsdruck und mit viel Zeit für jeden Einzelnen.`} />

        <section className="section bg-alt">
          <div className="container split">
            <div className="split__media" data-image>
              <Media {...IMG.morgenlicht} data-zoom />
              <div className="split__badge"><Badge>Unser Weg</Badge></div>
            </div>
            <div className="split__body">
              <div className="stack">
                <div className="eyebrow" data-blur>Ablauf</div>
                <h2 data-blur>In vier Schritten zur eigenen <span className="accent">Praxis</span></h2>
                <p data-blur>Der Einstieg ist einfach: Sie kommen, wir hören zu, und Sie üben in Ihrem Tempo. So läuft es in vier Schritten.</p>
                <div data-blur><Button to="/kurse">Kurse ansehen</Button></div>
              </div>
              <div className="steps">
                {steps.map(({ title, text }) => (
                  <div className="steps__item" data-blur key={title}>
                    <button type="button" className="steps__q">
                      <span className="t-h5">{title}</span>
                      <span className="steps__icon"><Plus /></span>
                    </button>
                    <div className="steps__answer"><p>{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--top">
          <div className="container">
            <SectionHeader eyebrow="Formate" title="Drei Wege, mit uns zu" accent="üben" />
            <div className="grid-3" data-card-group>
              {sessions.map(({ title, text }, i) => (
                <article className="scard" data-card key={title}>
                  <div className="scard__media" data-image><Media {...SESSION_IMGS[i % 3]} data-zoom /></div>
                  <div className="scard__body"><div className="t-h5">{title}</div><p>{text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <SectionHeader align="center" eyebrow="Was uns ausmacht" title="Erfahrung, die man" accent="spürt" />
            <div className="expert">
              {expertise.map(({ title, text }) => (
                <div className="expert__row" data-blur key={title}>
                  <span className="expert__icon"><Lotus /></span>
                  <div><div className="t-h4">{title}</div><p>{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="band__box">
            <div className="band__bg"><Media {...IMG.schrein} /><div className="band__shade" /></div>
            <div className="container band__content">
              <span className="band__icon"><Lotus /></span>
              <h2 data-blur>Ein Ort, an dem <span className="accent">Ruhe</span> selbstverständlich ist</h2>
            </div>
            <LogoMarquee items={site.styles} variant="glass" />
          </div>
        </section>

        <section className="section section--top">
          <div className="container split">
            <div className="split__body">
              <SectionHeader eyebrow="Stundenplan" title="Kurszeiten im" accent="Überblick" />
              <div className="ttable">
                <div className="ttable__group ttable__group--head" data-blur>
                  <div className="t-h6">Tageszeit</div>
                  <div className="ttable__rows"><div className="ttable__row"><span className="t-h6">Zeit</span><span className="t-h6">Kurs</span></div></div>
                </div>
                {timetable.map((g) => (
                  <div className="ttable__group" data-blur key={g.group}>
                    <div className="t-h6">{g.group}</div>
                    <div className="ttable__rows">
                      {g.rows.map(([time, name]) => <div className="ttable__row" key={time + name}><span>{time}</span><span>{name}</span></div>)}
                    </div>
                  </div>
                ))}
              </div>
              <div data-blur><Button to="/kontakt">Platz anfragen</Button></div>
            </div>
            <div className="split__media" data-image>
              <Media {...IMG.namaste} data-zoom />
              <div className="statcard"><div className="counter__value" data-counter={String(classes.items.length)}>{classes.items.length}</div><div className="t-h6">Kurse im Programm</div></div>
            </div>
          </div>
        </section>

        <section className="section section--top">
          <div className="container">
            <SectionHeader align="center" eyebrow="Unser Team" title="Menschen, die Sie" accent="begleiten" />
            <div className="grid-4" data-card-group>
              {team.map((p, i) => <InstructorCard key={p.slug} person={p} index={i} withLine data-card />)}
            </div>
          </div>
        </section>

        <Faq />
      </Page>
    </div>
  )
}

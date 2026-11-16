import { useRef } from 'react'
import { gsap, useGSAP, MQ, token } from '../lib/gsap.js'
import { activeGroup, hoverTimeline } from '../lib/interactions.js'
import Page from '../components/Page.jsx'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import Media from '../components/Media.jsx'
import Badge from '../components/Badge.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import InstructorCard from '../components/InstructorCard.jsx'
import Faq from '../components/Faq.jsx'
import { Lotus, Plus } from '../components/Icons.jsx'
import site from '../data/site.json'
import instructors from '../data/instructors.json'

const steps = ['Ankommen', 'Üben', 'Vertiefen', 'Mitnehmen']
const sessions = ['Einzelstunde', 'Gruppenkurs', 'Retreat']
const expertise = ['Fundierte Ausbildung', 'Individuelle Anpassung', 'Ruhige Umgebung', 'Langfristige Begleitung']
const timetable = [
  { group: 'Morgens', rows: [['07:00 – 08:00', 'Hatha Yoga'], ['08:30 – 09:15', 'Sanfter Morgen'], ['09:30 – 10:45', 'Vinyasa Flow']] },
  { group: 'Mittags', rows: [['12:00 – 13:00', 'Rücken & Atem'], ['12:30 – 13:15', 'Meditation']] },
  { group: 'Abends', rows: [['18:00 – 19:15', 'Yoga Basics'], ['20:00 – 21:15', 'Yin Yoga']] },
]

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
        <PageHero eyebrow="Über uns" title="Ein Ort mit" accent="Haltung" text={`Platzhaltertext: ein bis zwei Sätze zur Geschichte und zum Selbstverständnis von ${site.name}.`} />

        <section className="section bg-alt">
          <div className="container split">
            <div className="split__media" data-image>
              <Media tone={2} data-zoom label="Bild" />
              <div className="split__badge"><Badge>Unser Weg</Badge></div>
            </div>
            <div className="split__body">
              <div className="stack">
                <div className="eyebrow" data-blur>Ablauf</div>
                <h2 data-blur>In vier Schritten zur eigenen <span className="accent">Praxis</span></h2>
                <p data-blur>Platzhaltertext: zwei bis drei Sätze dazu, wie neue Gäste bei uns starten.</p>
                <div data-blur><Button to="/kurse">Kurse ansehen</Button></div>
              </div>
              <div className="steps">
                {steps.map((s) => (
                  <div className="steps__item" data-blur key={s}>
                    <button type="button" className="steps__q">
                      <span className="t-h5">{s}</span>
                      <span className="steps__icon"><Plus /></span>
                    </button>
                    <div className="steps__answer"><p>Platzhaltertext: Beschreibung dieses Schritts in zwei Sätzen.</p></div>
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
              {sessions.map((s, i) => (
                <article className="scard" data-card key={s}>
                  <div className="scard__media" data-image><Media tone={i + 3} data-zoom label="Bild" /></div>
                  <div className="scard__body"><div className="t-h5">{s}</div><p>Platzhaltertext: kurze Beschreibung dieses Formats.</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <SectionHeader align="center" eyebrow="Was uns ausmacht" title="Erfahrung, die man" accent="spürt" />
            <div className="expert">
              {expertise.map((e) => (
                <div className="expert__row" data-blur key={e}>
                  <span className="expert__icon"><Lotus /></span>
                  <div><div className="t-h4">{e}</div><p>Platzhaltertext: zwei Sätze, die diesen Punkt konkret machen.</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="band__box">
            <div className="band__bg"><Media tone={5} /><div className="band__shade" /></div>
            <div className="container band__content">
              <span className="band__icon"><Lotus /></span>
              <h2 data-blur>Platzhalter: ein Leitsatz über das <span className="accent">Retreat</span></h2>
            </div>
            <LogoMarquee items={site.partners} variant="glass" />
          </div>
        </section>

        <section className="section section--top">
          <div className="container split">
            <div className="split__body">
              <SectionHeader eyebrow="Kurszeiten" title="Die Woche im" accent="Überblick" />
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
              <Media tone={1} data-zoom label="Bild" />
              <div className="statcard"><div className="counter__value" data-counter="30+">30+</div><div className="t-h6">Platzhalter: Kurse pro Woche</div></div>
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

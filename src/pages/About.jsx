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
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { fmt, useI18n } from '../i18n/I18nProvider.jsx'

const SESSION_IMGS = [IMG.atem, IMG.kurs, IMG.berge]
// Kurszeiten kommen aus classes.json, damit sie mit der Kursseite übereinstimmen.
const DAYPARTS = [['morning', (h) => h < 11], ['midday', (h) => h >= 11 && h < 15], ['evening', (h) => h >= 15]]

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
  const { ui, site, classes, instructors, path } = useI18n()
  const t = ui.about
  useAboutAnimations(ref)
  useDocumentMeta({ title: ui.meta.titles.about, description: ui.meta.description })
  const team = instructors.filter((p) => p.featured)
  const timetable = DAYPARTS.map(([key, test]) => ({
    group: t.timetable.dayparts[key],
    rows: classes.items
      .filter((c) => test(parseInt(c.time, 10)))
      .sort((a, b) => a.time.localeCompare(b.time))
      .map((c) => [`${c.time} · ${c.tags[1]}`, c.title]),
  }))

  return (
    <div ref={ref}>
      <Page>
        <PageHero image={IMG.hero} eyebrow={t.hero.eyebrow} title={t.hero.title} accent={t.hero.accent} text={fmt(t.hero.text, { name: site.name })} />

        <section className="section bg-alt">
          <div className="container split">
            <div className="split__media" data-image>
              <Media {...IMG.morgenlicht} data-zoom />
              <div className="split__badge"><Badge>{t.way.badge}</Badge></div>
            </div>
            <div className="split__body">
              <div className="stack">
                <div className="eyebrow" data-blur>{t.way.eyebrow}</div>
                <h2 data-blur>{t.way.title} <span className="accent">{t.way.accent}</span></h2>
                <p data-blur>{t.way.text}</p>
                <div data-blur><Button to={path('classes')}>{t.way.button}</Button></div>
              </div>
              <div className="steps">
                {t.steps.map(({ title, text }) => (
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
            <SectionHeader eyebrow={ui.common.formats} {...t.sessionsHeader} />
            <div className="grid-3" data-card-group>
              {t.sessions.map(({ title, text }, i) => (
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
            <SectionHeader align="center" {...t.expertiseHeader} />
            <div className="expert">
              {t.expertise.map(({ title, text }) => (
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
              <h2 data-blur>{t.band.before} <span className="accent">{t.band.accent}</span> {t.band.after}</h2>
            </div>
            <LogoMarquee items={site.styles} variant="glass" />
          </div>
        </section>

        <section className="section section--top">
          <div className="container split">
            <div className="split__body">
              <SectionHeader eyebrow={ui.common.schedule} title={t.timetable.title} accent={t.timetable.accent} />
              <div className="ttable">
                <div className="ttable__group ttable__group--head" data-blur>
                  <div className="t-h6">{t.timetable.headDaypart}</div>
                  <div className="ttable__rows"><div className="ttable__row"><span className="t-h6">{t.timetable.headTime}</span><span className="t-h6">{t.timetable.headClass}</span></div></div>
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
              <div data-blur><Button to={path('contact')}>{ui.common.requestSpot}</Button></div>
            </div>
            <div className="split__media" data-image>
              <Media {...IMG.namaste} data-zoom />
              <div className="statcard"><div className="counter__value" data-counter={String(classes.items.length)}>{classes.items.length}</div><div className="t-h6">{t.timetable.statLabel}</div></div>
            </div>
          </div>
        </section>

        <section className="section section--top">
          <div className="container">
            <SectionHeader align="center" eyebrow={ui.common.ourTeam} title={ui.common.teamTitle} accent={ui.common.teamAccent} />
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

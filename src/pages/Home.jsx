import { useRef } from 'react'
import { gsap, useGSAP, MQ, token } from '../lib/gsap.js'
import { activeGroup } from '../lib/interactions.js'
import { scrollToTarget } from '../lib/scroll.js'
import Page from '../components/Page.jsx'
import Button from '../components/Button.jsx'
import Media from '../components/Media.jsx'
import { IMG } from '../data/images.js'
import Badge from '../components/Badge.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import BackgroundLines from '../components/BackgroundLines.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import InstructorCard from '../components/InstructorCard.jsx'
import { Lotus, Star, Clock, User, Check, ArrowDown } from '../components/Icons.jsx'
import site from '../data/site.json'
import home from '../data/home.json'
import classes from '../data/classes.json'
import instructors from '../data/instructors.json'

/** Section-specific motion of the home page. Shared reveals come from <Page>. */
function useHomeAnimations(scope) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope)
      const ac = new AbortController()
      const { signal } = ac
      const accent = token('--c-accent')
      const ink = token('--c-ink')
      const mm = gsap.matchMedia()

      // Programme cards: one card is active, hover moves the active state.
      activeGroup(q('.prog'), {
        initial: 1, signal, resetOn: q('.prog-grid')[0],
        apply: (el, i, on, animate) => {
          const k = animate ? 1 : 0
          gsap.to(el, { borderTopColor: on ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.2)', duration: 0.35 * k, ease: 'power2.out' })
          gsap.to(el.querySelector('.prog__line'), { scaleX: on ? 1 : 0, duration: (on ? 0.5 : 0.4) * k, ease: on ? 'power3.out' : 'power3.inOut', overwrite: true })
          gsap.to(el.querySelector('.prog__icon'), { color: on ? accent : ink, duration: 0.3 * k, ease: 'power2.out' })
        },
      })

      // Offer cards: text panel slides up, image zooms on the active card.
      activeGroup(q('.offer'), {
        initial: 1, signal, resetOn: q('.offer-grid')[0],
        apply: (el, i, on, animate) => {
          const o = { duration: animate ? 0.65 : 0, ease: 'power3.out', overwrite: 'auto' }
          gsap.to(el.querySelector('.offer__text'), { yPercent: on ? 0 : 100, ...o })
          gsap.to(el.querySelector('.media'), { scale: on ? 1.15 : 1, ...o })
        },
      })

      // Practice list: active row gets accent colour and line, its image slides over the previous one.
      const photos = q('.practice__photo')
      const isDesktop = () => window.matchMedia(MQ.desktop).matches
      activeGroup(q('.practice__row'), {
        initial: 2, signal,
        apply: (el, i, on, animate, other) => {
          const k = animate ? 1 : 0
          gsap.to(el.querySelector('.practice__title'), { color: on ? accent : ink, x: on && isDesktop() ? 15 : 0, duration: (on ? 0.3 : 0.25) * k, ease: 'power2.out', overwrite: true })
          gsap.to(el.querySelector('.practice__line'), { scaleX: on ? 1 : 0, duration: 0.4 * k, ease: 'power2.inOut', overwrite: true })
          const img = photos[i]
          if (!animate) { gsap.set(img, { yPercent: on ? 0 : 100, zIndex: on ? 1 : 0 }); return }
          if (!on) return
          const old = photos[other]
          gsap.set(photos, { zIndex: 0 })
          gsap.set(old, { zIndex: 1 })
          gsap.fromTo(img, { yPercent: i > other ? -100 : 100, zIndex: 2 }, {
            yPercent: 0, duration: 0.65, ease: 'power3.out', overwrite: true,
            onComplete: () => { gsap.set(img, { zIndex: 1 }); gsap.set(old, { yPercent: 100, zIndex: 0 }) },
          })
        },
      })

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile, reduce: MQ.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions
        if (reduce) return

        // Hero: card rises in, background image drifts over the whole page scroll.
        gsap.fromTo('.hero__card', { y: 200, scale: 1.1 }, { y: 0, scale: 1, duration: 1, ease: 'power3.out' })
        gsap.fromTo('.hero__img', { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1 } })

        // Benefits: tiles rise one after another.
        gsap.fromTo('[data-rise]', { y: 200 }, { y: 0, ease: 'none', stagger: 0.6, scrollTrigger: { trigger: '.benefits__grid', start: 'top 90%', end: 'top 40%', scrub: 1, invalidateOnRefresh: true } })

        // Partner label: accent panel wipes in, text turns white.
        gsap.timeline({ scrollTrigger: { trigger: '.partners__label', start: 'top 85%', once: true } })
          .fromTo('.partners__fill', { width: '0%' }, { width: '100%', duration: 0.7 }, 0)
          .to('.partners__label-inner', { color: '#fff', duration: 0.7 }, 0)

        // Practice photo column: tilts in once.
        gsap.from('.practice__photos', { opacity: 0, y: 200, scale: 0.4, rotationY: 100, duration: 0.8, scrollTrigger: { trigger: '.practice__photos', start: 'top bottom', once: true } })

        // Schedule rows: row scales in, then its images are revealed with a clip-path wipe.
        q('.sched').forEach((row) => {
          const imgs = row.querySelectorAll('.sched__img')
          gsap.set(row, { scale: 0.6, opacity: 0 })
          gsap.set(imgs, { clipPath: 'inset(0 100% 0 0)' })
          gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 90%', once: true } })
            .to(row, { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' })
            .to(imgs, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power2.out', stagger: 0.05 }, '-=0.4')
        })

        if (!desktop) return

        // Video band: full-bleed block narrows to container width and rounds off.
        const band = q('.vband__box')[0]
        gsap.timeline({ scrollTrigger: { trigger: '.vband', start: 'top 60%', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true }, defaults: { ease: 'none', duration: 1 } })
          .to(band, { width: () => Math.min(97.5 * 16, band.parentElement.clientWidth - 64), borderRadius: '31.25rem' }, 0)
          .fromTo('.vband__media', { yPercent: 6 }, { yPercent: -5 }, 0)

        // Team: odd and even cards move in opposite directions.
        q('.team-grid .icard').forEach((card, i) => {
          const odd = i % 2 === 0
          gsap.fromTo(card, { y: odd ? '0rem' : '4.25rem' }, { y: odd ? '6.25rem' : '0rem', ease: 'none', scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 40%', scrub: 1, invalidateOnRefresh: true } })
        })
      })

      return () => ac.abort()
    },
    { scope },
  )
}

const OFFER_IMGS = [IMG.morgenlicht, IMG.namaste, IMG.berge]
const PRACTICE_IMGS = [IMG.morgenlicht, IMG.atem, IMG.namaste, IMG.retreatGruppe, IMG.kurs]
const SCHED_NARROW = [IMG.palasttuer, IMG.oellampen, IMG.gong]
const SCHED_WIDE = [IMG.morgenlicht, IMG.kurs, IMG.retreatGruppe]

export default function Home() {
  const ref = useRef(null)
  const morning = classes.items[0]
  useHomeAnimations(ref)
  const team = instructors.filter((p) => p.featured)

  return (
    <div ref={ref}>
      <Page>
        {/* 1 Hero */}
        <section className="hero">
          <div className="hero__bg">
            <Media {...IMG.hero} className="hero__img" data-hero-img label="Hero-Bild" />
            <div className="hero__shade" />
            <BackgroundLines />
          </div>
          <div className="container hero__content">
            <div className="stack hero__text">
              <div className="eyebrow" data-banner>Willkommen im Retreat</div>
              <h1 data-banner>Ankommen, atmen, <span className="accent">loslassen</span></h1>
              <p data-banner>Bei {site.name} üben Sie in ruhiger Umgebung, in kleinen Gruppen und mit klarer Anleitung – ob Sie zum ersten Mal auf der Matte stehen oder schon lange praktizieren.</p>
            </div>
            <aside className="hero__card">
              <div className="hero__card-media"><Media {...IMG.tempelInnen} /></div>
              <div className="hero__card-body">
                <div className="accent-text">Kurs am Morgen</div>
                <div className="t-h4">{morning.title}</div>
                <ul className="hero__facts">
                  <li><Clock /> {morning.time}</li><li><User /> {morning.tags[0]}</li><li><Lotus /> {morning.tags[1]}</li>
                </ul>
                <span className="hero__tag">Probestunde möglich</span>
              </div>
            </aside>
          </div>
        </section>

        <div className="over-hero">
          {/* 2 Programme */}
          <section className="section section--top">
            <div className="container">
              <SectionHeader align="center" eyebrow="Unser Angebot" title="Wege zu mehr" accent="Balance" />
              <div className="prog-grid" data-card-group>
                {home.programs.map((p) => (
                  <article className="prog" data-card key={p.title}>
                    <span className="prog__line" />
                    <span className="prog__icon"><Lotus /></span>
                    <div className="prog__body"><div className="t-h5">{p.title}</div><p>{p.text}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 3 Video-Band */}
          <section className="section section--top vband">
            <div className="vband__box">
              <Media {...IMG.berge} className="vband__media" />
              <div className="vband__btn"><span className="eyebrow">Ein Blick ins Retreat</span></div>
            </div>
          </section>

          {/* 4 Angebote */}
          <section className="section">
            <div className="container">
              <div className="head-split">
                <SectionHeader eyebrow="Formate" title="Praxis, die zu Ihrem" accent="Alltag" after="passt" />
                <p data-blur>Ob allein, in der Gruppe oder für ein ganzes Wochenende: Die drei Formate lassen sich frei kombinieren.</p>
              </div>
              <div className="offer-grid" data-flip-group>
                {home.offerings.map((o, i) => (
                  <article className="offer" data-flip key={o.title}>
                    <Media {...OFFER_IMGS[i]} />
                    <div className="offer__label"><span className="offer__star"><Star /></span><span className="t-h5">{o.title}</span></div>
                    <div className="offer__text"><p>{o.text}</p></div>
                  </article>
                ))}
              </div>
              <div className="quote">
                <span className="quote__star"><Star /></span>
                <p data-blur>Yoga ist bei uns <span className="quote__mark">kein Programm</span>, sondern eine Einladung, bei sich anzukommen.</p>
              </div>
            </div>
          </section>

          {/* 5 Warum wir */}
          <section className="section bg-alt">
            <div className="container split">
              <div className="split__media" data-image>
                <Media {...IMG.kurs} data-zoom />
                <div className="split__badge"><Badge>Ruhe und Achtsamkeit</Badge></div>
              </div>
              <div className="split__body">
                <div className="stack">
                  <div className="eyebrow" data-blur>Warum wir</div>
                  <h2 data-blur>Ein Ort für echte <span className="accent">Erholung</span></h2>
                  <p data-blur>Bei uns zählt nicht, wie weit Sie sich beugen können, sondern wie Sie sich dabei fühlen. Ruhige Räume, klare Anleitung und viel Zeit zum Ankommen prägen jede Stunde.</p>
                  <div data-blur><Button to="/ueber-uns">Mehr über uns</Button></div>
                </div>
                <div className="features">
                  {home.features.map((f) => (
                    <div className="feature" data-blur key={f.title}>
                      <span className="feature__icon"><Check /></span>
                      <div><h3 className="t-h5">{f.title}</h3><p>{f.text}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 6 Benefits */}
          <section className="benefits">
            <div className="benefits__head">
              <div className="t-big" data-blur>Raum für <span className="accent">Ruhe</span></div>
              <button type="button" className="benefits__scroll" onClick={() => scrollToTarget('#team')} aria-label="Zum Team scrollen"><ArrowDown /></button>
            </div>
            <div className="benefits__bg"><Media {...IMG.schrein} /><div className="benefits__shade" /></div>
            <div className="container benefits__cards">
              <div className="benefits__grid">
                <div className="benefits__photo" data-rise><Media {...IMG.retreatGruppe} /></div>
                <div className="benefits__card benefits__card--center" data-rise>
                  <span className="accent-text t-h3"><Lotus /></span>
                  <div className="t-h4">Weniger Anspannung, mehr Klarheit: Regelmäßige Praxis tut Körper und Geist gut.</div>
                  <div className="benefits__stat"><span>Im Programm</span><strong>{classes.items.length}</strong><span>Kurse in {classes.levels.length} Stufen</span></div>
                  <p>Vom sanften Einstieg bis zur kraftvollen Serie – wählen Sie, was heute zu Ihnen passt.</p>
                </div>
                <div className="benefits__col">
                  <div className="benefits__card" data-rise>
                    <span className="accent-text t-h3"><Star /></span>
                    <div className="t-h5">Persönliche Anleitung in jeder Stunde, auch für Einsteiger</div>
                    <div className="benefits__pills"><Badge variant="outline">Achtsam</Badge><Badge variant="accent">Persönlich</Badge></div>
                  </div>
                  <div className="benefits__photo benefits__photo--small" data-rise><Media {...IMG.atem} /></div>
                </div>
              </div>
            </div>
          </section>

          {/* 7 Partner */}
          <section className="partners">
            <div className="partners__label">
              <span className="partners__fill" />
              <div className="partners__label-inner"><Star /><span className="t-h5">Unsere Stile</span></div>
            </div>
            <LogoMarquee items={site.styles} />
          </section>

          {/* 8 Praxis */}
          <section className="section section--top">
            <div className="container">
              <SectionHeader eyebrow="Unsere Praxis" title="Was Yoga bei uns" accent="bewirkt" />
              <div className="split practice">
                <div className="split__media practice__photos">
                  {home.practice.map((p, i) => <Media key={p} {...PRACTICE_IMGS[i % PRACTICE_IMGS.length]} className="practice__photo" />)}
                </div>
                <div className="split__body">
                  <div className="practice__list">
                    {home.practice.map((p) => (
                      <div className="practice__row" data-blur key={p}>
                        <div className="practice__inner"><span className="practice__icon"><Lotus /></span><span className="t-h5 practice__title">{p}</span></div>
                        <span className="practice__line" />
                      </div>
                    ))}
                  </div>
                  <div data-blur><Button to="/kontakt">Termin anfragen</Button></div>
                </div>
              </div>
            </div>
          </section>

          {/* 9 Stundenplan */}
          <section className="section section--top">
            <div className="container">
              <SectionHeader eyebrow="Stundenplan" title="Ein Tag im" accent="Retreat" />
              <div className="sched-list">
                {home.schedule.map((s, i) => (
                  <article className="sched" key={s.time}>
                    <div className="sched__when">
                      <div className="sched__time">{s.time}</div>
                      <ul>{s.details.map((d, j) => <li key={d}>{j === 0 ? <User /> : <Clock />} {d}</li>)}</ul>
                    </div>
                    <div className="sched__body">
                      <h3 className="t-h5">{s.title}</h3>
                      <p>{s.text}</p>
                      <div><Button to="/kurse">Zu den Kursen</Button></div>
                    </div>
                    <div className={`sched__imgs${i % 2 ? ' sched__imgs--flip' : ''}`}>
                      <div className="sched__img sched__img--narrow"><Media {...SCHED_NARROW[i % 3]} /></div>
                      <div className="sched__img sched__img--wide"><Media {...SCHED_WIDE[i % 3]} /></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 10 Team */}
          <section className="section team" id="team">
            <div className="container">
              <SectionHeader align="center" eyebrow="Unser Team" title="Menschen, die Sie" accent="begleiten" />
              <div className="team-grid">
                {team.map((p, i) => <InstructorCard key={p.slug} person={p} index={i} />)}
              </div>
            </div>
          </section>
        </div>
      </Page>
    </div>
  )
}

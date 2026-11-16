import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'
import { hoverTimeline } from '../lib/interactions.js'
import Page from '../components/Page.jsx'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import Media from '../components/Media.jsx'
import Badge from '../components/Badge.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import site from '../data/site.json'
import classes from '../data/classes.json'

function ClassCard({ item, index }) {
  const ref = useRef(null)
  useGSAP(
    () => {
      const ac = new AbortController()
      // Overlay with button fades and scales in on hover.
      hoverTimeline(ref.current, (tl, el) => {
        tl.fromTo(el.querySelector('.ccard__overlay'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5 })
      }, ac.signal)
      return () => ac.abort()
    },
    { scope: ref },
  )
  return (
    <article ref={ref} className="ccard">
      <div className="ccard__media">
        <Media src={item.image} tone={index + 1} label="Kursbild" alt={item.title} />
        <div className="ccard__overlay"><Button to="/kontakt">Platz anfragen</Button></div>
      </div>
      <div className="ccard__body">
        <div className="ccard__title"><span className="t-h5">{item.title}</span><span className="t-h5 accent">{item.time}</span></div>
        <p>{item.description}</p>
        <div className="ccard__tags">{item.tags.map((t) => <Badge key={t} variant="tint">{t}</Badge>)}</div>
      </div>
    </article>
  )
}

export default function Classes() {
  const tabs = ['Alle', ...classes.levels]
  const [tab, setTab] = useState('Alle')
  const items = tab === 'Alle' ? classes.items : classes.items.filter((c) => c.level === tab)

  return (
    <Page>
      <PageHero align="center" eyebrow="Kurse" title="Finden Sie die Stunde, die zu Ihnen" accent="passt">
        <LogoMarquee items={site.partners} variant="glass" />
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="head-split">
            <SectionHeader eyebrow="Kursangebot" title="Yoga für jedes" accent="Niveau" />
            <p data-blur>Platzhaltertext: kurzer Hinweis zu Kursgrößen, Dauer und Buchung.</p>
          </div>
          <div className="tabs" role="tablist" aria-label="Niveau" data-blur>
            {tabs.map((t, i) => (
              <span className="tabs__item" key={t}>
                <button type="button" role="tab" aria-selected={tab === t} className={`tabs__btn${tab === t ? ' is-active' : ''}`} onClick={() => setTab(t)}>{t}</button>
                {i < tabs.length - 1 && <span className="tabs__sep" aria-hidden="true">//</span>}
              </span>
            ))}
          </div>
          <div className="grid-3 grid-3--classes" role="tabpanel">
            {items.map((item, i) => <ClassCard key={item.title} item={item} index={i} />)}
          </div>
        </div>
      </section>
    </Page>
  )
}

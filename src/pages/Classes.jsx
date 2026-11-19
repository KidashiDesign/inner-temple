import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'
import { hoverTimeline } from '../lib/interactions.js'
import Page from '../components/Page.jsx'
import PageHero from '../components/PageHero.jsx'
import Button from '../components/Button.jsx'
import Media from '../components/Media.jsx'
import { IMG } from '../data/images.js'
import Badge from '../components/Badge.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { pickAlt, useI18n } from '../i18n/I18nProvider.jsx'
const CLASS_IMGS = [IMG.morgenlicht, IMG.kurs, IMG.namaste, IMG.atem, IMG.retreatGruppe, IMG.berge, IMG.oellampen, IMG.gong, IMG.tempelInnen]

function ClassCard({ item, index }) {
  const ref = useRef(null)
  const { lang, ui, path } = useI18n()
  const fallback = CLASS_IMGS[index % CLASS_IMGS.length]
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
        <Media src={item.image || fallback.src} ai={!item.image && fallback.ai} tone={index + 1} label={ui.labels.classImage} alt={item.image ? item.title : `${item.title}: ${pickAlt(fallback.alt, lang)}`} />
        <div className="ccard__overlay"><Button to={path('contact')}>{ui.common.requestSpot}</Button></div>
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
  const { ui, site, classes } = useI18n()
  const t = ui.classes
  useDocumentMeta({ title: ui.meta.titles.classes, description: ui.meta.description })
  // `null` steht für „alle Stufen“, sonst der Name der Stufe aus classes.levels.
  const tabs = [{ key: null, label: t.all }, ...classes.levels.map((level) => ({ key: level, label: level }))]
  const [tab, setTab] = useState(null)
  const items = tab === null ? classes.items : classes.items.filter((c) => c.level === tab)

  return (
    <Page>
      <PageHero align="center" eyebrow={t.hero.eyebrow} title={t.hero.title} accent={t.hero.accent}>
        <LogoMarquee items={site.styles} variant="glass" />
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="head-split">
            <SectionHeader {...t.header} />
            <p data-blur>{t.text}</p>
          </div>
          <div className="tabs" role="tablist" aria-label={ui.a11y.level} data-blur>
            {tabs.map(({ key, label }, i) => (
              <span className="tabs__item" key={label}>
                <button type="button" role="tab" aria-selected={tab === key} className={`tabs__btn${tab === key ? ' is-active' : ''}`} onClick={() => setTab(key)}>{label}</button>
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

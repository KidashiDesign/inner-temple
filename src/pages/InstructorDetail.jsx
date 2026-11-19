import { useParams } from 'react-router-dom'
import Page from '../components/Page.jsx'
import Button from '../components/Button.jsx'
import Media from '../components/Media.jsx'
import { Lotus } from '../components/Icons.jsx'
import NotFound from './NotFound.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { fmt, useI18n } from '../i18n/I18nProvider.jsx'

const Row = ({ label, suffix, children }) => (
  <div className="meta__row" data-banner><div className="t-h6">{label}{suffix}</div><div>{children}</div></div>
)

export default function InstructorDetail() {
  const { slug } = useParams()
  const { ui, site, instructors, defaults, path } = useI18n()
  const t = ui.instructor
  const index = instructors.findIndex((p) => p.slug === slug)
  const p = index < 0 ? null : { ...defaults, ...instructors[index] }
  useDocumentMeta({
    title: p ? fmt(ui.meta.instructorTitle, { name: p.name, designation: p.designation, site: site.name }) : undefined,
    description: p?.metaDescription,
    image: p?.image,
  })
  if (!p) return <NotFound />

  return (
    <Page>
      <section className="thero">
        <div className="container">
          <h1 className="t-big" data-banner>{p.name}</h1>
          <div className="idetail__hero">
            <div className="idetail__photo" data-image><Media src={p.image} tone={index + 1} data-hero-img label={ui.labels.portrait} alt={p.imageAlt || p.name} loading="eager" fetchPriority="high" width="900" height="1125" /></div>
            <div className="idetail__quote" data-banner>
              <Lotus className="idetail__mark" />
              <div><p className="t-h3">{p.quote}</p><div className="t-h6 idetail__role">{p.role}</div></div>
              <Lotus className="idetail__mark idetail__mark--end" />
            </div>
          </div>
        </div>
      </section>
      <section className="section section--bottom">
        <div className="container idetail__info">
          <div className="idetail__col">
            <div className="stack" data-banner><h2>{p.bioTitle}</h2><p>{p.shortBio}</p></div>
            <div className="meta">
              <Row label={t.focus} suffix={t.labelSuffix}>{p.specialty}</Row>
              <Row label={t.training} suffix={t.labelSuffix}>{p.certifications}</Row>
              <Row label={t.days} suffix={t.labelSuffix}>{p.workingDays}</Row>
            </div>
            <div className="rich">
              <h3>{t.principles}</h3>
              {p.philosophy.map((x) => <div key={x.title}><h6>{x.title}</h6><p>{x.text}</p></div>)}
            </div>
            <div className="rich">
              <h4>{t.takeaway}</h4>
              <ul>{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          </div>
          <div className="idetail__col">
            <div className="meta">
              <Row label={t.position} suffix={t.labelSuffix}>{p.designation}</Row>
              <Row label={t.summary} suffix={t.labelSuffix}>{p.bioSummary}</Row>
              <Row label={t.experience} suffix={t.labelSuffix}>{p.experience}</Row>
              <Row label={t.style} suffix={t.labelSuffix}>{p.teachingStyle}</Row>
              <Row label={t.email} suffix={t.labelSuffix}><a className="link" href={`mailto:${p.email}`}>{p.email}</a></Row>
            </div>
            <div className="idetail__contact" data-banner>
              <div className="t-h6">{t.direct}</div>
              <a className="t-h5 accent link" href={`tel:${p.phone.replace(/\s/g, '')}`}>{p.phone}</a>
            </div>
            <div className="stack">
              <p data-banner>{p.closingText}</p>
              <div data-banner><Button to={path('team')}>{t.allTeam}</Button></div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

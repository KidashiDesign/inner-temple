import { useParams } from 'react-router-dom'
import Page from '../components/Page.jsx'
import Button from '../components/Button.jsx'
import Media from '../components/Media.jsx'
import { Lotus } from '../components/Icons.jsx'
import NotFound from './NotFound.jsx'
import instructors from '../data/instructors.json'
import defaults from '../data/instructorDefaults.json'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

const Row = ({ label, children }) => (
  <div className="meta__row" data-banner><div className="t-h6">{label} :</div><div>{children}</div></div>
)

export default function InstructorDetail() {
  const { slug } = useParams()
  const index = instructors.findIndex((p) => p.slug === slug)
  const p = index < 0 ? null : { ...defaults, ...instructors[index] }
  useDocumentMeta({
    title: p ? `${p.name} – ${p.designation} | Inner Temple Yoga Retreat` : undefined,
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
            <div className="idetail__photo" data-image><Media src={p.image} tone={index + 1} data-hero-img label="Porträt" alt={p.imageAlt || p.name} loading="eager" fetchPriority="high" width="900" height="1125" /></div>
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
              <Row label="Schwerpunkt">{p.specialty}</Row>
              <Row label="Ausbildung">{p.certifications}</Row>
              <Row label="Unterrichtstage">{p.workingDays}</Row>
            </div>
            <div className="rich">
              <h3>Grundsätze</h3>
              {p.philosophy.map((x) => <div key={x.title}><h6>{x.title}</h6><p>{x.text}</p></div>)}
            </div>
            <div className="rich">
              <h4>Was Sie aus den Stunden mitnehmen</h4>
              <ul>{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          </div>
          <div className="idetail__col">
            <div className="meta">
              <Row label="Position">{p.designation}</Row>
              <Row label="Kurzprofil">{p.bioSummary}</Row>
              <Row label="Erfahrung">{p.experience}</Row>
              <Row label="Unterrichtsstil">{p.teachingStyle}</Row>
              <Row label="E-Mail"><a className="link" href={`mailto:${p.email}`}>{p.email}</a></Row>
            </div>
            <div className="idetail__contact" data-banner>
              <div className="t-h6">Direkt anfragen</div>
              <a className="t-h5 accent link" href={`tel:${p.phone.replace(/\s/g, '')}`}>{p.phone}</a>
            </div>
            <div className="stack">
              <p data-banner>{p.closingText}</p>
              <div data-banner><Button to="/team">Zum ganzen Team</Button></div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

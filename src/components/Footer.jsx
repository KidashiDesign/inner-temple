import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import Media from './Media.jsx'
import { IMG } from '../data/images.js'
import { Pin } from './Icons.jsx'
import site from '../data/site.json'

export default function Footer() {
  const half = Math.ceil(site.nav.length / 2)
  return (
    <footer className="footer">
      <div className="footer__bg"><Media {...IMG.tempelInnen} /><div className="footer__shade" /></div>
      <div className="container footer__inner">
        <div className="footer__cta">
          <h2>Bereit für die erste Stunde auf der Matte?</h2>
          <Button to={site.cta.to} variant="light">{site.cta.label}</Button>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <Link to="/" className="footer__brand">{site.name}</Link>
            <p>{site.tagline}</p>
            <div className="footer__block">
              <div className="t-h6">Öffnungszeiten</div>
              {site.contact.hours.map((h) => <div key={h}>{h}</div>)}
            </div>
          </div>
          <div className="footer__col">
            <div className="t-h6">Seiten</div>
            <div className="footer__lists">
              {[site.nav.slice(0, half), site.nav.slice(half)].map((list, i) => (
                <ul key={i}>
                  {list.map((item) => <li key={item.to}><Link to={item.to} className="footer__link">{item.label}</Link></li>)}
                </ul>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <Pin className="footer__pin" />
            <p>{site.contact.address.join(', ')}</p>
            <div className="footer__block">
              <div className="t-h6">Folgen Sie uns</div>
              <div className="footer__social">
                {site.social.map((s) => <a key={s.label} href={s.href} className="footer__link">{s.label}</a>)}
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bar">
          <div>© {new Date().getFullYear()} {site.name}</div>
          <div>Demo-Website mit Beispielinhalten</div>
          <div className="footer__ai">Hinweis: Alle Bilder auf dieser Website sind KI-generiert.</div>
        </div>
      </div>
    </footer>
  )
}

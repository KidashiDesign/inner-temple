import { Link } from 'react-router-dom'
import Button from './Button.jsx'
import Media from './Media.jsx'
import { IMG } from '../data/images.js'
import { Pin } from './Icons.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function Footer() {
  const { ui, site, path } = useI18n()
  const half = Math.ceil(site.nav.length / 2)
  return (
    <footer className="footer">
      <div className="footer__bg"><Media {...IMG.tempelInnen} /><div className="footer__shade" /></div>
      <div className="container footer__inner">
        <div className="footer__cta">
          <h2>{ui.footer.cta}</h2>
          <Button to={path(site.cta.route)} variant="light">{site.cta.label}</Button>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <Link to={path('home')} className="footer__brand">{site.name}</Link>
            <p>{site.tagline}</p>
            <div className="footer__block">
              <div className="t-h6">{ui.footer.hours}</div>
              {site.contact.hours.map((h) => <div key={h}>{h}</div>)}
            </div>
          </div>
          <div className="footer__col">
            <div className="t-h6">{ui.footer.pages}</div>
            <div className="footer__lists">
              {[site.nav.slice(0, half), site.nav.slice(half)].map((list, i) => (
                <ul key={i}>
                  {list.map((item) => <li key={item.route}><Link to={path(item.route)} className="footer__link">{item.label}</Link></li>)}
                </ul>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <Pin className="footer__pin" />
            <p>{site.contact.address.join(', ')}</p>
            <div className="footer__block">
              <div className="t-h6">{ui.footer.follow}</div>
              <div className="footer__social">
                {site.social.map((s) => <a key={s.label} href={s.href} className="footer__link">{s.label}</a>)}
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bar">
          <div>© {new Date().getFullYear()} {site.name}</div>
          <div>{ui.footer.demo}</div>
        </div>
      </div>
    </footer>
  )
}

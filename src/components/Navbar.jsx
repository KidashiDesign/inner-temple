import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { gsap, useGSAP, MQ } from '../lib/gsap.js'
import Button from './Button.jsx'
import LanguageSwitch from './LanguageSwitch.jsx'
import { Lotus } from './Icons.jsx'
import { fmt, useI18n } from '../i18n/I18nProvider.jsx'

export default function Navbar() {
  const ref = useRef(null)
  const menuTl = useRef(null)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { ui, site, path } = useI18n()

  useEffect(() => setOpen(false), [pathname])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop: floating pill becomes a full-width bar right after scrolling starts.
      mm.add(MQ.desktop, () => {
        gsap.timeline({ scrollTrigger: { start: 0, end: 60, scrub: 1 }, defaults: { ease: 'none' } })
          .to(ref.current, { paddingTop: 0, duration: 0.3 }, 0)
          .to('.nav__bar', { paddingLeft: 0, paddingRight: 0, borderRadius: 0, duration: 0.6 }, 0.3)
          .to('.nav__bg', { width: '100%', borderRadius: 0, duration: 0.6 }, 0.3)
      })

      // Mobile: burger turns into a cross, menu panel unfolds.
      mm.add(MQ.mobile, () => {
        const [top, mid, bottom] = gsap.utils.toArray('.nav__burger span')
        const d = { duration: 0.45, ease: 'power3.inOut' }
        menuTl.current = gsap.timeline({ paused: true })
          .to(top, { y: 4, rotation: 45, ...d }, 0)
          .to(mid, { y: -4, rotation: -45, ...d }, 0)
          .to(bottom, { scaleX: 0, opacity: 0, duration: 0.3, ease: 'power3.inOut' }, 0)
          .fromTo('.nav__menu', { height: 0 }, { height: 'auto', duration: 0.4, ease: 'power2.out' }, 0)
        return () => { menuTl.current = null }
      })
    },
    { scope: ref },
  )

  useEffect(() => {
    if (!menuTl.current) return
    if (open) menuTl.current.play()
    else menuTl.current.reverse()
  }, [open])

  return (
    <header ref={ref} className="nav">
      <div className="nav__inner">
      <div className="nav__bg" />
      <div className="container nav__container">
        <div className="nav__bar">
          <Link to={path('home')} className="nav__brand" aria-label={fmt(ui.a11y.home, { name: site.name })}>
            <Lotus className="nav__brand-mark" />
            <span>{site.name}</span>
          </Link>
          <nav className="nav__menu" id="hauptmenue" aria-label={ui.a11y.mainNav}>
            <ul className="nav__links">
              {site.nav.map((item) => (
                <li key={item.route}>
                  <NavLink to={path(item.route)} end={item.route === 'home'} className="nav__link">{item.label}</NavLink>
                </li>
              ))}
            </ul>
            <div className="nav__mobile-extra">
              <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`}>{site.contact.phone}</a>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <Button to={path(site.cta.route)}>{site.cta.label}</Button>
              <LanguageSwitch />
            </div>
          </nav>
          <div className="nav__cta"><LanguageSwitch /><Button to={path(site.cta.route)}>{site.cta.label}</Button></div>
          <button type="button" className="nav__burger" aria-label={ui.a11y.menu} aria-expanded={open} aria-controls="hauptmenue" onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      </div>
    </header>
  )
}

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP, token } from '../lib/gsap.js'
import { hoverTimeline } from '../lib/interactions.js'
import Media from './Media.jsx'

export default function InstructorCard({ person, index = 0, withLine = false, className = '', ...rest }) {
  const ref = useRef(null)
  useGSAP(
    () => {
      const ac = new AbortController()
      const accent = token('--c-accent')
      hoverTimeline(ref.current, (tl, el) => {
        const d = { duration: 0.5, ease: 'power2.inOut' }
        tl.to(el.querySelector('.media'), { scale: 1.1, rotation: -2, ...d }, 0)
          .fromTo(el.querySelector('.icard__overlay'), { opacity: 0 }, { opacity: 1, ...d }, 0)
          .fromTo(el.querySelector('.icard__frame'), { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, ...d }, 0)
          .to(el.querySelectorAll('.icard__name, .icard__role'), { color: accent, duration: 0.5 }, 0)
        const line = el.querySelector('.icard__line span')
        if (line) tl.fromTo(line, { width: '0%' }, { width: '100%', duration: 0.5 }, 0)
      }, ac.signal)
      return () => ac.abort()
    },
    { scope: ref },
  )
  return (
    <article ref={ref} className={`icard ${className}`} {...rest}>
      <Link to={`/team/${person.slug}`} className="icard__media" aria-label={`${person.name} – Profil`}>
        <Media src={person.image} tone={index + 1} label="Porträt" alt={person.name} />
        <span className="icard__overlay" />
        <span className="icard__frame" />
      </Link>
      <div className="icard__text">
        <div className="t-h5 icard__name">{person.name}</div>
        <div className="icard__role">{person.role}</div>
      </div>
      {withLine && <div className="icard__line"><span /></div>}
    </article>
  )
}

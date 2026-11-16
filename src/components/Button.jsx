import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap.js'
import { Arrow } from './Icons.jsx'

/** Button with overlay sweep and icon swap on hover. Renders Link, <a> or <button>. */
export default function Button({ to, href, children, variant = 'primary', full = false, className = '', ...rest }) {
  const ref = useRef(null)
  const tl = useRef(null)

  useGSAP(
    () => {
      const t = gsap.timeline({ paused: true })
      t.to('.btn__overlay', { width: variant === 'light' ? '110%' : '100%', duration: 0.4, ease: 'power3.out' }, 0)
        .fromTo('.btn__icon--in', { scale: 0, x: 0 }, { scale: 1, x: '0.5rem', duration: 0.4 }, 0)
        .to('.btn__icon--out', { scale: 0, duration: 0.4 }, 0)
        .fromTo('.btn__text', { x: '-0.5rem' }, { x: '0.5rem', duration: 0.4 }, 0)
      if (variant === 'light') t.to('.btn__content', { color: '#fff', duration: 0.4 }, 0)
      tl.current = t
    },
    { scope: ref, dependencies: [variant] },
  )

  const props = {
    ref,
    className: `btn btn--${variant}${full ? ' btn--full' : ''} ${className}`,
    onMouseEnter: () => tl.current?.play(),
    onMouseLeave: () => tl.current?.reverse(),
    ...rest,
  }
  const inner = (
    <>
      <span className="btn__overlay" />
      <span className="btn__content">
        <span className="btn__icon btn__icon--in"><Arrow /></span>
        <span className="btn__text">{children}</span>
        <span className="btn__icon btn__icon--out"><Arrow /></span>
      </span>
    </>
  )
  if (to) return <Link to={to} {...props}>{inner}</Link>
  if (href) return <a href={href} {...props}>{inner}</a>
  return <button type="button" {...props}>{inner}</button>
}

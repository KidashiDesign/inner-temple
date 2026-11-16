import { useRef } from 'react'
import { gsap, useGSAP, reducedMotion } from '../lib/gsap.js'

/** Endless logo band. Items are rendered three times and shifted by one set width. */
export default function LogoMarquee({ items, variant = 'light' }) {
  const ref = useRef(null)
  useGSAP(
    () => {
      if (reducedMotion()) return
      const track = ref.current.querySelector('.marquee__track')
      const width = track.scrollWidth / 3
      if (!width) return
      gsap.to(track, {
        x: `-=${width}`, duration: 30, ease: 'none', repeat: -1,
        modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % width) },
      })
    },
    { scope: ref },
  )
  return (
    <div ref={ref} className={`marquee marquee--${variant}`} aria-hidden="true">
      <div className="marquee__track">
        {[0, 1, 2].map((set) => items.map((name) => (
          <div className="marquee__item" key={`${set}-${name}`}><span>{name}</span></div>
        )))}
      </div>
    </div>
  )
}

import Media from './Media.jsx'
import { IMG } from '../data/images.js'
import BackgroundLines from './BackgroundLines.jsx'

/** Full-height dark hero with background image, used on inner pages. */
export default function PageHero({ eyebrow, title, accent, text, align = 'left', image = IMG.palasttuer, children }) {
  return (
    <section className={`phero phero--${align}`}>
      <div className="phero__bg">
        <Media {...image} data-hero-img />
        <div className="phero__shade" />
        <BackgroundLines />
      </div>
      <div className="container phero__content">
        <div className="stack phero__text">
          {eyebrow && <div className="eyebrow" data-banner>{eyebrow}</div>}
          <h1 data-banner>{title} <span className="accent">{accent}</span></h1>
          {text && <p data-banner>{text}</p>}
        </div>
      </div>
      {children}
    </section>
  )
}

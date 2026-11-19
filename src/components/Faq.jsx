import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap.js'
import { Plus } from './Icons.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

function FaqItem({ item, number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const first = useRef(true)
  useGSAP(
    () => {
      const d = first.current ? 0 : 0.5
      first.current = false
      gsap.to('.faq__answer', { height: open ? 'auto' : 0, duration: d, ease: 'power1.out' })
      gsap.to('.faq__icon', { rotation: open ? 45 : 0, duration: d, ease: 'power1.out' })
    },
    { scope: ref, dependencies: [open] },
  )
  return (
    <div ref={ref} className="faq__item" data-blur>
      <button type="button" className="faq__q" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="faq__num accent">{String(number).padStart(2, '0')}.</span>
        <span className="t-h6 faq__title">{item.question}</span>
        <span className="faq__icon"><Plus /></span>
      </button>
      <div className="faq__answer"><p>{item.answer}</p></div>
    </div>
  )
}

/** FAQ section: heading left, independently toggling items right. */
export default function Faq({ tinted = false }) {
  const { ui, faq } = useI18n()
  return (
    <section className={`section${tinted ? ' bg-alt' : ''}`}>
      <div className="container faq">
        <div className="stack faq__head">
          <h2 data-blur>{ui.faq.title} <span className="accent">{ui.faq.accent}</span></h2>
          <p data-blur>{ui.faq.text}</p>
        </div>
        <div className="faq__list">
          {faq.map((item, i) => <FaqItem key={item.question} item={item} number={i + 1} />)}
        </div>
      </div>
    </section>
  )
}

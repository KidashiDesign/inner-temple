import { useState } from 'react'
import Button from './Button.jsx'

/** Demo form: validates in the browser and shows a notice. Nothing is sent. */
export default function ContactForm() {
  const [sent, setSent] = useState(false)
  if (sent) {
    return <div className="form__done" role="status">Danke! Dies ist eine Demo – die Nachricht wurde nicht versendet.</div>
  }
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
      <div className="form__grid">
        <input className="field" data-banner name="name" placeholder="Name" aria-label="Name" required />
        <input className="field" data-banner name="phone" type="tel" placeholder="Telefon" aria-label="Telefon" />
        <input className="field" data-banner name="email" type="email" placeholder="E-Mail" aria-label="E-Mail" required />
        <select className="field" data-banner name="subject" aria-label="Thema" defaultValue="">
          <option value="" disabled>Thema wählen</option>
          <option>Probestunde</option>
          <option>Einzelstunde</option>
          <option>Retreat</option>
        </select>
      </div>
      <textarea className="field field--area" data-banner name="message" placeholder="Nachricht" aria-label="Nachricht" />
      <div className="form__foot" data-banner>
        <label className="form__check">
          <input type="checkbox" required /> <span>Ich stimme der Verarbeitung meiner Angaben zu.</span>
        </label>
        <Button type="submit">Nachricht senden</Button>
      </div>
    </form>
  )
}

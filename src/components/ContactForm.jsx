import { useState } from 'react'
import Button from './Button.jsx'
import { useI18n } from '../i18n/I18nProvider.jsx'

/** Demo form: validates in the browser and shows a notice. Nothing is sent. */
export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const { ui: { form } } = useI18n()
  if (sent) {
    return <div className="form__done" role="status">{form.done}</div>
  }
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
      <div className="form__grid">
        <input className="field" data-banner name="name" placeholder={form.name} aria-label={form.name} required />
        <input className="field" data-banner name="phone" type="tel" placeholder={form.phone} aria-label={form.phone} />
        <input className="field" data-banner name="email" type="email" placeholder={form.email} aria-label={form.email} required />
        <select className="field" data-banner name="subject" aria-label={form.subjectLabel} defaultValue="">
          <option value="" disabled>{form.subjectPlaceholder}</option>
          {form.subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <textarea className="field field--area" data-banner name="message" placeholder={form.message} aria-label={form.message} />
      <div className="form__foot" data-banner>
        <label className="form__check">
          <input type="checkbox" required /> <span>{form.consent}</span>
        </label>
        <Button type="submit">{form.submit}</Button>
      </div>
    </form>
  )
}

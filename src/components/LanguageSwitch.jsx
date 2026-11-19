import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { LANGS } from '../i18n/routes.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

/** DE / EN: die aktive Sprache ist Text, die andere ein Link auf dieselbe Seite in der anderen Sprache. */
export default function LanguageSwitch({ className = '' }) {
  const { lang, ui, switchPath } = useI18n()
  return (
    <div className={`langswitch ${className}`} role="group" aria-label={ui.a11y.language}>
      {LANGS.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span className="langswitch__sep" aria-hidden="true">/</span>}
          {l === lang ? (
            <span className="langswitch__item is-active" lang={l} aria-current="true">{l.toUpperCase()}</span>
          ) : (
            <Link to={switchPath(l)} className="langswitch__item" lang={l} hrefLang={l} aria-label={ui.languages[l]}>{l.toUpperCase()}</Link>
          )}
        </Fragment>
      ))}
    </div>
  )
}

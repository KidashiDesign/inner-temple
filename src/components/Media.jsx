import { pickAlt, useI18n } from '../i18n/I18nProvider.jsx'

/**
 * Image slot. Renders the real image when `src` is set, otherwise a neutral
 * placeholder so layouts and animations work before client photos exist.
 *
 * `ai` marks the image as AI-generated: the source gets data-ai-generated="true"
 * and the alt text (if any) a spoken notice. See data/images.js for the policy.
 */
export default function Media({ src, alt = '', ai = false, label, tone = 1, className = '', ...rest }) {
  const { lang, ui } = useI18n()
  const text = pickAlt(alt, lang)
  if (src) {
    return (
      <img
        src={src}
        alt={ai && text ? `${text} (${ui.a11y.aiImage})` : text}
        loading="lazy"
        className={`media ${className}`}
        {...(ai ? { 'data-ai-generated': 'true' } : {})}
        {...rest}
      />
    )
  }
  return (
    <div className={`media ph ph--${((tone - 1) % 6) + 1} ${className}`} role="img" aria-label={text || label || ui.a11y.placeholderImage} {...rest}>
      {label && <span className="ph__label">{label}</span>}
    </div>
  )
}

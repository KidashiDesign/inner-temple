/**
 * Image slot. Renders the real image when `src` is set, otherwise a neutral
 * placeholder so layouts and animations work before client photos exist.
 *
 * `ai` marks the image as AI-generated: the source gets data-ai-generated="true"
 * and the alt text (if any) a spoken notice. See data/images.js for the policy.
 */
export default function Media({ src, alt = '', ai = false, label, tone = 1, className = '', ...rest }) {
  if (src) {
    return (
      <img
        src={src}
        alt={ai && alt ? `${alt} (KI-generiertes Bild)` : alt}
        loading="lazy"
        className={`media ${className}`}
        {...(ai ? { 'data-ai-generated': 'true' } : {})}
        {...rest}
      />
    )
  }
  return (
    <div className={`media ph ph--${((tone - 1) % 6) + 1} ${className}`} role="img" aria-label={alt || label || 'Platzhalterbild'} {...rest}>
      {label && <span className="ph__label">{label}</span>}
    </div>
  )
}

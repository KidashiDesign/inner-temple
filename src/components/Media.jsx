/**
 * Image slot. Renders the real image when `src` is set, otherwise a neutral
 * placeholder so layouts and animations work before client photos exist.
 */
export default function Media({ src, alt = '', label, tone = 1, className = '', ...rest }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className={`media ${className}`} {...rest} />
  return (
    <div className={`media ph ph--${((tone - 1) % 6) + 1} ${className}`} role="img" aria-label={alt || label || 'Platzhalterbild'} {...rest}>
      {label && <span className="ph__label">{label}</span>}
    </div>
  )
}

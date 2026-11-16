/** Eyebrow + heading (with optional italic accent part) + optional paragraph. */
export default function SectionHeader({ eyebrow, title, accent, after, text, align = 'left', as: Tag = 'h2', className = '' }) {
  return (
    <div className={`stack head head--${align} ${className}`}>
      {eyebrow && <div className="eyebrow" data-blur>{eyebrow}</div>}
      <Tag data-blur>
        {title} {accent && <span className="accent">{accent}</span>} {after}
      </Tag>
      {text && <p data-blur>{text}</p>}
    </div>
  )
}

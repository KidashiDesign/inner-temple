export default function Badge({ children, variant = 'white' }) {
  return (
    <span className={`badge badge--${variant}`}>
      <span className="badge__dot" />
      {children}
    </span>
  )
}

const items = [
  { value: '15+', text: 'Platzhalter: Jahre Erfahrung' },
  { value: '8', text: 'Platzhalter: Lehrende im Team' },
  { value: '30+', text: 'Platzhalter: Kurse pro Woche' },
  { value: '100%', text: 'Platzhalter: Hingabe an die Praxis' },
]

export default function CounterRow() {
  return (
    <div className="counters" data-card-group>
      {items.map((it) => (
        <div className="counter" data-card key={it.text}>
          <div className="counter__value" data-counter={it.value}>{it.value}</div>
          <p>{it.text}</p>
        </div>
      ))}
    </div>
  )
}

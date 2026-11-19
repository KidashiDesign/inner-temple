import { useI18n } from '../i18n/I18nProvider.jsx'

export default function CounterRow() {
  const { ui, classes, instructors, home } = useI18n()
  // Zahlen werden aus den Daten abgeleitet, damit sie immer stimmen; die Texte stehen in ui.instructors.counters.
  const values = [instructors.length, classes.items.length, classes.levels.length, home.programs.length]
  const items = values.map((value, i) => ({ value: String(value), text: ui.instructors.counters[i] }))

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

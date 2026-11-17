import classes from '../data/classes.json'
import instructors from '../data/instructors.json'
import home from '../data/home.json'

// Zahlen werden aus den Daten abgeleitet, damit sie immer stimmen.
const items = [
  { value: String(instructors.length), text: 'Lehrende im Team' },
  { value: String(classes.items.length), text: 'Kurse im Programm' },
  { value: String(classes.levels.length), text: 'Stufen, vom ersten Mal bis therapeutisch' },
  { value: String(home.programs.length), text: 'Wege: Yoga, Meditation, Atemarbeit und Retreats' },
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

import Page from '../components/Page.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import InstructorCard from '../components/InstructorCard.jsx'
import CounterRow from '../components/CounterRow.jsx'
import instructors from '../data/instructors.json'

export default function Instructors() {
  return (
    <Page>
      <section className="thero">
        <div className="container">
          <div className="stack head head--center">
            <div className="eyebrow" data-banner>Unser Team</div>
            <h1 data-banner>Menschen, die Sie <span className="accent">begleiten</span></h1>
          </div>
          <div className="grid-4" data-banner>
            {instructors.map((p, i) => <InstructorCard key={p.slug} person={p} index={i} />)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="In Zahlen" title="Erfahrung, auf die Sie" accent="bauen" after="können" />
          <CounterRow />
        </div>
      </section>
    </Page>
  )
}

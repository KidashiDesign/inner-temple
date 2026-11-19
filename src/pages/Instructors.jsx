import Page from '../components/Page.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import InstructorCard from '../components/InstructorCard.jsx'
import CounterRow from '../components/CounterRow.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function Instructors() {
  const { ui, instructors } = useI18n()
  const t = ui.instructors
  useDocumentMeta({ title: ui.meta.titles.team, description: ui.meta.description })
  return (
    <Page>
      <section className="thero">
        <div className="container">
          <div className="stack head head--center">
            <div className="eyebrow" data-banner>{ui.common.ourTeam}</div>
            <h1 data-banner>{t.title} <span className="accent">{t.accent}</span></h1>
          </div>
          <div className="grid-4" data-banner>
            {instructors.map((p, i) => <InstructorCard key={p.slug} person={p} index={i} />)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader {...t.numbers} />
          <CounterRow />
        </div>
      </section>
    </Page>
  )
}

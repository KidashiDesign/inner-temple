import Page from '../components/Page.jsx'
import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <Page>
      <section className="nf">
        <div className="container stack head head--center">
          <div className="t-large" data-banner>404</div>
          <h1 className="t-h3" data-banner>Diese Seite gibt es nicht</h1>
          <div data-banner><Button to="/" variant="light">Zur Startseite</Button></div>
        </div>
      </section>
    </Page>
  )
}

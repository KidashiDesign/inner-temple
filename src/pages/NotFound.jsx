import Page from '../components/Page.jsx'
import Button from '../components/Button.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function NotFound() {
  const { ui, path } = useI18n()
  useDocumentMeta({ title: ui.meta.titles.notFound, description: ui.meta.description })
  return (
    <Page>
      <section className="nf">
        <div className="container stack head head--center">
          <div className="t-large" data-banner>404</div>
          <h1 className="t-h3" data-banner>{ui.notFound.title}</h1>
          <div data-banner><Button to={path('home')} variant="light">{ui.notFound.button}</Button></div>
        </div>
      </section>
    </Page>
  )
}

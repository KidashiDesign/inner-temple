import Page from '../components/Page.jsx'
import Media from '../components/Media.jsx'
import { IMG } from '../data/images.js'
import ContactForm from '../components/ContactForm.jsx'
import Faq from '../components/Faq.jsx'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useI18n } from '../i18n/I18nProvider.jsx'

export default function Contact() {
  const { ui, site } = useI18n()
  const { contact, social } = site
  useDocumentMeta({ title: ui.meta.titles.contact, description: ui.meta.description })
  return (
    <Page>
      <section className="chero">
        <div className="container chero__inner">
          <h1 className="t-large" data-banner>{ui.contact.title}</h1>
          <div className="chero__details">
            <div className="chero__info">
              <div data-banner><div className="t-h5">{ui.contact.visit}</div><p>{contact.address.join(', ')}</p></div>
              <div className="chero__links" data-banner>
                <a className="t-h6 accent link" href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                <a className="t-h6 accent link" href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </div>
            <div className="chero__side">
              <div className="chero__social t-h6" data-banner>
                {social.map((s) => <a key={s.label} className="link" href={s.href}>{s.label}</a>)}
              </div>
              <p data-banner>{ui.contact.text}</p>
            </div>
          </div>
          <div className="chero__image"><Media {...IMG.oellampen} data-hero-img /></div>
          <ContactForm />
        </div>
      </section>
      <Faq tinted />
    </Page>
  )
}

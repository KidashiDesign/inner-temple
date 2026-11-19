import Page from '../components/Page.jsx'
import Media from '../components/Media.jsx'
import { IMG } from '../data/images.js'
import ContactForm from '../components/ContactForm.jsx'
import Faq from '../components/Faq.jsx'
import site from '../data/site.json'

export default function Contact() {
  const { contact, social } = site
  return (
    <Page>
      <section className="chero">
        <div className="container chero__inner">
          <h1 className="t-large" data-banner>Kontakt</h1>
          <div className="chero__details">
            <div className="chero__info">
              <div data-banner><div className="t-h5">Besuchen Sie uns</div><p>{contact.address.join(', ')}</p></div>
              <div className="chero__links" data-banner>
                <a className="t-h6 accent link" href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
                <a className="t-h6 accent link" href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
            </div>
            <div className="chero__side">
              <div className="chero__social t-h6" data-banner>
                {social.map((s) => <a key={s.label} className="link" href={s.href}>{s.label}</a>)}
              </div>
              <p data-banner>Schreiben Sie uns für eine Probestunde, eine Einzelstunde oder ein Retreat. Wir melden uns mit einem Terminvorschlag.</p>
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

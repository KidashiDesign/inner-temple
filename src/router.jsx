import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Classes from './pages/Classes.jsx'
import Instructors from './pages/Instructors.jsx'
import InstructorDetail from './pages/InstructorDetail.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import { I18nProvider } from './i18n/I18nProvider.jsx'
import { LANGS, ROUTES } from './i18n/routes.js'

const PAGES = {
  home: <Home />,
  about: <About />,
  classes: <Classes />,
  team: <Instructors />,
  teamDetail: <InstructorDetail />,
  contact: <Contact />,
}

// Jede Seite gibt es in jeder Sprache; die Pfade stehen in i18n/routes.js.
export const router = createBrowserRouter([
  {
    element: <I18nProvider><RootLayout /></I18nProvider>,
    children: [
      ...LANGS.flatMap((lang) => Object.entries(PAGES).map(([key, element]) => ({ path: ROUTES[key][lang], element }))),
      { path: '*', element: <NotFound /> },
    ],
  },
])

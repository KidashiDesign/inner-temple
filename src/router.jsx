import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Classes from './pages/Classes.jsx'
import Instructors from './pages/Instructors.jsx'
import InstructorDetail from './pages/InstructorDetail.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/ueber-uns', element: <About /> },
      { path: '/kurse', element: <Classes /> },
      { path: '/team', element: <Instructors /> },
      { path: '/team/:slug', element: <InstructorDetail /> },
      { path: '/kontakt', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

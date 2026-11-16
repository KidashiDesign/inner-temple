import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/gsap.js'
import { scroll } from '../lib/scroll.js'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

/** Jumps to the top before the next page mounts, so its triggers start from scroll 0. */
function ScrollReset() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    if (scroll.lenis) scroll.lenis.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (reducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 })
    scroll.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      scroll.lenis = null
    }
  }, [])

  // Recalculate trigger positions once the new page, fonts and images are laid out.
  useEffect(() => {
    const refresh = () => { scroll.lenis?.resize(); ScrollTrigger.refresh() }
    refresh()
    const t = setTimeout(refresh, 300)
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => { clearTimeout(t); window.removeEventListener('load', refresh) }
  }, [pathname])

  return (
    <>
      <Navbar />
      <ScrollReset />
      <Outlet key={pathname} />
      <Footer />
    </>
  )
}

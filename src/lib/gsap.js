import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Same breakpoint as the layout: desktop animations start at 992px.
export const MQ = {
  desktop: '(min-width: 992px)',
  mobile: '(max-width: 991px)',
  reduce: '(prefers-reduced-motion: reduce)',
}

export const reducedMotion = () => window.matchMedia(MQ.reduce).matches

/** Read a design token (CSS custom property) as a plain value for GSAP. */
export const token = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export { gsap, ScrollTrigger, useGSAP }

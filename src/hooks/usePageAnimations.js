import { gsap, ScrollTrigger, useGSAP, MQ } from '../lib/gsap.js'

/**
 * Shared load and scroll reveals, driven by data attributes inside `scope`:
 *  data-banner       hero content, staggered blur-in on load
 *  data-hero-img     hero image, zoom out on load
 *  data-line         hero background lines, grow on load
 *  data-blur         text blocks, blur-in when scrolled into view
 *  data-image        image frames, fade up; inner [data-zoom] scales down
 *  data-card-group   container whose [data-card] children rise while scrolling
 *  data-flip-group   container whose [data-flip] children flip in
 *  data-counter      number that counts up, e.g. data-counter="15+"
 */
export function usePageAnimations(scope) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope)
      const mm = gsap.matchMedia()

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile, reduce: MQ.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions
        if (reduce) return // content stays visible, nothing moves

        const banner = q('[data-banner]')
        if (banner.length) {
          gsap.fromTo(
            banner,
            { opacity: 0, y: 80, filter: 'blur(20px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', stagger: 0.2, clearProps: 'filter' },
          )
        }
        const heroImg = q('[data-hero-img]')
        if (heroImg.length) gsap.fromTo(heroImg, { scale: 1.2 }, { scale: 1, duration: 1.4, ease: 'power2.out' })
        const lines = q('[data-line]')
        if (lines.length) gsap.fromTo(lines, { height: '0%' }, { height: '100%', duration: 2, ease: 'power2.out', stagger: 0.15 })

        q('[data-blur]').forEach((el) => {
          gsap.from(el, {
            opacity: 0, y: 80, filter: 'blur(20px)', duration: 0.8, ease: 'power3.out', clearProps: 'filter',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })

        q('[data-image]').forEach((el) => {
          gsap.from(el, {
            opacity: 0, y: 50, duration: 0.6, delay: 0.4, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
          const inner = el.querySelector('[data-zoom]')
          if (inner) {
            gsap.from(inner, { scale: 1.25, duration: 1.2, ease: 'none', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
          }
        })

        q('[data-card-group]').forEach((group) => {
          const cards = group.querySelectorAll('[data-card]')
          if (!cards.length) return
          const st = { trigger: group, start: 'top 90%', end: 'top 60%', scrub: 1, invalidateOnRefresh: true }
          if (desktop) gsap.fromTo(cards, { y: 200 }, { y: 0, ease: 'none', stagger: 0.35, scrollTrigger: st })
          else gsap.fromTo(cards, { opacity: 0, y: 80, filter: 'blur(20px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none', stagger: 0.35, scrollTrigger: st })
        })

        q('[data-flip-group]').forEach((group) => {
          const cards = group.querySelectorAll('[data-flip]')
          gsap.set(cards, { rotationX: -90, transformOrigin: 'center center' })
          ScrollTrigger.create({
            trigger: group, start: 'top bottom', once: true,
            onEnter: () => gsap.to(cards, { rotationX: 0, duration: 1.1, ease: 'power2.out', stagger: 0.2 }),
          })
        })

        q('[data-counter]').forEach((el) => {
          const raw = el.getAttribute('data-counter')
          const target = parseFloat(raw.replace(/[^0-9.]/g, '')) || 0
          const suffix = raw.replace(/[0-9.,]/g, '')
          const obj = { value: 0 }
          gsap.to(obj, {
            value: target, duration: 2, ease: 'power1.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: () => { el.textContent = Math.floor(obj.value).toLocaleString('de-DE') + suffix },
          })
        })
      })
    },
    { scope },
  )
}

// Holds the single Lenis instance so components can scroll programmatically.
export const scroll = { lenis: null }

export function scrollToTarget(target) {
  if (scroll.lenis) scroll.lenis.scrollTo(target, { offset: -80 })
  else document.querySelector(target)?.scrollIntoView()
}

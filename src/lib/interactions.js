import { gsap } from './gsap.js'

/**
 * A group in which exactly one item is active.
 * apply(el, index, isActive, animate, otherIndex) sets or tweens one item.
 */
export function activeGroup(items, { initial = 0, event = 'mouseenter', apply, resetOn, signal }) {
  let active = Math.min(initial, items.length - 1)
  items.forEach((el, i) => apply(el, i, i === active, false, active))
  const go = (i) => {
    if (i === active) return
    const prev = active
    active = i
    apply(items[prev], prev, false, true, i)
    apply(items[i], i, true, true, prev)
  }
  items.forEach((el, i) => el.addEventListener(event, () => go(i), { signal }))
  if (resetOn) resetOn.addEventListener('mouseleave', () => go(initial), { signal })
}

/** Paused timeline that plays on mouseenter and reverses on mouseleave. */
export function hoverTimeline(el, build, signal) {
  const tl = gsap.timeline({ paused: true })
  build(tl, el)
  el.addEventListener('mouseenter', () => tl.play(), { signal })
  el.addEventListener('mouseleave', () => tl.reverse(), { signal })
  return tl
}

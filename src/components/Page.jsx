import { useRef } from 'react'
import { usePageAnimations } from '../hooks/usePageAnimations.js'

/** Page wrapper: provides <main> and runs the shared reveal animations. */
export default function Page({ children, className = '' }) {
  const ref = useRef(null)
  usePageAnimations(ref)
  return <main ref={ref} className={className}>{children}</main>
}

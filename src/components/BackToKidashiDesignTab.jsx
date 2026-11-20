import { useState } from 'react'
import { useI18n } from '../i18n/I18nProvider.jsx'

const HREF = 'https://www.kidashidesign.com/'
const LABEL = 'Back to Kidashi Design'
const STORAGE_KEY = 'inner-temple.kidashiTabCollapsed'
// Muss zum Breakpoint von .kidashi-tab in components.css passen.
const MOBILE_QUERY = '(max-width: 700px)'

/** Wahl dieser Sitzung zuerst, sonst nur auf kleinen Bildschirmen eingeklappt. */
function initialCollapsed() {
  if (typeof window === 'undefined') return false
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    if (stored !== null) return stored === '1'
  } catch {
    // Storage kann blockiert sein, dann gilt der Breakpoint-Standard.
  }
  return window.matchMedia(MOBILE_QUERY).matches
}

const Chevron = ({ size, className }) => (
  <svg className={className} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
    <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** Sticky Seiten-Tab am linken Rand, auf jeder Route sichtbar (einmal in RootLayout eingebunden). */
export default function BackToKidashiDesignTab() {
  const { ui } = useI18n()
  const [collapsed, setCollapsed] = useState(initialCollapsed)

  const toggle = () => {
    const next = !collapsed
    setCollapsed(next)
    try {
      window.sessionStorage.setItem(STORAGE_KEY, next ? '1' : '0')
    } catch {
      // Speichern ist nur Komfort.
    }
  }

  return (
    <div className={collapsed ? 'kidashi-tab kidashi-tab--collapsed' : 'kidashi-tab'}>
      <a className="kidashi-tab__link" id="kidashi-tab-link" href={HREF}>
        <Chevron size={16} className="kidashi-tab__icon" />
        <span className="kidashi-tab__label">{LABEL}</span>
      </a>
      <button
        type="button"
        className="kidashi-tab__toggle"
        aria-controls="kidashi-tab-link"
        aria-expanded={!collapsed}
        aria-label={collapsed ? ui.common.kidashiTabShow : ui.common.kidashiTabHide}
        onClick={toggle}
      >
        <Chevron size={14} className="kidashi-tab__chevron" />
      </button>
    </div>
  )
}

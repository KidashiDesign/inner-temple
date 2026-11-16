const base = { width: '1em', height: '1em', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }

export const Arrow = (p) => (<svg {...base} {...p}><path d="M7 17 17 7M9 7h8v8" /></svg>)
export const Plus = (p) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>)
export const Star = (p) => (<svg {...base} {...p}><path d="M12 3c.6 4.6 4.4 8.4 9 9-4.6.6-8.400 4.4-9 9-.6-4.6-4.400-8.400-9-9 4.600-.6 8.400-4.400 9-9Z" /></svg>)
export const Lotus = (p) => (<svg {...base} {...p}><path d="M12 4c2.500 2.800 2.500 8.200 0 12-2.500-3.800-2.500-9.200 0-12Z" /><path d="M4 10c4 .2 7 2.600 8 6-4 .4-7.200-2-8-6ZM20 10c-4 .2-7 2.600-8 6 4 .4 7.200-2 8-6Z" /><path d="M5 19h14" /></svg>)
export const Clock = (p) => (<svg {...base} {...p}><circle cx="12" cy="12" r="8.500" /><path d="M12 7.500V12l3 2" /></svg>)
export const User = (p) => (<svg {...base} {...p}><circle cx="12" cy="8" r="3.500" /><path d="M5 20c.8-3.600 3.600-5.500 7-5.500s6.200 1.900 7 5.500" /></svg>)
export const Pin = (p) => (<svg {...base} {...p}><path d="M12 21c4-4.500 6-7.800 6-10.500a6 6 0 1 0-12 0C6 13.200 8 16.500 12 21Z" /><circle cx="12" cy="10.500" r="2" /></svg>)
export const Check = (p) => (<svg {...base} {...p}><path d="m5 12.500 4.500 4.500L19 7.500" /></svg>)
export const Play = (p) => (<svg {...base} {...p} fill="currentColor" stroke="none"><path d="M8 5.500v13l11-6.500-11-6.500Z" /></svg>)
export const ArrowDown = (p) => (<svg {...base} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>)

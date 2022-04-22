import events from '../tools/events.js'

export default function({element}) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  element.addEventListener('click', () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  }))

  const init = ({scrolled}) => {
    if ( scrolled ) {
      return element.removeAttribute('tabindex')
    }

    return element.setAttribute('tabindex', '-1')
  }

  events.subscribe('SCROLLED', init)

  init({scrolled: false})
}

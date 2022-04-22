const SAFETY_ZONE = 10

export default function({element}) {
  const hash = window.location.hash.substr(1)
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (element.getAttribute('id') !== hash) return

  element.classList.add('state-highlighted')

  const bounds = element.getBoundingClientRect()
  const top = bounds.top - SAFETY_ZONE

  element.querySelector('a').focus()

  window.scrollTo({
    top,
    left: 0,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  })
}

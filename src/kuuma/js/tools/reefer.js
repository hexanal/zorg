import stepper from './stepper.js'

export const SPRING_SNAP = { stiffness: 420, damping: 20 }
export const SPRING_TIGHT = { stiffness: 350, damping: 16 }
export const SPRING_LOOSE = { stiffness: 400, damping: 12 }
export const SPRING_SOFT = { stiffness: 180, damping: 20 }

// FIXME use registry to be able to hook/unhook from the rAF
export function onFrame(fn, timestamp = 0) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if ( !prefersReducedMotion ) fn(timestamp)

  requestAnimationFrame( function(timestamp) {
    onFrame(fn, timestamp)
  } )
}

export const onReef = onFrame

export default function reefer(startWith = 0) {
  let target = startWith
  let interpolated = startWith
  let currentVelocity = 0
  let spring = { stiffness: 250, damping: 25 }

  // init
  onFrame( () => framer(target, interpolated, currentVelocity) )

  // on every frame, do this
  function framer(target, start = 0, velocity = 0) {
    if (typeof target !== 'number' || typeof start !== 'number') return

    const [nextValue, nextVelocity] = stepper( start, velocity, target, spring.stiffness, spring.damping )

    interpolated = nextValue
    currentVelocity = nextVelocity
  }

  function set(newTarget, newSpring) {
    if ( typeof newTarget !== 'number' ) {
      interpolated = newTarget
      return
    }

    if ( newSpring ) spring = { ...newSpring }

    target = newTarget
  }

  function get() {
    return interpolated
  }

  const methods = {
    setSpring: newSpringConfig => {
      spring = { ...newSpringConfig }
      return methods
    },

    set,
    get,

    getCurrentTarget: () => target,

    instantSet: value => {
      target = value
      interpolated = value
    },
  }

  return methods
}

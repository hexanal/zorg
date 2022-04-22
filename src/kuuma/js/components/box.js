import stater from '../tools/stater.js'
import events from '../tools/events.js'
import focuser from '../tools/focuser.js'
import reefer, { onReef, SPRING_SNAP } from '../tools/reefer.js'
// import { getHash, setHash } from '../tools/hashish.js'

const ZINDEX = 10
const ZS = []

export default function({ element, children }) {
  const state = {
    id: element.dataset.boxId || '',
    shortcut: element.dataset.boxShortcut || false,
    active: stater(false),
  }
  const opacity = reefer(0)
  const transform = reefer(-0.5) // rem
  const shadow = reefer(0) // rem

  state.active.onChange( active => {
    document.documentElement.dataset.box = active ? state.id : ''
    element.classList.toggle('state-box-active', active)

    ZS[active ? 'push' : 'pop']( element ) // naive z-index management
    element.style.zIndex = ZS.length + ZINDEX

    opacity.set( active ? 1 : 0, SPRING_SNAP )
    transform.set( active ? 0 : 1, SPRING_SNAP )
    shadow.set( active ? 0.5 : 0, SPRING_SNAP)

    focuser(active, element)
    // setHash( state.id, active )
  })

  const toggle = () => state.active.set( !state.active.get() )
  const open = () => state.active.set(true)
  const close = () => state.active.set(false)

  events.subscribe(`TOGGLE_BOX_${state.id.toUpperCase()}`, toggle)
  events.subscribe(`SHOW_BOX_${state.id.toUpperCase()}`, open)
  events.subscribe(`CLOSE_BOX_${state.id.toUpperCase()}`, close)
  events.subscribe('PAGE_CHANGED', close)

  children['close'].addEventListener('click', close)
  children['bg'].addEventListener('click', close)

  // if hash present, open box by default (on load)
  // if ( getHash( state.id ) ) open()

  state.active.update()

  onReef( () => {
    element.style.opacity = opacity.get()
    children['wrap'].style.transform = `translateY(${transform.get() * 3}rem)`
    children['wrap'].style.boxShadow = `${shadow.get()}rem ${shadow.get()}rem 0 0 var(--color-primary)`
    children['close'].style.transform = `translateY(${transform.get() * -4}rem)`
    children['bg'].style.opacity = opacity.get() * 0.9
  })

  const onKeyUp = e => {
    const focused = document.activeElement.tagName
    if ( focused === 'TEXTAREA' || focused === 'INPUT' ) return

    const { active, shortcut } = state

    if ( active.get() && e.key === 'Escape') close()
    if ( shortcut && e.key === shortcut ) toggle()
  }

  document.addEventListener('keyup', onKeyUp)

  return function() {
    events.unsubscribe(`TOGGLE_BOX_${state.get().id.toUpperCase()}`, toggle)
    events.unsubscribe(`SHOW_BOX_${state.get().id.toUpperCase()}`, open)
    events.unsubscribe(`CLOSE_BOX_${state.get().id.toUpperCase()}`, close)
  }
}

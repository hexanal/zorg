import events from '../tools/events.js'

export default function() {
  let zoomed = window.localStorage.getItem('a11y_use_zoom') || 'no'

  document.documentElement.classList.toggle('a11y_use_zoom', zoomed === 'yes')

  const setZoom = function( zoomed ) {
    document.documentElement.classList.toggle('a11y_use_zoom', zoomed === 'yes')
    window.localStorage.setItem('a11y_use_zoom', zoomed)
  }

  const onKeyUp = e => {
    const focused = document.activeElement.tagName
    if ( focused === 'TEXTAREA' || focused === 'INPUT' ) return

    switch( e.key ) {
      case '=':
        setZoom('yes')
        break
      case '-':
        setZoom('no')
        break;
    }
  }

  document.addEventListener('keyup', onKeyUp)

  events.subscribe('A11Y_SET_LARGE_FONT', setZoom)
}

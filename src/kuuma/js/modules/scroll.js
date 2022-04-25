import events from '../tools/events.js'

const HAS_SCROLLED_THRESHOLD = 5; // pixels scrolled before slapping on the `scrolled` data attribute

export default function() {
  const state = {
    y: 0,
    scrolled: false,
  }

  const onScroll = e => {
    const { scrollY } = window;

    state.y = scrollY
    state.scrolled = state.y > HAS_SCROLLED_THRESHOLD

    document.documentElement.dataset.scrolled = state.scrolled

    events.dispatch('SCROLLED', state)
  }

  document.addEventListener('scroll', onScroll)
}

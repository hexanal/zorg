import moduler from '../tools/moduler.js'
import events from '../tools/events.js'

const TRANSITION_DURATION = 600;

export default function() {
  const leave = ({ current, next }) => {
    return new Promise(resolve => {
      events.dispatch('PAGE_LEAVE', { current, next })
      document.body.classList.add('transition')

      setTimeout(() => {
        resolve();
      }, TRANSITION_DURATION)
    });
  }

  const liftoff = barba => {
    barba.default.init({
      // debug: true,
      timeout: 10000,
      prevent: ({ el }) => el.dataset && el.dataset.transition === 'none',
      transitions: [

        {
          name: 'default-transition',

          before() {
            // moduler.kill()
          },

          leave,

          beforeEnter({ current, next }) {
            document.body.classList.remove('transition')
            current.container.style.position = 'absolute'
          },

          enter({ next }) {
            return new Promise(resolve => {
              window.scrollTo(0, 0)
              resolve()
            });
          },

          afterEnter({ current, next }) {
            moduler.mount(next.container)
            events.dispatch('PAGE_CHANGED', { current, next })
          }
        },

        // TODO
        // {
        //   name: 'self',

        //   leave() {
        //     events.dispatch('SAME_PAGE')
        //   },
        // },

      ]
    })
  };

  import('../tools/barba.mjs')
    .then(liftoff)
    .catch(err => {
      console.error(err.message)
    })
}

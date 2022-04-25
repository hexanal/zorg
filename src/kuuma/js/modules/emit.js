import events from '../tools/events.js'

export default function({element}) {
  const { event, eventPayload } = element.dataset

  element.addEventListener('click', e => {
    e.preventDefault()
    console.log('clicked')
    events.dispatch( event, eventPayload )
  })
}

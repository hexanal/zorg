const DEBUG_EVENTS = false

const events = {
  subscribers: [],

  subscribe: (id, cb) => {
    events.addSubscriber(id, cb)
    return () => events.removeSubscriber(id, cb) // call to remove?
  },
  unsubscribe: (id, cb) => { events.removeSubscriber(id, cb) },
  dispatch: (id, payload) => events.dispatchToSubscribers(id, payload),

  addSubscriber: (id, cb) => {
    if ( DEBUG_EVENTS ) console.log(`[events] adding subscriber to '${id}' events`)
    events.subscribers.push({
      id,
      cb,
    })
  },

  removeSubscriber: (id, cb) => {
    if ( DEBUG_EVENTS ) console.log(`[events] removing subscriber from '${id}' events`)
    events.subscribers = events.subscribers.filter(sub => (sub.id !== id && sub.cb !== cb) )
  },

  dispatchToSubscribers: (eventId, payload) => {
    if ( DEBUG_EVENTS ) {
      console.group('[events] dispatch')
        console.log(`[events] dispatching payload to '${eventId}' subscribers`)
        if ( payload ) {
          console.log(`[events] with payload:`)
          console.log( payload )
        }
        console.log(`[events] subscribers: `)
        console.log( events.subscribers )
      console.groupEnd()
    }

    events.subscribers.map(({id, cb}) => {
      if (id === eventId) return cb(payload)
    })
  },
}

export default events
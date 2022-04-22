export default function stater( startValue ) {
  let value = startValue
  let callbacks = []

  return {
    get: () => value,

    set: newValue => {
      value = newValue
      callbacks.map(cb => cb(value) )
      return value
    },

    onChange: cb => {
      callbacks.push(cb)
      return cb
    },

    update: () => {
      callbacks.map(cb => cb(value) )
      return value
    }
  }
}

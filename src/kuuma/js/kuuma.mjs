import moduler from './tools/moduler.js'

/**
 * What's going on?
 * ----------------
 *
 * `moduler.mount` accepts a single DOM element; it will find all elements with
 * the attribute [data-component] and load the appropriate JS modules for them.
 *
 * A module is a function which is passed an object of this shape:
 *
 * { element, children }
 *
 * -> `element` is the DOM element found by `moduler` (it has a [data-component]
 *   attribute)
 *
 * -> `children` are all the elements with a `[data-child]` attribute found
 *   inside `element`
 */

moduler.mount( document.getElementById('✷') )

// ~~

console.info(`✦✦✦ Welcome to Kuuma Kesä! ✦✦✦`)

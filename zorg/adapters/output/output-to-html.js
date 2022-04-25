const log = require('../../lib/log')
const builder = require('./builder')

module.exports = function( item, config ) {
  if (!item.component || !item.url) return item // don't build if there is no attached component or URL
  builder( item, config )
  log(`[output-to-html] rendering page '${item.title}' at url '${item.url}'`)

  return item
}

const marked = require('marked')

module.exports = function( items ) {
  return items.map( item => ({ ...item, content: marked.parse( item.body ) }) )
}

const orderBy = require('lodash.orderby')

module.exports = function( items ) {
  return orderBy( orderBy(items, 'meta.type', 'asc'),
    'meta.date',
    'desc'
  )
}

const { write } = require('../lib/files')

const ALLOWED_TYPES = ['page', 'post']

const exportToJson = function( items ) {
  items.map( item => {
    if ( !item.meta ) return
    if ( !ALLOWED_TYPES.includes( item.meta.type ) ) return

    const stringified = JSON.stringify( item )
    const destination = `./public${item.meta.url}`

    write(destination, `data.json`, stringified)
  })

  return items
}

module.exports = exportToJson

const fs = require('fs')

module.exports = function( items, websiteConfig ) {
  return items.map( item => {
    const file = fs.readFileSync(item, 'utf8')
    const contents = file.toString()
    const json = JSON.parse(contents)

    return json
  })
}

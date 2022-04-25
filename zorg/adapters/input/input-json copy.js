const fs = require('fs')

module.exports = function( items, website ) {
  return items.map( item => {
    const file = fs.readFileSync(item, 'utf8')
    const contents = file.toString()
    let json = {}

    try {
      json = JSON.parse(contents)
    } catch(error) {
      console.error(`error while parsing json file '${item}'`)
      throw err
    }

    return json
  })
}

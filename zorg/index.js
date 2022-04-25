// const log = require('./lib/log')
const styles = require('./styles')
const assets = require('./assets')
const html = require('./html')
const { websites } = require('../CONFIG')

const build = function() {
  return websites.map( website =>
    Promise.all([
      html.build(website),
      styles.build(website),
      assets.build(website)
    ])
  )
}

const watch = function() {
  console.log('~~')

  return websites.map( website => 
    Promise.all([
      html.watch(website),
      styles.watch(website),
      assets.watch(website)
    ])
  )
}

// when calling zorg through node directly
if ( process.argv.includes('--build') ) build()
if ( process.argv.includes('--watch') ) watch()

// when using zorg from other scripts
module.exports = { build, watch }

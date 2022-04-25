const glob = require('glob')
const log = require('./lib/log')
const watcher = require('./lib/watcher')

const adapters = [
  require('./adapters/input/input-json'), // first, parse JSON files
  // -> here... anything we wanna do to *massage* the data
  require('./adapters/output/output-to-html'), // output all that to HTML
]

const build = config => {
  const start = Date.now() // start timer
  const items = glob.sync( config.html.contentSrc, {}) // get the items @todo: make this kind of customizable, like for instance provide any source for the content
  // const processed = items.map(adapters.reduce( (acc, fn) => fn(acc, config), items)
  const processed = items.map( item => adapters.reduce( (acc, fn) => fn(acc, config), item) )
  log(`number of items found: ${items.length}`)
  log(`number of items after processing: ${processed.length}`)
  const time = Date.now() - start // time diff
  log(`build html for website [${config.name}] ~~ ${time}ms`)

  return Promise.resolve();
}

const watch = config => watcher({
  glob: config.html.watch,
  type: 'html',
  callback: () => build(config)
})

module.exports = { build, watch }

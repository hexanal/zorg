const glob = require('glob')
const log = require('./lib/log')
const builder = require('./lib/builder')
const watcher = require('./lib/watcher')

// Adapters are functions that go through the content to "process" it
const adapters = [
  // require('./adapters/default-meta'),
  require('./adapters/json'),

  // require('./adapters/page-meta'),

  // require('./adapters/relationship'), // determines the relationship with other pages (i.e. is it a parent page?, how deep in the hierarchy? does it have children pages? is it related in any other way to other pages?)
  // require('./adapters/link-checker'), // checks whether internal links are resolvable when checking against the actual sitemap
  // require('./adapters/export-to-json'),

  // for any type
  // require('./adapters/shortcodes'),
  // require('./adapters/modules'),
  // require('./adapters/markdown'),
  // require('./adapters/aliases'),
  // require('./adapters/sitemap-xml'),
]

const build = website => {
  const start = Date.now() // start timer
  const items = glob.sync( website.contentSrc, {}) // get the items @todo: make this kind of customizable, like for instance provide any source for the content
  const processed = adapters.reduce( (acc, fn) => fn(acc, website), items)
  const markup = builder(processed, website) // HTML output; also uses the website object for access to the configuration
  log(`number of items found: ${items.length}`)
  const time = Date.now() - start // time diff
  log(`build html for website [${website.name}] ~~ ${time}ms`)

  return { markup, time }
}

const watch = website => watcher({
  glob: website.watchFiles,
  type: 'html',
  callback: build
})

module.exports = { build, watch }

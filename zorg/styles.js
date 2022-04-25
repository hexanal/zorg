const sass = require('sass')
const { write } = require('./lib/files')
const log = require('./lib/log')
const watcher = require('./lib/watcher')

const build = website => {
  const { styles = null } = website
  const { src = null, out = null, dest = null, filename = null } = styles || {}
  if (!src) {
    log(`error: missing 'src' configuration key in the 'styles' processor`) // @todo
    return;
  }
  if (!out) {
    log(`error: missing 'out' configuration key in the 'styles' processor`) // @todo
    return;
  }
  if (!dest) {
    log(`error: missing 'dest' configuration key in the 'styles' processor`) // @todo
    return;
  }
  if (!filename) {
    log(`error: missing 'filename' configuration key in the 'styles' processor`) // @todo
    return;
  }
  const compiledCSS = sass.renderSync({
    file: src,
    outputStyle: 'compressed',
    sourceMap: process.NODE_ENV === 'development',
    outFile: out
  })

  const time = compiledCSS.stats.duration

  return write(dest, filename, compiledCSS.css)
    .then( () => {
      log( `styles: bundled css (from sass) ~~ ${time}ms` )
    })
}

const watch = website => watcher({
  glob: website.styles.watch,
  type: 'sass',
  callback: () => build(website)
})

module.exports = { build, watch }

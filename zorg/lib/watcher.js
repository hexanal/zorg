const chokidar = require('chokidar')
const log = require('./log')

module.exports = function({ glob, type, callback }) {
  return () => {
    const watcher = chokidar.watch(glob, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true
    })

    return watcher
      .on('ready', () => log( `watch: ${type}`))
      .on('change', path => {
        console.log(`~~`)
        log( `watch: ${type} changed @ '${path}'`, true)
        callback()
      })
  }
}

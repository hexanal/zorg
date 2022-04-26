import chokidar from 'chokidar';
import log from './log.js';

// @todo
// make tasks much easier to create with
// 'auto-watch'
// dynamic *task* like tasks(['app', 'html', 'assets', 'chunks', 'styles'])
// auto import, or tasks({app, html, assets, chunks, styles})
// from config

function watcher({ glob, type, callback }) {
  const watched = chokidar.watch(glob, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
  })

  return watched
    .on('ready', () => log( `watch: ${type}`))
    .on('change', path => {
      console.log(`~~`)
      log( `watch: ${type} changed @ '${path}'`, true)
      callback()
    })
}


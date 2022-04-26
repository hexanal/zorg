import chokidar from 'chokidar';
import log from './log.js';

export default function watcher({ glob, type, callback }) {
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

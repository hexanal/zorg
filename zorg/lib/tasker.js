import chokidar from 'chokidar';
import log from './log.js';
import debug from './debug.js';
import error from './error.js';

export function watcher(type, glob, callback) {

}

/**
 * @todo
 * 
 * @param {string} type the type of task
 * @param {function} callback a function to run for this task
 * @returns 
 */
export default function tasker(type, callback) {
  if (!type) {
    error(`no type specified for task`, 'tasker');
    return { run: () => {}, watch: () => {} } // @todo
  }
  if (!callback) {
    error(`no callback specified for task type: '${type}'`, 'tasker');
    return { run: () => {}, watch: () => {} } // @todo
  }

  const run = (options, site) => {
    debug(`running task: '${type}' (site: ${site.name})`, 'tasker run()');
    callback(options, site);
  };

  const watch = (options, site) => {
    const { watch: glob = [] } = options || {};
    const watched = chokidar.watch(glob, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true
    });

    callback(options, site); // @note call once to start with :)
  
    return watched
      .on('ready', () => debug(`'task '${type}' is watching: '${glob}'`), 'tasker')
      .on('change', path => {
        log(`'${type}' changed at path: '${path}'`, 'tasker');
        callback(options, site);
      });
  }

  return { run, watch };
}

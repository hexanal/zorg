import error from './error.js';
import watcher from './watcher.js';

export default function task(type, callback) {
  if (!type) {
    error(`no type specified for task`);
    return { run: () => {}, watch: () => {} } // @todo
  }
  if (!callback) {
    error(`no callback specified for task type: '${type}'`);
    return { run: () => {}, watch: () => {} } // @todo
  }

  const run = (options, site) => callback(options, site);
  const watch = (options, site) => {
    const { id = 'task', watch: glob = [] } = options || {};
    return watcher({ id, glob, callback: run});
  }

  return { type, run, watch }
}

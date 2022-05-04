import chokidar from 'chokidar';

/**
 * @todo
 * 
 * @param {string} type the type of task
 * @param {function} callback a function to run for this task
 * @returns 
 */
export default function createTask(type, callback) {
  if (!type) {
    return { run: () => {}, watch: () => {} } // @todo
  }
  if (!callback) {
    return { run: () => {}, watch: () => {} } // @todo
}
  const run = (options, site, app) => {
    return Promise.resolve(callback(options, site, app));
  }

  const watch = (options, site, app) => {
    const { watch: glob = [] } = options || {};

    chokidar
      .watch(glob, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
      })
      .on('ready', () => console.log('watching', type))
      .on('change', path => {
        console.log(`'${path}' changed`);
        callback(options, site, app);
      });

    callback(options, site, app); // @note call once to start with :)
  }

  return { run, watch };
}

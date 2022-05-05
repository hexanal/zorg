import chokidar from 'chokidar';

/**
 * @todo
 * 
 * @param {string} type the type of task
 * @param {function} callback a function to run for this task
 * @returns 
 */
export default function createTask(callback) {
  if (!callback) {
    return { run: () => {}, watch: () => {} } // @todo
  }

  const run = (options, site) => {
    return Promise.resolve(callback(options, site));
  }

  const watch = (options, site) => {
    const { watch: glob = [] } = options || {};

    chokidar
      .watch(glob, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
      })
      .on('ready', () => console.log(`watching glob: '${glob}'`))
      .on('change', path => {
        console.log(`'${path}' changed`);
        // @todo try to merge path into the options to get `path` as `src`
        callback(options, site);
      });

    callback(options, site); // @note call once to start with :)
  }

  return { run, watch };
}

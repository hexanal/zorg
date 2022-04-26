import glob from 'glob';
import log from '../lib/log.js';
import watcher from '../lib/watcher.js';

export function run(config) {
  const start = Date.now(); // start timer
  return Promise.all([
    import('../adapters/input/input-json.js'), // first, parse JSON files
    import('../adapters/logger/logger.js'), // first, parse JSON files
    // -> here... anything we wanna do to *massage* the data
    // import('../adapters/output/output-to-html.js'), // output all that to HTML
    import('../adapters/output/react.js'), // output all that to HTML
  ])
    .then(adapters => {
      const items = glob.sync( config.html.contentSrc, {}) // get the items @todo: make this kind of customizable, like for instance provide any source for the content
      // const processed = items.map(adapters.reduce( (acc, fn) => fn(acc, config), items)
      const processed = items.map( item => adapters.reduce( (acc, fn) => fn.default(acc, config), item) );
      log(`number of items found: ${items.length}`);
      log(`number of items after processing: ${processed.length}`);
      const time = Date.now() - start; // time diff
      log(`build html for website [${config.name}] ~~ ${time}ms`);
    });
}

export function watch(config) {
  return watcher({
    glob: config.html.watch,
    type: 'html',
    callback: () => run(config)
  });
}

export default { run, watch }

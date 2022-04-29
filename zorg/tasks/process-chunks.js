import glob from 'glob';
import info from '../lib/info.js';
import error from '../lib/error.js';

// @todo maybe stick tasks in there?!?!?
export default function processChunks(options, site) {
  const start = Date.now(); // start timer
  return Promise.all([
    import('../functions/inputJson.js'), // first, parse JSON files
    // import('../functions/logItem.js'), // log item if debug is true
    import('../functions/outputToReact.js'), // output all that to HTML
  ])
    .then(processors => {
      const { src = null } = options || {};
      if (!src) {
        error(`'process-chunks' task requires an 'src' key`, 'process-chunks');
        error(`the value should be the path to the website's JSON chunks!`, 'process-chunks');
        error(`(e.g. './chunks/**/*.json')`, 'process-chunks');
        return;
      }
      // get the items @todo: make this kind of customizable, like for instance provide any source for the content
      const paths = glob.sync(src, {}); 
      Promise.all(paths.map( item => processors.reduce( (acc, fn) => fn.default(acc, site), item) ))
        .then(() => {
          const time = Date.now() - start; // time diff
          info(`processed chunks for website [${site.name}] ~~ ${time}ms`, 'process-chunks');
        });
    });
}

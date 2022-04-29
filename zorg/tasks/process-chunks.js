import glob from 'glob';
import log from '../lib/log.js';
import error from '../lib/error.js';
import task from '../lib/task.js';

// @todo maybe stick tasks in there?!?!?
function processChunks(options, site) {
  const start = Date.now(); // start timer
  return Promise.all([
    import('../functions/inputJson.js'), // first, parse JSON files
    import('../functions/logItem.js'), // log item if debug is true
    import('../functions/outputToJson.js'), // output all that to a JSON file
    import('../functions/outputToReact.js'), // output all that to HTML
  ])
    .then(processors => {
      const { src = null } = options || {};
      // @todo!
      if (!src) return error(`process-chunks task requires an 'src' key, with the path to the website's JSON chunks!`)
      // get the items @todo: make this kind of customizable, like for instance provide any source for the content
      const paths = glob.sync(src, {}); 
      Promise.all(paths.map( item => processors.reduce( (acc, fn) => fn.default(acc, site), item) ))
        .then(() => {
          const time = Date.now() - start; // time diff
          // @todo?
          log(`processed chunks for website [${site.name}] ~~ ${time}ms`);
        });
    });
}

export default task('process-chunks', processChunks);

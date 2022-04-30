import glob from 'glob';
import info from '../lib/info.js';
import error from '../lib/error.js';
import * as processorsList from './index.js';

// @todo maybe stick tasks in there?!?!?
export default function processChunks(options, site) {
  const start = Date.now(); // start timer
  const { src = null, processors = []} = options || {};
  if (!src) {
    error(`'input' task requires an 'src' key`, 'process-chunks');
    error(`the value should be the path to the website's content chunks!`, 'process-chunks');
    error(`(e.g. './chunks/**/*.json')`, 'process-chunks');
    return;
  }
  // get the items @todo: make this kind of customizable, like for instance provide any source for the content
  const paths = glob.sync(src, {}); 
  paths.map( chunk => processors.reduce((acc, type) => processorsList[type](acc, site), chunk));

  const time = Date.now() - start; // time diff
  info(`processed chunks for website [${site.name}] ~~ ${time}ms`, 'process-chunks');
}

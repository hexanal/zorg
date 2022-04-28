import sass from 'sass';
import { write } from '../lib/files.js';
import log from '../lib/log.js';
import watcher from '../lib/watcher.js';

export function run(config) {
  const { styles = null } = config;
  const { src = null, dest = null, filename = null } = styles || {};
  // if (!src) {
  //   log(`error: missing 'src' configuration key in the 'styles' processor`); // @todo use schema validator
  //   return;
  // }
  // if (!dest) {
  //   log(`error: missing 'dest' configuration key in the 'styles' processor`); // @todo
  //   return;
  // }
  // if (!filename) {
  //   log(`error: missing 'filename' configuration key in the 'styles' processor`); // @todo
  //   return;
  // }
  const compiledCSS = sass.renderSync({
    file: src,
    outputStyle: 'compressed',
    sourceMap: process.NODE_ENV === 'development',
    outFile: dest
  });

  const time = compiledCSS.stats.duration;

  return write(dest, filename, compiledCSS.css)
    .then( () => {
      log( `styles: bundled css (from sass) ~~ ${time}ms` );
    })
}

export function watch(config) {
  return watcher({
    glob: config.styles.watch,
    type: 'sass',
    callback: () => run(config)
  });
}

export default { run, watch }

import sass from 'sass';
import task from '../lib/task.js';
import log from '../lib/log.js';
import { write } from '../lib/files.js';

function compileSass(options) {
  const { src = null, dest = null, filename = null } = options || {};
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

export default task('scss', compileSass);

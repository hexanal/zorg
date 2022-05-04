import sass from 'sass';
import { write } from '../files.js';

export default function compileSass(options, site) {
  const { DEV_MODE = false } = site || {};
  const { src = null, dest = null, filename = null } = options || {};
  const compiledCSS = sass.renderSync({
    file: src,
    outputStyle: 'compressed',
    sourceMap: DEV_MODE,
    outFile: dest
  });
  const time = compiledCSS.stats.duration;

  return write(dest, filename, compiledCSS.css)
    .then( () => {
      console.log( `styles: bundled css (from sass) ~~ ${time}ms`);
    })
}

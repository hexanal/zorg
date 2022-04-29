import esbuild from 'esbuild';
import glob from 'glob';
import task from '../lib/task.js';

function build(options) {
  const { src, dest } = options || {};

  return esbuild.build({
    entryPoints: glob.sync(src, {}),
    bundle: true,
    format: 'esm',
    outdir: dest,
  });
}
 
export default task('esbuild', build);
// import log from '../lib/log.js';
import esbuild from 'esbuild';
import glob from 'glob';
import watcher from '../lib/watcher.js';

export function run(config) {
  const { app } = config || {};
  const { src, dest } = app || {};

  return esbuild.build({
    entryPoints: glob.sync(src, {}),
    inject: ['./zorg/lib/react-shim.js'],
    bundle: true,
    outdir: dest,
  });
}

export function watch(config) {
  const { javascript } = config || {};
  const { watch } = javascript || {}; 
  
  return watcher({
    glob: watch,
    type: 'app',
    callback: () => run(config)
  });
}

export default { run, watch }

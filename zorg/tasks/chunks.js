// import log from '../lib/log.js';
import esbuild from 'esbuild';
import glob from 'glob';
import watcher from '../lib/watcher.js';

export function run(config) {
  const { chunks } = config || {};
  const { src, dest } = chunks || {};

  return esbuild.build({
    entryPoints: glob.sync(src, {}),
    bundle: true,
    inject: ['./zorg/lib/react-shim.js'],
    platform: 'node',
    format: 'esm',
    loader: { '.js': 'jsx' },
    outfile: dest,
  });
}

export function watch(config) {
  const { chunks } = config || {};
  const { watch } = chunks || {}; 
  
  return watcher({
    glob: watch,
    type: 'chunks',
    callback: () => run(config)
  });
}

export default { run, watch }

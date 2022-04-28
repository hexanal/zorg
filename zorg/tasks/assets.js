import fse from 'fs-extra';
import log from '../lib/log.js';
import watcher from '../lib/watcher.js';

// @todo?
const DEFAULTS = [];

const copy = ({id, src, dest}) => {
  const start = Date.now();

  return fse.copy(src, dest)
    .then(() => {
      const time = Date.now() - start;
      log( `assets: copied '${id}' ~~ ${time}ms` );
    })
    .catch(err => {
      log( `assets: huh?! something broke while copying assets: '${id}'` );
      console.error( err );
    });
}

export function run(config) {
  const { assets = DEFAULTS } = config || {};
  return assets.map( asset => {
    copy(asset);
  });
}

export function watch(config) {
  const { assets = DEFAULTS } = config || {};
  const glob = assets.map( asset => `${asset.src}/**/*` );
  
  return watcher({
    glob,
    type: 'assets',
    callback: () => run(config)
  });
}

export default { run, watch }

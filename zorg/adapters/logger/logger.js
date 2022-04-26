import log from '../../lib/log.js';

export default function logger( item, config ) {
  const critical = config.debug || false;
  if (critical) {
    log(`[log] item:`);
    console.log(item);
    // log(`[log] config:`);
    // console.log(config);
  }

  return item
}
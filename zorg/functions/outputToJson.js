import log from '../lib/log.js';
import error from '../lib/error.js';
import { write } from '../lib/files.js';

export default function outputToJson(item, config) {
  if (!item.type || !item.url || !item.function) return item; // don't build if there is URL or no function
  if (item.type !== 'api') return item; //?

  log(`[output-to-json] json`);
  const fnPath = `./${item.function}.js`;
  import(fnPath)
    .then(fn => {
      if (!fn) return error(`no function found with name '${item.function}'`);
      if (!fn.default) return error(`function '${item.function}' does not export a 'default' (export default)`);

      const content = fn.default(item);
      const parts = item.url.split('/');
      const filename = parts[parts.length - 1];
      const destination = `${config.root}${item.url.replace(filename, '')}`;
      
      return write(destination, filename, content, config)
    })
    .catch(msg => error(msg));

  return false; // @todo interrupts the chain
}

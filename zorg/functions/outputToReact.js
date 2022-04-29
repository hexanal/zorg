import log from '../lib/log.js';
import htmlShell from '../../sites/kuuma/app/htmlShell.js';
import { write } from '../lib/files.js';

export default function outputToReact( item, config ) {
  if (!item.type || !item.url) return item; // don't build if there is no attached component or URL

  log(`[output-to-html] rendering page '${item.title}' at url '${item.url}'`);
  const html = htmlShell(item);
  const destination = `${config.root}${item.url}`; // filesystem destination to write the HTML
  write(destination, 'index.html', html, config);

  return item;
}

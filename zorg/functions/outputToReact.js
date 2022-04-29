import * as ReactDOMServer from 'react-dom/server.js';
import log from '../lib/log.js';
import shell from '../../sites/kuuma/app/shell.js';
import renderChunk from '../../sites/kuuma/chunky/renderChunk.js';
import { write } from '../lib/files.js';

export default function outputToReact( item, config ) {
  if (!item.type || !item.url) return item; // don't build if there is no attached component or URL

  log(`[output-to-html] rendering page '${item.title}' at url '${item.url}'`, { critical: config.debug })
  const Component = renderChunk(item); // @todo will I extract this to... zorg?
  const rendered = ReactDOMServer.renderToString(Component); // @todo here, plug the "page renderer", from the root Component (with chunk data)
  const html = shell(rendered, item);
  const destination = `${config.root}${item.url}`; // filesystem destination to write the HTML
  
  write(destination, 'index.html', html, config);

  return item;
}

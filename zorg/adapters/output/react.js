import * as ReactDOMServer from 'react-dom/server.js';
import log from '../../lib/log.js';
import shell from '../../../src/kuuma/app/Shell.js';
import renderChunk from '../../../src/kuuma/app/chunky/renderChunk.js';
import { write } from '../../lib/files.js';

export default function outputToReact( item, config ) {
  if (!item.type || !item.url) return item // don't build if there is no attached component or URL

  log(`[output-to-html] rendering page '${item.title}' at url '${item.url}'`, { critical: config.debug })
  const Component = renderChunk(item); // @todo will I extract this to... zorg?
  // console.log( Component );
  const rendered = ReactDOMServer.renderToString(Component); // @todo here, plug the "page renderer", from the root Component (with chunk data)
  const html = shell(rendered, item)
  const destination = `${config.root}${item.url}`; // filesystem destination to write the HTML
  
  return write(destination, 'index.html', html, config);
}

// @todo
// log(`[error] '${err}'`, { critical: CONFIG?.debug });
// log(`[error] error while importing the react component for '${item.component}'`, { critical: CONFIG?.debug });

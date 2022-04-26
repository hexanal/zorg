import * as ReactDOMServer from 'react-dom/server';
import path from 'path';
import log from '../../lib/log.js';
import shell from '../../../src/kuuma/base/shell.js';
import chunks from '../../_generated/chunks.js';
import { write } from '../../lib/files.js';

export default function outputToReact( item, config ) {
  if (!item.component || !item.url) return item // don't build if there is no attached component or URL

  log(`[output-to-html] rendering page '${item.title}' at url '${item.url}'`, { critical: config.debug })

  const Component = chunks[item.component](item);
  const rendered = ReactDOMServer.renderToString(Component);
  const html = shell(rendered, item);
  const destination = `${config.root}${item.url}`; // filesystem destination to write the HTML
  return write(destination, 'index.html', html, config);

  // const destination = `${config.root}${item.url}`; // filesystem destination to write the HTML
  // const cool = import(`${config.chunks.dest}/${item.component}.js`)
  //   .then(element => {
  //     const rendered = ReactDOMServer.renderToString(element.default(item));
  //     const html = shell(rendered, item);
  //     return write(destination, 'index.html', html, config);
  //   })
  //   .catch( error => {
  //     console.error(error);
  //   })

}

// @todo
// log(`[error] '${err}'`, { critical: CONFIG?.debug });
// log(`[error] error while importing the react component for '${item.component}'`, { critical: CONFIG?.debug });

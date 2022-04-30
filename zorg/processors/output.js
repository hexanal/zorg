import debug from '../lib/debug.js';
import getStaticHtmlFromChunk from '../lib/getStaticHtmlFromChunk.js';
import { write } from '../lib/files.js';

export default function outputToReact(chunk, site) {
  if (!chunk.type || !chunk.url) return chunk; // don't build if there is no attached component or URL

  const { tasks = [] } = site;
  // @todo error if none?
  const { host = null, port = null } = tasks.find(t => t.type === 'serve') || {};

  const serverURL = host ? `http://${host}${port ? ':'+port:''}${chunk.url}` : null;
  const destination = `${site.root}${chunk.url}`; // filesystem destination to write the HTML

  debug(`

## rendering chunk:

* title: '${chunk.title}'
* type: '${chunk.type}'
* url: '${chunk.url}'
* built in folder: '${destination}'
${serverURL ?
'* accessible at: ' + serverURL : ''}

`, 'functions/outputToReact');

  const html = getStaticHtmlFromChunk(chunk, site);
  write(destination, 'index.html', html, site);

  return chunk;
}

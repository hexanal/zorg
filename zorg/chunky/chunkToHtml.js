import * as ReactDOMServer from 'react-dom/server.js';
import createChunky from './createChunky.js';
import { read, write } from '../files.js';

// @todo error msg
// @todo replace string, from template in site?
export default function chunkToHtml(chunk, options, site) {
    if (!chunk.type || !chunk.url) return chunk; // don't build if we're not dealing with a chunk, and if it's not a chunk to "render" to html (i.e. a page with a URL)

    const {
        chunks = [],
        dest = './public',
        shell = null // @todo (error if null)
    } = options || {};
    const {
        lang = site.lang || 'en',
        title = '~~',
        description = '~~',
    } = chunk || {};
    const { chunkToComponent } = createChunky(chunks);
    const Root = chunkToComponent(chunk);
    const componentsAsString = ReactDOMServer.renderToString(Root);
    const html = read(shell)
        // @todo obvious
        .replace('~~lang', lang)
        .replace('~~title', title)
        .replace('~~description', description)
        .replace('~~html', componentsAsString)
        .replace('~~chunk', JSON.stringify(chunk));
    // @todo grab that from `site`
    // const serverURL = host ? `http://${host}${port ? ':'+port:''}${chunk.url}` : null;
    const destination = `${dest}${chunk.url}`; // filesystem destination to write the HTML

console.log(`
  
## rendering chunk:

* title: '${chunk.title}'
* type: '${chunk.type}'
* url: '${chunk.url}'
* built in folder: '${destination}'

~~

`);

    write(destination, 'index.html', html, site);
  
    return chunk;
}

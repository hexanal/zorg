import chunky from 'chunky';
import * as ReactDOMServer from 'react-dom/server.js';
import { read, write } from 'zorg/files.js';

export default function chunkToHtml(chunk, options) {
    if (!chunk.type || !chunk.url) return chunk; // don't build if we're not dealing with a chunk, and if it's not a chunk to "render" to html (i.e. a page with a URL)

    // grabbing the options for this task
    const {
        chunks = [], // the list of all available chunks for this website
        dest = './public', // where to build the html files
        htmlShellSrc = null // path to the HTML file that wraps around the React component root
    } = options || {};
    // @todo grabbing meta information for this page from the chunk
    const {
        lang = 'en',
        title = '~~',
        description = '~~',
    } = chunk || {};

    if (!htmlShellSrc) return console.error(`please provide an 'htmlShellSrc' key in chunky's task options`);

    // initializing Chunky with our 'chunks' and using `chunkToComponent`
    // to output the whole page chunk as a React component
    const { chunkToComponent } = chunky(chunks);
    const Root = chunkToComponent(chunk);

    if (!Root) return console.error(`'chunkToComponent did not return any Root component`);

    // rendering to a string, then doing some simple token replace for
    // meta information, scripts, etc.
    const componentsAsString = ReactDOMServer.renderToString(Root);
    const html = read(htmlShellSrc)
        .replace('~~lang', lang)
        .replace('~~title', title)
        .replace('~~description', description)
        .replace('~~html', componentsAsString)
        .replace('~~chunk', JSON.stringify(chunk));
    // filesystem destination to write the HTML
    const destination = `${dest}${chunk.url}`; 

console.log(`
  
## rendering chunk:

* title: '${chunk.title}'
* type: '${chunk.type}'
* url: '${chunk.url}'
* built in folder: '${destination}'

~~

`);

    // writing the HTML file
    return write(destination, 'index.html', html);
}

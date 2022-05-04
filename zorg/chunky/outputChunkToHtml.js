import * as ReactDOMServer from 'react-dom/server.js';
import createChunky from '../chunky/createChunky.js';
import { write } from '../files.js';

// @todo error msg
// @todo replace string, from template in site?
export default function outputChunkToHtml(chunk, site) {
    if (!chunk.type || !chunk.url) return chunk; // don't build if we're not dealing with a chunk, and if it's not a chunk to "render" to html (i.e. a page with a URL)

    const {
        lang = site.lang || 'en',
        title = site.title || '[missing `title` in site]',
        description = site.description || '[missing `description` in site]',
    } = chunk || {};
    const {
        host = 'localhost',
        port = 8080,
        root = './public',
        library = {} // chunky library needs to be in the config
    } = site || {};
    const createChunk = createChunky(library);
    const Root = createChunk(chunk);
    const markup = ReactDOMServer.renderToString(Root);
    const html = `<!doctype html>
<html lang="${lang}">
<head>
    <title>${title}</title>

    <meta name="description" content="${description}">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="X-Clacks-Overhead" content="GNU Terry Pratchett" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="manifest" href="/assets/manifest.webmanifest">
    <link rel="icon" href="/assets/images/favicon.png">
    <link rel="stylesheet" href="/assets/kuuma.css">
</head>
<body>

<div id="root">${markup}</div>

<script type="text/javascript">
const __CHUNK__ = ${JSON.stringify(chunk)};
</script>
<script src="/assets/kuuma.js" type="module"></script>
</body>
</html>
`;
    const serverURL = host ? `http://${host}${port ? ':'+port:''}${chunk.url}` : null;
    const destination = `${root}${chunk.url}`; // filesystem destination to write the HTML

console.log(`
  
## rendering chunk:

* title: '${chunk.title}'
* type: '${chunk.type}'
* url: '${chunk.url}'
* built in folder: '${destination}'
${serverURL ?
'* accessible at: ' + serverURL : ''}

~~

`);

    write(destination, 'index.html', html, site);
  
    return chunk;
}

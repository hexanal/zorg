import * as ReactDOMServer from 'react-dom/server.js';
import renderChunk from '../../sites/kuuma/lib/renderChunk.js';

export default function getStaticHtmlFromChunk(chunk, site) {
    const {
        lang = site.lang || 'en',
        title = site.title || '[missing `title` in site]',
        description = site.description || '[missing `description` in site]',
    } = chunk || {};
    const Root = renderChunk(chunk);
    const markup = ReactDOMServer.renderToString(Root);

    return `
<!doctype html>
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
}
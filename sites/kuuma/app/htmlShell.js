import * as ReactDOMServer from 'react-dom/server.js';
import config from '../config.js';
import renderChunk from '../chunky/renderChunk.js';

// @todo this is related to "server-side" stuff... maybe relocate it
// @todo more variables for css path, etc. etc. etc.
export default function htmlShell(props) {
    const {
        lang = config.lang || 'en',
        title = config.title || '[missing `title` in config]',
        description = config.description || '[missing `description` in config]',
    } = props || {};
    const Root = renderChunk(props);
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
const __INITIAL_STATE__ = ${JSON.stringify(props)};
</script>
<script src="/assets/kuuma.js" type="module"></script>
</body>
</html>
`;
}
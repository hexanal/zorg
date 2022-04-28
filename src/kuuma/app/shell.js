// @todo this is related to "server-side" stuff... maybe relocate it
// @todo more variables for css path, etc. etc. etc.
export default function shell(html, item, config) {
    const {
        lang = config.lang,
        title = config.title,
        description = config.description,
    } = item || {};

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

<div id="kuuma">${html}</div>

<script type="text/javascript">
const __ITEM__ = ${JSON.stringify(item)};
</script>
<script src="/assets/kuuma.js" type="module"></script>
</body>
</html>
`;
}
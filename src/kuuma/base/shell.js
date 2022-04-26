// @todo this is related to "server-side" stuff... maybe relocate it
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

    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="stylesheet" href="/kuuma.css">
</head>
<body>

<div id="kuuma">${html}</div>

<script type="text/javascript">
const __ITEM__ = ${JSON.stringify(item)};
</script>
<script src="/assets/js/kuuma.js" type="module"></script>
</body>
</html>
`;
}
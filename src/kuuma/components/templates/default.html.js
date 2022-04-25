const header = require('../interface/header.html.js')

module.exports = props => {
    console.log( props )

    return `
<!doctype html>
<html>
<head>
<title>Hey</title>
</head>
<body>
    <div id="kuuma">
        ${header(props)}
        <h1>Hello World!</h1>.
    </div>

    <script src="/assets/js/kuuma.mjs" type="module"></script>
</body>
</html>
`
}

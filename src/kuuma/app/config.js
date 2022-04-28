export default {
    name: 'kuumakesa.com/', // a name to identify this website
    title: 'Kuuma Kesä', // the default "title" for the website (i.e. tab time in browser, SEO title, etc.)
    description: "A webzine about art, science, life, music, friends, philosophy, gaming, etc. with an emphasis on the interactive and the multimedia.", // meta description
    root: './public', // where to build the static website on the server
    baseURL: '/', // URLs for this website start from this path
    // baseDomain: 'https://kuumakesa.com', // base production domain @todo maybe not useful
    locale: 'en', // the website's locale

    debug: false, // activate debugging for this website (more logging, etc.)

    // @todo -> this can be the `html` processor;  components, watching files, etc...
    // loop through `assets`, which can be styles, html, ... along with processor (html, styles/sass, copy)

    app: {
        watch: ['./src/kuuma/**/*.js'],
        src: './src/kuuma/kuuma.js',
        dest: './public/assets',
    },
    html: {
        watch: [
            './content/**/*.json',
            './src/kuuma/**/*.js',
        ],
        contentSrc: './content/**/*.json'
    },
    styles: {
        watch: ['./src/kuuma/styles/**/*.scss'], // absolutely anywhere there's Sass
        src: './src/kuuma/styles/kuuma.scss',
        dest: './public/assets',
        filename: 'kuuma.css'
    },
    assets: [
        {
            id: 'favicon',
            src: './src/kuuma/assets/favicon.ico',
            dest: './public/favicon.ico',
        },
        {
            id: 'robots',
            src: './src/kuuma/assets/robots.txt',
            dest: './public/robots.txt',
        },
        {
            id: 'images',
            src: './src/kuuma/assets/images',
            dest: './public/assets/images',
        },
        {
            id: 'fonts',
            src: './src/kuuma/assets/fonts',
            dest: './public/assets/fonts'
        },
    ]
}

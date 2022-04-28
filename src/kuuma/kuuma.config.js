export default {
    name: 'kuumakesa.com/',
    title: 'Kuuma Kesä',
    description: "A webzine about art, science, life, music, friends, philosophy, gaming, etc. with an emphasis on the interactive and the multimedia.",
    root: './public',
    baseURL: '/',
    baseDomain: 'https://kuumakesa.com',
    locale: 'en',

    debug: false,

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

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
        dest: './public/assets/js',
    },
    chunks: {
        watch: ['./src/kuuma/components/**/*.js'],
        src: './src/kuuma/kuuma.server.js',
        dest: './zorg/_generated/kuuma.server.js',
    },
    html: {
        watch: [
            './content/**/*.json',
            './src/kuuma/components/**/*.html',
            './zorg/_generated/**/*.js'
        ],
        contentSrc: './content/**/*.json',
        componentsDir: './src/kuuma/components',
        templatesDir: './src/kuuma/components/templates/',
    },
    styles: {
        watch: ['./src/kuuma/assets/styles/**/*.scss'], // absolutely anywhere there's Sass
        src: './src/kuuma/assets/styles/kuuma.scss',
        out: './public',
        dest: './public',
        filename: 'kuuma.css'
    },
    assets: [
        // {
        //     id: 'js',
        //     src: './src/kuuma/js',
        //     dest: './public/assets/js'
        // },
        {
            id: 'manifest',
            src: './src/kuuma/manifest.webmanifest',
            dest: './public/manifest.webmanifest',
        },
        {
            id: 'robots',
            src: './src/kuuma/robots.txt',
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

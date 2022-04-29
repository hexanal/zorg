export default {
    DEBUG: false,
    DEV_MODE: true,

    name: 'kuumakesa.com/', // a name to identify this website
    title: 'Kuuma Kesä', // the default "title" for the website (i.e. tab time in browser, SEO title, etc.)
    description: "A webzine about art, science, life, music, friends, philosophy, gaming, etc. with an emphasis on the interactive and the multimedia.", // meta description
    root: './public', // where to build the static website on the server
    baseURL: '/', // URLs for this website start from this path
    locale: 'en', // the website's locale

    chunkyPath: './sites/kuuma/chunky',

    tasks: [
        {
            type: 'serve',
            host: 'localhost',
            port: 8022,
        },
        {
            type: 'process-chunks',
            watch: ['./chunks/**/*.json', './sites/kuuma/**/*.js'],
            src: './chunks/**/*.json'
        },
        {
            type: 'esbuild',
            watch: ['./sites/kuuma/**/*.js'],
            src: './sites/kuuma/kuuma.js',
            dest: './public/assets',
        },
        {
            type: 'copy',
            watch: ['./sites/kuuma/assets/favicon.ico'],
            src: './sites/kuuma/assets/favicon.ico',
            dest: './public/favicon.ico',
        },
        {
            type: 'copy',
            src: './sites/kuuma/assets/robots.txt',
            dest: './public/robots.txt',
        },
        {
            type: 'copy',
            src: './sites/kuuma/assets/images',
            dest: './public/assets/images',
        },
        {
            type: 'copy',
            src: './sites/kuuma/assets/fonts',
            dest: './public/assets/fonts'
        },
        {
            type: 'scss',
            watch: ['./sites/kuuma/styles/**/*.scss'], // absolutely anywhere there's Sass
            src: './sites/kuuma/styles/kuuma.scss',
            dest: './public/assets',
            filename: 'kuuma.css'
        },
    ],
}

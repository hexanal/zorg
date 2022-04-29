export default {
    // I can override the initial flags with this:
    // DEBUG: true,
    // DEBUG: might be a string, like 'component' to target logs only for component-related business, or 'zorg' for zorg-related business, etc. etc.
    // @todo ideas
    // WEBSITE_ENABLED: true, // might wanna deactivate it?
    // ENV: 'dev', ?
    DEBUG: true,
    HOST: 'localhost',
    PORT: 8022,
    ENV: 'dev',

    name: 'kuumakesa.com/', // a name to identify this website
    title: 'Kuuma Kesä', // the default "title" for the website (i.e. tab time in browser, SEO title, etc.)
    description: "A webzine about art, science, life, music, friends, philosophy, gaming, etc. with an emphasis on the interactive and the multimedia.", // meta description
    root: './public', // where to build the static website on the server
    baseURL: '/', // URLs for this website start from this path
    locale: 'en', // the website's locale

    chunkyPath: './sites/kuuma/chunky',

    tasks: [
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
            type: 'process-chunks',
            watch: ['./chunks/**/*.json', './sites/kuuma/**/*.js'],
            src: './chunks/**/*.json'
        },
        // {
        //     id: 'scss',
        //     watch: ['./sites/kuuma/styles/**/*.scss'], // absolutely anywhere there's Sass
        //     options: {
        //         src: './sites/kuuma/styles/kuuma.scss',
        //         dest: './public/assets',
        //         filename: 'kuuma.css'
        //     },
        // }
    ],

    // @todo delete if useless
    app: {
        watch: ['./sites/kuuma/**/*.js'],
        src: './sites/kuuma/kuuma.js',
        dest: './public/assets',
    },
    html: {
        watch: [
            './chunks/**/*.json',
            './sites/kuuma/**/*.js',
        ],
        chunks: './chunks/**/*.json'
    },
    styles: {
        watch: ['./sites/kuuma/styles/**/*.scss'], // absolutely anywhere there's Sass
        src: './sites/kuuma/styles/kuuma.scss',
        dest: './public/assets',
        filename: 'kuuma.css'
    },
    assets: [
        {
            id: 'favicon',
            src: './sites/kuuma/assets/favicon.ico',
            dest: './public/favicon.ico',
        },
        {
            id: 'robots',
            src: './sites/kuuma/assets/robots.txt',
            dest: './public/robots.txt',
        },
        {
            id: 'images',
            src: './sites/kuuma/assets/images',
            dest: './public/assets/images',
        },
        {
            id: 'fonts',
            src: './sites/kuuma/assets/fonts',
            dest: './public/assets/fonts'
        },
    ]
}

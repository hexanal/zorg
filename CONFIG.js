module.exports  = {
    // @todo idea collocate config with website...
    websites: [
        {
            baseURL: '/',
            baseDomain: 'https://kuumakesa.com',
            locale: 'en',
            name: 'kuumakesa.com/',
            root: './public',
            contentSrc: './routes/**/*.json',
            // loop through `assets`, which can be styles, html, ... along with processor (html, styles/sass, copy)
            // @todo -> this can be the `html` processor;  components, watching files, etc...
            componentsDir: './src/kuuma/components',
            templatesDir: './src/kuuma/components/templates/',
            watchFiles: [
                './src/kuuma/components/**/*.html', // the HTML components
                './routes/**/*.md', // the markdown content files
                './routes/**/*.json' // the JSON content objects (TODO: soon to be *generated* by another interface, the Zorg GUI)
            ],
            styles: {
                watch: [ './src/kuuma/**/*.scss' ], // absolutely anywhere there's Sass
                src: './src/kuuma/styles/kuuma.scss',
                out: './public',
                dest: './public',
                filename: 'kuuma.css'
            },
            assets: [
                {
                    id: 'js',
                    src: './src/kuuma/js',
                    dest: './public/assets/js'
                },
                {
                    id: 'manifest',
                    src: './src/kuuma/manifest.webmanifest',
                    dest: './public/manifest.webmanifest',
                },
                {
                    id: 'images',
                    src: './src/kuuma/images',
                    dest: './public/assets/images',
                },
                {
                    id: 'fonts',
                    src: './src/kuuma/fonts',
                    dest: './public/assets/fonts'
                },
            ]
        }
    ]
}

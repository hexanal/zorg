module.exports  = {
    // @todo idea collocate config with website...
    websites: [
        {
            baseURL: '/',
            baseDomain: 'https://kuumakesa.com',
            locale: 'en',
            name: 'kuumakesa.com/',
            root: './public',
            // loop through `assets`, which can be styles, html, ... along with processor (html, styles/sass, copy)
            // @todo -> this can be the `html` processor;  components, watching files, etc...
            html: {
                watch: ['./content/**/*.json', './src/kuuma/components/**/*.html', './src/kuuma/components/**/*.js'],
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
    ]
}

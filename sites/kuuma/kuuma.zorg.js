import { config } from './kuuma.chunky.js';
import createZorgSite from '../../zorg/createZorgSite.js';

export default () => createZorgSite({
    ...config,

    host: 'localhost',
    port: 8022,

    root: './public', // where to build the static website on the server
    baseURL: '/', // URLs for this website start from this path
    locale: 'en', // the website's locale

    DEBUG: false,
    DEV_MODE: true,

    tasks: [
        {
            type: 'chunky',
            watch: ['./sites/kuuma/data/**/*.json', './sites/kuuma/chunks/**/*.js'],
            src: './sites/kuuma/data/**/*.json',
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
            watch: ['./sites/kuuma/assets/robots.txt'],
            src: './sites/kuuma/assets/robots.txt',
            dest: './public/robots.txt',
        },
        {
            type: 'copy',
            watch: ['./sites/kuuma/assets/images/**/*'],
            src: './sites/kuuma/assets/images',
            dest: './public/assets/images',
        },
        {
            type: 'copy',
            watch: ['./sites/kuuma/assets/fonts/**/*'],
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
});

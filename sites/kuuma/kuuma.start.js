import zorg from 'zorg';
import chunky from './tasks/chunky.js';
import { chunks } from './kuuma.chunky.js';
import javascript from './tasks/javascript.js';
import copy from 'zorg/tasks/copy.js';
import serve from 'zorg/tasks/serve.js';
import * as endpoints from './api/index.js';
// import styles from './tasks/styles.js';

zorg([
    {
        fn: chunky,
        watch: ['./sites/kuuma/data/**/*.json', './sites/kuuma/components/chunks/**/*.js'],
        src: './sites/kuuma/data/**/*.json',
        dest: './public',
        htmlShellSrc: './sites/kuuma/kuuma.html',
        chunks,
    },
    {
        fn: serve,
        host: 'localhost',
        port: 8022,
        root: './public',
        baseURL: '/', // URLs for this website start from this path
        endpoints
    },
    {
        fn: javascript,
        watch: ['./sites/kuuma/**/*.js'],
        src: './sites/kuuma/kuuma.js',
        dest: './public/assets',
    },
    {
        fn: copy,
        watch: ['./sites/kuuma/assets/favicon.ico'],
        src: './sites/kuuma/assets/favicon.ico',
        dest: './public/favicon.ico',
    },
    {
        fn: copy,
        watch: ['./sites/kuuma/assets/robots.txt'],
        src: './sites/kuuma/assets/robots.txt',
        dest: './public/robots.txt',
    },
    {
        fn: copy,
        watch: ['./sites/kuuma/assets/images/**/*'],
        src: './sites/kuuma/assets/images',
        dest: './public/assets/images',
    },
    {
        fn: copy,
        watch: ['./sites/kuuma/assets/fonts/**/*'],
        src: './sites/kuuma/assets/fonts',
        dest: './public/assets/fonts'
    },
    // {
    //     task: scss,
    //     watch: ['./sites/kuuma/styles/**/*.scss'], // absolutely anywhere there's Sass
    //     src: './sites/kuuma/styles/kuuma.scss',
    //     dest: './public/assets',
    //     filename: 'kuuma.css'
    // },
]);

/*
// @todo?

zorg('kuuma', {

})
    .task('chunky', {

    })
    .task('serve', {

    })
*/
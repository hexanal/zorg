import { useComponents } from 'chunky';
import chunkyProcessor from 'chunky/processor.js';
import esbuildBundle from 'zorg/processors/esbuildBundle.js';
import copyFiles from 'zorg/processors/copyFiles.js';
import expressServer from 'zorg/processors/expressServer.js';
import scssToCss from 'zorg/processors/scssToCss.js';

import * as components from './components/index.js';
import * as endpoints from './api/index.js';

useComponents(components);

export default [
    {
        fn: chunkyProcessor,
        watch: ['./json/**/*.json', './sites/kuuma/components/chunks/**/*.js'],
        src: './json/**/*.json',
        dest: './public',
        htmlShellSrc: './sites/kuuma/kuuma.html',
    },
    {
        fn: expressServer,
        host: 'localhost',
        port: 8022,
        root: './public',
        name: 'Kuuma Kesä',
        baseURL: '/', // URLs for this website start from this path
        extras: {
            chunksSrc: './json/**/*.json',
            endpoints
        },
    },
    {
        fn: esbuildBundle,
        sourcemap: true,
        watch: ['./sites/kuuma/**/*.js'],
        src: './sites/kuuma/kuuma.js',
        dest: './public/assets',
    },
    {
        fn: copyFiles,
        watch: ['./sites/kuuma/assets/favicon.ico'],
        src: './sites/kuuma/assets/favicon.ico',
        dest: './public/favicon.ico',
    },
    {
        fn: copyFiles,
        watch: ['./sites/kuuma/assets/robots.txt'],
        src: './sites/kuuma/assets/robots.txt',
        dest: './public/robots.txt',
    },
    {
        fn: copyFiles,
        watch: ['./sites/kuuma/assets/images/**/*'],
        src: './sites/kuuma/assets/images',
        dest: './public/assets/images',
    },
    {
        fn: copyFiles,
        watch: ['./sites/kuuma/assets/fonts/**/*'],
        src: './sites/kuuma/assets/fonts',
        dest: './public/assets/fonts'
    },
    {
        fn: scssToCss,
        watch: ['./sites/kuuma/styles/**/*.scss'], // absolutely anywhere there's Sass
        src: './sites/kuuma/styles/kuuma.scss',
        dest: './public/assets',
        filename: 'kuuma.css',
        sourceMap: true,
    },
];

/*
// @todo?

zorg('kuuma', {

})
    .task('chunky', {

    })
    .task('serve', {

    })
*/
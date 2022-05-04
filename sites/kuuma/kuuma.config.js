import { chunks } from './kuuma.chunky.js';
import chunky from '../../zorg/tasks/chunky.js';
import serve from '../../zorg/tasks/serve.js';
import copy from '../../zorg/tasks/copy.js';
import scss from '../../zorg/tasks/scss.js';
import esbuild from '../../zorg/tasks/esbuild.js';

export default {
    id: 'kuuma', // must match the folder!
    name: 'kuumakesa.com/', // a name to identify this website
    // @todo this should be in data? yeah...
    title: 'Kuuma Kesä', // the default "title" for the website (i.e. tab time in browser, SEO title, etc.)
    description: "A webzine about art, science, life, music, friends, philosophy, gaming, etc. with an emphasis on the interactive and the multimedia.", // meta description
    
    tasks: [
        {
            task: chunky,
            chunks,
            watch: ['./sites/kuuma/data/**/*.json', './sites/kuuma/components/chunks/**/*.js'],
            src: './sites/kuuma/data/**/*.json',
            dest: './public',
        },
        {
            task: serve,
            host: 'localhost',
            port: 8022,
            root: './public',
            baseURL: '/', // URLs for this website start from this path
            // @todo
            apiChunkSource: './sites/kuuma/data/**/*.json'
        },
        {
            task: esbuild,
            watch: ['./sites/kuuma/**/*.js'],
            src: './sites/kuuma/kuuma.js',
            dest: './public/assets',
        },
        {
            task: copy,
            watch: ['./sites/kuuma/assets/favicon.ico'],
            src: './sites/kuuma/assets/favicon.ico',
            dest: './public/favicon.ico',
        },
        {
            task: copy,
            watch: ['./sites/kuuma/assets/robots.txt'],
            src: './sites/kuuma/assets/robots.txt',
            dest: './public/robots.txt',
        },
        {
            task: copy,
            watch: ['./sites/kuuma/assets/images/**/*'],
            src: './sites/kuuma/assets/images',
            dest: './public/assets/images',
        },
        {
            task: copy,
            watch: ['./sites/kuuma/assets/fonts/**/*'],
            src: './sites/kuuma/assets/fonts',
            dest: './public/assets/fonts'
        },
        {
            task: scss,
            watch: ['./sites/kuuma/styles/**/*.scss'], // absolutely anywhere there's Sass
            src: './sites/kuuma/styles/kuuma.scss',
            dest: './public/assets',
            filename: 'kuuma.css'
        },
    ],
};

#!/usr/bin/env node

import zorg from 'zorg';
import kuuma from '../../sites/kuuma/kuuma.config.js';
import Template from 'chunky/components/TEMPLATE.js';
import { write } from 'zorg/files.js';

const { argv = [] } = process || {};

const optionFunctions = {
    'serve': siteName => {
        zorg(kuuma);
    },
    'template': (path, params) => {
        const parts = path.split('/');
        const filename = parts[parts.length - 1];
        const dir = path.replace(`/${filename}`, '');
        const [type, ...rest] = filename.toLowerCase().split('.');
        const full = params.includes('--full');

        return write(dir, filename, Template({ type, full }))
            .then(() => {
                console.log(`created template boilerplate file in : '${path}'`);
            });
    }
};

const fns = argv.map( (a, i) => {
    // const [type, rest] = a.split('=').map(s => s.replace('--', '')) || [];
    // const params = rest.split('-').map(s => s.trim());
    if (typeof optionFunctions[a] === 'function') {
        const fn = optionFunctions[a];
        const path = argv[i + 1]; // next argument

        return fn(path, argv);
    }
});


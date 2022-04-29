import config from '../../config.js';

export default function debug(msg) {
    const { name = '', debug = false } = config || {};
    if (!debug) return false;
    console.error(`\x1b[7m[${name}]\x1b[0m ✷  ${msg}`);
}

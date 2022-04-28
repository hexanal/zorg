import config from '../config.js';

export default function log(msg) {
    const { name = '' } = config || {};
    console.log(`\x1b[7m[${name}]\x1b[0m ✷  ${msg}`);
}

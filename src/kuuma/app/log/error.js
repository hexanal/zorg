import config from '../config.js';

export default function error(msg) {
    const { name = '' } = config || {};
    console.error(`\x1b[7m[${name}]\x1b[0m ✷ [error] ${msg}`);
}

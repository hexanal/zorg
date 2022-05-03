import log from './log.js';

export default function info(msg, prefix = 'info') {
    if (!process) return console.log(msg);
    const { argv = null } = process || {};

    if (argv && argv.includes('--info')) {
        log(msg, prefix);
    }
}
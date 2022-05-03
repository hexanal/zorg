import log from './log.js';

export default function error(msg, prefix = 'info') {
    if (!process) return console.error(msg);
    const { argv = null } = process || {};

    if (argv && argv.includes('--error')) {
        log(msg, `error in: '${prefix}'`);
    }
}
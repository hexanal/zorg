import log from './log.js';

export default function debug(msg) {
    if (!process) {
        console.log(msg);
        console.trace();
        return;
    }
    const { argv = null } = process || {};

    if (argv && argv.includes('--debug')) {
        log(msg);
    }
}

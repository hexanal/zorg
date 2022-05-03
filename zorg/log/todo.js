import log from './log.js';

export default function todo(msg) {
    if (!process) return;

    const { argv = null } = process || {};
    if (!argv.includes('--todo')) return;

    log(msg, `todo->${msg}`);
}


export default function log(msg, prefix = '✦') {
    if (!process) return console.log(msg);
    const { argv = null } = process || {};

    if (typeof msg !== 'string' || !argv) {
      return console.log(msg);
    }
    if (!argv.includes('--silent')) {
        console.log(`[${prefix}]`);
        console.log(`~ ${msg}`);
    }
}

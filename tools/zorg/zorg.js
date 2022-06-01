import chokidar from 'chokidar';

const MODE = 'watch';
// const ACTIVE_CONSOLE_LOGGING = [
//     'log',
//     'error'
// ];

export default function zorg(tasks) {
    return tasks.map(options => {
        return tasker(options)[MODE](options);
    });
}

/**
 * @todo
 * 
 * @param {string} type the type of task
 * @param {function} fn a function to run for this task
 * @returns 
 */
export function tasker(options) {
    const { fn = null, log = false } = options || {};

    if (typeof fn !== 'function') {
        return console.error(`zorg module's 'fn' is not a function`);
    }

    const run = options => {
        return fn(options);
    }

    const watch = options => {
        const { watch: glob = [] } = options || {};

        fn(options); // @note call once to start with :)

        return chokidar
            .watch(glob, {
                ignored: /(^|[\/\\])\../, // ignore dotfiles
                persistent: true
            })
            .on('ready', () => log && console.log(`watching glob: '${glob}'`))
            .on('change', path => {
                console.log(`'${path}' changed`);
                // @todo try to merge path into the options to get `path` as `src` to only rebuild the one file?
                return fn(options);
            });
    }

    return { run, watch };
}

// named functions for log debugging and other
// export function log(msg) {
//     if (ACTIVE_CONSOLE_LOGGING.includes('log')) {
//         console.log(msg);
//     }
// }

// export function error(msg) {
//     if (ACTIVE_CONSOLE_LOGGING.includes('error')) {
//         console.error(msg);
//     }
// }
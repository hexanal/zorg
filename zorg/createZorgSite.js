import createTask from './createTask.js';
import createServer from './createServer.js';
import * as availableTasks from './tasks/index.js';

/**
 * when given a configuration for a website:
 * - runs a series of processors (specified by the config)
 * - watches for changes in files when website config provides the key: `DEV_MODE: true`
 * 
 * @param {site object} site provide a Zorgian site configuration object
 * @returns a Promise
 */
export default function createZorgSite(site) {
    const { 
        DEV_MODE = false,
        tasks = [],
    } = site || {};
    const mode = DEV_MODE ? 'watch' : 'run';

// console.log(`

// # running zorg [mode: ${mode}]

// * website: '${site.name}'
// * title: '${site.title}'
// * description: '${site.description}'

// `);

    const app = createServer(site);

    return Promise.all( tasks.map(options => {
        const { type = null } = options || {};
        if (!type) {
            console.error(`zorg type not specified!`, 'zorg');
            return;
        }

        const fn = availableTasks[type];
        if (!fn) {

console.error(`

->  zorg function '${type}' does not exist!
check the website configuration in 'processors'!

`);

            return;
        }

        return createTask(type, fn)[mode](options, site, app);
    }));
};

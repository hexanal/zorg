import createTask from './createTask.js';
import createServer from './createServer.js';
import error from './log/error.js';
import info from './log/info.js';
import * as availableTasks from './tasks/index.js';

/**
 * when given a configuration for a website:
 * - runs a series of processors (specified by the config)
 * - watches for changes in files when website config provides the key: `DEV_MODE: true`
 * 
 * @param {site object} site provide a Zorgian site configuration object
 * @returns a Promise
 */
export default function zorg(site) {
    const { 
        DEV_MODE = false,
        tasks = [],
    } = site || {};
    const mode = DEV_MODE ? 'watch' : 'run';

    info(`

# running zorg [mode: ${mode}]

* website: '${site.name}'
* title: '${site.title}'
* description: '${site.description}'
    
`, 'zorg');

    const app = createServer(site);

    return Promise.all( tasks.map(options => {
        const { type = null } = options || {};
        if (!type) {
            error(`zorg type not specified!`, 'zorg');
            return;
        }
  
        const fn = availableTasks[type];
        if (!fn) {
            error(`

->  zorg function '${type}' does not exist!
    check the website configuration in 'processors'!
`, 'zorg');
            return;
        }
        return createTask(type, fn)[mode](options, site, app);
    }));
}

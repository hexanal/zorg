import tasker from './lib/tasker.js';
import info from './lib/info.js';
import error from './lib/error.js';
import * as processorsList from './processors/index.js';

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
        processors = [],
    } = site || {};
    const taskMode = DEV_MODE ? 'watch' : 'run';
    info(`

# running zorg

* website: '${site.name}'
* title: '${site.title}'
* description: '${site.description}'
    
`, 'zorg');

    return Promise.all( processors.map(options => {
        const { type = null } = options || {};
        if (!type) {
            error(`task type not specified!`, 'zorg');
            return;
        }
  
        const fn = processorsList[type];
        if (!fn) {
            error(`

->  task function '${type}' does not exist!
    check the website configuration in 'processors'!
`, 'zorg');
            return;
        }
        return tasker(type, fn)[taskMode](options, site);
    }));
}

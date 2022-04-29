import tasker from './lib/tasker.js';
import info from './lib/info.js';
import error from './lib/error.js';

import serve from './tasks/serve.js';
import scss from './tasks/scss.js';
import copy from './tasks/copy.js';
import processChunks from './tasks/process-chunks.js';
import esbuild from './tasks/esbuild.js';

const taskMap = {
  'serve': serve,
  'esbuild': esbuild,
  'scss': scss,
  'copy': copy,
  'process-chunks': processChunks,
};

/**
 * when given a configuration for a website:
 * - runs a series of tasks (specified by the config)
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
    const taskMode = DEV_MODE ? 'watch' : 'run';
    info(`

# running zorg

* website: '${site.name}'
* title: '${site.title}'
* description: '${site.description}'
    
`, 'zorg');

    return Promise.all( tasks.map(options => {
        const { type = null } = options || {};
        if (!type) {
            return error(`task type not specified!`, 'zorg');
        }
  
        const fn = taskMap[type];
        if (!fn) {
            error(`

->  task function '${type}' does not exist!
    check the website configuration in 'tasks'!
`, 'zorg');
            return;
        }
        return tasker(type, fn)[taskMode](options, site);
    }));
}

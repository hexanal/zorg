import createTask from './createTask.js';

/**
 * when given a configuration for a website:
 * - runs a series of processors (specified by the config)
 * - watches for changes in files when website config provides the key: `DEV_MODE: true`
 * 
 * @param {site object} site provide a Zorgian site configuration object
 * @returns a Promise
 */
export default function zorg(site) {
    const { ZORG_MODE = false, tasks = [], } = site || {};
    const mode = ZORG_MODE ? 'watch' : 'run';

// console.log(`

// # running zorg [mode: ${mode}]

// * website: '${site.name}'
// * title: '${site.title}'
// * description: '${site.description}'

// `);

// @todo what do we do with this promise?!
    return Promise.all( tasks.map(({task, ...options}) => {
        if (typeof task !== 'function') {
            return console.error(`zorg task is not a function`);
        }

        return createTask(task)[mode](options, site);
    }));
};

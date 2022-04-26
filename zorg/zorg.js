import styles from './tasks/styles.js';
import assets from './tasks/assets.js';
import html from './tasks/html.js';
import app from './tasks/app.js';
import chunks from './tasks/chunks.js';

// when calling zorg through node directly
if ( process.argv.includes('--build') ) run();
if ( process.argv.includes('--watch') ) watch();

// @todo add the "serve" task

// basically go through websites,
// then go through all the tasks
// create new tasks for each, with config...
// easy
export function run(config) {
  return Promise.all([
    chunks.run(config),
    html.run(config),
    app.run(config),
    styles.run(config),
    assets.run(config)
  ]);
}

export function watch(config) {
  console.log('~~');

  return Promise.all([
    chunks.watch(config),
    html.watch(config),
    app.watch(config),
    styles.watch(config),
    assets.watch(config)
  ]);
}

export default { run, watch }

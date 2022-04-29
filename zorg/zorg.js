import error from './lib/error.js';

import scss from './tasks/scss.js';
import copy from './tasks/copy.js';
import html from './tasks/process-chunks.js';
import esbuild from './tasks/esbuild.js';

const taskFunctions = [
  esbuild,
  scss,
  copy,
  html,
];

export function run(site) {
  const { tasks = [] } = site || {};
  return Promise.all( tasks.map(task => {
    if (!task.type) return error(`task type not specified!`);
    if (!taskFunctions.find(t => t.type === task.type)) return error(`task '${task.type}' does not exist!`);
    return taskFunctions.find(t => t.type === task.type).run(task, site);
  }));
}

export function watch(site) {
  console.log('~~ still watching :)');
  const { tasks = [] } = site || {};
  return Promise.all( tasks.map(task => {
    if (!task.type) return error(`task type not specified!`);
    if (!taskFunctions.find(t => t.type === task.type)) return error(`task type '${task.type}' does not exist!`);
    return taskFunctions.find(t => t.type === task.type).watch(task, site);
  }));
}

export default { run, watch }

import { getChunksOfType } from '../lib/chunky.js';
import * as processors from '../functions/index.js';
import debug from '../lib/debug.js';
import error from '../lib/error.js';

export function buildApiRoutes(site, app) {
  getChunksOfType('api')
    .map(api => {
      const { url, method, processor } = api || {};
      const fn = processors[processor];

      debug(`

## applying processor function to api

* url: '${url}'
* method: '${method}'
* processor: '${processor}'

`, 'tasks/serve');

      if (!fn) {
        error(`
->  processor function was not found

* fn:

`, 'tasks/serve');
        debug(fn, 'tasks/serve');
        return;
      }

      app[method](url, function(req, res) {
        res.json(fn(req, res));
      });
    });
}
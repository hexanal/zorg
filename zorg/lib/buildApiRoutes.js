import { getChunksOfType } from './chunky.js';
import * as apis from '../api/index.js';
import debug from './debug.js';
import error from './error.js';

export default function buildApiRoutes(site, app) {
  const { name = '' } = site || {};

  getChunksOfType('api')
    .map(chunk => {
      const { 
        route = null,
        method = 'get',
        processor = null
      } = chunk || {};
      if (!route) return error(`please provide a 'route' key in type api!`, 'lib/server');
      if (!processor) return error(`please provide a 'route' key in type api!`, 'lib/server');
      const fn = apis[processor];
      if (!fn) return error(`could not find processor '${processor}' in zorg/api`, 'lib/server');

      debug(`
# website: ${name}

## applying processor function to api

* route: '${route}'
* method: '${method}'
* processor: '${processor}'

`, 'lib/server');

      if (!fn) {
        error(`
->  website: ${name}
->  processor function was not found

* fn:

`, 'lib/server');
        debug(fn, 'tasks/serve');
        return;
      }

      app[method](route, function(req, res) {
        res.json(fn(req, res));
      });
    });
}
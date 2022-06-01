import glob from 'glob';
import { parseJsonAtPath } from 'zorg/files.js';

export default function getPageByUrl(app, options) {
    const { extras = null } = options || {};
    const { chunksSrc = null } = extras || {};

    app.get('/api/v1/get-page-by-url/:url', function(req, res) {
        const { params = {} } = req || {};
        const { url: paramUrl = null } = params || {};
        const url = paramUrl ? `/${paramUrl}` : '/'; // @todo maybe not clear... maybe stupid
        const all = glob.sync(chunksSrc);
        const chunks = all.map(parseJsonAtPath);
        const byUrl = chunks.filter(chunkData => {
            const { url: chunkUrl = null } = chunkData || {};
            if (!chunkUrl) {
                return false;
            }
      
            return chunkUrl === url;
        });
      
        res.json(byUrl[0]);
    });
}

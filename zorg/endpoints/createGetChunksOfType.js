import glob from 'glob';
import { parseJsonAtPath } from '../files.js';

export default function getChunksOfType(site, app) {
    const { src: chunkSource } = site.tasks.find(z => z.type === 'chunky');

    app.get('/api/v1/get-chunks-of-type/:type', function(req, res) {
        const { params = {} } = req || {};
        const { type = null } = params || {};
        const all = glob.sync(chunkSource);
        const chunks = all.map(parseJsonAtPath);
        const ofType = chunks.filter(chunkData => {
            const { type: chunkType = null } = chunkData || {};
            if (!chunkType) {
                error(`
    ->  **chunk type: ${chunkType} not found!**
    
    * chunk data:
    
    `);
                debug(chunkData);
                return false;
            }
      
            return chunkType === type;
        });
      
        res.json(ofType);
    });
}

import glob from 'glob';
import { parseJsonAtPath } from 'zorg/files.js';

export default function getChunksOfType(app, options) {
    const { extras = null } = options || {};
    const { chunksSrc = null } = extras || {};

    app.get('/api/v1/get-chunks-of-type/:type', function(req, res) {
        const { params = {} } = req || {};
        const { type = null } = params || {};
        const all = glob.sync(chunksSrc);
        const chunks = all.map(parseJsonAtPath);
        const ofType = chunks.filter(chunkData => {
            const { type: chunkType = null } = chunkData || {};
            if (!chunkType) {
                console.error(`->  **chunk type: ${chunkType} not found!**`);
                console.error(`->  * chunk data:`);
                console.log(chunkData);
                return false;
            }
      
            return chunkType === type;
        });
      
        res.json(ofType);
    });
}

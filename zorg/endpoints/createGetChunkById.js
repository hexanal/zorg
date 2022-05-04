import glob from 'glob';
import { parseJsonAtPath } from '../files.js';

export default function createGetChunkById(app, options) {
  const { apiChunkSource = '' } = options || {};
  
  app.get('/api/v1/get-chunk-by-id/:id', function(req, res) {
    const { params } = req || {};
    const { id = 'missing id' } = params || {};
    const all = glob.sync(apiChunkSource);
    const allChunks = all.map(parseJsonAtPath);
    const found = allChunks
      .find(chunkData => {
        const { id: chunkId = null } = chunkData || {};
        if (!chunkId) return false;
  
        return chunkId === id;
      });
  
    return res.json(found);
  });
}

import glob from 'glob';
import { parseJsonAtPath } from '../files.js';

export default function createGetChunkById(app, options) {
  const { apiChunkSource = '' } = options || {};
  
  app.get('/api/v1/get-chunk-by-key-value/:key/:value', function(req, res) {
    const { params } = req || {};
    const { key = 'missing key', value = 'missing value' } = params || {};
    const all = glob.sync(apiChunkSource);
    const allChunks = all.map(parseJsonAtPath);
    const found = allChunks
      .find(chunkData => {
        const hasKey = chunkData[key] || {};
        const match = hasKey[value];

        if (match
  
        return chunkId === id;
      });
  
    return res.json(found);
  });
}

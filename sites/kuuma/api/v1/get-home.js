import glob from 'glob';
import { parseJsonAtPath } from 'zorg/files.js';

export default function createGetChunkById(app, options) {
  const { extras = null } = options || {};
  const { chunksSrc = null } = extras || {};

  app.get('/api/v1/get-home', function(req, res) {
    const all = glob.sync(chunksSrc);
    const allChunks = all.map(parseJsonAtPath);
    const found = allChunks
      .find(chunkData => {
        const { url: chunkUrl = null } = chunkData || {};
        if (!chunkUrl) return false;
  
        return chunkUrl === '/';
      });
  
    return res.json(found);
  });
}

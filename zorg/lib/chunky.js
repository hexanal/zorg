import glob from 'glob';
import debug from '../lib/debug.js';
import error from '../lib/error.js';
import * as processors from '../functions/index.js';

export function getAllChunks() {
    const all = glob.sync('./chunks/**/*.json');
    if (!processors.inputJson) {
        error(`

->  chunky needs the 'inputJson' processor
    to exist in '/zorg/functions/inputJson/js'

`, 'lib/chunky');
        return [];
    }

    const chunks = all.map(processors.inputJson);

    return chunks;
}
  
export function getChunksOfType(type) {
    const found = getAllChunks().filter(chunkData => {
        const { type: chunkType = null } = chunkData || {};
        if (!chunkType) {
            error(`
->  **chunk type: ${chunkType} not found!**

* chunk data:

`, 'lib/chunky');
            debug(chunkData);
            return false;
        }
  
        return chunkType === type;
    });
  
    return found;
}

export function getChunkById(id) {
    const found = getAllChunks()
      .find(chunkData => {
        const { id: chunkId = null } = chunkData || {};
        if (!chunkId) return false;
  
        return chunkId === id;
      });
  
    return found;
}

import glob from 'glob';
import debug from '../lib/debug.js';
import error from '../lib/error.js';
import * as processors from '../processors/index.js';

// @todo rename file

export function getAllChunks() {
    const all = glob.sync('./chunks/**/*.json');
    if (!processors.input) {
        error(`

->  chunky needs the 'input' processor
    to exist (e.g. '/zorg/processors/input.js')

`, 'lib/chunky');
        return [];
    }

    const chunks = all.map(processors.input);

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

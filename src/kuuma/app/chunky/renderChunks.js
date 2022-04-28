import renderChunk from './renderChunk.js';

// @todo `chunkRender(chunks = [], context = 'view')` 
export default function renderChunks(chunks) {
    return Array.isArray(chunks)
        ? chunks.map(renderChunk)
        : renderChunk(chunks)
}

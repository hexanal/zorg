import renderChunk from './renderChunk.js';

export default function renderChunks(chunks) {
    return Array.isArray(chunks)
        ? chunks.map(renderChunk)
        : renderChunk(chunks)
}

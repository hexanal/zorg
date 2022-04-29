import renderChunk from './renderChunk.js';

export default function renderChunks(chunks, context = 'view') {
    // default back to using single chunk func if it's actually a single one
    return Array.isArray(chunks)
        ? chunks.map(chnk => renderChunk(chnk, context))
        : renderChunk(chunks, context)
}

import { getChunkById } from '../lib/chunky.js';

export default function getChunk(req) {
    const { params = {} } = req || {};
    const { id = null } = params || {};
    const chunk = getChunkById(id);

    return chunk;
}

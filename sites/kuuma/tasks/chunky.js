import glob from 'glob';
import { parseJsonAtPath } from 'zorg/files.js';
import chunkToHtml from 'chunky/chunkToHtml.js';

export default function chunky(options) {
    const { src = null } = options || {};
    const paths = glob.sync(src, {}) || [];
    const parsedChunks = paths.map(path => parseJsonAtPath(path));

    return parsedChunks.map(chunk => chunkToHtml(chunk, options));
}

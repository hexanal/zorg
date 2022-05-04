import glob from 'glob';
import outputChunkToHtml from '../chunky/outputChunkToHtml.js';
import { parseJsonAtPath } from '../files.js';

export default function chunky(options, site) {
    const { src = null } = options || {};
    const paths = glob.sync(src, {}) || [];
    const parsedChunks = paths.map(path => parseJsonAtPath(path));

    return parsedChunks.map(chunk => outputChunkToHtml(chunk, site));
}

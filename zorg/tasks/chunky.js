import glob from 'glob';
import outputChunkToHtml from '../chunky/outputChunkToHtml.js';
import { parseJsonAtPath } from '../files.js';

export default function chunky(options, site) {
    const { src = null } = options || {};
    const paths = glob.sync(src, {}) || [];
    const parsed = paths.map(path => parseJsonAtPath(path));

    return parsed.map(chunk => outputChunkToHtml(chunk, site));
}

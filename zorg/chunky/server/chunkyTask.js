import glob from 'glob';
import outputChunkToHtml from './outputChunkToHtml.js';
import { parseJsonAtPath } from '../../files.js';

export default function chunkyTask(options, site) {
  const { src = null } = options || {};
  const paths = glob.sync(src, {}) || [];
  const parsedChunks = paths.map(path => parseJsonAtPath(path));
  
  return parsedChunks.map(chunks => outputChunkToHtml(chunks, site));
}

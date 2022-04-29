import task from '../lib/task.js';
import { copyFile } from '../lib/files.js';

function copy(options) {
  const { src, dest } = options || {};
  return copyFile(src, dest);
}

export default task('copy', copy);

import info from '../lib/info.js';
import { copyFile } from '../lib/files.js';

export default function copy(options) {
  const { src, dest } = options || {};

  info(`
    copying from: ${src}
    copying to: ${dest}
`, 'tasks/copy');

  return copyFile(src, dest);
}

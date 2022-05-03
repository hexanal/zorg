import info from '../log/info.js';
import { copyFile } from '../files.js';

export default function copy(options) {
  const { src, dest } = options || {};

  info(`
    copying from: ${src}
    copying to: ${dest}
`, 'tasks/copy');

  return copyFile(src, dest);
}

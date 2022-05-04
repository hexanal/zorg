import { copyFile } from '../files.js';

export default function copy(options) {
  const { src, dest } = options || {};

console.log(`
  copying from: ${src}
  copying to: ${dest}
`);

  return copyFile(src, dest);
}

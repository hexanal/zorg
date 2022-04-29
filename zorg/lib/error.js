import log from './log.js';

export default function error(msg, prefix = '') {
  if (!process.argv.includes('--error')) return;
  log(msg, `error in: ${prefix}`);
}
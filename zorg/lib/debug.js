import log from './log.js';

export default function debug(msg) {
  if (!process.argv.includes('--debug')) return;
  log(msg);
}
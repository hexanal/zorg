import log from './log.js';

export default function info(msg, prefix = 'info') {
  if (!process.argv.includes('--info')) return;
  console.log('info get printed?!');
  log(msg, prefix);
}
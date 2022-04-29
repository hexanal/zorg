import log from '../lib/log.js';

export default function logItem(item) {
  log(item, 'item');
  return item; // simple pass-through
}
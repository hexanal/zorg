import CONFIG from '../../config.zorg.js';
import log from './log.js';

export default function debug(msg) {
  if (CONFIG.DEBUG) {
    log(msg, { type: 'debug' });
  }
}
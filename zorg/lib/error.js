// import CONFIG from '../../config.zorg.js';
import log from './log.js';

export default function error(msg) {
  log(msg, { type: 'error' });
}
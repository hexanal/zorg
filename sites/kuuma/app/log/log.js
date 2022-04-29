export default function log(msg, prefix = '✦') {
    if (typeof msg !== 'string') {
      // console.log(msg);
      return;
    }
    // console.log(`[${prefix}] ${msg}`);
  }
  
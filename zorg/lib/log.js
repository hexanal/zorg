export default function log(msg, prefix = '✦') {
  if (typeof msg !== 'string') {
    console.log(msg);
    return;
  }
  if (process.argv.includes('--silent')) return;
  console.log(`\x1b[7m[${prefix}]\x1b[0m ${msg}`);
}

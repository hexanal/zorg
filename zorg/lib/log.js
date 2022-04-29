export default function log(msg, { type = '✦' } = {}) {
  console.log(`\x1b[7m[${type}]\x1b[0m ✷  ${msg}`);
}

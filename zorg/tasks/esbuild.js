import esbuild from 'esbuild';
import glob from 'glob';

export default function build(options) {
  const { src, dest } = options || {};

  return esbuild.build({
    entryPoints: glob.sync(src, {}),
    bundle: true,
    format: 'esm',
    outdir: dest,
  });
}
 
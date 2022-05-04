import esbuild from 'esbuild';
import glob from 'glob';

export default function(options, site) {
  const { src, dest } = options || {};

  return esbuild.build({
    entryPoints: glob.sync(src, {}),
    bundle: true,
    format: 'esm',
    outdir: dest,
  });
}

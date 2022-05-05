import esbuild from 'esbuild';
import glob from 'glob';

export default function(options, site) {
  const { src, dest } = options || {};

  return esbuild.build({
    entryPoints: glob.sync(src, {}),
    bundle: true,
    format: 'esm',
    outdir: dest,
    plugins: [
      {
        name: '~',
        setup(build) {
          console.log(build);
          build.onResolve({ filter: /^\~$/ }, async () => {
            const result = await build.resolve('~', { resolveDir: '../' })
            if (result.errors.length > 0) {
              return { errors: result.errors }
            }
            return { path: result.path, external: true }
          })
        },
      }
    ]
  });
}

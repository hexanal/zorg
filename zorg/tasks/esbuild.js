import esbuild from 'esbuild';
import glob from 'glob';

function plugins(site) {
  return [
    {
      name: 'zorg',
      setup(build) {
        build.onResolve({ filter: /^zorg$/ }, async () => {
          const result = await build.resolve('../../zorg', { resolveDir: '../'})
          if (result.errors.length > 0) {
            return { errors: result.errors }
          }
          return { path: result.path, external: true }
        })
      },
    },
    {
      name: 'resolve-site',
      setup(build) {
        build.onResolve({ filter: /^\~\~$/ }, async () => {
          const result = await build.resolve('./sites/'+site.id, { resolveDir: './' })
          if (result.errors.length > 0) {
            return { errors: result.errors }
          }
          return { path: result.path, external: true }
        })
      },
    }
  ];
}

export default function(options, site) {
  const { src, dest } = options || {};

  return esbuild.build({
    entryPoints: glob.sync(src, {}),
    bundle: true,
    format: 'esm',
    outdir: dest,
    plugins: plugins(site),
  });
}
 
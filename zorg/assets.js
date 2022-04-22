const fse = require('fs-extra')
const log = require('./lib/log')
const watcher = require('./lib/watcher')

const DEFAULTS = [
  {
    id: 'js',
    src: './src/js',
    dest: './public/assets/js'
  },
  {
    id: 'manifest',
    src: './src/manifest.webmanifest',
    dest: './public/manifest.webmanifest',
  },
  {
    id: 'images',
    src: './src/images',
    dest: './public/assets/images',
  },
  {
    id: 'fonts',
    src: './src/fonts',
    dest: './public/assets/fonts'
  },
]

const copy = ({id, src, dest}) => {
  const start = Date.now()

  return fse.copy(src, dest)
    .then(() => {
      const time = Date.now() - start
      log( `assets: copied '${id}' ~~ ${time}ms` )
    })
    .catch(err => {
      log( `assets: huh?! something broke while copying assets: '${id}'` )
      console.error( err )
    })
}

const build = website => {
  const { assets = DEFAULTS } = website || {}
  return assets.map( asset => {
    copy(asset)
  })
}

const watch = website => {
  const { assets = DEFAULTS } = website || {}
  const glob = assets.map( asset => `${asset.src}/**/*` )
  
  return watcher({
    glob,
    type: 'assets',
    callback: build
  })
}

module.exports = { build, watch }

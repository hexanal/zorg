const { write } = require('../lib/files')

const sitemapTemplate = urls => (`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${ urls }
</urlset>`)

const buildSitemap = function( items, website ) {
  const urls = items.reduce( (acc, item) => {
    const urlEntry = `
  <url>
    <loc>${ item.meta.permalink }</loc>
  </url>`

    return acc.concat(urlEntry)
  }, []).join('')

  const sitemap = sitemapTemplate( urls )
  const destination = `${ website.root }`
  const filename = 'sitemap.xml'

  write(destination, filename, sitemap)

  return items
}

module.exports = buildSitemap

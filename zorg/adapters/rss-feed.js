const { write } = require('../lib/files')
const sanitizeHtml = require('sanitize-html')

const rssTemplate = items => (`<rss version="2.0">
  <channel>
    <title>Fred Mercy</title>
    <link>https://fredmercy.ca</link>
    <description>A Personal Website</description>

    ${items}

  </channel>
</rss>`)

const buildRSSFeed = function( items, website ) {
  const posts = items.filter( item => item.meta.type === 'post' )

  const rssItems = posts.map( item => {
    const pubDate = new Date( item.meta.date )

    return `
    <item>
      <title>${ sanitizeHtml( item.meta.title ) }</title>
      <description>${ sanitizeHtml( item.meta.description ) }</description>
      <link>${ item.meta.permalink }</link>
      <pubDate>${ pubDate }</pubDate>
    </item>
`
  }).join('')

  const rssFeed = rssTemplate( rssItems )
  const destination = `public${ website.baseURL }`
  const filename = 'rss.xml'

  write(destination, filename, rssFeed)

  return items
}

module.exports = buildRSSFeed

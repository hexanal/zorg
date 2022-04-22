const getPageMeta = function( item, websiteConfig ) {
  const route = item._info.src
    .replace(`./routes/${item.meta.lang}/`, '')
    .replace('.md', '')
    .replace('.json', '')
    .split('/')
  const id = route[route.length - 1]

  if ( item.meta.isHome ) route.pop()

  const rebuiltUrl = route.length ? route.reduce( (acc, part) => (acc + '/' + part), '') : '/'
  const urlLocalePrefix = item.meta.lang === 'en' ? '' : `/${item.meta.lang}`
  const url = urlLocalePrefix + rebuiltUrl
  const permalink = `${websiteConfig.baseDomain}${url}`

  return {
    ...item.meta,
    id,
    url,
    permalink,
    route
  }
}

module.exports = function( items, websiteConfig ) {
  return items.map( item => {
    if ( item.meta.type !== 'page' && item.meta.type !== 'chunk' ) return item

    return {
      ...item,
      meta: getPageMeta(item, websiteConfig)
    }
  })
}

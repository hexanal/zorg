const groupBy = require('lodash.groupby')

const addPostsByMonth = function( items, website ) {
  const posts = items
    .filter( item => item.meta.type === 'post' )
    .filter( item => item.meta.lang === website.locale )
    .filter( item => !item.meta.isAlias )
  const postsByMonth = groupBy(posts, 'meta.archive')

  return items.map( item => {
    if ( item.meta.url === '/archived' || item.meta.url === '/fr/archivés' ) {
      return { ...item, postsByMonth }
    }

    return item
  })
}

module.exports = addPostsByMonth

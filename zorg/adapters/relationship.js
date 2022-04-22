const getBasicMeta = function(item) {
  const { title, url, description } = item.meta
  return {
    meta: { title, url, description }
  }
}

const getRelatedItems = function( item, items ) {
  const children = getChildrenItems( item, items )
  const parents = getParentItems( item, items )

  return {
    children,
    parents: parents.reverse(), // get the direct parents first
    breadcrumbs: parents
  }
}

const getChildrenItems = function( item, items ) {
  if (item.meta.id === 'home') return [] // don't bother finding children for home: it has them all anyway

  const children = items
    .filter( candidateItem => candidateItem.meta.type === 'page' )
    .filter( candidateItem => {
      const isSameRoute = candidateItem.meta.id === item.meta.id
      const isPartOfRoute = candidateItem.meta.url.includes( item.meta.url + '/' )
      if (isSameRoute || !isPartOfRoute) return false

      return candidateItem.meta.url.replace( item.meta.url, '') // will be falsy if it leaves "leftover" routes
    })
    .map( getBasicMeta )

  return children
}

const getParentItems = function( item, items ) {
  if (item.meta.isHome) return [] // don't bother finding parents for home: it has none

  const parents = items
    .filter( candidateItem => candidateItem.meta.type === 'page' )
    .filter( candidateItem => {
      if (candidateItem.meta.isHome) return false // nope
      const candidateUrl = candidateItem.meta.url + '/'
      const isSameRoute = candidateItem.meta.id === item.meta.id
      const isSharedRoute = item.meta.url.includes( candidateUrl )

      return !isSameRoute && isSharedRoute
    })
    .map( getBasicMeta )

  return parents
}

module.exports = function( items ) {
  return items.map( item => {
    if( item.meta.type !== 'page' ) return item

    return { ...item, ...getRelatedItems( item, items ) }
  })
}

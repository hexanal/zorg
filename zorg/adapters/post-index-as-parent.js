const getItemByURL = (items, url) => items.find( item => item.meta.url === url )

const getMetaWithIndexAsParent = function( item, indexes ) {
  const parentIndex = indexes[item.meta.lang]

  const parentItem = {
    ...parentIndex,
    meta: {
      ...parentIndex.meta,
      // modifying the parent URL (the blog index) to include the anchor!
      url: `${parentIndex.meta.url}/#${item.meta.id}`
    }
  }

  return {
    ...item.meta,
    parents: [ parentItem ],
    breadcrumbs: [ parentItem ]
  }
}

const addPostIndexAsParent = function( items ) {
  const indexes = {
    en: getItemByURL( items, '/archived' ),
    fr: getItemByURL( items, '/fr/archivés' )
  }

  if (!indexes.en && !indexes.fr) return items

  return items.map( item => {
    if (item.meta.type !== 'post' ) return item

    return {
      ...item,
      meta: getMetaWithIndexAsParent(item, indexes)
    }
  })
}

module.exports = addPostIndexAsParent
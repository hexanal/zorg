const getBasicMeta = item => {
  if ( !item || !item.meta.url ) return null
  if ( item.meta.type !== 'post' ) return null

  const { title, url, description } = item.meta
  return { meta: { title, url, description } }
}

const addAdjacents = function( items ) {
  return items.map( (item, index) => {
    if ( item.meta.type !== 'post' ) return item

    const copy = { ...item }

    copy.meta.previous = getBasicMeta( items[ index + 1 ] )
    copy.meta.next = getBasicMeta( items[ index - 1 ] )

    return copy
  })
}


module.exports = addAdjacents

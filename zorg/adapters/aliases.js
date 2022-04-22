const getAliases = function( items ) {
  const itemsWithAliases = items.filter( item => item.meta.aliases )
  if ( !itemsWithAliases.length ) return []

  // create a copy of the item for each of its aliases:
  // - set the new meta.url to the alias
  // - add `isAlias` flag (mark it as being an alias)
  // - add `aliasOfURL` to keep track of the original URL
  // - remove `aliases` (redundant)
  return itemsWithAliases.flatMap( item =>
    item.meta.aliases.flatMap( alias => ({
      ...item,
      meta: {
        ...item.meta,
        isAlias: true,
        url: alias,
        aliasOfURL: item.meta.url,
        aliases: [],
      }
    }) )
  )
}

const addAliases = function( items ) {
  return [ ...items, ...getAliases( items ) ]
}

module.exports = addAliases

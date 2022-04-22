export const getHashes = function() {
  return window.location.hash
    .replace('~~', '') // remove the squiggle placeholder
    .substr(1) // remove #
    .split('/') // split into parts
    .filter( hashPart => hashPart !== '' )
    .map( hashPart => {
      const [type, value] = hashPart.split(':')
      return { type, value }
    })
}

export const setHash = function( hashType, value ) {
  const currentHashes = getHashes()
  const plucked = currentHashes.map( hash => hash.type )
  const hashExists = plucked.includes( hashType )

  const nextHashes = hashExists
    ? currentHashes.map( hash => (hash.type !== hashType) ? hash : {...hash, value }).filter( hash => hash.value !== false )
    : [...currentHashes, { type: hashType, value }]

  const formattedHash = formatHashes( nextHashes )

  window.location.hash = formattedHash
}

export const getHash = function( hashType ) {
  const match = getHashes().find( hash => hash.type === hashType )

  if (!match) return false

  return match
}

const formatHashes = function(hashes) {
  if ( hashes.length === 0 ) return '#~~'

  return hashes.reduce( (acc, hash, i) => {
    if ( hash.value === false ) return acc

    return `${acc}${ i > 0 ? '/' : ''}${hash.type}${typeof hash.value === 'string' ? ':' + hash.value : ''}` // !!!
  }, '#')
}

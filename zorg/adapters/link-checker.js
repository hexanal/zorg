const regexPattern = /\]\(\/(.*?)\)/gi

const getURLs = function( items ) {
  return items.map( item => item.meta.url )
}

const processLinks = function( matchGroup ) {
  return matchGroup
    .map( match => (`/${match.replace( regexPattern, '$1')}`) ) // add back the slash
    .map( match => {
      const split = match.split('#')
      return split[0]
    })
}

const getLinks = function( items ) {
  const allLinks = items.reduce( (acc, item) => {
    const matchGroup = item.body.match( regexPattern )
    const listOfLinks = matchGroup
      ? processLinks( matchGroup )
      : []

    return acc.concat( listOfLinks )
  }, [])

  return allLinks
}

const addLinkChecker = function( items, website ) {
  if ( !process.argv.includes('--check-links') ) return items

  const allURLs = getURLs( items )
  const allLinks = getLinks( items )

  const orphans = allLinks
    .map( link => {
      const isValidInternalLink = allURLs.includes( link )
      if (isValidInternalLink ) return

      console.log(`[${process.env.npm_package_name}] possible broken link -> ${ link } (in website: ${ website.name })`)
    })

  return items
}

module.exports = addLinkChecker

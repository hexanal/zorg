const fs = require('fs')
const frontMatter = require('../lib/frontmatter')

const getDefaultAttributes = function( attributes, item, websiteConfig ) {
  const { type, title, description, draft } = attributes

  return {
    baseURL: websiteConfig.baseURL,
    lang: websiteConfig.locale,
    id: getFilenameFromPath( item ).replace('.md', '').replace('.json', ''), // @todo change getFilenameFromPath fn to return the thing we actually want
    type: type || 'page',
    title: title || getFilenameFromPath( item ).replace('.md', '').replace('.json', ''),
    description: description || '',
    draft: draft || false,
  }
}

/* various utility/formatting functions */
const getFileUpdatedDate = (path) => {
  const stats = fs.statSync(path)
  return stats.mtime
}

const getFilenameFromPath = function( filepath ) {
  const route = filepath.split('/')
  return route[route.length - 1]
}

const withLeadingZero = number => {
  const n = number.toString()
  return n.length < 2 ? '0' + n : n
}

const getAmPmTime = date => {
  const originalHours = date.getHours()
  const hoursIn12format = originalHours > 12 ? originalHours - 12 : originalHours
  const hours = hoursIn12format === 0 ? 12 : hoursIn12format
  const minutes = withLeadingZero( date.getMinutes() )
  const suffix = originalHours >= 12 ? 'pm' : 'am'

  return `${hours}:${minutes}${suffix}`
}

const getFormattedTimestamp = function( timestamp ) {
  const date = new Date( timestamp )
  const day = withLeadingZero( date.getUTCDate() )
  const month = withLeadingZero( date.getUTCMonth() )
  const year = date.getUTCFullYear()
  const time = getAmPmTime( date )

  return `${year}-${month}-${day} @ ${time}`
}

module.exports = function( items, websiteConfig ) {
  return items.map( item => {
    const file = fs.readFileSync(item, 'utf8')
    const { attributes, body } = frontMatter( file.toString() )
    const defaultAttributes = getDefaultAttributes( attributes, item, websiteConfig )
    const built = getFormattedTimestamp( new Date().toISOString() )
    const updated = getFormattedTimestamp( getFileUpdatedDate(item) )

    return {
      _info: {
        src: item,
        updated,
        built
      },
      meta: { ...defaultAttributes, ...attributes },
      body
    }
  })
}

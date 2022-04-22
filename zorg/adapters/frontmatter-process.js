const marked = require('marked')
const groupBy = require('lodash.groupby')
const orderBy = require('lodash.orderby')

const stripSingleParagraph = function( htmlString ) {
  const splitByLines = htmlString.split(/\r\n|\r|\n/)
  const lines = splitByLines.length

  // it's a single-line markdown... strip the <p> tags
  if ( lines === 2 ) return splitByLines[0].replace('<p>', '').replace('</p>', '')

  return htmlString
}

const PROCESSORS = [
  {
    id: 'bookmarks',
    fn: function( item ) {
      const { bookmarks } = item.meta
      const withIds = bookmarks.map( (bookmark, index) =>({ ...bookmark, id: `${bookmark.tag}_${index}` }) )
      const withOrder = orderBy( withIds, 'title' )
      const withMarkdownTitle = withOrder.map( bookmark => ({...bookmark, title: stripSingleParagraph(marked.parse( bookmark.title )) }) )
      const withTags = groupBy( withMarkdownTitle, 'tag' )

      return withTags
    }
  }
]

const processFrontmatter = function( item ) {
  const processed = PROCESSORS.reduce( (acc, processor) => {
    const { id, fn } = processor
    if ( !item.meta[id] ) return item // no processor needed for this item, don't process

    return {
      ...item,
      meta: {
        ...item.meta,
        [id]: fn( item ) // replace the original frontmatter key with "processed" output :)
      }
    }
  }, item)

  return processed
}

const addProcessedFrontmatter = function( items ) {
  return items.map( processFrontmatter )
}

module.exports = addProcessedFrontmatter

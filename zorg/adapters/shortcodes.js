const fs = require('fs')
const jsyaml = require('js-yaml')
const templater = require('../lib/templater')
const frontMatter = require('../lib/frontmatter')

const useBlockWithData = function(blockId, data) {
  // FIXME settings up the templating engine should be "another concern"
  // it should be possible to swap out the templating engine easily, and use whatever?
  templater.usePartials('./src/kuuma') // @todo

  const component = `{{> components/${blockId} }}`;
  const template = templater.compile( component )
  const templateWithData = template( data )

  return templateWithData
}

// FIXME  all of this is HIGHLY EXPERIMENTAL
const SHORTCODES = [
  {
    tag: 'component',
    processor: function({ props, item }) {
      const data = jsyaml.load( props )
      return useBlockWithData( data.name, { ...item, ...data } )
    }
  },
  {
    tag: 'include',
    processor: function({props, item, items}) {
      const file = fs.readFileSync(`./${props}`, 'utf8')
      const { body } = frontMatter( file.toString() )

      return getProcessedContent( body, item, items )
    }
  },
]

const getProcessedContent = function( content, item, items ) {
  return SHORTCODES.reduce( (accContent, shortcode) => {
    const tag = `[${shortcode.tag}](`
    const firstSplit = content.split( tag )
    const splits = firstSplit.map( part => part.split(')')[0] )

    splits.shift()

    if ( !splits.length ) return accContent // no shortcode found

    return splits.reduce( (acc, props) => {
      const replaceString = `${tag}${props})`
      const shortcoded = shortcode.processor({
        props: props.trim(),
        item,
        items,
      })

      if (!shortcoded) return acc

      const module = shortcoded
        .replace('\n', '')
        .replace('\r', '')

      return acc.replace(replaceString, module)
    }, accContent)
  }, content)
}


const applyShortcodes = function( item, items ) {
  if (!item.body) return item

  return {
    ...item,
    body: getProcessedContent( item.body, item, items )
  }
}

module.exports = function( items ) {
  return items.map( item => applyShortcodes( item, items ) )
}

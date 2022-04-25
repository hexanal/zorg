const fs = require('fs')
const marked = require('marked')
const Handlebars = require('handlebars')
const { write } = require('../../lib/files')

const registerPartialHelper = function() {
  Handlebars.registerHelper('block', function (template, context, opts) {
    const f = Handlebars.partials[template]

    if (!f) return '[...]'
    if (typeof f === 'function') return new Handlebars.SafeString( f(context) )

    const block = Handlebars.compile( f )

    return new Handlebars.SafeString( block(context) )
  })

  Handlebars.registerHelper('t', function (template, context, opts) {
    if( !template.data.root.meta ) {
      console.error('[error] No `meta` found! huh?!')
      return ''
    }

    const { lang } = template.data.root.meta

    if (!lang) {
      console.error('[error] No language found in this item\'s `meta` data')
      return ''
    }

    const i18nString = template.hash[lang]

    if (!i18nString) {
      console.error('[error] Please provide correct language keys to the `t` helper!')
      return ''
    }

    return new Handlebars.SafeString( i18nString )
  })

  Handlebars.registerHelper('if-object', function (template, context, opts) {
    if( typeof template === 'object') return new Handlebars.SafeString( context.fn( template ) )

    return ''
  })

  Handlebars.registerHelper('debug', function (template, context, opts) {
    const isString = typeof template === 'string'

    if (isString) return new Handlebars.SafeString( template )

    return ''
  })

  Handlebars.registerHelper('markdown', function (template, context, opts) {
    const content = typeof template === 'string'
      ? marked.parse( template )
      : ''

    return new Handlebars.SafeString( content )
  })
  // TODO split to own function
  // maybe do something that helps with adding custom helpers?
  Handlebars.registerHelper('t-markdown', function (template, context, opts) {
    const { lang } = template.data.root.meta

    if (!lang) {
      console.error('[error] No language found in this item\'s `meta` data')
      return ''
    }

    const i18nString = template.hash[lang]

    if (!i18nString) {
      console.error('[error] Please provide correct language keys to the `t-markdown` helper!')
      return ''
    }

    return new Handlebars.SafeString( marked( i18nString ) )
  })

}

const isDir = function (filename) {
  const stats = fs.statSync(filename)
  return stats && stats.isDirectory()
}

const isValidExtension = function (filename) {
  return filename.split('.').pop() === 'html'
}

const partialName = function (filename, base) {
  let name = filename.substr(0, filename.lastIndexOf('.'))
  name = name.replace(new RegExp('^' + base + '\\/'), '')

  return name
}

const registerPartial = function (filename, base) {
  if ( !isValidExtension(filename) ) return
  const name = partialName(filename, base)
  const template = fs.readFileSync(filename, 'utf8')

  Handlebars.registerPartial(name, template)
}

const registerPartials = function (dir, base) {
  fs.readdirSync(dir).forEach(basename => {
    const filename = dir + '/' + basename

    if ( isDir(filename) ) {
      registerPartials(filename, base)
    } else {
      registerPartial(filename, base)
    }
  })
}

const compile = function( template ) {
  return Handlebars.compile( template )
}

const render = function(destination, html ) {
  write(destination, 'index.html', html)
}

const usePartials = function( dir ) {
  registerPartials(dir, dir)
  registerPartialHelper()
}

module.exports = {
  compile,
  render,
  usePartials
}
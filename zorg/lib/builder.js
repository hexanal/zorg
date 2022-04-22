const fs = require('fs')
const templater = require('../lib/templater')

const getTemplate = function(templatePath) {
  let templateFile

  try {
    templateFile = fs.readFileSync( templatePath, 'utf8' )
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`[${process.env.npm_package_name}] error: could not find template file “${templatePath}”!`)
    } else {
      throw err
    }
  }

  return templateFile
}

module.exports = function builder( items, websiteConfig ) {
  templater.usePartials(websiteConfig.componentsDir)

  return items.map( item => {
    if ( !item.component ) return

    const destination = `${websiteConfig.root}${item.url}` // filesystem destination to write the HTML
    // const templateName = item.meta.template || item.meta.type // default to content type
    const templatePath = `${websiteConfig.componentsDir}/${item.component}.html`
    const templateFile = getTemplate( templatePath, websiteConfig )
    const template = templater.compile( templateFile.toString() )
    const htmlTemplate = template( item )

    templater.render(destination, htmlTemplate)

    return item
  })
}
const fs = require('fs')
const templater = require('./templater')

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

module.exports = function builder( item, config ) {
  templater.usePartials(config.html.componentsDir)

  const destination = `${config.root}${item.url}` // filesystem destination to write the HTML
  const templatePath = `${config.html.componentsDir}/${item.component}.html`
  const templateFile = getTemplate( templatePath, config )
  const template = templater.compile( templateFile.toString() )
  const htmlTemplate = template( item )
  templater.render(destination, htmlTemplate)

  return item
}
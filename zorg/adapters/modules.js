const getModulesData = function( items ) {
  const modules = items.filter( item => item.meta.type === 'module' )
  if ( !modules.length ) return items

  return modules.reduce( (acc, item) => ({
    ...acc,
    // the data will be accessible to every item under a key of the same name as
    // the module's file (which is `item.meta.id`)
    [item.meta.id]: item.meta.data
  }), {})
}

const addModuleData = function( items ) {
  const moduleData = getModulesData( items )

  return items.map( item => ({ ...item, ...moduleData }) )
}

module.exports = addModuleData

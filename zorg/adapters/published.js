const filterPublished = function( items ) {
  return items.filter(item => {
    if (typeof item.meta.published !== 'undefined' && item.meta.published !== false) return false;
    if (!item.meta.published) return true;
  })
}

module.exports = filterPublished

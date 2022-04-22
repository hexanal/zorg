const getMonthName = function(number, lang) {
  const months = {
    '01': { en: 'january', fr: 'janvier' },
    '02': { en: 'february', fr: 'février', },
    '03': { en: 'march', fr: 'mars', },
    '04': { en: 'april', fr: 'avril' },
    '05': { en: 'may', fr: 'mai' },
    '06': { en: 'june', fr: 'juin' },
    '07': { en: 'july', fr: 'juillet' },
    '08': { en: 'august', fr: 'août' },
    '09': { en: 'september', fr: 'septembre' },
    '10': { en: 'october', fr: 'octobre' },
    '11': { en: 'november', fr: 'novembre' },
    '12': { en: 'december', fr: 'décembre' },
  }

  return months[number][lang]
}

const removeLeadingZero = day => {
  if ( day.charAt(0) === '0' ) return day[1]
  return day
}

const getPostMetaData = function( item, website ) {
  const urlParts = item._info.src // grab special key "_info.src" which contains the path to the markdown file
    .replace(`./src/routes/${item.meta.lang}/`, '')
    .replace('.md', '')
    .split('/')
    .reverse()

  const [id, day, month, year, blog] = urlParts

  if ( !day ) return {}

  const dayNoZero = removeLeadingZero( day )
  const date = `${year}-${month}-${day}`

  const monthName = getMonthName(month, item.meta.lang)
  const prettyDate = `${dayNoZero} ${monthName}, ${year}`

  const baseURL = website.baseURL === '/'
    ? ''
    : website.baseURL
  const url = `${baseURL}/${blog}/${year}/${month}/${day}/${id}`
  const permalink = `${website.baseDomain}${url}`
  const archive = `${monthName} ${year}`

  return {
    ...item.meta,
    url,
    permalink,
    date,
    id,
    year,
    month,
    monthName,
    day,
    dayNoZero,
    prettyDate,
    archive
  }
}

module.exports = function( items, website ) {
  return items.map( item => {
    if ( item.meta.type !== 'post' ) return item

    return {
      ...item,
      meta: getPostMetaData(item, website)
    }
  })
}

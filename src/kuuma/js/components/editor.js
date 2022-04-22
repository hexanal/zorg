// import reefer, { onReef, SPRING_TIGHT, SPRING_SOFT } from '../tools/reefer.js'
// import focuser from '../tools/focuser.js'
// import debounce from '../tools/debounce.js'

export default function({ element, children }) {
  const state = {
  }

  children['imagefile'].addEventListener('change', e => {
    for( const file of children['imagefile'].files ) {
      children['preview'].src = URL.createObjectURL(file)
    }
  })
}
